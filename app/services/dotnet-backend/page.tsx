import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: '.NET Backend Development Services | Freelance C# Developer Berlin',
    description: 'Hire a freelance .NET and C# backend developer based in Berlin. I build REST APIs, background services, and data layers with ASP.NET Core, Entity Framework, and PostgreSQL or SQL Server.',
    keywords: ['hire .NET developer', 'freelance C# developer', '.NET backend developer Berlin', 'ASP.NET Core development', 'freelance backend developer Europe', 'C# developer for hire'],
    alternates: {
        canonical: 'https://eliezerkibet.dev/services/dotnet-backend',
    },
    openGraph: {
        title: '.NET Backend Development Services | Eliezer Kibet',
        description: 'Freelance .NET and C# backend developer in Berlin. REST APIs, ASP.NET Core, Entity Framework. Available for hire.',
        url: 'https://eliezerkibet.dev/services/dotnet-backend',
        type: 'website',
    },
};

export default function DotnetBackendServicePage() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 py-16 md:py-24">
            <div className="container-custom max-w-4xl">
                {/* Breadcrumb */}
                <nav className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                    <Link href="/services" className="hover:text-primary-600">Services</Link>
                    <span className="mx-2">/</span>
                    <span>.NET Backend Development</span>
                </nav>

                {/* Header */}
                <div className="mb-12">
                    <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-semibold rounded-full mb-4">Backend Development</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        .NET Backend Development
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                        Production-grade REST APIs, background services, and data layers built with ASP.NET Core, C#, and Entity Framework.
                        Freelance developer based in Berlin — available for projects worldwide.
                    </p>
                </div>

                {/* What I build */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">What I Build</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { title: 'REST APIs', desc: 'Clean, documented ASP.NET Core APIs with Swagger/OpenAPI, proper error handling, and versioning.' },
                            { title: 'Authentication Systems', desc: 'JWT authentication, refresh token rotation, 2FA, and role-based access control (RBAC).' },
                            { title: 'Database Design', desc: 'Entity Framework Core with SQL Server or PostgreSQL — schema design, migrations, and query optimisation.' },
                            { title: 'Background Services', desc: '.NET hosted services for scheduled jobs, message queue consumers, and data sync workers.' },
                            { title: 'Third-Party Integrations', desc: 'Jira, Azure DevOps, SendGrid, Stripe, and other APIs integrated cleanly into your backend.' },
                            { title: 'Docker & CI/CD', desc: 'Containerised deployments with Docker Compose and automated pipelines via GitHub Actions.' },
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
                        {['ASP.NET Core 8/9', 'C# 12', 'Entity Framework Core', 'SQL Server', 'PostgreSQL', 'xUnit', 'Docker', 'GitHub Actions', 'Swagger/OpenAPI', 'JWT', 'SendGrid', 'Stripe'].map((tech) => (
                            <span key={tech} className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm rounded-lg font-medium">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Why hire me */}
                <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/30 rounded-2xl p-8 mb-12">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Why hire me for .NET backend work?</h2>
                    <ul className="space-y-3">
                        {[
                            '100% Job Success Score on Upwork — consistent delivery of backend systems that work reliably in production.',
                            'I write tests by default — past projects include 24 and 60-test suites with 98% code coverage.',
                            'Security is built in from the start: JWT refresh rotation, RBAC at the controller layer, input sanitisation.',
                            'I document APIs with Swagger/OpenAPI so your frontend team or future developers aren\'t guessing.',
                            'Experience with government-grade systems (Embassy of Kenya) and enterprise integrations (Jira + Azure DevOps).',
                        ].map((point) => (
                            <li key={point} className="flex gap-3 text-sm text-gray-700 dark:text-gray-300">
                                <span className="text-purple-500 flex-shrink-0 mt-0.5">→</span>
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
                            { title: 'FlowLenz Ticket Management', slug: 'flowlenz-ticket-management' },
                            { title: 'Embassy of Kenya Website', slug: 'embassy-of-kenya-website' },
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

                {/* CTA */}
                <div className="bg-gray-900 dark:bg-white rounded-2xl p-8 text-center">
                    <h2 className="text-2xl font-bold text-white dark:text-gray-900 mb-2">Need a .NET or C# backend developer?</h2>
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
