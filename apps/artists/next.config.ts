import type { NextConfig } from "next";

const config: NextConfig = {
  transpilePackages: ["@unis/ui"],
  reactStrictMode: true,
  output: "export",
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default config;
