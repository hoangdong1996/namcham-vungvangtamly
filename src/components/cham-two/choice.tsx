import type { ReactNode } from "react";
import { Check } from "lucide-react";

export function ChoiceChip({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-2 text-left text-sm font-semibold transition-colors ${
        selected ? "border-primary bg-primary text-primary-foreground" : "border-pink-band bg-card text-foreground hover:bg-pink-soft"
      }`}
    >
      {selected && <Check className="size-4 shrink-0" />}
      {children}
    </button>
  );
}

export const toggleIn = (list: string[], value: string) => (list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

export function ActivityShell({ id, n, title, goal, children }: { id: string; n: number; title: string; goal: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 space-y-5 rounded-2xl border border-pink-band bg-card p-5 shadow-sm sm:p-8">
      <div>
        <p className="text-sm font-bold uppercase tracking-widest text-plum">Hoạt động {n}</p>
        <h2 className="font-display text-2xl font-bold text-primary sm:text-3xl">{title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground"><strong>Mục tiêu:</strong> {goal}</p>
      </div>
      {children}
    </section>
  );
}
