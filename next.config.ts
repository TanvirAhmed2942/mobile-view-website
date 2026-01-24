import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./i18n/request.js");

const nextConfig: NextConfig = {
  trailingSlash: false,
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "via.placeholder.com" },
      { hostname: "example.com" },
      { hostname: "10.10.7.103" },
      { hostname: "api.gopassit.org" },
    ],
  },
  // Allow cross-origin requests from specific IPs in development
  allowedDevOrigins: ["10.10.7.79"],
};

export default withNextIntl(nextConfig);
