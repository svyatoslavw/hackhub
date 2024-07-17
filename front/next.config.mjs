/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SERVER_URL: process.env.SERVER_URL,
    WEBSOCKET_URL: process.env.WEBSOCKET_URL
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.reddit.com",
        pathname: "**"
      },
      {
        protocol: "https",
        hostname: "media3.giphy.com",
        pathname: "**"
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: `${process.env.WEBSOCKET_URL}/uploads/:path*`
      }
    ]
  }
}

export default nextConfig
