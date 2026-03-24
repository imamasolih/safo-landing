import type { NextConfig } from "next";

const repoName = "safo-landing";
const isProduction = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isProduction ? `/${repoName}` : undefined,
  assetPrefix: isProduction ? `/${repoName}/` : undefined,
  experimental: {
    workerThreads: true,
  },
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
};

export default nextConfig;
