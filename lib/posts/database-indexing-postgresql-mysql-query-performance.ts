import type { BlogPost } from "../blog";

const post: BlogPost = {
    id: "17",
    slug: "database-indexing-postgresql-mysql-query-performance",
    title: "Database Indexing in PostgreSQL and MySQL — Why It Matters and How to Do It Right",
    excerpt:
        "A query that takes 800ms in production with 500,000 rows often takes 2ms with the right index in place. Here is a practical guide to indexing in PostgreSQL and MySQL and how to verify it is working.",
    date: "2026-03-25",
    readTime: "9 min read",
    tags: ["Database", "PostgreSQL", "MySQL", "SQL", "Performance", "Backend"],
    content: `
<h2>Why Queries Get Slow as Data Grows</h2>
<p>A backend that performs well in development — with a few hundred rows in each table — often degrades noticeably in production when those tables hold hundreds of thousands of records. The query has not changed. The application code has not changed. Only the data volume has.</p>
<p>The cause is almost always missing indexes. Without an index, the database performs a <strong>full table scan</strong>: it reads every row in the table, evaluates the WHERE clause against each one, and returns the matches. On a table with 500,000 rows, that is 500,000 row evaluations for every query — even if the result set is one row.</p>
<p>An index is a separate data structure (usually a B-tree) that the database maintains alongside the table. It stores a sorted copy of specific column values along with pointers back to the full row. When a query filters on an indexed column, the database uses the index to jump directly to the relevant rows rather than scanning everything.</p>
<p>The result on a 500,000-row table:</p>
<ul>
  <li>Full table scan: 600–1000ms depending on table width and hardware</li>
  <li>Index seek on the same query: 1–3ms</li>
</ul>
<p>That is not a marginal improvement. It is the difference between an application that feels fast and one that has a loading spinner on every data-heavy page.</p>

<h2>How Indexes Work — The B-Tree Structure</h2>
<p>The default index type in both PostgreSQL and MySQL is a B-tree (balanced tree). The database maintains the indexed column values in sorted order across a tree structure. When searching for a specific value, the engine starts at the root, follows branches based on comparisons, and reaches the matching leaf nodes in O(log n) time rather than O(n) for a full scan.</p>
<p>This makes B-tree indexes effective for:</p>
<ul>
  <li>Equality lookups: <code>WHERE user_id = 5</code></li>
  <li>Range queries: <code>WHERE created_at > '2026-01-01'</code></li>
  <li>Ordering: <code>ORDER BY last_name</code></li>
  <li>Prefix matching: <code>WHERE email LIKE 'john%'</code></li>
</ul>
<p>They are not useful for suffix matching (<code>LIKE '%john'</code>), which always results in a full scan regardless of indexes.</p>

<h2>Creating Indexes in PostgreSQL</h2>
<p>PostgreSQL uses <code>CREATE INDEX</code>. The syntax is straightforward:</p>

<pre><code>-- Basic index on a single column
CREATE INDEX idx_orders_user_id ON orders (user_id);

-- Unique index — also enforces uniqueness at the database level
CREATE UNIQUE INDEX idx_users_email ON users (email);</code></pre>

<p>Indexes in PostgreSQL are built without blocking reads by default. For large production tables, use <code>CONCURRENTLY</code> to avoid locking the table during the build:</p>

<pre><code>-- Build index without locking the table (safe for production)
CREATE INDEX CONCURRENTLY idx_orders_user_id ON orders (user_id);</code></pre>

<p>The <code>CONCURRENTLY</code> build takes longer, but the table remains available for reads and writes throughout.</p>

<h3>Composite Indexes in PostgreSQL</h3>
<p>When a query filters on multiple columns, a composite index covering all of them is significantly faster than separate single-column indexes:</p>

<pre><code>-- Query that filters on both status and date
SELECT * FROM orders
WHERE status = 'pending'
  AND created_at > NOW() - INTERVAL '7 days';

-- Composite index — column order matches the query's filter priority
CREATE INDEX idx_orders_status_created ON orders (status, created_at);</code></pre>

<p>Column order in a composite index matters. The index is most useful when the leftmost columns are the ones filtered by equality (<code>status = 'pending'</code>) and range columns come after (<code>created_at ></code>). A query that filters only on <code>created_at</code> without filtering on <code>status</code> first will not use this composite index effectively — it would need its own index.</p>

<h3>Partial Indexes in PostgreSQL</h3>
<p>PostgreSQL supports partial indexes — indexes that only cover rows matching a condition. These are useful when queries consistently filter on a specific value:</p>

<pre><code>-- Only index rows where status is 'pending'
-- Much smaller index, faster for queries that always filter on pending orders
CREATE INDEX idx_orders_pending ON orders (created_at)
WHERE status = 'pending';</code></pre>

<p>A partial index can be orders of magnitude smaller than a full index on the same column, making it faster to build, faster to search, and cheaper to maintain on writes.</p>

<h2>Creating Indexes in MySQL</h2>
<p>MySQL supports index creation via both <code>CREATE INDEX</code> and <code>ALTER TABLE</code>. The <code>ALTER TABLE</code> form is more commonly used in migrations:</p>

<pre><code>-- Add index via ALTER TABLE
ALTER TABLE orders ADD INDEX idx_user_id (user_id);

-- Add unique index
ALTER TABLE users ADD UNIQUE INDEX idx_email (email);

-- Composite index
ALTER TABLE orders ADD INDEX idx_status_created (status, created_at);</code></pre>

<p>Using <code>CREATE INDEX</code> syntax:</p>

<pre><code>CREATE INDEX idx_user_id ON orders (user_id);
CREATE UNIQUE INDEX idx_email ON users (email);</code></pre>

<p>MySQL's InnoDB storage engine (the default) automatically creates a clustered index on the primary key — the table's physical row order matches the primary key order. Secondary indexes (the ones you create manually) store the primary key value as a pointer back to the full row.</p>

<h3>Composite Indexes in MySQL</h3>

<pre><code>-- Query filtering on user_id and status
SELECT * FROM orders
WHERE user_id = 5 AND status = 'completed';

-- Composite index matching that filter
ALTER TABLE orders ADD INDEX idx_user_status (user_id, status);

-- For ORDER BY on indexed columns
SELECT * FROM orders
WHERE user_id = 5
ORDER BY created_at DESC;

-- Index covering the filter and the sort
ALTER TABLE orders ADD INDEX idx_user_created (user_id, created_at);</code></pre>

<h2>Verifying That Queries Use Your Indexes</h2>
<p>Creating an index does not guarantee the database will use it. The query planner decides based on table statistics whether the index is faster than a scan. Verify with EXPLAIN.</p>

<h3>PostgreSQL — EXPLAIN ANALYZE</h3>

<pre><code>EXPLAIN ANALYZE
SELECT * FROM orders WHERE user_id = 5;

-- Output to look for:
-- Index Scan using idx_orders_user_id on orders  (cost=0.43..8.45 rows=1)
--   Index Cond: (user_id = 5)
--   Actual time: 0.042..0.044 rows=1

-- Bad output (no index used):
-- Seq Scan on orders  (cost=0.00..12543.00 rows=1)
--   Filter: (user_id = 5)
--   Actual time: 842.113..842.117 rows=1</code></pre>

<p>"Index Scan" means the index is being used. "Seq Scan" (sequential scan) means it is not. If you see a sequential scan on a large table that you expected to use an index, the most common reasons are:</p>
<ul>
  <li>The query planner thinks a scan is cheaper because the table is small or the selectivity is low (the indexed value matches most rows)</li>
  <li>The statistics are stale — run <code>ANALYZE orders;</code> to update them</li>
  <li>The query is using a function on the indexed column: <code>WHERE LOWER(email) = 'john@example.com'</code> will not use an index on <code>email</code> — you would need a functional index</li>
</ul>

<h3>MySQL — EXPLAIN</h3>

<pre><code>EXPLAIN SELECT * FROM orders WHERE user_id = 5;

-- Output columns to check:
-- +----+-------------+--------+------+------------------+------------------+---------+-------+------+-------+
-- | id | select_type | table  | type | possible_keys    | key              | key_len | ref   | rows | Extra |
-- +----+-------------+--------+------+------------------+------------------+---------+-------+------+-------+
-- |  1 | SIMPLE      | orders | ref  | idx_user_id      | idx_user_id      | 4       | const |    3 |       |

-- key column shows idx_user_id — index is being used
-- type = ref means an index lookup

-- If key = NULL, no index is used:
-- | type | possible_keys | key  | rows   |
-- | ALL  | NULL          | NULL | 500000 |  ← full scan, 500k rows checked</code></pre>

<p>The <code>type</code> column in MySQL EXPLAIN indicates the join/access type, ranked from best to worst: <code>const</code>, <code>eq_ref</code>, <code>ref</code>, <code>range</code>, <code>index</code>, <code>ALL</code>. You want to avoid <code>ALL</code> on large tables.</p>

<h2>Which Columns to Index</h2>
<p>Index columns that appear in:</p>
<ul>
  <li><strong>Foreign keys</strong> — <code>user_id</code>, <code>order_id</code>, <code>product_id</code> on the referencing table. MySQL does not automatically create indexes on foreign keys (InnoDB does, but only on some configurations). PostgreSQL does not create them at all — you must add them manually.</li>
  <li><strong>WHERE clauses</strong> on large tables — any column you filter on frequently in queries that return a small fraction of total rows</li>
  <li><strong>JOIN conditions</strong> — columns used on both sides of a JOIN should be indexed on the joined table</li>
  <li><strong>ORDER BY and GROUP BY</strong> — indexes can eliminate sort operations entirely when the sort order matches the index order</li>
</ul>

<h2>The Cost of Indexes — What Not to Over-Index</h2>
<p>Indexes are not free. Each index the database maintains requires:</p>
<ul>
  <li>Additional storage — a B-tree index on a large table can itself be hundreds of megabytes</li>
  <li>Write overhead — every INSERT, UPDATE, and DELETE that affects an indexed column must also update the index. A table with 10 indexes has 10x the write overhead per row compared to a table with no indexes</li>
</ul>
<p>The right approach is to identify queries that are actually slow using query logs or monitoring, run EXPLAIN on them, and add targeted indexes. Do not add indexes speculatively on every column — it bloats the schema and degrades write performance without benefit.</p>

<h2>Indexing in Entity Framework Core (.NET)</h2>
<p>If you are building a .NET backend with Entity Framework Core, you can define indexes in your entity configuration rather than writing raw SQL migrations:</p>

<pre><code>// In your DbContext OnModelCreating or entity configuration
modelBuilder.Entity&lt;Order&gt;()
    .HasIndex(o => o.UserId)
    .HasDatabaseName("idx_orders_user_id");

// Composite index
modelBuilder.Entity&lt;Order&gt;()
    .HasIndex(o => new { o.Status, o.CreatedAt })
    .HasDatabaseName("idx_orders_status_created");

// Unique index
modelBuilder.Entity&lt;User&gt;()
    .HasIndex(u => u.Email)
    .IsUnique()
    .HasDatabaseName("idx_users_email");</code></pre>

<p>EF Core generates the SQL index creation statements in the migration file. You can review them before applying:</p>

<pre><code>dotnet ef migrations add AddOrderIndexes
dotnet ef database update</code></pre>

<h2>A Practical Indexing Checklist</h2>
<ul>
  <li>Every foreign key column has an index on the referencing table</li>
  <li>Every column in a WHERE clause on tables over 10,000 rows is evaluated for an index</li>
  <li>EXPLAIN output on slow queries shows Index Scan (PostgreSQL) or a non-null key (MySQL)</li>
  <li>Composite indexes are ordered with equality-filter columns first, range-filter columns last</li>
  <li>Unique constraints are enforced at the database level with a UNIQUE index, not only in application code</li>
  <li>Large table indexes in PostgreSQL are created with CONCURRENTLY in production to avoid locks</li>
  <li>Table statistics are kept current — run ANALYZE periodically in PostgreSQL</li>
</ul>

<h2>The Impact on Application Performance</h2>
<p>Indexing is one of the highest-leverage optimisations available in backend development. It requires no application code changes, no infrastructure upgrades, and no architectural decisions. A single index on the right column can reduce a query from 800ms to under 5ms — a 160x improvement that directly translates to faster page loads, lower server load, and an application that remains responsive as data volume grows.</p>
<p>If you are building a .NET or Node.js backend and want to ensure the database layer is set up correctly from the start, <a href="/contact">get in touch</a>.</p>
    `.trim(),
};

export default post;
