import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ActivityShell, ChoiceChip, toggleIn } from "./choice";

const EMOTIONS = ["Vui vẻ", "Bình yên", "Hào hứng", "Lo lắng", "Buồn bã", "Cô đơn", "Thất vọng", "Tự ti", "Ghen tị", "Mệt mỏi", "Bối rối", "Khác"];
const CAUSES = ["Điểm số hoặc áp lực học tập", "So sánh bản thân với người khác trên mạng xã hội", "Lượt thích, bình luận hoặc phản hồi trực tuyến", "Mối quan hệ với bạn bè", "Gia đình", "Thiếu ngủ hoặc mệt mỏi", "Quá tải thông tin, sử dụng điện thoại kéo dài", "Một lý do khác hoặc mình chưa rõ nguyên nhân"];
export const NEEDS: Record<string, string> = {
  "Nghỉ ngơi": "Cho mình 10–15 phút nghỉ thật sự: uống nước, nhắm mắt hoặc nằm thư giãn, không cầm điện thoại.",
  "Được lắng nghe": "Thử viết ra vài dòng về điều mình đang trải qua, hoặc nhắn một người tin cậy: “Bạn có thể nghe mình kể một chút không?”",
  "Tạm rời màn hình": "Đặt điện thoại ở phòng khác trong 30 phút và làm một việc nhẹ nhàng ngoài màn hình.",
  "Trò chuyện với người tin cậy": "Chọn một người mình thấy an toàn – người thân, bạn bè hoặc thầy cô – và hẹn một lúc để trò chuyện.",
  "Vận động hoặc làm điều mình yêu thích": "Đi bộ vài vòng, giãn cơ hoặc dành chút thời gian cho sở thích của mình.",
  "Sắp xếp lại công việc": "Viết ra 3 việc cần làm, chọn một việc nhỏ nhất và bắt đầu từ đó.",
  "Tìm kiếm sự hỗ trợ": "Bạn không phải tự mình vượt qua mọi thứ. Hãy tìm đến người lớn đáng tin cậy hoặc người có chuyên môn.",
  "Mình chưa biết mình cần gì": "Không sao cả. Thử hít thở chậm vài nhịp và tự hỏi: “Điều gì có thể giúp mình dễ chịu hơn một chút?”",
};

export function EmotionMirror() {
  const [step, setStep] = useState(1);
  const [emotions, setEmotions] = useState<string[]>([]);
  const [causes, setCauses] = useState<string[]>([]);
  const [needs, setNeeds] = useState<string[]>([]);
  const reset = () => { setEmotions([]); setCauses([]); setNeeds([]); setStep(1); };
  const steps = [
    { title: "Bước 1 – Hôm nay mình đang cảm thấy thế nào?", items: EMOTIONS, value: emotions, set: setEmotions },
    { title: "Bước 2 – Điều gì có thể đang ảnh hưởng đến mình?", items: CAUSES, value: causes, set: setCauses },
    { title: "Bước 3 – Lúc này mình cần điều gì?", items: Object.keys(NEEDS), value: needs, set: setNeeds },
  ];
  const current = steps[step - 1];

  return (
    <ActivityShell id="guong-cam-xuc" n={1} title="Gương cảm xúc" goal="Nhận diện cảm xúc, tìm hiểu yếu tố có thể ảnh hưởng đến cảm xúc và xác định nhu cầu chăm sóc bản thân.">
      <ol className="flex gap-2" aria-label="Tiến trình">
        {[1, 2, 3, 4].map((s) => <li key={s} className={`h-2 flex-1 rounded-full ${s <= step ? "bg-primary" : "bg-pink-soft"}`} />)}
      </ol>
      {current ? (
        <div className="space-y-4">
          <h3 className="font-display text-xl font-bold text-plum">{current.title}</h3>
          <p className="text-sm text-muted-foreground">Có thể chọn một hoặc nhiều. Mọi cảm xúc đều được chấp nhận.</p>
          <div className="flex flex-wrap gap-2">
            {current.items.map((item) => <ChoiceChip key={item} selected={current.value.includes(item)} onClick={() => current.set((v) => toggleIn(v, item))}>{item}</ChoiceChip>)}
          </div>
          <div className="flex flex-wrap gap-3">
            {step > 1 && <Button variant="outline" onClick={() => setStep(step - 1)}>Quay lại</Button>}
            <Button onClick={() => setStep(step + 1)}>{step === 3 ? "Xem gợi ý" : "Tiếp tục"}</Button>
          </div>
        </div>
      ) : (
        <div role="status" className="space-y-4">
          <p className="border-l-4 border-primary bg-mint-soft p-5 text-sm font-semibold leading-relaxed">Cảm xúc là tín hiệu giúp bạn nhận ra điều mình đang trải qua. Bạn không cần phải giải quyết mọi thứ ngay lập tức. Hãy thử bắt đầu từ một hành động nhỏ phù hợp với nhu cầu hiện tại.</p>
          {emotions.length > 0 && <p className="text-sm"><strong>Cảm xúc mình nhận ra:</strong> {emotions.join(", ")}</p>}
          <h3 className="font-display text-lg font-bold text-plum">Gợi ý tự chăm sóc</h3>
          <ul className="space-y-2">
            {(needs.length ? needs : ["Mình chưa biết mình cần gì"]).map((n) => <li key={n} className="rounded-lg bg-pink-soft p-4 text-sm leading-relaxed"><strong>{n}: </strong>{NEEDS[n]}</li>)}
          </ul>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={() => setStep(1)}>Thay đổi lựa chọn</Button>
            <Button variant="outline" onClick={reset}>Làm lại</Button>
            <Button onClick={reset}>Kết thúc (không lưu)</Button>
          </div>
        </div>
      )}
    </ActivityShell>
  );
}
