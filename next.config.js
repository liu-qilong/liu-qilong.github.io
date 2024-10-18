/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/qilong-liu",
  images: {
    path: `${basePath}/public`,
    unoptimized: true,
  },
  reactStrictMode: true,
  transpilePackages: ['react-tweet']
}

module.exports = nextConfig