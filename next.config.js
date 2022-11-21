const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');

/** @type {import('next').NextConfig} */

dotenvLoad();
const withNextEnv = nextEnv();

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      process.env.NODE_ENV === 'development'
        ? process.env.NEXT_PUBLIC_DEVELOPMENT_API_BASE_URL
        : process.env.NEXT_PUBLIC_PRODUCTION_API_BASE_URL,
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ];
  },
};

module.exports = withNextEnv(nextConfig);
