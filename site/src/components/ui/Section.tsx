import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

type Tone = "paper" | "cream" | "sand" | "ink" | "night";

const tones: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  cream: "bg-cream text-ink",
  sand: "bg-sand text-ink",
  ink: "bg-ink text-cream grain",
  night: "bg-night text-cream grain",
};

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10", className)}>{children}</div>;
}

export function Section({
  id,
  tone = "paper",
  className,
  containerClassName,
  children,
  "aria-labelledby": labelledBy,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
  "aria-labelledby"?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("py-20 sm:py-24 lg:py-32", tones[tone], className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("mb-4 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-copper", className)}>
      <span aria-hidden className="h-px w-8 bg-current" />
      {children}
    </p>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  align = "left",
  className,
  as: Tag = "h2",
}: {
  id?: string;
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <Reveal className={cn("mb-12 max-w-3xl lg:mb-16", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow className={align === "center" ? "justify-center" : undefined}>{eyebrow}</Eyebrow>}
      <Tag id={id} className="text-4xl leading-[1.05] font-medium sm:text-5xl lg:text-[3.5rem]">
        {title}
      </Tag>
      {intro && <div className="mt-5 text-lg leading-relaxed opacity-80">{intro}</div>}
    </Reveal>
  );
}
