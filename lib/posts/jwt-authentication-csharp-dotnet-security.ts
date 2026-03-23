import type { BlogPost } from "../blog";

const post: BlogPost = {
  id: "13",
  slug: "jwt-authentication-csharp-dotnet-security",
  title: "JWT Authentication in C# — How to Do It Correctly and Why It Matters",
  excerpt:
    "Most C# APIs have authentication. Not all of them have it done correctly. Here's the difference between JWT that creates a false sense of security and JWT that actually protects your users.",
  date: "2026-03-23",
  readTime: "7 min read",
  tags: [".NET", "C#", "ASP.NET Core", "Security", "JWT", "Backend"],
  content: `
<h2>The Problem With "We Have Auth"</h2>
<p>Most APIs I've reviewed have some form of authentication in place. Tokens are being issued, endpoints are protected, and on the surface everything looks secure. The problem is usually in the details — decisions that seem minor but completely undermine the security of the system.</p>
<p>JWT (JSON Web Token) done wrong is worse than no auth in one important way: it creates confidence that isn't warranted. A team ships with "JWT authentication" checked off the list, but the implementation has gaps that an attacker can walk through.</p>
<p>This post covers the specific mistakes I see repeatedly in C# APIs and exactly how to fix them.</p>

<h2>What JWT Actually Is</h2>
<p>A JWT is a signed token containing claims — pieces of information about the user like their ID, role, and when the token expires. The server signs the token with a secret key. When a client sends the token back, the server verifies the signature to confirm it hasn't been tampered with.</p>
<p>The key word is <strong>signed</strong>, not encrypted. The contents of a JWT are Base64-encoded, not hidden. Anyone who intercepts a JWT can read its contents. What they can't do (without the signing key) is modify it and have the server accept it.</p>
<p>This means: never put sensitive information in a JWT payload. Put identifiers. Keep the sensitive data on the server.</p>

<h2>Mistake 1: Tokens With No Expiry</h2>
<p>This is the most common mistake and the most dangerous.</p>

<pre><code>//  Wrong — this token is valid forever
var token = new JwtSecurityToken(
    issuer: _config["Jwt:Issuer"],
    audience: _config["Jwt:Audience"],
    claims: claims,
    // no 'expires' parameter
    signingCredentials: credentials
);</code></pre>

<p>A token with no expiry is valid until the signing key changes or the server explicitly blocks it. If this token is stolen — through a data breach, a man-in-the-middle attack, or simply a user leaving their laptop unlocked — the attacker has permanent access. There is no natural expiry to wait out.</p>
<p>The fix is simple:</p>

<pre><code>//  Correct — access token expires in 15 minutes
var token = new JwtSecurityToken(
    issuer: _config["Jwt:Issuer"],
    audience: _config["Jwt:Audience"],
    claims: claims,
    expires: DateTime.UtcNow.AddMinutes(15),
    signingCredentials: credentials
);</code></pre>

<p>15 minutes is the standard. It's long enough to not disrupt normal usage (the client refreshes silently) and short enough that a stolen token has a very limited window of usefulness.</p>

<h2>Mistake 2: No Refresh Token Rotation</h2>
<p>Short-lived access tokens solve the expiry problem, but they introduce a new question: how does the client get a new access token when the old one expires without making the user log in every 15 minutes?</p>
<p>The answer is refresh tokens — long-lived tokens stored server-side that are used only to issue new access tokens. The key security property is <strong>rotation</strong>: every time a refresh token is used, it gets revoked and a new one is issued.</p>

<pre><code>// Wrong — refresh token is reusable indefinitely
public async Task&lt;TokenResponse&gt; RefreshAsync(string refreshToken)
{
    var stored = await _db.RefreshTokens
        .FirstOrDefaultAsync(t => t.Token == refreshToken);

    if (stored == null) throw new SecurityException("Invalid token");

    // issue new access token but keep the same refresh token
    return new TokenResponse(GenerateAccessToken(stored.UserId), refreshToken);
}</code></pre>

<p>In the above, a stolen refresh token can be used repeatedly and indefinitely. The legitimate user and the attacker both have valid tokens.</p>

<pre><code>//  Correct — refresh token rotates on every use
public async Task&lt;TokenResponse&gt; RefreshAsync(string refreshToken)
{
    var stored = await _db.RefreshTokens
        .FirstOrDefaultAsync(t => t.Token == refreshToken
                               && !t.IsRevoked
                               && t.ExpiresAt > DateTime.UtcNow);

    if (stored == null) throw new SecurityException("Invalid or expired token");

    // revoke the used token immediately
    stored.IsRevoked = true;

    // issue a new refresh token
    var newRefreshToken = new RefreshToken
    {
        Token = GenerateSecureToken(),
        UserId = stored.UserId,
        ExpiresAt = DateTime.UtcNow.AddDays(7),
        IsRevoked = false
    };

    await _db.RefreshTokens.AddAsync(newRefreshToken);
    await _db.SaveChangesAsync();

    return new TokenResponse(
        GenerateAccessToken(stored.UserId),
        newRefreshToken.Token
    );
}</code></pre>

<p>Now if a refresh token is stolen and used by an attacker, the original is already revoked before the attacker can use it again. If the attacker uses it first, the legitimate user's next refresh attempt fails — which is a detectable signal that a token has been compromised.</p>
<p>The RefreshToken model stored in the database:</p>

<pre><code>public class RefreshToken
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Token { get; set; } = string.Empty;
    public Guid UserId { get; set; }
    public DateTime ExpiresAt { get; set; }
    public bool IsRevoked { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}</code></pre>

<h2>Mistake 3: Authorization Only in the UI</h2>
<p>Hiding a button or a page from users who don't have the right role is good UX. It is not security.</p>
<p>Any developer with Postman or curl can construct a direct HTTP request to your API endpoint, bypassing everything the frontend does. If your authorization logic only lives in the frontend, your API is unprotected.</p>

<pre><code>//  Wrong — only the UI hides this from non-admins
// The API endpoint itself is accessible to anyone with a valid token
[Authorize]
[HttpDelete("users/{id}")]
public async Task&lt;IActionResult&gt; DeleteUser(Guid id)
{
    await _userService.DeleteAsync(id);
    return NoContent();
}</code></pre>

<pre><code>//  Correct — role enforced at the controller
[Authorize(Roles = "Admin")]
[HttpDelete("users/{id}")]
public async Task&lt;IActionResult&gt; DeleteUser(Guid id)
{
    await _userService.DeleteAsync(id);
    return NoContent();
}</code></pre>

<p>For more granular control, use policy-based authorization:</p>

<pre><code>// In Program.cs — define the policy
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("CanDeleteUsers", policy =>
        policy.RequireRole("Admin")
              .RequireClaim("department", "engineering", "security"));
});

// On the controller — apply the policy
[Authorize(Policy = "CanDeleteUsers")]
[HttpDelete("users/{id}")]
public async Task&lt;IActionResult&gt; DeleteUser(Guid id) { ... }</code></pre>

<p>Policies let you express complex authorization rules in one place rather than scattering conditional checks throughout your controllers.</p>

<h2>Mistake 4: Weak Signing Keys</h2>
<p>The entire security model of JWT depends on the signing key remaining secret and being sufficiently complex that it can't be guessed or brute-forced.</p>

<pre><code>//  Wrong — short, predictable key
var key = new SymmetricSecurityKey(
    Encoding.UTF8.GetBytes("mykey")
);</code></pre>

<pre><code>//  Correct — minimum 256-bit key, stored in config/secrets
var key = new SymmetricSecurityKey(
    Encoding.UTF8.GetBytes(_config["Jwt:SecretKey"])
    // SecretKey should be a randomly generated 32+ character string
    // stored in environment variables or Azure Key Vault
    // never hardcoded in source code
);</code></pre>

<p>The signing key should never appear in source code. Use environment variables in development and a secrets manager (Azure Key Vault, AWS Secrets Manager) in production.</p>

<h2>Mistake 5: Not Validating Token Parameters</h2>
<p>When configuring JWT validation, every parameter you skip is an attack surface you're leaving open.</p>

<pre><code>//  Wrong — minimal validation
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key)
            // issuer, audience, and lifetime not validated
        };
    });</code></pre>

<pre><code>//  Correct — full validation
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_config["Jwt:SecretKey"])
            ),
            ValidateIssuer = true,
            ValidIssuer = _config["Jwt:Issuer"],
            ValidateAudience = true,
            ValidAudience = _config["Jwt:Audience"],
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero // no grace period on expiry
        };
    });</code></pre>

<p><code>ClockSkew = TimeSpan.Zero</code> is important. The default adds a 5-minute grace period after expiry — which means a 15-minute token is actually valid for 20 minutes. For most systems, set it to zero.</p>

<h2>Putting It All Together</h2>
<p>Here's a complete token service that covers all of the above correctly:</p>

<pre><code>public class TokenService
{
    private readonly IConfiguration _config;
    private readonly AppDbContext _db;

    public TokenService(IConfiguration config, AppDbContext db)
    {
        _config = config;
        _db = db;
    }

    public string GenerateAccessToken(User user)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role)
        };

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_config["Jwt:SecretKey"]!)
        );

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(15),
            signingCredentials: new SigningCredentials(
                key, SecurityAlgorithms.HmacSha256
            )
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public async Task&lt;RefreshToken&gt; GenerateRefreshTokenAsync(Guid userId)
    {
        var token = new RefreshToken
        {
            Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
            UserId = userId,
            ExpiresAt = DateTime.UtcNow.AddDays(7)
        };

        await _db.RefreshTokens.AddAsync(token);
        await _db.SaveChangesAsync();
        return token;
    }

    public async Task&lt;TokenResponse&gt; RefreshAsync(string refreshToken)
    {
        var stored = await _db.RefreshTokens
            .Include(t => t.User)
            .FirstOrDefaultAsync(t => t.Token == refreshToken
                                   && !t.IsRevoked
                                   && t.ExpiresAt > DateTime.UtcNow)
            ?? throw new SecurityException("Invalid token");

        stored.IsRevoked = true;
        var newRefresh = await GenerateRefreshTokenAsync(stored.UserId);
        await _db.SaveChangesAsync();

        return new TokenResponse(
            GenerateAccessToken(stored.User),
            newRefresh.Token
        );
    }
}</code></pre>

<h2>The Checklist</h2>
<p>Before any .NET API goes to production, run through this:</p>
<ul>
  <li>Access tokens expire in 15 minutes or less</li>
  <li>Refresh tokens are stored server-side and rotated on every use</li>
  <li>Refresh tokens have an expiry (7–30 days depending on your security requirements)</li>
  <li>Role-based or policy-based authorization is enforced at the controller level</li>
  <li>Token validation includes issuer, audience, and lifetime checks</li>
  <li>ClockSkew is set to zero</li>
  <li>The signing key is at least 256 bits and stored in environment variables or a secrets manager — never in source code</li>
  <li>HTTPS is enforced — a correctly implemented JWT is worthless over plain HTTP</li>
</ul>

<h2>Why This Matters Beyond Theory</h2>
<p>JWT vulnerabilities are consistently in the OWASP Top 10 for API security. The specific patterns covered here — no expiry, reusable refresh tokens, missing validation parameters — are not academic edge cases. They appear in production systems regularly, including systems that passed a code review.</p>
<p>Security is not a feature you add at the end. It's a set of decisions you make correctly from the start. The code above isn't significantly more complex than the insecure versions. The difference is knowing what the correct decisions are.</p>
<p>I implement this pattern on every .NET backend I build. If you're working on a C# API and want a second set of eyes on the auth implementation, <a href="/contact">get in touch</a>.</p>
    `.trim(),
};

export default post;
