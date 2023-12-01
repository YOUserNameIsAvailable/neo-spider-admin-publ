const path = require("path");
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const devNextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  assetPrefix: "http://localhost:8088/",
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  distDir: "build",
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8088/api/:path*",
      },
    ];
  },
};

module.exports = (phase, { defaultConfig }) =>
  console.log("build mode: ", phase, PHASE_DEVELOPMENT_SERVER) ||
  phase === PHASE_DEVELOPMENT_SERVER
    ? devNextConfig
    : nextConfig;
