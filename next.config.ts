import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'cdn.weatherapi.com',
      }
    ],
},

};

export default nextConfig;
