import type { BlogPost } from '../blog';

const post: BlogPost = {
    id: '26',
    slug: 'aws-to-dedicated-server-migration-windows-registry-keys',
    title: 'Migrating from AWS to a Dedicated Server — Why Copying the Database Is Not Enough',
    excerpt: 'Most server migrations copy the database and miss the Windows registry keys. Here\'s what breaks silently after the move — and how to migrate it correctly.',
    date: '2026-05-23',
    readTime: '10 min read',
    tags: ['DevOps', 'Windows Server', 'SQL Server', 'Backend', '.NET', 'Deployment', 'AWS'],
    content: `
<h2>The Migration That Looks Done — But Isn't</h2>
<p>The move from an AWS EC2 instance to a dedicated server follows a pattern most teams know by heart. Back up the database. Copy the application files. Install the required runtimes. Restore the database. Update connection strings. Start the services.</p>
<p>And then something doesn't work. A service starts but behaves differently from the old server. SQL Agent jobs fail silently. An application can't locate a configuration value that was never in any config file you copied. You spend hours comparing the two servers trying to find what's different.</p>
<p>What's different is the Windows registry. Every major service running on a Windows Server — SQL Server, IIS, custom .NET Windows services — stores configuration in the registry. The database backup gets the data. The registry holds the environment those services were built to run in. Copy one without the other and you have a server that's half-migrated.</p>

<h2>What the Registry Actually Stores</h2>
<p>The Windows registry is a hierarchical database built into the operating system. For server migration purposes, the two hives that matter most are:</p>
<ul>
  <li><code>HKLM\\SOFTWARE\\</code> — application and service configuration (memory limits, instance settings, license keys, application-specific values)</li>
  <li><code>HKLM\\SYSTEM\\CurrentControlSet\\Services\\</code> — every Windows service's startup configuration, account credentials, and parameters</li>
</ul>
<p>When a service is installed on Windows, it writes its configuration here. When it runs, it reads from here. When you move to a new server and only restore the application files, the new installation has its own default registry values — not the tuned, production-specific values from the server you're leaving behind.</p>

<h2>SQL Server Registry Keys</h2>
<p>SQL Server is the most common example of a service whose behaviour is shaped almost entirely by registry configuration that never appears in any file you would think to copy.</p>
<p>The instance-level configuration — maximum server memory, max degree of parallelism, backup compression defaults, and the cost threshold for parallelism — lives under:</p>
<pre><code>HKLM\\SOFTWARE\\Microsoft\\MSSQLServer\\MSSQLServer</code></pre>
<p>A fresh SQL Server installation on the new dedicated server will have default values for all of these. If your production instance was tuned to use 24 GB of memory and the new one defaults to unlimited, SQL Server will consume all available RAM within hours of load hitting it.</p>
<p>The SQL Server Agent configuration — job scheduling behaviour, alert operators, token security — lives under:</p>
<pre><code>HKLM\\SOFTWARE\\Microsoft\\MSSQLServer\\SQLServerAgent</code></pre>
<p>And the Windows service entries that control how SQL Server and SQL Agent start, which account they run under, and what startup parameters they use are at:</p>
<pre><code>HKLM\\SYSTEM\\CurrentControlSet\\Services\\MSSQLSERVER
HKLM\\SYSTEM\\CurrentControlSet\\Services\\SQLSERVERAGENT
HKLM\\SYSTEM\\CurrentControlSet\\Services\\MSSQLFDLauncher</code></pre>
<p>Export all of these before you decommission the source server:</p>
<pre><code>reg export "HKLM\\SOFTWARE\\Microsoft\\MSSQLServer" C:\\migration\\sqlserver-config.reg /y
reg export "HKLM\\SYSTEM\\CurrentControlSet\\Services\\MSSQLSERVER" C:\\migration\\mssql-service.reg /y
reg export "HKLM\\SYSTEM\\CurrentControlSet\\Services\\SQLSERVERAGENT" C:\\migration\\sqlagent-service.reg /y</code></pre>

<h2>Custom Windows Services</h2>
<p>Any .NET application deployed as a Windows service has its own registry entry under <code>HKLM\\SYSTEM\\CurrentControlSet\\Services\\[ServiceName]</code>. This entry controls the service display name, the path to the executable, the startup type (automatic, manual, delayed), and the service account it runs under.</p>
<p>When you reinstall the service on the new server, Windows creates a new registry entry with whatever values the installer provides. If your production configuration differed from the installer defaults — a specific service account, a modified executable path, a delayed start — those differences exist only in the registry of the old server.</p>
<p>Many applications also store runtime configuration in <code>HKLM\\SOFTWARE\\[CompanyName]\\[ApplicationName]</code>. This is common for values that change between environments and shouldn't be in a config file — internal API endpoints, server-specific paths, licence keys. If your application reads from the registry and that key doesn't exist on the new server, the service will either use a hardcoded fallback or fail entirely, often without a clear error.</p>
<p>Export every service and application key that is relevant to your stack:</p>
<pre><code># Windows service entry
reg export "HKLM\\SYSTEM\\CurrentControlSet\\Services\\YourServiceName" C:\\migration\\your-service.reg /y

# Application-specific config
reg export "HKLM\\SOFTWARE\\YourCompany\\YourApp" C:\\migration\\yourapp-config.reg /y</code></pre>

<h2>IIS Configuration</h2>
<p>IIS stores most of its site and application pool configuration in <code>C:\\Windows\\System32\\inetsrv\\config\\applicationHost.config</code> — not the registry — so that file should be part of your migration checklist alongside the registry export. However, some IIS service-level settings and the W3SVC service entry are registry-based:</p>
<pre><code>HKLM\\SOFTWARE\\Microsoft\\InetStp
HKLM\\SYSTEM\\CurrentControlSet\\Services\\W3SVC
HKLM\\SYSTEM\\CurrentControlSet\\Services\\WAS</code></pre>
<p>The more reliable approach for IIS is to use the built-in export tool rather than raw registry manipulation:</p>
<pre><code># Export all IIS configuration
%windir%\\system32\\inetsrv\\appcmd list site /config /xml > C:\\migration\\iis-sites.xml
%windir%\\system32\\inetsrv\\appcmd list apppool /config /xml > C:\\migration\\iis-apppools.xml

# Import on the new server
%windir%\\system32\\inetsrv\\appcmd add site /in < C:\\migration\\iis-sites.xml
%windir%\\system32\\inetsrv\\appcmd add apppool /in < C:\\migration\\iis-apppools.xml</code></pre>

<h2>Importing Registry Keys on the New Server</h2>
<p>With the <code>.reg</code> files transferred to the new server, importing them is straightforward:</p>
<pre><code>reg import C:\\migration\\sqlserver-config.reg
reg import C:\\migration\\mssql-service.reg
reg import C:\\migration\\sqlagent-service.reg
reg import C:\\migration\\your-service.reg
reg import C:\\migration\\yourapp-config.reg</code></pre>
<p>Do this before starting any services on the new server. If a service has already started and cached its configuration, restart it after importing so the new registry values take effect.</p>
<p>One important caveat: service account passwords are not stored in the registry in plain text and will not be carried over by the export. After importing the service entries, open Services (<code>services.msc</code>), locate each service, and re-enter the service account credentials under the Log On tab.</p>

<h2>The Complete Migration Checklist</h2>
<p>Working through migrations repeatedly, this is the checklist that accounts for everything the obvious steps miss:</p>
<ul>
  <li><strong>Database</strong> — full backup with <code>BACKUP DATABASE</code>, restore on the new instance, verify with <code>DBCC CHECKDB</code></li>
  <li><strong>SQL Server configuration</strong> — export <code>HKLM\\SOFTWARE\\Microsoft\\MSSQLServer</code> and service entries</li>
  <li><strong>SQL Agent jobs</strong> — script all jobs from SSMS (right-click Jobs → Script Job As) or use <code>msdb</code> system tables</li>
  <li><strong>Application files</strong> — binaries, published output, static assets</li>
  <li><strong>Web.config / appsettings.json</strong> — with environment-specific values updated for the new server</li>
  <li><strong>IIS sites and application pools</strong> — via appcmd export or IIS Manager shared configuration</li>
  <li><strong>SSL certificates</strong> — export with private key (<code>.pfx</code>), import in Certificate Manager on the new server</li>
  <li><strong>Custom Windows services</strong> — export registry entries, reinstall executables, re-enter service account passwords</li>
  <li><strong>Application registry keys</strong> — any <code>HKLM\\SOFTWARE\\[Company]\\[App]</code> entries your applications read</li>
  <li><strong>Scheduled tasks</strong> — export via Task Scheduler or <code>schtasks /query /fo LIST /v > tasks.txt</code></li>
  <li><strong>Windows Firewall rules</strong> — export via <code>netsh advfirewall export C:\\migration\\firewall.wfw</code></li>
  <li><strong>Environment variables</strong> — system-level variables under <code>HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Environment</code></li>
  <li><strong>Hosts file</strong> — <code>C:\\Windows\\System32\\drivers\\etc\\hosts</code> if internal DNS entries were added manually</li>
</ul>

<h2>Test Before You Cut Over</h2>
<p>The value of running both servers in parallel — even briefly — is that you can verify the new server under real conditions before switching DNS. Run your application against the new server with a small subset of traffic, or run your integration tests pointed at it directly. The registry issues surface immediately under real load in ways that a quick visual check of the running services will not reveal.</p>
<p>The time investment in a proper registry export adds less than 30 minutes to any migration. The time lost diagnosing why a service behaves differently on the new server without that export can take days.</p>
`,
};

export default post;
