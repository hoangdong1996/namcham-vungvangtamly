import { useEffect, useState } from "react";
import { ArrowLeft, Check, Copy, HeartHandshake, Home, School, Stethoscope, TriangleAlert } from "lucide-react";
import { GROUPS, type Supporter } from "./data";

const ICONS = { "gia-dinh": Home, "nha-truong": School, "chuyen-mon": Stethoscope } as const;

export function openSupporter(id: string) {
  window.dispatchEvent(new CustomEvent("open-supporter", { detail: id }));
  setTimeout(() => document.getElementById("diem-tua-chi-tiet")?.scrollIntoView({ behavior: window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" }), 50);
}

const CARDS = [
  { title: "A. GIA ĐÌNH", btn: "Tìm hiểu điểm tựa gia đình", items: ["Bố mẹ, ông bà, anh chị hoặc người thân đáng tin cậy.", "Hướng dẫn cách mở lời và chia sẻ khó khăn."] },
  { title: "B. NHÀ TRƯỜNG", btn: "Khám phá điểm tựa nhà trường", items: ["Bạn bè đáng tin cậy.", "Giáo viên chủ nhiệm.", "Thầy cô giáo mà học sinh tin tưởng.", "Đoàn trường.", "Nhân viên y tế trường học.", "Cán bộ hoặc bộ phận tư vấn tâm lý học đường nếu nhà trường có bố trí."] },
  { title: "C. HỖ TRỢ CHUYÊN MÔN", btn: "Tìm hiểu hỗ trợ chuyên môn", items: ["Cơ sở y tế có dịch vụ phù hợp.", "Chuyên gia có chuyên môn và thông tin xác minh được.", "Hướng dẫn kết nối với người lớn đáng tin cậy khi cần hỗ trợ chuyên sâu."] },
];

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

  useEffect(() => {
    const handleOpen = (event: Event) => {
      if (!(event instanceof CustomEvent) || typeof event.detail !== "string") return;
      const targetGroup = GROUPS.find((item) => item.people.some((p) => p.id === event.detail));
      const targetPerson = targetGroup?.people.find((p) => p.id === event.detail);
      if (!targetGroup || !targetPerson) return;
      setGroup(targetGroup.id);
      setPerson(targetPerson);
    };
    window.addEventListener("open-supporter", handleOpen);
    return () => window.removeEventListener("open-supporter", handleOpen);
  }, []);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="font-display text-2xl font-bold text-primary">KHÁM PHÁ CÁC ĐIỂM TỰA CỦA BẠN</h3>
        <p className="mx-auto mt-2 max-w-3xl leading-relaxed text-foreground/85">Mỗi người có thể cần một điểm tựa khác nhau. Hãy chọn một nhóm hỗ trợ để tìm hiểu cách bắt đầu chia sẻ và những bước có thể thực hiện khi cần giúp đỡ.</p>
      </div>
      <div className="flex justify-center">
        <button onClick={() => { setGroup(null); setPerson(null); }} className="rounded-full bg-primary px-8 py-4 font-display text-lg font-bold text-primary-foreground shadow-lg ring-8 ring-pink-band transition-transform hover:scale-105">
          TÔI CẦN ĐƯỢC LẮNG NGHE
        </button>
      </div>
      <div className="mx-auto hidden h-6 w-2/3 border-x-2 border-t-2 border-dashed border-primary/40 md:block" aria-hidden />
      <div className="grid gap-4 md:grid-cols-3">
        {GROUPS.map((x, k) => {
          const Icon = ICONS[x.id as keyof typeof ICONS];
          const active = group === x.id;
          const c = CARDS[k];
          if (!c) return null;
          return (
            <div key={x.id} className={`flex flex-col rounded-3xl border-2 p-5 transition-all hover:-translate-y-1 hover:shadow-md ${active ? "border-primary bg-mint" : "border-pink-band bg-card"}`}>
              <Icon className="h-8 w-8 text-primary" />
              <h3 className="mt-3 font-display text-lg font-bold text-primary">{c.title}</h3>
              <ul className="mt-2 mb-4 list-disc space-y-1 pl-5 text-sm">{c.items.map((i) => <li key={i}>{i}</li>)}</ul>
              <button aria-pressed={active} aria-controls="diem-tua-chi-tiet" onClick={() => { setGroup(active ? null : x.id); setPerson(null); setTimeout(() => document.getElementById("diem-tua-chi-tiet")?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 50); }}
                className="mt-auto rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5">
                {c.btn}
              </button>
            </div>
          );
        })}
      </div>
      <div id="diem-tua-chi-tiet" className="scroll-mt-24" />

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
