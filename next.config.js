/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push('ws', 'bufferutil', 'utf-8-validate');
    return config;
  },
};

module.exports = nextConfig;
