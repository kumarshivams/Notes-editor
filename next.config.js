/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Remove the experimental font loaders since we're using next/font/google directly
  // which handles font loading more reliably
};

module.exports = nextConfig;