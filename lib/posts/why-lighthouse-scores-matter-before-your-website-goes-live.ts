import type { BlogPost } from '../blog';

const post: BlogPost = {
    id: '9',
    slug: 'why-lighthouse-scores-matter-before-your-website-goes-live',
    title: 'Why Lighthouse Scores Matter Before Your Website Goes Live',
    excerpt: 'Most clients have never heard of Lighthouse — but its scores determine whether Google ranks your site, whether users stay or leave, and whether your investment in a new website actually pays off.',
    date: '2026-03-17',
    readTime: '5 min read',
    tags: ['Web Performance', 'SEO', 'Lighthouse', 'Web Development', 'Client Guide'],
    content: `
<h2>What Is Lighthouse?</h2>
<p>Lighthouse is Google's open-source tool for measuring the quality of a website. It runs a series of automated checks and produces scores across four categories:</p>
<ul>
  <li><strong>Performance</strong> — how fast the site loads and responds</li>
  <li><strong>Accessibility</strong> — whether all users, including those with disabilities, can use it</li>
  <li><strong>Best Practices</strong> — whether the site is built using modern, secure web standards</li>
  <li><strong>SEO</strong> — whether search engines can find, crawl, and rank the content</li>
</ul>
<p>Each score runs from 0 to 100. You can run a Lighthouse audit yourself for free: open Google Chrome, press F12 to open DevTools, click the Lighthouse tab, and hit Generate Report.</p>
<p>What you see will tell you a lot about why your site is or isn't performing.</p>

<h2>Why This Matters More Than Most Clients Realise</h2>
<p>I've seen clients spend €5,000–€15,000 on a professionally designed website, launch it, and then wonder why it gets no organic traffic. The design was good. The content was relevant. But the Lighthouse scores were in the 40s and 50s.</p>
<p>Google uses these signals as ranking factors. A slow, inaccessible, poorly structured site gets deprioritised in search results — regardless of how good the content is. You can have the best service page in your industry and still not appear on page one because the foundation is broken.</p>

<h2>What Each Score Actually Affects</h2>

<h3>Performance (Target: 90+)</h3>
<p>Performance measures how fast your site loads and becomes interactive. Google uses Core Web Vitals — a subset of performance metrics — as a direct ranking signal. A slow site is penalised in search results.</p>
<p>Beyond rankings, performance directly affects revenue. Studies consistently show that every 1 second of additional load time reduces conversions by 7–10%. On mobile, the effect is even stronger. A site that takes 5 seconds to load on a 4G connection loses a significant portion of its visitors before they see a single word.</p>
<p>Common causes of poor performance scores: unoptimised images, too many third-party scripts, no caching, large JavaScript bundles, and no server-side rendering.</p>

<h3>Accessibility (Target: 95+)</h3>
<p>Accessibility measures whether your site can be used by people with visual, motor, cognitive, or hearing impairments. This includes things like sufficient colour contrast, proper heading structure, alt text on images, and keyboard navigation support.</p>
<p>In the European Union, web accessibility is increasingly a legal requirement — not a recommendation. The European Accessibility Act comes into full effect in June 2025, requiring most businesses to meet WCAG 2.1 AA standards for digital products and services. Non-compliance carries financial penalties.</p>
<p>Beyond legal compliance, an accessible site is simply usable by more people. Roughly 15% of the global population lives with some form of disability. A low accessibility score means a portion of your potential customers literally cannot use your site.</p>

<h3>Best Practices (Target: 95+)</h3>
<p>Best Practices covers security, modern web standards, and correct technical implementation. A low score here often means the site is using deprecated APIs, has security vulnerabilities, or is missing HTTPS — all of which affect user trust and Google's assessment of your site's quality.</p>
<p>Modern browsers increasingly show warnings to users visiting sites with poor security practices. Nothing kills conversion faster than a browser telling your visitor the site is "not secure."</p>

<h3>SEO (Target: 95+)</h3>
<p>The SEO score checks whether Google can correctly read and index your pages. This includes things like proper meta tags, canonical URLs, structured data, mobile-friendliness, and crawlability.</p>
<p>A site can have excellent written content and still score poorly on SEO if the technical implementation is wrong. Missing meta descriptions, duplicate content without canonical tags, or pages blocked by robots.txt will all prevent Google from ranking your content — regardless of how relevant it is to what people are searching for.</p>

<h2>What Good Scores Look Like in Practice</h2>
<p>For reference, here are the benchmarks I target before any project goes live:</p>
<ul>
  <li>Performance: 90+</li>
  <li>Accessibility: 95+</li>
  <li>Best Practices: 95+</li>
  <li>SEO: 95+</li>
</ul>
<p>Hitting these scores requires deliberate effort from the start of a project — not a last-minute patch before launch. It means optimising images during development, writing semantic HTML, implementing proper meta tags on every page, and testing on real mobile devices throughout the build.</p>
<p>It's not difficult to achieve if it's built in from the beginning. It's very expensive to retrofit if it isn't.</p>

<h2>How to Check Your Current Site</h2>
<p>If you already have a live website, run a Lighthouse audit now:</p>
<ol>
  <li>Open your site in Google Chrome</li>
  <li>Press F12 (or right-click → Inspect)</li>
  <li>Click the "Lighthouse" tab</li>
  <li>Select "Navigation" and check all four categories</li>
  <li>Click "Analyse page load"</li>
</ol>
<p>Alternatively, use <a href="https://pagespeed.web.dev" target="_blank" rel="noopener noreferrer">PageSpeed Insights</a> (Google's free online tool) — paste your URL and it runs the same audit without needing to open DevTools.</p>
<p>If any score is below 80, it's worth investigating. Below 60 on Performance or SEO is a significant problem if organic traffic or conversions matter to your business.</p>

<h2>What I Do Before Every Launch</h2>
<p>On every project I deliver, Lighthouse audits are run on all key pages before handover. Performance, Accessibility, Best Practices, and SEO all need to hit target scores. It's not optional — it's part of the build.</p>
<p>If you're planning a new website or questioning why your existing site isn't generating traffic, the Lighthouse scores are usually the first place to look. They tell you, clearly and objectively, what's working and what isn't.</p>
<p>If you'd like a free audit of your current site or want to discuss a new build, <a href="/contact">get in touch</a> — I'm happy to take a look.</p>
    `.trim(),
};

export default post;
