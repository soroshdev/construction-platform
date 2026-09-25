import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@construction/db", "@construction/validation"],
};

export default nextConfig;
