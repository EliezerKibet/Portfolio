import type { BlogPost } from "../blog";

const post: BlogPost = {
    id: "20",
    slug: "multi-user-role-authorization-enums-aspnetcore",
    title: "Multi-User Role Authorization with Enums in ASP.NET Core — Security and Scale by Design",
    excerpt:
        "When a system has multiple user types and access rules are scattered across if statements and magic strings, nobody is confident about who can do what. Here is how to design role-based authorization correctly from the start.",
    date: "2026-03-30",
    readTime: "8 min read",
    tags: [".NET", "C#", "ASP.NET Core", "Security", "Authorization", "Backend", "Architecture"],
    content: `
<h2>The Problem With Ad-Hoc Access Control</h2>
<p>Most access control bugs are not security vulnerabilities in the traditional sense. They are design decisions that were never made explicitly. A system that started with two user types gains a third, then a fourth. Access rules get added wherever they are immediately needed — a check here, a role string there, a frontend button hidden for certain users. Over time, no single developer can tell you with confidence who is allowed to do what.</p>
<p>The solution is not more code. It is a deliberate structure: roles defined in one place, carried in the authentication token, and enforced at the API layer with zero ambiguity.</p>

<h2>Step 1 — Define Roles as an Enum</h2>
<p>The first decision is where roles live. Magic strings like <code>"Admin"</code> or <code>"manager"</code> scattered across controllers are fragile — a typo fails silently at runtime. An enum fails at compile time, which is exactly what you want.</p>

<pre><code>public enum UserRole
{
    Client  = 1,
    Staff   = 2,
    Manager = 3,
    Admin   = 4
}</code></pre>

<p>Assigning integer values explicitly is intentional. It means the stored value in the database remains stable even if the enum is reordered later. Store the integer, display the name.</p>
<p>Add the role to your user entity:</p>

<pre><code>public class User
{
    public Guid     Id           { get; set; } = Guid.NewGuid();
    public string   Email        { get; set; } = string.Empty;
    public string   PasswordHash { get; set; } = string.Empty;
    public UserRole Role         { get; set; } = UserRole.Client;
}</code></pre>

<h2>Step 2 — Store the Role as a Claim in the JWT</h2>
<p>When issuing a JWT after successful login, include the user's role as a claim. ASP.NET Core's authorization middleware reads <code>ClaimTypes.Role</code> automatically when you use the <code>[Authorize(Roles = "...")]</code> attribute.</p>

<pre><code>public string GenerateAccessToken(User user)
{
    var claims = new[]
    {
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        new Claim(ClaimTypes.Email,          user.Email),
        new Claim(ClaimTypes.Role,           user.Role.ToString())
    };

    var key   = new SymmetricSecurityKey(
        Encoding.UTF8.GetBytes(_config["Jwt:SecretKey"]!)
    );

    var token = new JwtSecurityToken(
        issuer:             _config["Jwt:Issuer"],
        audience:           _config["Jwt:Audience"],
        claims:             claims,
        expires:            DateTime.UtcNow.AddMinutes(15),
        signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
    );

    return new JwtSecurityTokenHandler().WriteToken(token);
}</code></pre>

<p>The role is now in every request as part of the signed token. The server does not need to query the database on every request to check the user's role — it reads the claim directly.</p>

<h2>Step 3 — Enforce at the Controller Level</h2>
<p>The most important rule: authorization must be enforced at the API layer, not the frontend. Hiding a button from non-admin users is good UX. It is not security. Any developer with a REST client can call your endpoints directly, bypassing everything the UI does.</p>

<pre><code>[ApiController]
[Route("api/[controller]")]
[Authorize] // all actions require a valid token by default
public class UsersController : ControllerBase
{
    // Any authenticated user can view their own profile
    [HttpGet("me")]
    public async Task&lt;IActionResult&gt; GetProfile() { ... }

    // Staff and above can view the client list
    [Authorize(Roles = "Staff,Manager,Admin")]
    [HttpGet]
    public async Task&lt;IActionResult&gt; GetAllUsers() { ... }

    // Manager and above can update user details
    [Authorize(Roles = "Manager,Admin")]
    [HttpPut("{id:guid}")]
    public async Task&lt;IActionResult&gt; UpdateUser(Guid id, UpdateUserRequest request) { ... }

    // Only admins can delete users
    [Authorize(Roles = "Admin")]
    [HttpDelete("{id:guid}")]
    public async Task&lt;IActionResult&gt; DeleteUser(Guid id) { ... }
}</code></pre>

<p>Applying <code>[Authorize]</code> at the controller level means every action is protected by default. You opt out of auth for specific actions with <code>[AllowAnonymous]</code> — the safer default compared to opting in per action.</p>

<h2>Step 4 — Use Policies for Complex Rules</h2>
<p>Role strings on attributes work well for simple cases. When access rules involve multiple conditions — role plus a verified status, role plus a specific claim — policies are cleaner and easier to maintain.</p>
<p>Define policies in <code>Program.cs</code> once:</p>

<pre><code>builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("CanApproveOrders", policy =>
        policy.RequireRole(
            UserRole.Admin.ToString(),
            UserRole.Manager.ToString()
        ));

    options.AddPolicy("VerifiedClientOnly", policy =>
        policy.RequireRole(UserRole.Client.ToString())
              .RequireClaim("account_verified", "true"));

    options.AddPolicy("SeniorStaffAndAbove", policy =>
        policy.RequireRole(
            UserRole.Manager.ToString(),
            UserRole.Admin.ToString()
        ).RequireClaim("employment_type", "permanent"));
});</code></pre>

<p>Apply them on the controller:</p>

<pre><code>[Authorize(Policy = "CanApproveOrders")]
[HttpPost("orders/{id}/approve")]
public async Task&lt;IActionResult&gt; ApproveOrder(Guid id) { ... }

[Authorize(Policy = "VerifiedClientOnly")]
[HttpGet("invoices")]
public async Task&lt;IActionResult&gt; GetInvoices() { ... }</code></pre>

<p>Policies express intent clearly. The name <code>"CanApproveOrders"</code> communicates what the rule is for, not just which roles it applies to.</p>

<h2>Step 5 — Row-Level Data Isolation</h2>
<p>Controller-level authorization controls which endpoints a user can reach. Row-level isolation controls which data they can see within those endpoints. Both are necessary.</p>
<p>A Client should only see their own orders. A Manager should see orders for their region. An Admin sees everything. This logic belongs in the query, not in a post-fetch filter:</p>

<pre><code>[Authorize]
[HttpGet("orders")]
public async Task&lt;IActionResult&gt; GetOrders()
{
    var userId   = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
    var userRole = Enum.Parse&lt;UserRole&gt;(User.FindFirstValue(ClaimTypes.Role)!);

    var query = _db.Orders.AsQueryable();

    query = userRole switch
    {
        UserRole.Admin   => query,                                          // sees all
        UserRole.Manager => query.Where(o => o.AssignedRegion == GetUserRegion()),
        UserRole.Staff   => query.Where(o => o.AssignedStaffId == userId),
        UserRole.Client  => query.Where(o => o.ClientId == userId),
        _                => query.Where(_ => false)                         // unknown role — return nothing
    };

    var orders = await query.ToListAsync();
    return Ok(orders);
}</code></pre>

<p>The switch expression makes the data access rules explicit and readable. Adding a new role means adding one case — it does not require hunting for scattered WHERE clauses.</p>

<h2>Step 6 — Helper Method for Role Checks in Services</h2>
<p>Sometimes you need to check roles in service logic rather than at the controller layer. Pass the current user's role into the service rather than re-querying the database:</p>

<pre><code>public static class RoleExtensions
{
    public static UserRole GetUserRole(this ClaimsPrincipal user)
        => Enum.Parse&lt;UserRole&gt;(user.FindFirstValue(ClaimTypes.Role)!);

    public static bool IsAtLeast(this UserRole role, UserRole minimum)
        => (int)role &gt;= (int)minimum;
}

// In a controller or service
var role = User.GetUserRole();

if (!role.IsAtLeast(UserRole.Manager))
    return Forbid();
</code></pre>

<p>The <code>IsAtLeast</code> helper works because the enum values are explicitly ordered numerically. Admin (4) is always at least Manager (3), Manager is always at least Staff (2). This only holds if you keep the integer values in order when you add new roles.</p>

<h2>Step 7 — Role Management Endpoint</h2>
<p>Admins need a way to change a user's role. Restrict this endpoint tightly — only Admins can promote or demote users, and you should never allow a user to elevate their own role:</p>

<pre><code>[Authorize(Roles = "Admin")]
[HttpPatch("users/{id}/role")]
public async Task&lt;IActionResult&gt; UpdateRole(Guid id, [FromBody] UpdateRoleRequest request)
{
    var callerId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    if (callerId == id)
        return BadRequest(new { error = "You cannot change your own role." });

    var user = await _db.Users.FindAsync(id);
    if (user is null) return NotFound();

    user.Role = request.Role;
    await _db.SaveChangesAsync();

    return NoContent();
}

public record UpdateRoleRequest(UserRole Role);</code></pre>

<h2>Putting It All Together — The Structure</h2>
<p>The complete pattern has four layers, each with a clear responsibility:</p>
<ul>
  <li><strong>Enum</strong> — single source of truth for all roles in the system</li>
  <li><strong>JWT claim</strong> — role travels with every request, no database lookup needed</li>
  <li><strong>Controller attributes</strong> — endpoint-level access control, enforced before any business logic runs</li>
  <li><strong>Query filters</strong> — row-level isolation, enforced at the data layer</li>
</ul>
<p>This structure scales cleanly. Adding a new role means adding one enum value and updating the relevant policies and query filters. Nothing else changes. Auditing who can do what means reading one enum definition and one authorization setup file — not grepping an entire codebase for role strings.</p>

<h2>Implementation Checklist</h2>
<ul>
  <li>Roles defined as an enum with explicit integer values</li>
  <li>Role stored as an integer in the database, resolved to the enum in application code</li>
  <li>Role included as a <code>ClaimTypes.Role</code> claim in the JWT</li>
  <li><code>[Authorize]</code> applied at controller level — opt out with <code>[AllowAnonymous]</code>, not opt in per action</li>
  <li>Complex rules expressed as named policies in <code>Program.cs</code></li>
  <li>Data queries filtered by role — never return all rows and filter in memory</li>
  <li>Role update endpoint restricted to Admin and blocked for self-elevation</li>
</ul>

<p>For the JWT implementation this authorization layer sits on top of, see the post on <a href="/blog/jwt-authentication-csharp-dotnet-security">JWT authentication in C#</a>. For 2FA on top of this auth stack, see <a href="/blog/2fa-qr-code-totp-aspnetcore-csharp">implementing 2FA with QR code in ASP.NET Core</a>. If you are building a multi-user system and want the access control designed correctly from the start, see the <a href="/services/dotnet-backend">.NET backend development services</a> page or <a href="/contact">get in touch</a>.</p>
    `.trim(),
};

export default post;
