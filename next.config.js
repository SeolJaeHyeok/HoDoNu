/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      // process.env.NODE_ENV === 'development'
      //   ? process.env.NEXT_PUBLIC_DEVELOPMENT_IMAGE_BASE_URL
      //   : process.env.NEXT_PUBLIC_PRODUCTION_IMAGE_BASE_URL,
      'toy-project-s3.s3.ap-northeast-2.amazonaws.com',
    ],
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

module.exports = nextConfig;
