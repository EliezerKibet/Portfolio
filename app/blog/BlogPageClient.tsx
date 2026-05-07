'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { BlogPost } from '@/lib/blog';
import { ArrowUpRight } from 'lucide-react';

const POSTS_PER_PAGE = 8;

function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BlogPageClient({ posts }: { posts: BlogPost[] }) {
    const [activeTag, setActiveTag] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    const allTags = useMemo(() => {
        const s = new Set<string>();
        posts.forEach((p) => p.tags.forEach((t) => s.add(t)));
        return Array.from(s).sort();
    }, [posts]);

    const filtered = useMemo(() => {
        let r = posts;
        if (activeTag) r = r.filter((p) => p.tags.includes(activeTag));
        if (search.trim()) {
            const q = search.toLowerCase();
            r = r.filter((p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q));
        }
        return r;
    }, [posts, activeTag, search]);

    const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
    const paginated = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

    return (
        <div className="relative z-10 bg-white dark:bg-black min-h-screen">
            <div className="container-custom pt-16 pb-32">

                <h1 className="text-3xl font-bold text-black dark:text-white mb-10">Blog</h1>

                {/* Search */}
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                    className="w-full max-w-sm px-4 py-2 text-sm bg-transparent border border-gray-200 dark:border-white/15 rounded-lg text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-gray-400 dark:focus:border-white/40 mb-6 transition-colors duration-200"
                />

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-10">
                    {allTags.map((tag) => (
                        <button
                            key={tag}
                            type="button"
                            onClick={() => { setActiveTag((p) => p === tag ? null : tag); setPage(1); }}
                            className={`px-3 py-1 text-xs rounded-full border transition-colors duration-150 ${
                                activeTag === tag
                                    ? 'border-black dark:border-white text-black dark:text-white'
                                    : 'border-gray-200 dark:border-white/15 text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-white/40'
                            }`}
                        >
                            {tag}
                        </button>
                    ))}
                    {activeTag && (
                        <button type="button" onClick={() => { setActiveTag(null); setPage(1); }}
                            className="px-3 py-1 text-xs text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors">
                            Clear
                        </button>
                    )}
                </div>

                {/* Post list */}
                {paginated.length > 0 ? (
                    <div className="divide-y divide-gray-100 dark:divide-white/10">
                        {paginated.map((post) => (
                            <Link key={post.id} href={`/blog/${post.slug}`} className="group flex items-start justify-between gap-6 py-6 hover:opacity-80 transition-opacity duration-200">
                                <div className="space-y-1 flex-1">
                                    <p className="text-xs text-gray-400 dark:text-gray-500 tracking-widest uppercase">
                                        {formatDate(post.date)} · {post.readTime}
                                    </p>
                                    <h2 className="text-base font-semibold text-black dark:text-white leading-snug">{post.title}</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">{post.excerpt}</p>
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-gray-400 dark:text-gray-500 shrink-0 mt-1 group-hover:text-black dark:group-hover:text-white transition-colors duration-200" />
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-400 dark:text-gray-500 py-12">No articles found.</p>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center gap-3 mt-12">
                        <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                            className="text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white disabled:opacity-30 transition-colors">
                            ← Prev
                        </button>
                        <span className="text-xs text-gray-400 dark:text-gray-500">{page} / {totalPages}</span>
                        <button type="button" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                            className="text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white disabled:opacity-30 transition-colors">
                            Next →
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}
