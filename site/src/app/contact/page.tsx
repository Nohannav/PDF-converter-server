import { CalendarDays, FileText, Mail, MapPin, Phone, PhoneCall } from "lucide-react";
import { bookingConfig } from "@/config/booking";
import { generalFaq } from "@/config/faq";
import { isSet, siteConfig, telHref } from "@/config/site";
import { BookingEmbed } from "@/components/forms/BookingEmbed";
import { CallbackForm } from "@/components/forms/CallbackForm";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { Container, Section, SectionHeading, Eyebrow } from "@/components/ui/Section";
import { Faq } from "@/components/ui/Faq";
import { JsonLd } from "@/components/ui/JsonLd";
import { Breadcrumbs } from "@/components/sections/shared";
import { buildMailto } from "@/lib/mailto";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

const PATH = "/contact";

export const metadata = pageMetadata({
  title: "Contact et devis : combi bar, DJ, mini-discothèque",
  description:
    "Demandez un devis personnalisé, réservez un appel ou demandez à être rappelé : choisissez le moyen le plus simple pour nous parler de votre événement.",
  path: PATH,
});

export default function ContactPage() {
  const tel = telHref();
  const { contact, address, serviceArea, openingHoursLabel } = siteConfig;
  const options = [
    { href: "#devis", icon: FileText, title: "Demander un devis", text: "Le plus complet : décrivez votre événement en 4 étapes." },
    {
      href: "#rendez-vous",
      icon: CalendarDays,
      title: "Prendre rendez-vous",
      text: bookingConfig.enabled ? `Réservez un appel de ${bookingConfig.durationMinutes} minutes.` : "Planifiez un échange téléphonique.",
    },
    { href: "#rappel", icon: PhoneCall, title: "Être rappelé(e)", text: "Laissez votre numéro, nous vous rappelons." },
    { href: "#coordonnees", icon: Mail, title: "Nous écrire", text: "Toutes nos coordonnées directes." },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Contact et devis", path: PATH }])} />
      <section className="bg-cream pt-28 pb-16 text-ink lg:pt-36 lg:pb-20">
        <Container>
          <Breadcrumbs items={[{ name: "Contact et devis", path: PATH }]} />
          <div className="mt-8 max-w-3xl animate-rise-in">
            <Eyebrow>Contact & devis</Eyebrow>
            <h1 className="text-5xl leading-[1.02] font-medium sm:text-6xl lg:text-7xl">Parlons de votre événement</h1>
            <p className="mt-6 text-lg leading-relaxed text-stone">
              Choisissez le moyen qui vous convient le mieux : nous vous répondons personnellement.
            </p>
          </div>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {options.map((o) => (
              <li key={o.href}>
                <a href={o.href} className="group flex h-full flex-col rounded-3xl bg-paper p-6 ring-1 ring-line transition-all hover:-translate-y-0.5 hover:ring-bordeaux/40">
                  <o.icon className="size-6 text-bordeaux" aria-hidden />
                  <span className="mt-4 text-lg font-semibold">{o.title}</span>
                  <span className="mt-1 text-sm leading-relaxed text-stone">{o.text}</span>
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Section id="devis" tone="sand" aria-labelledby="devis-titre">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            id="devis-titre"
            eyebrow="Demande de devis"
            title="Décrivez votre projet"
            intro={
              <>
                <p>Quatre étapes rapides, un récapitulatif avant l&apos;envoi, et une réponse personnalisée de notre part.</p>
                <p className="mt-4 text-base">Les informations transmises servent uniquement à traiter votre demande.</p>
              </>
            }
            className="lg:sticky lg:top-32 lg:self-start"
          />
          <QuoteForm clientCopyEnabled={process.env.SEND_CLIENT_CONFIRMATION === "true"} />
        </div>
      </Section>

      <Section id="rendez-vous" tone="paper" aria-labelledby="rdv-titre">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            id="rdv-titre"
            eyebrow="Rendez-vous téléphonique"
            title="Réservez un créneau pour en parler"
            intro="Un échange de vive voix est souvent le plus simple pour imaginer votre événement ensemble."
          />
          {bookingConfig.enabled ? (
            <BookingEmbed
              embedUrl={bookingConfig.embedUrl}
              url={bookingConfig.url}
              provider={bookingConfig.provider}
              durationMinutes={bookingConfig.durationMinutes}
            />
          ) : (
            <div className="rounded-3xl bg-cream p-6 sm:p-8">
              <CalendarDays className="size-9 text-bordeaux" aria-hidden />
              <p className="mt-4 text-lg font-semibold">La réservation en ligne arrive bientôt.</p>
              <p className="mt-2 leading-relaxed text-ink/75">
                En attendant, indiquez-nous le jour et le moment qui vous conviennent grâce au formulaire de rappel
                ci-dessous : nous vous recontactons pour fixer l&apos;échange.
              </p>
              <a href="#rappel" className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-bordeaux underline underline-offset-4">
                <PhoneCall className="size-4" aria-hidden /> Demander à être rappelé(e)
              </a>
            </div>
          )}
        </div>
      </Section>

      <Section id="rappel" tone="cream" aria-labelledby="rappel-titre">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            id="rappel-titre"
            eyebrow="Rappel téléphonique"
            title="Nous vous rappelons"
            intro="Laissez votre numéro et le moment qui vous arrange : nous vous rappelons pour échanger sur votre projet."
          />
          <CallbackForm />
        </div>
      </Section>

      <Section id="coordonnees" tone="paper" aria-labelledby="coordonnees-titre">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading id="coordonnees-titre" eyebrow="Coordonnées" title="Nous joindre directement" />
          <div className="space-y-10">
            <ul className="grid gap-4 sm:grid-cols-2">
              {tel && (
                <li>
                  <a href={tel} className="flex h-full items-start gap-4 rounded-3xl bg-cream p-6 hover:bg-sand">
                    <Phone className="mt-1 size-5 text-bordeaux" aria-hidden />
                    <span>
                      <span className="block text-sm text-stone">Téléphone</span>
                      <span className="text-lg font-semibold">{contact.phoneDisplay || contact.phone}</span>
                      {isSet(openingHoursLabel) && <span className="block text-sm text-stone">{openingHoursLabel}</span>}
                    </span>
                  </a>
                </li>
              )}
              {isSet(contact.email) && (
                <li>
                  <a
                    href={buildMailto(contact.email, "Demande d'information", "Bonjour,\n\nJe vous contacte au sujet d'un événement :\n\n- Type d'événement :\n- Date :\n- Lieu :\n- Nombre d'invités :\n\nMerci,\n")}
                    className="flex h-full items-start gap-4 rounded-3xl bg-cream p-6 hover:bg-sand"
                  >
                    <Mail className="mt-1 size-5 text-bordeaux" aria-hidden />
                    <span>
                      <span className="block text-sm text-stone">E-mail</span>
                      <span className="text-lg font-semibold break-all">{contact.email}</span>
                    </span>
                  </a>
                </li>
              )}
              {(isSet(address.city) || isSet(serviceArea.label)) && (
                <li className="flex items-start gap-4 rounded-3xl bg-cream p-6 sm:col-span-2">
                  <MapPin className="mt-1 size-5 text-bordeaux" aria-hidden />
                  <span>
                    {isSet(address.city) && (
                      <address className="text-lg font-semibold not-italic">
                        {[address.street, [address.postalCode, address.city].filter(isSet).join(" ")].filter(isSet).join(", ")}
                      </address>
                    )}
                    {isSet(serviceArea.label) && <span className="block text-stone">Zone d&apos;intervention : {serviceArea.label}</span>}
                  </span>
                </li>
              )}
              {!tel && !isSet(contact.email) && (
                <li className="rounded-3xl bg-cream p-6 text-ink/75 sm:col-span-2">
                  Utilisez le formulaire de devis ou de rappel ci-dessus : c&apos;est le moyen le plus rapide pour nous
                  joindre.
                </li>
              )}
            </ul>
            <Faq items={generalFaq} />
          </div>
        </div>
      </Section>
    </>
  );
}
