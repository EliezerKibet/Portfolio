import type { BlogPost } from '../blog';

const post: BlogPost = {
    id: '31',
    slug: 'dll-deployment-failed-ssl-certificate-load-balancer',
    title: 'Why Your .NET DLL Deployment Failed — SSL Certificates, Load Balancers, and What to Check First',
    excerpt: 'The DLL was fine. The application built cleanly. The deployment looked correct — but the application was completely unreachable. Here is how to diagnose a deployment failure that has nothing to do with your code.',
    date: '2026-06-12',
    readTime: '7 min read',
    tags: ['.NET', 'DevOps', 'IIS', 'SSL', 'Windows Server', 'Deployment', 'Load Balancer', 'Backend', 'Debugging'],
    content: `
<h2>The Deployment That Looked Like It Worked</h2>
<p>The DLL compiled without errors. The build output was clean. The application pool was recycled. The files were in the right place on the server. By every visible indicator, the deployment was successful.</p>
<p>Then the application was completely unreachable. Not throwing a 500. Not logging an exception. Just — gone. Every request returned a 503 Service Unavailable, or timed out entirely before getting a response.</p>
<p>The natural assumption is that the DLL broke something. That assumption is wrong — and it sends you debugging in the wrong direction for a long time before you find the actual problem.</p>

<h2>What Actually Happened</h2>
<p>The SSL certificate on the server had expired. Before the DLL was pushed, the certificate was renewed — but renewing the certificate required taking the load balancer offline temporarily to apply the new binding and restart the relevant services.</p>
<p>The DLL was deployed during that window. By the time the deployment was done, the load balancer was still inactive. The application itself was running perfectly behind it — the DLL was fine, the app pool was healthy, the application responded correctly on its internal port. But no traffic was reaching it because the load balancer had not been brought back online.</p>
<p>The failure chain looked like this:</p>

<pre><code>Client request
  → Load balancer (OFFLINE — SSL renewal in progress)
    → Application (running fine, never receives request)

Result: 503 / timeout — looks like a deployment failure</code></pre>

<p>The DLL was not the problem. The load balancer was.</p>

<h2>How to Diagnose This Correctly</h2>
<p>The key distinction is between an application failure and an infrastructure failure. When a DLL causes a problem, the application starts and then throws exceptions — you see errors in the Event Viewer, exceptions in the application logs, IIS returning 500 errors. When a load balancer is down, none of that happens — the application never receives the request in the first place.</p>

<p>The diagnosis sequence when a deployment fails with 503 or complete silence:</p>

<h3>Step 1 — Bypass the load balancer and hit the application directly</h3>
<p>Connect to the server via RDP and make a local request directly to the application port. If the application is running on port 5000 internally:</p>

<pre><code># PowerShell — test the application directly on the server
Invoke-WebRequest -Uri "http://localhost:5000/health" -UseBasicParsing

# Or check if the port is listening at all
netstat -ano | findstr ":5000"</code></pre>

<p>If the application responds locally but is unreachable externally, the problem is in the network path between the client and the application — the load balancer, a firewall rule, a reverse proxy, or a DNS misconfiguration. The code is not the issue.</p>

<h3>Step 2 — Check the load balancer status</h3>
<p>Before touching the application, check whether the load balancer is active and routing traffic correctly. In IIS with ARR (Application Request Routing) as the load balancer:</p>

<pre><code># PowerShell — check IIS ARR server farm health
Import-Module WebAdministration
Get-WebConfiguration -Filter "system.webServer/proxy" -PSPath "IIS:\"

# Check if the ARR feature itself is running
Get-WebConfigurationProperty -Filter "system.webServer/proxy" -Name "enabled" -PSPath "IIS:\"</code></pre>

<p>In a hardware load balancer or cloud load balancer (Azure Load Balancer, AWS ALB), check the health probes — a load balancer will stop routing to a backend if its health probe fails, even if the application is running.</p>

<h3>Step 3 — Check the SSL certificate binding</h3>
<p>If the SSL certificate was recently renewed, verify the new certificate is correctly bound to the site in IIS and that the binding matches the load balancer's expected configuration:</p>

<pre><code># PowerShell — list SSL bindings on IIS
netsh http show sslcert

# Or check via IIS module
Get-WebBinding -Protocol "https"</code></pre>

<p>Look for: the correct thumbprint on the new certificate, the binding is on the correct port (usually 443), and the certificate is not expired again (check the NotAfter date).</p>

<pre><code># Check certificate expiry in the Windows certificate store
$certs = Get-ChildItem -Path Cert:\LocalMachine\My
$certs | Select-Object Subject, NotAfter, Thumbprint | Sort-Object NotAfter</code></pre>

<h3>Step 4 — Check the application pool state</h3>
<p>Only after confirming the infrastructure is healthy should you check the application pool. A stopped pool is a separate failure mode from a routing failure:</p>

<pre><code># PowerShell — check all app pool states
Import-Module WebAdministration
Get-ChildItem IIS:\AppPools | Select-Object Name, State

# Check a specific pool
Get-WebAppPoolState -Name "YourAppPoolName"

# Start it if it stopped
Start-WebAppPool -Name "YourAppPoolName"</code></pre>

<h3>Step 5 — Check Windows Event Viewer for startup errors</h3>
<p>If the application pool is stopped or repeatedly stopping, the reason will be in the Event Viewer under Windows Logs → Application. A DLL that causes an actual crash — a missing dependency, a type mismatch, a bad configuration value — will show an entry here with the exception type and stack trace.</p>
<p>If there are no entries from the application at all, the application never started — which means it never got a chance to load the DLL. The failure is upstream.</p>

<h2>Bringing the Load Balancer Back Online After SSL Renewal</h2>
<p>Once you confirm the load balancer is the problem, the fix depends on what took it offline. In the case of an SSL certificate renewal, the steps are:</p>

<ol>
  <li>Confirm the new certificate is installed and correctly bound to port 443 in IIS (covered in Step 3 above)</li>
  <li>Restart the load balancer or re-enable routing in the server farm</li>
  <li>Verify the health probe is passing — the load balancer will not route traffic to backends that fail the health check</li>
  <li>Test externally from outside the server to confirm traffic is routing again</li>
</ol>

<pre><code># After bringing the load balancer back, test from outside
# Replace with your actual domain
curl -I https://yourdomain.com/health

# Expected response
HTTP/2 200
content-type: application/json</code></pre>

<p>Only once external traffic is routing again do you verify that the DLL deployment itself worked correctly — test the specific endpoints that changed and check the application logs for any new errors.</p>

<h2>The Deployment Checklist That Prevents This</h2>
<p>The root cause here was not the SSL certificate renewal — it was deploying code without first verifying the infrastructure was healthy. Adding an infrastructure health check to the deployment process makes this class of problem impossible to miss:</p>

<pre><code>Before deploying any code to production:

[ ] Load balancer is active and routing traffic
[ ] SSL certificate is valid (NotAfter is not today or imminent)
[ ] All application pools are in the Running state
[ ] External health check endpoint returns 200
[ ] No ongoing maintenance window or infrastructure changes in progress

If any item is not confirmed — do not deploy until it is resolved.</code></pre>

<p>This check takes two minutes. Diagnosing a mystery 503 caused by an inactive load balancer takes significantly longer — especially at the point where you have convinced yourself the DLL must be broken and start reverting code that was never the problem.</p>

<h2>Coordinating SSL Renewals With Deployments</h2>
<p>SSL certificates should have a renewal process that is separate from application deployments and communicated to anyone who might be deploying during that window. A few practices that prevent the collision:</p>

<ul>
  <li><strong>Automate certificate renewal.</strong> Tools like Win-ACME or Azure Key Vault certificate rotation handle renewal automatically, often without taking the load balancer offline at all. Manual renewal is where the load balancer downtime tends to happen.</li>
  <li><strong>Schedule renewals during low-traffic windows.</strong> Certificate renewal that requires infrastructure restarts should happen at 2am, not during the working day when deployments are also happening.</li>
  <li><strong>Add a pre-deployment health check to CI/CD.</strong> If deployment is automated through a pipeline, add a step that verifies the load balancer and external health endpoint before the deployment step begins. The pipeline fails fast instead of silently deploying into a broken infrastructure state.</li>
</ul>

<pre><code># GitHub Actions example — health check before deployment
- name: Pre-deployment health check
  run: |
    response=$(curl -s -o /dev/null -w "%{http_code}" https://yourdomain.com/health)
    if [ "$response" != "200" ]; then
      echo "Health check failed with status $response — aborting deployment"
      exit 1
    fi
    echo "Infrastructure healthy — proceeding with deployment"</code></pre>

<h2>The Broader Lesson</h2>
<p>When a deployment fails and the symptoms are a 503 or complete silence rather than application errors, the first question to ask is not "what did the code change?" — it is "is the path from the user to the application intact?"</p>
<p>Infrastructure failures and application failures look identical from the outside. The way to tell them apart is to test each layer independently: external request to the load balancer, direct request to the application bypassing the load balancer, application pool state, Event Viewer for startup errors. Work inward from the client until you find where the request stops getting a response.</p>
<p>In this case, the request stopped at the load balancer. The DLL was fine. Fifteen minutes of infrastructure diagnosis saved hours of unnecessary code rollback.</p>

<p>If you are managing a .NET deployment pipeline and want to add proper health checks, automated certificate renewal, or a structured pre-deployment checklist, <a href="/#contact">get in touch</a>. Getting the infrastructure layer right prevents entire categories of deployment incidents.</p>
    `.trim(),
};

export default post;
