import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      { hostname: 'cdn.weatherapi.com'       },
      { hostname: 'upload.wikimedia.org'     },
      { hostname: 'commons.wikimedia.org'    },
      { hostname: 'science.nasa.gov'         },
      { hostname: 'assets.science.nasa.gov'  },
      { hostname: 'images-assets.nasa.gov'   },
    ],
},

};

export default nextConfig;
