import type { BlogPost } from '../blog';

const post: BlogPost = {
    id: '4',
    slug: 'building-ecommerce-platform-aspnet-core',
    title: 'Building a Full-Stack E-Commerce Platform with ASP.NET Core: 60 Tests, 98% Coverage',
    excerpt: 'How I built a production-ready e-commerce platform with ASP.NET Core, SQL Server, and a 60-test suite achieving 98% code coverage — covering cart operations, order processing, admin analytics, promotions, and a complete checkout flow.',
    date: '2025-01-25',
    readTime: '8 min read',
    tags: ['ASP.NET Core', 'C#', '.NET', 'SQL Server', 'xUnit', 'Case Study'],
    image: '/projects/ecommercemainpage.jpg',
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
};

export default post;
