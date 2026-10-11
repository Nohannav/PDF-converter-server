import { useId } from "react";
import { cn } from "@/lib/cn";

/** Bandeau défilant aux mots-clés de l'univers (décoratif, contenu dupliqué masqué aux lecteurs d'écran). */
export function Marquee({ items, className }: { items: string[]; className?: string }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="px-6 font-display text-3xl italic sm:px-10 sm:text-5xl">{item}</span>
          <span aria-hidden className="text-xl text-copper-light sm:text-2xl">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={cn("marquee overflow-hidden py-6 sm:py-8", className)}>
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

/** Badge circulaire au texte tournant, signature de la marque. */
export function SpinningBadge({ text, className }: { text: string; className?: string }) {
  const id = `badge-${useId().replace(/:/g, "")}`;
  return (
    <div aria-hidden className={cn("relative size-28 sm:size-32", className)}>
      <svg viewBox="0 0 120 120" className="spin-slow absolute inset-0 size-full">
        <defs>
          <path id={id} d="M60 60 m-46 0 a46 46 0 1 1 92 0 a46 46 0 1 1 -92 0" />
        </defs>
        <circle cx="60" cy="60" r="59" fill="#b3262d" />
        <text fill="#f6f0e6" fontSize="9.5" fontWeight="700" style={{ textTransform: "uppercase" }}>
          {/* textLength ajuste l'espacement pour boucler exactement le cercle (2π × 46). */}
          <textPath href={`#${id}`} textLength="287" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-display text-3xl text-cream italic">✦</span>
    </div>
  );
}

/** Lambrequin festonné rayé, inspiré de l'auvent du combi. */
export function Awning({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <div aria-hidden className={cn("pointer-events-none h-7 w-full sm:h-9", className)}>
      <svg className="size-full" preserveAspectRatio="none" viewBox="0 0 400 36">
        <defs>
          <pattern id={`${id}-s`} width="40" height="36" patternUnits="userSpaceOnUse">
            <rect width="20" height="36" fill="#b3262d" />
            <rect x="20" width="20" height="36" fill="#eadfcb" />
          </pattern>
          <pattern id={`${id}-c`} width="20" height="36" patternUnits="userSpaceOnUse">
            <path d="M0 0 H20 V18 A10 10 0 0 1 0 18 Z" fill="white" />
          </pattern>
          <mask id={`${id}-m`}>
            <rect width="400" height="36" fill={`url(#${id}-c)`} />
          </mask>
        </defs>
        <rect width="400" height="36" fill={`url(#${id}-s)`} mask={`url(#${id}-m)`} />
      </svg>
    </div>
  );
}

/** Soulignement « fait main » tracé à l'apparition de la section. */
export function Scribble({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("relative inline-block whitespace-nowrap", className)}>
      {children}
      <svg aria-hidden viewBox="0 0 200 20" preserveAspectRatio="none" className="scribble absolute -bottom-2 left-0 h-3 w-full text-combi sm:-bottom-3 sm:h-4">
        <path d="M3 14 C 50 4, 110 3, 197 9" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" pathLength={1} strokeDasharray="1" />
      </svg>
    </span>
  );
}
