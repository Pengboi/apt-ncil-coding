import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  
  // Allow images from Sportmonks CDN
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sportmonks.com',
        pathname: '/images/**',
      },
    ],
  },

  // Environment variables available to the browser
  env: {
    NEXT_PUBLIC_SPORTMONKS_API_KEY: process.env.NEXT_PUBLIC_SPORTMONKS_API_KEY,
    SPORTMONKS_API_URL: process.env.SPORTMONKS_API_URL,
  },
};

export default nextConfig;
