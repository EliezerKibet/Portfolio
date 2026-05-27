import type { BlogPost } from '../blog';

const post: BlogPost = {
    id: '28',
    slug: 'rapidapi-property-listing-migration-quota-fix',
    title: 'Hitting RapidAPI Quota Limits on a Property Listing App — How I Fixed It',
    excerpt: 'RapidAPI quota on a property listing app was running out too fast. Here\'s how switching providers, cutting scheduled runs from 4 to 3, and a full repo search fixed it.',
    date: '2026-05-27',
    readTime: '6 min read',
    tags: ['API', 'RapidAPI', 'Backend', '.NET', 'DevOps', 'Real Estate', 'Optimisation'],
    content: `
<h2>The Problem</h2>
<p>A property listing application I maintain pulls live data from a third-party real estate API via RapidAPI. The integration ran on a scheduled job — four times a day — fetching updated listings and syncing them to the database.</p>
<p>The quota was running out before the month ended. The data stopped updating. The fix needed to address two things at the same time: reduce how aggressively the app was consuming the API, and switch to a provider with a better quota allocation for the usage pattern we actually had.</p>

<h2>Fix One — Switching the RapidAPI Provider</h2>
<p>RapidAPI hosts multiple providers offering similar data for the same category. The original provider had a low monthly quota with no option to increase it on the current plan without a significant price jump. A different provider on RapidAPI offered the same core endpoints — property search, listing detail, price history — with a higher quota at the same or lower cost.</p>
<p>The migration on the API side was straightforward. In the RapidAPI dashboard, subscribe to the new provider. The credentials change — the <code>X-RapidAPI-Key</code> stays the same across all RapidAPI providers since it's tied to your account, but the <code>X-RapidAPI-Host</code> header changes to reflect the new provider's host value.</p>
<p>In the application, this meant updating two values:</p>
<pre><code>// Old
X-RapidAPI-Host: old-property-api.p.rapidapi.com

// New
X-RapidAPI-Host: new-property-api.p.rapidapi.com</code></pre>
<p>The endpoint paths and response shape were similar enough that minimal changes were needed in the data mapping layer. Different providers return slightly different field names — <code>listPrice</code> vs <code>list_price</code>, for example — so the deserialization models needed updating, but the core integration logic stayed intact.</p>

<h2>Fix Two — Reducing Scheduled Job Frequency</h2>
<p>Four runs a day was the original frequency based on an assumption that listings needed to be near real-time. In practice, property listing data doesn't change that frequently. Price reductions and new listings are typically published once or twice a day by agencies, not continuously.</p>
<p>Dropping the scheduled job from four runs to three per day reduced API consumption by 25% without any visible impact on data freshness. For a property listing application where users are not expecting second-by-second updates, the tradeoff is sound.</p>
<p>The change in the cron expression:</p>
<pre><code>// Before — runs at 6am, 10am, 2pm, 6pm
0 6,10,14,18 * * *

// After — runs at 7am, 1pm, 7pm
0 7,13,19 * * *</code></pre>
<p>Evenly spaced runs across the day also distributes the load more evenly and avoids the early-morning cluster that was burning through a large portion of the daily quota before midday.</p>

<h2>Fix Three — Searching the Entire Repo for the Old API</h2>
<p>Switching the provider and updating the configuration file is the obvious part. The part that causes problems later is the old API host, old endpoint URLs, or hardcoded references that survive in places you didn't think to check — a comment in a helper file, an old test, a constant defined somewhere and imported elsewhere.</p>
<p>When the old provider shuts down or you unsubscribe, any reference that was missed starts throwing errors. The only reliable way to catch them all is a full repository search before you close out the migration.</p>
<p>Search for every variation of the old provider's host string across the entire codebase:</p>
<pre><code># Search for old API host in all files
grep -r "old-property-api.p.rapidapi.com" .

# Search for old endpoint path patterns
grep -r "/properties/search" .
grep -r "/property/detail" .

# Search for any hardcoded old base URL
grep -r "rapidapi.com" . --include="*.cs" --include="*.json" --include="*.env*"</code></pre>
<p>In this case the search turned up three places the old host string appeared that weren't caught in the initial update: a constant in a shared configuration class, a hardcoded URL in an integration test, and a comment in the HTTP client setup that referenced the old provider name. None of them would have caused an immediate failure — but the test would have failed on the next run, and the constant would have caused a silent configuration conflict.</p>
<p>After clearing every result, run the search one more time and confirm zero matches. Only then is the old API fully gone from the codebase.</p>

<h2>The Result</h2>
<p>The combination of the two fixes — new provider with a higher quota allocation and three scheduled runs instead of four — brought monthly API consumption well within the plan limits with headroom to spare. The data freshness remained unchanged from the user's perspective.</p>
<p>The repo-wide search added ten minutes to the migration and caught three references that would have surfaced as bugs in testing or production. It costs nothing and removes the risk entirely. It should be the last step of any API migration, every time.</p>
`,
};

export default post;
