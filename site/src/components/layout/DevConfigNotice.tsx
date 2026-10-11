import { missingConfiguration } from "@/lib/config-check";

/** Bandeau visible UNIQUEMENT en développement : rappelle ce qui reste à configurer. */
export function DevConfigNotice() {
  if (process.env.NODE_ENV !== "development") return null;
  const missing = missingConfiguration();
  if (missing.length === 0) return null;
  return (
    <details className="fixed bottom-24 left-3 z-[60] max-w-sm rounded-2xl bg-amber-100 p-4 text-sm text-amber-950 shadow-xl ring-1 ring-amber-300 lg:bottom-3">
      <summary className="cursor-pointer font-semibold">
        Développement : {missing.length} élément(s) à configurer
      </summary>
      <ul className="mt-3 max-h-64 list-disc space-y-1 overflow-y-auto pl-5">
        {missing.map((m) => (
          <li key={m.item}>
            <strong>{m.area} :</strong> {m.item}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs">Tant que l&apos;envoi d&apos;e-mails n&apos;est pas configuré, les formulaires affichent une erreur explicite (aucun faux succès).</p>
    </details>
  );
}
