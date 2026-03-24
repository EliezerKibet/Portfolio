import { Metadata } from 'next';
import Link from 'next/link';

const baseUrl = 'https://eliezerkibet.dev';

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Do you build React apps from scratch or only work on existing projects?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Both. I take projects from initial design to production, and I also join existing codebases to add features, fix bugs, or improve performance.',
            },
        },
        {
            '@type': 'Question',
            name: 'Do you use TypeScript for React projects?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes, TypeScript by default. It prevents entire classes of bugs at compile time and makes handover far cleaner for your internal team.',
            },
        },
        {
            '@type': 'Question',
            name: 'Can you handle SEO as part of a Next.js project?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. I handle metadata, canonical URLs, Open Graph tags, structured data (JSON-LD), sitemap generation, and Core Web Vitals as standard parts of every Next.js project — not add-ons.',
            },
        },
        {
            '@type': 'Question',
            name: 'What is your availability for React / Next.js projects?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'I am based in Berlin (CET/CEST) and available for new projects. Get in touch via the contact page and I will respond within 24 hours with availability details.',
            },
        },
    ],
};

const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${baseUrl}/services` },
        { '@type': 'ListItem', position: 3, name: 'React & Next.js Development', item: `${baseUrl}/services/react-nextjs-development` },
    ],
};

export const metadata: Metadata = {
    title: 'React & Next.js Development Services | Freelance Developer Berlin',
    description: 'Hire a freelance React and Next.js developer based in Berlin. I build fast, SEO-friendly web apps with TypeScript and Tailwind CSS. Available for projects across Europe and worldwide.',
    keywords: ['hire React developer', 'freelance Next.js developer', 'React developer Berlin', 'Next.js development service', 'TypeScript developer for hire', 'freelance React developer Europe'],
    alternates: {
        canonical: 'https://eliezerkibet.dev/services/react-nextjs-development',
    },
    openGraph: {
        title: 'React & Next.js Development Services | Eliezer Kibet',
        description: 'Freelance React & Next.js developer in Berlin. Fast, SEO-friendly web apps with TypeScript. Available for hire.',
        url: 'https://eliezerkibet.dev/services/react-nextjs-development',
        type: 'website',
    },
};

export default function ReactNextjsServicePage() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 py-16 md:py-24">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <div className="container-custom max-w-4xl">
                {/* Breadcrumb */}
                <nav className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                    <Link href="/services" className="hover:text-primary-600">Services</Link>
                    <span className="mx-2">/</span>
                    <span>React & Next.js Development</span>
                </nav>

                {/* Header */}
                <div className="mb-12">
                    <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold rounded-full mb-4">Frontend Development</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        React & Next.js Development
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                        Fast, SEO-friendly web applications built with React 18, Next.js 14+, TypeScript, and Tailwind CSS.
                        Freelance developer based in Berlin — available for projects worldwide.
                    </p>
                </div>

                {/* What I build */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">What I Build</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { title: 'Business Websites', desc: 'Marketing sites and company pages with Next.js App Router, SSG, and full SEO optimisation.' },
                            { title: 'Web Applications', desc: 'Dashboards, portals, and SaaS tools with complex state management and real-time data.' },
                            { title: 'E-Commerce Storefronts', desc: 'Product catalogues, cart systems, and Stripe checkout flows built with Next.js.' },
                            { title: 'Figma-to-Code', desc: 'Pixel-perfect implementation of your Figma designs, including animations with Framer Motion.' },
                            { title: 'API Integration', desc: 'Connecting React frontends to third-party APIs — payment gateways, CRMs, data platforms.' },
                            { title: 'Performance Optimisation', desc: 'Improving Core Web Vitals, Lighthouse scores, and page load times on existing React apps.' },
                        ].map(({ title, desc }) => (
                            <div key={title} className="flex gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{title}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tech stack */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Tech Stack</h2>
                    <div className="flex flex-wrap gap-2">
                        {['React 18', 'Next.js 14+', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Zustand', 'React Query', 'Axios', 'Stripe', 'Vercel'].map((tech) => (
                            <span key={tech} className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm rounded-lg font-medium">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Why hire me */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-2xl p-8 mb-12">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Why hire me for React & Next.js work?</h2>
                    <ul className="space-y-3">
                        {[
                            'Verified 100% Job Success Score — track record of delivering on spec and on time.',
                            '4+ years building production React and Next.js applications across fintech, government, and enterprise.',
                            'I write TypeScript by default — no loose JavaScript that becomes unmaintainable after handover.',
                            'I handle SEO from the start: proper metadata, canonical URLs, structured data, and Core Web Vitals.',
                            'You see regular progress updates — not a big reveal at the end.',
                        ].map((point) => (
                            <li key={point} className="flex gap-3 text-sm text-gray-700 dark:text-gray-300">
                                <span className="text-blue-500 flex-shrink-0 mt-0.5">→</span>
                                {point}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Related projects */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Related Projects</h2>
                    <div className="flex flex-wrap gap-3">
                        {[
                            { title: 'REDFACE Cybersecurity Platform', slug: 'redface-cybersecurity' },
                            { title: 'Embassy of Kenya Website', slug: 'embassy-of-kenya-website' },
                            { title: 'FlowLenz Ticket Management', slug: 'flowlenz-ticket-management' },
                        ].map(({ title, slug }) => (
                            <Link
                                key={slug}
                                href={`/projects/${slug}`}
                                className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                            >
                                {title} →
                            </Link>
                        ))}
                    </div>
                </div>

                {/* FAQ */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {[
                            { q: 'Do you build React apps from scratch or only work on existing projects?', a: 'Both. I take projects from initial design to production, and I also join existing codebases to add features, fix bugs, or improve performance.' },
                            { q: 'Do you use TypeScript for React projects?', a: 'Yes, TypeScript by default. It prevents entire classes of bugs at compile time and makes handover far cleaner for your internal team.' },
                            { q: 'Can you handle SEO as part of a Next.js project?', a: 'Yes. I handle metadata, canonical URLs, Open Graph tags, structured data (JSON-LD), sitemap generation, and Core Web Vitals as standard parts of every Next.js project — not add-ons.' },
                            { q: 'What is your availability for React / Next.js projects?', a: 'I am based in Berlin (CET/CEST) and available for new projects. Get in touch via the contact page and I will respond within 24 hours with availability details.' },
                        ].map(({ q, a }) => (
                            <div key={q} className="p-5 border border-gray-200 dark:border-gray-700 rounded-xl">
                                <p className="font-semibold text-gray-900 dark:text-white mb-2">{q}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300">{a}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="bg-gray-900 dark:bg-white rounded-2xl p-8 text-center">
                    <h2 className="text-2xl font-bold text-white dark:text-gray-900 mb-2">Need a React or Next.js developer?</h2>
                    <p className="text-gray-400 dark:text-gray-600 mb-6 text-sm">Based in Berlin · Available for remote projects worldwide · Responds within 24h</p>
                    <Link
                        href="/contact"
                        className="inline-block px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105"
                    >
                        Get a Free Quote
                    </Link>
                </div>
            </div>
        </div>
    );
}
