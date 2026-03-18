export type BlogPost = {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    dateModified?: string;
    tags: string[];
    readTime: string;
    image?: string;
};

// — Add new posts here — import the file, then add to the array below
import embassyBooking from './posts/how-i-built-appointment-booking-system-embassy';
import eventHub from './posts/building-eventhub-event-ticketing-platform';
import aiGarage from './posts/building-ai-garage-management-system';
import ecommerce from './posts/building-ecommerce-platform-aspnet-core';
import flowlenz from './posts/building-flowlenz-unified-ticket-aggregation-platform';
import freelanceCost from './posts/how-much-does-a-freelance-web-developer-cost-in-germany-2026';
import nextjsVsWordpress from './posts/nextjs-vs-wordpress-which-is-better-for-your-business-website';
import hireFreelancer from './posts/how-to-hire-a-freelance-developer-in-europe-clients-guide';
import lighthouseScores from './posts/why-lighthouse-scores-matter-before-your-website-goes-live';
import dotnetMigrations from './posts/dotnet-migrations-framework-to-modern-dotnet';

const blogPosts: BlogPost[] = [
    embassyBooking,
    eventHub,
    aiGarage,
    ecommerce,
    flowlenz,
    freelanceCost,
    nextjsVsWordpress,
    hireFreelancer,
    lighthouseScores,
    dotnetMigrations,
];

export function getAllBlogPosts(): BlogPost[] {
    return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
    return blogPosts.find((post) => post.slug === slug);
}
