'use client';

import { getSkillsByCategory } from '@/lib/skills';
import { motion } from 'framer-motion';

export default function SkillsSectionMinimal() {
    const skillCategories = getSkillsByCategory();

    return (
        <section className="py-24 relative">
            {/* Subtle grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

            <div className="container-custom relative">
                {/* Minimal Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <h2 className="text-5xl md:text-6xl font-bold mb-4">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 dark:from-white dark:via-gray-200 dark:to-gray-400">
                            Technical Arsenal
                        </span>
                    </h2>
                    <div className="flex items-center gap-4">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
                        <p className="text-gray-500 dark:text-gray-400">Full-Stack Mastery</p>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
                    </div>
                </motion.div>

                {/* Skills in Compact Grid */}
                <div className="space-y-16">
                    {skillCategories.map((category, catIndex) => (
                        <motion.div
                            key={category.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                        >
                            {/* Category Title - Floating Style */}
                            <div className="flex items-center gap-4 mb-8">
                                <motion.div
                                    className={`px-6 py-3 rounded-full bg-gradient-to-r ${category.gradient} shadow-lg`}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <h3 className="text-lg font-bold text-white">
                                        {category.name}
                                    </h3>
                                </motion.div>
                                <div className="flex-1 h-px bg-gradient-to-r from-gray-300 dark:from-gray-700 to-transparent" />
                            </div>

                            {/* Compact Skills Grid */}
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
                                {category.skills.map((skill, index) => (
                                    <motion.div
                                        key={skill.name}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            delay: index * 0.05,
                                            type: "spring",
                                            stiffness: 100
                                        }}
                                        whileHover={{
                                            scale: 1.1,
                                            zIndex: 10
                                        }}
                                        className="group relative"
                                    >
                                        {/* Glassmorphism Card */}
                                        <div className="relative backdrop-blur-sm bg-white/60 dark:bg-gray-800/60 rounded-2xl p-4 border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                                            {/* Gradient overlay on hover */}
                                            <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                                            {/* Icon */}
                                            <div className="relative z-10 flex flex-col items-center">
                                                <div className={`w-10 h-10 rounded-xl ${skill.color} flex items-center justify-center text-white font-bold text-xs shadow-lg mb-2 group-hover:rotate-12 transition-transform duration-300`}>
                                                    {skill.name.slice(0, 2).toUpperCase()}
                                                </div>

                                                {/* Skill Name */}
                                                <p className="text-xs font-semibold text-center text-gray-800 dark:text-gray-200 line-clamp-2 min-h-[2rem]">
                                                    {skill.name}
                                                </p>

                                                {/* Level dots - more compact */}
                                                <div className="flex gap-0.5 mt-2">
                                                    {Array.from({ length: skill.level }).map((_, i) => (
                                                        <div
                                                            key={i}
                                                            className={`w-1 h-1 rounded-full ${skill.color}`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Shine effect on hover */}
                                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                        </div>

                                        {/* Tooltip */}
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-xl">
                                            {skill.name}
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                                                <div className="border-4 border-transparent border-t-gray-900 dark:border-t-white" />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Stats Footer - Sleek Design */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-20 relative"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-purple-500/10 to-pink-500/10 blur-3xl" />
                    <div className="relative backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-2xl">
                        <div className="flex flex-wrap justify-around gap-8">
                            <div className="text-center">
                                <div className="text-5xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent mb-2">
                                    {skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)}+
                                </div>
                                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                    Technologies
                                </div>
                            </div>

                            <div className="hidden sm:block w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent" />

                            <div className="text-center">
                                <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent mb-2">
                                    4+
                                </div>
                                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                    Years Exp
                                </div>
                            </div>

                            <div className="hidden sm:block w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent" />

                            <div className="text-center">
                                <div className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent mb-2">
                                    100%
                                </div>
                                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                    Success Rate
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}