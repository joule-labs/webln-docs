/** @type {import('next').NextConfig} */
import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import remarkPrism from "remark-prism";

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    providerImportSource: "@mdx-js/react",
    remarkPlugins: [remarkGfm, remarkPrism],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure pageExtensions to include md and mdx
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  // Optionally, add any other Next.js config below
  reactStrictMode: true,
};

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
