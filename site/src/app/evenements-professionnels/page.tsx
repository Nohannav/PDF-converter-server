import { ArrowRight, Eye, MessagesSquare, Palette } from "lucide-react";
import { proFaq } from "@/config/faq";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Faq } from "@/components/ui/Faq";
import { JsonLd } from "@/components/ui/JsonLd";
import { Media } from "@/components/media/Media";
import { FinalCta, PageHero } from "@/components/sections/shared";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { resolveMedia } from "@/lib/media";
import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

const PATH = "/evenements-professionnels";
const DESCRIPTION =
  "Un combi Volkswagen vintage comme support de communication événementielle : salons professionnels, lancements de produits, opérations de marque, soirées d'entreprise. Demandez un devis.";

export const metadata = pageMetadata({
  title: "Combi Volkswagen pour salons et événements d'entreprise",
  description: DESCRIPTION,
  path: PATH,
});

const useCases = [
  { slot: "eventTradeshow" as const, title: "Salons professionnels", text: "Un stand qui sort du lot dans les allées et donne envie de s'arrêter." },
  { slot: "eventLaunch" as const, title: "Lancements de produits", text: "Une mise en scène qui marque les esprits pour présenter une nouveauté." },
  { slot: "combiPro" as const, title: "Opérations de marque", text: "Un support mobile et photogénique pour incarner votre marque sur le terrain." },
  { slot: "eventCorporate" as const, title: "Événements clients", text: "Un lieu d'accueil chaleureux pour recevoir clients et partenaires." },
  { slot: "eventPrivate" as const, title: "Soirées d'entreprise", text: "Bar ou espace DJ : de quoi rassembler les équipes dans une ambiance détendue." },
  { slot: "combiClosed" as const, title: "Opérations promotionnelles", text: "Inaugurations, animations commerciales, journées portes ouvertes." },
];

const benefits = [
  { icon: Eye, title: "Attirer l'attention", text: "Un véhicule vintage se repère de loin : il crée un point d'attraction naturel au milieu d'un salon ou d'un événement." },
  { icon: MessagesSquare, title: "Faciliter les échanges", text: "On s'approche par curiosité, on reste pour discuter. Le combi brise la glace avec vos visiteurs." },
  { icon: Palette, title: "S'adapter à votre projet", text: "Présentation de produits, accueil, dégustation : la configuration est étudiée selon vos objectifs, dans la limite des prestations proposées." },
];

export default function ProPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({ name: "Combi Volkswagen pour événements professionnels", description: DESCRIPTION, path: PATH, serviceType: "Support de communication événementielle" }),
          breadcrumbJsonLd([{ name: "Événements professionnels", path: PATH }]),
        ]}
      />
      <PageHero
        eyebrow="Entreprises & marques"
        title={
          <>
            Un stand que l&apos;on <em className="font-light text-bordeaux italic">n&apos;oublie pas</em>
          </>
        }
        intro="Salons, lancements, opérations de marque, soirées d'entreprise : le combi Volkswagen vintage devient un support de communication original qui attire le regard et facilite les rencontres."
        media={resolveMedia("combiPro")}
        breadcrumbs={[{ name: "Événements professionnels", path: PATH }]}
        actions={
          <>
            <ButtonLink href="#devis-pro" size="lg">
              Demander un devis entreprise <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
            <ButtonLink href="/contact#rendez-vous" variant="secondary" size="lg">
              Échanger sur votre projet
            </ButtonLink>
          </>
        }
      />

      <Section tone="paper" aria-labelledby="pro-benefices-titre">
        <SectionHeading
          id="pro-benefices-titre"
          eyebrow="Pourquoi un combi ?"
          title="Dans un salon, l'originalité est un avantage concurrentiel"
          intro="Entre deux stands standardisés, une installation inattendue retient l'attention des visiteurs et donne une image chaleureuse et créative de votre marque."
        />
        <ul className="grid gap-6 md:grid-cols-3">
          {benefits.map((b, i) => (
            <Reveal as="li" key={b.title} delay={i * 90} className="rounded-3xl bg-cream p-8">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-bordeaux/10 text-bordeaux">
                <b.icon className="size-6" aria-hidden />
              </span>
              <h3 className="mt-5 font-sans text-xl font-bold tracking-normal">{b.title}</h3>
              <p className="mt-3 leading-relaxed text-ink/70">{b.text}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="cream" aria-labelledby="pro-usages-titre">
        <SectionHeading id="pro-usages-titre" eyebrow="Cas d'usage" title="Pour quels événements professionnels ?" />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((u, i) => (
            <Reveal as="li" key={u.title} delay={(i % 3) * 90} className="overflow-hidden rounded-3xl bg-paper ring-1 ring-line">
              <Media media={resolveMedia(u.slot)} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="aspect-[16/10]" />
              <div className="p-6">
                <h3 className="text-2xl font-medium">{u.title}</h3>
                <p className="mt-2 leading-relaxed text-stone">{u.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="cream" aria-labelledby="pro-faq-titre">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading id="pro-faq-titre" eyebrow="FAQ" title="Questions fréquentes des entreprises" />
          <Faq items={proFaq} />
        </div>
      </Section>

      <QuoteSection
        id="devis-pro"
        title="Parlez-nous de votre événement professionnel"
        intro="Entreprise, type d'événement, date, lieu et besoin : ces informations nous permettent d'étudier votre projet et de vous adresser une proposition au nom de votre société."
        concept="combi-pro"
        variant="pro"
      />
      <FinalCta title="Un projet de salon ou de lancement ?" text="Échangeons quelques minutes pour voir comment le combi peut servir vos objectifs." />
    </>
  );
}
