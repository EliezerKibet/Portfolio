'use client';

import { getSkillsByCategory } from '@/lib/skills';
import { motion } from 'framer-motion';
import {
    SiReact,
    SiNextdotjs,
    SiTypescript,
    SiJavascript,
    SiHtml5,
    SiCss3,
    SiTailwindcss,
    SiFramer,
    SiRedux,
    SiDotnet,
    SiCsharp,
    SiNodedotjs,
    SiExpress,
    SiGraphql,
    SiPostgresql,
    SiMongodb,
    SiMicrosoftsqlserver,
    SiRedis,
    SiDocker,
    SiGit,
    SiAzuredevops,
    SiMicrosoftazure,
    SiAmazonaws,
    SiVisualstudiocode,
    SiFigma,
    SiJira,
    SiPostman,
} from 'react-icons/si';
import { IconType } from 'react-icons';

// Map skill names to their icons
const iconMap: { [key: string]: IconType } = {
    'React': SiReact,
    'Next.js': SiNextdotjs,
    'TypeScript': SiTypescript,
    'JavaScript': SiJavascript,
    'HTML5': SiHtml5,
    'CSS3': SiCss3,
    'Tailwind CSS': SiTailwindcss,
    'Framer Motion': SiFramer,
    'Redux': SiRedux,
    '.NET': SiDotnet,
    'C#': SiCsharp,
    'Node.js': SiNodedotjs,
    'Express.js': SiExpress,
    'GraphQL': SiGraphql,
    'PostgreSQL': SiPostgresql,
    'MongoDB': SiMongodb,
    'SQL Server': SiMicrosoftsqlserver,
    'Redis': SiRedis,
    'Docker': SiDocker,
    'Git': SiGit,
    'CI/CD': SiAzuredevops,
    'Azure': SiMicrosoftazure,
    'AWS': SiAmazonaws,
    'VS Code': SiVisualstudiocode,
    'Figma': SiFigma,
    'Jira': SiJira,
    'Azure DevOps': SiAzuredevops,
    'Postman': SiPostman,
    'RESTful APIs': SiNodedotjs, // Placeholder
};

export default function SkillsSectionWithIcons() {
    const skillCategories = getSkillsByCategory();

    return (
        <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
            <div className="container-custom relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                        Skills & Technologies
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Modern tools and frameworks I use to build exceptional digital experiences
                    </p>
                </motion.div>

                {/* Skills by Category */}
                <div className="space-y-16">
                    {skillCategories.map((category, catIndex) => (
                        <motion.div
                            key={category.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: catIndex * 0.1 }}
                        >
                            {/* Category Title */}
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    {category.name}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {category.description}
                                </p>
                            </div>

                            {/* Skills Grid - Clean card layout like your example */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                {category.skills.map((skill, index) => {
                                    const Icon = iconMap[skill.name];

                                    return (
                                        <motion.div
                                            key={skill.name}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{
                                                delay: index * 0.05,
                                                duration: 0.4,
                                            }}
                                            whileHover={{
                                                y: -8,
                                                transition: { duration: 0.2 }
                                            }}
                                            className="group"
                                        >
                                            {/* Card - exactly like your example */}
                                            <div className="relative h-32 p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary-400 dark:hover:border-primary-500 hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center">
                                                {/* Icon */}
                                                {Icon && (
                                                    <div className="mb-3 text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform duration-300">
                                                        <Icon size={40} />
                                                    </div>
                                                )}

                                                {/* Skill Name */}
                                                <p className="text-sm font-medium text-center text-gray-900 dark:text-white">
                                                    {skill.name}
                                                </p>

                                                {/* Hover effect - subtle glow */}
                                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Stats Footer */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="mt-20 text-center"
                >
                    <div className="inline-grid grid-cols-2 md:grid-cols-4 gap-8 bg-white dark:bg-gray-800 rounded-3xl px-12 py-8 shadow-lg border border-gray-200 dark:border-gray-700">
                        <div>
                            <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                                {skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)}+
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Technologies</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                                {skillCategories.length}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Categories</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-1">4+</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Years Exp</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-1">100%</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}