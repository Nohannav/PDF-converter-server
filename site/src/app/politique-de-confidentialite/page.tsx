/**
 * MODÈLE de politique de confidentialité à compléter et à faire vérifier
 * avant la mise en ligne (notamment : prestataires réellement utilisés,
 * transferts hors UE, durées de conservation). Ce modèle ne garantit pas à
 * lui seul la conformité au RGPD.
 */
import { siteConfig } from "@/config/site";
import { Fill, LegalLayout } from "@/components/sections/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Politique de confidentialité",
  description: `Comment ${siteConfig.name} collecte et protège vos données personnelles : finalités, durées de conservation et droits.`,
  path: "/politique-de-confidentialite",
});

export default function PrivacyPage() {
  const { legal } = siteConfig;
  return (
    <LegalLayout title="Politique de confidentialité" path="/politique-de-confidentialite">
      <p>
        Cette page explique quelles données personnelles sont collectées sur ce site, pourquoi, combien de temps elles
        sont conservées et comment exercer vos droits. Dernière mise à jour : <Fill value={legal.lastUpdated} />.
      </p>

      <section>
        <h2>Responsable du traitement</h2>
        <p>
          <Fill value={legal.dataController} /> — contact : <Fill value={legal.privacyEmail} />.
        </p>
      </section>

      <section>
        <h2>Données collectées et finalités</h2>
        <ul>
          <li>
            <strong>Demande de devis</strong> : type et date d&apos;événement, lieu, nombre de participants, nom,
            entreprise (facultatif), e-mail, téléphone (facultatif), description du projet. Finalité : étudier votre
            demande et vous adresser une proposition.
          </li>
          <li>
            <strong>Demande de rappel</strong> : nom, téléphone, jour et plage horaire souhaités, motif. Finalité : vous
            rappeler.
          </li>
          <li>
            <strong>Prise de rendez-vous en ligne</strong> : les informations saisies dans le calendrier de réservation
            (nom, e-mail, téléphone, sujet) sont traitées par le service de réservation pour le compte de l&apos;agence.
          </li>
        </ul>
        <p>
          Base légale : mesures précontractuelles prises à votre demande (article 6.1.b du RGPD). Seules les données
          nécessaires sont demandées ; les champs facultatifs sont signalés comme tels.
        </p>
      </section>

      <section>
        <h2>Destinataires</h2>
        <p>
          Vos données sont destinées uniquement à l&apos;agence. Elles transitent par des prestataires techniques
          agissant pour son compte : l&apos;hébergeur du site, le service d&apos;envoi d&apos;e-mails utilisé pour
          transmettre les formulaires, le service de réservation de rendez-vous et, s&apos;il est activé, le service
          de protection anti-robots (Cloudflare Turnstile). Certains de ces prestataires peuvent être situés hors de
          l&apos;Union européenne ; dans ce cas, les transferts sont encadrés par des garanties appropriées (clauses
          contractuelles types ou décision d&apos;adéquation). Liste des prestataires utilisés :{" "}
          <Fill value="" />.
        </p>
        <p>Vos données ne sont jamais vendues ni utilisées à des fins publicitaires.</p>
      </section>

      <section>
        <h2>Durée de conservation</h2>
        <p>
          Le site n&apos;enregistre pas les formulaires dans une base de données : les demandes sont transmises par
          e-mail à l&apos;agence. Elles sont conservées : {legal.retentionQuotes}.
        </p>
      </section>

      <section id="vos-droits">
        <h2>Vos droits</h2>
        <p>
          Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de limitation,
          d&apos;opposition et de portabilité de vos données. Pour les exercer, écrivez à{" "}
          <Fill value={legal.privacyEmail} />. Vous pouvez également introduire une réclamation auprès de la CNIL
          (<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>).
        </p>
      </section>

      <section>
        <h2>Sécurité</h2>
        <p>
          Les échanges avec le site sont chiffrés (HTTPS). Les formulaires sont protégés contre les envois automatisés
          et les clés d&apos;accès aux services techniques ne sont jamais exposées dans le navigateur.
        </p>
      </section>

      <section id="cookies">
        <h2>Cookies et traceurs</h2>
        <p>
          Ce site n&apos;utilise <strong>aucun cookie publicitaire ni outil de mesure d&apos;audience</strong>. Aucun
          bandeau de consentement n&apos;est donc nécessaire en l&apos;état. Les polices de caractères sont hébergées
          sur le site lui-même.
        </p>
        <p>
          Le calendrier de réservation n&apos;est chargé que lorsque vous cliquez sur « Voir les créneaux disponibles
          » ; le service de réservation peut alors déposer les cookies nécessaires à son fonctionnement. Si la
          protection anti-robots Cloudflare Turnstile est activée, elle est chargée à l&apos;étape d&apos;envoi des
          formulaires, sans finalité publicitaire.
        </p>
        <p>
          Si des outils de mesure d&apos;audience ou publicitaires étaient ajoutés à l&apos;avenir, ils ne seraient
          activés qu&apos;après recueil de votre consentement.
        </p>
      </section>
    </LegalLayout>
  );
}
