import { useEffect, useState } from "react";
import { Footprints, HeartHandshake, ListChecks, Music, NotebookPen, Coffee, Eye, SmartphoneNfc } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ActivityShell, ChoiceChip } from "@/components/cham-two/choice";

export const STATIONS = [
  { t: "Rời màn hình một chút", d: "Đặt điện thoại xuống và chuyển sang một hoạt động ngoài màn hình.", icon: SmartphoneNfc, guide: "Úp điện thoại hoặc để ở chỗ khác. Nhìn ra xa, đứng dậy, làm một việc nhỏ không cần màn hình." },
  { t: "Đi bộ hoặc vận động nhẹ", d: "Đi lại, vươn vai hoặc vận động phù hợp với thể trạng.", icon: Footprints, guide: "Đi vài vòng quanh phòng hoặc sân, vươn vai, xoay vai nhẹ. Dừng lại nếu thấy mệt." },
  { t: "Nghe một bản nhạc", d: "Chọn âm nhạc khiến mình cảm thấy dễ chịu.", icon: Music, guide: "Chọn một bài nhạc nhẹ nhàng mình thích, nghe trọn bài và chỉ tập trung vào âm thanh." },
  { t: "Viết ra điều đang bận tâm", d: "Ghi một điều khiến mình khó chịu và một việc nhỏ mình có thể làm.", icon: NotebookPen, guide: "Lấy giấy bút, viết một điều đang khiến mình bận tâm, rồi viết một việc nhỏ mình có thể làm với nó." },
  { t: "Kết nối với người khác", d: "Gửi lời hỏi thăm hoặc trò chuyện với người mình tin tưởng.", icon: HeartHandshake, guide: "Nghĩ đến một người mình tin tưởng, gửi một lời hỏi thăm hoặc hẹn trò chuyện." },
  { t: "Sắp xếp lại công việc", d: "Chọn một nhiệm vụ nhỏ để bắt đầu.", icon: ListChecks, guide: "Liệt kê việc cần làm, chọn một việc nhỏ nhất và làm trong vài phút." },
  { t: "Nghỉ ngơi", d: "Tạm dừng hoạt động, uống nước hoặc dành thời gian thư giãn.", icon: Coffee, guide: "Uống một cốc nước, ngồi thoải mái, thả lỏng vai và cho bản thân nghỉ thật sự." },
  { t: "Thực hành chú ý hiện tại", d: "Quan sát những gì mình nhìn thấy, nghe thấy và cảm nhận mà không ép bản thân phải thay đổi cảm xúc.", icon: Eye, guide: "Kể thầm 5 thứ mình nhìn thấy, 4 âm thanh mình nghe, 3 điều mình cảm nhận được trên cơ thể." },
];
const AFTER = ["Mình thấy dễ chịu hơn một chút", "Mình chưa thấy thay đổi", "Mình muốn thử một cách khác", "Mình muốn tìm người trò chuyện"];
const AFTER_REPLY: Record<string, string> = {
  "Mình thấy dễ chịu hơn một chút": "Thật tốt khi bạn dành thời gian cho mình. Bạn có thể quay lại hoạt động này khi cần.",
  "Mình chưa thấy thay đổi": "Không sao cả – mỗi người có trải nghiệm khác nhau. Bạn có thể nghỉ thêm hoặc thử cách khác.",
  "Mình muốn thử một cách khác": "Hãy chọn một hoạt động khác bên dưới.",
  "Mình muốn tìm người trò chuyện": "Đó là lựa chọn chủ động. Hãy tìm đến người thân, bạn bè, thầy cô hoặc người có chuyên môn mà bạn tin tưởng.",
};

export function RecoveryStation() {
  const [sel, setSel] = useState<number | null>(null);
  const [left, setLeft] = useState(300);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [after, setAfter] = useState("");
  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setLeft((l) => { if (l <= 1) { setRunning(false); setDone(true); return 0; } return l - 1; }), 1000);
    return () => clearInterval(t);
  }, [running]);
  const pick = (k: number | null) => { setSel(k); setLeft(300); setRunning(false); setDone(false); setAfter(""); };
  const s = sel === null ? null : STATIONS[sel]!;
  const mm = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, "0")}`;
  return (
    <ActivityShell id="tram-hoi-phuc" n={3} title="Trạm hồi phục 5 phút" goal="Chọn một hoạt động tự chăm sóc ngắn, vừa sức, phù hợp với hoàn cảnh và có thể thực hiện ngay.">
      {s ? (
        <div className="space-y-4 rounded-xl bg-pink-soft p-5" role="region" aria-label={`Hướng dẫn: ${s.t}`}>
          <div className="flex items-center gap-3"><s.icon className="size-8 text-primary" /><h3 className="font-display text-xl font-bold text-plum">{s.t}</h3></div>
          <p className="leading-relaxed">{s.guide}</p>
          {!done && <p aria-live="polite" className="font-display text-4xl font-bold text-primary">{mm}</p>}
          {!done ? <div className="flex flex-wrap gap-3">
            <Button onClick={() => setRunning(true)} disabled={running}>{left < 300 ? "Tiếp tục" : "Bắt đầu"}</Button>
            <Button variant="outline" onClick={() => setRunning(false)} disabled={!running}>Tạm dừng</Button>
            <Button variant="outline" onClick={() => { setRunning(false); setDone(true); }}>Hoàn thành</Button>
            <Button variant="ghost" onClick={() => pick(null)}>Chọn hoạt động khác</Button>
          </div> : <div className="space-y-3">
            <p className="font-semibold">Sau hoạt động này, mình nhận thấy điều gì? <span className="font-normal text-muted-foreground">(tự nguyện)</span></p>
            <div className="flex flex-wrap gap-2">{AFTER.map((a) => <ChoiceChip key={a} selected={after === a} onClick={() => setAfter(a)}>{a}</ChoiceChip>)}</div>
            {after && <p role="status" className="rounded-lg bg-card p-3 text-sm">{AFTER_REPLY[after]}</p>}
            <Button variant="outline" onClick={() => pick(null)}>Chọn hoạt động khác</Button>
          </div>}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATIONS.map((x, k) => <article key={x.t} className="flex flex-col rounded-xl border border-border bg-mint-soft p-4">
            <x.icon className="size-7 text-primary" />
            <h3 className="mt-2 font-display font-bold text-plum">{x.t}</h3>
            <p className="mt-1 flex-1 text-sm leading-relaxed">{x.d}</p>
            <Button size="sm" className="mt-3 self-start" onClick={() => pick(k)}>Thử hoạt động này</Button>
          </article>)}
        </div>
      )}
      <p className="text-xs text-muted-foreground">Đây là các kỹ năng tự chăm sóc bổ trợ, không thay thế hỗ trợ chuyên môn và không khẳng định sẽ làm hết buồn bã; mỗi người có thể có trải nghiệm khác nhau.</p>
    </ActivityShell>
  );
}
