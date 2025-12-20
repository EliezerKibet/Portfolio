'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useScroll, useTransform, useSpring } from 'framer-motion';

export default function Hero() {
    const typedTextRef = useRef<HTMLSpanElement>(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3,
            }
        }
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 30,
            rotate: -2,
        },
        visible: {
            opacity: 1,
            y: 0,
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
            }
        }
    };
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 150]);
    const y2 = useTransform(scrollY, [0, 500], [0, 80]);

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
        <section className="pt-11 pb-14 md:pt-14 md:pb-20
        bg-white dark:bg-black transition-colors duration-200">
            <div className="container-custom">
                {/* Subtle grid background */}
                <div className="absolute inset-0 
                bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] 
                dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]
                bg-[size:24px_24px]" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="space-y-6"
                        >
                            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-black dark:text-white">
                                Hi, I'm Eliezer Kibet<br />
                                <span ref={typedTextRef} className="text-primary-600"></span>
                                <span className="block text-2xl md:text-3xl mt-2 text-gray-600 dark:text-gray-400">
                                    Based in Berlin, Germany
                                </span>
                            </motion.h1>

                            <motion.p variants={itemVariants} className="text-lg text-gray-600 dark:text-gray-300 max-w-lg">
                                Freelance full-stack developer specializing in React, Next.js, TypeScript, and .NET.
                                I create responsive, user-friendly web applications. Expect clean and well functioning applications tailored specifically to your requirements.
                            </motion.p>

                            {/* SEO IMPROVEMENT: Added "Available for Hire" badge */}
                            <motion.div variants={itemVariants} className="flex items-center gap-3 pt-2">

                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Available for projects
                                </span>
                            </motion.div>

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