import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: {
        default: 'Eliezer Kibet - Full-Stack Developer | React, Next.js, TypeScript, .NET',
        template: '%s | Eliezer Kibet'
    },
    description: 'Freelance Full-Stack Developer in Berlin specializing in React, Next.js, TypeScript, and .NET. 100% Job Success Score on Upwork. Available for web development projects across Europe.',
    keywords: [
        'freelance web developer Berlin',
        'full-stack developer Germany',
        'React developer Berlin',
        'Next.js developer',
        'TypeScript developer',
        '.NET developer',
        'Node.js developer',
        'freelance developer Europe',
        'web development services',
        'Eliezer Kibet'
    ],
    authors: [{ name: 'Eliezer Kibet' }],
    creator: 'Eliezer Kibet',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://eliezerkibet.vercel.app/',
        siteName: 'Eliezer Kibet - Full-Stack Developer',
        title: 'Eliezer Kibet - Full-Stack Developer | React, Next.js, TypeScript, .NET',
        description: 'Freelance Full-Stack Developer in Berlin specializing in React, Next.js, TypeScript, and .NET. 100% Job Success Score on Upwork.',
        images: [
            {
                url: '/og-image.png', // Create this image (1200x630px recommended)
                width: 1200,
                height: 630,
                alt: 'Eliezer Kibet - Full-Stack Developer'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Eliezer Kibet - Full-Stack Developer',
        description: 'Freelance Full-Stack Developer in Berlin specializing in React, Next.js, TypeScript, and .NET',
        images: ['/og-image.png']
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: 'your-google-verification-code', // Add this after setting up Google Search Console
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="scroll-smooth">
            <head>
                <meta name="google-site-verification" content="5fnk1OjhtBhyhZgMMgs7e_1MsIiJBLEqYe5RFSixHS0" />

                {/* JSON-LD Schema for Person */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'Person',
                            name: 'Eliezer Kibet',
                            jobTitle: 'Full-Stack Developer',
                            url: 'https://eliezerkibet.vercel.app/',
                            address: {
                                '@type': 'PostalAddress',
                                addressLocality: 'Berlin',
                                addressCountry: 'Germany'
                            },
                            sameAs: [
                                'https://github.com/EliezerKibet',
                                'https://www.linkedin.com/in/eliezer-kibet-80217a301/',
                                'https://www.upwork.com/freelancers/~0190e3e5eaf9b0fdb1'
                            ],
                            knowsAbout: [
                                'React',
                                'Next.js',
                                'TypeScript',
                                '.NET',
                                'Node.js',
                                'Web Development',
                                'Full-Stack Development'
                            ]
                        })
                    }}
                />
            </head>
            <body className={inter.className}>
                <Analytics />
                <SpeedInsights />
                <Navbar />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}