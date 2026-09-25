import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@construction/types", "@construction/validation"],
};

export default nextConfig;
