import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Printer, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { ActivityShell } from "@/components/cham-two/choice";

export const DAYS = [
  { t: "Dừng lại để lắng nghe", g: "Dành một khoảng ngắn để nhận biết cảm xúc và nhu cầu hiện tại." },
  { t: "Cân bằng không gian số", g: "Tắt một số thông báo không cần thiết hoặc chọn thời điểm kiểm tra mạng phù hợp." },
  { t: "Chăm sóc cơ thể", g: "Lựa chọn một hành động phù hợp như vận động nhẹ, nghỉ ngơi hoặc điều chỉnh giờ đi ngủ." },
  { t: "Thay đổi góc nhìn", g: "Khi có suy nghĩ tiêu cực, thử phân biệt điều mình biết chắc với điều mình đang suy đoán." },
  { t: "Kết nối trực tiếp", g: "Dành thời gian trò chuyện hoặc tham gia một hoạt động với người thân, bạn bè hay người đáng tin cậy." },
  { t: "Làm một việc có ý nghĩa", g: "Dành thời gian cho sở thích, hoạt động sáng tạo, đọc sách hoặc một nhiệm vụ nhỏ mà mình muốn hoàn thành." },
  { t: "Nhìn lại và điều chỉnh", g: "Tự suy ngẫm về điều hữu ích, điều khó thực hiện và một thói quen muốn tiếp tục." },
];
const fresh = () => DAYS.map((d) => ({ goal: d.g, action: "", done: false, note: "" }));

export function SevenDayChallenge() {
  const [started, setStarted] = useState(false);
  const [plan, setPlan] = useState(fresh);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const off = () => document.documentElement.classList.remove("pp-printing");
    window.addEventListener("afterprint", off);
    return () => window.removeEventListener("afterprint", off);
  }, []);
  const upd = (i: number, c: Partial<ReturnType<typeof fresh>[number]>) => setPlan((p) => p.map((d, j) => (j === i ? { ...d, ...c } : d)));
  const print = () => { document.documentElement.classList.add("pp-printing"); window.print(); };

  return (
    <ActivityShell id="thu-thach-7-ngay" n={4} title="Thử thách 7 ngày vững vàng" goal="Chuyển kiến thức thành hành vi thực tế, hình thành thói quen ứng phó tích cực và cân bằng giữa không gian số với đời sống trực tiếp.">
      <p className="text-sm text-muted-foreground">Bạn có thể sửa kế hoạch hoặc bỏ qua ngày bất kỳ. Không cần hoàn thành đủ 7 ngày – số ngày hoàn thành không dùng để đánh giá sức khỏe tâm lý.</p>
      <div className="flex flex-wrap gap-3">
        {!started && <Button onClick={() => setStarted(true)}>Bắt đầu thử thách</Button>}
        <Button variant="outline" onClick={() => setPlan(fresh())}><RotateCcw />Làm lại kế hoạch</Button>
        <Button variant="outline" onClick={print}><Printer />In kế hoạch 7 ngày</Button>
      </div>
      {started && <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {plan.map((d, i) => <fieldset key={i} className={`min-w-0 space-y-2 rounded-xl border p-4 ${d.done ? "border-primary bg-mint-soft" : "border-pink-band bg-pink-soft"}`}>
          <legend className="sr-only">Ngày {i + 1}</legend>
          <p className="font-display font-bold text-primary">Ngày {i + 1} – {DAYS[i]!.t}{d.done && " ✓"}</p>
          <label className="block text-xs font-semibold">Mục tiêu nhỏ<Textarea aria-label={`Mục tiêu ngày ${i + 1}`} value={d.goal} onChange={(e) => upd(i, { goal: e.target.value })} className="mt-1 min-h-16 bg-card font-normal" /></label>
          <label className="block text-xs font-semibold">Hành động tôi chọn<Textarea aria-label={`Hành động ngày ${i + 1}`} value={d.action} onChange={(e) => upd(i, { action: e.target.value })} className="mt-1 min-h-14 bg-card font-normal" /></label>
          <label className="block text-xs font-semibold">Ghi chú (tự nguyện)<Textarea aria-label={`Ghi chú ngày ${i + 1}`} value={d.note} onChange={(e) => upd(i, { note: e.target.value })} className="mt-1 min-h-14 bg-card font-normal" /></label>
          <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold"><Checkbox aria-label={`Hoàn thành ngày ${i + 1}`} checked={d.done} onCheckedChange={(c) => upd(i, { done: c === true })} />Đã thực hiện</label>
        </fieldset>)}
      </div>}
      <p className="text-xs text-muted-foreground">Kế hoạch chỉ nằm trong phiên hiện tại, không được lưu hay gửi lên máy chủ. Nút in mở hộp thoại in của trình duyệt (có thể chọn “Lưu dưới dạng PDF”).</p>
      {mounted && createPortal(<div id="print-plan" className="pn-doc">
        <h1 className="pp-title">THỬ THÁCH 7 NGÀY VỮNG VÀNG</h1>
        <p className="pp-sub">Chạm 3 – Vững vàng · 5 CHẠM – VỮNG VÀNG TÂM LÝ · Trường THPT Tây Tiền Hải</p>
        <table className="pn-table">
          <thead><tr><th>Ngày</th><th>Mục tiêu nhỏ</th><th>Hành động tôi chọn</th><th>Xong</th><th>Ghi chú</th></tr></thead>
          <tbody>{plan.map((d, i) => <tr key={i}><td className="pn-day">{i + 1}<br /><span className="pp-daytitle">{DAYS[i]!.t}</span></td><td>{d.goal}</td><td>{d.action}</td><td className="pn-center"><span className="pn-box">{d.done ? "✓" : ""}</span></td><td>{d.note}</td></tr>)}</tbody>
        </table>
        <p className="pn-note">Không cần hoàn thành đủ 7 ngày. Hôm nay, bạn không cần thay đổi tất cả – hãy chọn một việc nhỏ, vừa sức và bắt đầu từ đó.</p>
      </div>, document.body)}
    </ActivityShell>
  );
}
