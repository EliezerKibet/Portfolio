'use client';

import { motion } from 'framer-motion';

const steps = [
    { number: '01', title: 'Discovery',  desc: 'A call to align on requirements, timeline, and outcomes.' },
    { number: '02', title: 'Build',      desc: 'Weekly updates. You see progress as it happens.'          },
    { number: '03', title: 'Launch',     desc: 'Tested, deployed, handed over. Available post-launch.'    },
];

export default function HowWeWork() {
    return (
        <section className="relative z-10 py-16 bg-white dark:bg-black transition-colors duration-200">
            <div className="container-custom">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-bold text-black dark:text-white mb-10"
                >
                    How We Work
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100 dark:divide-white/10">
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            className="py-6 md:px-8 first:md:pl-0 last:md:pr-0 space-y-2"
                        >
                            <p className="text-xs text-gray-400 dark:text-gray-500 tracking-widest font-medium">{step.number}</p>
                            <p className="text-base font-semibold text-black dark:text-white">{step.title}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
