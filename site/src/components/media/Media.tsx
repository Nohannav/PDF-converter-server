import Image from "next/image";
import type { ResolvedMedia } from "@/lib/media";
import { Illustration, type IllustrationTone } from "./illustrations";
import { cn } from "@/lib/cn";

type Props = {
  media: ResolvedMedia;
  /** Valeur `sizes` pour next/image (responsive). */
  sizes: string;
  priority?: boolean;
  tone?: IllustrationTone;
  className?: string;
  imgClassName?: string;
  /** Affiche la mention « Illustration provisoire » sur les visuels de remplacement. */
  showPlaceholderBadge?: boolean;
};

/**
 * Affiche une photo réelle si elle existe, sinon l'illustration provisoire.
 * Le parent doit définir les dimensions (ratio) : le média remplit son cadre,
 * ce qui évite tout décalage de mise en page (CLS).
 */
export function Media({
  media,
  sizes,
  priority,
  tone,
  className,
  imgClassName,
  showPlaceholderBadge = false,
}: Props) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {media.kind === "photo" ? (
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", imgClassName)}
        />
      ) : (
        <>
          <Illustration
            name={media.illustration}
            tone={tone}
            label={media.alt}
            className={cn("absolute inset-0 h-full w-full", imgClassName)}
          />
          {showPlaceholderBadge && (
            <span className="absolute bottom-3 left-3 rounded-full bg-paper/85 px-2.5 py-1 text-[0.7rem] font-medium tracking-wide text-ink ring-1 ring-line backdrop-blur-sm">
              Illustration — photo à venir
            </span>
          )}
        </>
      )}
    </div>
  );
}
