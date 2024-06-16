/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Enable React Strict Mode
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
