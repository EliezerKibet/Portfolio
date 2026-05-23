import type { BlogPost } from '../blog';

const post: BlogPost = {
    id: '27',
    slug: 'testing-twilio-api-postman-without-us-phone-number',
    title: 'How to Test the Twilio API with Postman When You Don\'t Have a US Phone Number',
    excerpt: 'Twilio\'s dashboard requires phone verification. If you\'re outside the US, that\'s a problem. Here\'s how to test the full Twilio API from anywhere using Postman.',
    date: '2026-05-23',
    readTime: '7 min read',
    tags: ['Twilio', 'Postman', 'API', 'Backend', '.NET', 'C#', 'Testing'],
    content: `
<h2>The Problem</h2>
<p>I was integrating Twilio's Verify API into a project — implementing SMS-based two-factor authentication for a client application. The implementation was done. I needed to test it end to end.</p>
<p>Twilio's dashboard and sandbox environment require a verified phone number to send test messages to. I'm based in Germany. I don't have a US number. The numbers I did have weren't being accepted in the verification flow, and Twilio's free trial restricts outbound messages to verified numbers only.</p>
<p>The frontend of the application I was testing had its own phone input that expected a specific format. There were three blockers stacked on top of each other — and none of them were actually about whether the Twilio API integration I'd written was correct.</p>
<p>The solution took about ten minutes once I remembered a principle I've applied repeatedly: the UI is just one way to talk to an API. When the UI has restrictions, the API itself usually doesn't.</p>

<h2>What You Need Before You Start</h2>
<p>From the Twilio Console you need two things:</p>
<ul>
  <li><strong>Account SID</strong> — visible on the main dashboard, starts with <code>AC</code></li>
  <li><strong>Auth Token</strong> — next to the Account SID, click to reveal</li>
</ul>
<p>If you're testing Twilio Verify specifically, you also need a <strong>Verify Service SID</strong> — create one under Verify → Services in the console. It starts with <code>VA</code>.</p>
<p>Twilio authenticates every API request with HTTP Basic Auth. The username is your Account SID. The password is your Auth Token. Postman handles this natively — no custom headers needed.</p>

<h2>Setting Up Postman</h2>
<p>Open Postman and create a new request. In the Authorization tab, select <strong>Basic Auth</strong> and enter:</p>
<ul>
  <li>Username: your Account SID (<code>ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</code>)</li>
  <li>Password: your Auth Token</li>
</ul>
<p>That's the entire authentication setup. Every Twilio REST API request uses this same pattern regardless of which endpoint you're hitting.</p>

<h2>Sending an SMS</h2>
<p>To test basic SMS sending, set the request to <strong>POST</strong> and use this URL — replacing the Account SID in the path:</p>
<pre><code>https://api.twilio.com/2010-04-01/Accounts/ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/Messages.json</code></pre>
<p>In the Body tab, select <strong>x-www-form-urlencoded</strong> and add these key-value pairs:</p>
<pre><code>From    +1XXXXXXXXXX          (your Twilio number)
To      +49XXXXXXXXXX         (any number you want to test with)
Body    Your test message here</code></pre>
<p>Hit Send. A successful response returns HTTP 201 with a JSON body containing the message SID and a status of <code>queued</code>. Twilio will deliver the message to the <code>To</code> number regardless of where that number is in the world — the geographic restriction on free trial accounts applies to the Twilio number you send from, not the destination.</p>

<h2>Testing Twilio Verify</h2>
<p>Verify is a two-step process: send the code, then check the code. Both steps are separate API calls, and both work identically from Postman regardless of your location.</p>
<p><strong>Step 1 — Send the verification code:</strong></p>
<pre><code>POST https://verify.twilio.com/v2/Services/VAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/Verifications</code></pre>
<p>Body (x-www-form-urlencoded):</p>
<pre><code>To         +49XXXXXXXXXX    (the number to send the code to)
Channel    sms              (or 'call' for voice verification)</code></pre>
<p>A successful response returns <code>status: "pending"</code>. The code will arrive at the destination number via SMS.</p>
<p><strong>Step 2 — Check the verification code:</strong></p>
<pre><code>POST https://verify.twilio.com/v2/Services/VAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/VerificationCheck</code></pre>
<p>Body (x-www-form-urlencoded):</p>
<pre><code>To      +49XXXXXXXXXX
Code    123456            (the code received in the SMS)</code></pre>
<p>A successful verification returns <code>status: "approved"</code>. A wrong or expired code returns <code>status: "pending"</code> with an error. This is exactly what your application backend should be checking when a user submits their code.</p>

<h2>Inspecting the Response to Validate Your Integration</h2>
<p>The real value of running these requests through Postman isn't just that they work — it's that you can see exactly what Twilio returns and verify your backend is handling it correctly.</p>
<p>For a .NET integration using the Twilio C# SDK, the Postman response gives you the exact JSON shape your code will receive. If your application checks <code>verification.Status == "approved"</code> before granting access, you can confirm that string matches what the API actually returns before writing a single unit test.</p>
<p>It also lets you test the failure paths cleanly. Send an incorrect code intentionally. Send an expired code. Send a request without the Auth Token. Each failure mode returns a different error structure — and knowing those structures before they happen in production means your error handling is tested against real Twilio responses, not assumptions.</p>

<h2>Using Environment Variables in Postman</h2>
<p>Once the requests are working, store the credentials in a Postman environment rather than pasting them into each request. Create an environment with these variables:</p>
<pre><code>TWILIO_ACCOUNT_SID     ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN      your_auth_token
TWILIO_VERIFY_SID      VAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_FROM_NUMBER     +1XXXXXXXXXX</code></pre>
<p>Then reference them in your requests with double curly braces:</p>
<pre><code>https://api.twilio.com/2010-04-01/Accounts/{{TWILIO_ACCOUNT_SID}}/Messages.json</code></pre>
<p>This lets you switch between test and production credentials by switching environments, and it keeps credentials out of any collection you might share with a team.</p>

<h2>The Broader Point</h2>
<p>Twilio's API doesn't know or care that you're in Germany. Neither does any other REST API. Geographic restrictions, phone number requirements, region-locked dashboards — these are frontend constraints. The API itself accepts authenticated HTTP requests from anywhere in the world.</p>
<p>Postman is the fastest way to get to the API layer directly when the application's own interface is blocking you. No US phone number required. No VPN. No waiting for a workaround. Just the Account SID, the Auth Token, and the endpoint from the documentation.</p>
<p>If you're implementing any Twilio product — Verify, Messaging, Voice, or Lookup — test the API calls in Postman first, before wiring them into your application. You'll understand exactly what you're integrating before you write a line of code, and you'll have a set of working requests you can run again any time you need to verify the integration is still behaving as expected.</p>
`,
};

export default post;
