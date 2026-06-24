import type { NextConfig } from "next";

/** Set when building for GitHub Pages (project site at /eyelight-website/). */
const isGithubPages = process.env.GITHUB_PAGES === "true";
const githubRepo = "eyelight-website";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  ...(isGithubPages && {
    basePath: `/${githubRepo}`,
    assetPrefix: `/${githubRepo}/`,
  }),
};

export default nextConfig;
