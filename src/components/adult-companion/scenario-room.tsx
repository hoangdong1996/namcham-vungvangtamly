import { useState } from "react";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DIRECT_SUPPORT_GUIDANCE } from "@/lib/support-safety";
import { ADULT_SCENARIOS } from "./data";

export function ScenarioRoom() {
  const [active, setActive] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const scenario = ADULT_SCENARIOS[active];
  if (!scenario) return null;
  const selected = answers[scenario.id];
  const response = selected === undefined ? undefined : scenario.options[selected];
  return <section className="mt-12 border-t border-club/20 pt-10" aria-labelledby="scenario-room-title">
    <h3 id="scenario-room-title" className="font-hero text-2xl font-bold text-lt-green">PHÒNG THỰC HÀNH TÌNH HUỐNG</h3>
    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Tình huống minh họa để học hỏi và thực hành kỹ năng hỗ trợ; không phải hồ sơ học sinh, không chấm điểm hay đánh giá năng lực thầy cô.</p>
    <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Chọn tình huống">{ADULT_SCENARIOS.map((item, index) => <Button key={item.id} variant={active === index ? "default" : "outline"} aria-pressed={active === index} onClick={() => setActive(index)} className="h-auto min-h-11 whitespace-normal text-left">{index + 1}. {item.title}</Button>)}</div>
    <div className="mt-6 rounded-lg border border-border bg-card p-5 sm:p-7"><p className="text-xs font-bold text-plum">TÌNH HUỐNG {active + 1} / 5</p><h4 className="mt-2 text-xl font-bold text-lt-green">{scenario.title}</h4><p className="mt-4 leading-relaxed">{scenario.context}</p>
      {scenario.urgent && <aside role="alert" className="mt-5 border-l-4 border-destructive bg-destructive/10 p-4"><p className="flex gap-2 font-bold text-destructive"><ShieldAlert aria-hidden="true" className="size-5 shrink-0" />Ưu tiên an toàn ngay</p><p className="mt-2 text-sm leading-relaxed">{DIRECT_SUPPORT_GUIDANCE} Không để học sinh phải tự xoay xở; không hứa giữ bí mật tuyệt đối.</p></aside>}
      <div className="mt-6 space-y-3" role="group" aria-label="Chọn cách phản hồi">{scenario.options.map((option, index) => <Button key={option.text} variant="outline" aria-pressed={selected === index} className={`h-auto min-h-14 w-full justify-start whitespace-normal p-4 text-left font-normal leading-relaxed ${selected === index ? "border-primary bg-mint-soft" : ""}`} onClick={() => setAnswers(previous => ({ ...previous, [scenario.id]: index }))}><span className="font-bold text-primary">{String.fromCharCode(65 + index)}.</span><span>{option.text}</span></Button>)}</div>
      {response && <div role="region" aria-label="Phân tích cách phản hồi" aria-live="polite" className="mt-7 space-y-4 border-t border-border pt-6"><p><strong className="text-lt-green">Điểm có thể ghi nhận: </strong>{response.advantage}</p><p><strong className="text-plum">Điều cần cân nhắc: </strong>{response.limitation}</p><p><strong className="text-lt-green">Gợi ý xử lý: </strong>{scenario.guidance}</p><blockquote className="border-l-4 border-primary pl-4 font-semibold text-lt-green">{scenario.takeaway}</blockquote></div>}
    </div>
  </section>;
}