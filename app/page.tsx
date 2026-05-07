import { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import ProjectsPreview from '@/components/home/ProjectsPreview';
import ContactSection from '@/components/home/ContactSection';

// SEO IMPROVEMENT: Much more detailed and keyword-rich metadata
export const metadata: Metadata = {
    title: 'Hire a Freelance React & .NET Developer | Berlin — Eliezer Kibet',
    description: 'Freelance full-stack developer based in Berlin. I build web applications for businesses using React, Next.js, TypeScript, and .NET. 100% Job Success. Responds within 24h.',
    keywords: [
        'freelance developer Berlin',
        'React developer Germany',
        'Next.js developer',
        'TypeScript developer',
        '.NET developer',
        'full-stack developer for hire',
        'web developer Berlin',
        'Eliezer Kibet',
        'freelance web development',
        'React freelancer Europe'
    ],
    openGraph: {
        title: 'Eliezer Kibet - Freelance Full-Stack Developer',
        description: 'Freelance full-stack developer in Berlin specializing in React, Next.js, TypeScript, and .NET. Available for hire.',
        type: 'website',
        locale: 'en_US',
        images: [{ url: 'https://eliezerkibet.dev/og-image.png', width: 1200, height: 630, alt: 'Eliezer Kibet — Full-Stack Developer' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Eliezer Kibet - Freelance Full-Stack Developer',
        description: 'Freelance developer in Berlin | React, Next.js, TypeScript, .NET | 100% Job Success',
        images: ['https://eliezerkibet.dev/og-image.png'],
    },
    alternates: {
        canonical: 'https://eliezerkibet.dev/',
    },
};

export default function Home() {
    return (
        <>
            {/* SEO IMPROVEMENT: Add structured data for better rich snippets */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'ProfilePage',
                        mainEntity: {
                            '@type': 'Person',
                            '@id': 'https://eliezerkibet.dev/#eliezer',
                            name: 'Eliezer Kibet',
                            alternateName: 'Eliezer',
                            jobTitle: 'Freelance Full-Stack Developer',
                            description: 'Freelance full-stack developer specializing in React, Next.js, TypeScript, and .NET',
                            url: 'https://eliezerkibet.dev/',
                            image: 'https://eliezerkibet.dev/profile/profile.jpeg',
                            address: {
                                '@type': 'PostalAddress',
                                addressLocality: 'Berlin',
                                addressCountry: 'DE'
                            },
                            areaServed: [
                                {
                                    "@type": "City",
                                    name: "Berlin"
                                },
                                {
                                    "@type": "Country",
                                    name: "Germany"
                                },
                                {
                                    "@type": "Continent",
                                    name: "Europe"
                                }
                            ],
                            email: 'elieserkibet@gmail.com',
                            worksFor: {
                                '@type': 'Organization',
                                name: 'Freelance'
                            },
                            hasOccupation: {
                                '@type': 'Occupation',
                                name: 'Full-Stack Developer',
                                occupationLocation: {
                                    '@type': 'City',
                                    name: 'Berlin'
                                },
                                skills: [
                                    'React',
                                    'Next.js',
                                    'TypeScript',
                                    '.NET',
                                    'Node.js',
                                    'PostgreSQL',
                                    'Web Development'
                                ]
                            },
                            serviceType: [
                                "Web Development",
                                "Full-Stack Development",
                                "React Development",
                                "Next.js Development"
                            ],
                            sameAs: [
                                'https://github.com/EliezerKibet',
                                'https://www.linkedin.com/in/eliezer-kibet-80217a301/',
                            ],
                            knowsAbout: [
                                'React Development',
                                'Next.js Development',
                                'TypeScript',
                                '.NET Development',
                                'Full-Stack Development',
                                'Web Development',
                                'API Development',
                                'Frontend Development',
                                'Backend Development',
                                'Database Development',
                                'MySQL database',
                                'PostgreSQL Database',
                            ]
                        }
                    })
                }}
            />

            <div className="animate-fade-in">
                <section id="hero"><Hero /></section>
                <section id="projects"><ProjectsPreview /></section>
                <ContactSection />
            </div>
        </>
    );
}