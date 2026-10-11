/**
 * MODÈLE de mentions légales à compléter (src/config/site.ts → legal) et à
 * faire vérifier par un professionnel avant la mise en ligne. Ce modèle ne
 * garantit pas à lui seul la conformité légale du site.
 */
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Fill, LegalLayout } from "@/components/sections/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Mentions légales",
  description: `Mentions légales du site ${siteConfig.name} : éditeur, hébergeur et propriété intellectuelle.`,
  path: "/mentions-legales",
});

export default function LegalNoticePage() {
  const { legal, contact } = siteConfig;
  return (
    <LegalLayout title="Mentions légales" path="/mentions-legales">
      <section>
        <h2>Éditeur du site</h2>
        <ul>
          <li>Raison sociale : <Fill value={legal.companyName} /></li>
          <li>Nom commercial : {siteConfig.name}</li>
          <li>Forme juridique : <Fill value={legal.legalForm} /></li>
          <li>Capital social : <Fill value={legal.shareCapital} /></li>
          <li>Siège social : <Fill value={legal.registeredAddress} /></li>
          <li>SIRET : <Fill value={legal.siret} /></li>
          <li>RCS : <Fill value={legal.rcs} /></li>
          <li>N° de TVA intracommunautaire : <Fill value={legal.vatNumber} /></li>
          <li>Téléphone : <Fill value={contact.phoneDisplay || contact.phone} /></li>
          <li>E-mail : <Fill value={contact.email} /></li>
          <li>Directeur de la publication : <Fill value={legal.publicationDirector} /></li>
        </ul>
      </section>

      <section>
        <h2>Hébergement</h2>
        <ul>
          <li>Hébergeur : <Fill value={legal.host.name} /></li>
          <li>Adresse : <Fill value={legal.host.address} /></li>
          <li>Téléphone : <Fill value={legal.host.phone} /></li>
        </ul>
      </section>

      <section>
        <h2>Propriété intellectuelle</h2>
        <p>
          L&apos;ensemble des contenus de ce site (textes, photographies, illustrations, logo, mise en page) est protégé
          par le droit de la propriété intellectuelle. Toute reproduction ou réutilisation, totale ou partielle, sans
          autorisation préalable de l&apos;éditeur est interdite.
        </p>
        <p>
          Les illustrations vectorielles présentes sur le site ont été créées spécifiquement pour celui-ci. Les crédits
          des éventuelles photographies de tiers sont indiqués dans le fichier de crédits du projet et, le cas échéant,
          à proximité des images.
        </p>
      </section>

      <section>
        <h2>Données personnelles</h2>
        <p>
          Le traitement des données collectées via les formulaires est décrit dans la{" "}
          <Link href="/politique-de-confidentialite">politique de confidentialité</Link>.
        </p>
      </section>
    </LegalLayout>
  );
}
