'use client';

import { motion } from 'framer-motion';

type Education = {
    institution: string;
    degree: string;
    duration: string;
    description: string;
};

type Certification = {
    name: string;
    issuer: string;
    date: string;
    url?: string;
};

const educations: Education[] = [
    {
        institution: 'University of Technology',
        degree: 'Bachelor of Science in Computer Science',
        duration: '2014 - 2018',
        description: 'Graduated with honors. Focused on software development, algorithms, and database systems.'
    }
];

const certifications: Certification[] = [
    {
        name: 'Microsoft Certified: Azure Developer Associate',
        issuer: 'Microsoft',
        date: '2023',
        url: 'https://learn.microsoft.com/en-us/certifications/azure-developer/'
    },
    {
        name: 'AWS Certified Developer - Associate',
        issuer: 'Amazon Web Services',
        date: '2022',
        url: 'https://aws.amazon.com/certification/certified-developer-associate/'
    },
    {
        name: 'React.js Certification',
        issuer: 'React Training',
        date: '2021',
        url: 'https://reactjs.org/'
    }
];

export default function EducationSection() {
    return (
        <div className="space-y-8">
            {/* Education */}
            <div>
                <h3 className="text-xl font-semibold mb-4">Education</h3>

                <div className="space-y-6">
                    {educations.map((education, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4 }}
                            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                                <h4 className="text-lg font-medium">{education.institution}</h4>
                                <span className="text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0">{education.duration}</span>
                            </div>

                            <p className="text-primary-600 mb-2">{education.degree}</p>
                            <p className="text-gray-600 dark:text-gray-300">{education.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Certifications */}
            <div>
                <h3 className="text-xl font-semibold mb-4">Certifications</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {certifications.map((certification, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col"
                        >
                            <div className="mb-2">
                                <h4 className="text-lg font-medium">{certification.name}</h4>
                                <p className="text-gray-600 dark:text-gray-300">{certification.issuer}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{certification.date}</p>
                            </div>

                            {certification.url && (
                                <a
                                    href={certification.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary-600 hover:text-primary-700 transition duration-200 mt-auto text-sm"
                                >
                                    View Certification →
                                </a>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}