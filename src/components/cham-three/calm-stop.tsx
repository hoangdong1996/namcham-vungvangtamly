import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ActivityShell, ChoiceChip, toggleIn } from "@/components/cham-two/choice";

const OBSERVE = ["Cơ thể đang căng cứng hoặc mệt mỏi", "Suy nghĩ đang chạy rất nhanh", "Mình đang lo lắng về một việc", "Mình cần nghỉ ngơi", "Mình chưa xác định được điều gì đang xảy ra"];
const NEXT = ["Uống nước hoặc nghỉ ngơi một chút", "Chia việc đang làm thành bước nhỏ hơn", "Tạm rời màn hình", "Viết ra điều đang khiến mình bận tâm", "Trò chuyện với người đáng tin cậy", "Tìm hỗ trợ nếu khó khăn kéo dài"];

function Breathing({ onDone }: { onDone: () => void }) {
  const [running, setRunning] = useState(true);
  const [phase, setPhase] = useState<"in" | "out">("in");
  const [left, setLeft] = useState(60);
  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setLeft((l) => (l <= 1 ? 0 : l - 1)), 1000);
    return () => clearInterval(t);
  }, [running]);
  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setPhase((p) => (p === "in" ? "out" : "in")), phase === "in" ? 4000 : 5000);
    return () => clearTimeout(t);
  }, [phase, running]);
  useEffect(() => { if (left === 0) setRunning(false); }, [left]);
  return (
    <div className="space-y-4 text-center">
      <div className="mx-auto flex size-56 items-center justify-center">
        <div aria-hidden="true" className="flex items-center justify-center rounded-full bg-mint transition-all ease-in-out motion-reduce:transition-none"
          style={{ width: running && phase === "in" ? "14rem" : "8rem", height: running && phase === "in" ? "14rem" : "8rem", transitionDuration: phase === "in" ? "4000ms" : "5000ms" }}>
          <span className="font-display text-lg font-bold text-primary">{left === 0 ? "Xong" : !running ? "Tạm dừng" : phase === "in" ? "Hít vào…" : "Thở ra…"}</span>
        </div>
      </div>
      <p aria-live="polite" className="text-sm font-semibold">Còn khoảng {left} giây</p>
      <ul className="mx-auto max-w-md space-y-1 text-left text-sm">
        <li>• Hít vào nhẹ nhàng trong khoảng 3–4 giây.</li>
        <li>• Thở ra chậm rãi trong khoảng 4–6 giây.</li>
        <li>• Lặp lại vài nhịp theo cảm giác thoải mái. Không cần nín thở hay hít thật sâu.</li>
      </ul>
      <p className="text-sm text-plum">Nếu thấy chóng mặt hoặc không thoải mái, hãy dừng ngay và thở bình thường.</p>
      <div className="flex flex-wrap justify-center gap-3">
        {left > 0 && <Button variant="outline" onClick={() => setRunning(!running)}>{running ? "Dừng ngay" : "Tiếp tục thở"}</Button>}
        <Button onClick={onDone}>{left === 0 ? "Tiếp tục" : "Bỏ qua bước này"}</Button>
      </div>
    </div>
  );
}

export function CalmStop() {
  const [step, setStep] = useState(1);
  const [observe, setObserve] = useState<string[]>([]);
  const [next, setNext] = useState("");
  const restart = () => { setStep(1); setObserve([]); setNext(""); };
  const titles = ["Bước 1 – Dừng lại", "Bước 2 – Thở chậm, nhẹ nhàng", "Bước 3 – Quan sát hiện tại", "Bước 4 – Chọn bước tiếp theo"];
  return (
    <ActivityShell id="nut-dung" n={1} title="Nút dừng bình tĩnh" goal="Tạm dừng phản ứng tức thời khi căng thẳng, nhận biết trạng thái hiện tại và lựa chọn bước tiếp theo phù hợp.">
      <ol className="flex gap-2" aria-label={`Bước ${step} trên 4`}>{[1, 2, 3, 4].map((s) => <li key={s} className={`h-2 flex-1 rounded-full ${s <= step ? "bg-primary" : "bg-pink-soft"}`} />)}</ol>
      <div className="space-y-4 rounded-xl bg-pink-soft p-5">
        <h3 className="font-display text-xl font-bold text-plum">{titles[step - 1]}</h3>
        {step === 1 && <><p className="leading-relaxed">“Bạn không cần giải quyết mọi việc ngay lúc này. Hãy cho mình một khoảng dừng ngắn.”</p><Button onClick={() => setStep(2)}>Bắt đầu 1 phút cho bản thân</Button></>}
        {step === 2 && <Breathing onDone={() => setStep(3)} />}
        {step === 3 && <><p className="text-sm text-muted-foreground">Mình đang nhận thấy điều gì? (Tự quan sát, không phải đánh giá.)</p><div className="flex flex-wrap gap-2">{OBSERVE.map((o) => <ChoiceChip key={o} selected={observe.includes(o)} onClick={() => setObserve((c) => toggleIn(c, o))}>{o}</ChoiceChip>)}</div></>}
        {step === 4 && <>
          <div className="flex flex-wrap gap-2">{NEXT.map((o) => <ChoiceChip key={o} selected={next === o} onClick={() => setNext(o)}>{o}</ChoiceChip>)}</div>
          {next && <div role="status" className="space-y-3 rounded-lg bg-card p-4">
            <p className="font-semibold text-primary">Bạn vừa dành một khoảng thời gian để chú ý đến bản thân. Một bước nhỏ phù hợp cũng có thể giúp bạn bắt đầu lại.</p>
            <div className="flex flex-wrap gap-3"><Button variant="outline" onClick={restart}>Thực hành lại</Button><Button asChild><a href="#phong-tap">Chọn hoạt động tiếp theo</a></Button></div>
          </div>}
        </>}
      </div>
      <div className="flex flex-wrap gap-3">
        {step > 1 && <Button variant="outline" onClick={() => setStep(step - 1)}>Quay lại</Button>}
        {step === 3 && <Button onClick={() => setStep(4)}>Tiếp tục</Button>}
        <Button variant="ghost" onClick={restart}>Kết thúc</Button>
      </div>
    </ActivityShell>
  );
}
