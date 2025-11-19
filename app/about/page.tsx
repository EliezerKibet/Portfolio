import EducationSection from '@/components/about/EducationSection';
import ExperienceTimeline from '@/components/about/ExperienceTimeline';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'About Me | Full-Stack Developer',
    description: 'Learn more about my journey as a full-stack developer, my experience, and my approach to building web applications',
};

export default function AboutPage() {
    return (
        <div className="container-custom section-padding animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-1 flex flex-col items-center lg:items-start">
                    <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-primary-500 mb-6">
                        <Image
                            src="/images/profile.jpg"
                            alt="Profile picture"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    <h1 className="text-2xl font-bold mb-4">Full-Stack Developer</h1>

                    <div className="space-y-4 text-center lg:text-left">
                        <p>Based in Berlin, DE</p>
                        <p>Freelance Full-Stack Developer</p>
                        <p>Upwork Rising Talent with 100% Job Success Score</p>

                        <div>
                            <a
                                href="https://github.com/EliezerKibet"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary inline-block"
                            >
                                GitHub Profile
                            </a>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <h2 className="mb-6">About Me</h2>

                    <div className="prose dark:prose-invert max-w-none mb-12">
                        <p>
                            I'm a passionate Full-Stack Developer with expertise in modern web technologies
                            including React, Next.js, TypeScript, and .NET. With a strong focus on building
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

                    <h2 className="mb-6">Professional Experience</h2>
                    <ExperienceTimeline />

                    <h2 className="mt-12 mb-6">Education & Certifications</h2>
                    <EducationSection />
                </div>
            </div>
        </div>
    );
}