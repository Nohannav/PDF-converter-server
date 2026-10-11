"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { PhoneCall } from "lucide-react";
import { callbackReasonOptions, callbackSlotOptions, labelOf } from "@/config/offers";
import { isSet, siteConfig } from "@/config/site";
import { callbackSchema, fieldErrors } from "@/lib/schemas";
import { buildMailto } from "@/lib/mailto";
import { Checkbox, ChoiceGroup, Field, Honeypot, inputClasses } from "./fields";
import { ErrorBanner, SubmitButton, SuccessPanel, useSubmit } from "./submit";
import { Turnstile, turnstileEnabled } from "./Turnstile";

const isoToday = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

export function CallbackForm() {
  const uid = useId().replace(/:/g, "");
  const rootRef = useRef<HTMLDivElement>(null);
  const startedAt = useRef(0);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { state, submit } = useSubmit("/api/callback");
  const [data, setData] = useState({
    name: "",
    phone: "",
    preferredDay: "",
    timeSlot: "",
    reason: "",
    details: "",
    privacyAccepted: false,
    website: "",
  });

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (state.status === "success") rootRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
  }, [state.status]);

  const set = <K extends keyof typeof data>(key: K, value: (typeof data)[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: "" }));
  };

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = callbackSchema.safeParse({ ...data, startedAt: 1, website: "" });
    if (!result.success) {
      const errs = fieldErrors(result.error);
      setErrors(errs);
      const first = Object.keys(errs)[0];
      rootRef.current
        ?.querySelector<HTMLElement>(`#${uid}-${first}, [name="${uid}-${first}"]`)
        ?.focus();
      return;
    }
    void submit({ ...data, startedAt: startedAt.current, turnstileToken: turnstileToken || undefined }).then((r) => {
      if (r.errors) setErrors(r.errors);
    });
  }

  const mailto = isSet(siteConfig.contact.email)
    ? buildMailto(
        siteConfig.contact.email,
        "Demande de rappel",
        `Bonjour,\n\nPourriez-vous me rappeler ?\n\nNom : ${data.name}\nTéléphone : ${data.phone}\nJour souhaité : ${data.preferredDay}\nPlage horaire : ${labelOf(callbackSlotOptions, data.timeSlot)}\nMotif : ${labelOf(callbackReasonOptions, data.reason)}\n${data.details}\n\nMerci.`,
      )
    : null;

  if (state.status === "success") {
    return (
      <div ref={rootRef}>
        <SuccessPanel title="Demande de rappel envoyée">
          <p>
            Merci {data.name.split(" ")[0]} ! Votre demande nous a bien été transmise. Attention : il ne s&apos;agit pas
            encore d&apos;un rendez-vous confirmé. Nous vous rappelons dès que possible, en tenant compte du créneau
            indiqué.
          </p>
        </SuccessPanel>
      </div>
    );
  }

  return (
    <div ref={rootRef} className="rounded-3xl bg-paper p-5 ring-1 ring-ink/5 sm:p-8">
      <form noValidate onSubmit={onSubmit} className="relative space-y-6">
        <Honeypot value={data.website} onChange={(v) => set("website", v)} />
        <div className="grid gap-6 sm:grid-cols-2">
          <Field id={`${uid}-name`} label="Nom" error={errors.name}>
            {(a11y) => <input {...a11y} type="text" autoComplete="name" className={inputClasses} value={data.name} onChange={(e) => set("name", e.target.value)} />}
          </Field>
          <Field id={`${uid}-phone`} label="Numéro de téléphone" error={errors.phone}>
            {(a11y) => (
              <input {...a11y} type="tel" inputMode="tel" autoComplete="tel" className={inputClasses} value={data.phone} onChange={(e) => set("phone", e.target.value)} />
            )}
          </Field>
          <Field id={`${uid}-preferredDay`} label="Jour souhaité" error={errors.preferredDay}>
            {(a11y) => (
              <input
                {...a11y}
                type="date"
                className={inputClasses}
                value={data.preferredDay}
                onFocus={(e) => (e.currentTarget.min = isoToday())}
                onChange={(e) => set("preferredDay", e.target.value)}
              />
            )}
          </Field>
          <Field id={`${uid}-reason`} label="Motif de l'appel" error={errors.reason}>
            {(a11y) => (
              <select {...a11y} className={inputClasses} value={data.reason} onChange={(e) => set("reason", e.target.value)}>
                <option value="">Sélectionnez un motif</option>
                {callbackReasonOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            )}
          </Field>
        </div>
        <ChoiceGroup
          legend="Plage horaire souhaitée"
          name={`${uid}-timeSlot`}
          type="radio"
          options={callbackSlotOptions}
          value={data.timeSlot}
          onChange={(v) => set("timeSlot", v)}
          error={errors.timeSlot}
        />
        <Field id={`${uid}-details`} label="Précisions" optional error={errors.details}>
          {(a11y) => <textarea {...a11y} rows={3} maxLength={800} className={inputClasses} value={data.details} onChange={(e) => set("details", e.target.value)} />}
        </Field>
        <Checkbox id={`${uid}-privacyAccepted`} checked={data.privacyAccepted} onChange={(c) => set("privacyAccepted", c)} error={errors.privacyAccepted}>
          J&apos;accepte que mes informations soient utilisées pour être recontacté(e), conformément à la{" "}
          <Link href="/politique-de-confidentialite" className="font-semibold underline underline-offset-4" target="_blank">
            politique de confidentialité
          </Link>
          .
        </Checkbox>
        <p className="rounded-xl bg-sand/60 px-4 py-3 text-sm text-ink/80">
          Une demande de rappel n&apos;est pas un rendez-vous confirmé : l&apos;agence vous recontacte pour valider le créneau.
        </p>
        {turnstileEnabled && <Turnstile onToken={setTurnstileToken} />}
        {state.status === "error" && <ErrorBanner message={state.message} mailto={mailto} />}
        <SubmitButton submitting={state.status === "submitting"}>
          <PhoneCall className="size-4" aria-hidden /> Demander à être rappelé(e)
        </SubmitButton>
      </form>
    </div>
  );
}
