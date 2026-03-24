import { Metadata } from 'next';
import Link from 'next/link';

const baseUrl = 'https://eliezerkibet.dev';

export const metadata: Metadata = {
    title: 'Freelance Developer Germany | React, Next.js & .NET | Eliezer Kibet',
    description: 'Freelance full-stack developer based in Germany. React, Next.js, TypeScript, and .NET backend. Available for projects across Germany and remote throughout Europe. English-speaking. Responds within 24 hours.',
    keywords: [
        'freelance developer Germany',
        'freelance web developer Germany',
        'React developer Germany',
        'Next.js developer Germany',
        '.NET developer Germany',
        'hire developer Germany',
        'freelance full-stack developer Germany',
        'web development Germany',
        'English speaking developer Germany',
        'remote developer Germany',
    ],
    alternates: {
        canonical: `${baseUrl}/services/freelance-developer-germany`,
    },
    openGraph: {
        title: 'Freelance Developer Germany | Eliezer Kibet',
        description: 'Freelance full-stack developer based in Germany. React, Next.js, TypeScript, .NET. English-speaking. Available for projects across Germany and Europe.',
        url: `${baseUrl}/services/freelance-developer-germany`,
        type: 'website',
    },
};

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Are you based in Germany?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. I am based in Berlin, Germany, and available for projects across Germany — remote or on-site in Berlin.',
            },
        },
        {
            '@type': 'Question',
            name: 'Do you work with German companies?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. I work with German startups, agencies, and enterprises. All communication and deliverables are in English, which is standard across Germany\'s tech industry.',
            },
        },
        {
            '@type': 'Question',
            name: 'What are your rates for projects in Germany?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'My rates are competitive for the German market — typically €70–€120/hour or fixed-price for well-defined projects. I provide detailed quotes within 48 hours of understanding the scope.',
            },
        },
        {
            '@type': 'Question',
            name: 'Can you work remotely with German clients?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. I work fully remotely and collaborate with clients across Germany using standard tools — Slack, Teams, Jira, GitHub, and video calls. Time zone is CET/CEST, so there is no scheduling friction.',
            },
        },
        {
            '@type': 'Question',
            name: 'Do you have experience with German compliance requirements?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. I have experience building systems that meet GDPR requirements — including data handling, consent flows, and privacy-by-design principles. I am also familiar with German accessibility standards (BITV 2.0) for public-facing platforms.',
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
        { '@type': 'ListItem', position: 3, name: 'Freelance Developer Germany', item: `${baseUrl}/services/freelance-developer-germany` },
    ],
};

export default function FreelanceDeveloperGermanyPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 py-16 md:py-24">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <div className="container-custom max-w-4xl">
                <nav className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                    <Link href="/services" className="hover:text-primary-600">Services</Link>
                    <span className="mx-2">/</span>
                    <span>Freelance Developer Germany</span>
                </nav>

                <div className="mb-12">
                    <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-semibold rounded-full mb-4">
                        Based in Germany
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Freelance Developer Germany
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                        Full-stack web development from Berlin, Germany. React, Next.js, TypeScript, and .NET.
                        English-speaking. Available remotely across Germany and Europe.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
                    {[
                        { value: 'Germany', label: 'Based in', sub: 'Berlin, CET/CEST' },
                        { value: '100%', label: 'Job Success', sub: 'verified' },
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

                {/* Why Germany-based */}
                <div className="mb-14 p-6 border border-gray-200 dark:border-gray-700 rounded-2xl">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Why Hire a Germany-Based Developer</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { title: 'Same time zone', desc: 'CET/CEST — no scheduling friction with German or European clients. Real-time collaboration during your working day.' },
                            { title: 'GDPR familiarity', desc: 'Experience building systems with GDPR-compliant data handling, consent flows, and privacy-by-design.' },
                            { title: 'EU accessibility standards', desc: 'Familiar with BITV 2.0 and WCAG 2.1 requirements for German public-facing platforms.' },
                            { title: 'No contractor complexity', desc: 'Straightforward freelance engagement — no agency overhead, direct communication, full accountability.' },
                        ].map(({ title, desc }) => (
                            <div key={title} className="flex gap-3">
                                <span className="text-primary-500 mt-0.5 flex-shrink-0">✓</span>
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{title}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Services */}
                <div className="mb-14">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Services</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            { label: 'Frontend', items: ['React 18', 'Next.js 14+', 'TypeScript', 'Tailwind CSS'] },
                            { label: 'Backend', items: ['ASP.NET Core', 'C# / .NET', 'Node.js', 'REST APIs'] },
                            { label: 'Data & Deploy', items: ['PostgreSQL', 'SQL Server', 'Vercel', 'Azure'] },
                        ].map(({ label, items }) => (
                            <div key={label} className="p-5 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">{label}</p>
                                <ul className="space-y-1.5">
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
                            { q: 'Are you based in Germany?', a: 'Yes. I am based in Berlin, Germany, and available for projects across Germany — remote or on-site in Berlin.' },
                            { q: 'Do you work with German companies?', a: "Yes. I work with German startups, agencies, and enterprises. All communication and deliverables are in English, which is standard across Germany's tech industry." },
                            { q: 'What are your rates for projects in Germany?', a: 'My rates are competitive for the German market — typically €70–€120/hour or fixed-price for well-defined projects. I provide detailed quotes within 48 hours.' },
                            { q: 'Can you work remotely with German clients?', a: 'Yes. I work fully remotely and collaborate using standard tools — Slack, Teams, Jira, GitHub, and video calls. Time zone is CET/CEST, so there is no scheduling friction.' },
                            { q: 'Do you have experience with GDPR requirements?', a: 'Yes. I have experience building systems with GDPR-compliant data handling, consent flows, and privacy-by-design principles.' },
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
                    <h2 className="text-2xl font-bold text-white dark:text-gray-900 mb-2">Looking for a developer in Germany?</h2>
                    <p className="text-gray-400 dark:text-gray-600 mb-6 text-sm">Based in Berlin · Remote across Germany & Europe · English-speaking · Responds within 24h</p>
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
