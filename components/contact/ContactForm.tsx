'use client';

import { useState, FormEvent } from 'react';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Form validation
        if (!formData.name || !formData.email || !formData.message) {
            alert('Please fill out all required fields');
            return;
        }

        setFormStatus('submitting');

        // Simulate form submission with a delay
        setTimeout(() => {
            // This would be replaced with actual API call in a real implementation
            console.log('Form submitted:', formData);
            setFormStatus('success');

            // Reset form after successful submission
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
            });

            // Reset status after 5 seconds
            setTimeout(() => {
                setFormStatus('idle');
            }, 5000);
        }, 1500);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:bg-gray-800"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:bg-gray-800"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                </label>
                <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:bg-gray-800"
                />
            </div>

            <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message <span className="text-red-500">*</span>
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:bg-gray-800"
                />
            </div>

            <button
                type="submit"
                disabled={formStatus === 'submitting'}
                className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed w-full md:w-auto"
            >
                {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>

            {formStatus === 'success' && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Success!</strong>
                    <span className="block sm:inline"> Your message has been sent. I'll get back to you soon.</span>
                </div>
            )}

            {formStatus === 'error' && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error!</strong>
                    <span className="block sm:inline"> There was an issue sending your message. Please try again.</span>
                </div>
            )}
        </form>
    );
}