/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The backend is a separate origin (NestJS). When you integrate, either point
  // NEXT_PUBLIC_API_BASE_URL straight at it (CORS) or add a rewrite here to proxy
  // /api/* → backend and avoid CORS entirely. Left off while on mock data.
  // async rewrites() {
  //   return [{ source: "/api/:path*", destination: `${process.env.API_ORIGIN}/:path*` }];
  // },
};

export default nextConfig;
