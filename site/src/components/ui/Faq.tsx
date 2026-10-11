import { Plus } from "lucide-react";
import type { FaqItem } from "@/config/faq";
import { cn } from "@/lib/cn";

/** FAQ accessible basée sur <details> : fonctionne sans JavaScript. */
export function Faq({ items, dark = false }: { items: FaqItem[]; dark?: boolean }) {
  return (
    <div className={cn("divide-y border-y", dark ? "divide-cream/15 border-cream/15" : "divide-ink/10 border-ink/10")}>
      {items.map((item) => (
        <details key={item.question} className="group py-1">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 text-left text-lg font-semibold [&::-webkit-details-marker]:hidden">
            <h3 className="font-sans text-lg font-semibold tracking-normal">{item.question}</h3>
            <span
              aria-hidden
              className={cn(
                "flex size-9 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 group-open:rotate-45",
                dark ? "border-cream/25" : "border-ink/15",
              )}
            >
              <Plus className="size-4" />
            </span>
          </summary>
          <p className={cn("max-w-3xl pb-6 leading-relaxed", dark ? "text-cream/75" : "text-ink/75")}>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
