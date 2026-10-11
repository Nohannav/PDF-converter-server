import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { legalNav, mainNav } from "@/config/navigation";
import { isSet, siteConfig, socialLinks, telHref } from "@/config/site";
import { Container } from "@/components/ui/Section";
import { Logo } from "./Logo";
import { cacheLife } from "next/cache";

async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  const { contact, address, serviceArea, openingHoursLabel } = siteConfig;
  const tel = telHref();
  const socials = socialLinks();
  const locality = [address.postalCode, address.city].filter(isSet).join(" ");

  return (
    <footer className="border-t border-line bg-cream pt-20 pb-28 text-ink lg:pb-12">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Link href="/" aria-label="Retour à l'accueil" className="inline-block rounded-lg">
              <Logo />
            </Link>
            <p className="mt-6 leading-relaxed text-stone">
              Un combi Volkswagen vintage transformé en bar ou en espace DJ, et la plus petite discothèque du monde,
              pour des événements qui ne ressemblent à aucun autre.
            </p>
            {isSet(serviceArea.label) && (
              <p className="mt-4 text-sm text-stone">Zone d&apos;intervention : {serviceArea.label}</p>
            )}
          </div>

          <nav aria-label="Pages du site">
            <h2 className="mb-5 font-sans text-xs font-bold uppercase tracking-[0.2em] text-bronze">Le site</h2>
            <ul className="space-y-3 text-stone">
              {[{ href: "/", label: "Accueil" }, ...mainNav].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-bordeaux">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-5 font-sans text-xs font-bold uppercase tracking-[0.2em] text-bronze">Contact</h2>
            <ul className="space-y-3 text-stone">
              {tel && (
                <li>
                  <a href={tel} className="inline-flex items-center gap-2 hover:text-bordeaux">
                    <Phone className="size-4" aria-hidden /> {contact.phoneDisplay || contact.phone}
                  </a>
                </li>
              )}
              {isSet(contact.email) && (
                <li>
                  <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 break-all hover:text-bordeaux">
                    <Mail className="size-4 shrink-0" aria-hidden /> {contact.email}
                  </a>
                </li>
              )}
              {(isSet(address.street) || isSet(locality)) && (
                <li className="flex gap-2">
                  <MapPin className="mt-1 size-4 shrink-0" aria-hidden />
                  <address className="not-italic">
                    {isSet(address.street) && (
                      <>
                        {address.street}
                        <br />
                      </>
                    )}
                    {locality}
                  </address>
                </li>
              )}
              {isSet(openingHoursLabel) && <li className="text-sm">{openingHoursLabel}</li>}
              <li>
                <Link href="/contact#devis" className="hover:text-bordeaux">
                  Demander un devis
                </Link>
              </li>
              <li>
                <Link href="/contact#rendez-vous" className="hover:text-bordeaux">
                  Prendre rendez-vous
                </Link>
              </li>
              <li>
                <Link href="/contact#rappel" className="hover:text-bordeaux">
                  Être rappelé(e)
                </Link>
              </li>
            </ul>
          </div>

          <div>
            {socials.length > 0 && (
              <>
                <h2 className="mb-5 font-sans text-xs font-bold uppercase tracking-[0.2em] text-bronze">Suivez-nous</h2>
                <ul className="mb-8 space-y-3 text-stone">
                  {socials.map((s) => (
                    <li key={s.key}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-bordeaux">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
            <h2 className="mb-5 font-sans text-xs font-bold uppercase tracking-[0.2em] text-bronze">Informations</h2>
            <ul className="space-y-3 text-stone">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-bordeaux">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/politique-de-confidentialite#vos-droits" className="hover:text-bordeaux">
                  Vos données personnelles
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-8 text-sm text-stone sm:flex-row sm:justify-between">
          <p>
            © <CopyrightYear /> {siteConfig.name}. Tous droits réservés.
          </p>
          <p>Ce site n&apos;utilise aucun cookie publicitaire ni outil de mesure d&apos;audience.</p>
        </div>
      </Container>
    </footer>
  );
}
