import type { BlogPost } from "../blog";

const post: BlogPost = {
  id: "10",
  slug: "dotnet-migrations-framework-to-modern-dotnet",
  title:
    "The .NET Timeline: From Framework to Modern .NET and How I've Used It in Production",
  excerpt:
    "A clear breakdown of the .NET evolution — from .NET Framework to .NET Core to the unified .NET 5–9 platform — and how I've applied each in real projects including FlowLenz and the Embassy of Kenya platform.",
  date: "2026-03-18",
  readTime: "7 min read",
  tags: [".NET", "C#", "ASP.NET Core", "Backend", "Web Development"],
  content: `
<h2>Why There Are So Many .NET Versions</h2>
<p>If you've worked with .NET for any amount of time, you've noticed the naming is confusing. .NET Framework. .NET Core. .NET 5. .NET 8. Are these the same thing? Different things? Which one should you use?</p>
<p>Here's the full picture.</p>

<h2>.NET Framework (2002–2019)</h2>
<p>The original. Windows only. Deployed to IIS. Tightly coupled to the Windows operating system and the GAC (Global Assembly Cache).</p>
<p>For nearly two decades, .NET Framework powered the backbone of enterprise software, banking systems, government platforms, internal business tools. It was solid, mature, and well-documented. But it had a fundamental constraint: it only ran on Windows. In a world moving toward Linux containers and cloud-native deployments, that was an increasingly significant limitation.</p>
<p>The current version is 4.8.1. It still receives security patches, but Microsoft has been clear: no new features. It's in maintenance mode. If you're maintaining a .NET Framework 4.x codebase, it works  but migrating to modern .NET is worth planning for.</p>

<h2>.NET Core 1.0–3.1 (2016–2020)</h2>
<p>Microsoft's answer to the modern web. Cross-platform, lightweight, open source, and built from scratch rather than ported from the Framework.</p>
<p>This was the moment C# developers could run their backends on Linux which changed everything for cloud deployments, Docker containers, and microservice architectures. ASP.NET Core (the web framework built on .NET Core) was significantly faster than its Framework predecessor, and the performance benchmarks showed it competing with Node.js and Go.</p>
<p>.NET Core 3.1 was an LTS release and became the stable foundation many production systems were built on. It introduced WPF and Windows Forms support, bringing desktop development into the cross-platform era for the first time.</p>

<h2>.NET 5 (2020) — The Unification</h2>
<p>Microsoft dropped the "Core" branding and merged everything into one platform. One SDK. One runtime. One set of base class libraries. The version jump from 3.1 to 5 (skipping 4) was intentional — to avoid confusion with .NET Framework 4.x.</p>
<p>This was the moment .NET became the framework I recommend to new projects without hesitation. The fragmentation between Framework and Core was resolved. You now had one platform that ran everywhere — Windows, Linux, macOS — with a predictable release cadence and a clear migration path forward.</p>

<h2>.NET 6, 7, 8, 9 (2021–Present)</h2>
<p>Each release has brought meaningful improvements:</p>

<h3>.NET 6 (LTS)</h3>
<p>Minimal APIs which is a new way to write ASP.NET Core applications with significantly less boilerplate. Hot reload in development. Native Apple Silicon support. .NET MAUI preview for cross-platform mobile/desktop. This was a landmark release and the first unified LTS version.</p>

<h3>.NET 7</h3>
<p>Performance improvements across the board with rate limiting middleware, output caching built in, improved JSON handling. The runtime team consistently delivers measurable throughput gains with each release, and .NET 7 was no exception.</p>

<h3>.NET 8 (LTS — Current Recommended)</h3>
<p>Native AOT (Ahead-of-Time compilation) for dramatically smaller, faster-starting executables. Blazor improvements. Keyed dependency injection. Improved Docker support with smaller base images. If you're starting a new project today, .NET 8 is the right choice — it's the current LTS and will receive support until November 2026.</p>

<h3>.NET 9</h3>
<p>Released November 2024. Not an LTS release, but brings further performance improvements, HybridCache for distributed caching scenarios, and OpenAPI improvements. Good for teams that want the latest features and aren't constrained to LTS versions.</p>

<h2>How I've Used This in Production</h2>

<h3>FlowLenz — ASP.NET Core 9</h3>
<p>FlowLenz is a unified ticket aggregation platform that scrapes both Jira and Azure DevOps, normalises tickets into a single data model, and surfaces AI analysis across them. The backend runs on ASP.NET Core 9 with Entity Framework Core 9 and PostgreSQL.</p>
<p>The cross-platform nature of modern .NET was essential here. The entire stack — API, background scrapers, and PostgreSQL — runs in Docker containers, started with a single <code>docker compose up</code> command. That wouldn't have been possible with .NET Framework. The hosted services pattern (<code>IHostedService</code>) for the Jira and Azure DevOps background scrapers is clean and well-supported in modern .NET, with built-in lifecycle management and cancellation token support.</p>

<h3>Embassy of Kenya Platform — ASP.NET Core (Layered Middleware)</h3>
<p>The Embassy platform was a 60-page web application with a slot-based appointment booking system, SendGrid email notifications, media management, and 2FA-secured multi-role admin access.</p>
<p>The .NET backend handled the layered middleware architecture for authentication — managing Admin, Staff, and Public roles with strictly enforced permissions at the controller level. Role-based access control with 2FA (TOTP) via ASP.NET Core Identity is well-supported in modern .NET, and the middleware pipeline made implementing the layered security model straightforward.</p>

<h3>EventHub — .NET 9 With 24 Passing Tests</h3>
<p>A production-grade event ticketing platform with optimistic concurrency in Entity Framework Core for the ticket sales flow, JWT with refresh token rotation for authentication, and a 24-test suite covering every critical path. The test suite runs in under 4 seconds using EF Core's in-memory provider — a benefit of modern .NET's clean dependency injection and testable architecture.</p>

<h2>The Migration Question: Framework → Modern .NET</h2>
<p>If you're maintaining a .NET Framework 4.x codebase and considering a migration, here's the honest picture:</p>
<ul>
  <li><strong>It's a platform change, not an upgrade.</strong> The APIs have changed. Some things that existed in Framework don't exist in modern .NET. Some things work differently. Plan it properly.</li>
  <li><strong>Run both in parallel until you're confident.</strong> Don't do a big-bang migration. Migrate service by service, or feature by feature, with the old and new running side by side.</li>
  <li><strong>Use the .NET Upgrade Assistant.</strong> Microsoft's official tool automates a significant portion of the migration — upgrading NuGet packages, updating project file formats, and flagging breaking changes.</li>
  <li><strong>Test coverage before you start.</strong> A codebase with good test coverage is much safer to migrate. Tests tell you immediately when something breaks. Without them, you're discovering breakage in production.</li>
</ul>

<h2>Which Version Should You Use Today?</h2>
<p>Simple answer:</p>
<ul>
  <li><strong>New project:</strong> .NET 8 (LTS). Well-supported, stable, and will receive updates until November 2026.</li>
  <li><strong>Existing .NET 6 or 7 project:</strong> Plan to upgrade to .NET 8 before your current version goes out of support.</li>
  <li><strong>Maintaining .NET Framework 4.x:</strong> It works. If it's not broken and there's no business case for migration, don't rush. But plan for it — the ecosystem is moving on.</li>
  <li><strong>Starting a new project and want the latest:</strong> .NET 9 is fine if you're comfortable with non-LTS support timelines (18 months).</li>
</ul>

<h2>The Reputation Gap</h2>
<p>There's still a perception in some circles that .NET is a Windows-only, enterprise-only, legacy technology. That was true of .NET Framework. It hasn't been true of modern .NET for years.</p>
<p>Modern .NET is cross-platform, performant, open source, and actively developed. The runtime performance benchmarks are competitive with Go and Node.js. The ecosystem has first-class support across Azure, AWS, and GCP. And the tooling  Rider, VS Code, Visual Studio  is excellent.</p>
<p>If you made a decision about .NET based on the Framework era and haven't revisited it, it's worth looking again.</p>

<p>If you're building a backend and want to talk through which approach makes sense for your project  .NET, Node.js, or something else  <a href="/contact">get in touch</a>. Happy to give an honest recommendation based on your actual requirements.</p>
    `.trim(),
};

export default post;
