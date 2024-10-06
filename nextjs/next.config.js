/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['.'],
  },
  reactStrictMode: true,
  compiler: {
    removeConsole: false,
  },
  experimental: {
    esmExternals: "loose", // <-- add this
    serverComponentsExternalPackages: ["mongoose"] // <-- and this
  }
};

module.exports = nextConfig;
