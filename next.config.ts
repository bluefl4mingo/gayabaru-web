import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'beautiful-friend-e3b66d0581.strapiapp.com',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'beautiful-friend-e3b66d0581.media.strapiapp.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
