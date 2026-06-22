import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import ElectricEffect from '@/components/ui/ElectricEffect';
import SpinningBadge from '@/components/ui/SpinningBadge';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from '@/app/contexts/ThemeContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: {
        default: 'Eliezer Kibet - Full-Stack Developer | React, Next.js, TypeScript, .NET',
        template: '%s | Eliezer Kibet'
    },
    description: 'Freelance Full-Stack Developer in Berlin specializing in React, Next.js, TypeScript, and .NET. Verified track record delivering projects across Europe. Available for web development projects.',
    verification: {
        google: ['5fnk1OjhtBhyhZgMMgs7e_1MsIiJBLEqYe5RFSixHS0', 'BYS0L-p7neqvuYpQS23jAPclf81R9yi2yDJlDwccSUA'],
    },
    // ... rest of your metadata
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="scroll-smooth" suppressHydrationWarning>
            <head>
                <meta name="google-site-verification" content="5fnk1OjhtBhyhZgMMgs7e_1MsIiJBLEqYe5RFSixHS0" />

                {/* Add this script to prevent FOUC (Flash of Unstyled Content) */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            try {
                                const theme = localStorage.getItem('theme');
                                const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                                const activeTheme = theme || systemPreference;
                                if (activeTheme === 'dark') {
                                    document.documentElement.classList.add('dark');
                                }
                            } catch (e) {}
                        `,
                    }}
                />

            </head>
            <body className={`${inter.className} transition-colors duration-200 cursor-none`}>
                <CustomCursor />
                <ElectricEffect />
                <div className="fixed bottom-8 right-8 z-50 hidden md:block bg-white dark:bg-black rounded-full">
                    <SpinningBadge />
                </div>
                <Analytics />
                <SpeedInsights />
                <ThemeProvider>
                    <Navbar />
                    <main>{children}</main>
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}