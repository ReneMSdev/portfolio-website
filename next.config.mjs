import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      { source: '/projects', destination: '/#projects', permanent: false },
      { source: '/contact', destination: '/#contact', permanent: false },
    ]
  },
}

export default nextConfig;
