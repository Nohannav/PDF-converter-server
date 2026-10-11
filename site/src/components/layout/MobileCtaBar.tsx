"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CalendarDays, FileText, Phone } from "lucide-react";
import { cn } from "@/lib/cn";

/** Barre d'actions fixe sur mobile : apparaît après le premier écran, discrète. */
export function MobileCtaBar({ telHref }: { telHref: string | null }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/contact") return null;

  return (
    <div
      className={cn(
        "fixed inset-x-3 bottom-3 z-40 transition-all duration-500 lg:hidden",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0",
      )}
      aria-hidden={!visible}
    >
      <div className="flex gap-2 rounded-full bg-paper/95 p-1.5 shadow-[0_12px_40px_-12px_rgba(35,29,25,0.35)] ring-1 ring-line backdrop-blur">
        {telHref ? (
          <a
            href={telHref}
            tabIndex={visible ? 0 : -1}
            className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full text-sm font-semibold text-ink"
          >
            <Phone className="size-4" aria-hidden /> Appeler
          </a>
        ) : (
          <Link
            href="/contact#rendez-vous"
            tabIndex={visible ? 0 : -1}
            className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full text-sm font-semibold text-ink"
          >
            <CalendarDays className="size-4" aria-hidden /> Rendez-vous
          </Link>
        )}
        <Link
          href="/contact#devis"
          tabIndex={visible ? 0 : -1}
          className="flex min-h-12 flex-[1.4] items-center justify-center gap-2 rounded-full bg-bordeaux text-sm font-semibold text-paper"
        >
          <FileText className="size-4" aria-hidden /> Demander un devis
        </Link>
      </div>
    </div>
  );
}
