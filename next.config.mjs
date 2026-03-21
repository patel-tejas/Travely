/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'places.googleapis.com',
            }
        ],
    },
    experimental: {
        serverComponentsExternalPackages: ['mongoose']
    }
};

export default nextConfig;
