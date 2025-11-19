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