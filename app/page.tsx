import { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import ProjectsPreview from '@/components/home/ProjectsPreview';
import SkillsSection from '@/components/home/SkillsSection';
import AboutPreview from '@/components/home/AboutPreview';
import ContactCTA from '@/components/home/ContactCTA';

export const metadata: Metadata = {
    title: 'Full-Stack Developer | Home',
    description: 'Professional portfolio showcasing my work as a full-stack developer specialized in React, Next.js, TypeScript and .NET',
};

export default function Home() {
    return (
        <div className="animate-fade-in">
            <Hero />
            <ProjectsPreview />
            <SkillsSection />
            <AboutPreview />
            <ContactCTA />
        </div>
    );
}