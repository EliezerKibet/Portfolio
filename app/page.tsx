import { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import ProjectsPreview from '@/components/home/ProjectsPreview';
import ContactSection from '@/components/home/ContactSection';

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

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'How much does it cost to hire a freelance web developer in Germany?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Freelance web developers in Germany typically charge between €60 and €150 per hour depending on experience and specialisation. For full-stack developers with React and .NET expertise, rates of €80–€120/hr are common. Project-based pricing is also available depending on scope.',
            },
        },
        {
            '@type': 'Question',
            name: 'Do you take on remote freelance projects outside Germany?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. I work fully remotely with clients across Europe and internationally. All communication, code reviews, and delivery happen asynchronously or via video call. Time zone is CET (Berlin).',
            },
        },
        {
            '@type': 'Question',
            name: 'What is your tech stack?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Frontend: React, Next.js, TypeScript, Tailwind CSS. Backend: ASP.NET Core, C#, .NET 8/9, Entity Framework Core. Databases: PostgreSQL, SQL Server. Deployment: Vercel, Azure, IIS on Windows Server.',
            },
        },
        {
            '@type': 'Question',
            name: 'How long does a web development project take?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'A typical landing page or small web app takes 2–4 weeks. A full-stack application with authentication, a database, and an admin dashboard takes 6–12 weeks depending on scope. I provide a timeline estimate after an initial scoping call.',
            },
        },
        {
            '@type': 'Question',
            name: 'Are you available for long-term contracts or employment?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. I am open to ongoing retainer contracts, part-time engagements, and full-time employment contracts. I am based in Berlin and can work on-site or remotely.',
            },
        },
    ],
};

export default function Home() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
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