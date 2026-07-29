import type { BlogPost } from '../blog';

const post: BlogPost = {
    id: '33',
    slug: 'aspnet-web-forms-listing-style-color-picker-master-page',
    title: 'How to Build a Background, Highlight, and Text Color Picker for an ASP.NET Web Forms Master Page',
    excerpt: 'A single shared master page meant every listing on the platform looked identical, and any request for custom branding meant hand-editing CSS for one client at a time. Here is how I built a three-part color picker — background, highlight, and text — that lets each listing owner style their own page live, safely.',
    date: '2026-07-28',
    readTime: '8 min read',
    tags: ['ASP.NET Web Forms', 'C#', '.NET Framework', 'CSS', 'Master Pages', 'Real Estate', 'Backend'],
    content: `
<h2>Why a Shared Master Page Doesn't Work for Multi-Tenant Listing Styling</h2>
<p>A property listing platform typically runs every listing page through one shared master page — one <code>Site.master</code>, one CSS file, one look for every listing on the site. That works fine until listing owners start asking for their own branding: their own background color, their own accent color on buttons and borders, their own text color to match their existing marketing.</p>
<p>The naive fix is to give each listing owner a custom CSS override, hand-edited by a developer. That does not scale — every new request is a support ticket, every change is a deploy, and the master page slowly fills up with special-case CSS classes for one-off clients. The actual fix is to make styling a data problem, not a code problem: store three color values per listing, and have the master page render them dynamically for whichever listing is currently being viewed.</p>

<h3>Step 1 — Model the Three Color Values</h3>
<p>Every listing gets exactly three customizable values: background, highlight (used for borders, buttons, and accents), and text. Keep the model deliberately small — three values are enough to make a listing feel branded without turning this into a full theme editor.</p>

<pre><code>CREATE TABLE ListingStyle (
    ListingId       INT PRIMARY KEY,
    BackgroundColor VARCHAR(7) NOT NULL DEFAULT '#FFFFFF',
    HighlightColor  VARCHAR(7) NOT NULL DEFAULT '#0078D4',
    TextColor       VARCHAR(7) NOT NULL DEFAULT '#000000',
    UpdatedAt       DATETIME NOT NULL DEFAULT GETUTCDATE()
);</code></pre>

<p>Storing colors as fixed-length hex strings (<code>#RRGGBB</code>) rather than named colors or RGB tuples keeps validation simple — a single regex covers the entire column, both on the way in and on the way out.</p>

<h3>Step 2 — Build the Color Picker Control</h3>
<p>The native HTML <code>&lt;input type="color"&gt;</code> element gives you a full OS-level color picker with zero JavaScript dependencies and works in every modern browser. Wrap three of them, one per value, in a user control so the same picker can be reused anywhere a listing owner edits their style:</p>

<pre><code>&lt;!-- ListingStylePicker.ascx --&gt;
&lt;div class="style-picker"&gt;
    &lt;label for="&lt;%= colorBackground.ClientID %&gt;"&gt;Background&lt;/label&gt;
    &lt;input type="color" id="colorBackground" runat="server" value="#ffffff" oninput="updatePreview()" /&gt;

    &lt;label for="&lt;%= colorHighlight.ClientID %&gt;"&gt;Highlight&lt;/label&gt;
    &lt;input type="color" id="colorHighlight" runat="server" value="#0078d4" oninput="updatePreview()" /&gt;

    &lt;label for="&lt;%= colorText.ClientID %&gt;"&gt;Text&lt;/label&gt;
    &lt;input type="color" id="colorText" runat="server" value="#000000" oninput="updatePreview()" /&gt;

    &lt;asp:Button ID="btnSaveStyle" runat="server" Text="Save Style" OnClick="btnSaveStyle_Click" /&gt;
    &lt;asp:Label ID="lblError" runat="server" CssClass="error-text" /&gt;
&lt;/div&gt;

&lt;div id="listingPreview" class="listing-preview"&gt;
    &lt;h3&gt;Sample Listing Title&lt;/h3&gt;
    &lt;p&gt;This is how your listing will appear to visitors.&lt;/p&gt;
&lt;/div&gt;</code></pre>

<p>Marking the inputs <code>runat="server"</code> means the code-behind can read their submitted values directly on postback via <code>colorBackground.Value</code>, without wiring up a separate hidden field or manual form parsing.</p>

<h3>Step 3 — Live Preview Before Saving</h3>
<p>Listing owners should see the result before committing to it. CSS custom properties make this a few lines of JavaScript — update the properties on <code>input</code>, and the preview box repaints instantly with no server round-trip:</p>

<pre><code>function updatePreview() {
    var bg = document.getElementById('&lt;%= colorBackground.ClientID %&gt;').value;
    var hl = document.getElementById('&lt;%= colorHighlight.ClientID %&gt;').value;
    var tx = document.getElementById('&lt;%= colorText.ClientID %&gt;').value;

    var preview = document.getElementById('listingPreview');
    preview.style.setProperty('--listing-bg', bg);
    preview.style.setProperty('--listing-highlight', hl);
    preview.style.setProperty('--listing-text', tx);
}</code></pre>

<pre><code>.listing-preview {
    background-color: var(--listing-bg, #ffffff);
    color: var(--listing-text, #000000);
    border: 2px solid var(--listing-highlight, #0078d4);
    padding: 16px;
    border-radius: 8px;
}</code></pre>

<p>The fallback values in <code>var(--listing-bg, #ffffff)</code> matter — if the custom property is ever unset, the preview still renders with a sane default instead of falling back to browser defaults or transparent backgrounds.</p>

<h3>Step 4 — Validate and Persist on the Server</h3>
<p>The <code>&lt;input type="color"&gt;</code> element only lets a user select a valid hex color through the browser's picker UI — but nothing stops a direct HTTP POST with an arbitrary string in that field. Client-side constraints are a UX convenience, not a security boundary. Validate the hex format again on the server before it touches the database:</p>

<pre><code>private static readonly Regex HexColorPattern = new Regex(@"^#[0-9A-Fa-f]{6}$", RegexOptions.Compiled);

protected void btnSaveStyle_Click(object sender, EventArgs e)
{
    string background = colorBackground.Value;
    string highlight   = colorHighlight.Value;
    string text        = colorText.Value;

    if (!HexColorPattern.IsMatch(background) ||
        !HexColorPattern.IsMatch(highlight) ||
        !HexColorPattern.IsMatch(text))
    {
        lblError.Text = "Invalid color value submitted.";
        return;
    }

    int listingId = Convert.ToInt32(Request.QueryString["listingId"]);

    using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ListingDb"].ConnectionString))
    using (var cmd = new SqlCommand(@"
        MERGE ListingStyle AS target
        USING (SELECT @ListingId AS ListingId) AS source
        ON target.ListingId = source.ListingId
        WHEN MATCHED THEN
            UPDATE SET BackgroundColor = @Background, HighlightColor = @Highlight, TextColor = @Text, UpdatedAt = GETUTCDATE()
        WHEN NOT MATCHED THEN
            INSERT (ListingId, BackgroundColor, HighlightColor, TextColor)
            VALUES (@ListingId, @Background, @Highlight, @Text);", conn))
    {
        cmd.Parameters.AddWithValue("@ListingId", listingId);
        cmd.Parameters.AddWithValue("@Background", background);
        cmd.Parameters.AddWithValue("@Highlight", highlight);
        cmd.Parameters.AddWithValue("@Text", text);

        conn.Open();
        cmd.ExecuteNonQuery();
    }
}</code></pre>

<p>The <code>MERGE</code> statement handles both the first save (insert) and every subsequent edit (update) with one round-trip, which matches how this actually gets used — a listing owner might set their style once at signup or come back and tweak it months later.</p>

<h3>Step 5 — Inject the Saved Colors Into the Master Page at Render Time</h3>
<p>This is the piece that makes the whole approach work: the master page is shared, but the style block it emits is not. On every request, the master page's code-behind looks up which listing is being viewed, reads that listing's saved colors, and writes a small <code>&lt;style&gt;</code> block into the page head before anything renders:</p>

<pre><code>// Site.master.cs
protected void Page_Load(object sender, EventArgs e)
{
    int listingId;
    if (int.TryParse(Request.QueryString["listingId"], out listingId))
    {
        var style = ListingStyleRepository.GetByListingId(listingId);

        var styleBlock = new HtmlGenericControl("style");
        styleBlock.InnerHtml =
            $":root {{ --listing-bg: {style.BackgroundColor}; --listing-highlight: {style.HighlightColor}; --listing-text: {style.TextColor}; }}";

        Page.Header.Controls.Add(styleBlock);
    }
}</code></pre>

<p>Every listing page pulls in the same master page and the same base CSS file. What changes per request is three custom property values, computed once per page load and scoped to that request only — no per-client CSS files, no build step, no deploy required to onboard a new listing's branding.</p>

<h3>Step 6 — Defaults and Defense-in-Depth on Read</h3>
<p>Validating on save is not the same as trusting the value forever. A direct database edit, a migration script, or a future admin tool that writes to this table might not go through the same validation path. Because this value is about to be written directly into a <code>&lt;style&gt;</code> block as raw markup, re-validate it on the way out, not just on the way in:</p>

<pre><code>public static ListingStyle GetByListingId(int listingId)
{
    // ... query ListingStyle by listingId ...

    if (!IsValidHex(background) || !IsValidHex(highlight) || !IsValidHex(text))
        return ListingStyle.Default; // never inject unvalidated data into markup, regardless of its source

    return new ListingStyle
    {
        BackgroundColor = background,
        HighlightColor  = highlight,
        TextColor       = text
    };
}</code></pre>

<p>If a listing has never set a custom style, or the stored value somehow fails validation, falling back to <code>ListingStyle.Default</code> means the page still renders correctly with the platform's standard colors — a missing or bad style value degrades gracefully instead of breaking the page or leaving an injection vector open.</p>

<h2>Putting It All Together — The Structure</h2>
<p>The complete pattern has four layers, each with one responsibility:</p>
<ul>
  <li><strong>Color picker control</strong> — captures exactly three values with a live, no-server-round-trip preview</li>
  <li><strong>Server-side validation</strong> — a single hex-format regex enforced both when a value is saved and again when it's read back out</li>
  <li><strong>Per-listing storage</strong> — one row per listing, with defaults applied whenever a value is missing or invalid</li>
  <li><strong>Master page injection</strong> — the shared template reads the current listing's style at request time and emits a scoped custom-property block, so one master page renders a different look for every listing without a CSS file per client</li>
</ul>
<p>Adding a fourth customizable value later — a border radius, a font choice — means extending the same model, the same picker, and the same injection point. Nothing about the master page itself needs to change.</p>

<h2>Implementation Checklist</h2>
<ul>
  <li>Colors stored as fixed-length <code>#RRGGBB</code> hex strings, one row per listing</li>
  <li>Native <code>&lt;input type="color"&gt;</code> controls, marked <code>runat="server"</code> for direct code-behind access</li>
  <li>Live preview driven by CSS custom properties, updated on <code>input</code> with no server round-trip</li>
  <li>Hex format validated server-side on save — client-side constraints are UX only, never trusted as the security boundary</li>
  <li>Hex format validated again on read, before injecting into the master page's <code>&lt;style&gt;</code> block</li>
  <li>Sane default style applied whenever a value is missing or fails validation</li>
  <li>Master page reads the current listing ID per request and injects a scoped style block — no per-client CSS files, no deploy needed for a new listing's branding</li>
</ul>

<p>For more on the listing platform this styling system sits on top of, see the posts on <a href="/blog/sql-video-cleanup-property-listing-xml-database">cleaning up video and XML data on a property listing platform</a> and <a href="/blog/rapidapi-property-listing-migration-quota-fix">fixing a RapidAPI quota issue on the same platform</a>. If you're maintaining a legacy ASP.NET Web Forms system and want per-client customization added without a full rewrite, see the <a href="/services/dotnet-backend">.NET backend development services</a> page or <a href="/contact">get in touch</a>.</p>
    `.trim(),
};

export default post;
