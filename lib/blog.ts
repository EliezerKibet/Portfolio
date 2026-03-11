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
        slug: 'building-cybersecurity-platform-react-dotnet',
        title: 'Building a Cybersecurity Platform with React and .NET',
        excerpt: 'How I designed and built Redface — a cybersecurity monitoring platform with real-time threat dashboards, role-based access control, and a .NET backend API.',
        date: '2025-07-15',
        readTime: '5 min read',
        tags: ['React', 'Next.js', 'TypeScript', '.NET', 'Cybersecurity', 'Case Study'],
        content: `
<h2>Why Cybersecurity Software Is Different</h2>
<p>Building software for cybersecurity teams is a unique challenge. The users are technical, the stakes are high, and the data being displayed — threat logs, vulnerability reports, system statuses — needs to be accurate and fast. There is zero margin for UI bugs when someone's infrastructure is on the line.</p>
<p>Redface is a cybersecurity platform I built that brings together threat monitoring, user management, and real-time dashboards into a single interface.</p>

<h2>Tech Stack</h2>
<ul>
  <li><strong>Frontend:</strong> React, Next.js, TypeScript</li>
  <li><strong>Backend:</strong> .NET Web API with C#</li>
  <li><strong>Auth:</strong> JWT with role-based access control</li>
  <li><strong>Data viz:</strong> Custom charts for threat data</li>
</ul>

<h2>The Dashboard Challenge</h2>
<p>The main dashboard needed to display threat data in real time without overwhelming the user. I designed a priority-based system where critical threats surface to the top, with color coding (red/amber/green) for instant status reading.</p>
<p>The data pipeline flows from the .NET API to the React frontend using polling with a 30-second interval — fast enough for operational awareness without hammering the server.</p>

<h2>Role-Based Access Control</h2>
<p>Different team members need different views. Analysts need detailed threat data. Managers need summary reports. Admins need full system access. I implemented three-tier RBAC:</p>
<ul>
  <li><strong>Analyst:</strong> Read access to threat data and reports</li>
  <li><strong>Manager:</strong> Analyst access + report generation + team management</li>
  <li><strong>Admin:</strong> Full access including system configuration</li>
</ul>

<h2>TypeScript Was Essential</h2>
<p>In a domain where data accuracy is critical, TypeScript's type system paid for itself many times over. Every API response is typed, every component prop is validated at compile time. This eliminated an entire class of runtime bugs before they could happen.</p>

<h2>Key Lessons</h2>
<ul>
  <li>In high-stakes software, invest heavily in type safety — it prevents bugs in production</li>
  <li>Real-time data doesn't always require WebSockets — polling works well for 30-second intervals</li>
  <li>Design for the expert user first in technical software — they care about density and speed</li>
  <li>.NET's performance for API-heavy applications is excellent and underrated</li>
</ul>

<p>Want to see the project? Check it out at <a href="/projects/redface-cybersecurity">eliezerkibet.dev/projects/redface-cybersecurity</a>. If you're building a security or monitoring platform, <a href="/contact">get in touch</a>.</p>
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
];

export function getAllBlogPosts(): BlogPost[] {
    return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
    return blogPosts.find((post) => post.slug === slug);
}
