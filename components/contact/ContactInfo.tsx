'use client';

import { motion } from 'framer-motion';
import { track } from '@vercel/analytics';

export default function ContactInfo() {
    const contacts = [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            label: 'Email',
            value: 'elieserkibet@gmail.com',
            link: 'mailto:elieserkibet@gmail.com',
            eventName: 'email_click'
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            label: 'GitHub',
            value: 'github.com/EliezerKibet',
            link: 'https://github.com/EliezerKibet',
            eventName: 'github_click'
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            label: 'Upwork',
            value: 'upwork.com/EliezerKibet',
            link: 'https://www.upwork.com/freelancers/~0190e3e5eaf9b0fdb1?mp_source=share',
            eventName: 'upwork_click'
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            label: 'Location',
            value: 'Berlin, Germany',
            link: null,
            eventName: null
        }
    ];

    const handleContactClick = (eventName: string | null, label: string) => {
        if (eventName) {
            track(eventName, {
                location: 'contact_info_section',
                label: label
            });
        }
    };

    const handleSocialClick = (platform: string) => {
        track(`${platform}_social_click`, {
            location: 'connect_section'
        });
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700">
            {/* Book a call CTA */}
            <div className="mb-6 p-4 bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800/30 rounded-xl">
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Prefer to talk first?</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">Book a free 30-minute discovery call — no commitment.</p>
                <a
                    href="https://calendly.com/elieserkibet/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-lg transition-all duration-200 hover:scale-105 w-full justify-center"
                    onClick={() => track('calendly_click', { location: 'contact_info' })}
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Book a Discovery Call
                </a>
            </div>

            <div className="space-y-6">
                {contacts.map((contact, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-start"
                    >
                        <div className="flex-shrink-0 mr-4">
                            <div className="w-10 h-10 flex items-center justify-center bg-primary-100 dark:bg-primary-900 rounded-full text-primary-600 dark:text-primary-300">
                                {contact.icon}
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-gray-900 dark:text-gray-400">{contact.label}</p>
                            {contact.link ? (
                                <a
                                    href={contact.link}
                                    target={contact.link.startsWith('mailto:') ? undefined : '_blank'}
                                    rel="noopener noreferrer"
                                    className="text-lg font-medium hover:text-gray-400  text-gray-900 dark:text-gray-400 transition-colors"
                                    onClick={() => handleContactClick(contact.eventName, contact.label)}
                                >
                                    {contact.value}
                                </a>
                            ) : (
                                <p className="text-lg  hover:text-gray-400  text-gray-900 font-medium">{contact.value}</p>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium mb-4">Connect with me</h3>
                <div className="flex space-x-4">
                    <a
                        href="https://github.com/EliezerKibet"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-600 dark:hover:text-primary-300 transition-colors"
                        aria-label="GitHub"
                        onClick={() => handleSocialClick('github')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                    </a>
                    <a
                        href="https://www.linkedin.com/in/eliezer-kibet-80217a301/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-600 dark:hover:text-primary-300 transition-colors"
                        aria-label="LinkedIn"
                        onClick={() => handleSocialClick('linkedin')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
}