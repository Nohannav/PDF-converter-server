import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { bookingConfig } from "@/config/booking";
import type { PracticalInfo } from "@/config/offers";
import { testimonials } from "@/config/testimonials";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Awning } from "@/components/ui/Brand";
import { Media } from "@/components/media/Media";
import type { ResolvedMedia } from "@/lib/media";
import { cn } from "@/lib/cn";

/** Fil d'Ariane visible (le JSON-LD correspondant est ajouté par la page). */
export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Fil d'Ariane" className="text-sm text-stone">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href="/" className="hover:text-bordeaux hover:underline">
            Accueil
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={item.path} className="flex items-center gap-1.5">
            <ChevronRight className="size-3.5" aria-hidden />
            {i === items.length - 1 ? (
              <span aria-current="page" className="text-ink">
                {item.name}
              </span>
            ) : (
              <Link href={item.path} className="hover:text-bordeaux hover:underline">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Hero des pages intérieures : titre H1 et grande image, sur fond crème. */
export function PageHero({
  eyebrow,
  title,
  intro,
  media,
  mediaTone = "day",
  breadcrumbs,
  actions,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro: React.ReactNode;
  media: ResolvedMedia;
  /** Ambiance de l'illustration provisoire (« night » pour la mini-discothèque). */
  mediaTone?: "day" | "night";
  breadcrumbs: { name: string; path: string }[];
  actions?: React.ReactNode;
}) {
  return (
    <section className="bg-cream pt-28 pb-16 text-ink lg:pt-36 lg:pb-24">
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="animate-rise-in">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="text-5xl leading-[1.02] font-medium sm:text-6xl lg:text-7xl">{title}</h1>
            <div className="mt-6 max-w-xl text-lg leading-relaxed text-stone">{intro}</div>
            {actions && <div className="mt-9 flex flex-col gap-3 sm:flex-row">{actions}</div>}
          </div>
          <Media
            media={media}
            priority
            tone={mediaTone}
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="aspect-[4/3] rounded-[2rem] shadow-[0_40px_80px_-50px_rgba(35,29,25,0.45)] ring-1 ring-line"
          />
        </div>
      </Container>
    </section>
  );
}

/** Modalités : n'affiche que des informations confirmées, sinon « Précisé lors du devis ». */
export function PracticalInfoList({ items }: { items: PracticalInfo[] }) {
  return (
    <dl className="grid gap-px overflow-hidden rounded-3xl bg-line ring-1 ring-line sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.label} className="bg-paper p-6">
          <dt className="text-sm font-semibold text-stone">{item.label}</dt>
          <dd className={cn("mt-1.5 text-base font-medium", !item.value && "text-ink/70 italic")}>
            {item.value ?? "Précisé lors du devis"}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Processus en 4 étapes. */
export function ProcessSteps() {
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
          <Reveal as="li" key={step.title} delay={i * 90} className="relative rounded-3xl bg-paper p-7 ring-1 ring-line">
            <span className="font-display text-6xl font-light text-bronze">{String(i + 1).padStart(2, "0")}</span>
            <span aria-hidden className="draw-line mt-4 block h-px bg-bordeaux/50" />
            <h3 className="mt-4 font-sans text-lg font-bold tracking-normal">{step.title}</h3>
            <p className="mt-2 leading-relaxed text-stone">{step.text}</p>
          </Reveal>
        ))}
      </ol>
      <p className="mt-6 text-sm text-stone">
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
          <Reveal as="li" key={t.author + t.context} className="flex flex-col rounded-3xl bg-paper p-8 ring-1 ring-line">
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

/** Appel à l'action final : sobre et lumineux, une action principale et une secondaire. */
export function FinalCta({
  title = "Quel sera votre prochain événement ?",
  text = "Parlez-nous de votre projet et imaginons ensemble une prestation qui vous ressemble.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <Container>
        <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-cream px-6 pt-20 pb-16 text-center ring-1 ring-line sm:px-12 sm:pb-20">
          <Awning className="absolute inset-x-0 top-0" />
          <h2 className="mx-auto max-w-3xl text-4xl leading-[1.05] font-medium sm:text-6xl">{title}</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-stone">{text}</p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/contact#devis" size="lg">
              Demander un devis <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
            <ButtonLink href="/contact#rendez-vous" variant="secondary" size="lg">
              {bookingConfig.enabled ? "Prendre rendez-vous" : "Organiser un appel"}
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
