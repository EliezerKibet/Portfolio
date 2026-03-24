'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { BlogPost } from '@/lib/blog';

const POSTS_PER_PAGE = 6;

function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

function FeaturedPost({ post }: { post: BlogPost }) {
    return (
        <article className="group relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 hover:shadow-lg mb-12">
            <div className="p-8 md:p-10">
                <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full">
                        Latest
                    </span>
                    {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-medium rounded">
                            {tag}
                        </span>
                    ))}
                </div>

                <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors duration-200 mb-4 leading-tight">
                        {post.title}
                    </h2>
                </Link>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-lg max-w-3xl">
                    {post.excerpt}
                </p>

                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                        <span>·</span>
                        <span>{post.readTime}</span>
                    </div>
                    <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-semibold rounded-lg hover:bg-gray-700 dark:hover:bg-gray-100 transition-all duration-200 hover:scale-105"
                    >
                        Read article
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </article>
    );
}

function PostCard({ post }: { post: BlogPost }) {
    return (
        <article className="group flex flex-col border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 hover:shadow-md h-full">
            <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-medium rounded">
                        {tag}
                    </span>
                ))}
            </div>

            <Link href={`/blog/${post.slug}`} className="flex-1">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors duration-200 mb-3 leading-snug">
                    {post.title}
                </h2>
            </Link>

            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 flex-1">
                {post.excerpt}
            </p>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span>·</span>
                    <span>{post.readTime}</span>
                </div>
                <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-medium text-primary-600 hover:text-primary-700 transition-colors"
                >
                    Read more
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </Link>
            </div>
        </article>
    );
}

export default function BlogPageClient({ posts }: { posts: BlogPost[] }) {
    const [activeTag, setActiveTag] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    const allTags = useMemo(() => {
        const tagSet = new Set<string>();
        posts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
        return Array.from(tagSet).sort();
    }, [posts]);

    const featuredPost = posts[0];
    const remainingPosts = posts.slice(1);

    const filtered = useMemo(() => {
        let result = remainingPosts;

        if (activeTag) {
            result = result.filter((p) => p.tags.includes(activeTag));
        }

        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter(
                (p) =>
                    p.title.toLowerCase().includes(q) ||
                    p.excerpt.toLowerCase().includes(q) ||
                    p.tags.some((t) => t.toLowerCase().includes(q))
            );
        }

        return result;
    }, [remainingPosts, activeTag, search]);

    const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
    const paginated = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

    const handleTagClick = (tag: string) => {
        setActiveTag(prev => prev === tag ? null : tag);
        setPage(1);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setPage(1);
    };

    return (
        <div className="container-custom py-12 md:py-16">

            {/* Featured post */}
            {!activeTag && !search && <FeaturedPost post={featuredPost} />}

            {/* Search + filters */}
            <div className="mb-8 space-y-4">
                <input
                    type="text"
                    placeholder="Search articles..."
                    value={search}
                    onChange={handleSearch}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 text-sm"
                />

                <div className="flex flex-wrap gap-2">
                    {allTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => handleTagClick(tag)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 ${
                                activeTag === tag
                                    ? 'bg-primary-600 text-white'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                        >
                            {tag}
                        </button>
                    ))}
                    {activeTag && (
                        <button
                            onClick={() => { setActiveTag(null); setPage(1); }}
                            className="px-3 py-1.5 rounded-full text-xs font-medium text-red-500 hover:text-red-600 transition-colors"
                        >
                            Clear filter
                        </button>
                    )}
                </div>
            </div>

            {/* Results count */}
            {(activeTag || search) && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
                    {activeTag && <> tagged <span className="font-medium text-gray-700 dark:text-gray-300">{activeTag}</span></>}
                    {search && <> matching <span className="font-medium text-gray-700 dark:text-gray-300">"{search}"</span></>}
                </p>
            )}

            {/* Post grid */}
            {paginated.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    {paginated.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 text-gray-500 dark:text-gray-400">
                    <p className="text-lg font-medium mb-2">No articles found</p>
                    <p className="text-sm">Try a different search or clear the filter.</p>
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                    <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                        Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <button
                            key={p}
                            onClick={() => setPage(p)}
                            className={`w-9 h-9 text-sm rounded-lg transition-all duration-150 ${
                                page === p
                                    ? 'bg-primary-600 text-white font-semibold'
                                    : 'border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-400'
                            }`}
                        >
                            {p}
                        </button>
                    ))}

                    <button
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="px-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
