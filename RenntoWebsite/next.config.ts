import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,

  allowedDevOrigins: ["192.168.0.103"],
  devIndicators: false,
};

export default nextConfig;
