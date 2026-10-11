import { ArrowRight, GlassWater, Music4, Store } from "lucide-react";
import { combiFaq } from "@/config/faq";
import { combiPracticalInfo } from "@/config/offers";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Faq } from "@/components/ui/Faq";
import { JsonLd } from "@/components/ui/JsonLd";
import { Media } from "@/components/media/Media";
import { Scribble } from "@/components/ui/Brand";
import { Gallery } from "@/components/media/Gallery";
import { FinalCta, PageHero, PracticalInfoList } from "@/components/sections/shared";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { getGalleryItems, resolveMedia } from "@/lib/media";
import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

const PATH = "/combi-volkswagen";
const DESCRIPTION =
  "Location d'un combi Volkswagen vintage rouge et blanc aménagé en bar mobile, en espace DJ ou en stand pour votre mariage, votre soirée ou votre salon professionnel. Demandez votre devis.";

export const metadata = pageMetadata({
  title: "Location combi Volkswagen bar mobile & DJ pour événements",
  description: DESCRIPTION,
  path: PATH,
});

const configurations = [
  {
    id: "bar",
    icon: GlassWater,
    slot: "combiBar" as const,
    title: "Le combi bar",
    text: "Le flanc du combi s'ouvre sur un comptoir : un véritable bar mobile pour servir cocktails, champagne ou boissons fraîches lors d'un mariage, d'un anniversaire ou d'une réception.",
    points: ["Point de rendez-vous naturel des invités", "Décor photogénique pour le vin d'honneur", "Service adapté à votre réception"],
  },
  {
    id: "dj",
    icon: Music4,
    slot: "combiDj" as const,
    title: "Le combi DJ",
    text: "Le combi devient une cabine DJ au charme rétro. Le DJ y mixe et anime la soirée depuis un décor qui attire tous les regards.",
    points: ["Une scène originale pour la soirée", "Un repère visuel pour la piste de danse", "Idéal en extérieur comme sous chapiteau"],
  },
  {
    id: "pro",
    icon: Store,
    slot: "combiPro" as const,
    title: "Le combi événementiel professionnel",
    text: "Sur un salon, un lancement ou une opération de marque, le combi sert de support pour présenter une entreprise, des produits ou accueillir des visiteurs.",
    points: ["Un stand qui se remarque de loin", "Un support pour engager la conversation", "Configuration étudiée selon votre projet"],
  },
];

const occasions = [
  { title: "Mariages", text: "Au vin d'honneur, le combi bar accueille vos invités dans une ambiance chic et décontractée. En soirée, il peut céder la place au DJ." },
  { title: "Soirées et anniversaires", text: "Un décor vintage qui donne immédiatement le ton : la fête commence dès que l'on aperçoit le combi." },
  { title: "Salons et événements d'entreprise", text: "Sur un stand ou en extérieur, il attire l'attention et crée un lieu d'échange convivial avec vos visiteurs." },
];

export default function CombiPage() {
  const gallery = getGalleryItems().filter((i) => ["combi-bar", "dj-soirees", "evenements-pro"].includes(i.category));

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({ name: "Location de combi Volkswagen événementiel", description: DESCRIPTION, path: PATH, serviceType: "Location de bar mobile et animation événementielle" }),
          breadcrumbJsonLd([{ name: "Le combi Volkswagen", path: PATH }]),
        ]}
      />
      <PageHero
        eyebrow="Concept n° 1 · Combi Volkswagen"
        title={
          <>
            Le combi qui fait <em className="font-light text-bordeaux italic">l&apos;événement</em>
          </>
        }
        intro="Un authentique combi Volkswagen vintage, rouge et blanc, aménagé en bar mobile, en espace DJ ou en stand de marque. Le décor et l'animation, réunis dans un seul véhicule."
        media={resolveMedia("combiBar")}
        breadcrumbs={[{ name: "Le combi Volkswagen", path: PATH }]}
        actions={
          <>
            <ButtonLink href="#devis" size="lg">
              Demander un devis <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
            <ButtonLink href="#configurations" variant="secondary" size="lg">
              Voir les configurations
            </ButtonLink>
          </>
        }
      />

      {/* Concept */}
      <Section tone="paper" aria-labelledby="concept-titre">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            id="concept-titre"
            eyebrow="Le concept"
            title="Un icône vintage au cœur de votre réception"
            intro={
              <>
                <p>
                  Le combi Volkswagen a ce pouvoir rare : il fait sourire tout le monde. Avec sa carrosserie bicolore et
                  ses lignes arrondies, il apporte immédiatement une touche de charme et de convivialité.
                </p>
                <p className="mt-4">
                  Aménagé pour l&apos;événementiel, il ne se contente pas de décorer : il devient un lieu de vie, là où
                  l&apos;on trinque, où l&apos;on danse, où l&apos;on se retrouve.
                </p>
              </>
            }
            className="mb-0! lg:mb-0!"
          />
          <Reveal>
            <Media media={resolveMedia("combiClosed")} sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[4/3] rounded-[2rem]" />
          </Reveal>
        </div>
      </Section>

      {/* Configurations */}
      <Section id="configurations" tone="cream" aria-labelledby="configurations-titre">
        <SectionHeading
          id="configurations-titre"
          eyebrow="Configurations"
          title={<>Un véhicule, plusieurs <Scribble>vies</Scribble></>}
          intro="Le combi s'adapte à votre événement. Besoin d'une installation particulière ? Parlez-nous de votre idée : nous vous dirons ce qui est réalisable."
        />
        <div className="space-y-8">
          {configurations.map((c, i) => (
            <Reveal as="article" key={c.id} className="spotlight grid overflow-hidden rounded-[2rem] bg-paper ring-1 ring-line lg:grid-cols-2">
              <Media
                media={resolveMedia(c.slot)}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className={i % 2 === 1 ? "aspect-[4/3] lg:order-2 lg:aspect-auto lg:min-h-[26rem]" : "aspect-[4/3] lg:aspect-auto lg:min-h-[26rem]"}
              />
              <div id={c.id} className="flex flex-col justify-center p-7 sm:p-12">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-bordeaux/10 text-bordeaux">
                  <c.icon className="size-6" aria-hidden />
                </span>
                <h3 className="mt-6 text-3xl font-medium sm:text-4xl">{c.title}</h3>
                <p className="mt-4 leading-relaxed text-ink/75">{c.text}</p>
                <ul className="mt-6 space-y-2.5">
                  {c.points.map((p) => (
                    <li key={p} className="flex items-start gap-3">
                      <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-bordeaux" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
          <Reveal className="rounded-[2rem] border border-dashed border-ink/20 p-8 sm:p-12">
            <h3 className="text-2xl font-medium sm:text-3xl">Et sur mesure ?</h3>
            <p className="mt-3 max-w-2xl leading-relaxed text-ink/75">
              Une idée particulière pour votre événement ? Décrivez-la dans votre demande de devis : nous étudions avec
              vous les adaptations possibles parmi les configurations que nous proposons.
            </p>
            <ButtonLink href="#devis" variant="secondary" className="mt-6">
              Décrire mon projet
            </ButtonLink>
          </Reveal>
        </div>
      </Section>

      {/* Exemples d'utilisation */}
      <Section tone="cream" aria-labelledby="usages-titre">
        <SectionHeading id="usages-titre" eyebrow="Exemples d'utilisation" title="Mariages, soirées, salons : il trouve toujours sa place" />
        <ul className="grid gap-6 md:grid-cols-3">
          {occasions.map((o, i) => (
            <Reveal as="li" key={o.title} delay={i * 90} className="rounded-3xl bg-paper p-8 ring-1 ring-line">
              <h3 className="text-2xl font-medium">{o.title}</h3>
              <p className="mt-3 leading-relaxed text-stone">{o.text}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Galerie */}
      {gallery.length > 0 && (
      <Section tone="paper" aria-labelledby="combi-galerie-titre">
        <SectionHeading id="combi-galerie-titre" eyebrow="Galerie" title="Le combi en images" />
        <Gallery items={gallery} layout="grid" />
      </Section>
      )}

      {/* Modalités */}
      <Section tone="cream" aria-labelledby="modalites-titre">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            id="modalites-titre"
            eyebrow="Modalités"
            title="Comment se déroule la prestation"
            intro="Chaque événement est différent : ces points sont précisés noir sur blanc dans votre proposition personnalisée, avant toute réservation."
          />
          <PracticalInfoList items={combiPracticalInfo} />
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="paper" aria-labelledby="faq-titre">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading id="faq-titre" eyebrow="FAQ" title="Vos questions sur le combi" />
          <Faq items={combiFaq} />
        </div>
      </Section>

      <QuoteSection
        title="Réservez le combi pour votre événement"
        intro="Décrivez votre projet en quelques minutes : vous recevez une proposition personnalisée, sans engagement."
        concept="combi-bar"
      />
      <FinalCta title="Envie d'associer le combi et la mini-discothèque ?" text="Les deux concepts se complètent parfaitement pour créer un véritable espace festif. Parlons-en." />
    </>
  );
}
