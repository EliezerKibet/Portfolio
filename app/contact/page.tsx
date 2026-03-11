import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact | Eliezer Kibet - Freelance Full-Stack Developer',
    description: 'Hire a freelance full-stack developer. I build web apps, booking systems, APIs, and dashboards using React, Next.js, TypeScript, and .NET. Available for projects in Europe and worldwide.',
    keywords: ['hire freelance developer', 'freelance full-stack developer', 'React developer for hire', '.NET developer freelance', 'web development Berlin', 'Eliezer Kibet contact'],
    alternates: {
        canonical: 'https://eliezerkibet.dev/contact',
    },
    openGraph: {
        title: 'Contact Eliezer Kibet | Freelance Full-Stack Developer',
        description: 'Available for freelance web development projects. React, Next.js, TypeScript, .NET.',
        url: 'https://eliezerkibet.dev/contact',
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'Contact Eliezer Kibet | Freelance Full-Stack Developer',
        description: 'Available for freelance web development projects. React, Next.js, TypeScript, .NET.',
    },
};

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-b from-white via-gray-50/30 to-white dark:from-gray-900 dark:via-gray-900/95 dark:to-gray-900 py-16 md:py-20 lg:py-24">
                {/* Subtle grid background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />

                <div className="container-custom relative z-10">
                    <div className="text-center mb-12 animate-fade-in">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
                            Get In Touch
                        </h1>
                        <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-600 dark:text-gray-300 leading-relaxed">
                            Have a project in mind? Looking for a skilled developer to join your team?
                            I'd love to hear from you. Let's discuss how we can work together.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        {/* Contact Information */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 md:p-12">
                            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                                Contact Information
                            </h2>
                            <ContactInfo />

                            {/* Availability Section */}
                            <div className="mt-12 pt-12 border-t border-gray-200 dark:border-gray-700">
                                <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                                    <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Currently Available For
                                </h3>
                                <ul className="space-y-4">
                                    {[
                                        {
                                            icon: (
                                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                                </svg>
                                            ),
                                            title: 'Full-stack development projects',
                                            description: 'End-to-end web application development'
                                        },
                                        {
                                            icon: (
                                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            ),
                                            title: 'Frontend development with React/Next.js',
                                            description: 'Modern, responsive user interfaces'
                                        },
                                        {
                                            icon: (
                                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                                                </svg>
                                            ),
                                            title: 'Backend development with .NET',
                                            description: 'Robust APIs and server-side solutions'
                                        },
                                        {
                                            icon: (
                                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            ),
                                            title: 'Consulting and code reviews',
                                            description: 'Technical guidance and best practices'
                                        }
                                    ].map((item, index) => (
                                        <li key={index} className="flex gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                                            <div className="flex-shrink-0 text-gray-700 dark:text-gray-300">
                                                {item.icon}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                                                    {item.title}
                                                </h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Quick Contact Buttons */}
                            <div className="mt-12 pt-12 border-t border-gray-200 dark:border-gray-700">
                                <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white text-center">
                                    Let's Connect
                                </h3>
                                <div className="flex flex-wrap justify-center gap-4">
                                    <a
                                        href="mailto:elieserkibet@gmail.com"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 font-medium rounded-lg shadow-lg transition-all duration-200 hover:scale-105"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        Send Email
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/in/eliezer-kibet-80217a301/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-gray-900 dark:border-white hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 text-gray-900 dark:text-white font-medium rounded-lg transition-all duration-200 hover:scale-105"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                        LinkedIn
                                    </a>
                                    <a
                                        href="https://www.upwork.com/freelancers/~0190e3e5eaf9b0fdb1"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-gray-900 dark:border-white hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 text-gray-900 dark:text-white font-medium rounded-lg transition-all duration-200 hover:scale-105"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
                                        </svg>
                                        Upwork Profile
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Optional: Uncomment if you want to add a contact form
                        <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 md:p-12">
                            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                                Send Me a Message
                            </h2>
                            <ContactForm />
                        </div>
                        */}
                    </div>
                </div>
            </section>
        </div>
    );
}