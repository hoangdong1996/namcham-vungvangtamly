import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Heart, Map, RotateCcw, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DIRECT_SUPPORT_GUIDANCE } from "@/lib/support-safety";
import { MAP_CAUSES, MAP_EMOTIONS, emotionMapTip, type MapCauseId, type MapEmotionId } from "./emotion-map-data";

export function EmotionMap() {
  const [opened, setOpened] = useState(false);
  const launcher = useRef<HTMLButtonElement>(null);
  function close() {
    setOpened(false);
    requestAnimationFrame(() => launcher.current?.focus());
  }
  return opened ? <EmotionMapPractice onClose={close} /> : (
    <Button ref={launcher} onClick={() => setOpened(true)} className="h-auto w-full justify-start gap-4 whitespace-normal rounded-3xl p-6 text-left hover:bg-green-deep">
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-pink-band text-plum"><Map aria-hidden="true" className="!h-6 !w-6" /></span>
      <span className="min-w-0 flex-1"><span className="block font-display text-lg font-bold">Bản đồ cảm xúc của tôi</span><span className="mt-1 block text-sm font-medium leading-relaxed">Nhấn vào đây để bắt đầu vẽ bản đồ cảm xúc của riêng bạn – chỉ mất vài phút!</span></span>
      <ArrowRight aria-hidden="true" className="hidden sm:block" />
    </Button>
  );
}

function EmotionMapPractice({ onClose }: { onClose: () => void }) {
  const [emotionId, setEmotionId] = useState<MapEmotionId | null>(null);
  const [intensity, setIntensity] = useState(3);
  const [causes, setCauses] = useState<MapCauseId[]>([]);
  const [note, setNote] = useState("");
  const [complete, setComplete] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const emotion = MAP_EMOTIONS.find((entry) => entry.id === emotionId);
  const chosenCauses = MAP_CAUSES.filter((entry) => causes.includes(entry.id));

  useEffect(() => { heading.current?.focus(); }, [complete]);

  function reset() {
    setEmotionId(null); setIntensity(3); setCauses([]); setNote(""); setComplete(false);
    requestAnimationFrame(() => heading.current?.focus());
  }
  function submit(event: FormEvent) {
    event.preventDefault();
    if (!emotion || !causes.length || intensity < 1 || intensity > 5) return;
    setComplete(true);
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-pink-band bg-card" aria-label="Thực hành bản đồ cảm xúc">
      <div className="border-b border-pink-band bg-mint-soft px-5 py-6 sm:px-8">
        <p className="mb-2 text-xs font-bold uppercase text-primary">Một khoảng dừng cho chính mình</p>
        <h3 ref={heading} tabIndex={-1} className="font-display text-2xl font-bold text-green-deep outline-none">{complete ? "BẢN ĐỒ CẢM XÚC CỦA TÔI" : "Lúc này, mình đang cảm thấy…"}</h3>
        <p className="mt-2 flex items-start gap-2 text-sm leading-relaxed text-foreground/80"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />Lựa chọn và chia sẻ chỉ được xử lý trên trang này, không gửi đến AI hoặc dịch vụ bên ngoài, không lưu lại. Tải lại trang sẽ xóa dữ liệu. Không nhập họ tên, lớp hoặc thông tin nhận diện của mình hay người khác.</p>
      </div>
      {complete && emotion ? (
        <div className="space-y-6 p-5 sm:p-8">
          <div role="region" aria-label="Bản đồ cảm xúc đã tạo" className="grid items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
            <div className="rounded-2xl bg-mint-soft p-5 text-center">
              <p className="text-sm font-semibold text-green-deep">Mức độ cảm nhận</p>
              <p className="my-2 font-display text-3xl font-bold text-primary">{intensity}<span className="text-lg text-foreground/60"> / 5</span></p>
              <div className="flex justify-center gap-2" aria-hidden="true">{[1, 2, 3, 4, 5].map((value) => <span key={value} className={`h-3 w-3 rounded-full ${value <= intensity ? "bg-primary" : "bg-border"}`} />)}</div>
              <p className="mt-3 text-xs text-foreground/70">1: nhẹ · 5: rất mạnh</p>
            </div>
            <div className="relative flex flex-col items-center py-5">
              <span aria-hidden="true" className="absolute inset-x-0 top-1/2 hidden h-px bg-pink-band md:block" />
              <div className="relative flex h-40 w-40 flex-col items-center justify-center gap-2 rounded-full border-4 border-pink-band bg-pink-soft text-plum">
                <span aria-hidden="true" className="text-5xl">{emotion.symbol}</span>
                <p className="text-lg font-bold">{emotion.label}</p>
                <p className="text-xs">Cảm xúc của mình</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="mb-3 text-sm font-semibold text-green-deep">Những điều có liên quan</p>
              {chosenCauses.map((cause) => <div key={cause.id} className="flex min-h-12 items-center gap-3 rounded-lg border border-pink-band bg-background px-4 py-3"><span aria-hidden="true" className="text-xl">{cause.symbol}</span><span className="font-semibold">{cause.label}</span></div>)}
            </div>
          </div>
          {note.trim() && <div className="border-l-2 border-pink-band pl-4"><h4 className="font-semibold text-plum">Điều mình muốn ghi nhận</h4><p className="mt-2 whitespace-pre-wrap break-words text-sm leading-relaxed [overflow-wrap:anywhere]">{note}</p></div>}
          <div role="status" className="border-t border-border pt-5"><h4 className="flex items-center gap-2 font-display text-xl font-bold text-green-deep"><Heart className="h-5 w-5 text-plum" aria-hidden="true" />Một việc nhỏ chăm sóc mình</h4><p className="mt-3 leading-relaxed">{emotionMapTip(emotion.id, intensity)}</p></div>
          <p className="text-sm leading-relaxed text-foreground/70">Bản đồ ghi lại cảm nhận lúc này, không đánh giá đúng/sai và không phải công cụ chẩn đoán trầm cảm hay rối loạn tâm lý. Mức độ 1–5 chỉ thể hiện cảm nhận của mình.</p>
          <div className="flex flex-wrap gap-3"><Button variant="outline" className="min-h-11" onClick={reset}><RotateCcw aria-hidden="true" />Làm lại</Button><Button className="min-h-11" onClick={onClose}><ArrowLeft aria-hidden="true" />Quay về Chạm 1</Button></div>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-7 p-5 sm:p-8">
          <fieldset><legend className="mb-3 font-semibold text-green-deep">1. Chọn cảm xúc hiện tại</legend><div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {MAP_EMOTIONS.map((entry) => <Button key={entry.id} type="button" variant="outline" aria-pressed={emotionId === entry.id} onClick={() => setEmotionId(entry.id)} className={`h-24 flex-col gap-2 whitespace-normal rounded-lg text-sm ${emotionId === entry.id ? "border-primary bg-mint text-green-deep ring-2 ring-primary" : "border-pink-band hover:bg-mint-soft"}`}><span aria-hidden="true" className="text-3xl">{entry.symbol}</span>{entry.label}</Button>)}
          </div></fieldset>
          <fieldset><legend className="mb-3 font-semibold text-green-deep">2. Mức độ cảm xúc</legend><div className="rounded-lg bg-mint-soft px-5 py-4"><label htmlFor="emotion-map-intensity" className="flex items-center justify-between gap-3 text-sm"><span>Mình cảm nhận mạnh đến đâu?</span><output className="shrink-0 font-bold text-primary">{intensity} / 5</output></label><input id="emotion-map-intensity" aria-label="Mức độ cảm xúc" type="range" min={1} max={5} step={1} value={intensity} onChange={(event) => setIntensity(Number(event.target.value))} className="my-3 h-8 w-full cursor-pointer accent-primary" /><div className="flex justify-between text-xs text-foreground/70"><span>1 · Nhẹ</span><span>5 · Rất mạnh</span></div></div></fieldset>
          <fieldset><legend className="mb-1 font-semibold text-green-deep">3. Điều gì có liên quan?</legend><p className="mb-3 text-sm text-foreground/70">Có thể chọn nhiều nhóm, hoặc chọn “Chưa xác định”.</p><div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{MAP_CAUSES.map((cause) => <Button key={cause.id} type="button" variant="outline" aria-pressed={causes.includes(cause.id)} onClick={() => setCauses((previous) => previous.includes(cause.id) ? previous.filter((id) => id !== cause.id) : [...previous, cause.id])} className={`min-h-14 whitespace-normal rounded-lg ${causes.includes(cause.id) ? "border-primary bg-mint text-green-deep ring-2 ring-primary" : "border-pink-band"}`}><span aria-hidden="true" className="text-xl">{cause.symbol}</span>{cause.label}</Button>)}</div></fieldset>
          <div><label htmlFor="emotion-map-note" className="font-semibold text-green-deep">4. Chia sẻ thêm <span className="text-sm font-normal text-foreground/70">(không bắt buộc)</span></label><textarea id="emotion-map-note" value={note} onChange={(event) => setNote(event.target.value)} rows={3} placeholder="Điều mình muốn ghi nhận lúc này…" className="mt-3 block w-full resize-y rounded-lg border border-input bg-background p-4 text-base outline-none focus-visible:ring-2 focus-visible:ring-primary" /></div>
          <div className="flex flex-wrap gap-3"><Button type="submit" disabled={!emotion || !causes.length} className="min-h-11 whitespace-normal">Tạo bản đồ cảm xúc<ArrowRight aria-hidden="true" /></Button><Button type="button" variant="outline" onClick={reset} className="min-h-11"><RotateCcw aria-hidden="true" />Làm lại</Button><Button type="button" variant="ghost" onClick={onClose} className="min-h-11"><ArrowLeft aria-hidden="true" />Quay về Chạm 1</Button></div>
        </form>
      )}
      <aside className="border-t border-pink-band bg-pink-soft px-5 py-5 text-sm leading-relaxed text-plum sm:px-8"><p>Nếu cảm xúc khó chịu kéo dài hoặc ảnh hưởng đến sinh hoạt, hãy trò chuyện với một người lớn đáng tin cậy hoặc người có chuyên môn.</p><p className="mt-2">{DIRECT_SUPPORT_GUIDANCE}</p></aside>
    </div>
  );
}