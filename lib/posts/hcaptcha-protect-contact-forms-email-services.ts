import type { BlogPost } from '../blog';

const post: BlogPost = {
    id: '14',
    slug: 'hcaptcha-protect-contact-forms-email-services',
    title: 'How to Use hCaptcha to Protect Contact Forms and Avoid Unexpected Email Costs',
    excerpt: 'An unprotected contact form connected to an email service is a liability. One bot finds it and your SendGrid bill spikes overnight. Here\'s how to add hCaptcha in 30 minutes and prevent it entirely.',
    date: '2026-03-23',
    readTime: '6 min read',
    tags: ['Security', 'C#', '.NET', 'ASP.NET Core', 'SendGrid', 'hCaptcha', 'Web Development'],
    content: `
<h2>The Problem Nobody Thinks About Until It Happens</h2>
<p>You build a contact form. You connect it to SendGrid or Resend to deliver the submissions to your inbox. You deploy it. Everything works.</p>
<p>Three months later you get a billing alert.</p>
<p>A bot found your form endpoint — either by crawling your site or by scanning common API paths — and has been submitting it hundreds of times a day. Every submission triggers an email. Every email costs money. Your free tier ran out weeks ago and you didn't notice.</p>
<p>This isn't a hypothetical. It happens to small business sites, portfolio pages, and SaaS contact forms regularly. The fix is straightforward and takes less than 30 minutes to implement. The mistake is not knowing you need it until after the fact.</p>

<h2>Why Bots Target Contact Forms</h2>
<p>Contact forms connected to email services are attractive targets for several reasons:</p>
<ul>
  <li><strong>They're easy to find</strong> — most sites have a /contact page, and the form typically posts to a predictable endpoint like /api/contact or /api/email</li>
  <li><strong>They trigger real actions</strong> — unlike a database write that nobody sees, a contact form triggers an email, which can be used for spam campaigns</li>
  <li><strong>They often have no protection</strong> — developers add the form, test it manually, and ship it without considering automated abuse</li>
  <li><strong>They cost the site owner money</strong> — which is sometimes the point of the attack</li>
</ul>
<p>Even if the attacker gains nothing directly, flooding your email service endpoint drives up your costs and can get your account flagged for abuse.</p>

<h2>Why Frontend Validation Is Not Enough</h2>
<p>The first instinct is to add a rate limit or validation on the frontend. This does nothing.</p>
<p>A bot doesn't use your frontend. It sends HTTP requests directly to your API endpoint. Any validation that only exists in JavaScript is completely invisible to a bot making direct POST requests.</p>
<p>The protection must live server-side — specifically, it must run before your email service is called.</p>

<h2>Why hCaptcha</h2>
<p>hCaptcha is the right choice for most small-to-medium sites for a few reasons:</p>
<ul>
  <li><strong>Free tier is generous</strong> — up to 1 million verifications per month, which covers any portfolio or small business site comfortably</li>
  <li><strong>Privacy-friendly</strong> — GDPR compliant, doesn't track users across sites the way some alternatives do</li>
  <li><strong>Simple integration</strong> — a frontend widget and a single server-side verification call</li>
  <li><strong>Works with any backend</strong> — the verification is a standard HTTP POST, so it works with .NET, Node.js, Python, or anything else</li>
</ul>

<h2>Setting Up hCaptcha</h2>
<p>Sign up at hcaptcha.com. You'll receive two keys:</p>
<ul>
  <li><strong>Site key</strong> — used in your frontend to render the widget (public, safe to expose)</li>
  <li><strong>Secret key</strong> — used server-side to verify tokens (private, treat like a password)</li>
</ul>
<p>Store the secret key in your environment variables or secrets manager. Never put it in source code.</p>

<h2>Frontend Integration</h2>
<p>Add the hCaptcha script and widget to your form. When the user completes the challenge, hCaptcha provides a token. Include that token in your form submission.</p>
<pre><code>&lt;!-- Add to your HTML head --&gt;
&lt;script src="https://js.hcaptcha.com/1/api.js" async defer&gt;&lt;/script&gt;

&lt;!-- Add inside your form --&gt;
&lt;div class="h-captcha" data-sitekey="YOUR_SITE_KEY"&gt;&lt;/div&gt;</code></pre>

<p>In React, use the official package:</p>
<pre><code>npm install @hcaptcha/react-hcaptcha</code></pre>

<pre><code>import HCaptcha from '@hcaptcha/react-hcaptcha';
import { useRef, useState } from 'react';

export function ContactForm() {
  const captchaRef = useRef&lt;HCaptcha&gt;(null);
  const [captchaToken, setCaptchaToken] = useState&lt;string | null&gt;(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaToken) {
      alert('Please complete the captcha');
      return;
    }

    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, captchaToken }),
    });

    captchaRef.current?.resetCaptcha();
  };

  return (
    &lt;form onSubmit={handleSubmit}&gt;
      {/* your form fields */}
      &lt;HCaptcha
        sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!}
        onVerify={(token) => setCaptchaToken(token)}
        ref={captchaRef}
      /&gt;
      &lt;button type="submit"&gt;Send&lt;/button&gt;
    &lt;/form&gt;
  );
}</code></pre>

<h2>Server-Side Verification in ASP.NET Core</h2>
<p>This is the critical part. The token from the frontend must be verified with hCaptcha's API before you do anything else — before you send an email, before you write to a database, before you do anything that costs money or has side effects.</p>

<pre><code>// HCaptchaResponse.cs
public class HCaptchaResponse
{
    [JsonPropertyName("success")]
    public bool Success { get; set; }

    [JsonPropertyName("error-codes")]
    public List&lt;string&gt;? ErrorCodes { get; set; }
}</code></pre>

<pre><code>// HCaptchaService.cs
public interface IHCaptchaService
{
    Task&lt;bool&gt; VerifyAsync(string token);
}

public class HCaptchaService : IHCaptchaService
{
    private readonly HttpClient _http;
    private readonly string _secretKey;

    public HCaptchaService(HttpClient http, IConfiguration config)
    {
        _http = http;
        _secretKey = config["HCaptcha:SecretKey"]
            ?? throw new InvalidOperationException("HCaptcha secret key not configured");
    }

    public async Task&lt;bool&gt; VerifyAsync(string token)
    {
        if (string.IsNullOrWhiteSpace(token)) return false;

        var response = await _http.PostAsync(
            "https://hcaptcha.com/siteverify",
            new FormUrlEncodedContent(new[]
            {
                new KeyValuePair&lt;string, string&gt;("secret", _secretKey),
                new KeyValuePair&lt;string, string&gt;("response", token)
            })
        );

        if (!response.IsSuccessStatusCode) return false;

        var result = await response.Content
            .ReadFromJsonAsync&lt;HCaptchaResponse&gt;();

        return result?.Success ?? false;
    }
}</code></pre>

<pre><code>// Register in Program.cs
builder.Services.AddHttpClient&lt;IHCaptchaService, HCaptchaService&gt;();</code></pre>

<pre><code>// ContactController.cs
[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly IHCaptchaService _captcha;
    private readonly IEmailService _email;

    public ContactController(IHCaptchaService captcha, IEmailService email)
    {
        _captcha = captcha;
        _email = email;
    }

    [HttpPost]
    public async Task&lt;IActionResult&gt; Submit(ContactFormDto dto)
    {
        // Verify captcha FIRST — before touching the email service
        var isHuman = await _captcha.VerifyAsync(dto.CaptchaToken);
        if (!isHuman)
            return BadRequest(new { message = "Captcha verification failed" });

        // Only reaches here if the user passed the captcha challenge
        await _email.SendContactFormAsync(dto);

        return Ok(new { message = "Message sent successfully" });
    }
}</code></pre>

<p>The order matters. Captcha verification first, email service second. A failed captcha exits before any paid service is called.</p>

<h2>The ContactFormDto</h2>
<pre><code>public class ContactFormDto
{
    [Required]
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    [StringLength(2000)]
    public string Message { get; set; } = string.Empty;

    [Required]
    public string CaptchaToken { get; set; } = string.Empty;
}</code></pre>

<p>Note the <code>[Required]</code> on <code>CaptchaToken</code>. If the token is missing entirely, model validation rejects the request before it even reaches your controller action. Belt and suspenders.</p>

<h2>Adding a Rate Limit on Top</h2>
<p>hCaptcha handles bots. Rate limiting handles legitimate users who submit the form repeatedly. In .NET 7+, rate limiting middleware is built in:</p>
<pre><code>// Program.cs
builder.Services.AddRateLimiter(options =>
{
    options.AddFixedWindowLimiter("contact", limiter =>
    {
        limiter.PermitLimit = 3;
        limiter.Window = TimeSpan.FromMinutes(10);
        limiter.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
        limiter.QueueLimit = 0;
    });
});

app.UseRateLimiter();

// On the controller action
[EnableRateLimiting("contact")]
[HttpPost]
public async Task&lt;IActionResult&gt; Submit(ContactFormDto dto) { ... }</code></pre>

<p>3 submissions per 10 minutes per IP. Adjust as needed. Combined with hCaptcha, this makes automated abuse essentially impossible at any meaningful scale.</p>

<h2>Environment Variables Setup</h2>
<p>Your appsettings.json should only contain the key names, not the values:</p>
<pre><code>// appsettings.json — safe to commit
{
  "HCaptcha": {
    "SecretKey": "",
    "SiteKey": ""
  }
}</code></pre>

<pre><code># .env or environment variables — never commit
HCaptcha__SecretKey=your_secret_key_here
HCaptcha__SiteKey=your_site_key_here</code></pre>

<p>In Azure App Service, set these as Application Settings. In Docker, pass them as environment variables. In development, use .NET's user secrets (<code>dotnet user-secrets set "HCaptcha:SecretKey" "your_key"</code>).</p>

<h2>Testing Without the Widget</h2>
<p>hCaptcha provides test keys for development that always pass verification without showing a challenge to the user. Use these in your development environment so you're not solving captchas on every form test:</p>
<ul>
  <li>Test site key: <code>10000000-ffff-ffff-ffff-000000000001</code></li>
  <li>Test secret key: <code>0x0000000000000000000000000000000000000000</code></li>
</ul>
<p>These always return success from hCaptcha's verification endpoint, so your server-side validation code runs correctly in tests without a real challenge.</p>

<h2>The Implementation Checklist</h2>
<ul>
  <li>hCaptcha site key and secret key generated and stored securely</li>
  <li>Frontend widget renders and produces a token on completion</li>
  <li>Token is included in the form submission payload</li>
  <li>Server verifies the token with hCaptcha's API before any other action</li>
  <li>Failed verification returns a 400 and exits — no email sent</li>
  <li>CaptchaToken is marked Required on the DTO</li>
  <li>Rate limiting added as an additional layer</li>
  <li>Test keys used in development, real keys in production via environment variables</li>
</ul>

<h2>Worth the 30 Minutes</h2>
<p>This implementation protects your email service from abuse, keeps your costs predictable, and prevents your domain from being flagged as a spam source. The hCaptcha free tier covers a million verifications per month — more than enough for any contact form.</p>
<p>I added this to the Embassy of Kenya platform before it went live specifically because the contact and appointment forms were connected to SendGrid. An unprotected form on a government-adjacent platform would have been an obvious target.</p>
<p>If you're building a contact form or any form connected to an email service and want to make sure it's properly protected, <a href="/contact">get in touch</a>.</p>
    `.trim(),
};

export default post;
