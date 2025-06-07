/** @type {import('next').NextConfig} */
const nextConfig = {
    // Other configurations
    experimental: {
      fontLoaders: [
        { loader: '@next/font/google' }
      ]
    },

    images: {
    domains: ['res.cloudinary.com'], // Add this line
  },
  }
  
  module.exports = nextConfig
  