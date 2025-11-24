import { Metadata } from 'next';
import ProjectsGrid from '@/components/projects/ProjectsGrid';
import { getAllProjects } from '@/lib/projects';

export const metadata: Metadata = {
    title: 'My Projects | Full-Stack Developer',
    description: 'Explore my portfolio of full-stack development projects using React, Next.js, TypeScript and .NET',
};

export default function ProjectsPage() {
    const projects = getAllProjects();

    return (
        <div className="container-custom section-padding animate-fade-in">
            {/* Subtle grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="text-center mb-12">
                <h1 className="mb-4">My Projects</h1>
                <p className="text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
                    Explore my portfolio of full-stack development projects, showcasing my expertise
                    in React, Next.js, TypeScript, .NET, and other modern technologies.
                </p>
            </div>

            <ProjectsGrid projects={projects} />
        </div>
    );
}