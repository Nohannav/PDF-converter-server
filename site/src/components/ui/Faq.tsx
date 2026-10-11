import { Plus } from "lucide-react";
import type { FaqItem } from "@/config/faq";

/** FAQ accessible basée sur <details> : fonctionne sans JavaScript. */
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.question} className="group py-1">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 text-left text-lg font-semibold [&::-webkit-details-marker]:hidden">
            <h3 className="font-sans text-lg font-semibold tracking-normal">{item.question}</h3>
            <span
              aria-hidden
              className="flex size-9 shrink-0 items-center justify-center rounded-full border border-line text-bordeaux transition-transform duration-300 group-open:rotate-45"
            >
              <Plus className="size-4" />
            </span>
          </summary>
          <p className="max-w-3xl pb-6 leading-relaxed text-stone">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
