import { env } from "@/env";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com"
      }
    ]
  },
  async rewrites() {
    return [{
      source: "/api/:path*",
      destination: `${env.NEXT_PUBLIC_BACKEND_URL}/api/:path*`
    }]
  }
};

export default nextConfig;
