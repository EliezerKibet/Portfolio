'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AboutPreview() {
    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 items-center">


                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                    >
                        <h2 className="text-3xl font-bold">About Me</h2>

                        <div className="prose dark:prose-invert">
                            <p>
                                I'm a passionate Full-Stack Developer with expertise in modern web technologies
                                including React, Next.js, TypeScript, and .NET. With a focus on building
                                responsive, user-friendly web applications, I bring a problem-solving mindset
                                and attention to detail to every project.
                            </p>
                            <p>
                                My journey in software development has led me to work on diverse projects, from
                                complex enterprise integrations to fintech platforms and cybersecurity applications.
                                I take pride in writing clean, maintainable code and staying updated with the
                                latest industry trends and best practices.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-6 pt-2">
                            <div>
                                <p className="text-2xl font-bold text-primary-600">100%</p>
                                <p className="text-gray-600 dark:text-gray-300">Job Success Score</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-primary-600">4+</p>
                                <p className="text-gray-600 dark:text-gray-300">Years of Experience</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-primary-600">20+</p>
                                <p className="text-gray-600 dark:text-gray-300">Completed Projects</p>
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