'use client';

import { Project } from '@/lib/projects';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { FiGithub } from 'react-icons/fi';

export default function ProjectPageClient({ project }: { project: Project }) {
    return (
        <div className="relative z-10 bg-white dark:bg-black pt-16 pb-32">
            <div className="container-custom">

                {/* Back */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-12"
                >
                    <Link
                        href="/#projects"
                        className="inline-flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors duration-200"
                    >
                        <ArrowLeft size={14} />
                        Projects
                    </Link>
                </motion.div>

                <div className="space-y-12">

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-4"
                    >
                        <p className="text-xs text-gray-400 dark:text-gray-500 tracking-widest uppercase">
                            {new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                        </p>

                        <h1 className="project-title font-bold text-black dark:text-white leading-tight tracking-tight">
                            {project.title}
                        </h1>

                        <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl">
                            {project.description}
                        </p>

                        {/* Links */}
                        <div className="flex items-center gap-4 pt-2">
                            {project.demoUrl && (
                                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-sm text-black dark:text-white border border-gray-300 dark:border-white/20 px-4 py-2 rounded-lg hover:border-black dark:hover:border-white transition-colors duration-200">
                                    <ExternalLink size={14} />
                                    View Site
                                </a>
                            )}
                            {project.githubUrl && (
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                                    className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
                                    aria-label="GitHub">
                                    <FiGithub size={18} />
                                </a>
                            )}
                        </div>
                    </motion.div>



                </div>
            </div>
        </div>
    );
}
