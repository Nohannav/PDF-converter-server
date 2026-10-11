import type { MetadataRoute } from "next";
import { absoluteUrl, allowIndexing } from "@/config/site";

/**
 * Tant que NEXT_PUBLIC_ALLOW_INDEXING n'est pas à "true", le site demande aux
 * moteurs de ne rien indexer (évite d'indexer une version non finalisée).
 */
export default function robots(): MetadataRoute.Robots {
  if (!allowIndexing) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
