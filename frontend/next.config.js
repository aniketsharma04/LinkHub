/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false, // Enable ESLint during builds for better code quality
  },
  images: { 
    unoptimized: true,
    domains: ['avatars.githubusercontent.com', 'images.unsplash.com'], // Add allowed image domains
  },
  experimental: {
    serverComponentsExternalPackages: ['mongoose'],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
};

module.exports = nextConfig;
