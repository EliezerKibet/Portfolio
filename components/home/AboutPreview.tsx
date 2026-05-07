'use client';

import { motion } from 'framer-motion';

export default function AboutPreview() {
    return (
        <section className="relative z-10 py-16 bg-white dark:bg-black transition-colors duration-200">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-2xl space-y-6"
                >
                    <h2 className="text-3xl font-bold text-black dark:text-white">About</h2>

                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        Full-stack developer specialising in React, Next.js, TypeScript, .NET, and Node.js. I work across the full stack — from UI to database — with clean, lean code.
                    </p>

                </motion.div>
            </div>
        </section>
    );
}
