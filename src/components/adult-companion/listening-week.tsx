import { useState } from "react";
import { Check, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LISTENING_DAYS, listeningProgress } from "./data";

export function ListeningWeek() {
  const [days, setDays] = useState<boolean[]>(Array(7).fill(false));
  const { completed, percent } = listeningProgress(days);
  return <section aria-labelledby="listening-week-title" className="mt-12 border-t border-primary/20 pt-10">
    <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-bold text-plum">MỖI NGÀY MỘT KHOẢNH KHẮC</p><h3 id="listening-week-title" className="mt-2 font-hero text-2xl font-bold text-lt-green">THỬ THÁCH 7 NGÀY LẮNG NGHE CON</h3></div><Button variant="outline" onClick={() => setDays(Array(7).fill(false))}><RotateCcw className="size-4" aria-hidden="true" />Bắt đầu lại</Button></div>
    <p className="mt-4 text-sm text-muted-foreground">Dấu chọn chỉ ở lần mở trang hiện tại, không cần đăng nhập và không được gửi hoặc lưu lại.</p>
    <div role="progressbar" aria-label="Tiến độ lắng nghe con" aria-valuemin={0} aria-valuemax={7} aria-valuenow={completed} className="mt-5 grid h-2 grid-cols-7 gap-1 overflow-hidden rounded-full">{days.map((done, index) => <span key={index} className={done ? "bg-primary" : "bg-primary/15"} />)}</div>
    <p className="mt-3 text-sm font-semibold text-lt-green" aria-live="polite">{completed}/7 ngày · {Math.round(percent)}%{completed === 7 ? " — Mỗi khoảnh khắc lắng nghe là một bước gần con hơn." : " — Một chút quan tâm, một bước gần nhau hơn."}</p>
    <div className="mt-6 grid gap-3 sm:grid-cols-2">{LISTENING_DAYS.map((day, index) => <label key={day} className={`flex min-h-20 cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors motion-reduce:transition-none ${days[index] ? "border-primary bg-mint-soft" : "border-border bg-card"}`}><input type="checkbox" aria-label={`Ngày ${index + 1}: ${day}`} checked={days[index] ?? false} onChange={event => setDays(current => current.map((value, i) => i === index ? event.target.checked : value))} className="size-5 shrink-0 accent-primary" /><span className="min-w-0"><span className="block text-xs font-bold text-plum">NGÀY {index + 1}</span><span className="mt-1 block text-sm leading-relaxed">{day}</span></span>{days[index] && <Check aria-hidden="true" className="ml-auto size-4 shrink-0 text-primary" />}</label>)}</div>
  </section>;
}