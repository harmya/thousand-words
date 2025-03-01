// File: next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/process",
        destination:
          process.env.API_URL ||
          "https://thousand-words-1u5f.onrender.com/process",
      },
    ];
  },

  // Optional: TypeScript checking in build
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
