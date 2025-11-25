import { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import ProjectsPreview from '@/components/home/ProjectsPreview';
import SkillsSection from '@/components/home/SkillsSection';
import AboutPreview from '@/components/home/AboutPreview';
import ContactCTA from '@/components/home/ContactCTA';

// SEO IMPROVEMENT: Much more detailed and keyword-rich metadata
export const metadata: Metadata = {
    title: 'Eliezer Kibet - Freelance Full-Stack Developer | React, Next.js, TypeScript, .NET',
    description: 'Freelance full-stack developer in Berlin, Germany. Specializing in React, Next.js, TypeScript, and .NET development. 100% Job Success Score on Upwork. Available for web development projects across Europe.',
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
        images: ['/og-image.png'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Eliezer Kibet - Freelance Full-Stack Developer',
        description: 'Freelance developer in Berlin | React, Next.js, TypeScript, .NET | 100% Job Success',
    },
    alternates: {
        canonical: 'https://eliezerkibet.vercel.app/',
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
                            '@id': 'https://eliezerkibet.vercel.app/#eliezer',
                            name: 'Eliezer Kibet',
                            alternateName: 'Eliezer',
                            jobTitle: 'Freelance Full-Stack Developer',
                            description: 'Freelance full-stack developer specializing in React, Next.js, TypeScript, and .NET',
                            url: 'https://eliezerkibet.vercel.app/',
                            image: 'https://eliezerkibet.vercel.app//profile/profile.jpeg',
                            address: {
                                '@type': 'PostalAddress',
                                addressLocality: 'Berlin',
                                addressCountry: 'Germany'
                            },
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
                            sameAs: [
                                'https://github.com/EliezerKibet',
                                'https://www.linkedin.com/in/eliezer-kibet-80217a301/',
                                'https://www.upwork.com/freelancers/~0190e3e5eaf9b0fdb1'
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
                                'Backend Development'
                            ]
                        }
                    })
                }}
            />

            <div className="animate-fade-in">
                <Hero />
                <ProjectsPreview />
                <SkillsSection />
                <AboutPreview />
                <ContactCTA />
            </div>
        </>
    );
}