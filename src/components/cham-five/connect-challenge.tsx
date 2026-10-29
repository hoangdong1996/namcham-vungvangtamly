import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { REFLECT, SCENARIOS } from "./data";

export function ConnectChallenge() {
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<string | null>(null);
  const [feel, setFeel] = useState<string | null>(null);
  const s = SCENARIOS[i]!;
  const chosen = s.options.find((o) => o.k === pick);

  return (
    <div className="rounded-3xl bg-card p-6 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wider text-plum">Tình huống {i + 1}/{SCENARIOS.length}</p>
      <p className="mt-2 text-base font-medium leading-relaxed">{s.text}</p>
      <div className="mt-4 grid gap-3">
        {s.options.map((o) => (
          <button key={o.k} onClick={() => setPick(o.k)} aria-pressed={pick === o.k}
            className={`rounded-2xl border-2 p-4 text-left text-sm transition-all hover:border-primary ${pick === o.k ? (o.ok ? "border-primary bg-mint" : "border-pink-number bg-pink-soft") : "border-pink-band"}`}>
            <b className="mr-2 text-primary">{o.k}.</b>{o.text}
          </button>
        ))}
      </div>
      {chosen && (
        <div className="animate-in fade-in mt-4 space-y-4">
          <p role="status" className={`rounded-2xl p-4 text-sm font-semibold ${chosen.ok ? "bg-mint text-primary" : "bg-pink-soft text-plum"}`}>{chosen.fb}</p>
          <div>
            <p className="font-display font-bold text-primary">Nếu là em, em mong người khác sẽ nói gì khi mình đang gặp khó khăn?</p>
            <p className="text-xs text-muted-foreground">Không cần viết ra — chỉ chọn điều em mong muốn nhất. Lựa chọn không được lưu lại.</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {REFLECT.map((r) => (
                <button key={r} aria-pressed={feel === r} onClick={() => setFeel(r)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${feel === r ? "bg-primary text-primary-foreground" : "bg-pink-chip text-plum hover:bg-pink-band"}`}>{r}</button>
              ))}
            </div>
          </div>
        </div>
      )}
      <button onClick={() => { setI((i + 1) % SCENARIOS.length); setPick(null); setFeel(null); }}
        className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary px-5 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
        <RefreshCw className="h-4 w-4" />Thử tình huống khác
      </button>
    </div>
  );
}
