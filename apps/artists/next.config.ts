import type { NextConfig } from "next";

const config: NextConfig = {
  output: "export",
  transpilePackages: ["@unis/ui"],
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default config;