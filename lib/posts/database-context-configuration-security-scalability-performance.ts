import type { BlogPost } from "../blog";

const post: BlogPost = {
    id: "18",
    slug: "database-context-configuration-security-scalability-performance",
    title: "How to Configure a Database Context in .NET for Security, Performance, and Scale",
    excerpt: "Most database performance problems are not query problems — they are configuration problems set up on day one and never revisited. Here is the complete Do's and Don'ts guide.",
    date: "2026-03-26",
    readTime: "10 min read",
    tags: ["Database", "PostgreSQL", "MySQL", "Security", "Performance", "Backend", ".NET", "Architecture"],
    content: `
<h2>Why Database Configuration Is the Most Important Decision You Make Early</h2>
<p>Most architectural decisions in a new project can be changed later — at some cost. The database configuration is different. The connection pooling strategy, the security model, the indexing approach, the schema design — these decisions compound over time. A misconfigured database in week one becomes a production incident in month six.</p>
<p>This post covers the Do's and Don'ts across three areas: security, scalability, and performance. These apply whether you are using PostgreSQL, MySQL, or SQL Server, and whether your backend is .NET, Node.js, or anything else.</p>

<h2>Security — Protecting the Most Sensitive Layer of Your Stack</h2>
<p>The database holds your users' personal data, your application's state, and often your business's most sensitive information. Security failures at this layer tend to be catastrophic and public.</p>

<h3>Do: Store Connection Strings Outside Source Code</h3>
<p>A connection string in a config file that gets committed to git is a credential leak waiting to happen. Anyone who has ever had access to the repository — current team members, former employees, contractors — can read it.</p>

<pre><code>// Wrong — connection string hardcoded
var connectionString = "Host=localhost;Database=myapp;Username=postgres;Password=supersecret";

// Correct — read from environment or secrets manager
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
// In appsettings.json (non-sensitive local default only):
// "DefaultConnection": "Host=localhost;Database=myapp_dev;Username=appuser;Password="
// Actual password in environment variable: ConnectionStrings__DefaultConnection</code></pre>

<p>In production, use a dedicated secrets manager:</p>
<ul>
  <li><strong>Azure Key Vault</strong> — integrates directly with ASP.NET Core configuration</li>
  <li><strong>AWS Secrets Manager</strong> — works with ECS, Lambda, and EC2 via IAM roles</li>
  <li><strong>HashiCorp Vault</strong> — infrastructure-agnostic, widely used in Kubernetes deployments</li>
  <li><strong>Environment variables</strong> — minimum viable approach, acceptable for small deployments</li>
</ul>

<h3>Do: Create a Least-Privilege Database User</h3>
<p>Your application almost never needs to create tables, drop indexes, or manage users at runtime. Create a dedicated database user with only the permissions the application actually uses:</p>

<pre><code>-- PostgreSQL: create a restricted application user
CREATE USER appuser WITH PASSWORD 'strong_random_password';

-- Grant only what is needed
GRANT CONNECT ON DATABASE myapp TO appuser;
GRANT USAGE ON SCHEMA public TO appuser;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO appuser;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO appuser;

-- Do NOT grant:
-- GRANT ALL PRIVILEGES ON DATABASE myapp TO appuser;
-- This allows schema changes, dropping tables, and creating new users</code></pre>

<pre><code>-- MySQL equivalent
CREATE USER 'appuser'@'%' IDENTIFIED BY 'strong_random_password';
GRANT SELECT, INSERT, UPDATE, DELETE ON myapp.* TO 'appuser'@'%';
FLUSH PRIVILEGES;</code></pre>

<p>Run migrations with a separate, more privileged migration user — not the runtime application user. This way, a compromised application account cannot alter the schema.</p>

<h3>Do: Enforce SSL for All Database Connections</h3>
<p>Even on internal networks, database traffic should be encrypted. Unencrypted connections expose credentials and data to anyone with network access — a real risk in shared cloud environments.</p>

<pre><code>// PostgreSQL with SSL enforced in connection string
"Host=db.example.com;Database=myapp;Username=appuser;Password=xxx;SSL Mode=Require;Trust Server Certificate=false"

// Entity Framework Core — add to DbContext options
services.AddDbContext&lt;AppDbContext&gt;(options =>
    options.UseNpgsql(connectionString, npgsqlOptions =>
        npgsqlOptions.EnableRetryOnFailure(3)
    )
);</code></pre>

<h3>Don't: Use Default Ports Exposed to the Internet</h3>
<p>PostgreSQL runs on 5432, MySQL on 3306 by default. These are the first ports automated scanners probe. Your database should never be directly accessible from the public internet — it should only accept connections from your application server's private IP range or VPC.</p>
<p>If you need to access the database remotely for administration, use an SSH tunnel or a VPN — not an open inbound rule on the database port.</p>

<h3>Don't: Log Full Query Strings in Production</h3>
<p>Query logs are useful for debugging slow queries. Full query logs in production often capture parameterised values — email addresses, names, financial figures — that should never appear in log files. Use slow query logging with a sensible threshold instead:</p>

<pre><code>-- PostgreSQL: log only queries slower than 500ms
log_min_duration_statement = 500</code></pre>

<h2>Scalability — Building for Growth from the Start</h2>
<p>A database that handles 100 concurrent users fine will often collapse under 1,000 if connection management and query design were not considered early. The fixes are not difficult, but they are much harder to apply to a running production system than to get right at the start.</p>

<h3>Do: Configure Connection Pooling</h3>
<p>Databases have a hard limit on the number of simultaneous connections they can handle — PostgreSQL defaults to 100, and each connection consumes memory on the database server. Without pooling, an application under load opens a new connection per request and exhausts this limit quickly.</p>
<p>Connection pooling maintains a pool of pre-established connections that requests borrow and return:</p>

<pre><code>// Entity Framework Core — configure pool size
services.AddDbContextPool&lt;AppDbContext&gt;(options =>
    options.UseNpgsql(connectionString), poolSize: 128
);

// Or configure via connection string
"Host=localhost;Database=myapp;Username=appuser;Password=xxx;Maximum Pool Size=50;Minimum Pool Size=5"</code></pre>

<p>For PostgreSQL specifically, <strong>PgBouncer</strong> is the industry-standard connection pooler. It sits between your application and PostgreSQL, managing thousands of client connections against a smaller number of actual database connections:</p>

<pre><code># PgBouncer configuration (pgbouncer.ini)
[databases]
myapp = host=localhost port=5432 dbname=myapp

[pgbouncer]
pool_mode = transaction       # connection released after each transaction
max_client_conn = 1000        # max total clients
default_pool_size = 25        # connections to PostgreSQL per database/user pair
min_pool_size = 5</code></pre>

<h3>Do: Index Foreign Keys on the Referencing Table</h3>
<p>PostgreSQL automatically creates an index on primary keys. It does not automatically create indexes on foreign keys on the referencing table. This means every JOIN from the child table to the parent table results in a full scan unless you add the index manually:</p>

<pre><code>-- orders.user_id references users.id
-- PostgreSQL does NOT automatically index orders.user_id

CREATE INDEX idx_orders_user_id ON orders (user_id);
CREATE INDEX idx_order_items_order_id ON order_items (order_id);
CREATE INDEX idx_order_items_product_id ON order_items (product_id);</code></pre>

<p>In Entity Framework Core, define indexes in your model configuration so they are included in migrations:</p>

<pre><code>modelBuilder.Entity&lt;Order&gt;()
    .HasIndex(o => o.UserId)
    .HasDatabaseName("idx_orders_user_id");

modelBuilder.Entity&lt;OrderItem&gt;()
    .HasIndex(i => i.OrderId)
    .HasDatabaseName("idx_order_items_order_id");</code></pre>

<h3>Do: Separate Read and Write Operations for Heavy Workloads</h3>
<p>Reporting queries — dashboards, exports, analytics — are often full-table scans that run for seconds. Running these against your primary database blocks writes and degrades response times for all other operations. Read replicas handle this without affecting the primary:</p>

<pre><code>// Register separate DbContext instances for read and write
services.AddDbContext&lt;WriteDbContext&gt;(options =>
    options.UseNpgsql(configuration["ConnectionStrings:Primary"]));

services.AddDbContext&lt;ReadDbContext&gt;(options =>
    options.UseNpgsql(configuration["ConnectionStrings:Replica"])
           .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking));
           // No tracking on reads — Entity Framework won't watch these entities for changes</code></pre>

<h3>Don't: Open Unlimited Connections</h3>
<p>Setting <code>Maximum Pool Size</code> to an unlimited or very large number does not make your application scale better — it shifts the bottleneck to the database server, which runs out of memory managing thousands of simultaneous connections. Set a pool size that reflects what the database can handle, monitor pool saturation, and scale by adding application instances rather than connection count.</p>

<h3>Don't: Filter Large Result Sets in Application Code</h3>
<p>This is one of the most common scalability problems in backend applications:</p>

<pre><code>// Wrong — loads all orders into memory, filters in C#
var pendingOrders = await _db.Orders.ToListAsync();
var filtered = pendingOrders.Where(o => o.Status == "pending").ToList();

// Correct — filter in the database, only transfer matching rows
var pendingOrders = await _db.Orders
    .Where(o => o.Status == "pending")
    .ToListAsync();</code></pre>

<p>The first version transfers every row across the database connection and allocates memory for all of them before filtering. On a table with 500,000 orders, this is the difference between a fast query and an out-of-memory exception.</p>

<h2>Performance — Queries That Stay Fast as Data Grows</h2>
<p>Performance problems are rarely noticed in development. Tables have hundreds of rows, queries complete in milliseconds regardless of how they are written. In production, with hundreds of thousands of rows and dozens of concurrent users, poorly written queries surface as timeouts, high CPU, and slow page loads.</p>

<h3>Do: Verify Queries Use Indexes With EXPLAIN</h3>

<pre><code>-- PostgreSQL: check if an index is used
EXPLAIN ANALYZE
SELECT * FROM orders WHERE user_id = 5 AND status = 'pending';

-- What you want to see:
-- Index Scan using idx_orders_user_id on orders
-- Index Cond: (user_id = 5)
-- Filter: (status = 'pending')
-- Actual time: 0.084 ms

-- What you don't want to see:
-- Seq Scan on orders
-- Filter: ((user_id = 5) AND (status = 'pending'))
-- Rows Removed by Filter: 498,743
-- Actual time: 873.412 ms</code></pre>

<pre><code>-- MySQL: same check
EXPLAIN SELECT * FROM orders WHERE user_id = 5 AND status = 'pending';
-- Check the "key" column — NULL means no index was used
-- Check the "rows" column — a high number relative to the result means a scan</code></pre>

<h3>Do: Select Only the Columns You Need</h3>

<pre><code>// Wrong — SELECT * transfers all columns including large text fields and blobs
var users = await _db.Users.ToListAsync();

// Correct — project only what the caller needs
var users = await _db.Users
    .Select(u => new { u.Id, u.Email, u.DisplayName })
    .ToListAsync();</code></pre>

<p>This is especially important for tables with <code>TEXT</code>, <code>JSONB</code>, or <code>BYTEA</code> columns — selecting these when you only need the user's name transfers significant data across the connection unnecessarily.</p>

<h3>Do: Avoid N+1 Queries</h3>
<p>An N+1 query is one query to get a list, then one additional query per item in the list to fetch related data. It is one of the most common performance problems in ORM-based backends:</p>

<pre><code>// Wrong — 1 query for orders + 1 query per order for the user = N+1
var orders = await _db.Orders.ToListAsync();
foreach (var order in orders)
{
    var user = await _db.Users.FindAsync(order.UserId); // separate query per order
    Console.WriteLine($"{order.Id}: {user.Email}");
}

// Correct — 1 query with a JOIN
var orders = await _db.Orders
    .Include(o => o.User)
    .ToListAsync();</code></pre>

<p>For read-only scenarios where you only need specific fields from the join, a projection is even better:</p>

<pre><code>var orders = await _db.Orders
    .Select(o => new OrderSummary
    {
        OrderId   = o.Id,
        UserEmail = o.User.Email,
        Status    = o.Status,
        Total     = o.Total
    })
    .ToListAsync();</code></pre>

<h3>Do: Keep Transactions Short</h3>
<p>A database transaction holds locks on the rows it has modified until the transaction commits or rolls back. Long-running transactions block other operations from accessing those rows:</p>

<pre><code>// Wrong — transaction stays open during external HTTP call
await using var transaction = await _db.Database.BeginTransactionAsync();
var order = await _db.Orders.FindAsync(orderId);
order.Status = "processing";
await _db.SaveChangesAsync();

// This HTTP call to a payment provider can take 3-5 seconds
// The lock on the order row is held that entire time
var paymentResult = await _paymentService.ChargeAsync(order.Total);

await transaction.CommitAsync();

// Correct — do the work outside the transaction, wrap only the database writes
var paymentResult = await _paymentService.ChargeAsync(amount); // outside transaction

await using var transaction = await _db.Database.BeginTransactionAsync();
var order = await _db.Orders.FindAsync(orderId);
order.Status = paymentResult.Success ? "completed" : "failed";
order.PaymentReference = paymentResult.Reference;
await _db.SaveChangesAsync();
await transaction.CommitAsync();</code></pre>

<h3>Do: Cache Frequently Read, Rarely Changed Data</h3>
<p>Reference data — country lists, product categories, configuration values — is read thousands of times and almost never changes. Hitting the database for every request is wasteful. Cache it:</p>

<pre><code>// Register Redis cache
builder.Services.AddStackExchangeRedisCache(options =>
{
    options.Configuration = builder.Configuration["Redis:ConnectionString"];
});

// In your service
public async Task&lt;IEnumerable&lt;Category&gt;&gt; GetCategoriesAsync()
{
    const string cacheKey = "categories:all";

    var cached = await _cache.GetStringAsync(cacheKey);
    if (cached is not null)
        return JsonSerializer.Deserialize&lt;IEnumerable&lt;Category&gt;&gt;(cached)!;

    var categories = await _db.Categories.OrderBy(c => c.Name).ToListAsync();

    await _cache.SetStringAsync(
        cacheKey,
        JsonSerializer.Serialize(categories),
        new DistributedCacheEntryOptions { AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(1) }
    );

    return categories;
}</code></pre>

<h3>Don't: Use OFFSET Pagination on Large Tables</h3>
<p><code>OFFSET</code>-based pagination is standard but has a performance problem: to return page 100 of 20 records, the database still reads and discards the first 1,980 rows. This gets progressively slower as users page deeper:</p>

<pre><code>-- Slow on large tables — database must scan and skip 10,000 rows
SELECT * FROM orders ORDER BY created_at DESC LIMIT 20 OFFSET 10000;

-- Faster — cursor-based pagination using the last seen ID
-- Client tracks the last created_at value from the previous page
SELECT * FROM orders
WHERE created_at &lt; '2026-03-01T10:00:00'
ORDER BY created_at DESC
LIMIT 20;</code></pre>

<p>Cursor-based pagination is more complex to implement but stays constant-time regardless of how deep into the results the user has navigated.</p>

<h2>Putting It Together — The Configuration Checklist</h2>
<ul>
  <li>Connection strings stored in environment variables or a secrets manager — never in source code</li>
  <li>Dedicated, least-privilege database user for the application runtime</li>
  <li>Separate, more privileged user for running migrations only</li>
  <li>SSL enforced on all database connections</li>
  <li>Database port not exposed on the public internet</li>
  <li>Connection pooling configured with a sensible maximum</li>
  <li>Foreign keys indexed on the referencing table</li>
  <li>EXPLAIN run on all queries that touch tables expected to grow beyond 50,000 rows</li>
  <li>No <code>SELECT *</code> on tables with wide schemas — project only needed columns</li>
  <li>No N+1 query patterns — use Include or projections</li>
  <li>Transactions kept short — no external calls inside a transaction block</li>
  <li>Frequently read reference data cached in Redis or in-memory cache</li>
</ul>

<h2>The Foundation Everything Else Depends On</h2>
<p>Every layer of a web application — the API, the business logic, the UI — ultimately depends on the database being fast, available, and correct. The decisions covered in this post are not advanced optimisation techniques. They are baseline configuration that prevents the most common, most painful production problems: credential leaks, connection exhaustion under load, and query timeouts as data volume grows.</p>
<p>Getting these right at the start of a project is a fraction of the effort it takes to fix them later, when data is live, users are affected, and the system is under pressure.</p>
<p>If you are setting up a new backend and want the database layer configured correctly from the start, see my <a href="/services/dotnet-backend">.NET backend development services</a> or <a href="/services/fullstack-web-development">full-stack web development services</a>. <a href="/contact">Get in touch</a> to discuss your project.</p>
    `.trim(),
};

export default post;
