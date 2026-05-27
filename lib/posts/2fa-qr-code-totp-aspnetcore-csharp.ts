import type { BlogPost } from "../blog";

const post: BlogPost = {
    id: "19",
    slug: "2fa-qr-code-totp-aspnetcore-csharp",
    title: "How to Add Two-Factor Authentication with QR Codes to an ASP.NET Core App",
    excerpt: "A leaked password alone should not be enough to access a system handling sensitive data. Here is a complete, copy-paste walkthrough for adding TOTP-based 2FA with QR code setup to ASP.NET Core.",
    date: "2026-03-27",
    readTime: "10 min read",
    tags: [".NET", "C#", "ASP.NET Core", "Security", "Authentication", "JWT", "Backend"],
    content: `
<h2>Why 2FA Belongs in Every Serious Application</h2>
<p>A strong password is no longer a sufficient defence. Credential databases get breached, passwords get reused across services, and phishing attacks harvest valid credentials at scale. Two-factor authentication (2FA) adds a time-sensitive second factor that an attacker cannot use even if they have the correct password.</p>
<p>TOTP (Time-based One-Time Password) is the standard that underpins apps like Google Authenticator and Microsoft Authenticator. The server and the user's app share a secret. Every 30 seconds, both sides independently derive the same 6-digit code from that secret and the current timestamp. If the codes match, the user has proven they hold the physical device.</p>
<p>This post walks through every step of adding TOTP-based 2FA with QR code setup to an ASP.NET Core application, from package installation to recovery codes.</p>

<h2>Step 1 — Install the Required Packages</h2>
<p>Two NuGet packages cover everything needed:</p>

<pre><code>dotnet add package Otp.NET
dotnet add package QRCoder</code></pre>

<p><strong>Otp.NET</strong> implements the TOTP standard (RFC 6238) — it handles secret generation, code computation, and time-window validation. <strong>QRCoder</strong> takes a URI string and produces a PNG image the user scans with their authenticator app.</p>

<h2>Step 2 — Extend the User Model</h2>
<p>Three new fields are needed on the user entity:</p>

<pre><code>public class User
{
    public Guid   Id                { get; set; } = Guid.NewGuid();
    public string Email             { get; set; } = string.Empty;
    public string PasswordHash      { get; set; } = string.Empty;

    // 2FA fields
    public string? TwoFactorSecret  { get; set; }  // Base32 secret — store encrypted
    public bool    TwoFactorEnabled { get; set; }  // activated only after successful setup
    public string? RecoveryCodes    { get; set; }  // JSON array of hashed one-time codes
}</code></pre>

<p>Generate and apply the migration:</p>

<pre><code>dotnet ef migrations add Add2FAFields
dotnet ef database update</code></pre>

<h2>Step 3 — Generate the Secret and QR Code</h2>
<p>When a user initiates 2FA setup, generate a random secret, build the <code>otpauth://</code> URI, and return a QR code image for them to scan. The secret is stored against the user but 2FA is not yet activated — that happens only after they prove the scan worked.</p>

<pre><code>using OtpNet;
using QRCoder;

public class TwoFactorService
{
    private const string AppName = "MyApp";

    public string GenerateSecret()
    {
        var key = KeyGeneration.GenerateRandomKey(20); // 160-bit secret
        return Base32Encoding.ToString(key);
    }

    public string GetOtpAuthUri(string secret, string userEmail)
    {
        return $"otpauth://totp/{Uri.EscapeDataString(AppName)}:{Uri.EscapeDataString(userEmail)}" +
               $"?secret={secret}&issuer={Uri.EscapeDataString(AppName)}&algorithm=SHA1&digits=6&period=30";
    }

    public string GenerateQrCodeBase64(string otpAuthUri)
    {
        using var qrGenerator = new QRCodeGenerator();
        using var qrCodeData  = qrGenerator.CreateQrCode(otpAuthUri, QRCodeGenerator.ECCLevel.Q);
        using var qrCode      = new PngByteQRCode(qrCodeData);
        var pngBytes          = qrCode.GetGraphic(5);
        return Convert.ToBase64String(pngBytes);
    }

    public bool ValidateCode(string secret, string code)
    {
        var secretBytes = Base32Encoding.ToBytes(secret);
        var totp        = new Totp(secretBytes);
        return totp.VerifyTotp(code, out _, new VerificationWindow(previous: 1, future: 1));
    }
}</code></pre>

<p>The setup endpoint generates the secret, stores it (not yet activated), and returns the QR code to the frontend:</p>

<pre><code>[Authorize]
[HttpPost("2fa/setup")]
public async Task&lt;IActionResult&gt; InitiateSetup()
{
    var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
    var user   = await _db.Users.FindAsync(userId);
    if (user is null) return NotFound();

    var secret           = _twoFactorService.GenerateSecret();
    user.TwoFactorSecret = secret; // encrypt before storing in production
    await _db.SaveChangesAsync();

    var uri      = _twoFactorService.GetOtpAuthUri(secret, user.Email);
    var qrBase64 = _twoFactorService.GenerateQrCodeBase64(uri);

    return Ok(new
    {
        QrCode         = $"data:image/png;base64,{qrBase64}",
        ManualEntryKey = secret // fallback for users who cannot scan
    });
}</code></pre>

<h2>Step 4 — Verify Setup and Activate 2FA</h2>
<p>Before marking 2FA as enabled, require the user to enter the 6-digit code shown in their authenticator app. This confirms the scan succeeded and their app and your server are in sync. Only activate 2FA if the code is valid.</p>

<pre><code>[Authorize]
[HttpPost("2fa/verify-setup")]
public async Task&lt;IActionResult&gt; VerifySetup([FromBody] VerifySetupRequest request)
{
    var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
    var user   = await _db.Users.FindAsync(userId);

    if (user is null || string.IsNullOrEmpty(user.TwoFactorSecret))
        return BadRequest("2FA setup was not initiated.");

    if (!_twoFactorService.ValidateCode(user.TwoFactorSecret, request.Code))
        return BadRequest(new { error = "Invalid code. Check your authenticator app and try again." });

    user.TwoFactorEnabled = true;
    var recoveryCodes     = GenerateRecoveryCodes();
    user.RecoveryCodes    = HashAndSerializeRecoveryCodes(recoveryCodes);

    await _db.SaveChangesAsync();

    // Return the plain-text recovery codes once — they are not stored in plain text
    return Ok(new { RecoveryCodes = recoveryCodes });
}

public record VerifySetupRequest(string Code);</code></pre>

<h2>Step 5 — Enforce 2FA on Login</h2>
<p>The login flow becomes two stages. Stage one validates the password and returns a short-lived partial token scoped only to the 2FA endpoint. Stage two validates the TOTP code and issues the full session token. The full token is never issued until both factors pass.</p>

<pre><code>[HttpPost("auth/login")]
public async Task&lt;IActionResult&gt; Login([FromBody] LoginRequest request)
{
    var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
    if (user is null || !VerifyPassword(request.Password, user.PasswordHash))
        return Unauthorized(new { error = "Invalid credentials." });

    if (!user.TwoFactorEnabled)
        return Ok(new { Token = _tokenService.GenerateAccessToken(user) });

    // 2FA required — issue a partial token valid for 5 minutes
    var partialToken = _tokenService.GeneratePartialToken(user.Id);
    return Ok(new { RequiresTwoFactor = true, PartialToken = partialToken });
}

[Authorize(Policy = "PartialAuth")]
[HttpPost("auth/2fa")]
public async Task&lt;IActionResult&gt; ValidateTwoFactor([FromBody] TwoFactorRequest request)
{
    var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
    var user   = await _db.Users.FindAsync(userId);
    if (user is null || string.IsNullOrEmpty(user.TwoFactorSecret)) return Unauthorized();

    if (_twoFactorService.ValidateCode(user.TwoFactorSecret, request.Code))
        return Ok(new { Token = _tokenService.GenerateAccessToken(user) });

    if (ValidateAndConsumeRecoveryCode(user, request.Code))
    {
        await _db.SaveChangesAsync();
        return Ok(new { Token = _tokenService.GenerateAccessToken(user) });
    }

    return Unauthorized(new { error = "Invalid authentication code." });
}

public record TwoFactorRequest(string Code);</code></pre>

<p>The partial token is a standard JWT with a custom claim. Register the policy in <code>Program.cs</code>:</p>

<pre><code>builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("PartialAuth", policy =>
        policy.RequireClaim("auth_stage", "partial"));
});

// In TokenService
public string GeneratePartialToken(Guid userId)
{
    var claims = new[]
    {
        new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
        new Claim("auth_stage", "partial")
    };

    var token = new JwtSecurityToken(
        issuer:             _config["Jwt:Issuer"],
        audience:           _config["Jwt:Audience"],
        claims:             claims,
        expires:            DateTime.UtcNow.AddMinutes(5),
        signingCredentials: GetSigningCredentials()
    );

    return new JwtSecurityTokenHandler().WriteToken(token);
}</code></pre>

<h2>Step 6 — Recovery Codes</h2>
<p>Recovery codes allow a user to log in if they lose access to their authenticator app. Each code is single-use. Store them hashed — never in plain text.</p>

<pre><code>private List&lt;string&gt; GenerateRecoveryCodes(int count = 8)
{
    return Enumerable.Range(0, count)
        .Select(_ =>
        {
            var bytes = RandomNumberGenerator.GetBytes(10);
            var hex   = Convert.ToHexString(bytes).ToLower();
            return $"{hex[..5]}-{hex[5..10]}";
        })
        .ToList();
}

private string HashAndSerializeRecoveryCodes(List&lt;string&gt; codes)
{
    var hashed = codes.Select(c => BCrypt.Net.BCrypt.HashPassword(c)).ToList();
    return JsonSerializer.Serialize(hashed);
}

private bool ValidateAndConsumeRecoveryCode(User user, string inputCode)
{
    if (string.IsNullOrEmpty(user.RecoveryCodes)) return false;

    var hashes = JsonSerializer.Deserialize&lt;List&lt;string&gt;&gt;(user.RecoveryCodes)!;

    for (int i = 0; i &lt; hashes.Count; i++)
    {
        if (BCrypt.Net.BCrypt.Verify(inputCode, hashes[i]))
        {
            hashes.RemoveAt(i);
            user.RecoveryCodes = JsonSerializer.Serialize(hashes);
            return true;
        }
    }

    return false;
}</code></pre>

<h2>Step 7 — Allow Users to Disable 2FA</h2>
<p>Require both the current password and a valid TOTP code before disabling. This prevents an attacker with a stolen session from silently removing the second factor.</p>

<pre><code>[Authorize]
[HttpPost("2fa/disable")]
public async Task&lt;IActionResult&gt; Disable2FA([FromBody] Disable2FARequest request)
{
    var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
    var user   = await _db.Users.FindAsync(userId);

    if (user is null) return NotFound();
    if (!VerifyPassword(request.Password, user.PasswordHash)) return Unauthorized();
    if (!_twoFactorService.ValidateCode(user.TwoFactorSecret!, request.Code))
        return BadRequest(new { error = "Invalid authentication code." });

    user.TwoFactorEnabled = false;
    user.TwoFactorSecret  = null;
    user.RecoveryCodes    = null;
    await _db.SaveChangesAsync();

    return NoContent();
}

public record Disable2FARequest(string Password, string Code);</code></pre>

<h2>Security Notes Worth Highlighting</h2>
<ul>
  <li><strong>Encrypt the secret at rest.</strong> The TOTP secret stored in the database should be encrypted using a key held outside the database. If the database is compromised without encryption, an attacker can generate valid TOTP codes indefinitely.</li>
  <li><strong>Rate-limit the 2FA endpoint.</strong> A 6-digit code has 1,000,000 possible values and a 30-second window. Without rate limiting, that window is brute-forceable. Apply strict rate limiting to both the login and 2FA validation endpoints.</li>
  <li><strong>Do not log TOTP codes.</strong> Structured logging that captures request bodies will log the 6-digit code as a credential. Ensure the 2FA request body is excluded from logs.</li>
  <li><strong>Scope the partial token tightly.</strong> The partial token should only be accepted by the <code>/auth/2fa</code> endpoint. Any other endpoint that receives it should return 403, not 401.</li>
</ul>

<h2>Implementation Checklist</h2>
<ul>
  <li>Otp.NET and QRCoder installed</li>
  <li>User entity extended with TwoFactorSecret, TwoFactorEnabled, and RecoveryCodes</li>
  <li>TwoFactorSecret encrypted at rest</li>
  <li>Setup endpoint returns QR code without activating 2FA</li>
  <li>Verify-setup endpoint validates the first code before enabling</li>
  <li>Recovery codes generated at setup, hashed, single-use</li>
  <li>Login issues partial token when 2FA is required — full token only after second factor</li>
  <li>Partial token scoped by policy so it cannot access other endpoints</li>
  <li>Rate limiting applied to login and 2FA endpoints</li>
  <li>Disable endpoint requires password and valid TOTP code</li>
</ul>

<p>For the JWT layer this 2FA flow sits on top of, see the post on <a href="/blog/jwt-authentication-csharp-dotnet-security">JWT authentication in C#</a>. For Swagger configuration that lets you test protected endpoints including the 2FA flow, see <a href="/blog/swagger-unit-testing-bearer-token-csharp-dotnet">Swagger, unit tests, and Bearer tokens in .NET</a>. If you are adding 2FA to an existing backend or building secure authentication from scratch, see the <a href="/services/dotnet-backend">.NET backend development services</a> page or <a href="/contact">get in touch</a>.</p>
    `.trim(),
};

export default post;
