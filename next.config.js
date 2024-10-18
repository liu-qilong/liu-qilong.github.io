/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/qilong-liu/public",
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  transpilePackages: ['react-tweet']
}

module.exports = nextConfig