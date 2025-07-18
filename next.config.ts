import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images:{
    remotePatterns:[
     { hostname: "2vq5swqp7g.ufs.sh"}
    ]
  }
};

export default nextConfig;
