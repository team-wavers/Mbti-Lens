/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true,
    },
    images: {
        unoptimized: true,
    },
    distDir: process.env.BUILD_DIR,
};

module.exports = nextConfig;
