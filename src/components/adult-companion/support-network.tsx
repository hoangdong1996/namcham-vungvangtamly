import { useState } from "react";
import { GraduationCap, HeartHandshake, ShieldAlert, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DIRECT_SUPPORT_GUIDANCE } from "@/lib/support-safety";
import { SUPPORT_RINGS, SUPPORT_STEPS } from "./data";

const ICONS = [UsersRound, GraduationCap, HeartHandshake];
export function AdultSupportNetwork() {
  const [selected, setSelected] = useState(0);
  const ring = SUPPORT_RINGS[selected];
  if (!ring) return null;
  return <><div className="mt-10 grid items-center gap-8 lg:grid-cols-2">
    <div className="relative mx-auto grid aspect-square w-full max-w-lg place-items-center" aria-label="Học sinh ở trung tâm ba vòng kết nối">
      <div aria-hidden="true" className="absolute inset-[2%] rounded-full border-2 border-club/25 bg-club-faint/30" /><div aria-hidden="true" className="absolute inset-[15%] rounded-full border-2 border-pink-number/50 bg-pink-soft/30" /><div aria-hidden="true" className="absolute inset-[28%] rounded-full border-2 border-primary/25 bg-mint-soft/60" />
      <div className="relative z-10 grid size-24 place-items-center rounded-full bg-lt-green text-center text-sm font-bold text-primary-foreground sm:size-28"><span>HỌC SINH</span></div>
      {SUPPORT_RINGS.map((item, index) => { const Icon = ICONS[index] ?? HeartHandshake; return <Button key={item.id} variant="secondary" aria-pressed={selected === index} className={`absolute z-20 h-auto min-h-14 w-36 whitespace-normal border p-3 text-xs font-bold shadow-sm sm:w-44 ${index === 0 ? "left-1/2 top-0 -translate-x-1/2" : index === 1 ? "bottom-[14%] left-0" : "bottom-[14%] right-0"} ${selected === index ? "border-primary bg-card text-lt-green" : "border-border bg-card text-foreground"}`} onClick={() => setSelected(index)}><Icon className="size-4 shrink-0" aria-hidden="true" />{item.title}</Button>; })}
    </div>
    <div role="region" aria-label="Vai trò nhóm hỗ trợ" aria-live="polite" className="border-l-4 border-primary pl-6"><p className="text-xs font-bold text-plum">VÒNG {selected + 1}</p><h3 className="mt-2 font-hero text-2xl font-bold text-lt-green">{ring.title}</h3><ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-relaxed">{ring.members.map(member => <li key={member}>{member}</li>)}</ul><p className="mt-5 leading-relaxed">{ring.responsibility}</p></div>
  </div>
  <h3 className="mt-12 font-hero text-2xl font-bold text-lt-green">Quy trình kết nối hỗ trợ</h3><ol className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">{SUPPORT_STEPS.map((step, index) => <li key={step.title} className="border-t-2 border-primary/30 pt-4"><span className="text-sm font-bold text-plum">0{index + 1}</span><h4 className="mt-2 text-base font-bold text-lt-green">{step.title}</h4><p className="mt-3 text-sm leading-relaxed">{step.text}</p></li>)}</ol>
  <aside className="mt-8 border-l-4 border-destructive bg-destructive/10 p-5"><p className="flex items-center gap-2 font-bold text-destructive"><ShieldAlert aria-hidden="true" className="size-5 shrink-0" />Không chờ đủ năm bước khi có nguy hiểm tức thời</p><p className="mt-3 text-sm leading-relaxed">{DIRECT_SUPPORT_GUIDANCE}</p></aside>
  <blockquote className="mt-10 max-w-4xl font-hero text-xl font-medium leading-relaxed text-lt-green">“Gia đình là nơi yêu thương. Nhà trường là nơi đồng hành. Chuyên môn là điểm tựa khi cần thiết. Học sinh luôn là trung tâm của mọi sự hỗ trợ.”</blockquote></>;
}