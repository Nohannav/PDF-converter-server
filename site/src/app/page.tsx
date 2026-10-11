import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Handshake, PartyPopper, Sparkles, Users } from "lucide-react";
import { bookingConfig } from "@/config/booking";
import { siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Media } from "@/components/media/Media";
import { Gallery } from "@/components/media/Gallery";
import { Marquee, Scribble, SpinningBadge } from "@/components/ui/Brand";
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
  return (
    <section className="relative overflow-hidden bg-cream pt-28 pb-16 text-ink lg:pt-36 lg:pb-24">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
        <div className="animate-rise-in">
          <Eyebrow>Bar mobile · Espace DJ · Mini-discothèque</Eyebrow>
          <h1 className="text-[2.9rem] leading-[0.98] font-medium sm:text-7xl lg:text-[5.2rem]">
            {["Faites de votre", "événement", "un moment"].map((line, i) => (
              <span key={line} className="line-in" style={{ "--d": `${i * 110}ms` } as React.CSSProperties}>
                {line}&nbsp;
              </span>
            ))}
            <em className="line-in font-light text-bordeaux italic" style={{ "--d": "380ms" } as React.CSSProperties}>
              inoubliable.
            </em>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-stone sm:text-xl">
            Un combi Volkswagen transformé en bar ou en espace DJ, une mini-discothèque itinérante… Des concepts originaux
            pour donner une autre dimension à vos événements.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <ButtonLink href="/contact#devis" size="lg">
              Demander un devis <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
            <ButtonLink href="/contact#rendez-vous" variant="secondary" size="lg">
              Organiser un appel
            </ButtonLink>
          </div>
          <Link
            href="#concepts"
            className="mt-6 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-ink/75 underline-offset-4 hover:text-bordeaux hover:underline"
          >
            Découvrir nos concepts <ArrowDown className="size-4" aria-hidden />
          </Link>
        </div>
        <div className="relative">
          <Media
            media={hero}
            priority
            tone="day"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="float-soft aspect-[4/3] animate-fade-in rounded-[2rem] shadow-[0_50px_90px_-50px_rgba(35,29,25,0.5)] ring-1 ring-line lg:aspect-square"
          />
          <SpinningBadge
            text="Bar mobile ✦ Espace DJ ✦ Disco ✦ "
            className="absolute -bottom-10 -left-4 sm:-left-10 lg:-bottom-12"
          />
        </div>
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
      <div className="border-y border-line bg-paper">
        <Marquee items={["Mariages", "Bar mobile", "Anniversaires", "Espace DJ", "Soirées privées", "Mini-discothèque", "Salons", "Lancements"]} />
      </div>

      {/* Les deux concepts */}
      <Section id="concepts" tone="paper" aria-labelledby="concepts-titre">
        <SectionHeading
          id="concepts-titre"
          eyebrow="Nos concepts"
          title={
            <>
              Deux installations, mille façons de faire <Scribble>la fête</Scribble>
            </>
          }
          intro="Choisissez l'univers qui correspond à votre événement, ou associez les deux pour créer un véritable espace festif."
        />
        <div className="grid gap-8 lg:grid-cols-2">
          {concepts.map((c, i) => (
            <Reveal as="article" key={c.href} delay={i * 120} className="spotlight group relative flex flex-col overflow-hidden rounded-[2rem] bg-paper ring-1 ring-line transition-shadow duration-500 hover:shadow-[0_30px_60px_-40px_rgba(35,29,25,0.45)]">
              <Media
                media={resolveMedia(c.slot)}
                tone={c.tone}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="aspect-[16/11]"
                imgClassName="transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-[1.03]"
              />
              <div className="flex flex-1 flex-col p-7 sm:p-10">
                <Eyebrow>{c.eyebrow}</Eyebrow>
                <h3 className="mt-3 text-3xl font-medium sm:text-4xl">
                  <Link href={c.href} className="after:absolute after:inset-0 after:content-['']">
                    {c.title}
                  </Link>
                </h3>
                <p className="mt-4 leading-relaxed text-stone">{c.text}</p>
                <ul className="mt-6 space-y-2.5">
                  {c.uses.map((u) => (
                    <li key={u} className="flex items-start gap-3 text-ink/85">
                      <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-bordeaux" />
                      {u}
                    </li>
                  ))}
                </ul>
                <span className="mt-8 inline-flex items-center gap-2 font-semibold text-bordeaux">
                  {c.cta}
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Une prestation pour chaque événement */}
      <Section tone="cream" aria-labelledby="evenements-titre">
        <SectionHeading
          id="evenements-titre"
          eyebrow="Pour quelle occasion ?"
          title="Une prestation pour chaque événement"
          intro="Particuliers ou entreprises : retrouvez votre projet et découvrez ce que nos installations peuvent lui apporter."
        />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {eventTypes.map((e, i) => (
            <Reveal as="li" key={e.title} delay={(i % 3) * 90} className="h-full">
              <Link href={e.href} className="spotlight group flex h-full flex-col overflow-hidden rounded-3xl bg-paper ring-1 ring-line">
                <Media
                  media={resolveMedia(e.slot)}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="aspect-[16/10]"
                  imgClassName="transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-[1.04]"
                />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="flex items-center justify-between text-2xl font-medium">
                    {e.title}
                    <ArrowUpRight className="size-5 text-bordeaux opacity-60 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden />
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-stone">{e.text}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Pourquoi nous choisir */}
      <Section tone="paper" aria-labelledby="pourquoi-titre">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHeading
            id="pourquoi-titre"
            eyebrow="Pourquoi nous choisir"
            title={
              <>
                L&apos;originalité, sans la <Scribble>complication</Scribble>
              </>
            }
            intro="Nous apportons l'installation, l'ambiance et l'accompagnement. Vous profitez de votre événement."
            className="lg:sticky lg:top-32 lg:self-start"
          />
          <ul className="grid gap-5 sm:grid-cols-2">
            {reasons.map((r, i) => (
              <Reveal as="li" key={r.title} delay={i * 90} className="rounded-3xl bg-cream p-7">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-bordeaux/10 text-bordeaux">
                  <r.icon className="size-6" aria-hidden />
                </span>
                <h3 className="mt-5 font-sans text-lg font-bold tracking-normal">{r.title}</h3>
                <p className="mt-2 leading-relaxed text-stone">{r.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* Galerie */}
      <Section tone="cream" aria-labelledby="galerie-titre">
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
