import type { MetadataRoute } from "next";
import { products } from "@/lib/data/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.AUTH_URL ?? "https://bloomstudio.example";
  return ["", "/shop", "/builder", "/track"].map((path) => ({ url: `${base}${path}`, lastModified: new Date() })).concat(products.map((product) => ({ url: `${base}/products/${product.slug}`, lastModified: new Date() })));
}
