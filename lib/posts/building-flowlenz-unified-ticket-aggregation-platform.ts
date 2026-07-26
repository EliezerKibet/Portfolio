import type { BlogPost } from '../blog';

const post: BlogPost = {
    id: '5',
    slug: 'building-flowlenz-unified-ticket-aggregation-platform',
    title: 'Building Flowlenz: A Unified Ticket Aggregation Platform That Connects Jira and Azure DevOps',
    excerpt: 'How I built Flowlenz POC — a full-stack platform that scrapes Jira and Azure DevOps in real time, normalises tickets into a single unified dashboard, detects duplicate issues across sources, and surfaces AI analysis. Built with ASP.NET Core 9, React 18, TypeScript, PostgreSQL, and Docker.',
    date: '2026-03-11',
    readTime: '9 min read',
    tags: ['ASP.NET Core', 'React', 'TypeScript', 'PostgreSQL', 'Docker', 'Azure DevOps', 'Jira', 'Case Study'],
    image: '/projects/flowlenzmainpage.png',
    content: `
<h2>The Problem</h2>
<p>Most engineering teams don't use a single issue tracker. They use two — or three. Jira for product, Azure DevOps for engineering, maybe GitHub Issues for open source. Context switching between platforms is constant, and the same issue often gets created in multiple systems without anyone realising it.</p>
<p>Flowlenz POC was built to solve that: one dashboard, all your tickets, regardless of source — with AI analysis layered on top.</p>

<h2>What Flowlenz Does</h2>
<p>At its core, Flowlenz continuously scrapes both Jira and Azure DevOps, normalises every ticket into a single unified data model, and presents them side by side in a React frontend. But the interesting parts are what happens beyond that:</p>
<ul>
  <li><strong>Duplicate and similarity detection</strong> — tickets from different sources are compared and scored for similarity. A Jira bug and an Azure DevOps work item describing the same problem get linked automatically with a similarity score</li>
  <li><strong>AI analysis</strong> — each ticket gets an estimated effort time, an auto-generated summary, and a best-assignee recommendation based on historical assignment patterns</li>
  <li><strong>Incremental sync</strong> — neither scraper does a full re-fetch. Each maintains a cursor tracking the last sync timestamp, so only changed issues are processed on subsequent runs</li>
  <li><strong>Advanced search and filtering</strong> — case-insensitive search across all sources, filter by status, sort by date, priority, or title, configurable page sizes</li>
</ul>

<h2>Architecture Overview</h2>
<p>The system is composed of four services sharing a single PostgreSQL database:</p>
<ul>
  <li><strong>TicketSystem.API</strong> — ASP.NET Core 9 REST API serving the React frontend, handling all reads and exposing Swagger documentation</li>
  <li><strong>JiraScraper</strong> — a .NET 9 hosted background service that continuously polls the Jira REST API and upserts into the shared tickets table</li>
  <li><strong>AzureDevOpsScraper</strong> — same pattern for Azure DevOps work items</li>
  <li><strong>React frontend</strong> — React 18 with TypeScript and Tailwind CSS, communicating with the API via Axios</li>
</ul>
<p>All three backend services share the same PostgreSQL database. The two scrapers run as independent background workers — they don't communicate with each other, they just write to the same <code>tickets</code> table. The API reads from that table and serves results to the frontend.</p>

<h2>Tech Stack</h2>
<ul>
  <li><strong>Backend API:</strong> ASP.NET Core 9.0, Entity Framework Core 9, Swagger/OpenAPI</li>
  <li><strong>Background services:</strong> .NET 9 hosted services (IHostedService)</li>
  <li><strong>Frontend:</strong> React 18, TypeScript 4.7, Tailwind CSS 3.4, Axios</li>
  <li><strong>Database:</strong> PostgreSQL 15+ with Npgsql</li>
  <li><strong>Deployment:</strong> Docker Compose — entire stack starts with a single command</li>
</ul>

<h2>The Jira Integration: Cursor-Based Incremental Sync</h2>
<p>The Jira scraper uses cursor-based incremental sync rather than fetching all issues every run. It stores a <code>LastUpdatedUtc</code> timestamp per Jira project in the <code>jira_sync_cursors</code> table. On each sync cycle, it queries Jira's REST API for issues updated after that cursor, with a 2-minute overlap buffer to catch any edge cases.</p>
<p>Auth is Basic auth using a Jira API token (email + Base64-encoded token), which is the standard approach for Jira Cloud. The scraper handles pagination transparently using Jira's <code>nextPage</code> tokens — so a project with 2,000 issues syncs correctly without any manual page management.</p>
<p>Tickets are upserted by issue key. If the same issue key already exists in the database, the latest version wins. This makes the sync idempotent — running it twice produces the same result.</p>

<h2>The Azure DevOps Integration: Polling With Retry</h2>
<p>The Azure DevOps scraper uses Personal Access Token (PAT) authentication and continuously polls for work items at the project level. Unlike the Jira scraper's cursor approach, the Azure DevOps scraper uses a polling interval with three automatic retries on failure and a 5-minute cooldown between retry attempts.</p>
<p>This difference in strategy reflects the APIs themselves — Jira's API makes cursor-based incremental sync straightforward, while Azure DevOps's work item query API is better suited to a polling approach at this integration layer.</p>

<h2>Database Schema</h2>
<p>The schema is designed around the <code>tickets</code> table as the central entity, with satellite tables for AI analysis and similarity relationships:</p>
<ul>
  <li><strong>tickets</strong> — the unified ticket model with fields common to both Jira and Azure DevOps: key, title, description, status, priority, source, complexity, assignee, sprint, team, keywords, and a <code>dirty</code> flag for change tracking</li>
  <li><strong>ticket_ai</strong> — a 1:1 relationship with tickets, storing AI-generated fields: estimated time, summary, and best assignee recommendation</li>
  <li><strong>similar_tickets</strong> — a many-to-many self-join on the tickets table, storing pairs of similar tickets with a similarity score</li>
  <li><strong>jira_sync_cursors</strong> — one row per Jira project, tracking the last sync timestamp with a row version for optimistic concurrency</li>
</ul>

<h2>The Unified API</h2>
<p>The API exposes a clean paginated endpoint at <code>GET /api/tickets</code> that accepts query parameters for page, page size, search, status filter, and sort order. The response includes pagination metadata so the frontend can render page controls without a separate count query:</p>
<pre><code>{
  "tickets": [...],
  "totalCount": 142,
  "page": 1,
  "pageSize": 20,
  "hasNext": true,
  "hasPrevious": false
}</code></pre>
<p>Search uses PostgreSQL's <code>ILIKE</code> operator for case-insensitive matching across ticket key and title. A 300ms debounce on the frontend prevents excessive API calls as the user types.</p>
<p>The <code>GET /api/tickets/{id}</code> endpoint returns a single ticket enriched with its AI analysis from <code>ticket_ai</code> and a list of similar tickets from the <code>similar_tickets</code> table — all surfaced in a detail modal on the frontend.</p>

<h2>Docker Deployment</h2>
<p>The entire stack — API, both scrapers, frontend, and PostgreSQL — runs with a single command:</p>
<pre><code>docker compose -f docker-compose.prod.yml up</code></pre>
<p>This was a deliberate design choice. Demo environments, staging, and client handoffs all start from the same command. No dependency installation steps, no manual database setup — the compose file handles everything including the initial schema migration on first run.</p>

<h2>AI Features: What's Built vs What's Planned</h2>
<p>The AI fields — estimated time, summary, best assignee — are stored in the <code>ticket_ai</code> table and surfaced in the frontend. The storage and retrieval layer is complete. The AI generation pipeline itself (the model that produces these values) is a separate concern outside this POC's scope, which is an intentional architectural decision: the data layer doesn't care how the AI fields are populated, only that they conform to the schema.</p>
<p>This separation means you can plug in any AI backend — OpenAI, a fine-tuned local model, a rule-based heuristic system — without touching the API or frontend.</p>
<p>Similarly, similarity scores are stored in <code>similar_tickets</code> and shown in the UI. The similarity computation engine is a separate service that can be swapped independently.</p>

<h2>Key Design Decisions</h2>
<ul>
  <li><strong>Shared database, independent scrapers</strong> — each scraper writes independently, avoiding the complexity of inter-service communication. The API reads the merged result naturally</li>
  <li><strong>Cursor-based sync for Jira</strong> — fetching only changed tickets is critical for large Jira projects where a full re-fetch would be too slow and hit API rate limits</li>
  <li><strong>Upsert by source key</strong> — makes syncs idempotent, which matters for a background service that runs continuously</li>
  <li><strong>Dirty flag on tickets</strong> — lets the similarity and AI services identify tickets that have changed since their last analysis run, without requiring a full table scan</li>
  <li><strong>Docker-first deployment</strong> — a POC that's hard to run is a POC nobody runs. Single-command startup was a hard requirement</li>
</ul>

<h2>Key Lessons</h2>
<ul>
  <li>Normalising data from multiple external APIs into a single model is harder than it looks — field names, status values, and priority scales all differ between Jira and Azure DevOps</li>
  <li>Cursor-based incremental sync is worth the added complexity for any integration that needs to stay current with large datasets</li>
  <li>Separating AI storage from AI generation keeps the system flexible — the storage layer ships while the AI pipeline is still being developed</li>
  <li>PostgreSQL's <code>ILIKE</code> with a proper index is fast enough for search on a reasonably sized tickets table without needing a dedicated search engine</li>
  <li>Docker Compose multi-service setups need explicit health checks and startup ordering — the API should not start before the database is ready</li>
</ul>

<h2>What's Next</h2>
<p>The POC validates the core architecture. The natural next steps are: plugging in the AI generation pipeline, adding authentication so teams can manage their own API credentials, building the similarity computation engine, and scaling the sync frequency based on project activity levels.</p>
<p>If you're building a tool that integrates across multiple project management platforms, or need a custom aggregation layer for your engineering workflow, see the <a href="/services/fullstack-web-development">full-stack web development services</a> page or <a href="/contact">get in touch</a>.</p>
    `.trim(),
};

export default post;
