/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
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
