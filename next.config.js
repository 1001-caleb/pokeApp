/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['raw.githubusercontent.com'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: { images: { allowFutureImage: true } },
};

module.exports = nextConfig;
