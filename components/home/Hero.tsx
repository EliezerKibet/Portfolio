'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const stats = [
    { value: '20+', label: 'Projects Delivered' },
    { value: '4+', label: 'Years Experience' },
    { value: '100%', label: 'Job Success Rate' },
    { value: '24h', label: 'Response Time' },
];

export default function Hero() {
    const spotlightRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = spotlightRef.current;
        if (!section) return;

        const onMove = (e: MouseEvent) => {
            const rect = section.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            section.style.setProperty('--x', `${x}px`);
            section.style.setProperty('--y', `${y}px`);
        };

        section.addEventListener('mousemove', onMove);
        return () => section.removeEventListener('mousemove', onMove);
    }, []);

    return (
        <section
            ref={spotlightRef}
            className="hero-spotlight relative pt-24 pb-16 md:pt-36 md:pb-24 bg-white dark:bg-black transition-colors duration-200 overflow-hidden"
        >
            {/* Spotlight — only visible in dark mode via CSS class */}
            <div className="hero-spotlight-glow pointer-events-none absolute inset-0 transition-opacity duration-300" />
            <div className="container-custom relative z-10">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="visible"
                    className="space-y-4"
                >
                    <motion.h1
                        variants={item}
                        className="font-bold text-black dark:text-white leading-none tracking-tight"
                        style={{ fontSize: 'clamp(2rem, 4.5vw, 5rem)' }}
                    >
                        Full-Stack Developer
                    </motion.h1>

                    <motion.p
                        variants={item}
                        className="text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed"
                    >
                        Full-stack developer specialising in React, Next.js, TypeScript, .NET, and Node.js. I work across the full stack — from UI to database — with clean, lean code.
                    </motion.p>
                </motion.div>
            </div>

        </section>
    );
}
