export type BlogPost = {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    tags: string[];
    readTime: string;
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
];

export function getAllBlogPosts(): BlogPost[] {
    return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
    return blogPosts.find((post) => post.slug === slug);
}
