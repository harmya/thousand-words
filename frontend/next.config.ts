import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath:
    process.env.GITHUB_ACTIONS && process.env.NODE_ENV === "production"
      ? "/thousand-words"
      : "/thousand-words",
  assetPrefix:
    process.env.GITHUB_ACTIONS && process.env.NODE_ENV === "production"
      ? "/thousand-words/"
      : "/thousand-words/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
