const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');

/** @type {import('next').NextConfig} */

dotenvLoad();
const withNextEnv = nextEnv();

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['toy-project-s3.s3.ap-northeast-2.amazonaws.com'],
  },
  async redirects() {
    return [
      {
        source: '/board',
        destination: '/board/free?page=1&perPage=10&sort=createdAt',
        permanent: true,
      },
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ];
  },
};

module.exports = withNextEnv(nextConfig);
