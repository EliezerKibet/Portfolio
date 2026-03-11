import { Metadata } from 'next';
import ProjectsGrid from '@/components/projects/ProjectsGrid';
import { getAllProjects } from '@/lib/projects';

export const metadata: Metadata = {
    title: 'Projects | Eliezer Kibet - Full-Stack Developer Portfolio',
    description: 'Full-stack web development projects by Eliezer Kibet — booking systems, event platforms, e-commerce, AI tools, and enterprise dashboards built with React, Next.js, TypeScript, C#, and .NET.',
    keywords: ['full-stack developer portfolio', 'React projects', 'Next.js portfolio', '.NET projects', 'web development portfolio', 'Eliezer Kibet projects'],
    alternates: {
        canonical: 'https://eliezerkibet.dev/projects',
    },
    openGraph: {
        title: 'Projects | Eliezer Kibet - Full-Stack Developer',
        description: 'Booking systems, event platforms, e-commerce, and enterprise tools. Built with React, Next.js, and .NET.',
        url: 'https://eliezerkibet.dev/projects',
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'Projects | Eliezer Kibet - Full-Stack Developer',
        description: 'Booking systems, event platforms, e-commerce, and enterprise tools. Built with React, Next.js, and .NET.',
    },
};

export default function ProjectsPage() {
    const projects = getAllProjects();

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            {/* Hero Section - Pure White/Gray gradient (no blue) */}
            <section className="relative bg-gradient-to-b from-white via-gray-50/30 to-white dark:from-gray-900 dark:via-gray-900/95 dark:to-gray-900 py-16 md:py-20 lg:py-24">
                {/* Subtle grid background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />

                <div className="container-custom relative z-10">
                    <div className="text-center max-w-3xl mx-auto space-y-6 animate-fade-in">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
                            My Projects
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                            Explore my portfolio of full-stack development projects, showcasing my expertise
                            in React, Next.js, TypeScript, .NET, and other modern technologies.
                        </p>

                        {/* Optional: Project count badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
                            <span className="flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-600 dark:bg-gray-400"></span>
                            </span>
                            {projects.length} Projects & Counting
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Grid with Alternating Backgrounds */}
            <ProjectsGrid projects={projects} />

            {/* CTA Section - Pure White/Gray (no blue) */}
            <section className="relative bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-900 py-16 md:py-20 lg:py-24">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center space-y-6">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
                            Ready to Build Something Amazing?
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
                            Let's discuss how I can help bring your ideas to life with modern web technologies.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 pt-6">
                            <a
                                href="/contact"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 font-medium rounded-lg shadow-lg transition-all duration-200 hover:scale-105"
                            >
                                Get in Touch
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>
                            <a
                                href="https://github.com/EliezerKibet"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-gray-900 dark:border-white hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 text-gray-900 dark:text-white font-medium rounded-lg transition-all duration-200 hover:scale-105"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                                View GitHub
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}