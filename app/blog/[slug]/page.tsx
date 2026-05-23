import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';

const baseUrl = 'https://eliezerkibet.dev';

export async function generateStaticParams() {
    const posts = getAllBlogPosts();
    return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
    { params }: { params: { slug: string } }
): Promise<Metadata> {
    const post = getBlogPostBySlug(params.slug);
    if (!post) return {};

    const ogImage = post.image
        ? `${baseUrl}${post.image}`
        : `${baseUrl}/og-image.png`;

    const metaDescription = post.excerpt.length > 155
        ? post.excerpt.slice(0, 152) + '...'
        : post.excerpt;

    return {
        title: `${post.title} | Eliezer Kibet`,
        description: metaDescription,
        keywords: post.tags,
        alternates: {
            canonical: `${baseUrl}/blog/${post.slug}`,
        },
        openGraph: {
            title: post.title,
            description: metaDescription,
            url: `${baseUrl}/blog/${post.slug}`,
            type: 'article',
            publishedTime: post.date,
            modifiedTime: post.dateModified ?? post.date,
            authors: ['Eliezer Kibet'],
            tags: post.tags,
            images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: metaDescription,
            images: [ogImage],
        },
    };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = getBlogPostBySlug(params.slug);
    if (!post) notFound();

    const allPosts = getAllBlogPosts();

    // Score posts by number of shared tags, fall back to recency
    const relatedPosts = allPosts
        .filter((p) => p.slug !== post!.slug)
        .map((p) => ({
            post: p,
            score: p.tags.filter((t) => post!.tags.includes(t)).length,
        }))
        .sort((a, b) => b.score - a.score || new Date(b.post.date).getTime() - new Date(a.post.date).getTime())
        .slice(0, 3)
        .map((r) => r.post);

    const ogImage = post!.image
        ? `${baseUrl}${post!.image}`
        : `${baseUrl}/og-image.png`;

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: `${baseUrl}/blog` },
            { '@type': 'ListItem', position: 3, name: post!.title, item: `${baseUrl}/blog/${post!.slug}` },
        ],
    };

    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post!.title,
        description: post!.excerpt,
        image: ogImage,
        author: {
            '@type': 'Person',
            name: 'Eliezer Kibet',
            url: `${baseUrl}/about`,
        },
        publisher: {
            '@type': 'Person',
            name: 'Eliezer Kibet',
            url: baseUrl,
        },
        datePublished: post!.date,
        dateModified: post!.dateModified ?? post!.date,
        url: `${baseUrl}/blog/${post!.slug}`,
        keywords: post!.tags.join(', '),
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${baseUrl}/blog/${post!.slug}`,
        },
    };

    return (
        <div className="relative z-10 bg-white dark:bg-black">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

            <div className="container-custom pt-16 pb-32">

                {/* Back */}
                <Link href="/blog"
                    className="inline-flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors duration-200 mb-12">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Blog
                </Link>

                {/* Header */}
                <div className="space-y-4 mb-12">
                    <p className="text-xs text-gray-400 dark:text-gray-500 tracking-widest uppercase">
                        {new Date(post!.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} · {post!.readTime}
                    </p>
                    <h1 className="text-3xl md:text-4xl font-bold text-black dark:text-white leading-tight">
                        {post!.title}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{post!.excerpt}</p>
                </div>

                {/* Content */}
                <div className="blog-content" dangerouslySetInnerHTML={{ __html: post!.content }} />

                {/* Share */}
                <div className="mt-16 pt-8 border-t border-gray-100 dark:border-white/10 flex items-center gap-3">
                    <span className="text-xs text-gray-400 dark:text-gray-500">Share</span>
                    <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${baseUrl}/blog/${post!.slug}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
                    >
                        LinkedIn →
                    </a>
                </div>

                {/* Related */}
                {relatedPosts.length > 0 && (
                    <div className="mt-16 space-y-4">
                        <h2 className="text-sm font-semibold text-black dark:text-white tracking-wide">Related</h2>
                        <div className="divide-y divide-gray-100 dark:divide-white/10">
                            {relatedPosts.map((p) => (
                                <Link key={p.id} href={`/blog/${p.slug}`}
                                    className="flex items-center justify-between gap-4 py-4 group hover:opacity-70 transition-opacity duration-200">
                                    <div>
                                        <p className="text-sm font-medium text-black dark:text-white leading-snug">{p.title}</p>
                                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{p.readTime}</p>
                                    </div>
                                    <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                                    </svg>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
