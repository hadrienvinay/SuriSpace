import type { NextConfig } from "next";

const SECURITY_HEADERS = [
  { key: 'X-Frame-Options',        value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy',        value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy',     value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
];

const nextConfig: NextConfig = {
  ...(process.env.VERCEL ? {} : { output: 'standalone' as const }),
  images: {
    remotePatterns: [
      { hostname: 'cdn.weatherapi.com'       },
      { hostname: 'upload.wikimedia.org'     },
      { hostname: 'commons.wikimedia.org'    },
      { hostname: 'science.nasa.gov'         },
      { hostname: 'assets.science.nasa.gov'  },
      { hostname: 'images-assets.nasa.gov'   },
      { hostname: 'images.unsplash.com'      },
    ],
  },
  async headers() {
    return [{ source: '/(.*)', headers: SECURITY_HEADERS }];
  },
};

export default nextConfig;
