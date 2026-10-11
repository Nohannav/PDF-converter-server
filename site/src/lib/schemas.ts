/**
 * Schémas de validation partagés entre le navigateur (retour immédiat) et le
 * serveur (validation qui fait foi). Ne contient aucun secret.
 */
import { z } from "zod";
import {
  callbackReasonOptions,
  callbackSlotOptions,
  conceptOptions,
  contactPreferenceOptions,
  eventTypeOptions,
  guestOptions,
  serviceOptions,
} from "@/config/offers";

const values = <T extends readonly { value: string }[]>(options: T) =>
  options.map((o) => o.value) as [T[number]["value"], ...T[number]["value"][]];

const trimmed = (max: number) => z.string().trim().max(max, `${max} caractères maximum.`);

/** Numéros français ou internationaux : chiffres, espaces, points, tirets, + et parenthèses. */
const phoneRegex = /^\+?[0-9 .()-]{9,20}$/;
const phoneSchema = trimmed(25).regex(phoneRegex, "Numéro de téléphone invalide.").refine(
  (v) => v.replace(/\D/g, "").length >= 9,
  "Numéro de téléphone invalide.",
);

const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Date invalide.")
  .refine((v) => !Number.isNaN(Date.parse(v)), "Date invalide.");

/** Champs techniques anti-robots, communs à tous les formulaires. */
const antiSpam = {
  /** Champ « pot de miel » invisible : doit rester vide. */
  website: z.string().max(0).optional().default(""),
  /** Horodatage (ms) de l'affichage du formulaire. */
  startedAt: z.number().int().positive(),
  /** Jeton Cloudflare Turnstile (si activé). */
  turnstileToken: z.string().max(4096).optional(),
};

export const quoteFields = {
  eventType: z.enum(values(eventTypeOptions), { error: "Choisissez un type d'événement." }),
  concept: z.enum(values(conceptOptions), { error: "Choisissez un concept." }),
  eventDate: z.union([isoDate, z.literal("")]).default(""),
  dateUnknown: z.boolean().default(false),
  location: trimmed(120).min(2, "Indiquez la ville ou le lieu de l'événement."),
  guests: z.enum(values(guestOptions), { error: "Indiquez une estimation du nombre de participants." }),

  fullName: trimmed(100).min(2, "Indiquez votre nom et prénom."),
  company: trimmed(120).default(""),
  email: z.string().trim().max(254).pipe(z.email({ error: "Adresse e-mail invalide." })),
  phone: z.union([phoneSchema, z.literal("")]).default(""),
  contactPreference: z.enum(values(contactPreferenceOptions)).default("indifferent"),

  message: trimmed(3000).min(15, "Décrivez votre projet en quelques mots (15 caractères minimum)."),
  services: z.array(z.enum(values(serviceOptions))).max(serviceOptions.length).default([]),
  budget: trimmed(100).default(""),
  extra: trimmed(1500).default(""),

  privacyAccepted: z.literal(true, { error: "Veuillez prendre connaissance de la politique de confidentialité." }),
  sendCopy: z.boolean().default(false),
};

export const quoteSchema = z
  .object({ ...quoteFields, ...antiSpam })
  .superRefine((data, ctx) => {
    if (!data.eventDate && !data.dateUnknown) {
      ctx.addIssue({ code: "custom", path: ["eventDate"], message: "Indiquez la date ou cochez « Date non fixée »." });
    }
    if (data.eventDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (new Date(`${data.eventDate}T12:00:00`) < today) {
        ctx.addIssue({ code: "custom", path: ["eventDate"], message: "La date de l'événement est déjà passée." });
      }
    }
    if (data.contactPreference === "telephone" && !data.phone) {
      ctx.addIssue({ code: "custom", path: ["phone"], message: "Indiquez un numéro pour être contacté(e) par téléphone." });
    }
  });

export type QuoteInput = z.input<typeof quoteSchema>;
export type QuoteData = z.output<typeof quoteSchema>;

export const callbackSchema = z
  .object({
    name: trimmed(100).min(2, "Indiquez votre nom."),
    phone: phoneSchema,
    preferredDay: isoDate,
    timeSlot: z.enum(values(callbackSlotOptions), { error: "Choisissez une plage horaire." }),
    reason: z.enum(values(callbackReasonOptions), { error: "Choisissez le motif de l'appel." }),
    details: trimmed(800).default(""),
    privacyAccepted: z.literal(true, { error: "Veuillez prendre connaissance de la politique de confidentialité." }),
    ...antiSpam,
  })
  .superRefine((data, ctx) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (new Date(`${data.preferredDay}T12:00:00`) < today) {
      ctx.addIssue({ code: "custom", path: ["preferredDay"], message: "Choisissez un jour à venir." });
    }
  });

export type CallbackInput = z.input<typeof callbackSchema>;
export type CallbackData = z.output<typeof callbackSchema>;

/** Transforme les erreurs Zod en { champ: message } pour l'affichage. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "_form";
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
