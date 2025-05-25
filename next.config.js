/** @type {import('next').NextConfig} */
const nextConfig = {
    // Other configurations
    experimental: {
      fontLoaders: [
        { loader: '@next/font/google' }
      ]
    }
  }
  
  module.exports = nextConfig
  