import Link from "next/link";
import { ArrowRight, ArrowUpRight, Handshake, PartyPopper, Sparkles, Users } from "lucide-react";
import { bookingConfig } from "@/config/booking";
import { siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Media } from "@/components/media/Media";
import { Gallery } from "@/components/media/Gallery";
import { FinalCta, ProcessSteps, Testimonials } from "@/components/sections/shared";
import { getGalleryItems, resolveMedia } from "@/lib/media";
import { pageMetadata } from "@/lib/seo";
import type { MediaSlotKey } from "@/config/media";

export const metadata = pageMetadata({
  title: `${siteConfig.name} — Combi Volkswagen bar & DJ, mini-discothèque pour vos événements`,
  description:
    "Combi Volkswagen vintage transformé en bar mobile ou en espace DJ, mini-discothèque dans une caravane : des animations originales pour mariages, anniversaires, soirées et événements d'entreprise. Devis personnalisé.",
  path: "/",
});

function HomeHero() {
  const hero = resolveMedia("heroCombi");
  const actions = (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <ButtonLink href="#concepts" variant="light" size="lg">
        Découvrir nos concepts
      </ButtonLink>
      <ButtonLink href="/contact#devis" variant="primary" size="lg">
        Demander un devis <ArrowRight className="size-4" aria-hidden />
      </ButtonLink>
      <Link href="/contact#rendez-vous" className="inline-flex min-h-11 items-center justify-center gap-1 px-3 text-sm font-semibold text-cream/80 underline-offset-4 hover:text-cream hover:underline">
        Organiser un appel <ArrowUpRight className="size-4" aria-hidden />
      </Link>
    </div>
  );
  const text = (
    <>
      <p className="mb-6 text-xs font-bold uppercase tracking-[0.24em] text-copper-light">
        Bar mobile · Espace DJ · Mini-discothèque
      </p>
      <h1 className="text-[2.9rem] leading-[0.98] font-medium sm:text-7xl lg:text-[5.4rem]">
        Faites de votre événement un moment <em className="font-light text-copper-light italic">inoubliable.</em>
      </h1>
      <p className="mt-7 max-w-xl text-lg leading-relaxed text-cream/80 sm:text-xl">
        Un combi Volkswagen transformé en bar ou en espace DJ, une mini-discothèque itinérante… Des concepts originaux
        pour donner une autre dimension à vos événements.
      </p>
      <div className="mt-10">{actions}</div>
    </>
  );

  // Photo réelle disponible : plein écran avec voile pour la lisibilité.
  if (hero.kind === "photo") {
    return (
      <section className="relative flex min-h-[92svh] items-end overflow-hidden bg-ink text-cream">
        <Media media={hero} priority sizes="100vw" className="absolute inset-0" imgClassName="object-[60%_center]" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/20 lg:bg-gradient-to-r lg:from-ink/90 lg:via-ink/50 lg:to-transparent" />
        <Container className="relative pt-32 pb-16 lg:pb-24">
          <div className="max-w-3xl animate-rise-in">{text}</div>
        </Container>
      </section>
    );
  }

  // Sans photo : composition avec l'illustration du combi.
  return (
    <section className="grain relative overflow-hidden bg-ink pt-28 pb-14 text-cream lg:min-h-[92svh] lg:pt-36 lg:pb-20">
      <div aria-hidden className="absolute top-1/3 right-0 size-[60vmax] translate-x-1/3 rounded-full bg-[radial-gradient(circle,rgba(195,139,85,0.18),transparent_65%)]" />
      <Container className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div className="animate-rise-in">{text}</div>
        <Media
          media={hero}
          priority
          tone="night"
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="aspect-[4/3] animate-fade-in rounded-[2rem] shadow-[0_50px_120px_-40px_rgba(0,0,0,0.9)] ring-1 ring-cream/10 lg:aspect-square"
        />
      </Container>
    </section>
  );
}

const concepts = [
  {
    slot: "combiBar" as MediaSlotKey,
    eyebrow: "Concept n° 1",
    title: "Le combi Volkswagen événementiel",
    text: "Un authentique combi vintage rouge et blanc, à la fois décor et lieu de vie de votre réception. Il se configure selon votre événement.",
    uses: ["Bar mobile pour cocktails et réceptions", "Espace DJ pour animer la soirée", "Stand original pour les marques et salons"],
    href: "/combi-volkswagen",
    cta: "Découvrir le combi",
    tone: "day" as const,
  },
  {
    slot: "discoExterior" as MediaSlotKey,
    eyebrow: "Concept n° 2",
    title: "La plus petite discothèque du monde",
    text: "Une caravane transformée en mini-discothèque : lumières, musique, piste de danse. On y entre, on danse, on en ressort avec le sourire.",
    uses: ["Mariages et vins d'honneur", "Anniversaires et fêtes de famille", "Soirées privées et événements insolites"],
    href: "/mini-discotheque",
    cta: "Découvrir la mini-discothèque",
    tone: "night" as const,
  },
];

const eventTypes: { slot: MediaSlotKey; title: string; text: string; href: string }[] = [
  { slot: "eventWedding", title: "Mariages", text: "Un bar qui devient le point de rendez-vous du vin d'honneur, une piste qui ne désemplit pas.", href: "/combi-volkswagen" },
  { slot: "eventBirthday", title: "Anniversaires", text: "Un décor qui marque le coup et une animation dont on parlera longtemps.", href: "/mini-discotheque" },
  { slot: "eventPrivate", title: "Soirées privées", text: "Recevoir autrement, dans une ambiance conviviale et festive.", href: "/mini-discotheque" },
  { slot: "eventCorporate", title: "Événements d'entreprise", text: "Séminaires, soirées d'équipe, événements clients : une touche d'originalité.", href: "/evenements-professionnels" },
  { slot: "eventTradeshow", title: "Salons professionnels", text: "Un stand qui attire le regard et invite naturellement à l'échange.", href: "/evenements-professionnels" },
  { slot: "eventLaunch", title: "Lancements de produits", text: "Une mise en scène mémorable pour présenter une nouveauté.", href: "/evenements-professionnels" },
];

const reasons = [
  { icon: Sparkles, title: "Des concepts originaux", text: "Un combi vintage et une discothèque miniature : des installations que vos invités n'ont pas l'habitude de voir." },
  { icon: PartyPopper, title: "Une expérience qui marque", text: "Plus qu'un service, un moment que l'on photographie, que l'on partage et dont on se souvient." },
  { icon: Users, title: "Particuliers et professionnels", text: "De la fête de famille au salon professionnel, chaque configuration s'adapte au contexte." },
  { icon: Handshake, title: "Un accompagnement personnalisé", text: "Un interlocuteur à l'écoute pour préparer l'événement avec vous, de la demande au jour J." },
];

export default function HomePage() {
  const galleryItems = getGalleryItems().slice(0, 6);

  return (
    <>
      <HomeHero />

      {/* Les deux concepts */}
      <Section id="concepts" tone="paper" aria-labelledby="concepts-titre">
        <SectionHeading
          id="concepts-titre"
          eyebrow="Nos concepts"
          title="Deux installations, mille façons de faire la fête"
          intro="Choisissez l'univers qui correspond à votre événement, ou associez les deux pour créer un véritable espace festif."
        />
        <div className="grid gap-8 lg:grid-cols-2">
          {concepts.map((c, i) => (
            <Reveal as="article" key={c.href} delay={i * 120} className="group relative flex flex-col overflow-hidden rounded-[2rem] bg-cream ring-1 ring-ink/5">
              <Media
                media={resolveMedia(c.slot)}
                tone={c.tone}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="aspect-[16/11]"
                imgClassName="transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-[1.03]"
              />
              <div className="flex flex-1 flex-col p-7 sm:p-10">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-copper">{c.eyebrow}</p>
                <h3 className="mt-3 text-3xl font-medium sm:text-4xl">
                  <Link href={c.href} className="after:absolute after:inset-0 after:content-['']">
                    {c.title}
                  </Link>
                </h3>
                <p className="mt-4 leading-relaxed text-ink/75">{c.text}</p>
                <ul className="mt-6 space-y-2.5">
                  {c.uses.map((u) => (
                    <li key={u} className="flex items-start gap-3 text-ink/85">
                      <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-combi" />
                      {u}
                    </li>
                  ))}
                </ul>
                <span className="mt-8 inline-flex items-center gap-2 font-semibold text-combi">
                  {c.cta}
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Une prestation pour chaque événement */}
      <Section tone="ink" aria-labelledby="evenements-titre">
        <SectionHeading
          id="evenements-titre"
          eyebrow="Pour quelle occasion ?"
          title="Une prestation pour chaque événement"
          intro="Particuliers ou entreprises : retrouvez votre projet et découvrez ce que nos installations peuvent lui apporter."
        />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {eventTypes.map((e, i) => (
            <Reveal as="li" key={e.title} delay={(i % 3) * 90}>
              <Link href={e.href} className="group relative block overflow-hidden rounded-3xl">
                <Media
                  media={resolveMedia(e.slot)}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="aspect-[4/3]"
                  imgClassName="transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink via-ink/50 to-transparent p-6">
                  <h3 className="flex items-center justify-between text-2xl font-medium text-cream">
                    {e.title}
                    <ArrowUpRight className="size-5 opacity-60 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden />
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-cream/75">{e.text}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Pourquoi nous choisir */}
      <Section tone="cream" aria-labelledby="pourquoi-titre">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHeading
            id="pourquoi-titre"
            eyebrow="Pourquoi nous choisir"
            title="L'originalité, sans la complication"
            intro="Nous apportons l'installation, l'ambiance et l'accompagnement. Vous profitez de votre événement."
            className="lg:sticky lg:top-32 lg:self-start"
          />
          <ul className="grid gap-5 sm:grid-cols-2">
            {reasons.map((r, i) => (
              <Reveal as="li" key={r.title} delay={i * 90} className="rounded-3xl bg-paper p-7 ring-1 ring-ink/5">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-combi/10 text-combi">
                  <r.icon className="size-6" aria-hidden />
                </span>
                <h3 className="mt-5 font-sans text-lg font-bold tracking-normal">{r.title}</h3>
                <p className="mt-2 leading-relaxed text-ink/70">{r.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* Galerie */}
      <Section tone="paper" aria-labelledby="galerie-titre">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading id="galerie-titre" eyebrow="Galerie" title="En images" className="mb-0! lg:mb-0!" />
          <ButtonLink href="/galerie" variant="secondary" className="self-start sm:self-auto">
            Voir toute la galerie <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </div>
        <div className="mt-12">
          <Gallery items={galleryItems} layout="grid" />
        </div>
      </Section>

      {/* Comment ça marche */}
      <Section tone="sand" aria-labelledby="process-titre">
        <SectionHeading
          id="process-titre"
          eyebrow="Comment ça marche ?"
          title="Quatre étapes, zéro prise de tête"
        />
        <ProcessSteps />
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/contact#devis" size="lg">
            Présenter mon événement <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
          <ButtonLink href="/contact#rendez-vous" variant="secondary" size="lg">
            {bookingConfig.enabled ? "Réserver un appel" : "Être rappelé(e)"}
          </ButtonLink>
        </div>
      </Section>

      <Testimonials />
      <FinalCta />
    </>
  );
}
