import { Metadata } from 'next';
import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/blog';
import BlogPageClient from './BlogPageClient';

const baseUrl = 'https://eliezerkibet.dev';

const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${baseUrl}/blog` },
    ],
};

export const metadata: Metadata = {
    title: 'Blog | Web Development Articles — React, Next.js, .NET, C#',
    description: 'Technical articles on React, Next.js, TypeScript, ASP.NET Core, C#, database design, and freelance web development. Written by a full-stack developer based in Berlin.',
    keywords: ['web development blog', 'React tutorials', 'Next.js articles', '.NET C# guide', 'ASP.NET Core', 'database performance', 'freelance developer blog', 'TypeScript', 'Eliezer Kibet'],
    alternates: {
        canonical: `${baseUrl}/blog`,
    },
    openGraph: {
        title: 'Blog | React, Next.js, .NET & C# Articles — Eliezer Kibet',
        description: 'Technical articles on full-stack web development, database design, security, and freelancing. Written by a Berlin-based developer.',
        url: `${baseUrl}/blog`,
        type: 'website',
        images: [{ url: `${baseUrl}/og-image.png`, width: 1200, height: 630, alt: 'Eliezer Kibet — Dev Blog' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Blog | React, Next.js, .NET & C# Articles',
        description: 'Technical articles on full-stack web development, database design, security, and freelancing.',
        images: [`${baseUrl}/og-image.png`],
    },
};

export default function BlogPage() {
    const posts = getAllBlogPosts();

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            {/* Hero */}
            <section className="relative bg-gradient-to-b from-white via-gray-50/30 to-white dark:from-gray-900 dark:via-gray-900/95 dark:to-gray-900 py-16 md:py-20">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-3xl mx-auto space-y-4 animate-fade-in">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
                            Blog
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                            Thoughts on full-stack development, building real-world software, and growing as a freelance developer.
                        </p>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
                            {posts.length} Articles
                        </div>
                    </div>
                </div>
            </section>

            {/* Posts — client component handles filtering, search, pagination */}
            <BlogPageClient posts={posts} />

            {/* CTA */}
            <section className="py-16 bg-gray-50 dark:bg-gray-800/30">
                <div className="container-custom text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Have a project in mind?
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Let's build something together.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 font-medium rounded-lg shadow-lg transition-all duration-200 hover:scale-105"
                    >
                        Get in Touch
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>
            </section>
        </div>
    );
}
