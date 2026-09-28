import type { MetadataRoute } from "next";
import { products } from "@/content/products";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/produtos", "/servicos", "/sobre"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const productRoutes = products.map((p) => ({
    url: `${siteUrl}/produtos/${p.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...productRoutes];
}
