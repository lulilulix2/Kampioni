/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // ky është sekreti që e bën të deployohet si static në Amplify
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;

