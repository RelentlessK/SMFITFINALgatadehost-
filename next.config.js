/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: true,
  webpack: (config, { dev, isServer }) => {
    // Disable webpack caching in development to prevent caching errors
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

module.exports = nextConfig;