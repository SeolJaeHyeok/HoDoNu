/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/board',
        destination: '/board/free?page=1&perPage=10&sort=createdAt',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
