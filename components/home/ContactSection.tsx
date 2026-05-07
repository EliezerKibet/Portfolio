'use client';

import { motion } from 'framer-motion';
import { FiMail, FiLinkedin } from 'react-icons/fi';

export default function ContactSection() {
    return (
        <section id="contact" className="relative z-10 bg-white dark:bg-black border-t border-gray-100 dark:border-white/10">
            <div className="container-custom py-24 md:py-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row md:items-end md:justify-between gap-10"
                >
                    <div className="space-y-4 max-w-lg">
                        <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white leading-tight tracking-tight">
                            Have a question or want to work together?
                        </h2>

                    </div>

                    <div className="flex flex-col gap-3 shrink-0">
                        <a
                            href="mailto:elieserkibet@gmail.com"
                            className="inline-flex items-center gap-2 text-sm font-medium text-black dark:text-white border border-gray-300 dark:border-white/20 px-5 py-3 rounded-lg hover:border-black dark:hover:border-white transition-colors duration-200"
                        >
                            <FiMail className="w-4 h-4" />
                            elieserkibet@gmail.com
                        </a>
                        <a
                            href="https://www.linkedin.com/in/eliezer-kibet-80217a301/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200 px-5 py-2"
                        >
                            <FiLinkedin className="w-4 h-4" />
                            LinkedIn
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
