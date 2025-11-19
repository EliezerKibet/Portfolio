'use client';

import { getSkillsByCategory } from '@/lib/skills';
import { motion } from 'framer-motion';

export default function SkillsSection() {
    const skillCategories = getSkillsByCategory();

    return (
        <section className="py-16">
            <div className="container-custom">
                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl font-bold mb-4"
                    >
                        Technical Skills
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
                    >
                        My expertise covers a wide range of technologies in both frontend and backend development.
                    </motion.p>
                </div>

                <div className="space-y-12">
                    {skillCategories.map((category, catIndex) => (
                        <motion.div
                            key={category.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700"
                        >
                            <h3 className="text-xl font-bold mb-6 text-primary-600">{category.name}</h3>

                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                {category.skills.map((skill) => (
                                    <motion.div
                                        key={skill.name}
                                        whileHover={{ y: -5 }}
                                        className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center"
                                    >
                                        <div className="mb-3 h-12 flex items-center justify-center">
                                            <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-300">
                                                <span className="text-sm font-medium">{skill.name.slice(0, 2)}</span>
                                            </div>
                                        </div>
                                        <p className="font-medium">{skill.name}</p>

                                        <div className="mt-2 flex justify-center">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`w-2 h-2 rounded-full mx-0.5 ${i < skill.level
                                                        ? 'bg-primary-500'
                                                        : 'bg-gray-200 dark:bg-gray-600'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}