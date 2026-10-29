import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CHALLENGE_STEPS, EXAMPLE_PLAN, RECOVERY_ACTIVITIES } from "./data";

const EMPTY_PLAN = Array.from({ length: 7 }, () => ({ goal: "", action: "", done: false }));

export function SelfCareNotebook() {
  const [habits, setHabits] = useState(["", "", ""]);
  const [plan, setPlan] = useState(EMPTY_PLAN);
  const [recovery, setRecovery] = useState<string[]>([]);
  const [people, setPeople] = useState([{ id: 0, value: "" }]);
  const [nextId, setNextId] = useState(1);
  const updateDay = (index: number, change: Partial<(typeof EMPTY_PLAN)[number]>) => setPlan((current) => current.map((day, i) => i === index ? { ...day, ...change } : day));

  return (
    <div className="space-y-8">
      <fieldset className="space-y-4">
        <legend className="mb-4 font-display text-xl font-bold text-plum">1. Thói quen số của tôi</legend>
        <div className="grid gap-4 md:grid-cols-3">
          {["Mình dành bao nhiêu thời gian dùng mạng?", "Mình thường kiểm tra thông báo khi nào?", "Mình muốn dừng sử dụng thiết bị lúc nào?"].map((question, index) => <label key={question} className="space-y-2 text-sm font-semibold"><span className="block">{question}</span><Textarea value={habits[index] ?? ""} onChange={(event) => setHabits((current) => current.map((value, i) => i === index ? event.target.value : value))} className="min-h-28 bg-card font-normal" /></label>)}
        </div>
      </fieldset>
      <div className="space-y-4">
        <h3 className="font-display text-xl font-bold text-plum">2. Kế hoạch sử dụng Internet cân bằng trong 7 ngày</h3>
        <p className="text-sm text-muted-foreground">Mọi ví dụ dưới đây chỉ là minh họa, không phải dữ liệu nghiên cứu thật.</p>
        <Button type="button" variant="outline" onClick={() => setPlan(EXAMPLE_PLAN.map((day) => ({ ...day, done: false })))}>Điền kế hoạch minh họa</Button>
        <div className="hidden grid-cols-[4rem_1fr_1fr_6rem] gap-3 border-b border-border pb-3 text-sm font-bold text-primary md:grid" aria-hidden="true"><span>Ngày</span><span>Mục tiêu nhỏ</span><span>Hành động thực hiện</span><span>Hoàn thành</span></div>
        <div className="space-y-3">
          {plan.map((day, index) => <fieldset key={index} className="grid min-w-0 gap-3 rounded-lg border border-border bg-pink-soft p-4 md:grid-cols-[4rem_1fr_1fr_6rem] md:items-start md:rounded-none md:border-0 md:border-b md:bg-transparent md:px-0">
            <legend className="sr-only">Ngày {index + 1}</legend>
            <span className="pt-2 font-bold text-primary">Ngày {index + 1}</span>
            <label><span className="mb-2 block text-sm font-semibold md:sr-only">Mục tiêu nhỏ</span><Textarea aria-label={`Mục tiêu ngày ${index + 1}`} value={day.goal} onChange={(event) => updateDay(index, { goal: event.target.value })} className="min-h-20 bg-card" /></label>
            <label><span className="mb-2 block text-sm font-semibold md:sr-only">Hành động thực hiện</span><Textarea aria-label={`Hành động ngày ${index + 1}`} value={day.action} onChange={(event) => updateDay(index, { action: event.target.value })} className="min-h-20 bg-card" /></label>
            <label className="flex cursor-pointer items-center gap-2 py-2 text-sm"><Checkbox aria-label={`Hoàn thành ngày ${index + 1}`} checked={day.done} onCheckedChange={(checked) => updateDay(index, { done: checked === true })} /><span className="md:sr-only">Hoàn thành</span></label>
          </fieldset>)}
        </div>
      </div>
      <fieldset>
        <legend className="mb-4 font-display text-xl font-bold text-plum">3. Điều giúp tôi hồi phục</legend>
        <div className="flex flex-wrap gap-3">{RECOVERY_ACTIVITIES.map((activity) => <label key={activity} className="flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-mint-soft p-3 text-sm font-semibold"><Checkbox checked={recovery.includes(activity)} onCheckedChange={() => setRecovery((current) => current.includes(activity) ? current.filter((value) => value !== activity) : [...current, activity])} />{activity}</label>)}</div>
      </fieldset>
      <fieldset className="space-y-3">
        <legend className="mb-3 font-display text-xl font-bold text-plum">4. Những người tôi có thể tìm đến</legend>
        <p className="text-sm text-muted-foreground">Chỉ cần ghi vai trò hoặc tên người tin cậy. Không bắt buộc cung cấp thông tin liên hệ.</p>
        {people.map((person, index) => <div key={person.id} className="flex items-center gap-2"><Input aria-label={`Người tin cậy ${index + 1}`} value={person.value} onChange={(event) => setPeople((current) => current.map((value) => value.id === person.id ? { ...value, value: event.target.value } : value))} className="bg-card" /><Button type="button" variant="ghost" size="icon" aria-label={`Xóa người tin cậy ${index + 1}`} title="Xóa người tin cậy" onClick={() => setPeople((current) => current.filter((value) => value.id !== person.id))}><Trash2 /></Button></div>)}
        <Button type="button" variant="outline" onClick={() => { setPeople((current) => [...current, { id: nextId, value: "" }]); setNextId((current) => current + 1); }}><Plus />Thêm người tin cậy</Button>
      </fieldset>
    </div>
  );
}

export function IntentionalDayChallenge() {
  const [completed, setCompleted] = useState<string[]>([]);
  const [studyTime, setStudyTime] = useState("");
  const [reflection, setReflection] = useState("");
  return <div className="space-y-5">
    <h3 className="font-display text-xl font-bold text-plum">Một ngày sử dụng mạng xã hội có chủ đích</h3>
    <label className="block space-y-2 text-sm font-semibold"><span>Khoảng thời gian học tập mình chọn</span><Input value={studyTime} onChange={(event) => setStudyTime(event.target.value)} className="max-w-lg bg-card" /></label>
    <div className="space-y-3">{CHALLENGE_STEPS.map((step) => <label key={step} className="flex cursor-pointer items-start gap-3 rounded-lg bg-mint-soft p-4 text-sm font-medium leading-relaxed"><Checkbox className="mt-1" checked={completed.includes(step)} onCheckedChange={() => setCompleted((current) => current.includes(step) ? current.filter((value) => value !== step) : [...current, step])} /><span>{step}</span></label>)}</div>
    <label className="block space-y-2 text-sm font-semibold"><span>Điều gì hữu ích với bản thân sau thử thách?</span><Textarea value={reflection} onChange={(event) => setReflection(event.target.value)} className="min-h-28 bg-card font-normal" /></label>
    {completed.length === CHALLENGE_STEPS.length && <p role="status" className="font-semibold text-primary">Mình đã dành một ngày sử dụng mạng xã hội có chủ đích. Hãy giữ lại điều phù hợp với bản thân, không cần làm mọi thứ hoàn hảo.</p>}
  </div>;
}