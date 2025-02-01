import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "localhost",
      "res.cloudinary.com",
      "lh3.googleusercontent.com",
      "googleusercontent.com",
    ],
    unoptimized: process.env.NODE_ENV === "development",
  },
  api: {
    bodyParser: {
      sizeLimit: "5mb",
    },
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: {},
  },
};

export default nextConfig;
