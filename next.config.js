/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["assets.website-files.com", "cryptologos.cc", "s2.coinmarketcap.com"],
  },
}

module.exports = nextConfig
