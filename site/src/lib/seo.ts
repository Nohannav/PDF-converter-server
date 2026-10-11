import type { Metadata } from "next";
import { absoluteUrl, allowIndexing, isSet, siteConfig, socialLinks } from "@/config/site";

/** Métadonnées d'une page : titre unique, description, canonique et Open Graph. */
export function pageMetadata({
  title,
  description,
  path,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  return {
    // L'accueil porte un titre complet ; les autres pages utilisent le modèle « Titre | Nom ».
    title: path === "/" ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      title,
      description,
      url: path,
      // Redéclarée ici : un openGraph défini par la page remplace celui hérité.
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
    robots: noindex || !allowIndexing ? { index: false, follow: !noindex } : undefined,
  };
}

const orgId = () => `${siteConfig.url}/#organisation`;

/**
 * Données structurées de l'entreprise. Seules les informations renseignées
 * dans src/config/site.ts sont publiées (aucune adresse, note ou prix inventés).
 */
export function organizationJsonLd() {
  const { contact, address, serviceArea, openingHours, googleBusinessProfileUrl } = siteConfig;
  const hasLocalData = isSet(address.city) || serviceArea.areas.length > 0;
  const sameAs = [...socialLinks().map((s) => s.href), googleBusinessProfileUrl].filter(isSet);

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": hasLocalData ? "LocalBusiness" : "Organization",
    "@id": orgId(),
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: absoluteUrl("/icon.svg"),
    image: absoluteUrl("/opengraph-image"),
  };
  if (isSet(contact.phone)) data.telephone = contact.phone;
  if (isSet(contact.email)) data.email = contact.email;
  if (isSet(address.city)) {
    data.address = {
      "@type": "PostalAddress",
      ...(isSet(address.street) && { streetAddress: address.street }),
      ...(isSet(address.postalCode) && { postalCode: address.postalCode }),
      addressLocality: address.city,
      ...(isSet(address.region) && { addressRegion: address.region }),
      addressCountry: address.country,
    };
  }
  if (serviceArea.areas.length > 0) {
    data.areaServed = serviceArea.areas.map((name) => ({ "@type": "Place", name }));
  }
  if (openingHours.length > 0) {
    data.openingHoursSpecification = openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    }));
  }
  if (sameAs.length > 0) data.sameAs = sameAs;
  return data;
}

export function serviceJsonLd({ name, description, path, serviceType }: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType,
    url: absoluteUrl(path),
    provider: { "@id": orgId() },
    ...(siteConfig.serviceArea.areas.length > 0 && {
      areaServed: siteConfig.serviceArea.areas.map((n) => ({ "@type": "Place", name: n })),
    }),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Accueil", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
