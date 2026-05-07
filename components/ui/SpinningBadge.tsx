'use client';

import { motion } from 'framer-motion';

const TEXT = 'REACT · NEXT.JS · TYPESCRIPT · .NET · NODE.JS · ';

export default function SpinningBadge() {
    const radius = 46;
    const cx = 60;
    const cy = 60;
    const d = `M ${cx},${cy} m -${radius},0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`;

    return (
        <motion.div
            className="w-20 h-20 select-none opacity-40 dark:opacity-30"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
            <svg viewBox="0 0 120 120" className="w-full h-full">
                <defs>
                    <path id="spin-path" d={d} />
                </defs>
                <text
                    fill="currentColor"
                    className="spinning-badge-text text-gray-700 dark:text-gray-300"
                >
                    <textPath href="#spin-path">{TEXT}</textPath>
                </text>
            </svg>
        </motion.div>
    );
}
