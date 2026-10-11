import { QuoteForm } from "@/components/forms/QuoteForm";
import { Section, SectionHeading } from "@/components/ui/Section";
import type { conceptOptions } from "@/config/offers";

/** Section « Demande de devis » réutilisée sur les pages concept. */
export function QuoteSection({
  id = "devis",
  title,
  intro,
  concept,
  variant,
}: {
  id?: string;
  title: string;
  intro: string;
  concept?: (typeof conceptOptions)[number]["value"];
  variant?: "default" | "pro";
}) {
  return (
    <Section id={id} tone="sand" aria-labelledby={`${id}-titre`}>
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeading id={`${id}-titre`} eyebrow="Demande de devis" title={title} intro={intro} className="lg:sticky lg:top-32 lg:self-start" />
        <QuoteForm defaultConcept={concept} variant={variant} clientCopyEnabled={process.env.SEND_CLIENT_CONFIRMATION === "true"} />
      </div>
    </Section>
  );
}
