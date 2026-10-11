import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "light" | "outline-light";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full text-center font-semibold tracking-tight sm:whitespace-nowrap transition-all duration-300 ease-[var(--ease-soft)] disabled:cursor-not-allowed disabled:opacity-60 min-h-11";

const variants: Record<Variant, string> = {
  primary:
    "bg-combi text-cream shadow-[0_10px_30px_-12px_rgba(179,38,45,0.7)] hover:bg-bordeaux hover:-translate-y-0.5",
  secondary: "bg-ink text-cream hover:bg-smoke hover:-translate-y-0.5",
  ghost: "text-ink underline-offset-4 hover:underline px-0! min-h-0!",
  light: "bg-cream text-ink hover:bg-white hover:-translate-y-0.5",
  "outline-light": "border border-cream/40 text-cream hover:border-cream hover:bg-cream/10",
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
