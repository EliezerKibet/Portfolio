'use client';

import { motion } from 'framer-motion';

type Experience = {
    company: string;
    position: string;
    duration: string;
    description: string;
};

const experiences: Experience[] = [
    {
        company: 'Freelance',
        position: 'Full-Stack Developer',
        duration: '2022 - Present',
        description: 'Working with clients globally to design and implement full-stack web applications using React, Next.js, TypeScript, and .NET. Projects range from e-commerce platforms to enterprise integration systems.'
    },
    {
        company: 'TechCorp',
        position: 'Senior Frontend Developer',
        duration: '2020 - 2022',
        description: 'Led the development of responsive, user-friendly web interfaces using React and TypeScript. Collaborated with UX/UI designers and backend developers to create seamless digital experiences.'
    },
    {
        company: 'WebSolutions',
        position: 'Software Developer',
        duration: '2018 - 2020',
        description: 'Developed and maintained web applications using JavaScript, React, and .NET technologies. Worked in an agile team environment to deliver high-quality software solutions.'
    }
];

export default function ExperienceTimeline() {
    return (
        <div className="space-y-8">
            {experiences.map((experience, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="relative pl-8 border-l-2 border-gray-200 dark:border-gray-700"
                >
                    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary-600"></div>

                    <div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                            <h3 className="text-xl font-semibold">{experience.position}</h3>
                            <span className="text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0">{experience.duration}</span>
                        </div>

                        <p className="text-lg text-primary-600 mb-2">{experience.company}</p>
                        <p className="text-gray-600 dark:text-gray-300">{experience.description}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}