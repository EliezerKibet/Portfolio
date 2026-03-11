import { Metadata } from 'next';
import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/blog';

export const metadata: Metadata = {
    title: 'Blog | Eliezer Kibet - Full-Stack Developer',
    description: 'Articles on full-stack web development, React, Next.js, .NET, freelancing, and building real-world software systems.',
    keywords: ['web development blog', 'React tutorials', 'Next.js', '.NET', 'freelance developer', 'software engineering', 'Eliezer Kibet'],
    alternates: {
        canonical: 'https://eliezerkibet.dev/blog',
    },
    openGraph: {
        title: 'Blog | Eliezer Kibet',
        description: 'Articles on full-stack web development, React, .NET, and freelancing.',
        url: 'https://eliezerkibet.dev/blog',
        type: 'website',
    },
};

export default function BlogPage() {
    const posts = getAllBlogPosts();

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            {/* Hero */}
            <section className="relative bg-gradient-to-b from-white via-gray-50/30 to-white dark:from-gray-900 dark:via-gray-900/95 dark:to-gray-900 py-16 md:py-20 lg:py-24">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-3xl mx-auto space-y-6 animate-fade-in">
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

            {/* Posts */}
            <section className="py-16 md:py-20">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto space-y-8">
                        {posts.map((post) => (
                            <article
                                key={post.id}
                                className="group border border-gray-200 dark:border-gray-700 rounded-xl p-6 md:p-8 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 hover:shadow-md"
                            >
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {post.tags.slice(0, 3).map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-medium rounded"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <Link href={`/blog/${post.slug}`}>
                                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors duration-200 mb-3">
                                        {post.title}
                                    </h2>
                                </Link>

                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                        <time dateTime={post.date}>
                                            {new Date(post.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </time>
                                        <span>·</span>
                                        <span>{post.readTime}</span>
                                    </div>

                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                                    >
                                        Read more
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

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
