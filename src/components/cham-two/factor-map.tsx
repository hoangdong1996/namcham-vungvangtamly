import { useState } from "react";
import { ShieldCheck, Sprout } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { PRESSURE_FACTORS, PROTECTIVE_FACTORS } from "./data";

export function FactorMap() {
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (id: string) => setSelected((current) => current.includes(id) ? current.filter((value) => value !== id) : [...current, id]);
  const suggestions = [...PRESSURE_FACTORS, ...PROTECTIVE_FACTORS].filter((factor) => selected.includes(factor.id));

  return (
    <div className="space-y-5">
      <div className="grid gap-6 md:grid-cols-2">
        {[{ title: "Nhóm A – Những yếu tố có thể làm tăng áp lực", items: PRESSURE_FACTORS, icon: Sprout, tone: "bg-pink-soft" }, { title: "Nhóm B – Những yếu tố giúp bảo vệ sức khỏe tâm lý", items: PROTECTIVE_FACTORS, icon: ShieldCheck, tone: "bg-mint-soft" }].map((group) => (
          <fieldset key={group.title} className="min-w-0 space-y-3">
            <legend className="mb-4 flex items-start gap-2 font-display text-lg font-bold text-primary"><group.icon className="mt-1 size-5 shrink-0" />{group.title}</legend>
            {group.items.map((factor) => (
              <label key={factor.id} className={`flex min-h-16 cursor-pointer items-start gap-3 rounded-lg border p-4 text-sm font-medium leading-relaxed transition-colors ${selected.includes(factor.id) ? "border-primary bg-mint" : `border-border ${group.tone}`}`}>
                <Checkbox className="mt-1" checked={selected.includes(factor.id)} onCheckedChange={() => toggle(factor.id)} />
                <span>{factor.label}</span>
              </label>
            ))}
          </fieldset>
        ))}
      </div>
      <div aria-live="polite" className="border-l-4 border-primary bg-mint-soft p-5">
        <h3 className="font-display text-lg font-bold text-primary">Gợi ý hành động cho mình</h3>
        {suggestions.length === 0 ? <p className="mt-2 text-sm leading-relaxed">Chọn những yếu tố phù hợp với bản thân để xem gợi ý. Không chấm điểm, không tính điểm nguy cơ trầm cảm.</p> : <ul className="mt-3 space-y-3">{suggestions.map((factor) => <li key={factor.id} className="text-sm leading-relaxed"><strong>{factor.label}: </strong>{factor.action}</li>)}</ul>}
      </div>
    </div>
  );
}