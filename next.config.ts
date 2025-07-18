import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
     { hostname: "2vq5swqp7g.ufs.sh"}
    ]
  }
};

export default nextConfig;
