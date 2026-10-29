import { useState } from "react";
import { Plus, Printer, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ActivityShell, ChoiceChip, toggleIn } from "./choice";

const HABIT_QUESTIONS = ["Tôi thường sử dụng mạng xã hội vào những thời điểm nào?", "Tôi có thường xuyên kiểm tra thông báo khi đang học hoặc nghỉ ngơi không?", "Việc sử dụng thiết bị có ảnh hưởng đến giấc ngủ hoặc sự tập trung của tôi không?", "Một thói quen số tôi muốn điều chỉnh là gì?"];
export const SUGGESTED_GOALS = ["Tắt thông báo không cần thiết", "Không dùng điện thoại trong một khoảng thời gian học tập đã chọn", "Dừng sử dụng thiết bị vào thời điểm đã định", "Dành thời gian vận động hoặc đi bộ", "Không so sánh bản thân với hình ảnh trên mạng", "Dành thời gian trò chuyện trực tiếp với người thân hoặc bạn bè", "Kiểm chứng thông tin trước khi chia sẻ"];
const RECOVERY = ["Đi bộ hoặc vận động", "Nghe nhạc", "Đọc sách", "Viết nhật ký", "Làm việc mình yêu thích", "Trò chuyện với người tin cậy", "Nghỉ ngơi và điều chỉnh giấc ngủ", "Tạm rời màn hình", "Thực hành hít thở chậm, nhẹ nhàng"];
const PEOPLE_EXAMPLES = ["Người thân", "Bạn bè", "Giáo viên chủ nhiệm", "Giáo viên hoặc nhân viên phụ trách hỗ trợ học sinh", "Chuyên gia tâm lý hoặc cơ sở hỗ trợ chuyên môn"];
const emptyPlan = () => Array.from({ length: 7 }, () => ({ goal: "", action: "", done: false, note: "" }));

export function SelfCareNotebook() {
  const [habits, setHabits] = useState(["", "", "", ""]);
  const [plan, setPlan] = useState(emptyPlan);
  const [recovery, setRecovery] = useState<string[]>([]);
  const [today, setToday] = useState("");
  const [people, setPeople] = useState([{ id: 0, value: "" }]);
  const [nextId, setNextId] = useState(1);
  const [pledge, setPledge] = useState("");
  const [finished, setFinished] = useState(false);
  const updateDay = (i: number, c: Partial<ReturnType<typeof emptyPlan>[number]>) => setPlan((p) => p.map((d, j) => (j === i ? { ...d, ...c } : d)));
  const addPerson = (value = "") => { setPeople((p) => [...p, { id: nextId, value }]); setNextId((n) => n + 1); };
  const reset = () => { setHabits(["", "", "", ""]); setPlan(emptyPlan()); setRecovery([]); setToday(""); setPeople([{ id: nextId, value: "" }]); setNextId((n) => n + 1); setPledge(""); setFinished(false); };
  const h = "mb-4 font-display text-xl font-bold text-plum";

  return (
    <ActivityShell id="so-tay" n={4} title="Sổ tay chăm sóc bản thân" goal="Chuyển nhận thức thành hành động cụ thể, vừa sức và có thể áp dụng trong đời sống hằng ngày.">
      <fieldset disabled={finished} className="space-y-8 rounded-xl border-l-8 border-pink-band bg-pink-soft/50 p-4 sm:p-6">
        <fieldset className="space-y-4">
          <legend className={h}>Mục 1 – Thói quen số của tôi</legend>
          <div className="grid gap-4 md:grid-cols-2">
            {HABIT_QUESTIONS.map((q, i) => <label key={q} className="space-y-2 text-sm font-semibold"><span className="block">{q}</span><Textarea value={habits[i]} onChange={(e) => setHabits((c) => c.map((v, j) => (j === i ? e.target.value : v)))} placeholder="Tự nguyện, không bắt buộc" className="min-h-20 bg-card font-normal" /></label>)}
          </div>
        </fieldset>

        <div className="space-y-3">
          <h3 className={h}>Mục 2 – Kế hoạch sử dụng Internet cân bằng trong 7 ngày</h3>
          <p className="text-sm text-muted-foreground">Không bắt buộc hoàn thành đủ 7 ngày. Bạn có thể tự sửa mục tiêu bất kỳ lúc nào.</p>
          <Button type="button" variant="outline" onClick={() => setPlan((p) => p.map((d, i) => ({ ...d, goal: SUGGESTED_GOALS[i]! })))}>Dùng mục tiêu gợi ý</Button>
          <div className="space-y-3">
            {plan.map((d, i) => (
              <fieldset key={i} className="grid min-w-0 gap-3 rounded-lg bg-card p-4 md:grid-cols-[4.5rem_1fr_1fr_1fr_5rem] md:items-start">
                <legend className="sr-only">Ngày {i + 1}</legend>
                <span className="pt-2 font-bold text-primary">Ngày {i + 1}</span>
                <Textarea aria-label={`Mục tiêu ngày ${i + 1}`} placeholder="Mục tiêu nhỏ" value={d.goal} onChange={(e) => updateDay(i, { goal: e.target.value })} className="min-h-16" />
                <Textarea aria-label={`Hành động ngày ${i + 1}`} placeholder="Hành động dự kiến" value={d.action} onChange={(e) => updateDay(i, { action: e.target.value })} className="min-h-16" />
                <Textarea aria-label={`Điều nhận thấy ngày ${i + 1}`} placeholder="Điều tôi nhận thấy" value={d.note} onChange={(e) => updateDay(i, { note: e.target.value })} className="min-h-16" />
                <label className="flex cursor-pointer items-center gap-2 py-2 text-sm"><Checkbox aria-label={`Hoàn thành ngày ${i + 1}`} checked={d.done} onCheckedChange={(c) => updateDay(i, { done: c === true })} />Xong</label>
              </fieldset>
            ))}
          </div>
        </div>

        <fieldset className="space-y-3">
          <legend className={h}>Mục 3 – Điều giúp tôi hồi phục</legend>
          <div className="flex flex-wrap gap-2">{RECOVERY.map((r) => <ChoiceChip key={r} selected={recovery.includes(r)} onClick={() => { setRecovery((c) => toggleIn(c, r)); if (today === r) setToday(""); }}>{r}</ChoiceChip>)}</div>
          {recovery.length > 0 && <div className="space-y-2 rounded-lg bg-mint-soft p-4">
            <p className="text-sm font-semibold">Hãy chọn một hoạt động phù hợp để thực hiện trong hôm nay:</p>
            <div className="flex flex-wrap gap-2">{recovery.map((r) => <ChoiceChip key={r} selected={today === r} onClick={() => setToday(r)}>{r}</ChoiceChip>)}</div>
            {today && <p role="status" className="text-sm font-semibold text-primary">Hôm nay mình sẽ thử: {today}.</p>}
          </div>}
        </fieldset>

        <fieldset className="space-y-3">
          <legend className={h}>Mục 4 – Những người tôi có thể tìm đến</legend>
          <p className="text-sm text-muted-foreground">Chỉ cần ghi vai trò hoặc tên. Không bắt buộc tên thật, số điện thoại hay thông tin liên hệ; thông tin không được gửi đi.</p>
          <div className="flex flex-wrap gap-2">{PEOPLE_EXAMPLES.map((p) => <Button key={p} type="button" size="sm" variant="outline" onClick={() => addPerson(p)}><Plus />{p}</Button>)}</div>
          {people.map((p, i) => <div key={p.id} className="flex items-center gap-2"><Input aria-label={`Người tin cậy ${i + 1}`} value={p.value} onChange={(e) => setPeople((c) => c.map((v) => (v.id === p.id ? { ...v, value: e.target.value } : v)))} className="bg-card" /><Button type="button" variant="ghost" size="icon" aria-label={`Xóa người tin cậy ${i + 1}`} onClick={() => setPeople((c) => c.filter((v) => v.id !== p.id))}><Trash2 /></Button></div>)}
          <Button type="button" variant="outline" onClick={() => addPerson()}><Plus />Thêm người tin cậy</Button>
        </fieldset>

        <fieldset className="space-y-3">
          <legend className={h}>Mục 5 – Cam kết nhỏ với bản thân</legend>
          <label className="flex flex-wrap items-center gap-2 text-sm font-semibold">Trong 24 giờ tới, tôi sẽ thử<Input aria-label="Cam kết của tôi" value={pledge} onChange={(e) => setPledge(e.target.value)} className="w-full max-w-xs bg-card sm:w-64" />để chăm sóc bản thân tốt hơn.</label>
        </fieldset>
      </fieldset>

      {finished && <p role="status" className="rounded-lg bg-mint-soft p-4 font-semibold text-primary">Bạn đã hoàn thành sổ tay. Không cần làm mọi thứ hoàn hảo – hãy giữ lại điều phù hợp với bản thân.</p>}
      <div className="flex flex-wrap gap-3 print:hidden">
        {finished ? <Button variant="outline" onClick={() => setFinished(false)}>Chỉnh sửa</Button> : <Button onClick={() => setFinished(true)}>Hoàn thành sổ tay</Button>}
        <Button variant="outline" onClick={reset}>Làm lại</Button>
        <Button variant="outline" onClick={() => window.print()}><Printer />In sổ tay</Button>
      </div>
      <p className="text-xs text-muted-foreground">Nội dung chỉ nằm trong phiên hiện tại, không lưu trên máy hay gửi lên máy chủ. Nút “In sổ tay” mở hộp thoại in của trình duyệt.</p>
    </ActivityShell>
  );
}
