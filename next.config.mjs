/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            // Pages removed from navigation — redirect to homepage
            { source: '/about',                                  destination: '/', permanent: true },
            { source: '/contact',                                destination: '/', permanent: true },
            { source: '/projects',                               destination: '/', permanent: true },
            { source: '/services/:path*',                         destination: '/', permanent: true },
        ];
    },
};

export default nextConfig;
