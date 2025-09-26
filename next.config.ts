import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Tell Next exactly where your project root is
  outputFileTracingRoot: path.resolve(process.cwd()),
  /* other config options */
};

export default nextConfig;

