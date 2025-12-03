'use client';

import { useTheme } from '@/app/contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="relative w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center border border-gray-200 dark:border-gray-800"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            type="button"
        >
            <AnimatePresence mode="wait" initial={false}>
                {theme === 'light' ? (
                    <motion.div
                        key="sun"
                        initial={{ rotate: -180, opacity: 0, scale: 0.6 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: 180, opacity: 0, scale: 0.6 }}
                        transition={{
                            duration: 0.3,
                            type: "spring",
                            stiffness: 200,
                            damping: 20
                        }}
                    >
                        <Sun className="w-5 h-5 text-amber-500" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="moon"
                        initial={{ rotate: -180, opacity: 0, scale: 0.6 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: 180, opacity: 0, scale: 0.6 }}
                        transition={{
                            duration: 0.3,
                            type: "spring",
                            stiffness: 200,
                            damping: 20
                        }}
                    >
                        <Moon className="w-5 h-5 text-blue-400" />
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    );
}