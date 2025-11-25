'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

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
                typingSpeed = 1500;
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentTextIndex = (currentTextIndex + 1) % texts.length;
                typingSpeed = 500;
            }

            setTimeout(type, typingSpeed);
        }

        setTimeout(type, 1000);

        return () => { };
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
                {/* Subtle grid background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <motion.div
                            variants={fadeIn}
                            initial="hidden"
                            animate="visible"
                            custom={0}
                            className="space-y-6"
                        >
                            {/* SEO IMPROVEMENT: Better H1 with name and location */}
                            <h1 className="text-4xl md:text-5xl font-bold">
                                Hi, I'm Eliezer Kibet<br />
                                <span ref={typedTextRef} className="text-primary-600"></span>
                                <span className="block text-2xl md:text-3xl mt-2 text-gray-600 dark:text-gray-400">
                                    Based in Berlin, Germany
                                </span>
                            </h1>

                            {/* SEO IMPROVEMENT: More descriptive paragraph with keywords */}
                            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg">
                                Freelance full-stack developer specializing in React, Next.js, TypeScript, and .NET.
                                I create responsive, user-friendly web applications for clients across Europe.
                                100% Job Success Score on Upwork with 4+ years of experience.
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
                                    Hire Me
                                </Link>
                            </div>

                            {/* SEO IMPROVEMENT: Added "Available for Hire" badge */}
                            <div className="flex items-center gap-3 pt-2">
                                <span className="flex h-3 w-3 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Available for freelance projects
                                </span>
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
                        initial={{ opacity: 0, scale: 0.3 }}
                        animate={{ opacity: 1, scale: 0.6 }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                    >
                        <div className="aspect-square rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 opacity-20 absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-4/5 h-4/5"></div>
                        <div className="relative z-10 bg-gray-100 dark:bg-gray-800 border-8 border-white dark:border-gray-700 rounded-3xl shadow-xl overflow-hidden flex items-center justify-center">
                            <Image
                                src="/profile/profile.jpeg"
                                alt="Eliezer Kibet - Full Stack Developer in Berlin"
                                width={800}
                                height={800}
                                className="w-full h-full object-cover"
                                priority
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}