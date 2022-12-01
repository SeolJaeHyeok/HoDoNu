const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');
const { withSentryConfig } = require('@sentry/nextjs');
/** @type {import('next').NextConfig} */

dotenvLoad();
const withNextEnv = nextEnv();
const SentryWebpackPluginOptions = {
  silent: true,
};

const imgUrl =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_DEVELOPMENT_IMAGE_BASE_URL
    : process.env.NEXT_PUBLIC_PRODUCTION_IMAGE_BASE_URL;

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [imgUrl.toString()],
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
  sentry: {
    // Use `hidden-source-map` rather than `source-map` as the Webpack `devtool`
    // for client-side builds. (This will be the default starting in
    // `@sentry/nextjs` version 8.0.0.) See
    // https://webpack.js.org/configuration/devtool/ and
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#use-hidden-source-map
    // for more information.
    hideSourceMaps: true,
  },
};

module.exports = withNextEnv(withSentryConfig(nextConfig, SentryWebpackPluginOptions));
