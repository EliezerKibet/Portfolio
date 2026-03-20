import type { BlogPost } from '../blog';

const post: BlogPost = {
    id: '12',
    slug: 'building-reusable-components-nextjs',
    title: 'How to Structure Reusable Components in a Next.js Project',
    excerpt: 'One habit separates Next.js codebases that stay clean from ones that become a nightmare to maintain — thinking in reusable components from day one. Here is the structure and rules I use on every project.',
    date: '2026-03-20',
    readTime: '5 min read',
    tags: ['Next.js', 'React', 'Frontend', 'Components', 'Clean Code'],
    content: `
<h2>Why Component Structure Matters</h2>
<p>Most developers start a Next.js project by building pages. Then they copy a button here, a card there. Six weeks in, the same UI element exists in 11 different files — each slightly different. Change one, the others stay broken.</p>
<p>The fix isn't discipline. It's structure. When there's a clear place for everything, the right decision becomes the obvious decision.</p>

<h2>Three Layers — Everything Fits Somewhere</h2>
<pre><code>components/
  ui/          ← no business logic, pure display
    Button.tsx
    Card.tsx
    Badge.tsx
    Input.tsx

  layout/      ← structure shared across pages
    Navbar.tsx
    Footer.tsx
    PageWrapper.tsx

  features/    ← specific to one domain
    blog/
      BlogCard.tsx
      BlogList.tsx
    projects/
      ProjectCard.tsx
      ProjectGrid.tsx</code></pre>

<p><strong>ui/</strong> — components that know nothing about your application. They receive data via props and render it. No API calls, no business logic, no assumptions about where they'll be used.</p>
<p><strong>layout/</strong> — components that define the structure of a page. These appear on every page or most pages. The Navbar doesn't know what page it's on. The Footer doesn't know what content surrounds it.</p>
<p><strong>features/</strong> — components tied to a specific domain of your application. A <code>BlogCard</code> knows about blog posts. A <code>ProjectCard</code> knows about projects. They live close to the feature they belong to.</p>

<h2>The One Rule</h2>
<p>If a component appears in more than one place, it belongs in <code>ui/</code>.</p>
<p>That's it. Apply that rule consistently and the folder structure stays clean without active effort.</p>

<h2>What a Good Reusable Component Looks Like</h2>
<p>A good reusable component has one job. The moment you find yourself adding props to control five different behaviours, the component is doing too much.</p>

<pre><code>// ❌ Doing too much — too many responsibilities in one component
&lt;ProjectCard
  project={project}
  showContact
  showBadge
  openModal
  variant="featured"
/&gt;

// ✓ One clear responsibility
&lt;ProjectCard project={project} /&gt;
&lt;FeaturedBadge /&gt;
&lt;ContactCTA /&gt;</code></pre>

<p>Split it when a component starts accumulating conditional props. Each piece is easier to test, easier to update, and easier to reuse independently.</p>

<h2>Use children and className to Extend Without Coupling</h2>
<p>The most flexible pattern for UI components is accepting <code>children</code> and an optional <code>className</code>. This lets the component be extended at the call site without changing the component itself.</p>

<pre><code>interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    &lt;div className={cn("rounded-lg border p-6 bg-white", className)}&gt;
      {children}
    &lt;/div&gt;
  );
}</code></pre>

<p>Now <code>Card</code> works everywhere. Blog post previews. Project tiles. Pricing sections. Testimonial blocks. You style it at the call site using <code>className</code>, not by adding props inside the component.</p>

<pre><code>// Blog post
&lt;Card className="hover:shadow-md transition-shadow"&gt;
  &lt;BlogPostContent post={post} /&gt;
&lt;/Card&gt;

// Pricing tier
&lt;Card className="border-blue-500 border-2"&gt;
  &lt;PricingTier tier={tier} /&gt;
&lt;/Card&gt;</code></pre>

<p>One component. Two completely different use cases. No new props required.</p>

<h2>Co-locate Types With Components</h2>
<p>Keep the TypeScript interface for a component's props in the same file as the component. Don't create a separate <code>types/</code> folder for component props — it's unnecessary indirection.</p>

<pre><code>// BlogCard.tsx
interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  tags: string[];
}

export function BlogCard({ title, excerpt, date, slug, tags }: BlogCardProps) {
  // ...
}</code></pre>

<p>The type lives where it's used. When you update the component, the type is right there. No switching files.</p>

<h2>When to Create a New Component</h2>
<p>A useful heuristic: if you're about to copy and paste JSX, stop and ask whether it should be a component instead.</p>
<p>The answer is yes if:</p>
<ul>
  <li>The same JSX will appear in more than one place</li>
  <li>The block of JSX has a clear, nameable responsibility</li>
  <li>You want to test it in isolation</li>
</ul>
<p>The answer is no if:</p>
<ul>
  <li>The JSX only appears once and is unlikely to be reused</li>
  <li>Extracting it would make the code harder to read, not easier</li>
  <li>It would need so many props to be generic that it's more complex than just writing it inline</li>
</ul>

<h2>The Payoff</h2>
<p>None of this feels significant on day one. The folder structure looks like overhead. The discipline of keeping components single-responsibility feels like extra work.</p>
<p>Day 60 is when it pays off.</p>
<p>You need to update a button style. In a well-structured project, you change <code>Button.tsx</code> once. It updates everywhere. In a project without structure, you spend three hours finding every place a button was copy-pasted and hoping you didn't miss one.</p>
<p>You need to add a loading state to a card. In a well-structured project, you add it to <code>Card.tsx</code> and every card in the application gets it. In an unstructured project, you add it to the three different inline card implementations and forget the fourth.</p>
<p>Build components like you're building a library — even when you're the only one using it. Future you, six months from now, will thank you.</p>

<p>If you're building a Next.js application and want to talk through the architecture before you start, <a href="/contact">get in touch</a>. Getting the structure right at the start is far cheaper than refactoring it later.</p>
    `.trim(),
};

export default post;
