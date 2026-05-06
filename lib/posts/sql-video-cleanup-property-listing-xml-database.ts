import type { BlogPost } from "../blog";

const post: BlogPost = {
    id: "25",
    slug: "sql-video-cleanup-property-listing-xml-database",
    title: "SQL Queries for Video Cleanup on a Property Listing Platform — Deleting Old Records Safely",
    excerpt:
        "A property listing platform storing XML-generated videos accumulates gigabytes of data for clients and listings that no longer exist. Here is the SQL approach to identifying, backing up, and safely deleting old video records without touching live data.",
    date: "2026-04-28",
    readTime: "9 min read",
    tags: ["Database", "SQL Server", "Performance", "Backend", ".NET", "Architecture"],
    content: `
<h2>The Problem — Video Storage Growing Without Bounds</h2>
<p>A property listing platform generates videos from XML template files. Each listing gets a video, identified by an ID stored in the database alongside the XML reference. The platform works well — until the database has been running for two or three years and the video storage has grown to hundreds of gigabytes from listings that are no longer active, clients who have left, and properties that sold years ago.</p>
<p>The challenge with cleaning this up is that the data is interconnected. A video record links to a listing, which links to a client. Deleting video records without understanding those relationships risks orphaning data or — worse — deleting records that are still in use.</p>
<p>This post covers the safe, methodical SQL approach: identify what can be deleted, back it up first, delete in controlled batches, and verify the result.</p>

<h2>Understanding the Data Structure</h2>
<p>Before writing any DELETE statement, map the relationships. A typical property listing platform video structure looks like this:</p>

<pre><code>-- Core tables involved
Clients         (ClientId, Name, Status, CreatedAt, DeletedAt)
Listings        (ListingId, ClientId, Title, Status, CreatedAt, DeletedAt)
ListingVideos   (VideoId, ListingId, XmlFileReference, StoragePath, FileSizeBytes, CreatedAt, LastAccessedAt)
VideoXmlData    (XmlDataId, VideoId, XmlContent, TemplateVersion, GeneratedAt)</code></pre>

<p>Videos are generated from XML templates and stored with a reference path. Each video belongs to a listing, and each listing belongs to a client. A video is a candidate for deletion when:</p>
<ul>
  <li>Its listing has been inactive or deleted for more than N months</li>
  <li>Its client account is closed or deactivated</li>
  <li>It has not been accessed within a defined retention window</li>
  <li>It is a duplicate — the same listing has multiple video versions and only the latest is needed</li>
</ul>

<h2>Step 1 — Audit What Exists Before Touching Anything</h2>
<p>Run a full audit first. Understand the size of the problem before writing any deletion logic:</p>

<pre><code>-- Total video storage by client status
SELECT
    c.Status                            AS client_status,
    COUNT(DISTINCT c.ClientId)          AS client_count,
    COUNT(v.VideoId)                    AS video_count,
    SUM(v.FileSizeBytes) / 1073741824.0 AS total_size_gb,
    MIN(v.CreatedAt)                    AS oldest_video,
    MAX(v.CreatedAt)                    AS newest_video
FROM ListingVideos v
JOIN Listings      l ON v.ListingId  = l.ListingId
JOIN Clients       c ON l.ClientId   = c.ClientId
GROUP BY c.Status
ORDER BY total_size_gb DESC;

-- Videos for deleted listings (listing soft-deleted but video record remains)
SELECT
    COUNT(v.VideoId)                    AS orphaned_video_count,
    SUM(v.FileSizeBytes) / 1073741824.0 AS orphaned_size_gb
FROM ListingVideos v
JOIN Listings      l ON v.ListingId = l.ListingId
WHERE l.DeletedAt IS NOT NULL
  AND l.DeletedAt < DATEADD(MONTH, -6, GETDATE());

-- Videos not accessed in over 12 months
SELECT
    COUNT(VideoId)                      AS stale_video_count,
    SUM(FileSizeBytes) / 1073741824.0   AS stale_size_gb
FROM ListingVideos
WHERE LastAccessedAt < DATEADD(MONTH, -12, GETDATE())
   OR LastAccessedAt IS NULL;</code></pre>

<p>This gives you the full picture — how many videos, how much space, and which categories account for the most storage — before a single row is touched.</p>

<h2>Step 2 — Identify Deletion Candidates</h2>
<p>Define the deletion criteria clearly and build a query that returns exactly what you intend to delete. Review this output carefully before proceeding:</p>

<pre><code>-- Identify all deletion candidates with full context
SELECT
    v.VideoId,
    v.ListingId,
    v.XmlFileReference,
    v.StoragePath,
    v.FileSizeBytes / 1048576.0         AS file_size_mb,
    v.CreatedAt                         AS video_created,
    v.LastAccessedAt,
    l.Title                             AS listing_title,
    l.Status                            AS listing_status,
    l.DeletedAt                         AS listing_deleted,
    c.ClientId,
    c.Name                              AS client_name,
    c.Status                            AS client_status,
    c.DeletedAt                         AS client_deleted
FROM ListingVideos  v
JOIN Listings       l ON v.ListingId = l.ListingId
JOIN Clients        c ON l.ClientId  = c.ClientId
WHERE
    -- Condition 1: Client account is closed and deleted over 6 months ago
    (c.Status = 'Closed' AND c.DeletedAt < DATEADD(MONTH, -6, GETDATE()))

    -- Condition 2: Listing is deleted and video not accessed in 12 months
    OR (l.DeletedAt IS NOT NULL
        AND (v.LastAccessedAt < DATEADD(MONTH, -12, GETDATE())
             OR v.LastAccessedAt IS NULL))

    -- Condition 3: Listing is inactive and video is older than 18 months
    OR (l.Status = 'Inactive'
        AND v.CreatedAt < DATEADD(MONTH, -18, GETDATE()))
ORDER BY v.FileSizeBytes DESC;</code></pre>

<p>Count and size the candidates before proceeding:</p>

<pre><code>SELECT
    COUNT(*)                            AS deletion_candidate_count,
    SUM(v.FileSizeBytes) / 1073741824.0 AS total_recoverable_gb
FROM ListingVideos  v
JOIN Listings       l ON v.ListingId = l.ListingId
JOIN Clients        c ON l.ClientId  = c.ClientId
WHERE
    (c.Status = 'Closed' AND c.DeletedAt &lt; DATEADD(MONTH, -6, GETDATE()))
    OR (l.DeletedAt IS NOT NULL
        AND (v.LastAccessedAt &lt; DATEADD(MONTH, -12, GETDATE())
             OR v.LastAccessedAt IS NULL))
    OR (l.Status = 'Inactive'
        AND v.CreatedAt &lt; DATEADD(MONTH, -18, GETDATE()));</code></pre>

<h2>Step 3 — Back Up Before Deleting</h2>
<p>Always back up deletion candidates to an archive table before running any DELETE. This costs one INSERT operation and gives you a full recovery path if anything goes wrong:</p>

<pre><code>-- Create archive tables if they do not exist
CREATE TABLE ListingVideos_Archive (
    ArchiveId           INT IDENTITY PRIMARY KEY,
    VideoId             INT,
    ListingId           INT,
    XmlFileReference    NVARCHAR(500),
    StoragePath         NVARCHAR(1000),
    FileSizeBytes       BIGINT,
    CreatedAt           DATETIME2,
    LastAccessedAt      DATETIME2,
    ArchivedAt          DATETIME2 DEFAULT GETDATE(),
    ArchiveReason       NVARCHAR(100)
);

CREATE TABLE VideoXmlData_Archive (
    ArchiveId       INT IDENTITY PRIMARY KEY,
    XmlDataId       INT,
    VideoId         INT,
    XmlContent      XML,
    TemplateVersion NVARCHAR(50),
    GeneratedAt     DATETIME2,
    ArchivedAt      DATETIME2 DEFAULT GETDATE()
);

-- Archive the XML data first (child records)
INSERT INTO VideoXmlData_Archive
    (XmlDataId, VideoId, XmlContent, TemplateVersion, GeneratedAt)
SELECT
    x.XmlDataId,
    x.VideoId,
    x.XmlContent,
    x.TemplateVersion,
    x.GeneratedAt
FROM VideoXmlData x
WHERE x.VideoId IN (
    SELECT v.VideoId
    FROM ListingVideos  v
    JOIN Listings       l ON v.ListingId = l.ListingId
    JOIN Clients        c ON l.ClientId  = c.ClientId
    WHERE
        (c.Status = 'Closed' AND c.DeletedAt &lt; DATEADD(MONTH, -6, GETDATE()))
        OR (l.DeletedAt IS NOT NULL
            AND (v.LastAccessedAt &lt; DATEADD(MONTH, -12, GETDATE())
                 OR v.LastAccessedAt IS NULL))
        OR (l.Status = 'Inactive' AND v.CreatedAt &lt; DATEADD(MONTH, -18, GETDATE()))
);

-- Archive the video records (parent records)
INSERT INTO ListingVideos_Archive
    (VideoId, ListingId, XmlFileReference, StoragePath, FileSizeBytes, CreatedAt, LastAccessedAt, ArchiveReason)
SELECT
    v.VideoId,
    v.ListingId,
    v.XmlFileReference,
    v.StoragePath,
    v.FileSizeBytes,
    v.CreatedAt,
    v.LastAccessedAt,
    CASE
        WHEN c.Status = 'Closed' THEN 'Client closed'
        WHEN l.DeletedAt IS NOT NULL THEN 'Listing deleted'
        ELSE 'Listing inactive'
    END
FROM ListingVideos  v
JOIN Listings       l ON v.ListingId = l.ListingId
JOIN Clients        c ON l.ClientId  = c.ClientId
WHERE
    (c.Status = 'Closed' AND c.DeletedAt &lt; DATEADD(MONTH, -6, GETDATE()))
    OR (l.DeletedAt IS NOT NULL
        AND (v.LastAccessedAt &lt; DATEADD(MONTH, -12, GETDATE())
             OR v.LastAccessedAt IS NULL))
    OR (l.Status = 'Inactive' AND v.CreatedAt &lt; DATEADD(MONTH, -18, GETDATE()));

-- Verify counts match before proceeding
SELECT 'Candidates'  AS source, COUNT(*) AS record_count FROM ListingVideos_Archive WHERE ArchivedAt >= CAST(GETDATE() AS DATE)
UNION ALL
SELECT 'XML Archive' AS source, COUNT(*) AS record_count FROM VideoXmlData_Archive  WHERE ArchivedAt >= CAST(GETDATE() AS DATE);</code></pre>

<h2>Step 4 — Delete in Batches</h2>
<p>Never delete tens of thousands of rows in a single statement on a live database. A large single DELETE holds a lock on the affected rows for its entire duration, blocking any reads or writes to those rows while it runs — exactly the kind of blocking issue covered in the RCSI post.</p>
<p>Delete in batches of 500 to 1000 rows. Each batch is a short transaction, releases its locks quickly, and allows other operations to proceed between batches:</p>

<pre><code>-- Delete XML data first (child records — foreign key order matters)
DECLARE @BatchSize   INT = 500;
DECLARE @DeletedRows INT = 1;

WHILE @DeletedRows > 0
BEGIN
    DELETE TOP (@BatchSize) FROM VideoXmlData
    WHERE VideoId IN (
        SELECT TOP (@BatchSize) VideoId
        FROM ListingVideos_Archive
        WHERE ArchivedAt >= CAST(GETDATE() AS DATE)
    );

    SET @DeletedRows = @@ROWCOUNT;

    -- Brief pause between batches — reduces sustained I/O pressure on live system
    WAITFOR DELAY '00:00:01';

    PRINT 'XML batch deleted: ' + CAST(@DeletedRows AS VARCHAR);
END;

-- Delete video records (parent records)
SET @DeletedRows = 1;

WHILE @DeletedRows > 0
BEGIN
    DELETE TOP (@BatchSize) FROM ListingVideos
    WHERE VideoId IN (
        SELECT TOP (@BatchSize) VideoId
        FROM ListingVideos_Archive
        WHERE ArchivedAt >= CAST(GETDATE() AS DATE)
    );

    SET @DeletedRows = @@ROWCOUNT;

    WAITFOR DELAY '00:00:01';

    PRINT 'Video batch deleted: ' + CAST(@DeletedRows AS VARCHAR);
END;</code></pre>

<h2>Step 5 — Working With the XML File References</h2>
<p>The database holds a reference to each XML file that was used to generate the video. After deleting the database records, the physical XML files on disk also need to be removed. Extract the file paths before deleting:</p>

<pre><code>-- Export storage paths and XML references for file system cleanup
SELECT
    VideoId,
    StoragePath,
    XmlFileReference
FROM ListingVideos_Archive
WHERE ArchivedAt >= CAST(GETDATE() AS DATE)
ORDER BY StoragePath;

-- If the XML content is stored in the database rather than on disk,
-- query it from the archive before the archive is cleaned up
SELECT
    a.VideoId,
    a.XmlFileReference,
    x.XmlContent.value('(/video/title)[1]',        'NVARCHAR(500)') AS video_title,
    x.XmlContent.value('(/video/listingId)[1]',    'INT')           AS xml_listing_id,
    x.XmlContent.value('(/video/templateVersion)[1]', 'NVARCHAR(50)') AS template_version
FROM ListingVideos_Archive  a
JOIN VideoXmlData_Archive   x ON a.VideoId = x.VideoId
WHERE a.ArchivedAt >= CAST(GETDATE() AS DATE);</code></pre>

<p>Pass the exported <code>StoragePath</code> values to a file cleanup script. In a .NET context, this is a background service that reads the paths from the archive table and deletes the physical files:</p>

<pre><code>// .NET background cleanup — reads archived paths and deletes physical files
public class VideoFileCleanupService
{
    private readonly AppDbContext      _db;
    private readonly ILogger&lt;VideoFileCleanupService&gt; _logger;

    public async Task CleanupArchivedFilesAsync()
    {
        var archivedPaths = await _db.ListingVideosArchive
            .Where(a => a.ArchivedAt >= DateTime.Today && !a.FileDeleted)
            .Select(a => new { a.ArchiveId, a.StoragePath, a.XmlFileReference })
            .ToListAsync();

        foreach (var entry in archivedPaths)
        {
            try
            {
                if (File.Exists(entry.StoragePath))
                    File.Delete(entry.StoragePath);

                if (File.Exists(entry.XmlFileReference))
                    File.Delete(entry.XmlFileReference);

                // Mark as file-deleted in the archive
                var record = await _db.ListingVideosArchive.FindAsync(entry.ArchiveId);
                if (record is not null)
                {
                    record.FileDeleted  = true;
                    record.FileDeletedAt = DateTime.UtcNow;
                }

                await _db.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to delete file for ArchiveId {Id}", entry.ArchiveId);
                // Continue — log and move on, do not abort the whole run
            }
        }
    }
}</code></pre>

<h2>Step 6 — Verify and Monitor</h2>
<p>After the batch deletion completes, verify the database and confirm the expected space has been reclaimed:</p>

<pre><code>-- Verify deletion candidates are gone from the live table
SELECT COUNT(*) AS remaining_candidates
FROM ListingVideos  v
JOIN Listings       l ON v.ListingId = l.ListingId
JOIN Clients        c ON l.ClientId  = c.ClientId
WHERE
    (c.Status = 'Closed' AND c.DeletedAt &lt; DATEADD(MONTH, -6, GETDATE()))
    OR (l.DeletedAt IS NOT NULL
        AND (v.LastAccessedAt &lt; DATEADD(MONTH, -12, GETDATE())
             OR v.LastAccessedAt IS NULL))
    OR (l.Status = 'Inactive' AND v.CreatedAt &lt; DATEADD(MONTH, -18, GETDATE()));
-- Expected: 0

-- Check current storage distribution
SELECT
    c.Status                            AS client_status,
    COUNT(v.VideoId)                    AS video_count,
    SUM(v.FileSizeBytes) / 1073741824.0 AS total_size_gb
FROM ListingVideos  v
JOIN Listings       l ON v.ListingId = l.ListingId
JOIN Clients        c ON l.ClientId  = c.ClientId
GROUP BY c.Status;

-- Rebuild indexes on affected tables after large deletions
ALTER INDEX ALL ON ListingVideos REBUILD;
ALTER INDEX ALL ON VideoXmlData  REBUILD;</code></pre>

<p>Rebuild indexes after any large deletion. Deleted rows leave gaps in index pages (fragmentation), which degrade read performance over time. Rebuilding the index reclaims the space and restores the efficiency of lookups.</p>

<h2>Setting Up Automated Retention</h2>
<p>A one-time cleanup solves the immediate problem. Automating the retention policy prevents it from recurring:</p>

<pre><code>-- Scheduled retention procedure — run weekly via SQL Server Agent
CREATE PROCEDURE sp_VideoRetentionCleanup
    @RetentionMonths      INT = 12,
    @BatchSize            INT = 500,
    @ArchiveBeforeDelete  BIT = 1
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @CutoffDate  DATETIME2 = DATEADD(MONTH, -@RetentionMonths, GETDATE());
    DECLARE @DeletedRows INT       = 1;

    IF @ArchiveBeforeDelete = 1
    BEGIN
        INSERT INTO ListingVideos_Archive
            (VideoId, ListingId, XmlFileReference, StoragePath, FileSizeBytes, CreatedAt, LastAccessedAt, ArchiveReason)
        SELECT
            v.VideoId, v.ListingId, v.XmlFileReference, v.StoragePath,
            v.FileSizeBytes, v.CreatedAt, v.LastAccessedAt, 'Automated retention'
        FROM ListingVideos v
        JOIN Listings      l ON v.ListingId = l.ListingId
        JOIN Clients       c ON l.ClientId  = c.ClientId
        WHERE c.Status = 'Closed'
          AND c.DeletedAt &lt; @CutoffDate
          AND v.VideoId NOT IN (SELECT VideoId FROM ListingVideos_Archive);
    END;

    WHILE @DeletedRows > 0
    BEGIN
        DELETE TOP (@BatchSize) FROM ListingVideos
        WHERE VideoId IN (
            SELECT TOP (@BatchSize) v.VideoId
            FROM ListingVideos  v
            JOIN Listings       l ON v.ListingId = l.ListingId
            JOIN Clients        c ON l.ClientId  = c.ClientId
            WHERE c.Status = 'Closed' AND c.DeletedAt &lt; @CutoffDate
        );

        SET @DeletedRows = @@ROWCOUNT;
        WAITFOR DELAY '00:00:01';
    END;
END;</code></pre>

<h2>Safe Deletion Checklist</h2>
<ul>
  <li>Audit storage size and candidate count before writing any DELETE</li>
  <li>Define deletion criteria in a SELECT first — review the output before converting to DELETE</li>
  <li>Back up candidates to archive tables including the XML data</li>
  <li>Export physical file paths before deleting database records</li>
  <li>Delete child records (XML data) before parent records (video records)</li>
  <li>Delete in batches of 500–1000 rows with a brief pause between batches</li>
  <li>Delete physical files separately via application code after database records are confirmed deleted</li>
  <li>Rebuild indexes on affected tables after large deletions</li>
  <li>Automate the retention policy with a scheduled procedure to prevent recurrence</li>
</ul>

<p>For more on preventing blocking during large database operations, see the post on <a href="/blog/rcsi-sql-server-blocking-read-committed-snapshot">RCSI and SQL Server blocking</a>. For overall database configuration and performance, see <a href="/blog/database-context-configuration-security-scalability-performance">database configuration done right</a>. If you are managing a .NET backend with a growing database maintenance problem, see the <a href="/services/dotnet-backend">.NET backend development services</a> page or <a href="/contact">get in touch</a>.</p>
    `.trim(),
};

export default post;
