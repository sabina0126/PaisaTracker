import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    const __dirname = path.dirname(new URL(import.meta.url).pathname); // Get the current directory

    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname), // Set the alias to the current directory
    };

    return config;
  },
};

export default nextConfig;
