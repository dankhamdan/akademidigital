import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: ['preview-chat-67f41b4e-10fa-4fc7-b42a-b3e8ee394f3d.space-z.ai'],
};

export default nextConfig;
