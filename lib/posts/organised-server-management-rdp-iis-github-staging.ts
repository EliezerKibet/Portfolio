import type { BlogPost } from "../blog";

const post: BlogPost = {
    id: "23",
    slug: "organised-server-management-rdp-iis-github-staging",
    title: "How to Manage Multiple .NET Applications on a Windows Server Without Breaking Things",
    excerpt: "One careless iisreset takes down every application on the server at once. One developer testing against the wrong database corrupts live data. Here is the structure that makes both impossible.",
    date: "2026-04-26",
    readTime: "10 min read",
    tags: ["DevOps", "IIS", "Windows Server", "Git", "Backend", "Deployment", ".NET"],
    content: `
<h2>Why Structure Matters on a Shared RDP Server</h2>
<p>A Windows Server running multiple applications via IIS is a shared environment. Every application on that server competes for the same resources, shares the same IIS instance, and — if managed carelessly — shares the same risk surface. One poorly timed deployment, one accidental <code>iisreset</code>, or one developer testing against the live database can affect every application running on the machine simultaneously.</p>
<p>The solution is not more careful developers. It is a structure that makes the risky actions impossible by default and the safe actions the path of least resistance. This post covers the four pillars of that structure: separate GitHub repositories per service, a pull-test-deploy workflow, correct IIS app pool management, and a staging environment that mirrors production.</p>

<h2>One Repository Per Service</h2>
<p>The most common mistake on multi-application servers is keeping multiple services in a single monorepo or — worse — deploying directly from a developer's local machine with no repository involved at all. Either approach makes it impossible to know what version of code is actually running on the server.</p>
<p>The rule is simple: each application or service gets its own GitHub repository. This means:</p>
<ul>
  <li>A change to the authentication API cannot accidentally include an unreviewed change to the booking service</li>
  <li>Each service has its own deployment history — you can see exactly what changed and when</li>
  <li>Rolling back one service does not affect any other service on the same server</li>
  <li>Access control is per-repository — a contractor working on the frontend does not have access to the backend API repository</li>
</ul>
<p>A clean server structure follows the repository structure:</p>

<pre><code>C:\\inetpub\\wwwroot\\
├── client-portal-api\\        ← from github.com/org/client-portal-api
├── booking-service\\          ← from github.com/org/booking-service
├── admin-dashboard\\          ← from github.com/org/admin-dashboard
└── public-website\\           ← from github.com/org/public-website</code></pre>

<p>Each folder maps directly to one IIS site or application, and each maps directly to one GitHub repository. There is no ambiguity about what is deployed where.</p>

<h2>The Pull, Test, Deploy Workflow</h2>
<p>Direct deployment from a local machine to a live server — copying files via FTP, dragging folders over RDP — removes version control from the process entirely. The server ends up in an unknown state, and the only way to know what is running is to inspect the files directly.</p>
<p>The correct workflow is:</p>

<pre><code># 1. RDP into the server
# 2. Navigate to the service directory
cd C:\\inetpub\\wwwroot\\booking-service

# 3. Pull the latest from the main branch
git pull origin main

# 4. Build and verify — do not skip this step
dotnet build --configuration Release

# 5. Run any automated tests
dotnet test

# 6. Publish the release build
dotnet publish --configuration Release --output .\\publish

# 7. Recycle only this application's pool (not iisreset — covered below)
# Done via IIS Manager or PowerShell</code></pre>

<p>This workflow means every deployment is traceable. The git log on the server tells you exactly when each version was deployed and what changed. If something breaks, you know the last commit that was pulled, and rolling back is a single command:</p>

<pre><code># Roll back to the previous commit if the deployment caused issues
git revert HEAD
dotnet publish --configuration Release --output .\\publish
# Recycle the app pool</code></pre>

<h2>App Pool Recycle — Never iisreset</h2>
<p>This is the most operationally important habit on a shared IIS server, and the one most often skipped in favour of the easier command.</p>
<p><code>iisreset</code> stops and restarts the entire IIS service. On a server running five applications, <code>iisreset</code> takes all five applications offline simultaneously — including applications that had nothing to do with the deployment you just made. Any requests in flight at that moment are dropped. Any connected users lose their sessions. Scheduled tasks that were mid-execution get terminated.</p>
<p>The correct tool is app pool recycling. Each application in IIS has its own application pool. Recycling one pool restarts only that application, while every other application on the server continues running without interruption:</p>

<pre><code># PowerShell — recycle a specific app pool by name
Import-Module WebAdministration
Restart-WebAppPool -Name "BookingServicePool"

# Or stop and start if a full restart is needed
Stop-WebAppPool  -Name "BookingServicePool"
Start-WebAppPool -Name "BookingServicePool"

# Check the pool state
Get-WebAppPoolState -Name "BookingServicePool"</code></pre>

<p>You can also recycle from IIS Manager without touching the command line: expand Application Pools in the left panel, right-click the target pool, and click Recycle. The other pools are not affected.</p>
<p>Name your app pools explicitly after the application they serve. A pool named <code>DefaultAppPool</code> shared between three applications means recycling it affects all three. One application, one pool, one name:</p>

<pre><code>Application Pools:
├── ClientPortalApiPool      → Client Portal API site
├── BookingServicePool       → Booking Service site
├── AdminDashboardPool       → Admin Dashboard site
└── PublicWebsitePool        → Public Website site</code></pre>

<p>When should you use <code>iisreset</code>? Almost never in production. The only legitimate case is a server-level IIS configuration change that cannot be applied without a full service restart — a scenario that should go through a planned maintenance window, not a routine deployment.</p>

<h2>Staging Server — Test Before It Reaches Live</h2>
<p>A staging server is a second environment that mirrors the production server in configuration but serves no real users. Every deployment goes to staging first. It is tested there. Only then does it go to production.</p>
<p>The minimum viable staging setup mirrors the production directory structure on a separate machine (or a separate IIS site on the same machine, if budget does not allow a second server):</p>

<pre><code>Production server (live):
C:\\inetpub\\wwwroot\\booking-service\\   ← git branch: main

Staging server (test):
C:\\inetpub\\wwwroot\\booking-service\\   ← git branch: staging</code></pre>

<p>The workflow with staging in place:</p>
<ol>
  <li>Developer pushes changes to a feature branch on GitHub</li>
  <li>Feature branch is merged into the <code>staging</code> branch via pull request</li>
  <li>The staging server pulls from the <code>staging</code> branch and deploys</li>
  <li>QA or the developer tests on the staging environment against the staging database</li>
  <li>If tests pass, the staging branch is merged into <code>main</code></li>
  <li>The production server pulls from <code>main</code> and deploys</li>
</ol>

<pre><code># On the staging server
cd C:\\inetpub\\wwwroot\\booking-service
git pull origin staging
dotnet publish --configuration Release --output .\\publish
Restart-WebAppPool -Name "BookingServicePool-Staging"

# On the production server — only after staging is verified
cd C:\\inetpub\\wwwroot\\booking-service
git pull origin main
dotnet publish --configuration Release --output .\\publish
Restart-WebAppPool -Name "BookingServicePool"</code></pre>

<h2>Staging Database vs Live Database</h2>
<p>A staging server connected to the live database is not a staging server. It is a production server with a different application version — and it is one bad test away from corrupting live user data.</p>
<p>The staging database must be a separate database instance. It can run on the same database server but must be a distinct database with its own connection string:</p>

<pre><code>-- Production database
Server: db.internal
Database: bookingapp_production
User: appuser_prod

-- Staging database
Server: db.internal
Database: bookingapp_staging
User: appuser_staging</code></pre>

<p>Connection strings are managed via environment variables or a secrets manager — never hardcoded. The staging and production application pools run under different service accounts, and those accounts only have access to their respective databases.</p>
<p>In ASP.NET Core, the environment determines which connection string is used:</p>

<pre><code>// appsettings.json — production values (empty, read from environment)
{
  "ConnectionStrings": {
    "DefaultConnection": ""
  }
}

// appsettings.Staging.json — staging-specific overrides
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=db.internal;Database=bookingapp_staging;Username=appuser_staging;Password=..."
  }
}

// Set the environment variable on the staging server
ASPNETCORE_ENVIRONMENT=Staging</code></pre>

<p>On the production server, <code>ASPNETCORE_ENVIRONMENT</code> is set to <code>Production</code> and the connection string is injected from the secrets manager or environment variable — never from a file checked into the repository.</p>

<h2>Working With Live Databases Safely</h2>
<p>There are legitimate reasons to access the live database directly: investigating a bug that only reproduces in production, running a one-time data migration, or inspecting data that a support ticket references. The practice is not inherently dangerous — the approach can be.</p>
<p>Rules for live database access:</p>
<ul>
  <li><strong>Read-only by default.</strong> Connect with a read-only database user for any investigative work. Only switch to a write-capable connection when you have a specific, planned operation to execute.</li>
  <li><strong>No schema changes on live without a migration.</strong> Any column addition, index creation, or table modification on the live database must go through the application's migration tooling — not applied manually via a query window. Manual changes are untraceable and unrepeatable.</li>
  <li><strong>Test destructive queries on staging first.</strong> Any UPDATE or DELETE with a WHERE clause should be run on the staging database first. Confirm the row count affected matches expectations before running it on production.</li>
  <li><strong>Wrap data changes in a transaction.</strong> When running manual data corrections on the live database, wrap them in a transaction and verify the results before committing:</li>
</ul>

<pre><code>-- Always use a transaction for manual data changes on live
BEGIN TRANSACTION;

UPDATE orders
SET status = 'refunded'
WHERE payment_reference = 'PAY-2026-00142'
  AND status = 'completed';

-- Verify before committing
SELECT * FROM orders WHERE payment_reference = 'PAY-2026-00142';

-- If the result looks correct
COMMIT;

-- If anything looks wrong
ROLLBACK;</code></pre>

<ul>
  <li><strong>Keep a staging copy current.</strong> Refresh the staging database from a production backup periodically. This ensures staging tests run against realistic data volumes, and any performance issues surface in staging before they hit live.</li>
</ul>

<pre><code># Restore a production backup to staging (PostgreSQL example)
pg_dump -h db.internal -U appuser_prod bookingapp_production > prod_backup.sql
psql  -h db.internal -U appuser_staging bookingapp_staging < prod_backup.sql</code></pre>

<h2>The Complete Structure at a Glance</h2>

<pre><code>GitHub:
  org/service-a (main, staging, feature/* branches)
  org/service-b (main, staging, feature/* branches)

Staging Server:
  IIS Sites:    service-a-staging → ServiceAPool-Staging
                service-b-staging → ServiceBPool-Staging
  Environment:  ASPNETCORE_ENVIRONMENT=Staging
  Database:     bookingapp_staging (separate DB, staging credentials)

Production Server:
  IIS Sites:    service-a → ServiceAPool
                service-b → ServiceBPool
  Environment:  ASPNETCORE_ENVIRONMENT=Production
  Database:     bookingapp_production (live DB, production credentials)

Deployment flow:
  feature/* → staging branch → staging server → verified → main → production server</code></pre>

<h2>What This Structure Prevents</h2>
<p>Every rule in this structure exists because someone, somewhere, learned it the hard way:</p>
<ul>
  <li><strong>iisreset during business hours</strong> — takes every application offline. App pool recycle affects only the one being deployed.</li>
  <li><strong>Testing against the live database</strong> — a test that inserts or deletes records corrupts real user data. Staging database prevents this entirely.</li>
  <li><strong>Deploying untested code directly to production</strong> — a broken build that compiled locally may fail to start on the server. The staging deployment catches this before users see it.</li>
  <li><strong>Not knowing what is running on the server</strong> — without git on the server, there is no deployment history. With git, <code>git log --oneline -5</code> tells you the last five changes deployed and when.</li>
  <li><strong>One repository for everything</strong> — a change to service A that accidentally includes a half-finished change to service B deploys both. Separate repositories make this structurally impossible.</li>
</ul>
<p>These are not advanced DevOps practices. They are the baseline habits that keep a shared server predictable, deployments reversible, and live user data protected. If you are setting up a new server environment or inheriting one that lacks this structure, the git-per-service rule and the app pool recycle habit are the two highest-priority changes to make first.</p>
<p>If you are building or managing a .NET backend that needs a proper deployment setup, see the <a href="/services/dotnet-backend">.NET backend development services</a> page or <a href="/contact">get in touch</a>.</p>
    `.trim(),
};

export default post;
