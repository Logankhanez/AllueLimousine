/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["date-fns"],
  output: "export",
  images: {
    unoptimized: true,
  },
  // This tells Next.js to not generate pages for API routes during export
  experimental: {
    excludeDefaultMomentLocales: true,
  },
}

module.exports = nextConfig

