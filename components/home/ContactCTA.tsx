'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ContactCTA() {
    return (
        <section className="py-16 bg-white dark:bg-black transition-colors duration-200">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-white dark:bg-black border border-black/10 dark:border-white/40 rounded-2xl shadow-md overflow-hidden"
                >
                    <div className="px-6 py-12 md:p-12 text-center text-white">
                        {/* SEO IMPROVEMENT: Better CTA heading with keywords */}
                        <h2 className="text-3xl font-bold text-gray-600 dark:text-gray-300 mb-4">
                            Full-Stack Developer
                        </h2>
                        {/* SEO IMPROVEMENT: More specific, keyword-rich description */}
                        <p className="text-lg text-black dark:text-gray-300 max-w-2xl mx-auto opacity-90 mb-8">
                            Looking for a React, Next.js, or .NET developer for your project?
                            I'm available for freelance work in Berlin and across Europe.
                            Let's discuss your web development needs and build something amazing together.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href="/contact"
                                className="px-6 py-3 bg-white dark:bg-white text-black dark:text-black border border-black/20 dark:border-white/20 font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-100 transition duration-200"
                            >
                                Get in Touch
                            </Link>
                            <Link
                                href="/projects"
                                className="px-6 py-3 bg-transparent border border-black dark:border-white text-black dark:text-white font-medium rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition duration-200"
                            >
                                View Portfolio
                            </Link>
                        </div>

                        {/* SEO IMPROVEMENT: Add credibility indicators */}
                        <div className="mt-8 pt-6 border-t border-white/20 dark:border-white/20">
                            <p className="text-sm text-black dark:text-white opacity-75 mb-3">Trusted by clients worldwide</p>
                            <div className="flex justify-center text-black dark:text-white gap-6 text-sm">
                                <span>✓ 100% Job Success</span>
                                <span>✓ Top Rated</span>
                                <span>✓ Fast Response</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}