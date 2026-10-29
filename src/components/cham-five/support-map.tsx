import { useState } from "react";
import { ArrowLeft, Check, Copy, HeartHandshake, Home, School, Stethoscope, TriangleAlert } from "lucide-react";
import { GROUPS, type Supporter } from "./data";

const ICONS = { "gia-dinh": Home, "nha-truong": School, "chuyen-mon": Stethoscope } as const;

function Detail({ p, onBack }: { p: Supporter; onBack: () => void }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(p.opener ?? ""); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* clipboard unavailable */ }
  };
  return (
    <div role="region" aria-label={p.name} className="animate-in fade-in slide-in-from-bottom-2 rounded-3xl border-2 border-primary/30 bg-card p-6 shadow-sm">
      <h4 className="font-display text-xl font-bold text-primary">{p.name}</h4>
      <p className="mt-2 text-sm leading-relaxed">{p.desc}</p>
      {p.when && <p className="mt-3 text-sm"><b className="text-plum">Khi nào có thể tìm đến: </b>{p.when}</p>}
      {p.opener && (
        <div className="mt-4 rounded-2xl bg-pink-soft p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-plum">Câu mở lời gợi ý</p>
          <p className="mt-1 italic">“{p.opener}”</p>
          <button onClick={copy} className="mt-3 inline-flex items-center gap-2 rounded-full border border-primary px-4 py-1.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}{copied ? "Đã sao chép" : "Sao chép câu mở lời"}
          </button>
        </div>
      )}
      {p.note && <p className="mt-4 rounded-2xl bg-mint p-3 text-sm font-medium">{p.note}</p>}
      {p.fallback && (
        <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
          <HeartHandshake className="h-4 w-4" />Nhờ người lớn đáng tin cậy hỗ trợ tìm địa chỉ phù hợp
        </p>
      )}
      <div><button onClick={onBack} className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5">
        <ArrowLeft className="h-4 w-4" />Quay lại bản đồ
      </button></div>
    </div>
  );
}

export function SupportMap() {
  const [group, setGroup] = useState<string | null>(null);
  const [person, setPerson] = useState<Supporter | null>(null);
  const g = GROUPS.find((x) => x.id === group);

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <button onClick={() => { setGroup(null); setPerson(null); }} className="rounded-full bg-primary px-8 py-4 font-display text-lg font-bold text-primary-foreground shadow-lg ring-8 ring-pink-band transition-transform hover:scale-105">
          TÔI CẦN ĐƯỢC LẮNG NGHE
        </button>
      </div>
      <div className="mx-auto hidden h-6 w-2/3 border-x-2 border-t-2 border-dashed border-primary/40 md:block" aria-hidden />
      <div className="grid gap-4 md:grid-cols-3">
        {GROUPS.map((x) => {
          const Icon = ICONS[x.id as keyof typeof ICONS];
          const active = group === x.id;
          return (
            <button key={x.id} aria-pressed={active} onClick={() => { setGroup(active ? null : x.id); setPerson(null); }}
              className={`rounded-3xl border-2 p-5 text-left transition-all hover:-translate-y-1 hover:shadow-md ${active ? "border-primary bg-mint" : "border-pink-band bg-card"}`}>
              <Icon className="h-8 w-8 text-primary" />
              <h3 className="mt-3 font-display text-lg font-bold text-primary">{x.title}</h3>
              <p className="mt-1 text-sm leading-relaxed">{x.lead}</p>
            </button>
          );
        })}
      </div>

      {g && !person && (
        <div className="animate-in fade-in space-y-3 rounded-3xl bg-pink-soft p-5">
          <p className="font-bold text-plum">Chọn một điểm tựa để xem gợi ý:</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {g.people.map((p) => (
              <button key={p.id} onClick={() => setPerson(p)} className="rounded-2xl border border-pink-band bg-card p-4 text-left text-sm font-semibold transition-all hover:-translate-y-0.5 hover:border-primary">
                {p.name}
              </button>
            ))}
          </div>
          {g.note && (
            <p className={`flex gap-2 rounded-2xl p-3 text-sm font-medium ${g.id === "chuyen-mon" ? "border-2 border-destructive/40 bg-card" : "bg-mint"}`}>
              {g.id === "chuyen-mon" && <TriangleAlert className="h-5 w-5 shrink-0 text-destructive" />}{g.note}
            </p>
          )}
        </div>
      )}
      {person && <Detail p={person} onBack={() => setPerson(null)} />}

      <p className="rounded-3xl border-2 border-dashed border-primary/40 bg-card p-5 text-center font-display text-lg font-semibold text-plum">
        “Bạn không cần tìm đúng người ngay từ lần đầu. Hãy bắt đầu với một người khiến bạn cảm thấy an toàn.”
      </p>
    </div>
  );
}
