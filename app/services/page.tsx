import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Services | Freelance Web Development — React, Next.js, .NET',
    description: 'Freelance web development services by Eliezer Kibet. React & Next.js frontend development, .NET backend APIs, and full-stack web applications. Based in Berlin, available worldwide.',
    keywords: ['freelance web development services', 'hire React developer', 'Next.js development service', '.NET backend developer', 'full-stack web developer Berlin'],
    alternates: {
        canonical: 'https://eliezerkibet.dev/services',
    },
    openGraph: {
        title: 'Web Development Services | Eliezer Kibet',
        description: 'Freelance React, Next.js, and .NET development services. Available for projects in Europe and worldwide.',
        url: 'https://eliezerkibet.dev/services',
        type: 'website',
    },
};

const services = [
    {
        slug: 'react-nextjs-development',
        title: 'React & Next.js Development',
        tagline: 'Fast, SEO-friendly web apps built with the modern React stack.',
        description: 'From landing pages to complex dashboards — I build performant, accessible React and Next.js applications with TypeScript and Tailwind CSS.',
        features: [
            'Server-side rendering & static generation',
            'TypeScript for type-safe, maintainable code',
            'Responsive, mobile-first UI design',
            'API routes & full-stack Next.js apps',
            'Animation with Framer Motion',
            'SEO-optimised page structure',
        ],
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
        ),
        color: 'blue',
    },
    {
        slug: 'dotnet-backend',
        title: '.NET Backend Development',
        tagline: 'Robust, secure APIs and backend systems built with C# and .NET.',
        description: 'I build production-grade REST APIs, background services, and data layers using ASP.NET Core, Entity Framework, and SQL Server or PostgreSQL.',
        features: [
            'ASP.NET Core Web API development',
            'Entity Framework Core & database design',
            'JWT authentication & role-based access',
            'Third-party API integrations',
            'Docker containerisation',
            'CI/CD with GitHub Actions',
        ],
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
            </svg>
        ),
        color: 'purple',
    },
    {
        slug: 'fullstack-web-development',
        title: 'Full-Stack Web Development',
        tagline: 'End-to-end web applications — frontend, backend, database, and deployment.',
        description: 'I take projects from requirements to live deployment. React or Next.js on the frontend, .NET or Node.js on the backend, PostgreSQL or SQL Server for data.',
        features: [
            'Full project ownership from spec to launch',
            'React/Next.js + .NET or Node.js stack',
            'Database design & optimisation',
            'Booking systems, dashboards, platforms',
            'Stripe & payment gateway integration',
            'Vercel, Azure, or AWS deployment',
        ],
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
        color: 'green',
    },
];

const colorMap: Record<string, string> = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-800/30',
    purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-800/30',
    green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-100 dark:border-green-800/30',
};

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 py-16 md:py-24">
            <div className="container-custom">
                {/* Header */}
                <div className="max-w-2xl mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Web Development Services
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Freelance development services for startups, agencies, and businesses across Europe and worldwide.
                        Verified track record delivering projects for startups, agencies, and businesses across Europe.
                    </p>
                    <div className="flex flex-wrap gap-3 mt-6">
                        <Link
                            href="/contact"
                            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow transition-all duration-200 hover:scale-105"
                        >
                            Get a Free Quote
                        </Link>
                        <Link
                            href="/projects"
                            className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-semibold rounded-lg hover:border-primary-500 transition-colors"
                        >
                            See Past Work
                        </Link>
                    </div>
                </div>

                {/* Service Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {services.map((service) => (
                        <div
                            key={service.slug}
                            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow p-8 flex flex-col"
                        >
                            <div className={`w-14 h-14 rounded-xl border flex items-center justify-center mb-5 ${colorMap[service.color]}`}>
                                {service.icon}
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{service.title}</h2>
                            <p className="text-sm font-medium text-primary-600 dark:text-primary-400 mb-3">{service.tagline}</p>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-5 flex-1">{service.description}</p>
                            <ul className="space-y-2 mb-6">
                                {service.features.map((f) => (
                                    <li key={f} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                        <span className="text-green-500 mt-0.5">✓</span>
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href={`/services/${service.slug}`}
                                className="block text-center px-4 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-medium rounded-lg hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm"
                            >
                                Learn More
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Location Pages */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Based in Germany</h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">Looking for a developer local to your region? These pages cover location-specific details, rates, and availability.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { href: '/services/freelance-developer-berlin', title: 'Freelance Developer Berlin', desc: 'Projects in Berlin — remote or on-site. CET/CEST time zone, GDPR-aware, English-speaking.' },
                            { href: '/services/freelance-developer-germany', desc: 'Available for projects across Germany. Same time zone, no contractor complexity.', title: 'Freelance Developer Germany' },
                        ].map(({ href, title, desc }) => (
                            <Link key={href} href={href} className="flex flex-col p-5 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-primary-500 transition-colors group">
                                <p className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-1">{title} →</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* How I Work */}
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8 md:p-12 mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">How I Work</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { step: '01', title: 'Discovery Call', desc: 'We talk through your requirements, timeline, and goals — free, no commitment.' },
                            { step: '02', title: 'Proposal', desc: 'I send a clear scope, timeline, and fixed price or hourly estimate within 24 hours.' },
                            { step: '03', title: 'Development', desc: 'Regular updates throughout. You see progress, not just a finished product at the end.' },
                            { step: '04', title: 'Delivery', desc: 'Clean handover with documentation. I stay available for questions after delivery.' },
                        ].map(({ step, title, desc }) => (
                            <div key={step}>
                                <span className="text-3xl font-bold text-primary-200 dark:text-primary-800">{step}</span>
                                <h3 className="font-semibold text-gray-900 dark:text-white mt-1 mb-2">{title}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Ready to start your project?</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">Get in touch and I'll respond within 24 hours.</p>
                    <Link
                        href="/contact"
                        className="inline-block px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 hover:scale-105"
                    >
                        Start a Project
                    </Link>
                </div>
            </div>
        </div>
    );
}
