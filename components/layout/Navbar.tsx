'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

type NavItem = {
    label: string;
    href: string;
};

const navItems: NavItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={cn(
                'fixed top-0 w-full z-50 transition-all duration-300',
                isScrolled
                    ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm py-4'
                    : 'bg-transparent py-6'
            )}
        >
            <div className="container-custom">
                <div className="flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold">
                        <span className="text-primary-600">Dev</span>ShowCase
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'text-base font-medium transition-colors duration-200 hover:text-primary-600',
                                    pathname === item.href
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
                            className="ml-2 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition duration-200"
                        >
                            GitHub
                        </a>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
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
                                    className={cn(
                                        'text-base font-medium transition-colors duration-200 hover:text-primary-600 py-2',
                                        pathname === item.href
                                            ? 'text-primary-600'
                                            : 'text-gray-700 dark:text-gray-200'
                                    )}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            ))}

                            <a
                                href="https://github.com/EliezerKibet"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition duration-200"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                GitHub
                            </a>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}