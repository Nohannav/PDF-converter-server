"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import type { GalleryItem } from "@/lib/media";
import { cn } from "@/lib/cn";
import { Illustration } from "./illustrations";

type Filter = { slug: string; label: string };

export function Gallery({
  items,
  filters,
  layout = "masonry",
}: {
  items: GalleryItem[];
  /** Filtres à afficher (seulement ceux qui ont des visuels). Vide = pas de filtres. */
  filters?: readonly Filter[];
  layout?: "masonry" | "grid";
}) {
  const [active, setActive] = useState<string>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const visible = active === "all" ? items : items.filter((i) => i.category === active);

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (delta: number) => setOpenIndex((i) => (i === null ? i : (i + delta + visible.length) % visible.length)),
    [visible.length],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (openIndex !== null && !dialog.open) dialog.showModal();
    if (openIndex === null && dialog.open) dialog.close();
  }, [openIndex]);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, step]);

  const current = openIndex !== null ? visible[openIndex] : null;
  const hasPlaceholders = items.some((i) => i.kind === "illustration");

  return (
    <div>
      {filters && filters.length > 1 && (
        <div role="group" aria-label="Filtrer la galerie" className="-mx-5 mb-10 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
          {[{ slug: "all", label: "Tout voir" }, ...filters].map((f) => (
            <button
              key={f.slug}
              type="button"
              aria-pressed={active === f.slug}
              onClick={() => setActive(f.slug)}
              className={cn(
                "min-h-11 shrink-0 rounded-full border px-5 text-sm font-semibold transition-colors",
                active === f.slug ? "border-ink bg-ink text-cream" : "border-ink/15 text-ink hover:border-ink/50",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      <ul className={cn(layout === "masonry" ? "columns-1 gap-5 sm:columns-2 lg:columns-3" : "grid gap-5 sm:grid-cols-2 lg:grid-cols-3")}>
        {visible.map((item, index) => (
          <li key={item.id} className={cn("animate-fade-in", layout === "masonry" && "mb-5 break-inside-avoid")}>
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              className="group relative block w-full overflow-hidden rounded-2xl bg-sand text-left"
              aria-label={`Agrandir : ${item.caption}`}
            >
              <div className={cn("relative overflow-hidden", layout === "masonry" && index % 3 === 1 ? "aspect-[4/5]" : "aspect-[4/3]")}>
                {item.kind === "photo" ? (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-[1.04]"
                  />
                ) : (
                  <Illustration
                    name={item.illustration}
                    label={item.alt}
                    className="absolute inset-0 h-full w-full transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-[1.04]"
                  />
                )}
              </div>
              <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent p-4 pt-12 text-sm font-semibold text-cream">
                <span>
                  {item.caption}
                  {item.kind === "illustration" && <span className="block text-xs font-normal text-cream/70">Illustration — photo à venir</span>}
                </span>
                <Expand className="size-4 shrink-0 opacity-70 transition-opacity group-hover:opacity-100" aria-hidden />
              </span>
            </button>
          </li>
        ))}
      </ul>

      {hasPlaceholders && (
        <p className="mt-6 text-sm text-stone">
          Les visuels marqués « Illustration » sont provisoires : ils seront remplacés par les photographies réelles des
          installations.
        </p>
      )}

      <dialog
        ref={dialogRef}
        onClose={close}
        onClick={(e) => e.target === e.currentTarget && close()}
        aria-label={current ? current.caption : "Visionneuse"}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-ink/95 p-0 text-cream backdrop:bg-ink/80 open:animate-fade-in"
      >
        {current && (
          <div className="flex h-full flex-col" onClick={(e) => e.target === e.currentTarget && close()}>
            <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
              <p className="text-sm text-cream/80" aria-live="polite">
                {current.caption} · {openIndex! + 1}/{visible.length}
              </p>
              <button type="button" onClick={close} className="inline-flex size-11 items-center justify-center rounded-full hover:bg-cream/10" aria-label="Fermer">
                <X className="size-6" />
              </button>
            </div>
            <div className="relative flex-1" onClick={(e) => e.target === e.currentTarget && close()}>
              <div className="absolute inset-4 sm:inset-x-20 sm:inset-y-6">
                {current.kind === "photo" ? (
                  <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />
                ) : (
                  <div className="relative mx-auto aspect-[10/7] max-h-full w-full max-w-5xl overflow-hidden rounded-2xl">
                    <Illustration name={current.illustration} label={current.alt} className="absolute inset-0 h-full w-full" />
                  </div>
                )}
              </div>
              {visible.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    className="absolute top-1/2 left-2 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-ink/60 hover:bg-ink sm:left-4"
                    aria-label="Image précédente"
                  >
                    <ChevronLeft className="size-6" />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    className="absolute top-1/2 right-2 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-ink/60 hover:bg-ink sm:right-4"
                    aria-label="Image suivante"
                  >
                    <ChevronRight className="size-6" />
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
