'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AboutPreview() {
    return (
        <section className="py-16 bg-white dark:bg-black transition-colors duration-200">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                    >
                        {/* SEO IMPROVEMENT: Better heading with context */}
                        <h2 className="text-3xl text-black dark:text-white/90 font-bold">
                            About Eliezer Kibet - Freelance Developer
                        </h2>

                        {/* SEO IMPROVEMENT: More keyword-rich content */}
                        <div className="prose dark:prose-invert text-black dark:text-white/90 max-w-none">
                            <p>
                                I'm a freelance full-stack developer based in Berlin, Germany, with expertise in modern web technologies
                                including React, Next.js, TypeScript, and .NET. With a focus on building
                                responsive, user-friendly web applications, I bring a problem-solving mindset
                                and attention to detail to every project.
                            </p>
                            <p>
                                My 4+ years of software development experience includes working on diverse projects - from
                                complex enterprise integrations and embassy websites to fintech platforms and cybersecurity applications.
                                As a Top Rated on Upwork with a 100% Job Success Score, I specialize in delivering
                                high-quality code and meeting tight deadlines for clients across Europe.
                            </p>
                            <p>
                                I'm currently accepting new freelance projects and contract work. Whether you need a full-stack developer
                                for React development, Next.js applications, .NET backend systems, or API integrations, I'm here to help
                                bring your ideas to life.
                            </p>
                        </div>

                        {/* Stats with better context */}
                        <div className="flex flex-wrap gap-6 pt-2">
                            <div>
                                <p className="text-2xl font-bold text-primary-600">100%</p>
                                <p className="text-gray-600 dark:text-gray-300">Job Success Score</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Upwork</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-primary-600">4+</p>
                                <p className="text-gray-600 dark:text-gray-300">Years Experience</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Full-Stack Dev</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-primary-600">20+</p>
                                <p className="text-gray-600 dark:text-gray-300">Completed Projects</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Satisfied Clients</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-primary-600">$4,000+</p>
                                <p className="text-gray-600 dark:text-gray-300">Earned on Upwork</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Top Rated</p>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Link
                                href="/about"
                                className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition duration-200 inline-block"
                            >
                                More About Me
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}