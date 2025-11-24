'use client';

import { useParams, notFound } from 'next/navigation';
import { getProjectBySlug } from '@/lib/projects';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github, Calendar, Tag } from 'lucide-react';

export default function ProjectPage() {
    const params = useParams();
    const slug = params?.slug as string;
    const project = getProjectBySlug(slug);

    if (!project) {
        notFound();
    }


    return (
        <div className="min-h-screen py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
            <div className="container-custom">
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Projects
                    </Link>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Project Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            {/* Tags */}
                            <div className="flex items-center gap-3 mb-4">
                                {project.featured && (
                                    <span className="px-3 py-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-xs font-semibold rounded-full shadow-lg">
                                        ⭐ Featured
                                    </span>
                                )}
                                <span className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                    <Calendar size={16} />
                                    {new Date(project.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 dark:from-white dark:via-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
                                {project.title}
                            </h1>

                            {/* Description */}
                            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                                {project.description}
                            </p>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-4 mt-8">
                                {project.demoUrl && (
                                    <a
                                        href={project.demoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                                    >
                                        <ExternalLink size={20} />
                                        View Live Demo
                                    </a>
                                )}
                                {project.githubUrl && (
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-300 dark:border-gray-700 hover:border-primary-600 dark:hover:border-primary-400 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                                    >
                                        <Github size={20} />
                                        View Source Code
                                    </a>
                                )}
                            </div>
                        </motion.div>

                        {/* Project Image */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700"
                        >
                            <div className="relative aspect-video w-full">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </motion.div>

                        {/* Key Features */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700"
                        >
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <div className="w-1 h-6 bg-gradient-to-b from-primary-500 to-primary-600 rounded-full" />
                                Key Features
                            </h2>
                            <ul className="space-y-4">
                                {project.features.map((feature, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                                        className="flex items-start gap-3 group"
                                    >
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-semibold text-sm group-hover:scale-110 transition-transform">
                                            ✓
                                        </span>
                                        <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                            {feature}
                                        </span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Challenges & Solutions */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="bg-gradient-to-br from-primary-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-8 border border-primary-100 dark:border-gray-700"
                        >
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <div className="w-1 h-6 bg-gradient-to-b from-primary-500 to-purple-600 rounded-full" />
                                Challenges & Solutions
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                                {project.challenges}
                            </p>
                        </motion.div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Technologies */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 sticky top-24"
                        >
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Tag size={20} className="text-primary-600 dark:text-primary-400" />
                                Technologies
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech, index) => (
                                    <motion.span
                                        key={tech}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                                        className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm font-medium hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-default"
                                    >
                                        {tech}
                                    </motion.span>
                                ))}
                            </div>

                            {/* Project Stats */}
                            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500 dark:text-gray-400">Status:</span>
                                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full font-semibold text-xs">
                                        Completed
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500 dark:text-gray-400">Tech Stack:</span>
                                    <span className="font-semibold">{project.technologies.length} technologies</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500 dark:text-gray-400">Features:</span>
                                    <span className="font-semibold">{project.features.length} key features</span>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>

                {/* Navigation to other projects */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-700"
                >
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                        View All Projects
                        <ArrowLeft size={20} className="rotate-180" />
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}