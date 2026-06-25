/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/matrix-theme',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
