"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { mainNav } from "@/config/navigation";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { Logo } from "./Logo";

export function Header({ telHref, phoneDisplay }: { telHref: string | null; phoneDisplay: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Ferme le menu lors d'un changement de page (ajustement d'état pendant le rendu).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    const toggle = toggleRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && panelRef.current) {
        // Piège de focus simple dans le menu mobile.
        const focusables = [toggle, ...panelRef.current.querySelectorAll<HTMLElement>("a, button")].filter(
          Boolean,
        ) as HTMLElement[];
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || open ? "bg-paper/92 shadow-[0_1px_0_0_var(--color-line)] backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 lg:h-20 lg:px-10">
        <Link href="/" className="rounded-lg" aria-label="Retour à l'accueil">
          <Logo />
        </Link>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium text-ink/75 transition-colors hover:text-ink",
                    "after:absolute after:inset-x-4 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-bordeaux after:transition-transform after:duration-300 hover:after:scale-x-100",
                    isActive(item.href) && "text-bordeaux after:scale-x-100",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/contact#devis" className={buttonClasses("primary", "md", "max-sm:hidden")}>
            Demander un devis
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full text-ink hover:bg-ink/5 lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        ref={panelRef}
        hidden={!open}
        className="animate-fade-in h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-line bg-paper lg:hidden"
      >
        <nav aria-label="Navigation mobile" className="px-5 pt-6 pb-10 sm:px-8">
          <ul className="space-y-1">
            {[{ href: "/", label: "Accueil" }, ...mainNav].map((item, i) => (
              <li key={item.href} className="animate-rise-in" style={{ animationDelay: `${i * 40}ms` }}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={cn(
                    "flex min-h-14 items-center border-b border-line font-display text-3xl text-ink/85 hover:text-ink",
                    pathname === item.href && "text-bordeaux",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3">
            <Link href="/contact#devis" className={buttonClasses("primary", "lg")}>
              Demander un devis
            </Link>
            <Link href="/contact#rendez-vous" className={buttonClasses("secondary", "lg")}>
              Prendre rendez-vous
            </Link>
            {telHref && (
              <a href={telHref} className={buttonClasses("secondary", "lg")}>
                <Phone className="size-4" aria-hidden /> Appeler le {phoneDisplay}
              </a>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
