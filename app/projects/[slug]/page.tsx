import { getAllProjects, getProjectBySlug } from '@/lib/projects';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ProjectPageClient from './ProjectPageClient';

const baseUrl = 'https://eliezerkibet.dev';

export async function generateStaticParams() {
    const projects = getAllProjects();
    return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
    { params }: { params: { slug: string } }
): Promise<Metadata> {
    const project = getProjectBySlug(params.slug);
    if (!project) return {};

    const ogImage = project.image.startsWith('/')
        ? `${baseUrl}${project.image}`
        : project.image;

    return {
        title: `${project.title} | Eliezer Kibet`,
        description: project.description,
        keywords: project.technologies.join(', '),
        alternates: {
            canonical: `${baseUrl}/projects/${project.slug}`,
        },
        openGraph: {
            title: project.title,
            description: project.description,
            url: `${baseUrl}/projects/${project.slug}`,
            siteName: 'Eliezer Kibet Portfolio',
            images: [{ url: ogImage, alt: project.title }],
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: project.title,
            description: project.description,
            images: [ogImage],
        },
    };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
    const project = getProjectBySlug(params.slug);
    if (!project) notFound();

    return <ProjectPageClient project={project!} />;
}
