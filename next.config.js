/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    // loader: "custom",
    // loaderFile: './utils/image-loader.js',
    unoptimized: true,
  },
  reactStrictMode: true,
  transpilePackages: ['react-tweet']
}

module.exports = nextConfig