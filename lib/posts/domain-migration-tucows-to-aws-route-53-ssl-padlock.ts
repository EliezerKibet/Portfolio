import type { BlogPost } from '../blog';

const post: BlogPost = {
    id: '32',
    slug: 'domain-migration-tucows-to-aws-route-53-ssl-padlock',
    title: 'Migrating a Domain from Tucows to AWS Route 53 to Fix a Missing SSL Padlock',
    excerpt: 'A domain registered through Tucows kept showing without the padlock in the browser bar, and it was making clients hesitate at checkout. Moving registration and DNS over to AWS Route 53 fixed the trust chain for good.',
    date: '2026-07-20',
    readTime: '7 min read',
    tags: ['AWS', 'Route 53', 'DNS', 'SSL', 'Domain Migration', 'DevOps', 'Security', 'E-commerce'],
    content: `
<h2>The Problem</h2>
<p>A domain registered through Tucows was serving a site without a trusted padlock in the browser address bar. Some browsers showed "Not Secure," others showed the padlock with a warning icon when the certificate chain was inspected. The site itself worked — pages loaded, forms submitted — but the missing padlock was the first thing a visitor saw before they saw anything else.</p>
<p>That mattered because the site sold something. Clients purchasing a product or service look at the address bar before they look at the checkout form. A missing or broken padlock reads as "this site is not safe to enter payment details into," regardless of how the backend is actually secured. Conversion drops, and support messages start asking whether the site is legitimate.</p>

<h2>What Was Actually Wrong</h2>
<p>The domain itself was fine — Tucows is a legitimate registrar and plenty of sites run on it without issue. The problem was in how the certificate and DNS were being managed on top of it. The certificate attached to the domain was not chaining correctly to a trusted root in every browser, and DNS changes needed to fix it were slow to apply and inconsistent to verify, because the registrar's DNS tooling was separate from where the actual hosting and certificate issuance needed to happen.</p>
<p>Rather than keep patching a certificate chain on infrastructure that made verification and renewal harder than it needed to be, the fix was to move the domain and its DNS into the same place the hosting already lived — AWS — and let AWS Certificate Manager (ACM) issue and auto-renew a certificate that every major browser trusts without extra configuration.</p>

<h2>The Migration Plan</h2>
<p>Moving a live domain without breaking email, existing traffic, or search rankings needs to happen in a specific order. Rushing the nameserver cutover before the new side is fully ready is the most common way this kind of migration goes wrong.</p>

<h3>Step 1 — Audit every existing DNS record at Tucows</h3>
<p>Before touching anything, pull a complete list of every record on the domain — A, CNAME, MX, TXT (including SPF/DKIM/DMARC), and any verification records for third-party services. Missing an MX or SPF record during the move is what breaks email delivery, not the A record.</p>
<pre><code># Pull current records for reference before migrating
dig ANY yourdomain.com
dig MX yourdomain.com
dig TXT yourdomain.com</code></pre>
<p>Screenshot or export the Tucows DNS panel directly as a backup — <code>dig</code> only shows you what is publicly resolvable at that moment, not internal notes or disabled records.</p>

<h3>Step 2 — Create a hosted zone in Route 53</h3>
<p>In Route 53, create a new public hosted zone for the domain. This generates a fresh set of four AWS name servers that the domain will eventually point to.</p>
<pre><code># AWS CLI — create the hosted zone
aws route53 create-hosted-zone \\
  --name yourdomain.com \\
  --caller-reference "$(date +%s)"

# Note the four NS records returned in the response —
# these are the name servers the registrar needs to point to</code></pre>

<h3>Step 3 — Recreate every record inside Route 53</h3>
<p>Using the audit from Step 1, recreate each record inside the new hosted zone — A/ALIAS records for the site, MX and TXT records for email, and any CNAMEs used by third-party tools (verification for search console, email marketing, etc). Nothing should be missing when this step is done.</p>
<pre><code># Example — adding an A/ALIAS record pointing at a CloudFront distribution
aws route53 change-resource-record-sets \\
  --hosted-zone-id ZXXXXXXXXXXXXX \\
  --change-batch file://alias-record.json</code></pre>
<p>At this point nothing is live yet — the domain is still pointed at Tucows' name servers. This is the safe window to double- and triple-check every record against the original audit.</p>

<h3>Step 4 — Request the certificate in ACM before cutting over</h3>
<p>Request a public certificate in AWS Certificate Manager for the domain (and its <code>www</code> subdomain) and validate it using DNS validation, adding the CNAME record ACM provides into the same Route 53 hosted zone. Because the hosted zone is already in Route 53, this validates automatically and near-instantly rather than requiring a manual DNS update at the registrar.</p>
<pre><code>aws acm request-certificate \\
  --domain-name yourdomain.com \\
  --subject-alternative-names www.yourdomain.com \\
  --validation-method DNS \\
  --region us-east-1</code></pre>
<p>Attach the validated certificate to whatever is serving the site — CloudFront, an Application Load Balancer, or API Gateway. ACM handles renewal automatically going forward, which removes the manual renewal step that caused the original problem.</p>

<h3>Step 5 — Point the domain's name servers at Route 53</h3>
<p>Only once the hosted zone is fully populated and the certificate is validated and attached, log into the Tucows registrar panel and update the domain's name servers to the four Route 53 values from Step 2. This is the only part of the migration that happens at Tucows — the domain registration itself does not need to move for DNS to be fully managed by Route 53.</p>
<pre><code># Check propagation from multiple locations after updating NS records
dig NS yourdomain.com +short
dig NS yourdomain.com @8.8.8.8 +short</code></pre>
<p>DNS propagation is typically visible within a few hours but can take up to 24-48 hours globally, depending on the previous TTL values on the Tucows-hosted records. Checking that by hand every so often is easy to forget and easy to get wrong — you end up either declaring victory too early because one resolver already updated, or sitting there refreshing <code>dig</code> for no reason.</p>

<h3>Step 6 — Automating the propagation check instead of polling by hand</h3>
<p>Rather than manually re-running <code>dig</code> against a handful of resolvers every so often, I built a small console app and scheduled it as a Windows task to run every 3 minutes for the duration of the cutover window. Three minutes was short enough to catch the change soon after it actually happened, but not so aggressive that it hammered public resolvers or generated noise while nothing had changed yet.</p>
<p>The task queried the domain's NS records against several public resolvers (Google, Cloudflare, plus the registrar's own resolver) and compared the results against the four Route 53 name servers from Step 2. It only logged and alerted once every resolver checked returned the new Route 53 name servers consistently — a single matching resolver isn't propagation, it just means that one resolver's cache expired first.</p>
<pre><code>// Simplified check run by the scheduled task
var resolvers = new[] { "8.8.8.8", "1.1.1.1", "your-old-registrar-resolver" };
var expectedNs = new[] { "ns-1.awsdns-00.com", "ns-2.awsdns-00.net", "ns-3.awsdns-00.org", "ns-4.awsdns-00.co.uk" };

bool allPropagated = resolvers.All(resolver =>
{
    var actualNs = QueryNameServers("yourdomain.com", resolver);
    return expectedNs.All(ns => actualNs.Contains(ns, StringComparer.OrdinalIgnoreCase));
});

if (allPropagated)
{
    LogAndNotify("Propagation complete across all checked resolvers — safe to proceed to cert/padlock verification.");
}</code></pre>
<p>Compiled to a single executable, the task was registered with Task Scheduler to run unattended on a 3-minute interval:</p>
<pre><code># Register the task to run every 3 minutes
schtasks /create /tn "Route53PropagationCheck" /tr "C:\tools\propagation-check.exe" /sc minute /mo 3 /f

# Confirm it's scheduled and check the last run result
schtasks /query /tn "Route53PropagationCheck" /v /fo list</code></pre>
<p>This turned "is it safe to move to the next step yet" from a manual guess into a log entry with a timestamp — the task recorded exactly when every resolver checked had picked up the new name servers, which is also the moment it's safe to move on to certificate verification without wondering if you're looking at a stale cache.</p>

<h3>Step 7 — Verify the padlock is fixed everywhere</h3>
<p>Once propagation completes, verify the certificate chain resolves cleanly rather than just checking that the padlock icon appears in one browser on one machine.</p>
<pre><code># Command line check of the full chain
openssl s_client -connect yourdomain.com:443 -servername yourdomain.com

# Full SSL report, including chain trust and any legacy protocol issues
# https://www.ssllabs.com/ssltest/analyze.html?d=yourdomain.com</code></pre>
<p>An SSL Labs grade of A with no chain trust warnings is the real confirmation — a padlock showing in one browser on one device does not rule out mixed trust behavior on older browsers or systems with different root certificate bundles.</p>

<h2>The Result</h2>
<p>Once the name servers cut over and ACM's certificate replaced the old one, the padlock showed consistently across every browser tested, with no chain warnings. The scheduled propagation check meant that transition point wasn't a guess — the task's log showed the exact 3-minute window every checked resolver agreed on the new name servers, which is also exactly when it made sense to move on to the SSL Labs and browser verification instead of checking too early against a resolver still serving a cached answer. DNS management, hosting, and certificate issuance all sitting inside the same AWS account also meant future changes — adding a subdomain, rotating a certificate, adjusting a record — happen in one place instead of coordinating between a registrar's DNS panel and the hosting provider separately.</p>
<p>For clients, the fix was invisible in the best way — the padlock just worked, and the hesitation at checkout that came from seeing "Not Secure" in the address bar went away.</p>

<h2>The Broader Lesson</h2>
<p>A missing or broken padlock is often treated as a certificate problem to be patched in place. Sometimes the more durable fix is upstream of the certificate — putting DNS management in the same place as the certificate authority and the hosting, so renewal and validation happen automatically instead of depending on a manual step across two separate providers. For a domain that exists to sell something, the padlock is not a technical detail clients will forgive — it is the first trust signal they see, and it needs to be right every single time, automatically.</p>

<p>If you're dealing with a domain, DNS, or SSL setup that clients are questioning, or planning a registrar-to-AWS migration and want it done without downtime or lost email, <a href="/#contact">get in touch</a>. Getting DNS, certificates, and hosting into one coherent setup removes an entire category of trust problems before they cost you a sale.</p>
    `.trim(),
};

export default post;
