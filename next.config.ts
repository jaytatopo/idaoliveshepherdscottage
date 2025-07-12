import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    // This is needed to allow the Next.js dev server to work correctly in the web-based IDE
    allowedDevOrigins: ["https://*.cluster-iesosxm5fzdewqvhlwn5qivgry.cloudworkstations.dev"],
  }
};

export default nextConfig;
