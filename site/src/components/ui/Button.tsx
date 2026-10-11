import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * primary : action principale (bordeaux) — devis, envoi.
 * secondary : action secondaire, contour sobre.
 * ghost : lien discret.
 */
type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full text-center font-semibold tracking-tight sm:whitespace-nowrap transition-all duration-300 ease-[var(--ease-soft)] disabled:cursor-not-allowed disabled:opacity-60 min-h-11";

const variants: Record<Variant, string> = {
  primary:
    "bg-bordeaux text-paper shadow-[0_12px_28px_-14px_rgba(116,35,46,0.65)] hover:bg-bordeaux-deep hover:-translate-y-0.5",
  secondary: "bg-paper text-ink ring-1 ring-ink/15 hover:ring-ink/40 hover:-translate-y-0.5",
  ghost: "text-ink underline-offset-4 hover:underline px-0! min-h-0!",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

/** Lien stylé en bouton : interne (next/link) ou externe (tel:, mailto:, https:). */
export function ButtonLink({ href, variant, size, className, children, ...rest }: ButtonLinkProps) {
  const classes = buttonClasses(variant, size, className);
  const isInternal = href.startsWith("/") || href.startsWith("#");
  if (isInternal) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={classes} {...rest}>
      {children}
    </a>
  );
}
