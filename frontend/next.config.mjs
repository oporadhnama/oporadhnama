/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'oporadhnama.onrender.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/sitemaps-v2.xml',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
