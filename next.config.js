const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    productionBrowserSourceMaps: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/user-management',
                permanent: true,
            },
        ]
    },
}

module.exports = nextConfig
