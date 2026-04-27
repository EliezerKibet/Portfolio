import type { BlogPost } from "../blog";

const post: BlogPost = {
    id: "24",
    slug: "rcsi-sql-server-blocking-read-committed-snapshot",
    title: "How a Blocking Transaction Took Down a Listing Page — and How RCSI Fixed It",
    excerpt:
        "A listing page on a live project started timing out under load. The query was fast, the indexes were correct, and the table was not large. The problem was a long-running write transaction holding a lock that every read query was waiting on. Here is the diagnosis, the fix, and why RCSI should be enabled by default.",
    date: "2026-04-27",
    readTime: "9 min read",
    tags: ["Database", "SQL Server", "Performance", "Backend", ".NET", "C#"],
    content: `
<h2>The Symptom</h2>
<p>A listings page on a live project started hanging intermittently. Not on every request — only under load, and only for a few seconds at a time before resolving. The kind of behaviour that does not reproduce reliably in development and disappears before you finish writing the incident report.</p>
<p>The first instinct in this situation is usually to look at the query. Check the execution plan, verify the indexes, check whether a recent deployment changed the query. In this case, the query was simple:</p>

<pre><code>SELECT
    l.Id,
    l.Title,
    l.Price,
    l.Location,
    l.CreatedAt
FROM Listings l
WHERE l.Status = 'active'
  AND l.CategoryId = @categoryId
ORDER BY l.CreatedAt DESC
OFFSET @offset ROWS
FETCH NEXT 20 ROWS ONLY;</code></pre>

<p>The indexes were correct. The execution plan showed an index seek, not a scan. The table had fewer than 100,000 rows. There was no reason for this query to take more than a few milliseconds.</p>
<p>The problem was not the query. The query was waiting for something else to finish.</p>

<h2>Diagnosing Blocking in SQL Server</h2>
<p>SQL Server provides dynamic management views (DMVs) that expose active sessions, wait states, and blocking relationships in real time. When a query is blocked — waiting for a lock held by another session — it appears in <code>sys.dm_exec_requests</code> with a non-zero <code>blocking_session_id</code>.</p>
<p>Running this during the incident revealed the problem immediately:</p>

<pre><code>SELECT
    blocking.session_id     AS blocking_session,
    blocked.session_id      AS blocked_session,
    blocked.wait_type,
    blocked.wait_time / 1000.0  AS wait_seconds,
    blocked.status,
    DB_NAME(blocked.database_id) AS database_name,
    blocked_text.text        AS blocked_query,
    blocking_text.text       AS blocking_query
FROM sys.dm_exec_requests        blocked
JOIN sys.dm_exec_sessions        blocking
    ON blocked.blocking_session_id = blocking.session_id
CROSS APPLY sys.dm_exec_sql_text(blocked.sql_handle)    AS blocked_text
CROSS APPLY sys.dm_exec_sql_text(blocking.sql_handle)   AS blocking_text
WHERE blocked.blocking_session_id > 0;
</code></pre>

<p>The output showed:</p>
<ul>
  <li>One blocking session running a write transaction — inserting and updating rows in the Listings table as part of a batch import job</li>
  <li>Multiple blocked sessions — all SELECT queries on the same table, each waiting on a <code>LCK_M_S</code> lock (shared lock request, waiting for an exclusive lock to release)</li>
  <li>Wait times ranging from 800ms to over 4 seconds during peak import runs</li>
</ul>
<p>The listing page timeout was not a slow query. It was a fast query waiting behind a locked table.</p>

<h2>Why This Happens — SQL Server's Default Locking Behaviour</h2>
<p>SQL Server's default isolation level is READ COMMITTED. Under this isolation level:</p>
<ul>
  <li>Write operations (INSERT, UPDATE, DELETE) acquire <strong>exclusive locks</strong> on the affected rows for the duration of the transaction</li>
  <li>Read operations (SELECT) acquire <strong>shared locks</strong> on the rows they read</li>
  <li>A shared lock and an exclusive lock are <strong>incompatible</strong> — a reader must wait for a writer to finish, and a writer must wait for all active readers to finish</li>
</ul>

<pre><code>-- Session A: long-running import transaction
BEGIN TRANSACTION;
    INSERT INTO Listings (Title, Price, CategoryId, Status)
    VALUES ('New Property', 250000, 3, 'active');  -- exclusive lock held

    -- ... 200 more inserts, processing external data ...
    -- Exclusive lock held on Listings rows throughout
COMMIT;

-- Session B: listing page query, running at the same time
SELECT Id, Title, Price FROM Listings
WHERE Status = 'active' AND CategoryId = 3
ORDER BY CreatedAt DESC;
-- Waiting for Session A's exclusive lock to release before it can acquire a shared lock
-- Result: LCK_M_S wait — the listing page hangs</code></pre>

<p>Under normal conditions with short transactions this resolves in milliseconds and users never notice. When the write transaction is long-running — a batch import, a bulk update, a report generation job that also writes — readers stack up behind it. Under concurrent load, the wait times compound and requests time out.</p>

<h2>The Fix — Read Committed Snapshot Isolation (RCSI)</h2>
<p>Read Committed Snapshot Isolation is a database-level setting that changes how SQL Server handles reads under the READ COMMITTED isolation level. Instead of acquiring shared locks, readers use <strong>row versioning</strong> — they read a consistent snapshot of the data as it existed before the current transaction started.</p>
<p>The result: readers never wait for writers. Writers never wait for readers. The blocking relationship is eliminated entirely.</p>
<p>Enabling RCSI requires a single command:</p>

<pre><code>-- Check current RCSI status
SELECT name, is_read_committed_snapshot_on
FROM sys.databases
WHERE name = 'YourDatabase';

-- Enable RCSI
-- Note: this requires exclusive access to the database briefly
-- Run during low-traffic period or maintenance window
ALTER DATABASE [YourDatabase]
SET READ_COMMITTED_SNAPSHOT ON
WITH NO_WAIT;</code></pre>

<p>If the database has active connections, use <code>WITH ROLLBACK AFTER</code> to gracefully handle them:</p>

<pre><code>ALTER DATABASE [YourDatabase]
SET READ_COMMITTED_SNAPSHOT ON
WITH ROLLBACK AFTER 30 SECONDS;</code></pre>

<p>After enabling RCSI, verify the change took effect:</p>

<pre><code>SELECT
    name,
    is_read_committed_snapshot_on,
    snapshot_isolation_state_desc
FROM sys.databases
WHERE name = 'YourDatabase';

-- Expected output:
-- name            | is_read_committed_snapshot_on | snapshot_isolation_state_desc
-- YourDatabase    | 1                             | ON</code></pre>

<h2>What Changes After Enabling RCSI</h2>
<p>From the application's perspective, nothing changes. No code modifications are required. Queries continue to run under READ COMMITTED — the isolation level that Entity Framework Core and most .NET database access libraries use by default. The difference is in how SQL Server fulfils those read requests internally.</p>
<p>Before RCSI:</p>

<pre><code>-- Reader acquires shared lock, waits if exclusive lock is held
SELECT * FROM Listings WHERE Status = 'active';
-- ↑ blocked by concurrent INSERT/UPDATE transaction</code></pre>

<p>After RCSI:</p>

<pre><code>-- Reader reads from row version store — no lock acquired
SELECT * FROM Listings WHERE Status = 'active';
-- ↑ returns immediately with the committed state before the active transaction
-- Writer continues uninterrupted</code></pre>

<p>The read returns the last committed state of the data — consistent and correct, just not including the in-progress transaction. This is the same guarantee READ COMMITTED has always provided; RCSI just fulfils it without blocking.</p>

<h2>The Trade-Off — tempdb Usage</h2>
<p>Row versioning has a cost. SQL Server stores previous row versions in <code>tempdb</code> so that concurrent readers can access the snapshot. This increases <code>tempdb</code> I/O and storage usage proportionally to the volume and duration of write transactions.</p>
<p>In practice, for most OLTP applications, this overhead is modest and predictable. The alternative — reader-writer blocking under load — is unpredictable and directly affects user-facing response times.</p>
<p>Monitor <code>tempdb</code> version store size after enabling RCSI:</p>

<pre><code>-- Check version store size and activity
SELECT
    reserved_page_count,
    reserved_space_kb  = reserved_page_count * 8,
    used_page_count,
    user_object_reserved_page_count
FROM sys.dm_db_file_space_usage;

-- Check version store cleanup rate
SELECT
    version_store_reserved_page_count  AS version_store_pages,
    version_store_reserved_page_count * 8 AS version_store_kb
FROM sys.dm_db_file_space_usage;</code></pre>

<p>SQL Server automatically cleans up row versions once no active transaction needs them. If <code>tempdb</code> grows unexpectedly, the usual cause is long-running transactions that prevent version cleanup — which is another argument for keeping transactions short.</p>

<h2>Monitoring for Blocking — Keep This Query Handy</h2>
<p>Even with RCSI enabled, blocking can still occur between concurrent write transactions (writer-writer contention). Keep a blocking monitor query available:</p>

<pre><code>-- Real-time blocking monitor
SELECT
    r.session_id,
    r.blocking_session_id,
    r.wait_type,
    r.wait_time / 1000.0   AS wait_seconds,
    r.status,
    t.text                 AS current_query,
    s.login_name,
    s.host_name,
    s.program_name
FROM sys.dm_exec_requests r
JOIN sys.dm_exec_sessions  s ON r.session_id = s.session_id
CROSS APPLY sys.dm_exec_sql_text(r.sql_handle) t
WHERE r.blocking_session_id > 0
ORDER BY r.wait_time DESC;

-- Find sessions with open transactions
SELECT
    s.session_id,
    s.login_name,
    s.status,
    t.transaction_begin_time,
    DATEDIFF(SECOND, t.transaction_begin_time, GETDATE()) AS open_seconds,
    st.text AS last_query
FROM sys.dm_exec_sessions          s
JOIN sys.dm_tran_session_transactions tst ON s.session_id = tst.session_id
JOIN sys.dm_tran_active_transactions  t   ON tst.transaction_id = t.transaction_id
CROSS APPLY sys.dm_exec_sql_text(s.most_recent_sql_handle) st
ORDER BY t.transaction_begin_time;</code></pre>

<h2>Entity Framework Core — Keeping Transactions Short</h2>
<p>RCSI eliminates reader-writer blocking. It does not eliminate writer-writer blocking. Long-running write transactions still block other writers on the same rows. The complementary habit is keeping transactions as short as possible in application code:</p>

<pre><code>// Long transaction — holds locks for the duration of external calls
await using var tx = await _db.Database.BeginTransactionAsync();

var listing = await _db.Listings.FindAsync(listingId);
listing.Status = "processing";
await _db.SaveChangesAsync();

// External API call — could take 2-5 seconds
// Write lock on the listing row is held throughout this wait
var result = await _externalService.ValidateListingAsync(listing);

listing.Status = result.IsValid ? "active" : "rejected";
await _db.SaveChangesAsync();
await tx.CommitAsync();

// --------------------------------------------------------

// Short transaction — external call outside the transaction
var result = await _externalService.ValidateListingAsync(listingId);

await using var tx = await _db.Database.BeginTransactionAsync();
var listing    = await _db.Listings.FindAsync(listingId);
listing.Status = result.IsValid ? "active" : "rejected";
await _db.SaveChangesAsync();
await tx.CommitAsync();
// Lock held for milliseconds, not seconds</code></pre>

<h2>The Outcome</h2>
<p>After enabling RCSI on the database, the listing page timeouts stopped. The import job continued running on its normal schedule. Concurrent reads on the Listings table returned immediately regardless of what write transactions were in progress.</p>
<p>The diagnostic queries confirmed zero blocking sessions on the Listings table during subsequent import runs. The only change was a single <code>ALTER DATABASE</code> command and no application code modifications.</p>
<p>RCSI is not a silver bullet for all database performance problems. But for any SQL Server database with concurrent reads and writes on the same tables — which is nearly every production application — it should be enabled by default. The reader-writer blocking it eliminates is a reliability problem waiting to surface under load.</p>

<h2>Checklist for Similar Incidents</h2>
<ul>
  <li>Slow query under load that is fast in isolation — check for blocking before optimising the query</li>
  <li>Use <code>sys.dm_exec_requests</code> with <code>blocking_session_id > 0</code> to identify the blocker</li>
  <li>Check <code>wait_type</code> — <code>LCK_M_S</code> is a shared lock wait, confirming reader-writer contention</li>
  <li>Enable RCSI with <code>ALTER DATABASE SET READ_COMMITTED_SNAPSHOT ON</code></li>
  <li>Monitor <code>tempdb</code> version store after enabling — size should be stable and small for short transactions</li>
  <li>Keep write transactions short — do external calls before opening the transaction, not inside it</li>
</ul>

<p>For more on database configuration and how it affects application performance, see the post on <a href="/blog/database-context-configuration-security-scalability-performance">database configuration done right</a>. For database indexing and query performance, see <a href="/blog/database-indexing-postgresql-mysql-query-performance">database indexing in PostgreSQL and MySQL</a>. If you are dealing with a performance issue on a .NET backend, see the <a href="/services/dotnet-backend">.NET backend development services</a> page or <a href="/contact">get in touch</a>.</p>
    `.trim(),
};

export default post;
