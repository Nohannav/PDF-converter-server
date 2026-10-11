import { Gallery } from "@/components/media/Gallery";
import { Container, Section, Eyebrow } from "@/components/ui/Section";
import { JsonLd } from "@/components/ui/JsonLd";
import { Breadcrumbs, FinalCta } from "@/components/sections/shared";
import { getGalleryFilters, getGalleryItems } from "@/lib/media";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

const PATH = "/galerie";

export const metadata = pageMetadata({
  title: "Galerie photos : combi bar, DJ et mini-discothèque",
  description:
    "Le combi Volkswagen en configuration bar, DJ ou stand professionnel, et la mini-discothèque en caravane : découvrez nos installations en images.",
  path: PATH,
});

export default function GalleryPage() {
  const items = getGalleryItems();
  const filters = getGalleryFilters(items);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Galerie", path: PATH }])} />
      <section className="bg-cream pt-28 pb-16 text-ink lg:pt-36 lg:pb-20">
        <Container>
          <Breadcrumbs items={[{ name: "Galerie", path: PATH }]} />
          <div className="mt-8 max-w-3xl animate-rise-in">
            <Eyebrow>Galerie</Eyebrow>
            <h1 className="text-5xl leading-[1.02] font-medium sm:text-6xl lg:text-7xl">Nos installations en images</h1>
            <p className="mt-6 text-lg leading-relaxed text-stone">
              Le combi en configuration bar, DJ ou stand professionnel, et la mini-discothèque de jour comme de nuit.
              Cliquez sur une image pour l&apos;afficher en plein écran.
            </p>
          </div>
        </Container>
      </section>
      <Section tone="paper" className="pt-12 sm:pt-16 lg:pt-20">
        <h2 className="sr-only">Photos</h2>
        <Gallery items={items} filters={filters} />
      </Section>
      <FinalCta />
    </>
  );
}
