/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // domains: ["imagedelivery.net", "videodelivery.net", "cloudflarestream.com"],
  remotePatterns: [
    {
      protocol: "https",
      hostname: "imagedelivery.net/",
      port: "",
      pathname: "",
    },
  ],
};

module.exports = nextConfig;
