/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn-luma.com", "lh3.googleusercontent.com"],
  },
};

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
});

module.exports = withPWA(nextConfig);
