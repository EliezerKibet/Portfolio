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

    return {
        title: `${post.title} | Eliezer Kibet`,
        description: post.excerpt,
        keywords: post.tags,
        alternates: {
            canonical: `${baseUrl}/blog/${post.slug}`,
        },
        openGraph: {
            title: post.title,
            description: post.excerpt,
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
            description: post.excerpt,
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
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            {/* Header */}
            <section className="relative bg-gradient-to-b from-white via-gray-50/30 to-white dark:from-gray-900 dark:via-gray-900/95 dark:to-gray-900 pt-24 pb-12 md:pt-32 md:pb-16">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
                <div className="container-custom relative z-10">
                    <div className="max-w-3xl mx-auto">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 transition-colors mb-6"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Blog
                        </Link>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {post!.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-medium rounded"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                            {post!.title}
                        </h1>

                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                            <span>Eliezer Kibet</span>
                            <span>·</span>
                            <time dateTime={post!.date}>
                                {new Date(post!.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </time>
                            <span>·</span>
                            <span>{post!.readTime}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-12 md:py-16">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto">
                        <div
                            className="blog-content"
                            dangerouslySetInnerHTML={{ __html: post!.content }}
                        />
                    </div>
                </div>
            </section>

            {/* Author card */}
            <section className="py-12 border-t border-gray-200 dark:border-gray-700">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto">
                        <div className="flex items-start gap-4 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                            <div className="flex-1">
                                <p className="font-bold text-gray-900 dark:text-white mb-1">Eliezer Kibet</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                                    Freelance Full-Stack Developer specializing in React, Next.js, TypeScript, and .NET. Building web applications, booking systems, fintech platforms, and cybersecurity tools.
                                </p>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                                >
                                    Work with me →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related posts */}
            {relatedPosts.length > 0 && (
                <section className="py-12 bg-gray-50 dark:bg-gray-800/30">
                    <div className="container-custom">
                        <div className="max-w-5xl mx-auto">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Related Articles</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">More on the same topics</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {relatedPosts.map((p) => (
                                    <Link
                                        key={p.id}
                                        href={`/blog/${p.slug}`}
                                        className="group flex flex-col p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-md transition-all duration-200"
                                    >
                                        <div className="flex flex-wrap gap-1.5 mb-3">
                                            {p.tags.slice(0, 2).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className={`px-2 py-0.5 text-xs font-medium rounded ${
                                                        post!.tags.includes(tag)
                                                            ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                                                    }`}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors text-sm leading-snug mb-2 flex-1">
                                            {p.title}
                                        </h3>

                                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 flex-1">
                                            {p.excerpt}
                                        </p>

                                        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700 mt-auto">
                                            <span className="text-xs text-gray-400 dark:text-gray-500">{p.readTime}</span>
                                            <span className="text-xs font-medium text-primary-600 group-hover:text-primary-700 transition-colors">
                                                Read →
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            <div className="text-center mt-8">
                                <Link
                                    href="/blog"
                                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                                >
                                    View all articles
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
