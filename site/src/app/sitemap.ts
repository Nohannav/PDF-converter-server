import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";
import { hasGallery } from "@/lib/media";

const routes: { path: string; priority: number; changeFrequency: "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/combi-volkswagen", priority: 0.9, changeFrequency: "monthly" },
  { path: "/mini-discotheque", priority: 0.9, changeFrequency: "monthly" },
  { path: "/evenements-professionnels", priority: 0.8, changeFrequency: "monthly" },
  { path: "/galerie", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
  { path: "/mentions-legales", priority: 0.2, changeFrequency: "yearly" },
  { path: "/politique-de-confidentialite", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const gallery = hasGallery();
  return routes.filter((r) => gallery || r.path !== "/galerie").map((r) => ({
    url: absoluteUrl(r.path),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
