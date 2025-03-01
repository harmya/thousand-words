import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "",
  assetPrefix: "./",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
