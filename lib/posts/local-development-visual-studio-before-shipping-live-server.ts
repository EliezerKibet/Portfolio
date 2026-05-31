import type { BlogPost } from '../blog';

const post: BlogPost = {
    id: '30',
    slug: 'local-development-visual-studio-before-shipping-live-server',
    title: 'How to Make Sure Your Application Works Before It Goes Live',
    excerpt: 'The most expensive way to find a bug is on a live server with real users. Here is the local development and compatibility workflow that prevents it — and what every client should expect from their developer.',
    date: '2026-05-28',
    readTime: '6 min read',
    tags: ['Visual Studio', '.NET', 'DevOps', 'Best Practices', 'Backend', 'Deployment', 'Web Development'],
    content: `
<h2>The Problem With Pushing Directly to Live</h2>
<p>A client books a demo for Monday morning. On Sunday evening, the developer pushes a small update — a form change, a pricing adjustment, a new API endpoint. It works fine in the code editor. On Monday morning, the application throws a 500 error on the live server and the demo cannot happen.</p>
<p>This scenario is not rare. It is one of the most common and avoidable ways a project loses client trust. The fix is not more careful developers — it is a workflow that makes shipping broken code structurally difficult.</p>
<p>The rule is simple: <strong>nothing ships to a live server without running first on a local environment that mirrors production.</strong> This article covers exactly how to enforce that rule using Visual Studio.</p>

<h2>What "Local Before Live" Actually Means</h2>
<p>Local development means running the entire application on your own machine before any user can see it. Not just opening the project — actually running it against a local database, with the same configuration your production server uses, and verifying that every changed feature works end to end.</p>
<p>The reason this matters is compatibility. Code that compiles without errors and runs in a development environment can still fail in production because:</p>
<ul>
  <li>The production server runs a different version of .NET or Node.js</li>
  <li>The production database has different data — constraints, null values, existing records — that the local database doesn't have</li>
  <li>Environment-specific configuration values (connection strings, API keys, base URLs) are different</li>
  <li>The production server has less memory or different performance characteristics</li>
  <li>A dependency that's installed locally is missing on the server</li>
</ul>
<p>Each of these is a live failure waiting to happen if code is shipped without being run against a production-equivalent environment first.</p>

<h2>Setting Up Visual Studio for Local Development</h2>
<p>Visual Studio separates development and production configuration through environment-specific settings files. In a .NET application, this looks like:</p>
<pre><code>appsettings.json               ← shared defaults
appsettings.Development.json   ← local overrides (never shipped)
appsettings.Production.json    ← live server values (never local)</code></pre>
<p>The Development file contains the local database connection string, local API keys (test accounts, sandbox credentials), and any flags that change application behaviour during development — verbose logging, seeded test data, disabled rate limiting.</p>
<pre><code>// appsettings.Development.json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=MyApp_Dev;Trusted_Connection=True;"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Debug"
    }
  },
  "FeatureFlags": {
    "EnableDetailedErrors": true
  }
}</code></pre>
<p>Visual Studio reads the environment from the launch profile. In <code>launchSettings.json</code>, the development profile sets the environment variable that tells the application which settings file to use:</p>
<pre><code>// Properties/launchSettings.json
{
  "profiles": {
    "MyApp (Local)": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": true,
      "applicationUrl": "https://localhost:7001",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    }
  }
}</code></pre>
<p>When the application starts locally, it loads the Development settings. When it starts on the live server, it loads Production settings. The same codebase, two completely different configurations — and neither one accidentally bleeds into the other.</p>

<h2>Local Database — Never Test Against Production Data</h2>
<p>This is the rule that protects clients most directly: <strong>development work never touches the production database.</strong></p>
<p>A local development database is a copy of the production schema — same tables, same relationships, same constraints — but populated with test data that can be modified, deleted, or corrupted without consequence. If a migration runs incorrectly locally, you fix it locally. If it runs incorrectly on the production database, you restore from backup and explain to the client why their data was affected.</p>

<pre><code>// ❌ Never do this during development
"ConnectionStrings": {
  "DefaultConnection": "Server=live-server.database.windows.net;..."
}

// ✓ Always develop against a local copy
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=MyApp_Dev;..."
}</code></pre>

<p>Entity Framework migrations should be run locally first, verified that the schema change is correct, and only then applied to the production database — as a deliberate, separate step, not as a side effect of starting the application.</p>

<h2>The Compatibility Checklist Before Shipping</h2>
<p>Before any code goes to the live server, every item on this list should have a confirmed answer:</p>
<ul>
  <li><strong>Does it build cleanly?</strong> Zero errors, zero warnings that could indicate a runtime problem</li>
  <li><strong>Does it run locally?</strong> Application starts without exceptions, all pages load</li>
  <li><strong>Does the changed feature work end to end?</strong> Not just the happy path — test the edge cases, empty states, and error conditions</li>
  <li><strong>Do existing features still work?</strong> A change in one area can break another — check the areas most likely to be affected</li>
  <li><strong>Do the database migrations apply cleanly?</strong> Run them against a fresh copy of the local database and verify the result</li>
  <li><strong>Are any new environment variables documented?</strong> If the code references a new setting, that setting must be added to the production server before deployment</li>
  <li><strong>Does it run against a production-equivalent dataset?</strong> Test with data volumes and conditions that match what the live server will encounter</li>
</ul>
<p>This checklist takes ten to twenty minutes. A failed live deployment takes hours to diagnose and recover from — and damages the client relationship in ways that are difficult to repair.</p>

<h2>Staging — The Step Between Local and Live</h2>
<p>For applications where the cost of downtime is high, a staging environment adds a final layer of verification. Staging is a server that is identical to production — same operating system, same runtime version, same configuration structure — but not accessible to end users.</p>
<p>The deployment workflow becomes:</p>
<pre><code>Local (develop and verify)
  → Staging (deploy and test against production-equivalent server)
    → Production (ship only after staging passes)</code></pre>
<p>Staging catches the class of bugs that only appear on a real server — permission issues, missing dependencies, configuration values that differ from what was expected. It is the last checkpoint before the code reaches users.</p>
<p>Not every project needs a staging environment. A straightforward informational website has lower risk than a financial application or a booking system where errors affect real transactions. The rule of thumb: if a deployment error would directly cost the client money or affect their customers, staging is worth the setup time.</p>

<h2>What Clients Should Expect From Their Developer</h2>
<p>If you are a business owner working with a developer, these are reasonable questions to ask before work begins:</p>
<ul>
  <li><em>"Do you test changes locally before deploying to the live server?"</em></li>
  <li><em>"Do you have a separate development database, or are you working against my live data?"</em></li>
  <li><em>"Is there a staging environment, or does code go directly from development to production?"</em></li>
  <li><em>"What is the rollback plan if a deployment causes an issue?"</em></li>
</ul>
<p>A developer who can answer all four confidently has a professional workflow. One who seems uncertain about any of them is a risk to your live application.</p>
<p>The goal is simple: what ships to your live server should be code that has already been proven to work. Not probably works. Not works on my machine. Works — verified, tested, and confirmed before a single real user sees it.</p>

<p>If you are planning a new application or inheriting a codebase and want to discuss what a proper development and deployment workflow looks like for your project, <a href="/#contact">get in touch</a>. Getting this right at the start is far easier than fixing a broken deployment process midway through a project.</p>
    `.trim(),
};

export default post;
