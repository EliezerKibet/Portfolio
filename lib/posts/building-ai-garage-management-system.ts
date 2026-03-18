import type { BlogPost } from '../blog';

const post: BlogPost = {
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
};

export default post;
