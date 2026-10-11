import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow } from "@/components/ui/Section";
import { Illustration } from "@/components/media/illustrations";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="bg-cream pt-32 pb-24 text-ink lg:pt-40">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <Eyebrow>Erreur 404</Eyebrow>
          <h1 className="mt-5 text-5xl font-medium sm:text-6xl">Cette page a pris la route sans nous.</h1>
          <p className="mt-6 max-w-lg text-lg text-stone">
            L&apos;adresse demandée n&apos;existe pas ou a été déplacée. Retrouvez nos concepts depuis l&apos;accueil.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/" variant="secondary" size="lg">
              Retour à l&apos;accueil
            </ButtonLink>
            <ButtonLink href="/contact#devis" size="lg">
              Demander un devis
            </ButtonLink>
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] ring-1 ring-line">
          <Illustration name="combi-closed" className="absolute inset-0 h-full w-full" />
        </div>
      </Container>
    </section>
  );
}
