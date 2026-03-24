import { Metadata } from 'next';
import Link from 'next/link';

const baseUrl = 'https://eliezerkibet.dev';

export const metadata: Metadata = {
    title: 'Freelance Developer Berlin | React, Next.js & .NET | Eliezer Kibet',
    description: 'Freelance full-stack developer based in Berlin. React, Next.js, TypeScript, and .NET backend. Available for projects in Berlin, Germany, and remote across Europe. Responds within 24 hours.',
    keywords: [
        'freelance developer Berlin',
        'freelance web developer Berlin',
        'React developer Berlin',
        'Next.js developer Berlin',
        '.NET developer Berlin',
        'hire developer Berlin',
        'freelance full-stack developer Berlin',
        'web development Berlin',
        'software developer Berlin',
    ],
    alternates: {
        canonical: `${baseUrl}/services/freelance-developer-berlin`,
    },
    openGraph: {
        title: 'Freelance Developer Berlin | Eliezer Kibet',
        description: 'Freelance full-stack developer based in Berlin. React, Next.js, TypeScript, .NET. Available for projects across Europe.',
        url: `${baseUrl}/services/freelance-developer-berlin`,
        type: 'website',
    },
};

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Where are you based in Berlin?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'I am based in Berlin, Germany. I work remotely with clients across Berlin, Germany, and Europe, and am available for on-site meetings in Berlin when needed.',
            },
        },
        {
            '@type': 'Question',
            name: 'Do you work with Berlin startups?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. I regularly work with Berlin-based startups, agencies, and established businesses. Projects range from MVP web applications to enterprise platforms.',
            },
        },
        {
            '@type': 'Question',
            name: 'What technologies do you use?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'I specialise in React, Next.js, TypeScript on the frontend, and ASP.NET Core, C#, and .NET on the backend. Databases include PostgreSQL and SQL Server. I deploy to Vercel and Azure.',
            },
        },
        {
            '@type': 'Question',
            name: 'How do I start a project with you?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Get in touch via the contact page or book a 30-minute discovery call directly. I respond within 24 hours and can usually provide an initial quote within 48 hours of understanding the scope.',
            },
        },
        {
            '@type': 'Question',
            name: 'Do you work in German?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'I work in English. Berlin\'s tech scene operates predominantly in English, and all project communication, documentation, and code is delivered in English.',
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
        { '@type': 'ListItem', position: 3, name: 'Freelance Developer Berlin', item: `${baseUrl}/services/freelance-developer-berlin` },
    ],
};

export default function FreelanceDeveloperBerlinPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 py-16 md:py-24">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <div className="container-custom max-w-4xl">
                <nav className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                    <Link href="/services" className="hover:text-primary-600">Services</Link>
                    <span className="mx-2">/</span>
                    <span>Freelance Developer Berlin</span>
                </nav>

                <div className="mb-12">
                    <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-semibold rounded-full mb-4">
                        Based in Berlin
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Freelance Developer Berlin
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                        Full-stack web development from Berlin. React, Next.js, TypeScript, and .NET.
                        Available for projects in Berlin, across Germany, and remote throughout Europe.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
                    {[
                        { value: 'Berlin', label: 'Based in', sub: 'Germany' },
                        { value: '4+', label: 'Years', sub: 'full-stack dev' },
                        { value: '20+', label: 'Projects', sub: 'delivered' },
                        { value: '24h', label: 'Response', sub: 'time' },
                    ].map(({ value, label, sub }) => (
                        <div key={label} className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                            <p className="text-2xl font-bold text-primary-600">{value}</p>
                            <p className="text-xs font-semibold text-gray-900 dark:text-white mt-1">{label}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{sub}</p>
                        </div>
                    ))}
                </div>

                {/* What I build */}
                <div className="mb-14">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">What I Build for Berlin Clients</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { title: 'Web Applications & SaaS', desc: 'Full-stack applications with React or Next.js frontend and .NET or Node.js backend.' },
                            { title: 'Booking & Appointment Systems', desc: 'Slot-based booking with email notifications, admin management, and conflict prevention.' },
                            { title: 'E-Commerce Platforms', desc: 'Product catalogues, cart systems, Stripe checkout, and order management.' },
                            { title: 'Business Dashboards', desc: 'Internal tools, analytics dashboards, and management portals for operations teams.' },
                            { title: 'API Integrations', desc: 'Connecting your systems with third-party APIs — payment, email, CRM, and more.' },
                            { title: 'Enterprise & Government Sites', desc: 'Large-scale platforms with 2FA, role-based access, and secure admin backends.' },
                        ].map(({ title, desc }) => (
                            <div key={title} className="flex gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                <span className="text-primary-500 mt-0.5 flex-shrink-0">✓</span>
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{title}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tech */}
                <div className="mb-14">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Tech Stack</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {[
                            { label: 'Frontend', items: ['React 18', 'Next.js 14+', 'TypeScript', 'Tailwind CSS'] },
                            { label: 'Backend', items: ['ASP.NET Core', 'C# / .NET', 'Node.js', 'REST APIs'] },
                            { label: 'Data & Deploy', items: ['PostgreSQL', 'SQL Server', 'Vercel', 'Azure'] },
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

                {/* FAQ */}
                <div className="mb-14">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {[
                            { q: 'Where are you based in Berlin?', a: 'I am based in Berlin, Germany. I work remotely with clients across Berlin, Germany, and Europe, and am available for on-site meetings in Berlin when needed.' },
                            { q: 'Do you work with Berlin startups?', a: 'Yes. I regularly work with Berlin-based startups, agencies, and established businesses. Projects range from MVP web applications to enterprise platforms.' },
                            { q: 'Do you work in German?', a: "I work in English. Berlin's tech scene operates predominantly in English, and all project communication, documentation, and code is delivered in English." },
                            { q: 'How do I start a project with you?', a: 'Get in touch via the contact page or book a 30-minute discovery call. I respond within 24 hours and can usually provide an initial quote within 48 hours of understanding the scope.' },
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
                    <h2 className="text-2xl font-bold text-white dark:text-gray-900 mb-2">Looking for a developer in Berlin?</h2>
                    <p className="text-gray-400 dark:text-gray-600 mb-6 text-sm">Based in Berlin · Remote across Europe · Responds within 24h</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link href="/contact" className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105">
                            Start a Project
                        </Link>
                        <Link href="/projects" className="px-8 py-3 border border-gray-600 dark:border-gray-300 text-gray-300 dark:text-gray-700 font-semibold rounded-xl hover:border-primary-500 transition-colors">
                            View Portfolio
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
