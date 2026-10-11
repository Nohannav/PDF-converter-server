"use client";

import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/cn";

export const inputClasses =
  "block w-full min-h-12 rounded-xl border border-line bg-paper px-4 py-3 text-base text-ink placeholder:text-stone/70 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] transition-colors focus:border-bordeaux focus:outline-none focus:ring-3 focus:ring-bordeaux/15 aria-[invalid=true]:border-bordeaux aria-[invalid=true]:ring-bordeaux/15";

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  className?: string;
  children: (a11y: {
    id: string;
    "aria-invalid": boolean;
    "aria-describedby"?: string;
  }) => React.ReactNode;
};

/** Champ de formulaire accessible : libellé, aide et message d'erreur reliés au contrôle. */
export function Field({ id, label, error, hint, optional, className, children }: FieldProps) {
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
        {optional && <span className="ml-1.5 font-normal text-stone">(facultatif)</span>}
      </label>
      {children({ id, "aria-invalid": Boolean(error), "aria-describedby": describedBy })}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-sm text-stone">
          {hint}
        </p>
      )}
      {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
    </div>
  );
}

export function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="flex items-start gap-1.5 text-sm font-medium text-bordeaux">
      <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
      {children}
    </p>
  );
}

/** Groupe de choix visuels (boutons radio / cases à cocher stylés). */
export function ChoiceGroup({
  legend,
  name,
  type,
  options,
  value,
  onChange,
  error,
  optional,
  columns = 2,
}: {
  legend: string;
  name: string;
  type: "radio" | "checkbox";
  options: readonly { value: string; label: string }[];
  value: string | string[];
  onChange: (value: string) => void;
  error?: string;
  optional?: boolean;
  columns?: 2 | 3;
}) {
  const errorId = `${name}-error`;
  return (
    <fieldset aria-describedby={error ? errorId : undefined} aria-invalid={type === "radio" ? Boolean(error) : undefined}>
      <legend className="mb-3 text-sm font-semibold text-ink">
        {legend}
        {optional && <span className="ml-1.5 font-normal text-stone">(facultatif)</span>}
      </legend>
      <div className={cn("grid gap-2.5 sm:grid-cols-2", columns === 3 && "lg:grid-cols-3")}>
        {options.map((option) => {
          const checked = Array.isArray(value) ? value.includes(option.value) : value === option.value;
          return (
            <label
              key={option.value}
              className={cn(
                "relative flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-all",
                "has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-bordeaux/30",
                checked ? "border-bordeaux bg-cream text-ink ring-1 ring-bordeaux" : "border-line bg-paper text-ink hover:border-ink/35",
              )}
            >
              <input
                type={type}
                name={name}
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              <span
                aria-hidden
                className={cn(
                  "flex size-4 shrink-0 items-center justify-center border",
                  type === "radio" ? "rounded-full" : "rounded",
                  checked ? "border-bordeaux bg-bordeaux" : "border-ink/30",
                )}
              >
                {checked && <span className={cn("bg-paper", type === "radio" ? "size-1.5 rounded-full" : "size-2 rounded-[1px]")} />}
              </span>
              {option.label}
            </label>
          );
        })}
      </div>
      {error && (
        <div className="mt-2">
          <FieldError id={errorId}>{error}</FieldError>
        </div>
      )}
    </fieldset>
  );
}

/** Case à cocher simple (consentement, options). */
export function Checkbox({
  id,
  checked,
  onChange,
  children,
  error,
}: {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink/85">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5 size-5 shrink-0 cursor-pointer rounded accent-bordeaux"
        />
        <span>{children}</span>
      </label>
      {error && (
        <div className="mt-2">
          <FieldError id={`${id}-error`}>{error}</FieldError>
        </div>
      )}
    </div>
  );
}

/** Champ invisible « pot de miel » : les humains ne le voient pas, les robots le remplissent. */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Ne pas remplir ce champ
        <input type="text" tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} name="website" />
      </label>
    </div>
  );
}
