import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

/** Monogramme provisoire : la face avant en « V » du combi. À remplacer par le logo définitif. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect width="40" height="40" rx="12" fill="#b3262d" />
      <path d="M8 16 Q8 8 16 8 L24 8 Q32 8 32 16 Z" fill="#f6f0e6" />
      <path d="M8 16 L20 27 L32 16" fill="none" stroke="#f6f0e6" strokeWidth="2.4" strokeLinejoin="round" />
      <circle cx="12.5" cy="22.5" r="2.3" fill="#f6f0e6" />
      <circle cx="27.5" cy="22.5" r="2.3" fill="#f6f0e6" />
      <rect x="7" y="30" width="26" height="2.6" rx="1.3" fill="#c38b55" />
    </svg>
  );
}

export function Logo({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark className="size-10 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className={cn("font-display text-xl font-semibold", light ? "text-cream" : "text-ink")}>
          {siteConfig.name}
        </span>
        <span className={cn("mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em]", light ? "text-cream/60" : "text-stone")}>
          {siteConfig.baseline}
        </span>
      </span>
    </span>
  );
}
