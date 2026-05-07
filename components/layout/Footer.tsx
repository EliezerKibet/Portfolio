import Link from 'next/link';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-gray-100 dark:border-white/10 bg-white dark:bg-black transition-colors duration-200">
            <div className="container-custom py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-sm text-gray-400 dark:text-gray-500 tracking-widest uppercase">
                    Eliezer Kibet
                </span>

                <div className="flex items-center gap-5">
                    <a href="mailto:elieserkibet@gmail.com" aria-label="Email"
                        className="text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors duration-200">
                        <FiMail className="w-4 h-4" />
                    </a>
                    <a href="https://github.com/EliezerKibet" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                        className="text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors duration-200">
                        <FiGithub className="w-4 h-4" />
                    </a>
                    <a href="https://www.linkedin.com/in/eliezer-kibet-80217a301/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                        className="text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors duration-200">
                        <FiLinkedin className="w-4 h-4" />
                    </a>
                    <Link href="/blog"
                        className="text-xs text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors duration-200">
                        Blog
                    </Link>
                </div>

                <span className="text-xs text-gray-300 dark:text-gray-600">© {year}</span>
            </div>
        </footer>
    );
}
