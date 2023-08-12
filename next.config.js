/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer({
  env: {
    NEXT_PUBLIC_ENV: 'PRODUCTION',
    typescript: {
      ignoreBuildErrors: true,
    },
    swcMinify: true,
  },
})

// module.exports = nextConfig;
