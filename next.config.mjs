/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            // Pages removed from navigation — redirect to homepage
            { source: '/about',                                  destination: '/', permanent: true },
            { source: '/contact',                                destination: '/', permanent: true },
            { source: '/projects',                               destination: '/', permanent: true },
            { source: '/services',                               destination: '/', permanent: true },
            { source: '/services/react-nextjs-development',      destination: '/', permanent: true },
            { source: '/services/dotnet-backend',                destination: '/', permanent: true },
            { source: '/services/fullstack-web-development',     destination: '/', permanent: true },
            { source: '/services/freelance-developer-berlin',    destination: '/', permanent: true },
            { source: '/services/freelance-developer-germany',   destination: '/', permanent: true },
        ];
    },
};

export default nextConfig;
