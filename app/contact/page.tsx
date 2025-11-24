import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Me | Full-Stack Developer',
    description: 'Get in touch with me for your next web development project. I specialize in React, Next.js, TypeScript, and .NET',
};

export default function ContactPage() {
    return (
        <div className="container-custom section-padding animate-fade-in">

            <div className="text-center mb-12">
                <h1 className="mb-4">Get In Touch</h1>
                <p className="text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
                    Have a project in mind? Looking for a skilled developer to join your team?
                    I'd love to hear from you. Let's discuss how we can work together.
                </p>
            </div>

            <div className="grid grid-cols-0 lg:grid-cols-1 gap-12">
                <div>
                    {/*<h2 className="mb-6">Send Me a Message</h2>*/}
                    {/*<ContactForm />*/}
                </div>

                <div>
                    <h2 className="mb-6">Contact Information</h2>
                    <ContactInfo />

                    <div className="mt-12">
                        <h3 className="mb-4">Availability</h3>
                        <p className="mb-2">I'm currently available for:</p>
                        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                            <li>Full-stack development projects</li>
                            <li>Frontend development with React/Next.js</li>
                            <li>Backend development with .NET</li>
                            <li>Consulting and code reviews</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}