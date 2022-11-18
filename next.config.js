/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      process.env.NODE_ENV === 'development'
        ? process.env.NEXT_PUBLIC_DEVELOPMENT_IMAGE_BASE_URL
        : process.env.NEXT_PUBLIC_PRODUCTION_IMAGE_BASE_URL,
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

module.exports = nextConfig;
