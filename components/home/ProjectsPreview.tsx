'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { getAllProjects } from '@/lib/projects';
import TiltCard from '@/components/ui/TiltCard';

export default function ProjectsPreview() {
    const projects = getAllProjects();

    return (
        <section className="py-11 bg-white dark:bg-black">
            <div className="container-custom">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-bold text-black dark:text-white mb-10"
                >
                    Featured Projects
                </motion.h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.08 }}
                        >
                        <Link href={`/projects/${project.slug}`} className="group block">
                        <TiltCard className="bg-gray-50 dark:bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-colors duration-300 relative z-10">
                            <div className="relative h-36 overflow-hidden">
                                <Image
                                    src={project.image || '/images/project-placeholder.jpg'}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-500 hover:scale-105"
                                />
                            </div>

                            <div className="p-3 flex items-center justify-between gap-2">
                                <h3 className="text-sm font-semibold text-black dark:text-white/90 leading-tight">{project.title}</h3>
                                <span className="w-7 h-7 rounded-full border border-gray-300 dark:border-white/20 flex items-center justify-center text-gray-500 dark:text-white/60 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors duration-200 shrink-0">
                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                </span>
                            </div>
                        </TiltCard>
                        </Link>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}