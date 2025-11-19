'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ContactCTA() {
    return (
        <section className="py-16">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl shadow-xl overflow-hidden"
                >
                    <div className="px-6 py-12 md:p-12 text-center text-white">
                        <h2 className="text-3xl font-bold mb-4">Let's Work Together</h2>
                        <p className="text-lg max-w-2xl mx-auto opacity-90 mb-8">
                            Ready to start your next project? I'm available for freelance work
                            and would love to hear about your ideas. Let's build something amazing together.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href="/contact"
                                className="px-6 py-3 bg-white text-primary-600 font-medium rounded-md hover:bg-gray-100 transition duration-200"
                            >
                                Contact Me
                            </Link>
                            <Link
                                href="/projects"
                                className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white/10 transition duration-200"
                            >
                                View My Work
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}