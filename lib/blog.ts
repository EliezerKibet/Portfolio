export type BlogPost = {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    dateModified?: string;
    tags: string[];
    readTime: string;
    image?: string;
};

const blogPosts: BlogPost[] = [
    {
        id: '1',
        slug: 'how-i-built-appointment-booking-system-embassy',
        title: 'How I Built an Appointment Booking System for an Embassy Website',
        excerpt: 'A deep dive into building a secure, government-grade appointment booking system with 2FA authentication, multi-user backend access, and SendGrid email notifications using React and C#.',
        date: '2026-03-08',
        readTime: '6 min read',
        tags: ['React', 'C#', '.NET', 'SendGrid', 'Tailwind CSS', 'Case Study'],
        image: '/projects/embassy_website_kenya.png',
        content: `
<h2>The Project</h2>
<p>I recently completed one of my most complex projects to date — a full web platform for an embassy. The requirements were demanding: 60 front-end pages, a secure appointment booking system, a media management backend, 2FA authentication, multi-user admin access, and automated email notifications via SendGrid.</p>
<p>Here's how I approached it and what I learned.</p>

<h2>Tech Stack</h2>
<ul>
  <li><strong>Frontend:</strong> React with Tailwind CSS</li>
  <li><strong>Backend:</strong> C# / .NET Web API</li>
  <li><strong>Email:</strong> SendGrid webhook for automated notifications</li>
  <li><strong>Auth:</strong> 2FA with JWT tokens</li>
</ul>

<h2>The Appointment Booking System</h2>
<p>The core challenge was building a booking system that could handle concurrent appointments without conflicts. I implemented a slot-based system where each appointment type (visa application, passport renewal, etc.) has configurable daily slots.</p>
<p>When a user books an appointment, the system:</p>
<ol>
  <li>Checks slot availability in real time</li>
  <li>Reserves the slot with a temporary hold (60-second timeout)</li>
  <li>Confirms the booking and sends a confirmation email via SendGrid</li>
  <li>Sends a reminder email 24 hours before the appointment</li>
</ol>

<h2>2FA and Multi-User Backend</h2>
<p>The admin backend needed multiple staff members with different permission levels — some could only view bookings, others could manage media, and admins had full access. I implemented role-based access control (RBAC) with 2FA using time-based one-time passwords (TOTP).</p>
<p>Every admin login requires a verification code from an authenticator app. This was non-negotiable for a government-adjacent system where data security is critical.</p>

<h2>SendGrid Integration</h2>
<p>The email system uses SendGrid's webhook API to send transactional emails. Each booking triggers a confirmation email with appointment details, QR code, and instructions. The webhook handles delivery status updates so staff can see if emails were received.</p>

<h2>Key Lessons</h2>
<ul>
  <li>Always implement optimistic locking for booking systems to prevent double-booking</li>
  <li>2FA adds complexity but is essential for any system handling sensitive data</li>
  <li>SendGrid's template system saves enormous time for transactional emails</li>
  <li>A media management backend needs careful file validation — accept only what you expect</li>
</ul>

<h2>Result</h2>
<p>The platform went live with 60 pages, a fully functional booking system, and a secure admin backend. You can see the demo at <a href="https://embassydemo.netlify.app/" target="_blank" rel="noopener noreferrer">embassydemo.netlify.app</a>.</p>
<p>If you need a similar system built — a booking platform, government portal, or secure multi-user backend — <a href="/contact">let's talk</a>.</p>
        `.trim(),
    },
    {
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
    },
    {
        id: '3',
        slug: 'building-ai-garage-management-system',
        title: 'Building an AI-Powered Garage Management System with ASP.NET Core 8',
        excerpt: 'A deep dive into building a full garage management platform with role-based access for admins, customers, and mechanics — featuring an AI chatbot, smart scheduling, predictive maintenance, and a RESTful API. Built with ASP.NET Core 8, C# 12, Entity Framework, and SQL Server.',
        date: '2024-01-25',
        readTime: '7 min read',
        tags: ['ASP.NET Core', 'C#', '.NET', 'SQL Server', 'AI', 'Case Study'],
        image: '/projects/AImainpage.jpg',
        content: `
<h2>The Problem With Traditional Garage Operations</h2>
<p>Most auto garages run on a mix of phone calls, paper job cards, and spreadsheets. Customers have no visibility into their vehicle's service status. Mechanics get jobs via word of mouth. Managers have no real-time view of what's happening on the floor. This project was built to fix all of that in one platform.</p>
<p>The AI-Based Garage Management System is a comprehensive platform that connects admins, customers, and mechanics through role-based portals — with AI sitting at the centre to handle scheduling, support, and predictive insights.</p>

<h2>Tech Stack</h2>
<ul>
  <li><strong>Backend:</strong> ASP.NET Core 8.0, C# 12, RESTful Web API with OpenAPI/Swagger</li>
  <li><strong>Frontend:</strong> ASP.NET Core MVC with Razor Pages, modern CSS3, vanilla JavaScript (ES6+)</li>
  <li><strong>Database:</strong> Entity Framework Core with SQL Server</li>
  <li><strong>Authentication:</strong> ASP.NET Core Identity with role-based access control</li>
  <li><strong>AI:</strong> Natural language processing for chatbot, machine learning for predictive analytics</li>
  <li><strong>Testing:</strong> xUnit for unit testing</li>
</ul>

<h2>Three Portals, One System</h2>
<p>The biggest architectural decision was designing three distinct user experiences within a single application — each with different permissions, views, and workflows.</p>

<h3>Admin Dashboard</h3>
<p>Administrators get a complete overview of the business: active jobs, appointment calendar, staff performance, inventory levels, and AI-generated insights. The admin can manage users across all roles, configure system settings, and access detailed reports. The AI layer surfaces anomalies — unusual patterns in bookings, inventory items that are consistently running low, mechanics with high job completion rates.</p>

<h3>Customer Portal</h3>
<p>Customers can book appointments themselves without calling the garage. The portal shows their full vehicle service history, current job status with real-time updates, and upcoming maintenance recommendations. The AI chatbot is embedded directly in the customer portal — available 24/7 to answer questions about services, pricing, and booking availability using natural language.</p>

<h3>Mechanic Dashboard</h3>
<p>Mechanics see only their assigned jobs, with all the information they need: vehicle details, service history, parts required, and job notes. They can update job status, log parts used, and document repairs — creating a complete digital paper trail for every vehicle that comes through the garage.</p>

<h2>The AI Chatbot</h2>
<p>Building a chatbot that actually works in a specific domain is harder than it sounds. The challenge wasn't the NLP itself — it was ensuring the chatbot only answers what it actually knows and doesn't make up responses.</p>
<p>My approach: every chatbot response is grounded to live data from the SQL Server database. When a customer asks "when is my next service due?", the chatbot queries their actual service history and calculates the answer. When asked about pricing, it pulls from the live service catalogue. For anything outside its defined scope, it routes to a human agent rather than guessing.</p>
<p>This makes the chatbot genuinely useful rather than a liability — customers get accurate answers, not hallucinated ones.</p>

<h2>Smart Scheduling With Conflict Detection</h2>
<p>The appointment system does more than just book a slot. It checks mechanic availability, bay capacity, and estimated job duration before confirming a booking. If a requested slot has conflicts, it suggests the next available optimal time rather than just rejecting the booking.</p>
<p>The AI layer goes further — it learns peak booking patterns and suggests off-peak slots to customers, which helps the garage maintain a more even workload distribution throughout the week.</p>

<h2>Predictive Maintenance</h2>
<p>Using historical service data, the system identifies when a vehicle is likely due for specific maintenance items — oil changes, brake inspections, tyre rotations — even if the customer hasn't booked. Automated reminder notifications go out at the right time, keeping the garage's schedule full without any manual follow-up.</p>

<h2>The RESTful API</h2>
<p>The system exposes a full REST API documented with Swagger/OpenAPI. This allows external systems — fleet management software, insurance portals, third-party booking platforms — to integrate with the garage system. Key endpoints include appointment management, customer records, and the AI chatbot endpoint (<code>POST /api/chatbot/ask</code>) which can be embedded in any external interface.</p>

<h2>Authentication and Security</h2>
<p>ASP.NET Core Identity handles authentication with three distinct roles: Admin, Customer, and Mechanic. Each role has a strictly defined set of permissions — mechanics cannot access customer financial data, customers cannot view other customers' records, and only admins can make system-wide configuration changes.</p>
<p>All routes are protected at the controller level using policy-based authorization, not just UI-level hiding.</p>

<h2>Key Lessons</h2>
<ul>
  <li>Ground AI to real data — a chatbot that says "I don't know" is better than one that makes things up</li>
  <li>Design role-based systems at the data layer, not just the UI layer</li>
  <li>Entity Framework Core with SQL Server is a strong foundation for relational business data</li>
  <li>ASP.NET Core Identity handles the complex parts of authentication well — don't reinvent it</li>
  <li>Swagger documentation pays for itself immediately when building API integrations</li>
</ul>

<h2>Get the Code</h2>
<p>The full source code is open source on <a href="https://github.com/EliezerKibet/AI_based_garage" target="_blank" rel="noopener noreferrer">GitHub</a>. Clone it, run <code>dotnet ef database update</code>, and you'll have a working instance in minutes.</p>
<p>If you need a custom management system built for your business — garage, clinic, service centre, or similar — <a href="/contact">get in touch</a>.</p>
        `.trim(),
    },
    {
        id: '4',
        slug: 'building-ecommerce-platform-aspnet-core',
        title: 'Building a Full-Stack E-Commerce Platform with ASP.NET Core: 60 Tests, 98% Coverage',
        excerpt: 'How I built a production-ready e-commerce platform with ASP.NET Core, SQL Server, and a 60-test suite achieving 98% code coverage — covering cart operations, order processing, admin analytics, promotions, and a complete checkout flow.',
        date: '2025-01-25',
        readTime: '8 min read',
        tags: ['ASP.NET Core', 'C#', '.NET', 'SQL Server', 'xUnit', 'Case Study'],
        image: '/projects/ecommercemainpage.jpg',
        content: `
<h2>What Is This Platform?</h2>
<p>This is a full-stack e-commerce platform built with ASP.NET Core Web API on the backend and HTML/CSS/JavaScript on the frontend, using SQL Server for data and ASP.NET Core Identity for authentication. It covers the entire customer journey — product discovery, cart management, checkout, order tracking, reviews — as well as a full admin dashboard with analytics.</p>
<p>What makes this project stand out is the testing infrastructure: 60 passing tests with 98% code coverage, automated CI/CD via GitHub Actions, and performance that holds under 100 concurrent users.</p>

<h2>Tech Stack</h2>
<ul>
  <li><strong>Backend:</strong> ASP.NET Core Web API, MVC pattern, ASP.NET Core Identity</li>
  <li><strong>Frontend:</strong> HTML, CSS, JavaScript</li>
  <li><strong>Database:</strong> SQL Server with Entity Framework Core</li>
  <li><strong>Testing:</strong> xUnit, FluentAssertions, Moq, Entity Framework In-Memory</li>
  <li><strong>CI/CD:</strong> GitHub Actions — tests run on every PR, 95%+ coverage required to merge</li>
</ul>

<h2>Architecture: Clean Separation of Concerns</h2>
<p>The project follows a layered architecture with strict separation between concerns:</p>
<ul>
  <li><strong>Controllers</strong> — handle HTTP requests and delegate to services</li>
  <li><strong>Services</strong> — contain all business logic</li>
  <li><strong>Repositories</strong> — handle data access via Entity Framework</li>
  <li><strong>DTOs</strong> — decouple API contracts from internal models</li>
  <li><strong>Interfaces</strong> — enable dependency injection and testability</li>
</ul>
<p>This structure is what makes 98% test coverage achievable — every layer can be tested in isolation using mocks and in-memory databases.</p>

<h2>The Testing Strategy: 60 Tests, 98% Coverage</h2>
<p>The test suite is the most comprehensive part of this project. Here's the full breakdown:</p>
<ul>
  <li><strong>CartService — 8 tests:</strong> cart creation for new users, adding items with validation, invalid product handling, cart clearing, guest cart operations</li>
  <li><strong>OrderService — 6 tests:</strong> order creation from cart, empty cart validation, order retrieval, user order history, receipt generation, error handling</li>
  <li><strong>ProductService — 6 tests:</strong> product retrieval and search, category filtering, visibility toggle, CRUD validation, invalid ID handling</li>
  <li><strong>CartsController — 14 tests:</strong> all CRUD operations, guest vs authenticated scenarios, cart transfer, full error handling (404, 400, 500)</li>
  <li><strong>CheckoutController — 5 tests:</strong> guest session creation, promotion calculations, receipt generation, order retrieval, checkout workflow</li>
  <li><strong>ProductsController — 8 tests:</strong> product listing with favourites, promotions, search, cookie-based state, error scenarios</li>
  <li><strong>AdminController — 4 tests:</strong> product management CRUD, admin-only operations, validation and authorization</li>
  <li><strong>Model tests — 9 tests:</strong> property validation, price validation, stock quantity rules, cart calculations, date handling</li>
</ul>
<p>The entire suite runs in 3.2 seconds using Entity Framework's in-memory provider, which means developers get fast feedback without needing a real database running locally.</p>

<h2>The Cart System</h2>
<p>The cart handles both guest users (session-based) and authenticated users (database-persisted), with automatic migration when a guest checks out and creates an account. Cart items support gift wrapping options and messages — a small detail that significantly impacts conversion for gift-oriented products.</p>
<p>The cart transfer endpoint (<code>POST /api/Carts/transfer</code>) moves a guest cart into the authenticated user's cart on login, merging quantities for any duplicate items.</p>

<h2>Promotions and Coupons</h2>
<p>The promotions system supports time-limited percentage discounts applied at the product level, and coupon codes applied at checkout. The two can stack under defined rules. The checkout endpoint calculates the final price after all applicable promotions before the order is confirmed — preventing any discrepancy between what the user saw and what they were charged.</p>
<p>The admin can create promotions tied to specific product IDs or categories, set start and end dates, and monitor usage analytics in real time.</p>

<h2>Admin Analytics Dashboard</h2>
<p>The admin dashboard exposes a full analytics API covering sales summaries, revenue by product, customer growth, and promotion effectiveness. These endpoints power the admin frontend charts and are also queryable directly for reporting exports.</p>
<p>The review moderation system lets admins approve or reject customer reviews before they go live, with bulk approval for high-volume periods.</p>

<h2>Performance Benchmarks</h2>
<ul>
  <li>Average API response time: under 50ms for all standard endpoints</li>
  <li>Average database query time: under 10ms</li>
  <li>Tested under 100 concurrent users with stable memory usage</li>
  <li>Page load time: under 2 seconds</li>
</ul>
<p>These numbers come from proper SQL Server indexing on the most queried columns — product category, user ID on cart items, and order date on the orders table.</p>

<h2>CI/CD Pipeline</h2>
<p>GitHub Actions runs the full 60-test suite on every pull request. Merges to main are blocked if any test fails or coverage drops below 95%. This means the main branch is always deployable — a hard requirement I set after experiencing the cost of broken production deployments firsthand.</p>

<h2>Key Lessons</h2>
<ul>
  <li>In-memory EF Core databases make unit tests fast — 60 tests in 3.2 seconds is achievable</li>
  <li>Interface-based design is not over-engineering — it's what makes mocking possible and test coverage meaningful</li>
  <li>Guest-to-user cart migration needs to be tested explicitly — it's one of the most error-prone flows in any e-commerce system</li>
  <li>CI/CD quality gates (coverage thresholds, required passing tests) enforce standards that code reviews alone cannot</li>
  <li>FluentAssertions makes test assertions readable — <code>result.Items.Should().HaveCount(2)</code> is far clearer than <code>Assert.Equal(2, result.Items.Count)</code></li>
</ul>

<h2>Get the Code</h2>
<p>The full source is on <a href="https://github.com/EliezerKibet/ECommerce-Platform" target="_blank" rel="noopener noreferrer">GitHub</a>. Clone it, run <code>dotnet ef database update</code>, and the application starts with pre-seeded test data including products, categories, and active promotions.</p>
<p>If you need an e-commerce platform, product catalogue, or order management system built for your business, <a href="/contact">get in touch</a>.</p>
        `.trim(),
    },
    {
        id: '5',
        slug: 'building-flowlenz-unified-ticket-aggregation-platform',
        title: 'Building Flowlenz: A Unified Ticket Aggregation Platform That Connects Jira and Azure DevOps',
        excerpt: 'How I built Flowlenz POC — a full-stack platform that scrapes Jira and Azure DevOps in real time, normalises tickets into a single unified dashboard, detects duplicate issues across sources, and surfaces AI analysis. Built with ASP.NET Core 9, React 18, TypeScript, PostgreSQL, and Docker.',
        date: '2026-03-11',
        readTime: '9 min read',
        tags: ['ASP.NET Core', 'React', 'TypeScript', 'PostgreSQL', 'Docker', 'Azure DevOps', 'Jira', 'Case Study'],
        image: '/projects/flowlenzmainpage.png',
        content: `
<h2>The Problem</h2>
<p>Most engineering teams don't use a single issue tracker. They use two — or three. Jira for product, Azure DevOps for engineering, maybe GitHub Issues for open source. Context switching between platforms is constant, and the same issue often gets created in multiple systems without anyone realising it.</p>
<p>Flowlenz POC was built to solve that: one dashboard, all your tickets, regardless of source — with AI analysis layered on top.</p>

<h2>What Flowlenz Does</h2>
<p>At its core, Flowlenz continuously scrapes both Jira and Azure DevOps, normalises every ticket into a single unified data model, and presents them side by side in a React frontend. But the interesting parts are what happens beyond that:</p>
<ul>
  <li><strong>Duplicate and similarity detection</strong> — tickets from different sources are compared and scored for similarity. A Jira bug and an Azure DevOps work item describing the same problem get linked automatically with a similarity score</li>
  <li><strong>AI analysis</strong> — each ticket gets an estimated effort time, an auto-generated summary, and a best-assignee recommendation based on historical assignment patterns</li>
  <li><strong>Incremental sync</strong> — neither scraper does a full re-fetch. Each maintains a cursor tracking the last sync timestamp, so only changed issues are processed on subsequent runs</li>
  <li><strong>Advanced search and filtering</strong> — case-insensitive search across all sources, filter by status, sort by date, priority, or title, configurable page sizes</li>
</ul>

<h2>Architecture Overview</h2>
<p>The system is composed of four services sharing a single PostgreSQL database:</p>
<ul>
  <li><strong>TicketSystem.API</strong> — ASP.NET Core 9 REST API serving the React frontend, handling all reads and exposing Swagger documentation</li>
  <li><strong>JiraScraper</strong> — a .NET 9 hosted background service that continuously polls the Jira REST API and upserts into the shared tickets table</li>
  <li><strong>AzureDevOpsScraper</strong> — same pattern for Azure DevOps work items</li>
  <li><strong>React frontend</strong> — React 18 with TypeScript and Tailwind CSS, communicating with the API via Axios</li>
</ul>
<p>All three backend services share the same PostgreSQL database. The two scrapers run as independent background workers — they don't communicate with each other, they just write to the same <code>tickets</code> table. The API reads from that table and serves results to the frontend.</p>

<h2>Tech Stack</h2>
<ul>
  <li><strong>Backend API:</strong> ASP.NET Core 9.0, Entity Framework Core 9, Swagger/OpenAPI</li>
  <li><strong>Background services:</strong> .NET 9 hosted services (IHostedService)</li>
  <li><strong>Frontend:</strong> React 18, TypeScript 4.7, Tailwind CSS 3.4, Axios</li>
  <li><strong>Database:</strong> PostgreSQL 15+ with Npgsql</li>
  <li><strong>Deployment:</strong> Docker Compose — entire stack starts with a single command</li>
</ul>

<h2>The Jira Integration: Cursor-Based Incremental Sync</h2>
<p>The Jira scraper uses cursor-based incremental sync rather than fetching all issues every run. It stores a <code>LastUpdatedUtc</code> timestamp per Jira project in the <code>jira_sync_cursors</code> table. On each sync cycle, it queries Jira's REST API for issues updated after that cursor, with a 2-minute overlap buffer to catch any edge cases.</p>
<p>Auth is Basic auth using a Jira API token (email + Base64-encoded token), which is the standard approach for Jira Cloud. The scraper handles pagination transparently using Jira's <code>nextPage</code> tokens — so a project with 2,000 issues syncs correctly without any manual page management.</p>
<p>Tickets are upserted by issue key. If the same issue key already exists in the database, the latest version wins. This makes the sync idempotent — running it twice produces the same result.</p>

<h2>The Azure DevOps Integration: Polling With Retry</h2>
<p>The Azure DevOps scraper uses Personal Access Token (PAT) authentication and continuously polls for work items at the project level. Unlike the Jira scraper's cursor approach, the Azure DevOps scraper uses a polling interval with three automatic retries on failure and a 5-minute cooldown between retry attempts.</p>
<p>This difference in strategy reflects the APIs themselves — Jira's API makes cursor-based incremental sync straightforward, while Azure DevOps's work item query API is better suited to a polling approach at this integration layer.</p>

<h2>Database Schema</h2>
<p>The schema is designed around the <code>tickets</code> table as the central entity, with satellite tables for AI analysis and similarity relationships:</p>
<ul>
  <li><strong>tickets</strong> — the unified ticket model with fields common to both Jira and Azure DevOps: key, title, description, status, priority, source, complexity, assignee, sprint, team, keywords, and a <code>dirty</code> flag for change tracking</li>
  <li><strong>ticket_ai</strong> — a 1:1 relationship with tickets, storing AI-generated fields: estimated time, summary, and best assignee recommendation</li>
  <li><strong>similar_tickets</strong> — a many-to-many self-join on the tickets table, storing pairs of similar tickets with a similarity score</li>
  <li><strong>jira_sync_cursors</strong> — one row per Jira project, tracking the last sync timestamp with a row version for optimistic concurrency</li>
</ul>

<h2>The Unified API</h2>
<p>The API exposes a clean paginated endpoint at <code>GET /api/tickets</code> that accepts query parameters for page, page size, search, status filter, and sort order. The response includes pagination metadata so the frontend can render page controls without a separate count query:</p>
<pre><code>{
  "tickets": [...],
  "totalCount": 142,
  "page": 1,
  "pageSize": 20,
  "hasNext": true,
  "hasPrevious": false
}</code></pre>
<p>Search uses PostgreSQL's <code>ILIKE</code> operator for case-insensitive matching across ticket key and title. A 300ms debounce on the frontend prevents excessive API calls as the user types.</p>
<p>The <code>GET /api/tickets/{id}</code> endpoint returns a single ticket enriched with its AI analysis from <code>ticket_ai</code> and a list of similar tickets from the <code>similar_tickets</code> table — all surfaced in a detail modal on the frontend.</p>

<h2>Docker Deployment</h2>
<p>The entire stack — API, both scrapers, frontend, and PostgreSQL — runs with a single command:</p>
<pre><code>docker compose -f docker-compose.prod.yml up</code></pre>
<p>This was a deliberate design choice. Demo environments, staging, and client handoffs all start from the same command. No dependency installation steps, no manual database setup — the compose file handles everything including the initial schema migration on first run.</p>

<h2>AI Features: What's Built vs What's Planned</h2>
<p>The AI fields — estimated time, summary, best assignee — are stored in the <code>ticket_ai</code> table and surfaced in the frontend. The storage and retrieval layer is complete. The AI generation pipeline itself (the model that produces these values) is a separate concern outside this POC's scope, which is an intentional architectural decision: the data layer doesn't care how the AI fields are populated, only that they conform to the schema.</p>
<p>This separation means you can plug in any AI backend — OpenAI, a fine-tuned local model, a rule-based heuristic system — without touching the API or frontend.</p>
<p>Similarly, similarity scores are stored in <code>similar_tickets</code> and shown in the UI. The similarity computation engine is a separate service that can be swapped independently.</p>

<h2>Key Design Decisions</h2>
<ul>
  <li><strong>Shared database, independent scrapers</strong> — each scraper writes independently, avoiding the complexity of inter-service communication. The API reads the merged result naturally</li>
  <li><strong>Cursor-based sync for Jira</strong> — fetching only changed tickets is critical for large Jira projects where a full re-fetch would be too slow and hit API rate limits</li>
  <li><strong>Upsert by source key</strong> — makes syncs idempotent, which matters for a background service that runs continuously</li>
  <li><strong>Dirty flag on tickets</strong> — lets the similarity and AI services identify tickets that have changed since their last analysis run, without requiring a full table scan</li>
  <li><strong>Docker-first deployment</strong> — a POC that's hard to run is a POC nobody runs. Single-command startup was a hard requirement</li>
</ul>

<h2>Key Lessons</h2>
<ul>
  <li>Normalising data from multiple external APIs into a single model is harder than it looks — field names, status values, and priority scales all differ between Jira and Azure DevOps</li>
  <li>Cursor-based incremental sync is worth the added complexity for any integration that needs to stay current with large datasets</li>
  <li>Separating AI storage from AI generation keeps the system flexible — the storage layer ships while the AI pipeline is still being developed</li>
  <li>PostgreSQL's <code>ILIKE</code> with a proper index is fast enough for search on a reasonably sized tickets table without needing a dedicated search engine</li>
  <li>Docker Compose multi-service setups need explicit health checks and startup ordering — the API should not start before the database is ready</li>
</ul>

<h2>What's Next</h2>
<p>The POC validates the core architecture. The natural next steps are: plugging in the AI generation pipeline, adding authentication so teams can manage their own API credentials, building the similarity computation engine, and scaling the sync frequency based on project activity levels.</p>
<p>If you're building a tool that integrates across multiple project management platforms, or need a custom aggregation layer for your engineering workflow, <a href="/contact">get in touch</a>.</p>
        `.trim(),
    },
];

export function getAllBlogPosts(): BlogPost[] {
    return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
    return blogPosts.find((post) => post.slug === slug);
}
