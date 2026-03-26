import { Metadata } from 'next';
import Link from 'next/link';

const baseUrl = 'https://eliezerkibet.dev';

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Do you handle both frontend and backend on the same project?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. Full-stack means full ownership — React or Next.js on the frontend, ASP.NET Core or Node.js on the backend, database design, and deployment. You deal with one developer, not a handoff chain.',
            },
        },
        {
            '@type': 'Question',
            name: 'What is your typical project timeline for a full-stack web application?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'It depends on scope. A booking system or business portal typically takes 4–8 weeks. A SaaS platform or multi-role application takes longer. I send a detailed timeline estimate with every proposal.',
            },
        },
        {
            '@type': 'Question',
            name: 'Which deployment platforms do you use?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Vercel for Next.js frontends, Azure App Service or Docker-based deployments for .NET backends, and managed PostgreSQL or SQL Server for databases. I match the deployment stack to your infrastructure requirements.',
            },
        },
        {
            '@type': 'Question',
            name: 'Can you take over an existing project rather than starting from scratch?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. I regularly join existing codebases to add features, refactor problem areas, or stabilise a system before launch. An initial code review is part of the onboarding for inherited projects.',
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
        { '@type': 'ListItem', position: 3, name: 'Full-Stack Web Development', item: `${baseUrl}/services/fullstack-web-development` },
    ],
};

export const metadata: Metadata = {
    title: 'Full-Stack Web Development Services | Freelance Developer Berlin',
    description: 'Hire a freelance full-stack web developer based in Berlin. I build complete web applications — React/Next.js frontend, .NET or Node.js backend, database design, and Vercel or Azure deployment.',
    keywords: ['hire full-stack developer', 'freelance full-stack developer Berlin', 'full-stack web development service', 'React .NET developer', 'freelance web developer Europe', 'full-stack developer for hire'],
    alternates: {
        canonical: 'https://eliezerkibet.dev/services/fullstack-web-development',
    },
    openGraph: {
        title: 'Full-Stack Web Development Services | Eliezer Kibet',
        description: 'Freelance full-stack developer in Berlin. React/Next.js + .NET. End-to-end web apps. Available for hire.',
        url: 'https://eliezerkibet.dev/services/fullstack-web-development',
        type: 'website',
    },
};

export default function FullstackServicePage() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 py-16 md:py-24">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <div className="container-custom max-w-4xl">
                <nav className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                    <Link href="/services" className="hover:text-primary-600">Services</Link>
                    <span className="mx-2">/</span>
                    <span>Full-Stack Web Development</span>
                </nav>

                <div className="mb-12">
                    <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-semibold rounded-full mb-4">Full-Stack Development</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Full-Stack Web Development
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                        End-to-end web applications — React or Next.js frontend, .NET or Node.js backend,
                        database design, and live deployment. One developer, full ownership.
                    </p>
                </div>

                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Types of Projects</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { title: 'Booking & Appointment Systems', desc: 'Slot-based booking with email confirmations, admin management, and conflict prevention.' },
                            { title: 'SaaS & Web Platforms', desc: 'Multi-user platforms with subscription billing, role-based access, and admin dashboards.' },
                            { title: 'E-Commerce', desc: 'Product catalogues, cart systems, Stripe checkout, order management, and admin analytics.' },
                            { title: 'Business Portals & Dashboards', desc: 'Internal tools, data dashboards, and management systems for operations teams.' },
                            { title: 'API & Integration Platforms', desc: 'Systems that aggregate or sync data from multiple external APIs (Jira, Azure DevOps, CRMs).' },
                            { title: 'Government & Enterprise Sites', desc: 'Large-scale, secure platforms with 2FA, RBAC, audit logging, and media management.' },
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

                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Tech Stack</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {[
                            { label: 'Frontend', items: ['React 18', 'Next.js 14+', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
                            { label: 'Backend', items: ['ASP.NET Core', 'C# / .NET', 'Node.js', 'REST APIs', 'Docker'] },
                            { label: 'Data & Deploy', items: ['PostgreSQL', 'SQL Server', 'Entity Framework', 'Vercel', 'Azure'] },
                        ].map(({ label, items }) => (
                            <div key={label}>
                                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">{label}</p>
                                <ul className="space-y-1">
                                    {items.map((item) => (
                                        <li key={item} className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
                    {[
                        { value: '100%', label: 'Job Success Score', sub: 'verified' },
                        { value: '4+', label: 'Years Experience', sub: 'full-stack dev' },
                        { value: '20+', label: 'Projects Delivered', sub: 'on time' },
                        { value: '10 wks', label: 'Longest Project', sub: 'Embassy of Kenya' },
                    ].map(({ value, label, sub }) => (
                        <div key={label} className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                            <p className="text-2xl font-bold text-primary-600">{value}</p>
                            <p className="text-xs font-semibold text-gray-900 dark:text-white mt-1">{label}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{sub}</p>
                        </div>
                    ))}
                </div>

                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Recent Projects</h2>
                    <div className="flex flex-wrap gap-3">
                        {[
                            { title: 'Embassy of Kenya Website', slug: 'embassy-of-kenya-website' },
                            { title: 'REDFACE Cybersecurity Platform', slug: 'redface-cybersecurity' },
                            { title: 'FlowLenz Ticket Management', slug: 'flowlenz-ticket-management' },
                            { title: 'AI Garage Management System', slug: 'garage-management-system' },
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

                {/* Related reading */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Related Reading</h2>
                    <div className="flex flex-wrap gap-3">
                        {[
                            { title: 'JWT Authentication in C# — How to Do It Correctly', slug: 'jwt-authentication-csharp-dotnet-security' },
                            { title: 'Swagger, Unit Tests, and Bearer Tokens in .NET', slug: 'swagger-unit-testing-bearer-token-csharp-dotnet' },
                            { title: 'Database Indexing in PostgreSQL and MySQL', slug: 'database-indexing-postgresql-mysql-query-performance' },
                            { title: 'Building Reusable Components in Next.js', slug: 'building-reusable-components-nextjs' },
                        ].map(({ title, slug }) => (
                            <Link
                                key={slug}
                                href={`/blog/${slug}`}
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
                            { q: 'Do you handle both frontend and backend on the same project?', a: 'Yes. Full-stack means full ownership — React or Next.js on the frontend, ASP.NET Core or Node.js on the backend, database design, and deployment. You deal with one developer, not a handoff chain.' },
                            { q: 'What is your typical project timeline for a full-stack web application?', a: 'It depends on scope. A booking system or business portal typically takes 4–8 weeks. A SaaS platform or multi-role application takes longer. I send a detailed timeline estimate with every proposal.' },
                            { q: 'Which deployment platforms do you use?', a: 'Vercel for Next.js frontends, Azure App Service or Docker-based deployments for .NET backends, and managed PostgreSQL or SQL Server for databases. I match the deployment stack to your infrastructure requirements.' },
                            { q: 'Can you take over an existing project rather than starting from scratch?', a: 'Yes. I regularly join existing codebases to add features, refactor problem areas, or stabilise a system before launch. An initial code review is part of the onboarding for inherited projects.' },
                        ].map(({ q, a }) => (
                            <div key={q} className="p-5 border border-gray-200 dark:border-gray-700 rounded-xl">
                                <p className="font-semibold text-gray-900 dark:text-white mb-2">{q}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300">{a}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gray-900 dark:bg-white rounded-2xl p-8 text-center">
                    <h2 className="text-2xl font-bold text-white dark:text-gray-900 mb-2">Ready to build your web application?</h2>
                    <p className="text-gray-400 dark:text-gray-600 mb-6 text-sm">Based in Berlin · Available for remote projects worldwide · Responds within 24h</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link
                            href="/contact"
                            className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105"
                        >
                            Start a Project
                        </Link>
                        <Link
                            href="/projects"
                            className="px-8 py-3 border border-gray-600 text-gray-300 dark:border-gray-300 dark:text-gray-700 font-semibold rounded-xl hover:border-primary-500 transition-colors"
                        >
                            View Portfolio
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
