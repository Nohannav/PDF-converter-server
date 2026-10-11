import { ArrowRight, Lightbulb, Music, Sparkles } from "lucide-react";
import { discoFaq } from "@/config/faq";
import { discoPracticalInfo } from "@/config/offers";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Faq } from "@/components/ui/Faq";
import { JsonLd } from "@/components/ui/JsonLd";
import { Media } from "@/components/media/Media";
import { Marquee, Scribble } from "@/components/ui/Brand";
import { Gallery } from "@/components/media/Gallery";
import { FinalCta, PageHero, PracticalInfoList } from "@/components/sections/shared";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { getGalleryItems, resolveMedia } from "@/lib/media";
import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

const PATH = "/mini-discotheque";
const DESCRIPTION =
  "La plus petite discothèque du monde : une caravane transformée en mini-discothèque avec piste de danse, lumières et musique. Une animation insolite pour mariages, anniversaires et soirées privées.";

export const metadata = pageMetadata({
  title: "Mini-discothèque en caravane pour mariages et soirées",
  description: DESCRIPTION,
  path: PATH,
});

const experience = [
  { icon: Sparkles, title: "L'effet « waouh »", text: "De l'extérieur, une jolie caravane vintage. À l'intérieur, une vraie boîte de nuit miniature. La surprise fonctionne à chaque fois." },
  { icon: Lightbulb, title: "Une ambiance lumineuse", text: "Jeux de lumière et atmosphère nocturne transforment l'espace en piste de danse intimiste." },
  { icon: Music, title: "Un univers musical", text: "La musique fait le reste : on entre à deux, à cinq, entre amis… et on n'a plus envie d'en sortir." },
];

const occasions = [
  { title: "Mariages", text: "Une attraction qui fait danser toutes les générations, du vin d'honneur au bout de la nuit." },
  { title: "Anniversaires", text: "Une surprise mémorable pour un anniversaire marquant, en famille ou entre amis." },
  { title: "Soirées privées", text: "Le petit plus qui rend une soirée unique et dont tout le monde reparlera." },
];

export default function DiscoPage() {
  const gallery = getGalleryItems().filter((i) => i.category === "mini-discotheque");

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({ name: "Location de mini-discothèque en caravane", description: DESCRIPTION, path: PATH, serviceType: "Animation événementielle — discothèque mobile" }),
          breadcrumbJsonLd([{ name: "La mini-discothèque", path: PATH }]),
        ]}
      />
      <PageHero
        mediaTone="night"
        eyebrow="Concept n° 2 · Mini-discothèque"
        title={
          <>
            La plus petite discothèque <em className="font-light text-bordeaux italic">du monde</em>
          </>
        }
        intro="Une caravane transformée en mini-discothèque, avec sa piste de danse, ses lumières et sa musique. Une expérience insolite, conviviale et franchement mémorable."
        media={resolveMedia("discoExterior")}
        breadcrumbs={[{ name: "La mini-discothèque", path: PATH }]}
        actions={
          <>
            <ButtonLink href="#devis" size="lg">
              Demander un devis <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
            <ButtonLink href="#experience" variant="secondary" size="lg">
              Découvrir l&apos;expérience
            </ButtonLink>
          </>
        }
      />

      <div className="border-y border-line bg-paper">
        <Marquee items={["Lumières", "Musique", "Piste de danse", "Effet waouh", "Boule à facettes", "Bonne humeur"]} />
      </div>
      <Section tone="paper" aria-labelledby="disco-concept-titre">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            id="disco-concept-titre"
            eyebrow="Le concept"
            title="Petite par la taille, immense par l'ambiance"
            intro={
              <>
                <p>
                  Imaginez une caravane posée dans le jardin, au milieu de la réception. On pousse la porte et l&apos;on
                  se retrouve dans une discothèque miniature : lumières, musique, piste de danse.
                </p>
                <p className="mt-4">
                  C&apos;est drôle, c&apos;est intime, c&apos;est terriblement photogénique. Et c&apos;est souvent là
                  que naissent les meilleurs souvenirs de la soirée.
                </p>
              </>
            }
            className="mb-0! lg:mb-0!"
          />
          <Reveal>
            <Media media={resolveMedia("discoDancefloor")} sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[4/3] rounded-[2rem] ring-1 ring-line" />
          </Reveal>
        </div>
      </Section>

      <Section id="experience" tone="cream" aria-labelledby="experience-titre">
        <SectionHeading id="experience-titre" eyebrow="L'expérience" title={<>La piste de danse la plus <Scribble>convoitée</Scribble> de la soirée</>} />
        <ul className="grid gap-6 md:grid-cols-3">
          {experience.map((e, i) => (
            <Reveal as="li" key={e.title} delay={i * 90} className="rounded-3xl bg-paper p-8 ring-1 ring-line">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-bordeaux/10 text-bordeaux">
                <e.icon className="size-6" aria-hidden />
              </span>
              <h3 className="mt-5 text-2xl font-medium">{e.title}</h3>
              <p className="mt-3 leading-relaxed text-stone">{e.text}</p>
            </Reveal>
          ))}
        </ul>
        <p className="mt-6 text-sm text-stone">
          Le détail des équipements (son, lumières, décoration) vous est présenté lors de l&apos;échange préparatoire.
        </p>
      </Section>

      <Section tone="paper" aria-labelledby="disco-usages-titre">
        <SectionHeading id="disco-usages-titre" eyebrow="Pour quels événements ?" title="Faites danser vos invités autrement" />
        <ul className="grid gap-6 md:grid-cols-3">
          {occasions.map((o, i) => (
            <Reveal as="li" key={o.title} delay={i * 90} className="border-t border-bordeaux/40 pt-6">
              <h3 className="text-3xl font-medium">{o.title}</h3>
              <p className="mt-3 leading-relaxed text-stone">{o.text}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="cream" aria-labelledby="disco-galerie-titre">
        <SectionHeading id="disco-galerie-titre" eyebrow="Galerie" title="Dans l'ambiance" />
        <Gallery items={gallery} layout="grid" />
      </Section>

      <Section tone="paper" aria-labelledby="disco-pratique-titre">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            id="disco-pratique-titre"
            eyebrow="Informations pratiques"
            title="Ce que nous validons ensemble"
            intro="Emplacement, alimentation électrique, accès, contraintes sonores : ces points techniques sont confirmés avec vous avant toute réservation."
          />
          <PracticalInfoList items={discoPracticalInfo} />
        </div>
      </Section>

      <Section tone="cream" aria-labelledby="disco-faq-titre">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading id="disco-faq-titre" eyebrow="FAQ" title="Vos questions sur la mini-discothèque" />
          <Faq items={discoFaq} />
        </div>
      </Section>

      <QuoteSection
        title="Réservez la mini-discothèque"
        intro="Indiquez la date et le lieu de votre événement : nous vous confirmons la disponibilité et vous envoyons une proposition personnalisée."
        concept="mini-disco"
      />
      <FinalCta />
    </>
  );
}
