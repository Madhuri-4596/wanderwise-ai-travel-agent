/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
    ],
  },
  // Allow cross-origin requests from WSL2 IP
  allowedDevOrigins: ['http://172.17.22.16:3000', 'http://localhost:3000'],
};

module.exports = nextConfig;
