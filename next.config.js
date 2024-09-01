/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i0.wp.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'urhvrfatpmdbwttotlwc.supabase.co',
        pathname: '**',
      },
    ],
  },
}

module.exports = nextConfig
