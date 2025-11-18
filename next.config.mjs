import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  outputFileTracingRoot: path.join(__dirname),
  output: 'standalone',
  compiler: {
    styledComponents: true
  },
  images: {
    domains: ['localhost', 'example.com'],
  },
};

export default nextConfig;
