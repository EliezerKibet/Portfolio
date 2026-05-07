import { Metadata } from 'next';
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
        <div className="min-h-screen bg-white dark:bg-black">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <BlogPageClient posts={posts} />
        </div>
    );
}
