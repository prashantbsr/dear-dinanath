/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static site: `next build` emits a deployable `out/` folder.
  output: "export",

  // Required for static export (no Image Optimization server at runtime).
  images: { unoptimized: true },

  // Emit `route/index.html` so the export works on any static host.
  trailingSlash: true,

  // Set NEXT_PUBLIC_BASE_PATH (e.g. "/repo-name") when deploying to a
  // GitHub Pages project site. Leave empty for a user/custom domain.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",

  reactStrictMode: true,
};

export default nextConfig;
