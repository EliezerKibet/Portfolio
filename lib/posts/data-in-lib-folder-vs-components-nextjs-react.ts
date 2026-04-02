import type { BlogPost } from "../blog";

const post: BlogPost = {
    id: "22",
    slug: "data-in-lib-folder-vs-components-nextjs-react",
    title: "Why Your Data Belongs in lib/ Not in Your Components",
    excerpt:
        "A component that owns its own data is a component you cannot reuse. Separating data into a lib/ folder keeps components pure, makes data accessible anywhere, and makes both independently testable.",
    date: "2026-04-02",
    readTime: "7 min read",
    tags: ["React", "Next.js", "TypeScript", "Architecture", "Frontend"],
    content: `
<h2>The Problem Starts Small</h2>
<p>It starts reasonably enough. You need to render a list of services on the homepage. You write the array directly in the component — it is faster, it works, and there is no reason yet to do otherwise.</p>

<pre><code>// components/ServicesList.tsx
export function ServicesList() {
    const services = [
        { title: 'React Development',  price: '€85/hr', slug: 'react-nextjs-development' },
        { title: '.NET Backend',       price: '€90/hr', slug: 'dotnet-backend' },
        { title: 'Full-Stack Project', price: '€80/hr', slug: 'fullstack-web-development' },
    ];

    return (
        &lt;ul className="space-y-4"&gt;
            {services.map((s) =&gt; (
                &lt;li key={s.slug}&gt;
                    &lt;span className="font-semibold"&gt;{s.title}&lt;/span&gt;
                    &lt;span className="text-gray-500 ml-2"&gt;{s.price}&lt;/span&gt;
                &lt;/li&gt;
            ))}
        &lt;/ul&gt;
    );
}</code></pre>

<p>Three months later, the services page needs the same list. The contact page needs the slugs to build links. A sitemap generator needs the slugs too. The data now lives in one component, but four parts of the application depend on it.</p>
<p>You have two options: copy the array into each place that needs it, or refactor under pressure. Neither is a good outcome for a problem that was avoidable from the start.</p>

<h2>The Rule: Data and Presentation Are Different Concerns</h2>
<p>A component has one job: take data and render it. Defining the data it renders is a separate job, and mixing both into the same file creates coupling that limits everything the component could otherwise do.</p>
<p>When data lives inside a component:</p>
<ul>
  <li>The data is only accessible to that component and its children</li>
  <li>Testing the data requires rendering the component</li>
  <li>Changing the data means knowing which component owns it</li>
  <li>Reusing the data in a new context means duplicating it or refactoring</li>
</ul>
<p>When data lives in <code>lib/</code>:</p>
<ul>
  <li>Any file in the project can import it with a single line</li>
  <li>The data can be tested directly without rendering anything</li>
  <li>Changing the data means editing one file regardless of how many places use it</li>
  <li>Adding a new consumer — a new page, a new component, a sitemap — is one import</li>
</ul>

<h2>The lib/ Pattern in Practice</h2>
<p>Move the data out of the component and into a typed file in <code>lib/</code>:</p>

<pre><code>// lib/services.ts
export type Service = {
    title:       string;
    slug:        string;
    price:       string;
    description: string;
    tags:        string[];
};

export const services: Service[] = [
    {
        title:       'React & Next.js Development',
        slug:        'react-nextjs-development',
        price:       '€85/hr',
        description: 'Fast, SEO-friendly web apps with TypeScript and Tailwind CSS.',
        tags:        ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    },
    {
        title:       '.NET Backend Development',
        slug:        'dotnet-backend',
        price:       '€90/hr',
        description: 'Production-grade REST APIs and background services with ASP.NET Core.',
        tags:        ['C#', '.NET', 'ASP.NET Core', 'PostgreSQL'],
    },
    {
        title:       'Full-Stack Web Development',
        slug:        'fullstack-web-development',
        price:       '€80/hr',
        description: 'End-to-end web applications — frontend, backend, database, and deployment.',
        tags:        ['React', 'Next.js', '.NET', 'PostgreSQL'],
    },
];</code></pre>

<p>The component becomes a pure rendering function:</p>

<pre><code>// components/ServicesList.tsx
import { services } from '@/lib/services';

export function ServicesList() {
    return (
        &lt;ul className="space-y-4"&gt;
            {services.map((s) =&gt; (
                &lt;li key={s.slug}&gt;
                    &lt;span className="font-semibold"&gt;{s.title}&lt;/span&gt;
                    &lt;span className="text-gray-500 ml-2"&gt;{s.price}&lt;/span&gt;
                &lt;/li&gt;
            ))}
        &lt;/ul&gt;
    );
}</code></pre>

<p>Now every consumer that needs service data imports from the same source:</p>

<pre><code>// app/services/page.tsx — renders the full services page
import { services } from '@/lib/services';

// app/sitemap.ts — generates sitemap entries for each service
import { services } from '@/lib/services';

const serviceRoutes = services.map((s) =&gt; ({
    url: \`https://eliezerkibet.dev/services/\${s.slug}\`,
    lastModified: new Date(),
    priority: 0.8,
}));

// components/home/ServicesPreview.tsx — teaser on the homepage
import { services } from '@/lib/services';

const featured = services.slice(0, 2);</code></pre>

<p>Four consumers. One source of truth. Changing a price, a slug, or a description happens in one file and propagates everywhere instantly.</p>

<h2>Adding Utility Functions Alongside the Data</h2>
<p>Once data lives in <code>lib/</code>, it is straightforward to add utility functions that operate on it. These functions stay with the data they work on, not scattered across components:</p>

<pre><code>// lib/services.ts — data and utilities in the same file
export function getServiceBySlug(slug: string): Service | undefined {
    return services.find((s) =&gt; s.slug === slug);
}

export function getServicesByTag(tag: string): Service[] {
    return services.filter((s) =&gt; s.tags.includes(tag));
}

export function getAllServiceSlugs(): string[] {
    return services.map((s) =&gt; s.slug);
}</code></pre>

<pre><code>// app/services/[slug]/page.tsx
import { getServiceBySlug, getAllServiceSlugs } from '@/lib/services';

export async function generateStaticParams() {
    return getAllServiceSlugs().map((slug) =&gt; ({ slug }));
}

export default function ServicePage({ params }: { params: { slug: string } }) {
    const service = getServiceBySlug(params.slug);
    if (!service) notFound();
    // ...
}</code></pre>

<p>The page component has no awareness of the data structure — it calls a function, gets a typed result, and renders it. The routing logic, the data shape, and the rendering logic are each in exactly one place.</p>

<h2>Typed Data Catches Errors Before Runtime</h2>
<p>Moving data to <code>lib/</code> and giving it a TypeScript type means the compiler validates every consumer. If you rename a field in the <code>Service</code> type, every file that accesses the old field name shows a type error immediately — in your editor, before you run the app.</p>

<pre><code>// Change the type
export type Service = {
    title:       string;
    path:        string; // renamed from 'slug'
    price:       string;
    description: string;
    tags:        string[];
};

// Every file that used service.slug now shows a type error
// TypeScript finds them all — you cannot miss one</code></pre>

<p>With data scattered across components, the same rename requires a manual search-and-replace and hoping you found every instance. With data in <code>lib/</code> and a shared type, TypeScript does the audit for you.</p>

<h2>The Component Becomes Truly Reusable</h2>
<p>A component that imports its data directly from <code>lib/</code> is still coupled to that specific dataset. The next level of reusability is making the component accept data as props — letting the caller decide what data to pass:</p>

<pre><code>// components/ServiceCard.tsx — accepts data as props, knows nothing about lib/
interface ServiceCardProps {
    title:       string;
    description: string;
    price:       string;
    slug:        string;
}

export function ServiceCard({ title, description, price, slug }: ServiceCardProps) {
    return (
        &lt;div className="p-6 bg-white rounded-xl border border-gray-200"&gt;
            &lt;h3 className="font-bold text-gray-900 mb-2"&gt;{title}&lt;/h3&gt;
            &lt;p className="text-sm text-gray-600 mb-4"&gt;{description}&lt;/p&gt;
            &lt;div className="flex items-center justify-between"&gt;
                &lt;span className="text-primary-600 font-semibold"&gt;{price}&lt;/span&gt;
                &lt;a href={\`/services/\${slug}\`} className="text-sm font-medium"&gt;Learn more →&lt;/a&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    );
}</code></pre>

<pre><code>// app/services/page.tsx — data comes from lib/, rendering handled by component
import { services } from '@/lib/services';
import { ServiceCard } from '@/components/ServiceCard';

export default function ServicesPage() {
    return (
        &lt;div className="grid grid-cols-1 md:grid-cols-3 gap-6"&gt;
            {services.map((service) =&gt; (
                &lt;ServiceCard key={service.slug} {...service} /&gt;
            ))}
        &lt;/div&gt;
    );
}</code></pre>

<p>Now <code>ServiceCard</code> can render any service-shaped data — from <code>lib/services.ts</code>, from an API response, from a test fixture. It has no dependencies outside of React. It is straightforward to test in isolation, straightforward to use in Storybook, and straightforward to reuse in a different part of the application.</p>

<h2>What Belongs in lib/</h2>
<p>The <code>lib/</code> folder is not just for static data arrays. It is the right home for any logic or data that is independent of the UI layer:</p>
<ul>
  <li><strong>Static data</strong> — services, projects, team members, navigation items, FAQs</li>
  <li><strong>Data fetching functions</strong> — functions that call APIs or query a database</li>
  <li><strong>Data transformation utilities</strong> — formatters, sorters, filters that operate on domain data</li>
  <li><strong>Type definitions</strong> — shared types used across multiple components or pages</li>
  <li><strong>Constants</strong> — base URLs, configuration values, feature flags</li>
  <li><strong>Validation schemas</strong> — Zod schemas used in both form validation and API input validation</li>
</ul>

<pre><code>lib/
├── blog.ts          // blog post type, getAllBlogPosts(), getBlogPostBySlug()
├── projects.ts      // project type, getAllProjects(), getProjectBySlug()
├── services.ts      // service type, services array, getServiceBySlug()
├── constants.ts     // BASE_URL, SITE_NAME, CONTACT_EMAIL
├── utils.ts         // formatDate(), truncate(), cn() class merger
└── posts/           // individual blog post files
    ├── post-one.ts
    └── post-two.ts</code></pre>

<h2>The Maintenance Argument</h2>
<p>The real value of this structure becomes clear when you need to make changes. Consider a requirement to add a new field — an estimated delivery time — to every service:</p>
<p>With data in components, this change requires:</p>
<ol>
  <li>Finding every component that defines service data</li>
  <li>Updating each array with the new field</li>
  <li>Updating each component's rendering logic</li>
  <li>Hoping you found all of them</li>
</ol>
<p>With data in <code>lib/services.ts</code>:</p>
<ol>
  <li>Add the field to the <code>Service</code> type</li>
  <li>TypeScript immediately shows every component that needs to handle the new field</li>
  <li>Add the values to the data array</li>
  <li>Update the components the type errors pointed to</li>
</ol>
<p>The second approach is faster, safer, and leaves no room for missed updates. The structure enforces correctness — not because of discipline, but because the type system makes incomplete changes visible immediately.</p>

<h2>Summary</h2>
<p>Keeping data in <code>lib/</code> and components in <code>components/</code> is not a convention for large teams with strict architecture standards. It is a practical habit that pays off the first time you need the same data in two places, the first time you rename a field, and the first time a new developer joins the project and needs to understand where things are.</p>
<p>Components render. <code>lib/</code> provides. Keeping those responsibilities separate is one of the highest-leverage structural decisions in a React or Next.js project.</p>
<p>For a related look at how reusable components are structured in Next.js projects, see the post on <a href="/blog/building-reusable-components-nextjs">building reusable components in Next.js</a>. For how this pattern applies to Tailwind-based styling, see <a href="/blog/tailwind-css-vs-global-css-scalability-maintenance">Tailwind CSS vs global CSS</a>. If you are building a React or Next.js application and want the architecture set up correctly from the start, see the <a href="/services/react-nextjs-development">React and Next.js development services</a> page or <a href="/contact">get in touch</a>.</p>
    `.trim(),
};

export default post;
