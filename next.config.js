/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['ghostscript-node'],
  images: {
    remotePatterns: [],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  }
}

module.exports = nextConfig
