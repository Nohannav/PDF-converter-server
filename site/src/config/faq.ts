/**
 * Questions fréquentes, par page.
 *
 * Les réponses décrivent la démarche, sans inventer de tarifs, de délais ni
 * de caractéristiques techniques. Dès que l'agence confirme une information
 * (délai de réservation, acompte, rayon d'intervention…), remplacez la
 * réponse correspondante par l'information exacte.
 */
export type FaqItem = { question: string; answer: string };

export const combiFaq: FaqItem[] = [
  {
    question: "Le combi est-il un véritable Volkswagen d'époque ?",
    answer:
      "Oui : il s'agit d'un authentique combi Volkswagen vintage, à la carrosserie rouge et blanche, aménagé pour l'événementiel. C'est un élément de décor à part entière, autant qu'un outil de service.",
  },
  {
    question: "Peut-on choisir entre la configuration bar et la configuration DJ ?",
    answer:
      "Oui, le combi se configure selon votre événement : bar mobile, cabine DJ ou support de présentation pour une marque. Indiquez votre besoin dans la demande de devis : nous vous dirons quelles configurations sont possibles pour votre date et votre lieu.",
  },
  {
    question: "Les boissons et le personnel sont-ils compris ?",
    answer:
      "Le contenu exact de la prestation (boissons, verrerie, barman, DJ) dépend de la formule retenue. Il est détaillé noir sur blanc dans la proposition personnalisée que vous recevez avant toute réservation.",
  },
  {
    question: "Le combi peut-il venir sur mon lieu de réception ?",
    answer:
      "Le combi se déplace sur votre lieu d'événement. L'accès, la surface disponible et l'alimentation électrique sont vérifiés ensemble en amont afin que l'installation se passe sans surprise.",
  },
  {
    question: "Combien de temps à l'avance faut-il réserver ?",
    answer:
      "Les dates de mariage et de fin d'année partent souvent tôt. Le plus simple est de nous envoyer votre demande dès que la date est connue : nous vous confirmons la disponibilité rapidement.",
  },
  {
    question: "Comment obtenir un tarif ?",
    answer:
      "Chaque événement est différent (lieu, durée, configuration, services). Remplissez le formulaire de devis : vous recevez une proposition personnalisée, sans engagement.",
  },
];

export const discoFaq: FaqItem[] = [
  {
    question: "Qu'est-ce que « la plus petite discothèque du monde » ?",
    answer:
      "C'est une caravane entièrement transformée en mini-discothèque : on y entre comme dans une boîte de nuit miniature, avec son ambiance lumineuse, sa musique et sa piste de danse. Un moment insolite que vos invités ne sont pas près d'oublier.",
  },
  {
    question: "Combien de personnes peuvent danser en même temps ?",
    answer:
      "L'espace est volontairement intimiste : c'est ce qui fait son charme. La capacité exacte vous est précisée lors de l'échange préparatoire, en fonction de l'installation et des règles de sécurité.",
  },
  {
    question: "Faut-il prévoir un DJ ?",
    answer:
      "Cela dépend de la formule et de votre organisation. Dites-nous comment vous imaginez la soirée : nous vous indiquerons ce qui est inclus et ce qui peut être ajouté.",
  },
  {
    question: "Quelles sont les contraintes d'installation ?",
    answer:
      "Il faut un emplacement accessible pour la caravane, plat et stable, ainsi qu'une alimentation électrique adaptée. Les détails techniques sont validés avec vous avant la réservation.",
  },
  {
    question: "Peut-on l'installer à côté d'un autre concept ?",
    answer:
      "Oui, la mini-discothèque peut être associée au combi bar pour créer un véritable espace festif. Sélectionnez « Plusieurs concepts » dans la demande de devis.",
  },
];

export const proFaq: FaqItem[] = [
  {
    question: "Le combi peut-il être aux couleurs de notre marque ?",
    answer:
      "Les possibilités de personnalisation (signalétique, supports de communication, présentation de produits) sont étudiées au cas par cas, en fonction de votre projet et des contraintes du véhicule.",
  },
  {
    question: "Intervenez-vous sur les salons professionnels ?",
    answer:
      "Le combi est pensé pour attirer l'attention sur un stand ou un espace extérieur. Les conditions d'accès propres à chaque salon (dimensions, horaires de montage, règlement) sont vérifiées ensemble en amont.",
  },
  {
    question: "Pouvez-vous établir un devis au nom de l'entreprise ?",
    answer:
      "Oui, précisez le nom de votre société dans le formulaire : la proposition est établie à son nom.",
  },
];

export const generalFaq: FaqItem[] = [
  {
    question: "Comment se passe une demande de devis ?",
    answer:
      "Vous décrivez votre événement en quelques minutes via le formulaire. Nous revenons vers vous pour préciser vos besoins, puis vous recevez une proposition personnalisée, sans engagement.",
  },
  {
    question: "Puis-je simplement poser une question par téléphone ?",
    answer:
      "Bien sûr : réservez un créneau d'appel ou demandez à être rappelé(e) depuis la page contact.",
  },
];
