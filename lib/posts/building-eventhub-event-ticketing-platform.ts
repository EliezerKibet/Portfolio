import type { BlogPost } from '../blog';

const post: BlogPost = {
    id: '2',
    slug: 'building-eventhub-event-ticketing-platform',
    title: 'Building EventHub: A Production-Ready Event Ticketing Platform with .NET 9 and React',
    excerpt: 'How I built EventHub — a full event ticketing platform with 24 passing tests, JWT authentication, real-time capacity management, QR code validation, analytics dashboards, and a CI/CD pipeline. Built with .NET 9, React, TypeScript, and SQL Server.',
    date: '2025-05-02',
    readTime: '8 min read',
    tags: ['React', 'Next.js', 'TypeScript', '.NET 9', 'SQL Server', 'Case Study'],
    image: '/projects/Eventticketing.jpg',
    content: `
<h2>What Is EventHub?</h2>
<p>EventHub is a production-grade event ticketing platform that handles the full lifecycle of an event — from creation and ticket sales to QR code validation and post-event analytics. It's built for three distinct user types: event organizers, customers, and administrators — each with their own portal and permission set.</p>
<p>The project runs on .NET 9 for the API and React with TypeScript for the frontend, with 24 comprehensive tests covering authentication, event management, ticket processing, and analytics.</p>

<h2>Tech Stack</h2>
<ul>
  <li><strong>Backend:</strong> ASP.NET Core Web API (.NET 9), Entity Framework Core, JWT authentication, Swagger/OpenAPI</li>
  <li><strong>Frontend:</strong> Next.js, React, TypeScript, responsive mobile-first design</li>
  <li><strong>Database:</strong> SQL Server with indexed queries and connection pooling</li>
  <li><strong>Testing:</strong> xUnit with FluentAssertions — 24/24 tests passing</li>
  <li><strong>DevOps:</strong> GitHub Actions CI/CD, Docker-ready, Azure/AWS deployment-ready</li>
</ul>

<h2>Architecture: Three User Portals</h2>
<p>The platform is structured around three distinct roles with strictly enforced permissions at the API layer — not just hidden in the UI.</p>
<p><strong>Event Organizers</strong> can create events with multiple ticket tiers, set capacity limits per tier, configure promotional codes, and view real-time analytics on revenue, demographics, and remaining capacity. Creating a tiered event looks like this:</p>
<pre><code>const event = await api.events.create({
  name: "Tech Conference 2025",
  capacity: 500,
  ticketTypes: [
    { name: "Early Bird", price: 299, limit: 100 },
    { name: "Regular",    price: 399, limit: 300 },
    { name: "VIP",        price: 599, limit: 50  }
  ],
  promotions: ["EARLY25", "GROUP10"]
});</code></pre>
<p><strong>Customers</strong> get a seamless booking experience — browse events, select ticket types, apply promo codes, pay via Stripe, and receive QR-coded tickets. They can track order history and manage bookings from their portal.</p>
<p><strong>Administrators</strong> have full system oversight: all events, all transactions, user management, and business analytics.</p>

<h2>Real-Time Capacity Management</h2>
<p>Overbooking is one of the hardest problems in ticketing systems. Two customers booking the last seat simultaneously is a classic race condition. I solved this using optimistic concurrency in Entity Framework Core — every capacity update includes a row version check, so if two requests try to claim the last ticket at the same time, one wins and one gets a clean conflict error with a prompt to retry.</p>
<p>The capacity state is surfaced to the frontend in real time, so customers see live availability without polling aggressively.</p>

<h2>Security-First Design</h2>
<p>Security was designed into the system from day one, not added afterwards:</p>
<ul>
  <li><strong>JWT with refresh token rotation</strong> — access tokens expire quickly; refresh tokens rotate on each use, making token theft ineffective</li>
  <li><strong>Role-based authorization</strong> at the controller level — organizers cannot access admin endpoints even if they construct a valid request manually</li>
  <li><strong>Input sanitization</strong> on all endpoints — preventing injection attacks at the API boundary</li>
  <li><strong>Secure file upload</strong> with MIME type validation and size limits</li>
  <li><strong>Audit logging</strong> — every sensitive action is logged with user ID and timestamp for compliance</li>
</ul>

<h2>Test-Driven Development: 24 Tests</h2>
<p>The test suite covers every critical path in the system:</p>
<ul>
  <li>Authentication and security — 6 tests covering JWT validation, password rules, and authorization boundaries</li>
  <li>Event management — 5 tests covering creation, updates, capacity validation, and deletion</li>
  <li>Ticket processing — 7 tests covering purchase flow, overbooking prevention, promo codes, and refunds</li>
  <li>Analytics and reporting — 4 tests covering revenue calculation and demographic aggregation</li>
  <li>Integration tests — 2 end-to-end workflow tests</li>
</ul>
<p>Writing tests first forced me to design clean, testable business logic. The booking service has no dependencies on the HTTP layer, which means it can be tested in isolation with no database or web server running.</p>

<h2>QR Code Ticket Validation</h2>
<p>Each purchased ticket generates a unique QR code containing a signed token. At the venue, staff scan the QR code which hits <code>POST /api/tickets/validate</code> — the API verifies the signature, checks the ticket hasn't been used, and marks it as validated. The entire validation flow completes in under 200ms, which matters when there's a queue at the door.</p>

<h2>Analytics Dashboard</h2>
<p>The analytics endpoints expose revenue breakdowns, ticket type distribution, demographic data, and capacity utilisation — all queryable by event, date range, or organizer. The frontend renders these as interactive charts, giving organizers actionable insights into what's selling and who's buying.</p>

<h2>CI/CD With GitHub Actions</h2>
<p>Every pull request runs the full test suite automatically. The pipeline builds the .NET API, runs all 24 tests, and blocks merges if any test fails. This means the main branch is always in a deployable state — a requirement I set from the start of the project.</p>

<h2>Performance</h2>
<ul>
  <li>API throughput: 1000+ requests per second under load testing</li>
  <li>Average database query time: under 50ms (achieved through proper indexing)</li>
  <li>Page load time: under 2 seconds for the React frontend</li>
  <li>Memory footprint: under 100MB under normal load</li>
</ul>

<h2>Key Lessons</h2>
<ul>
  <li>Optimistic concurrency in EF Core is the right tool for high-contention scenarios like ticket sales</li>
  <li>JWT refresh token rotation is worth the added complexity — it significantly limits the blast radius of token theft</li>
  <li>Writing tests first produces cleaner architecture — you can't write a unit test for code that has hidden dependencies</li>
  <li>CI/CD is not optional for production systems — automated testing on every PR catches regressions before they ship</li>
  <li>Swagger documentation is not just for external consumers — it's invaluable during development when the frontend and backend are built simultaneously</li>
</ul>

<h2>Get the Code</h2>
<p>The full source is on <a href="https://github.com/EliezerKibet/EventTicketingPlatform" target="_blank" rel="noopener noreferrer">GitHub</a>. Clone it, run <code>dotnet ef database update</code>, start the API and the Next.js frontend, and you'll have a working ticketing platform in minutes.</p>
<p>If you need a ticketing system, booking platform, or similar event management solution built for your business, <a href="/contact">get in touch</a>.</p>
    `.trim(),
};

export default post;
