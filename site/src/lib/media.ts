import "server-only";
import fs from "node:fs";
import path from "node:path";
import {
  galleryCategories,
  galleryFallbacks,
  mediaSlots,
  type GalleryCategory,
  type MediaSlotKey,
} from "@/config/media";
import type { IllustrationKey } from "@/components/media/illustrations";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const EXTENSIONS = [".webp", ".avif", ".jpg", ".jpeg", ".png"];

export type ResolvedMedia =
  | { kind: "photo"; src: string; alt: string }
  | { kind: "illustration"; illustration: IllustrationKey; alt: string };

export type GalleryItem = ResolvedMedia & {
  id: string;
  category: GalleryCategory;
  caption: string;
};

function findPhoto(fileWithoutExt: string) {
  for (const ext of EXTENSIONS) {
    const relative = `${fileWithoutExt}${ext}`;
    if (fs.existsSync(path.join(PUBLIC_DIR, relative))) return `/${relative}`;
  }
  return null;
}

export function resolveMedia(key: MediaSlotKey): ResolvedMedia {
  const slot = mediaSlots[key];
  const src = findPhoto(slot.file);
  return src
    ? { kind: "photo", src, alt: slot.alt }
    : { kind: "illustration", illustration: slot.illustration, alt: slot.alt };
}

/** « mariage-domaine-des-pins_02.jpg » → « Mariage domaine des pins » */
function captionFromFilename(filename: string) {
  const base = filename
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]?\d+$/, "")
    .replace(/[-_]+/g, " ")
    .trim();
  return base ? base.charAt(0).toUpperCase() + base.slice(1) : "";
}

export function getGalleryItems(): GalleryItem[] {
  const items: GalleryItem[] = [];

  for (const { slug, label } of galleryCategories) {
    const dir = path.join(PUBLIC_DIR, "images", "galerie", slug);
    const files = fs.existsSync(dir)
      ? fs
          .readdirSync(dir)
          .filter((f) => EXTENSIONS.includes(path.extname(f).toLowerCase()))
          .sort()
      : [];

    if (files.length > 0) {
      for (const file of files) {
        const caption = captionFromFilename(file) || label;
        items.push({
          kind: "photo",
          id: `${slug}/${file}`,
          category: slug,
          src: `/images/galerie/${slug}/${encodeURIComponent(file)}`,
          alt: `${label} — ${caption}`,
          caption,
        });
      }
      continue;
    }

    // Aucune photo dans la catégorie : illustrations provisoires éventuelles.
    for (const fallback of galleryFallbacks.filter((f) => f.category === slug)) {
      const media = resolveMedia(fallback.slot);
      items.push({ ...media, id: `${slug}/${fallback.slot}`, category: slug, caption: fallback.caption });
    }
  }

  return items;
}

/** Catégories ayant au moins un visuel (les filtres vides ne sont pas affichés). */
export function getGalleryFilters(items: GalleryItem[]) {
  return galleryCategories.filter((c) => items.some((i) => i.category === c.slug));
}
