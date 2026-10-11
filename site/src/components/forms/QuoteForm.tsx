"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Pencil } from "lucide-react";
import {
  conceptOptions,
  contactPreferenceOptions,
  eventTypeOptions,
  guestOptions,
  labelOf,
  serviceOptions,
} from "@/config/offers";
import { isSet, siteConfig } from "@/config/site";
import { fieldErrors, quoteSchema } from "@/lib/schemas";
import { buildMailto } from "@/lib/mailto";
import { cn } from "@/lib/cn";
import { Checkbox, ChoiceGroup, Field, Honeypot, inputClasses } from "./fields";
import { ErrorBanner, SubmitButton, SuccessPanel, useSubmit } from "./submit";
import { Turnstile, turnstileEnabled } from "./Turnstile";

type Concept = (typeof conceptOptions)[number]["value"];
type EventType = (typeof eventTypeOptions)[number]["value"];

type FormData = {
  eventType: EventType | "";
  concept: Concept | "";
  eventDate: string;
  dateUnknown: boolean;
  location: string;
  guests: string;
  fullName: string;
  company: string;
  email: string;
  phone: string;
  contactPreference: string;
  message: string;
  services: string[];
  budget: string;
  extra: string;
  privacyAccepted: boolean;
  sendCopy: boolean;
  website: string;
};

const STEPS = [
  { title: "Votre projet", fields: ["eventType", "concept", "eventDate", "location", "guests"] },
  { title: "Vos coordonnées", fields: ["fullName", "company", "email", "phone", "contactPreference"] },
  { title: "Votre demande", fields: ["message", "services", "budget", "extra"] },
  { title: "Récapitulatif", fields: ["privacyAccepted"] },
] as const;

const PRO_EVENT_TYPES = ["entreprise", "salon", "lancement", "autre"];

const isoToday = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

export function QuoteForm({
  defaultConcept,
  variant = "default",
  clientCopyEnabled = false,
}: {
  defaultConcept?: Concept;
  variant?: "default" | "pro";
  clientCopyEnabled?: boolean;
}) {
  const uid = useId().replace(/:/g, "");
  const isPro = variant === "pro";
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [turnstileToken, setTurnstileToken] = useState("");
  const startedAt = useRef(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  const { state, submit } = useSubmit("/api/quote");

  const [data, setData] = useState<FormData>({
    eventType: isPro ? "entreprise" : "",
    concept: defaultConcept ?? "",
    eventDate: "",
    dateUnknown: false,
    location: "",
    guests: "",
    fullName: "",
    company: "",
    email: "",
    phone: "",
    contactPreference: "indifferent",
    message: "",
    services: [],
    budget: "",
    extra: "",
    privacyAccepted: false,
    sendCopy: false,
    website: "",
  });

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  // Après un changement d'étape : remonter en haut du formulaire et y placer le focus.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    root.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    root.querySelector<HTMLElement>("[data-step-title]")?.focus({ preventScroll: true });
  }, [step]);

  useEffect(() => {
    if (state.status === "success") {
      rootRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    }
  }, [state.status]);

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: "" }));
  };

  function validateStep(index: number) {
    const fields: readonly string[] = STEPS[index].fields;
    const result = quoteSchema.safeParse({ ...data, startedAt: 1, website: "" });
    const all = result.success ? {} : fieldErrors(result.error);
    const stepErrors: Record<string, string> = {};
    for (const key of Object.keys(all)) if (fields.includes(key)) stepErrors[key] = all[key];
    if (isPro && index === 1 && data.company.trim().length < 2) {
      stepErrors.company = "Indiquez le nom de votre entreprise.";
    }
    setErrors(stepErrors);
    const firstInvalid = Object.keys(stepErrors)[0];
    if (firstInvalid) {
      requestAnimationFrame(() => {
        const el =
          rootRef.current?.querySelector<HTMLElement>(`#${uid}-${firstInvalid}`) ??
          rootRef.current?.querySelector<HTMLElement>(`[name="${uid}-${firstInvalid}"]`);
        el?.focus();
      });
    }
    return !firstInvalid;
  }

  async function sendQuote() {
    const result = await submit({
      ...data,
      startedAt: startedAt.current,
      turnstileToken: turnstileToken || undefined,
    });
    // Les erreurs renvoyées par le serveur ramènent à l'étape concernée.
    const keys = Object.keys(result.errors ?? {});
    if (keys.length > 0) {
      setErrors(result.errors!);
      const target = STEPS.findIndex((s) => s.fields.some((f) => keys.includes(f)));
      if (target >= 0) setStep(target);
    }
  }

  function next(e: React.FormEvent) {
    e.preventDefault();
    if (!validateStep(step)) return;
    if (step < STEPS.length - 1) {
      setStep(step + 1);
      return;
    }
    void sendQuote();
  }

  const eventTypes = isPro ? eventTypeOptions.filter((o) => PRO_EVENT_TYPES.includes(o.value)) : eventTypeOptions;
  const submitting = state.status === "submitting";

  const summary: [string, string, number][] = [
    ["Type d'événement", labelOf(eventTypeOptions, data.eventType), 0],
    ["Concept", labelOf(conceptOptions, data.concept), 0],
    ["Date", data.dateUnknown || !data.eventDate ? "Date non fixée" : new Date(`${data.eventDate}T12:00:00`).toLocaleDateString("fr-FR", { dateStyle: "long" }), 0],
    ["Lieu", data.location, 0],
    ["Participants", labelOf(guestOptions, data.guests), 0],
    ["Nom", data.fullName, 1],
    ["Entreprise", data.company, 1],
    ["E-mail", data.email, 1],
    ["Téléphone", data.phone, 1],
    ["Contact préféré", labelOf(contactPreferenceOptions, data.contactPreference), 1],
    ["Projet", data.message, 2],
    ["Centres d'intérêt", data.services.map((s) => labelOf(serviceOptions, s)).join(", "), 2],
    ["Budget indicatif", data.budget, 2],
    ["Informations complémentaires", data.extra, 2],
  ];

  const mailto = isSet(siteConfig.contact.email)
    ? buildMailto(
        siteConfig.contact.email,
        `Demande de devis — ${labelOf(eventTypeOptions, data.eventType) || "événement"}`,
        `Bonjour,\n\nJe souhaite recevoir un devis.\n\n${summary
          .filter(([, v]) => v)
          .map(([l, v]) => `${l} : ${v}`)
          .join("\n")}\n\nMerci.`,
      )
    : null;

  if (state.status === "success") {
    return (
      <div ref={rootRef}>
        <SuccessPanel title="Votre demande a bien été envoyée">
          <p>
            Merci {data.fullName.split(" ")[0]} ! Votre demande nous est parvenue. Nous revenons vers vous{" "}
            {data.contactPreference === "telephone" ? "par téléphone" : data.contactPreference === "email" ? "par e-mail" : ""} pour en
            parler et vous préparer une proposition personnalisée.
          </p>
          {clientCopyEnabled && data.sendCopy && (
            <p>Un récapitulatif vous a été envoyé à l&apos;adresse {data.email} (pensez à vérifier vos courriers indésirables).</p>
          )}
          <p>
            <Link href="/galerie" className="font-semibold text-copper-light underline underline-offset-4">
              En attendant, découvrez la galerie
            </Link>
          </p>
        </SuccessPanel>
      </div>
    );
  }

  return (
    <div ref={rootRef} className="scroll-mt-28 rounded-3xl bg-paper p-5 shadow-[0_30px_80px_-40px_rgba(20,17,16,0.45)] ring-1 ring-ink/5 sm:p-8 lg:p-10">
      {/* Indicateur de progression */}
      <ol className="mb-8 grid grid-cols-4 gap-2" aria-label="Étapes du formulaire">
        {STEPS.map((s, i) => (
          <li key={s.title} aria-current={i === step ? "step" : undefined}>
            <span className={cn("block h-1.5 rounded-full transition-colors duration-500", i <= step ? "bg-combi" : "bg-ink/10")} />
            <span className={cn("mt-2 hidden text-xs font-semibold sm:block", i === step ? "text-ink" : "text-stone")}>
              {i + 1}. {s.title}
            </span>
          </li>
        ))}
      </ol>
      <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-copper">
        Étape {step + 1} sur {STEPS.length}
      </p>
      <h3 data-step-title tabIndex={-1} className="mb-8 text-3xl font-medium focus:outline-none">
        {STEPS[step].title}
      </h3>

      <form noValidate onSubmit={next} className="relative space-y-7">
        <Honeypot value={data.website} onChange={(v) => set("website", v)} />

        {step === 0 && (
          <div key="s0" className="animate-rise-in space-y-7">
            <ChoiceGroup
              legend="Type d'événement"
              name={`${uid}-eventType`}
              type="radio"
              columns={3}
              options={eventTypes}
              value={data.eventType}
              onChange={(v) => set("eventType", v as EventType)}
              error={errors.eventType}
            />
            <ChoiceGroup
              legend="Concept souhaité"
              name={`${uid}-concept`}
              type="radio"
              columns={3}
              options={conceptOptions}
              value={data.concept}
              onChange={(v) => set("concept", v as Concept)}
              error={errors.concept}
            />
            <div className="grid gap-6 sm:grid-cols-2">
              <Field id={`${uid}-eventDate`} label="Date de l'événement" error={errors.eventDate}>
                {(a11y) => (
                  <div className="space-y-3">
                    <input
                      {...a11y}
                      type="date"
                      className={inputClasses}
                      value={data.eventDate}
                      disabled={data.dateUnknown}
                      onFocus={(e) => (e.currentTarget.min = isoToday())}
                      onChange={(e) => set("eventDate", e.target.value)}
                    />
                    <Checkbox
                      id={`${uid}-dateUnknown`}
                      checked={data.dateUnknown}
                      onChange={(c) => {
                        setData((d) => ({ ...d, dateUnknown: c, eventDate: c ? "" : d.eventDate }));
                        setErrors((e) => ({ ...e, eventDate: "" }));
                      }}
                    >
                      Date non fixée
                    </Checkbox>
                  </div>
                )}
              </Field>
              <Field id={`${uid}-location`} label="Ville ou lieu de l'événement" error={errors.location}>
                {(a11y) => (
                  <input
                    {...a11y}
                    type="text"
                    autoComplete="address-level2"
                    className={inputClasses}
                    value={data.location}
                    onChange={(e) => set("location", e.target.value)}
                    placeholder="Ex. Domaine, salle, ville…"
                  />
                )}
              </Field>
            </div>
            <Field id={`${uid}-guests`} label="Nombre approximatif de participants" error={errors.guests}>
              {(a11y) => (
                <select {...a11y} className={inputClasses} value={data.guests} onChange={(e) => set("guests", e.target.value)}>
                  <option value="">Sélectionnez une estimation</option>
                  {guestOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              )}
            </Field>
          </div>
        )}

        {step === 1 && (
          <div key="s1" className="animate-rise-in space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field id={`${uid}-fullName`} label="Nom et prénom" error={errors.fullName}>
                {(a11y) => (
                  <input {...a11y} type="text" autoComplete="name" className={inputClasses} value={data.fullName} onChange={(e) => set("fullName", e.target.value)} />
                )}
              </Field>
              <Field id={`${uid}-company`} label="Entreprise" optional={!isPro} error={errors.company}>
                {(a11y) => (
                  <input {...a11y} type="text" autoComplete="organization" className={inputClasses} value={data.company} onChange={(e) => set("company", e.target.value)} />
                )}
              </Field>
              <Field id={`${uid}-email`} label="Adresse e-mail" error={errors.email}>
                {(a11y) => (
                  <input {...a11y} type="email" inputMode="email" autoComplete="email" className={inputClasses} value={data.email} onChange={(e) => set("email", e.target.value)} />
                )}
              </Field>
              <Field
                id={`${uid}-phone`}
                label="Téléphone"
                optional={data.contactPreference !== "telephone"}
                error={errors.phone}
                hint="Utile pour préciser rapidement les détails de votre événement."
              >
                {(a11y) => (
                  <input {...a11y} type="tel" inputMode="tel" autoComplete="tel" className={inputClasses} value={data.phone} onChange={(e) => set("phone", e.target.value)} />
                )}
              </Field>
            </div>
            <ChoiceGroup
              legend="Moyen de contact préféré"
              name={`${uid}-contactPreference`}
              type="radio"
              columns={3}
              options={contactPreferenceOptions}
              value={data.contactPreference}
              onChange={(v) => set("contactPreference", v)}
              error={errors.contactPreference}
            />
          </div>
        )}

        {step === 2 && (
          <div key="s2" className="animate-rise-in space-y-6">
            <Field
              id={`${uid}-message`}
              label="Description du projet"
              error={errors.message}
              hint="Ambiance souhaitée, déroulé de la journée, lieu, ce qui compte pour vous…"
            >
              {(a11y) => (
                <textarea {...a11y} rows={6} maxLength={3000} className={inputClasses} value={data.message} onChange={(e) => set("message", e.target.value)} />
              )}
            </Field>
            <ChoiceGroup
              legend="Ce qui vous intéresse"
              name={`${uid}-services`}
              type="checkbox"
              optional
              columns={3}
              options={serviceOptions}
              value={data.services}
              onChange={(v) =>
                set("services", data.services.includes(v) ? data.services.filter((s) => s !== v) : [...data.services, v])
              }
            />
            <div className="grid gap-6 sm:grid-cols-2">
              <Field id={`${uid}-budget`} label="Budget indicatif" optional error={errors.budget} hint="Une fourchette nous aide à vous proposer la formule la plus adaptée.">
                {(a11y) => <input {...a11y} type="text" className={inputClasses} value={data.budget} onChange={(e) => set("budget", e.target.value)} />}
              </Field>
              <Field id={`${uid}-extra`} label="Informations complémentaires" optional error={errors.extra}>
                {(a11y) => <textarea {...a11y} rows={3} maxLength={1500} className={inputClasses} value={data.extra} onChange={(e) => set("extra", e.target.value)} />}
              </Field>
            </div>
          </div>
        )}

        {step === 3 && (
          <div key="s3" className="animate-rise-in space-y-6">
            <dl className="divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-white">
              {summary
                .filter(([, value]) => value)
                .map(([label, value, target]) => (
                  <div key={label} className="grid gap-1 px-5 py-3.5 sm:grid-cols-[11rem_1fr_auto] sm:items-start sm:gap-4">
                    <dt className="text-sm text-stone">{label}</dt>
                    <dd className="text-sm font-medium break-words whitespace-pre-line text-ink">{value}</dd>
                    <dd className="hidden sm:block">
                      <button
                        type="button"
                        onClick={() => setStep(target)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-stone underline-offset-4 hover:text-ink hover:underline"
                      >
                        <Pencil className="size-3" aria-hidden /> Modifier<span className="sr-only"> : {label}</span>
                      </button>
                    </dd>
                  </div>
                ))}
            </dl>
            <Checkbox
              id={`${uid}-privacyAccepted`}
              checked={data.privacyAccepted}
              onChange={(c) => set("privacyAccepted", c)}
              error={errors.privacyAccepted}
            >
              J&apos;accepte que mes informations soient utilisées pour traiter ma demande de devis, conformément à la{" "}
              <Link href="/politique-de-confidentialite" className="font-semibold underline underline-offset-4" target="_blank">
                politique de confidentialité
              </Link>
              .
            </Checkbox>
            {clientCopyEnabled && (
              <Checkbox id={`${uid}-sendCopy`} checked={data.sendCopy} onChange={(c) => set("sendCopy", c)}>
                Recevoir une copie de ma demande par e-mail
              </Checkbox>
            )}
            {turnstileEnabled && <Turnstile onToken={setTurnstileToken} />}
            {state.status === "error" && <ErrorBanner message={state.message} mailto={mailto} />}
          </div>
        )}

        <div className="flex flex-col-reverse gap-3 border-t border-ink/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => {
                setErrors({});
                setStep(step - 1);
              }}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 font-semibold text-ink hover:bg-ink/5"
            >
              <ArrowLeft className="size-4" aria-hidden /> Retour
            </button>
          ) : (
            <span className="hidden sm:block" />
          )}
          {step < STEPS.length - 1 ? (
            <button
              type="submit"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 py-3 font-semibold text-cream transition-all hover:-translate-y-0.5 hover:bg-smoke"
            >
              Continuer <ArrowRight className="size-4" aria-hidden />
            </button>
          ) : (
            <SubmitButton submitting={submitting}>
              <Check className="size-4" aria-hidden /> Envoyer ma demande
            </SubmitButton>
          )}
        </div>
      </form>

      <div aria-live="polite" className="sr-only">
        {Object.values(errors).filter(Boolean).length > 0 && "Certains champs sont à corriger."}
        {submitting && "Envoi de votre demande en cours."}
      </div>
    </div>
  );
}
