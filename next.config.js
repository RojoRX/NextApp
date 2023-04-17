module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Solución temporal para el problema de next.js en Windows.
      config.resolve.fallback.fs = false;
    }
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/:path*',
      },
    ];
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};
