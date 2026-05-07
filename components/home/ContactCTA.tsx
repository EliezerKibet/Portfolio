'use client';

import { motion } from 'framer-motion';
import { track } from '@vercel/analytics';
import { FiGithub, FiLinkedin, FiMail, FiCalendar } from 'react-icons/fi';

export default function ContactCTA() {
    return (
        <section className="relative z-10 py-16 bg-white dark:bg-black transition-colors duration-200">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-2xl space-y-8"
                >
                    <h2 className="text-3xl font-bold text-black dark:text-white">Contact</h2>

                    <div className="flex items-center gap-5">
                        <a
                            href="mailto:elieserkibet@gmail.com"
                            onClick={() => track('email_click', { location: 'landing_contact' })}
                            aria-label="Email"
                            className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
                        >
                            <FiMail className="w-5 h-5" />
                        </a>

                        <a
                            href="https://www.linkedin.com/in/eliezer-kibet-80217a301/"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => track('linkedin_click', { location: 'landing_contact' })}
                            aria-label="LinkedIn"
                            className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
                        >
                            <FiLinkedin className="w-5 h-5" />
                        </a>

                        <a
                            href="https://github.com/EliezerKibet"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => track('github_click', { location: 'landing_contact' })}
                            aria-label="GitHub"
                            className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
                        >
                            <FiGithub className="w-5 h-5" />
                        </a>
                    </div>

                    <a
                        href="https://calendly.com/elieserkibet/30min"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => track('calendly_click', { location: 'landing_contact' })}
                        className="inline-flex items-center gap-1.5 px-4 py-2 border border-gray-200 dark:border-white/15 text-xs text-gray-600 dark:text-gray-400 rounded-lg hover:border-gray-400 dark:hover:border-white/40 hover:text-black dark:hover:text-white transition-colors duration-200"
                    >
                        <FiCalendar className="w-3.5 h-3.5" />
                        Book a 30-min call
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
