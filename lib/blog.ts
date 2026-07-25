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
import baseEntitiesControllers from './posts/base-entities-and-base-controllers-csharp-dotnet';
import reusableComponents from './posts/building-reusable-components-nextjs';
import jwtAuthentication from './posts/jwt-authentication-csharp-dotnet-security';
import hcaptchaForms from './posts/hcaptcha-protect-contact-forms-email-services';
import apiKeySecurity from './posts/api-keys-environment-variables-security';
import swaggerUnitTesting from './posts/swagger-unit-testing-bearer-token-csharp-dotnet';
import databaseIndexing from './posts/database-indexing-postgresql-mysql-query-performance';
import databaseConfig from './posts/database-context-configuration-security-scalability-performance';
import twoFactorAuth from './posts/2fa-qr-code-totp-aspnetcore-csharp';
import multiUserRoles from './posts/multi-user-role-authorization-enums-aspnetcore';
import tailwindVsGlobalCss from './posts/tailwind-css-vs-global-css-scalability-maintenance';
import dataInLibFolder from './posts/data-in-lib-folder-vs-components-nextjs-react';
import serverManagement from './posts/organised-server-management-rdp-iis-github-staging';
import rcsiBlocking from './posts/rcsi-sql-server-blocking-read-committed-snapshot';
import sqlVideoCleanup from './posts/sql-video-cleanup-property-listing-xml-database';
import awsDedicatedMigration from './posts/aws-to-dedicated-server-migration-windows-registry-keys';
import twilioPostman from './posts/testing-twilio-api-postman-without-us-phone-number';
import rapidApiMigration from './posts/rapidapi-property-listing-migration-quota-fix';
import reactNativeComponents from './posts/reusable-components-react-native-typescript';
import localDevBeforeShipping from './posts/local-development-visual-studio-before-shipping-live-server';
import dllLoadBalancerSsl from './posts/dll-deployment-failed-ssl-certificate-load-balancer';
import domainMigrationTucowsRoute53 from './posts/domain-migration-tucows-to-aws-route-53-ssl-padlock';

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
    baseEntitiesControllers,
    reusableComponents,
    jwtAuthentication,
    hcaptchaForms,
    apiKeySecurity,
    swaggerUnitTesting,
    databaseIndexing,
    databaseConfig,
    twoFactorAuth,
    multiUserRoles,
    tailwindVsGlobalCss,
    dataInLibFolder,
    serverManagement,
    rcsiBlocking,
    sqlVideoCleanup,
    awsDedicatedMigration,
    twilioPostman,
    rapidApiMigration,
    reactNativeComponents,
    localDevBeforeShipping,
    dllLoadBalancerSsl,
    domainMigrationTucowsRoute53,
];

export function getAllBlogPosts(): BlogPost[] {
    return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
    return blogPosts.find((post) => post.slug === slug);
}
