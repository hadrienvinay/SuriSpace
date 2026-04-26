import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        hostname: 'cdn.weatherapi.com',
      },
      {
        hostname:  'upload.wikimedia.org'
      },
      {
        hostname:  'commons.wikimedia.org'
      },
    ],
},

};

export default nextConfig;
