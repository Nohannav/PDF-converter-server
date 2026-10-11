import "server-only";
import {
  callbackReasonOptions,
  callbackSlotOptions,
  conceptOptions,
  contactPreferenceOptions,
  eventTypeOptions,
  guestOptions,
  labelOf,
  serviceOptions,
} from "@/config/offers";
import { siteConfig } from "@/config/site";
import type { CallbackData, QuoteData } from "@/lib/schemas";

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Supprime les retours à la ligne pour éviter toute injection dans l'objet d'un e-mail. */
function oneLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function formatDate(iso: string) {
  if (!iso) return "";
  const date = new Date(`${iso}T12:00:00`);
  return new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(date);
}

type Row = [label: string, value: string];

function render(title: string, intro: string, rows: Row[]) {
  const filled = rows.filter(([, v]) => v && v.trim().length > 0);
  const html = `<!doctype html><html lang="fr"><body style="margin:0;background:#f6f0e6;font-family:Segoe UI,Arial,sans-serif;color:#141110">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f0e6;padding:24px 0"><tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fffdf9;border-radius:14px;overflow:hidden">
<tr><td style="background:#141110;color:#f6f0e6;padding:24px 28px;font-size:20px;font-weight:600">${escapeHtml(title)}</td></tr>
<tr><td style="padding:24px 28px;font-size:15px;line-height:1.55">${escapeHtml(intro)}</td></tr>
<tr><td style="padding:0 28px 28px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
${filled
  .map(
    ([label, value]) =>
      `<tr><td style="padding:10px 12px 10px 0;border-top:1px solid #ece3d3;color:#6b625b;font-size:13px;vertical-align:top;width:38%">${escapeHtml(label)}</td><td style="padding:10px 0;border-top:1px solid #ece3d3;font-size:14px;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
  )
  .join("\n")}
</table></td></tr></table></td></tr></table></body></html>`;
  const text = `${title}\n\n${intro}\n\n${filled.map(([l, v]) => `${l} : ${v}`).join("\n")}\n`;
  return { html, text };
}

function quoteRows(data: QuoteData): Row[] {
  return [
    ["Type d'événement", labelOf(eventTypeOptions, data.eventType)],
    ["Concept souhaité", labelOf(conceptOptions, data.concept)],
    ["Date", data.eventDate ? formatDate(data.eventDate) : "Date non fixée"],
    ["Lieu", data.location],
    ["Participants", labelOf(guestOptions, data.guests)],
    ["Nom", data.fullName],
    ["Entreprise", data.company],
    ["E-mail", data.email],
    ["Téléphone", data.phone],
    ["Contact préféré", labelOf(contactPreferenceOptions, data.contactPreference)],
    ["Projet", data.message],
    ["Centres d'intérêt", data.services.map((s) => labelOf(serviceOptions, s)).join(", ")],
    ["Budget indicatif", data.budget],
    ["Informations complémentaires", data.extra],
  ];
}

export function quoteEmailForAgency(data: QuoteData) {
  const subject = oneLine(
    `Demande de devis — ${labelOf(eventTypeOptions, data.eventType)} — ${data.fullName}${data.eventDate ? ` — ${data.eventDate}` : ""}`,
  );
  return {
    subject,
    ...render(
      "Nouvelle demande de devis",
      `Demande envoyée depuis le formulaire du site. Répondez directement à cet e-mail pour écrire à ${data.fullName}.`,
      quoteRows(data),
    ),
  };
}

export function quoteEmailForClient(data: QuoteData) {
  return {
    subject: oneLine(`Nous avons bien reçu votre demande — ${siteConfig.name}`),
    ...render(
      "Merci pour votre demande",
      `Bonjour ${data.fullName}, nous avons bien reçu votre demande de devis et revenons vers vous rapidement. Voici le récapitulatif de ce que vous nous avez transmis. Cet e-mail est envoyé automatiquement : pour compléter votre demande, répondez-y simplement.`,
      quoteRows(data),
    ),
  };
}

export function callbackEmailForAgency(data: CallbackData) {
  return {
    subject: oneLine(`Demande de rappel — ${data.name} — ${data.preferredDay}`),
    ...render(
      "Demande de rappel téléphonique",
      "Cette demande n'est pas un rendez-vous confirmé : merci de rappeler la personne ou de lui proposer un créneau.",
      [
        ["Nom", data.name],
        ["Téléphone", data.phone],
        ["Jour souhaité", formatDate(data.preferredDay)],
        ["Plage horaire", labelOf(callbackSlotOptions, data.timeSlot)],
        ["Motif", labelOf(callbackReasonOptions, data.reason)],
        ["Précisions", data.details],
      ],
    ),
  };
}
