import { Container } from "@/components/ui/Section";
import { Breadcrumbs } from "./shared";
import { isSet } from "@/config/site";

export function LegalLayout({ title, path, children }: { title: string; path: string; children: React.ReactNode }) {
  return (
    <>
      <section className="grain bg-ink pt-28 pb-14 text-cream lg:pt-36">
        <Container>
          <Breadcrumbs items={[{ name: title, path }]} />
          <h1 className="mt-8 text-4xl font-medium sm:text-6xl">{title}</h1>
        </Container>
      </section>
      <Container className="py-16 lg:py-24">
        <div className="max-w-3xl space-y-10 leading-relaxed text-ink/85 [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mb-4 [&_h2]:text-3xl [&_h2]:font-medium [&_h2]:text-ink [&_li]:ml-5 [&_li]:list-disc [&_p+p]:mt-3 [&_ul]:mt-3 [&_ul]:space-y-1.5">
          {children}
        </div>
      </Container>
    </>
  );
}

/** Affiche la valeur si elle est renseignée, sinon un repère clairement identifié à compléter. */
export function Fill({ value }: { value: string }) {
  if (isSet(value)) return <>{value}</>;
  return <mark className="rounded bg-amber-100 px-1.5 py-0.5 font-medium text-amber-950">à compléter</mark>;
}
