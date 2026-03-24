import EducationSection from '@/components/about/EducationSection';
import ExperienceTimeline from '@/components/about/ExperienceTimeline';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'About Eliezer Kibet | Full-Stack Developer',
    description: 'Eliezer Kibet is a freelance full-stack developer based in Berlin, Germany, specializing in React, Next.js, TypeScript, and .NET. Building web apps, booking systems, fintech platforms, and cybersecurity tools for clients across Europe.',
    keywords: ['Eliezer Kibet', 'full-stack developer Berlin', 'React developer Berlin', 'Next.js developer Germany', '.NET developer Berlin', 'freelance developer Berlin', 'web developer Germany'],
    alternates: {
        canonical: 'https://eliezerkibet.dev/about',
    },
    openGraph: {
        title: 'About Eliezer Kibet | Full-Stack Developer',
        description: 'Freelance full-stack developer specializing in React, Next.js, TypeScript, and .NET. Available for hire.',
        url: 'https://eliezerkibet.dev/about',
        type: 'profile',
    },
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            {/* Hero Section with Image */}
            <section className="relative bg-gradient-to-b from-white via-gray-50/30 to-white dark:from-gray-900 dark:via-gray-900/95 dark:to-gray-900 py-16 md:py-20 lg:py-24">
                {/* Subtle grid background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />

                <div className="container-custom relative z-10 animate-fade-in">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Left Column - Profile */}
                        <div className="lg:col-span-1 flex flex-col items-center lg:items-start">
                            <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-gray-900 dark:border-white mb-6 shadow-xl">
                                <Image
                                    src="/profile/profile.jpg"
                                    alt="Eliezer Kibet - Full-Stack Developer"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                                Full-Stack Developer
                            </h1>

                            <div className="space-y-4 text-center lg:text-left text-gray-600 dark:text-gray-300">
                                <p className="flex items-center justify-center lg:justify-start gap-2">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Based in Berlin, DE
                                </p>
                                <p className="flex items-center justify-center lg:justify-start gap-2">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Freelance Full-Stack Developer
                                </p>
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    100% Job Success Score
                                </div>

                                <div className="pt-4">
                                    <a
                                        href="https://github.com/EliezerKibet"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 font-medium rounded-lg shadow-lg transition-all duration-200 hover:scale-105"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                        </svg>
                                        GitHub Profile
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - About Content */}
                        <div className="lg:col-span-2">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                                About Me
                            </h2>

                            <div className="prose dark:prose-invert max-w-none space-y-6 text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed">
                                <p>
                                    I'm a passionate Full-Stack Developer with expertise in modern web technologies
                                    including React, Next.js, TypeScript, Node.js and .NET. With a strong focus on building
                                    responsive, user-friendly web applications, I bring a problem-solving mindset
                                    and attention to detail to every project.
                                </p>
                                <p>
                                    My journey in software development has led me to work on diverse projects, from
                                    complex enterprise integrations like Jira and Azure DevOps API scrapers to fintech
                                    platforms and cybersecurity applications. I take pride in writing clean, maintainable
                                    code and staying updated with the latest industry trends and best practices.
                                </p>
                                <p>
                                    When I'm not coding, I enjoy exploring new technologies, contributing to open-source
                                    projects, and continuously expanding my skill set to deliver better solutions for my clients.
                                </p>
                            </div>

                            {/* Skills Highlight 
                            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
                                {[
                                    'React & Next.js',
                                    'TypeScript',
                                    '.NET & C#',
                                    'Node.js',
                                    'PostgreSQL',
                                    'RESTful APIs',
                                    'Docker',
                                    'Git & GitHub',
                                    'Agile/Scrum'
                                ].map((skill) => (
                                    <div
                                        key={skill}
                                        className="px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                                    >
                                        {skill}
                                    </div>
                                ))}
                            </div>*/}
                        </div>
                    </div>
                </div>
            </section>

            {/* Optional: Uncomment if you want to add experience/education sections
            <section className="bg-gray-50 dark:bg-black py-16 md:py-20">
                <div className="container-custom">
                    <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Professional Experience</h2>
                    <ExperienceTimeline />
                </div>
            </section>

            <section className="bg-white dark:bg-gray-900 py-16 md:py-20">
                <div className="container-custom">
                    <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Education & Certifications</h2>
                    <EducationSection />
                </div>
            </section>
            */}
        </div>
    );
}