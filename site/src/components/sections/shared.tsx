import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { bookingConfig } from "@/config/booking";
import type { PracticalInfo } from "@/config/offers";
import { testimonials } from "@/config/testimonials";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Media } from "@/components/media/Media";
import type { ResolvedMedia } from "@/lib/media";
import { cn } from "@/lib/cn";

/** Fil d'Ariane visible (le JSON-LD correspondant est ajouté par la page). */
export function Breadcrumbs({ items, light = true }: { items: { name: string; path: string }[]; light?: boolean }) {
  return (
    <nav aria-label="Fil d'Ariane" className={cn("text-sm", light ? "text-cream/65" : "text-stone")}>
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href="/" className="hover:underline">
            Accueil
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={item.path} className="flex items-center gap-1.5">
            <ChevronRight className="size-3.5" aria-hidden />
            {i === items.length - 1 ? (
              <span aria-current="page" className={light ? "text-cream" : "text-ink"}>
                {item.name}
              </span>
            ) : (
              <Link href={item.path} className="hover:underline">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Hero des pages intérieures : grande image + titre H1. */
export function PageHero({
  eyebrow,
  title,
  intro,
  media,
  breadcrumbs,
  tone = "ink",
  actions,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro: React.ReactNode;
  media: ResolvedMedia;
  breadcrumbs: { name: string; path: string }[];
  tone?: "ink" | "night";
  actions?: React.ReactNode;
}) {
  return (
    <section className={cn("grain relative overflow-hidden pt-28 pb-16 text-cream lg:pt-36 lg:pb-24", tone === "night" ? "bg-night" : "bg-ink")}>
      {tone === "night" && (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="disco-glow absolute -top-1/3 -left-1/4 size-[70vmax] rounded-full bg-[radial-gradient(circle,rgba(224,88,122,0.22),transparent_60%)]" />
          <div className="disco-glow absolute -right-1/4 -bottom-1/2 size-[70vmax] rounded-full bg-[radial-gradient(circle,rgba(107,63,160,0.3),transparent_60%)] [animation-delay:-7s]" />
        </div>
      )}
      <Container className="relative">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="animate-rise-in">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-copper-light">{eyebrow}</p>
            <h1 className="text-5xl leading-[1.02] font-medium sm:text-6xl lg:text-7xl">{title}</h1>
            <div className="mt-6 max-w-xl text-lg leading-relaxed text-cream/80">{intro}</div>
            {actions && <div className="mt-9 flex flex-col gap-3 sm:flex-row">{actions}</div>}
          </div>
          <Media
            media={media}
            priority
            tone="night"
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="aspect-[4/3] rounded-[2rem] shadow-[0_40px_100px_-40px_rgba(0,0,0,0.8)] ring-1 ring-cream/10"
          />
        </div>
      </Container>
    </section>
  );
}

/** Modalités : n'affiche que des informations confirmées, sinon « Précisé lors du devis ». */
export function PracticalInfoList({ items, dark = false }: { items: PracticalInfo[]; dark?: boolean }) {
  return (
    <dl className={cn("grid gap-px overflow-hidden rounded-3xl sm:grid-cols-2", dark ? "bg-cream/10" : "bg-ink/10")}>
      {items.map((item) => (
        <div key={item.label} className={cn("p-6", dark ? "bg-night-2" : "bg-paper")}>
          <dt className={cn("text-sm font-semibold", dark ? "text-cream/60" : "text-stone")}>{item.label}</dt>
          <dd className={cn("mt-1.5 text-base font-medium", !item.value && (dark ? "text-cream/80 italic" : "text-ink/70 italic"))}>
            {item.value ?? "Précisé lors du devis"}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Processus en 4 étapes. */
export function ProcessSteps({ dark = false }: { dark?: boolean }) {
  const steps = [
    { title: "Vous présentez votre événement", text: "Date, lieu, type d'événement, nombre d'invités : quelques minutes suffisent via le formulaire." },
    { title: "Nous échangeons sur vos besoins", text: "Par téléphone ou par e-mail, nous précisons ensemble la configuration et les contraintes du lieu." },
    { title: "Vous recevez une proposition personnalisée", text: "Un devis détaillé, adapté à votre projet, sans engagement de votre part." },
    { title: "Nous préparons ensemble votre événement", text: "Une fois la proposition validée, nous organisons les derniers détails avec vous." },
  ];
  return (
    <div>
      <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <Reveal as="li" key={step.title} delay={i * 90} className={cn("relative rounded-3xl p-7", dark ? "bg-cream/5 ring-1 ring-cream/10" : "bg-paper ring-1 ring-ink/5")}>
            <span className="font-display text-6xl font-light text-copper">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-4 font-sans text-lg font-bold tracking-normal">{step.title}</h3>
            <p className={cn("mt-2 leading-relaxed", dark ? "text-cream/70" : "text-ink/70")}>{step.text}</p>
          </Reveal>
        ))}
      </ol>
      <p className={cn("mt-6 text-sm", dark ? "text-cream/55" : "text-stone")}>
        Les modalités définitives (acompte, délais, conditions) sont précisées par l&apos;agence dans chaque proposition.
      </p>
    </div>
  );
}

/** Avis clients : section masquée tant qu'aucun avis authentique n'est renseigné. */
export function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <Section tone="cream" aria-labelledby="avis-titre">
      <SectionHeading id="avis-titre" eyebrow="Ils nous ont fait confiance" title="Ce qu'en disent nos clients" />
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <Reveal as="li" key={t.author + t.context} className="flex flex-col rounded-3xl bg-paper p-8 ring-1 ring-ink/5">
            <blockquote className="flex-1 font-display text-xl leading-snug">« {t.quote} »</blockquote>
            <p className="mt-6 text-sm font-semibold">{t.author}</p>
            <p className="text-sm text-stone">
              {t.context}
              {t.sourceUrl && (
                <>
                  {" · "}
                  <a href={t.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                    Voir l&apos;avis
                  </a>
                </>
              )}
            </p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

/** Appel à l'action final. */
export function FinalCta({
  title = "Quel sera votre prochain événement ?",
  text = "Parlez-nous de votre projet et imaginons ensemble une prestation qui vous ressemble.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="grain relative overflow-hidden bg-combi py-20 text-cream sm:py-28">
      <div aria-hidden className="absolute -top-40 -right-40 size-[36rem] rounded-full border border-cream/10" />
      <div aria-hidden className="absolute -top-20 -right-20 size-[24rem] rounded-full border border-cream/10" />
      <Container className="relative">
        <Reveal className="max-w-3xl">
          <h2 className="text-4xl leading-[1.05] font-medium sm:text-6xl">{title}</h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/85">{text}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact#devis" variant="light" size="lg">
              Demander un devis <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
            <ButtonLink href="/contact#rendez-vous" variant="outline-light" size="lg">
              {bookingConfig.enabled ? "Prendre rendez-vous" : "Organiser un appel"}
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
