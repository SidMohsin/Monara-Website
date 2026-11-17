/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },

  // One-page site (client decision, Nov 2026). The inner pages are parked in
  // src/app/_later until content exists; their old addresses land on the
  // matching home-page section. Temporary (307) so they can come back later.
  async redirects() {
    return [
      { source: "/services", destination: "/#services", permanent: false },
      { source: "/services/:slug", destination: "/#:slug", permanent: false },
      { source: "/about", destination: "/#about", permanent: false },
      { source: "/contact", destination: "/#contact", permanent: false },
      { source: "/work", destination: "/", permanent: false },
      { source: "/work/:slug", destination: "/", permanent: false },
    ];
  },
};
export default nextConfig;
