import type { BlogPost } from "../blog";

const post: BlogPost = {
  id: "11",
  slug: "base-entities-and-base-controllers-csharp-dotnet",
  title: "Base Entities and Base Controllers in C#: The Pattern That Keeps .NET Codebases Clean",
  excerpt:
    "Two simple abstractions — a base entity and a base controller — eliminate the most common sources of repetition in C# .NET projects. Here's how they work and why I use them on every project.",
  date: "2026-03-19",
  readTime: "5 min read",
  tags: [".NET", "C#", "ASP.NET Core", "Clean Code", "Backend", "Best Practices"],
  content: `
<h2>The Problem With Most C# Codebases</h2>
<p>Most .NET codebases I've worked on share the same problem: repetition at the foundation level.</p>
<p>Every entity has the same fields — <code>Id</code>, <code>CreatedAt</code>, <code>UpdatedAt</code>, <code>CreatedBy</code> — copy-pasted across every model. Every controller has the same try/catch blocks, the same null checks, the same 200/400/500 response patterns repeated across dozens of endpoints.</p>
<p>This kind of repetition isn't just tedious. It's a maintenance problem. When you need to change how audit fields are set, or standardise your error response format, you're doing it in 20 places instead of one.</p>
<p>Two abstractions fix most of it: a base entity and a base controller.</p>

<h2>Base Entity</h2>
<p>A base entity is an abstract class that holds the fields every model in your system should have:</p>

<pre><code>public abstract class BaseEntity
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    public string? CreatedBy { get; set; }
}</code></pre>

<p>Every model inherits from it:</p>

<pre><code>public class Appointment : BaseEntity
{
    public string ServiceType { get; set; } = string.Empty;
    public DateTime SlotTime { get; set; }
    public string Status { get; set; } = "Pending";
}

public class Customer : BaseEntity
{
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
}</code></pre>

<p>The <code>Appointment</code> and <code>Customer</code> classes each have four fields — but they get <code>Id</code>, <code>CreatedAt</code>, <code>UpdatedAt</code>, and <code>CreatedBy</code> for free from the base.</p>

<h3>Entity Framework Configuration</h3>
<p>You configure the base entity fields once in <code>OnModelCreating</code>, and it applies to every entity that inherits it:</p>

<pre><code>protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    foreach (var entityType in modelBuilder.Model.GetEntityTypes())
    {
        if (typeof(BaseEntity).IsAssignableFrom(entityType.ClrType))
        {
            modelBuilder.Entity(entityType.ClrType)
                .Property(nameof(BaseEntity.CreatedAt))
                .HasDefaultValueSql("GETUTCDATE()");
        }
    }
}</code></pre>

<p>One block of configuration. Applies everywhere. Add a new model, it inherits the same database-level defaults automatically.</p>

<h3>Automatic UpdatedAt With SaveChanges Override</h3>
<p>Override <code>SaveChangesAsync</code> in your <code>DbContext</code> to automatically set <code>UpdatedAt</code> whenever an entity is modified:</p>

<pre><code>public override async Task&lt;int&gt; SaveChangesAsync(CancellationToken ct = default)
{
    var entries = ChangeTracker.Entries&lt;BaseEntity&gt;()
        .Where(e => e.State == EntityState.Modified);

    foreach (var entry in entries)
        entry.Entity.UpdatedAt = DateTime.UtcNow;

    return await base.SaveChangesAsync(ct);
}</code></pre>

<p>Now <code>UpdatedAt</code> is always accurate, across every entity, without a single developer having to remember to set it manually.</p>

<h2>Base Controller</h2>
<p>The same principle applies to controllers. The patterns that repeat across every action — null checks, error handling, response formatting — belong in one place:</p>

<pre><code>[ApiController]
[Route("api/[controller]")]
public abstract class BaseController : ControllerBase
{
    protected IActionResult HandleResult&lt;T&gt;(T? result)
    {
        if (result == null) return NotFound(new { message = "Resource not found." });
        return Ok(result);
    }

    protected IActionResult HandlePagedResult&lt;T&gt;(IEnumerable&lt;T&gt; items, int total, int page, int pageSize)
    {
        return Ok(new
        {
            items,
            total,
            page,
            pageSize,
            hasNext = (page * pageSize) < total
        });
    }

    protected IActionResult HandleError(Exception ex, string? context = null)
    {
        return StatusCode(500, new
        {
            message = "An unexpected error occurred.",
            context,
            detail = ex.Message
        });
    }
}</code></pre>

<p>Every controller inherits this:</p>

<pre><code>public class AppointmentsController : BaseController
{
    private readonly IAppointmentService _service;

    public AppointmentsController(IAppointmentService service)
    {
        _service = service;
    }

    [HttpGet("{id}")]
    public async Task&lt;IActionResult&gt; Get(Guid id)
    {
        var result = await _service.GetByIdAsync(id);
        return HandleResult(result);
    }

    [HttpGet]
    public async Task&lt;IActionResult&gt; GetAll([FromQuery] int page = 1, [FromQuery] int pageSize = 20)
    {
        var (items, total) = await _service.GetPagedAsync(page, pageSize);
        return HandlePagedResult(items, total, page, pageSize);
    }
}</code></pre>

<p>No try/catch in the action. No <code>if (result == null) return NotFound()</code> repeated 30 times. The controller handles only what's specific to appointments — everything generic lives in the base.</p>

<h2>Why This Matters at Scale</h2>
<p>These abstractions feel like a small win when a project has five models and three controllers. They're a significant win when it has 30 models and 15 controllers.</p>

<p>Consider what it looks like without a base entity when requirements change:</p>
<ul>
  <li>Add a <code>DeletedAt</code> field for soft deletes → update every model manually, miss two, ship a bug</li>
  <li>Change <code>Id</code> from <code>int</code> to <code>Guid</code> → find and update every entity, every foreign key, every DTO</li>
  <li>Add a <code>TenantId</code> for multi-tenancy → copy-paste into every class, forget the ones added last month</li>
</ul>

<p>With a base entity, each of these is a one-line change in one file.</p>

<p>The same is true for controllers. When you want to change your error response format — say, to include a correlation ID for tracing — you update <code>HandleError</code> in the base controller and it propagates everywhere instantly. Without a base controller, you're updating every catch block in every controller, hoping you don't miss one.</p>

<h2>Real Usage: Embassy Booking Platform</h2>
<p>On the Embassy of Kenya platform — a 60-page web application with an appointment booking system, media management backend, and 2FA-secured admin access — both of these patterns were in use from day one.</p>
<p>The <code>BaseEntity</code> provided consistent audit fields across every model: appointments, media items, users, admin logs. The <code>BaseController</code> standardised the response format across every endpoint, which made the frontend integration significantly more predictable — the frontend team knew exactly what a 404 looked like, what a 500 looked like, and what a successful paginated response looked like, because it was always the same shape.</p>
<p>That consistency doesn't happen by convention. It happens because the base class enforces it.</p>

<h2>Generic Repository: Taking It Further</h2>
<p>Once you have a base entity, a generic repository is a natural next step:</p>

<pre><code>public interface IRepository&lt;T&gt; where T : BaseEntity
{
    Task&lt;T?&gt; GetByIdAsync(Guid id);
    Task&lt;IEnumerable&lt;T&gt;&gt; GetAllAsync();
    Task AddAsync(T entity);
    Task UpdateAsync(T entity);
    Task DeleteAsync(Guid id);
}

public class Repository&lt;T&gt; : IRepository&lt;T&gt; where T : BaseEntity
{
    protected readonly AppDbContext _context;
    protected readonly DbSet&lt;T&gt; _dbSet;

    public Repository(AppDbContext context)
    {
        _context = context;
        _dbSet = context.Set&lt;T&gt;();
    }

    public async Task&lt;T?&gt; GetByIdAsync(Guid id) =>
        await _dbSet.FirstOrDefaultAsync(e => e.Id == id);

    public async Task&lt;IEnumerable&lt;T&gt;&gt; GetAllAsync() =>
        await _dbSet.ToListAsync();

    public async Task AddAsync(T entity)
    {
        await _dbSet.AddAsync(entity);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(T entity)
    {
        _dbSet.Update(entity);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await GetByIdAsync(id);
        if (entity != null)
        {
            _dbSet.Remove(entity);
            await _context.SaveChangesAsync();
        }
    }
}</code></pre>

<p>Register it once in <code>Program.cs</code>:</p>

<pre><code>builder.Services.AddScoped(typeof(IRepository&lt;&gt;), typeof(Repository&lt;&gt;));</code></pre>

<p>Now every service that needs basic CRUD operations gets them through the generic repository. Specific services extend it with domain-specific queries. You never write the same <code>GetByIdAsync</code> implementation twice.</p>

<h2>Summary</h2>
<p>Three abstractions, applied consistently from the start of a project:</p>
<ul>
  <li><strong>BaseEntity</strong> — shared audit fields, configured once, inherited everywhere</li>
  <li><strong>BaseController</strong> — shared response handling, null checks, and error formatting in one place</li>
  <li><strong>Repository&lt;T&gt;</strong> — shared CRUD operations, extended per domain where needed</li>
</ul>
<p>None of these are complex. The value isn't in the abstraction itself — it's in the consistency they enforce as the codebase grows. Six months into a project, these patterns are what allow you to move fast without breaking things you built three months ago.</p>
<p>If you're building a .NET backend and want to talk through architecture decisions for your project, <a href="/contact">get in touch</a>.</p>
  `.trim(),
};

export default post;
