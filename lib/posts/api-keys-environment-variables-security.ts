import type { BlogPost } from '../blog';

const post: BlogPost = {
    id: '15',
    slug: 'api-keys-environment-variables-security',
    title: 'Why API Keys and Service Credentials Must Never Live in Your Code',
    excerpt: 'A leaked API key can cost you money, compromise your users, and destroy your domain reputation — all before you notice. Here is the correct pattern for managing secrets in any web application.',
    date: '2026-03-24',
    readTime: '6 min read',
    tags: ['Security', 'C#', '.NET', 'Web Development', 'Best Practices', 'Backend'],
    content: `
<h2>The Mistake That Keeps Happening</h2>
<p>I have seen live API keys committed to public GitHub repositories more times than I should have. SendGrid keys. Stripe secret keys. Database connection strings. OpenAI keys with active billing. All sitting in source code, visible to anyone who finds the repository.</p>
<p>Most of the time it is not malicious. It is a developer moving fast who hardcoded a key to test something quickly, meant to move it to an environment variable later, and either forgot or assumed the repo was private. Then the repo gets made public. Or a collaborator is added. Or GitHub's secret scanning catches it — after it has already been indexed.</p>
<p>The consequences range from an unexpected bill to a full data breach. The prevention takes 30 seconds.</p>

<h2>What Can Go Wrong With a Leaked Key</h2>
<p>The impact depends on which key is exposed, but none of the scenarios are good:</p>
<ul>
  <li><strong>Stripe secret key</strong> — an attacker can retrieve customer data, issue refunds, create charges, and access your full payment history. Stripe will hold you liable for fraudulent activity conducted with your own key.</li>
  <li><strong>SendGrid or email API key</strong> — an attacker can send emails from your domain at scale. This destroys your sender reputation, gets your domain blacklisted by email providers, and can be used for phishing campaigns that trace back to you.</li>
  <li><strong>Database connection string</strong> — direct read and write access to your production database. Every user record, every transaction, every piece of data you store.</li>
  <li><strong>OpenAI or AI service key</strong> — the attacker runs queries at your expense. API costs can spike to hundreds or thousands of dollars before you notice.</li>
  <li><strong>Cloud provider credentials (AWS, Azure, GCP)</strong> — potentially the most severe. An attacker with cloud credentials can spin up infrastructure at your cost, access all services in your account, and exfiltrate or destroy data.</li>
</ul>
<p>GitHub's secret scanning catches many of these automatically and notifies you — but the window between a push and the notification is enough for automated bots that continuously scan public commits to find and use the key first.</p>

<h2>The Correct Pattern</h2>
<p>The rule is simple: configuration structure lives in code, configuration values live in environment variables.</p>

<h3>What Goes in appsettings.json (Safe to Commit)</h3>
<pre><code>{
  "SendGrid": {
    "ApiKey": "",
    "FromEmail": "",
    "FromName": ""
  },
  "Stripe": {
    "SecretKey": "",
    "PublishableKey": "",
    "WebhookSecret": ""
  },
  "ConnectionStrings": {
    "DefaultConnection": ""
  },
  "HCaptcha": {
    "SecretKey": "",
    "SiteKey": ""
  }
}</code></pre>

<p>This file defines the shape of your configuration — which keys exist, how they are grouped — without containing any real values. It is safe to commit because it contains nothing sensitive.</p>

<h3>What Goes in Environment Variables (Never Committed)</h3>
<pre><code># .env (local development only — in .gitignore)
SendGrid__ApiKey=SG.xxxxxxxxxxxxxxxxxxxxxxxx
SendGrid__FromEmail=hello@yourdomain.com
SendGrid__FromName=Your Name

Stripe__SecretKey=sk_live_xxxxxxxxxxxxxxxx
Stripe__WebhookSecret=whsec_xxxxxxxxxxxxxxxx

ConnectionStrings__DefaultConnection=Server=yourserver;Database=yourdb;...

HCaptcha__SecretKey=0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</code></pre>

<p>Note the double underscore (<code>__</code>) separator. In .NET, this maps directly to the nested structure in appsettings.json — <code>SendGrid__ApiKey</code> maps to <code>SendGrid:ApiKey</code>. This is the standard .NET configuration binding convention.</p>

<h3>Reading Configuration in C#</h3>
<pre><code>// Injected via IConfiguration — never hardcoded
public class EmailService
{
    private readonly string _apiKey;
    private readonly string _fromEmail;

    public EmailService(IConfiguration config)
    {
        _apiKey = config["SendGrid:ApiKey"]
            ?? throw new InvalidOperationException(
                "SendGrid API key is not configured. Set the SendGrid__ApiKey environment variable.");

        _fromEmail = config["SendGrid:FromEmail"]
            ?? throw new InvalidOperationException(
                "SendGrid from email is not configured.");
    }
}</code></pre>

<p>The <code>??throw</code> pattern is important. It makes a missing configuration value fail loudly at startup rather than silently at runtime when the service is first called. You want to know immediately if a required key is missing — not when a user tries to reset their password and gets an unhandled exception.</p>

<h3>Strongly Typed Configuration (Preferred for Larger Projects)</h3>
<p>For projects with multiple configuration sections, strongly typed options classes are cleaner than reading string keys directly:</p>

<pre><code>// SendGridOptions.cs
public class SendGridOptions
{
    public string ApiKey { get; set; } = string.Empty;
    public string FromEmail { get; set; } = string.Empty;
    public string FromName { get; set; } = string.Empty;
}

// Program.cs
builder.Services.Configure&lt;SendGridOptions&gt;(
    builder.Configuration.GetSection("SendGrid")
);

// EmailService.cs
public class EmailService
{
    private readonly SendGridOptions _options;

    public EmailService(IOptions&lt;SendGridOptions&gt; options)
    {
        _options = options.Value;

        if (string.IsNullOrWhiteSpace(_options.ApiKey))
            throw new InvalidOperationException("SendGrid API key not configured");
    }
}</code></pre>

<p>This approach gives you compile-time safety on configuration property names and makes it obvious which settings a service depends on.</p>

<h2>The .gitignore Setup</h2>
<p>Add your secrets file to .gitignore before the first commit. Once a file has been committed, removing it from .gitignore does not remove it from git history — it remains accessible in older commits forever unless you rewrite history.</p>

<pre><code># .gitignore
.env
.env.local
.env.development
.env.production
*.secrets.json
appsettings.Development.json  # if you put real values here</code></pre>

<p>The standard .NET gitignore generated by <code>dotnet new gitignore</code> already includes common secret file patterns — but verify it covers what you are using before your first push.</p>

<h2>Where Secrets Live in Each Environment</h2>

<h3>Local Development</h3>
<p>Two good options:</p>
<p><strong>.env file</strong> — simple, works with any stack, just make sure it is in .gitignore.</p>
<p><strong>.NET User Secrets</strong> — stored outside the project directory in your user profile, so there is no risk of accidentally committing them:</p>
<pre><code>dotnet user-secrets init
dotnet user-secrets set "SendGrid:ApiKey" "SG.your_key_here"
dotnet user-secrets set "Stripe:SecretKey" "sk_live_your_key_here"</code></pre>
<p>User secrets are automatically loaded in the Development environment and never stored in the project folder.</p>

<h3>Production</h3>
<p>Use your platform's native secrets management:</p>
<ul>
  <li><strong>Vercel</strong> — Environment Variables in project settings. These are injected at build time and runtime, never stored in your code.</li>
  <li><strong>Azure App Service</strong> — Application Settings in the portal. These override appsettings.json values and are encrypted at rest.</li>
  <li><strong>Azure Key Vault</strong> — for enterprise scenarios where secrets need auditing, rotation policies, and access control.</li>
  <li><strong>AWS</strong> — Secrets Manager or Parameter Store, depending on requirements.</li>
  <li><strong>Docker / self-hosted</strong> — pass environment variables in your docker-compose.yml or deployment configuration, sourced from a secrets manager rather than hardcoded.</li>
</ul>
<p>The rule of thumb: the more sensitive the key, the more formal the secrets management should be. A personal project on Vercel uses environment variables in the dashboard. An enterprise system with PCI compliance requirements uses Key Vault with access policies and rotation.</p>

<h2>What to Do If You Have Already Committed a Key</h2>
<p>If you have already pushed a secret to a repository — public or private — treat it as compromised immediately. Do not wait to see if anyone noticed.</p>
<ol>
  <li><strong>Rotate the key immediately</strong> — go to the service's dashboard and generate a new key. Invalidate the old one.</li>
  <li><strong>Audit the service for unauthorized usage</strong> — check Stripe for unexpected charges, SendGrid for unusual sending volume, your database for unexpected connections.</li>
  <li><strong>Remove the secret from the repository</strong> — either rewrite git history (git filter-branch or git filter-repo) or, for public repositories, assume the key has already been scraped and focus on rotation rather than removal.</li>
  <li><strong>Add the secrets file to .gitignore</strong> before committing the new key.</li>
</ol>
<p>Rewriting git history is disruptive and does not guarantee the key was not already indexed. Rotation is the only reliable remediation.</p>

<h2>A Practical Checklist</h2>
<p>Before any project's first commit:</p>
<ul>
  <li>.gitignore created and includes .env and secrets files</li>
  <li>appsettings.json contains structure but no values</li>
  <li>All real credentials in environment variables or user secrets</li>
  <li>Configuration read via IConfiguration or IOptions, never hardcoded</li>
  <li>Missing required configuration throws at startup, not at runtime</li>
</ul>
<p>Before any project goes to production:</p>
<ul>
  <li>All secrets loaded from the platform's environment variable system</li>
  <li>No .env files on the production server</li>
  <li>Production keys are different from development keys (separate Stripe accounts, separate SendGrid API keys)</li>
  <li>Minimum required permissions for each key — a key that only sends email should not have admin access to the account</li>
</ul>

<h2>It Takes 30 Seconds</h2>
<p>The correct pattern is not significantly more work than hardcoding a key. Setting up a .env file and reading from IConfiguration takes the same amount of time as copy-pasting a key directly into code. The difference is that one of those approaches can create a serious security incident six months from now, and the other cannot.</p>
<p>I follow this pattern on every project I build — from the Embassy of Kenya platform with its SendGrid integration to the hCaptcha-protected contact forms on smaller sites. The configuration structure is always committed. The values never are.</p>
<p>If you are building an integration with any external service and want to make sure it is set up securely from the start, <a href="/contact">get in touch</a>.</p>
    `.trim(),
};

export default post;
