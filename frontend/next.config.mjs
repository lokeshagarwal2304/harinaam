/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // PWA & Canvas optimizations
  experimental: {
    optimizePackageImports: ['lucide-react']
  }
};

export default nextConfig;
