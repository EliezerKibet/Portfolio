import type { BlogPost } from "../blog";

const post: BlogPost = {
    id: "21",
    slug: "tailwind-css-vs-global-css-scalability-maintenance",
    title: "Tailwind CSS vs Global CSS — Why Utility-First Wins at Scale",
    excerpt:
        "Global CSS works fine for small projects. As a codebase grows, shared stylesheets become a maintenance liability. Here is why Tailwind's utility-first model is a better long-term choice for React and Next.js applications.",
    date: "2026-03-30",
    readTime: "7 min read",
    tags: ["Tailwind CSS", "CSS", "React", "Next.js", "Frontend", "Architecture"],
    content: `
<h2>The Problem With Global CSS at Scale</h2>
<p>Global CSS works well when a project is small and the team is one person. You write a <code>.card</code> class, apply it to a handful of components, and everything is manageable. Six months later the project has 40 components, three developers, and a designer who wants to change the border radius on cards across the entire application.</p>
<p>You update the class. Then you discover that <code>.card</code> was also being overridden in five different component-level stylesheets. Two of those overrides were intentional. Three were not. The change that should have taken two minutes takes two hours — and you still are not certain everything is correct.</p>
<p>This is the core problem with global CSS at scale: shared styles create invisible dependencies. Any change to a shared class affects every element using it, and there is no reliable way to know what that includes without searching the entire codebase.</p>

<h2>What Tailwind Does Differently</h2>
<p>Tailwind CSS is a utility-first framework. Instead of writing named classes that group multiple style declarations, you apply single-purpose utility classes directly to elements in your markup.</p>

<pre><code>/* Global CSS approach */
.card {
    padding: 1.5rem;
    background-color: white;
    border-radius: 0.75rem;
    border: 1px solid #e5e7eb;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

/* Tailwind approach */
&lt;div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm"&gt;</code></pre>

<p>At first glance the Tailwind version looks verbose. In practice it solves the invisible dependency problem entirely — the styles for an element are exactly what you see on the element. There is no stylesheet to open, no inheritance to trace, no cascade to debug.</p>

<h2>Reuse Without Abstraction Overhead</h2>
<p>The objection developers raise most often against Tailwind is repetition. If the same card pattern appears in 20 components, are you copying those class strings 20 times?</p>
<p>In a React or Next.js project, the answer is no — you extract the pattern into a component once:</p>

<pre><code>// components/ui/Card.tsx
interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export function Card({ children, className = '' }: CardProps) {
    return (
        &lt;div className={`p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm ${className}`}&gt;
            {children}
        &lt;/div&gt;
    );
}

// Usage — consistent styles, single source of truth
&lt;Card&gt;Project summary content&lt;/Card&gt;
&lt;Card className="hover:shadow-md transition-shadow"&gt;Interactive card&lt;/Card&gt;</code></pre>

<p>The Card component is the single source of truth for card styles. Changing the border radius means updating one component. Every usage updates automatically — no find-and-replace, no missed instances.</p>
<p>This is the correct level of abstraction. You abstract at the component boundary, not at the CSS class boundary. The component represents a UI concept. The utilities describe how it looks. They serve different purposes.</p>

<h2>Design Tokens in tailwind.config.ts — One Change, Whole Codebase</h2>
<p>The most powerful maintenance feature in Tailwind is the config file. Design tokens — your brand colours, spacing scale, typography, border radii — live in <code>tailwind.config.ts</code>. Every utility class that references those tokens updates when the token changes.</p>

<pre><code>// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    50:  '#eff6ff',
                    100: '#dbeafe',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                    900: '#1e3a8a',
                },
                brand: {
                    DEFAULT: '#2563eb',
                    dark:    '#1d4ed8',
                }
            },
            borderRadius: {
                card: '0.75rem',
                btn:  '0.5rem',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            }
        },
    },
};

export default config;</code></pre>

<p>With this config in place:</p>
<ul>
  <li><code>bg-primary-600</code> — applies your brand blue as a background</li>
  <li><code>text-primary-600</code> — applies the same colour as text</li>
  <li><code>hover:bg-primary-700</code> — applies the darker shade on hover</li>
  <li><code>rounded-card</code> — applies your card border radius</li>
</ul>

<p>If the designer changes the primary brand colour, you update one hex value in the config. Every button, badge, link, border, and background using <code>primary-600</code> across the entire codebase reflects the change immediately — without touching a single component file.</p>
<p>In a global CSS system, the equivalent change requires finding every place the colour was hardcoded or referenced as a CSS variable, verifying nothing was overridden locally, and re-testing the entire UI. The config-based approach removes that work entirely.</p>

<h2>Co-location Makes Debugging Faster</h2>
<p>When a bug is reported on a specific component — wrong padding on mobile, colour not matching the design — you open one file. The markup and the styles are in the same place. You can see exactly what is applied, read it top to bottom, and make the fix without context switching.</p>

<pre><code>// Everything you need to understand this component's appearance is right here
export function AlertBanner({ message, type }: AlertBannerProps) {
    const styles = {
        error:   'bg-red-50 border-red-200 text-red-800',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
        success: 'bg-green-50 border-green-200 text-green-800',
    };

    return (
        &lt;div className={`px-4 py-3 rounded-lg border text-sm font-medium ${styles[type]}`}&gt;
            {message}
        &lt;/div&gt;
    );
}</code></pre>

<p>With global CSS, the same component might have styles split across a base stylesheet, a component stylesheet, and possibly an override in a parent component. Understanding what the element actually looks like requires reading all three files and understanding the cascade between them.</p>

<h2>No Specificity Wars</h2>
<p>CSS specificity is one of the most common sources of bugs in large stylesheets. A style is not applying and the reason is that a more specific selector elsewhere is winning. You add <code>!important</code> as a quick fix, which makes the next specificity conflict harder to resolve.</p>
<p>Tailwind utility classes all have the same specificity — a single class. There are no compound selectors, no ID selectors, no deeply nested rules. The class you put on the element is the class that applies. The cascade is not a variable you have to account for.</p>

<h2>Dark Mode Without a Separate Stylesheet</h2>
<p>Dark mode in a global CSS setup typically means a parallel set of overrides — either a <code>[data-theme="dark"]</code> selector block or a separate stylesheet loaded conditionally. Tailwind handles it with a prefix:</p>

<pre><code>&lt;div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"&gt;
    &lt;h1 className="text-3xl font-bold text-gray-900 dark:text-white"&gt;
        Page Title
    &lt;/h1&gt;
    &lt;p className="text-gray-600 dark:text-gray-300"&gt;
        Content that is readable in both modes.
    &lt;/p&gt;
&lt;/div&gt;</code></pre>

<p>The light and dark styles for each element are co-located. You can see both states on a single line. Testing dark mode means toggling a class on the root element — the entire component tree responds without additional configuration.</p>

<h2>Responsive Design at the Element Level</h2>
<p>Tailwind's responsive prefixes (<code>sm:</code>, <code>md:</code>, <code>lg:</code>, <code>xl:</code>) follow the same co-location principle. Instead of writing media queries in a stylesheet, responsive behaviour is expressed directly on the element:</p>

<pre><code>&lt;div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"&gt;
    {posts.map(post =&gt; (
        &lt;article
            key={post.id}
            className="p-4 md:p-6 rounded-xl border border-gray-200"
        &gt;
            &lt;h2 className="text-lg md:text-xl font-bold"&gt;{post.title}&lt;/h2&gt;
        &lt;/article&gt;
    ))}
&lt;/div&gt;</code></pre>

<p>One file. One glance. You can see the mobile layout, the tablet layout, and the desktop layout simultaneously. No jumping between HTML and a media query block in a separate file.</p>

<h2>Bundle Size — Only What You Use</h2>
<p>A common concern is that Tailwind generates a large CSS file. In production this is not the case. Tailwind scans your source files, identifies every utility class actually used, and generates a stylesheet containing only those classes. A typical production Next.js build with Tailwind produces 5–15KB of CSS — smaller than most hand-crafted global stylesheets for a project of the same size.</p>

<pre><code>// tailwind.config.ts — content paths tell Tailwind what to scan
content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
],</code></pre>

<h2>When Global CSS Still Has a Place</h2>
<p>Tailwind does not eliminate global CSS entirely. There are cases where a global stylesheet makes sense:</p>
<ul>
  <li>Base resets and typography defaults — <code>@tailwind base</code> handles most of this, but custom prose styles for blog content often warrant a global rule</li>
  <li>Third-party component overrides — when you cannot add classes to the element directly</li>
  <li>CSS animations defined with <code>@keyframes</code></li>
</ul>
<p>These are narrow, specific cases. The general rule is: if you can express it with utilities, do so. Reserve global CSS for what utilities genuinely cannot handle.</p>

<h2>The Maintenance Argument in Summary</h2>
<p>The reason Tailwind has become the default choice for production React and Next.js projects is not aesthetics. It is the maintenance model:</p>
<ul>
  <li>Design tokens changed in one place propagate to the entire codebase</li>
  <li>Component styles are co-located — one file to open, one file to fix</li>
  <li>No shared stylesheets means no invisible dependencies between components</li>
  <li>No specificity hierarchy means no cascade bugs to debug</li>
  <li>Dark mode and responsive styles are expressed on the element, not in parallel rule sets</li>
</ul>
<p>Global CSS is not wrong. It is the right tool for documents and small sites. For component-based applications that will be maintained, extended, and handed over to other developers, Tailwind's utility-first model is a fundamentally better fit.</p>
<p>For a related look at how reusable component architecture works in Next.js projects, see the post on <a href="/blog/building-reusable-components-nextjs">building reusable components in Next.js</a>. If you are building a React or Next.js application and want the frontend architecture set up correctly, see the <a href="/services/react-nextjs-development">React and Next.js development services</a> page or <a href="/contact">get in touch</a>.</p>
    `.trim(),
};

export default post;
