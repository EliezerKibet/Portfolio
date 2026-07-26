import type { BlogPost } from '../blog';

const post: BlogPost = {
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
<p>If you need a similar system built — a booking platform, government portal, or secure multi-user backend — see the <a href="/services/fullstack-web-development">full-stack web development services</a> page or <a href="/contact">let's talk</a>.</p>
    `.trim(),
};

export default post;
