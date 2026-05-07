'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { FiGithub } from 'react-icons/fi';

type NavItem = {
    label: string;
    href: string;
    section: string | null;
};

const navItems: NavItem[] = [
    { label: 'Projects', href: '/#projects', section: 'projects' },
    { label: 'Contact',  href: '/#contact',  section: 'contact'  },
    { label: 'Blog',     href: '/blog',      section: null       },
];

export default function Navbar() {
    const pathname = usePathname();
    const [activeSection, setActiveSection] = useState('hero');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // IntersectionObserver — only wires up on the homepage
    useEffect(() => {
        if (pathname !== '/') return;
        const ids = ['hero', 'projects', 'contact'];
        const observers = ids.map((id) => {
            const el = document.getElementById(id);
            if (!el) return null;
            const obs = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
                { threshold: 0.35 }
            );
            obs.observe(el);
            return obs;
        });
        return () => observers.forEach((o) => o?.disconnect());
    }, [pathname]);

    const isActive = (item: NavItem) => {
        if (item.section === null) return pathname.startsWith('/blog');
        if (pathname === '/') return activeSection === item.section;
        return false;
    };

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
        if (item.section && pathname === '/') {
            e.preventDefault();
            document.getElementById(item.section)?.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="w-full py-6 bg-white dark:bg-black transition-colors duration-200">
            <div className="container-custom">
                <div className="flex items-center justify-between">
                    {/* Desktop Navigation */} <Link href="/" className="text-base md:text-lg text-gray-500 dark:text-gray-400 tracking-widest uppercase font-medium">
                        Eliezer Kibet
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={(e) => handleClick(e, item)}
                                className={cn(
                                    'text-base font-medium transition-colors duration-200 hover:text-primary-600',
                                    isActive(item)
                                        ? 'text-primary-600'
                                        : 'text-gray-700 dark:text-gray-200'
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}

                        <a
                            href="https://github.com/EliezerKibet"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white transition-colors duration-200"
                        >
                            <FiGithub className="w-5 h-5" />
                        </a>
                        <div className="flex items-center space-x-4">
                            <ThemeToggle />
                        </div>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        className="md:hidden text-gray-700 dark:text-gray-200"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 animate-fade-in">
                        <nav className="flex flex-col space-y-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={(e) => handleClick(e, item)}
                                    className={cn(
                                        'text-base font-medium transition-colors duration-200 hover:text-primary-600 py-2',
                                        isActive(item)
                                            ? 'text-primary-600'
                                            : 'text-gray-700 dark:text-gray-200'
                                    )}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <a
                                href="https://github.com/EliezerKibet"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                                className="flex items-center gap-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white transition-colors duration-200 py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <FiGithub className="w-5 h-5" />
                                GitHub
                            </a>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
