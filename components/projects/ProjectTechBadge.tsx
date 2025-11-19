'use client';

import { cn } from '@/lib/utils';

type Props = {
    tech: string;
    className?: string;
};

export default function ProjectTechBadge({ tech, className }: Props) {
    const getTechColor = (technology: string) => {
        const techColors: Record<string, string> = {
            'React': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
            'Next.js': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100',
            'TypeScript': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
            'JavaScript': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
            '.NET': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100',
            'C#': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100',
            'Node.js': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
            'Express.js': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100',
            'MongoDB': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
            'PostgreSQL': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
            'SQL Server': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
            'Docker': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
            'Tailwind CSS': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-100',
            'Framer Motion': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100',
            'Redux': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100',
            'GraphQL': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-100',
            'Azure': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
            'AWS': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100',
            'Stripe': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100',
        };

        return techColors[technology] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    };

    return (
        <span
            className={cn(
                'px-3 py-1 rounded-full text-sm',
                getTechColor(tech),
                className
            )}
        >
            {tech}
        </span>
    );
}