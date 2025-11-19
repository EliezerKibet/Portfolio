'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
    const typedTextRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!typedTextRef.current) return;

        const textElement = typedTextRef.current;
        const texts = ['Full-Stack Developer', 'React Specialist', 'Next.js Expert', 'TypeScript Enthusiast', '.NET Developer'];
        let currentTextIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function type() {
            const currentText = texts[currentTextIndex];

            if (isDeleting) {
                textElement.textContent = currentText.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                typingSpeed = 50;
            } else {
                textElement.textContent = currentText.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && currentCharIndex === currentText.length) {
                isDeleting = true;
                typingSpeed = 1500; // Pause before deleting
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentTextIndex = (currentTextIndex + 1) % texts.length;
                typingSpeed = 500; // Pause before typing next text
            }

            setTimeout(type, typingSpeed);
        }

        setTimeout(type, 1000); // Start typing after 1 second

        return () => {
            // Cleanup function
        };
    }, []);

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2,
                duration: 0.5,
            }
        })
    };

    return (
        <section className="pt-32 pb-24 md:pt-40 md:pb-32">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <motion.div
                            variants={fadeIn}
                            initial="hidden"
                            animate="visible"
                            custom={0}
                            className="space-y-6"
                        >
                            <h1 className="text-4xl md:text-5xl font-bold">
                                Hello, I'm a <br />
                                <span ref={typedTextRef} className="text-primary-600"></span>
                            </h1>

                            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg">
                                I build responsive, user-friendly web applications using modern technologies.
                                Specializing in React, Next.js, TypeScript and .NET to create seamless digital experiences.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="/projects"
                                    className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition duration-200 text-center"
                                >
                                    View My Work
                                </Link>
                                <Link
                                    href="/contact"
                                    className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 text-center"
                                >
                                    Contact Me
                                </Link>
                            </div>

                            <div className="flex items-center pt-4 space-x-4">
                                <p className="text-gray-500 dark:text-gray-400">Tech Stack:</p>
                                <div className="flex space-x-3">
                                    <span className="px-2 py-1 text-xs rounded-md bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">React</span>
                                    <span className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100">Next.js</span>
                                    <span className="px-2 py-1 text-xs rounded-md bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">TypeScript</span>
                                    <span className="px-2 py-1 text-xs rounded-md bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">.NET</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                    >
                        <div className="aspect-square rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 opacity-20 absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-4/5 h-4/5"></div>
                        <div className="relative z-10 bg-gray-100 dark:bg-gray-800 border-8 border-white dark:border-gray-700 rounded-3xl shadow-xl overflow-hidden aspect-[4/3]">
                            <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 text-gray-400 dark:text-gray-500">
                                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                                    <path d="M12 11v8"></path>
                                    <path d="M8 15l4-4 4 4"></path>
                                </svg>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}