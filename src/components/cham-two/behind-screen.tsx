import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ActivityShell } from "./choice";

type Option = { text: string; fit: boolean; note: string };
export const SCENARIOS: { title: string; story: string; question: string; options: Option[]; know: string; guess: string; cope: string }[] = [
  { title: "Những hình ảnh hoàn hảo", story: "Một học sinh nhìn thấy bạn bè đăng ảnh đẹp, có nhiều lượt thích và bắt đầu cho rằng cuộc sống của mình kém thú vị hơn.", question: "Điều nào dưới đây là sự thật mà bạn biết chắc?",
    options: [{ text: "Bạn ấy đã đăng một bức ảnh đẹp.", fit: true, note: "Đúng – đây là điều bạn nhìn thấy." }, { text: "Cuộc sống của bạn ấy lúc nào cũng hoàn hảo.", fit: false, note: "Đây là suy đoán – bức ảnh chỉ là một khoảnh khắc được chọn lọc." }, { text: "Cuộc sống của mình kém thú vị hơn.", fit: false, note: "Đây là suy đoán dựa trên so sánh một phần nhỏ." }],
    know: "Bạn ấy đăng một bức ảnh đẹp và có nhiều lượt thích.", guess: "Cuộc sống của bạn ấy luôn hoàn hảo, còn mình kém hơn.", cope: "Nhắc mình rằng mạng xã hội chỉ cho thấy một phần cuộc sống; tạm ẩn nội dung khiến mình áp lực." },
  { title: "Lượt thích và sự công nhận", story: "Một bài đăng nhận được ít lượt thích hơn mong đợi. Người đăng bắt đầu nghĩ rằng mọi người không quan tâm đến mình.", question: "Lượt thích có phản ánh đầy đủ giá trị của một người không?",
    options: [{ text: "Có, ít lượt thích nghĩa là mình không có giá trị.", fit: false, note: "Lượt tương tác phụ thuộc vào thời điểm đăng, thuật toán và nhiều yếu tố khác." }, { text: "Không, lượt thích không đo được giá trị của mình.", fit: true, note: "Lượt tương tác không phải thước đo đầy đủ giá trị cá nhân hay chất lượng của một mối quan hệ." }],
    know: "Bài đăng có ít lượt thích hơn mong đợi.", guess: "Mọi người không quan tâm đến mình.", cope: "Dành sự chú ý cho các mối quan hệ thật ngoài đời và những điều mình trân trọng ở bản thân." },
  { title: "Nỗi sợ bị bỏ lỡ (FOMO)", story: "Một học sinh liên tục kiểm tra điện thoại vì sợ bỏ lỡ cuộc trò chuyện hoặc hoạt động của nhóm bạn.", question: "Bạn có thể làm gì để vừa duy trì kết nối vừa có thời gian học tập và nghỉ ngơi?",
    options: [{ text: "Bật mọi thông báo để không lỡ tin nào.", fit: false, note: "Cách này dễ khiến mình mất tập trung và mệt mỏi hơn." }, { text: "Tắt thông báo không cần thiết và chọn giờ kiểm tra mạng.", fit: true, note: "Mình vẫn kết nối, đồng thời giữ được thời gian học tập và nghỉ ngơi." }],
    know: "Mình đang kiểm tra điện thoại rất thường xuyên.", guess: "Nếu không xem ngay, mình sẽ bị bỏ rơi.", cope: "Tắt thông báo không cần thiết, chọn thời điểm kiểm tra mạng và dành thời gian cho hoạt động ngoài màn hình." },
  { title: "Bình luận gây tổn thương", story: "Một học sinh nhận được bình luận chế giễu ngoại hình hoặc thành tích.", question: "Đâu là cách ứng phó an toàn và phù hợp?",
    options: [{ text: "Đáp trả lại bằng lời lẽ gay gắt.", fit: false, note: "Đáp trả có thể khiến tình huống căng thẳng và tổn thương thêm." }, { text: "Lưu bằng chứng, chặn/báo cáo và tìm người tin cậy hỗ trợ.", fit: true, note: "Đây là cách giúp bạn an toàn và không phải một mình đối diện." }, { text: "Im lặng chịu đựng một mình.", fit: false, note: "Bạn xứng đáng được hỗ trợ – hãy chia sẻ với người tin cậy." }],
    know: "Có người đã viết bình luận gây tổn thương.", guess: "Điều họ nói là đúng về mình.", cope: "Không đáp trả bằng hành vi gây tổn thương; lưu bằng chứng khi cần, chặn hoặc báo cáo tài khoản và tìm sự hỗ trợ." },
  { title: "Người bạn ít nói hơn trước", story: "Một người bạn gần đây ít tương tác, thường im lặng và không còn hào hứng như trước.", question: "Bạn biết điều gì và điều gì vẫn chưa biết?",
    options: [{ text: "Bạn ấy chắc chắn giận mình.", fit: false, note: "Đây là suy đoán – mình chưa biết nguyên nhân." }, { text: "Mình thấy bạn ấy ít nói hơn, nhưng chưa biết vì sao.", fit: true, note: "Phân biệt điều thấy được với điều chưa biết giúp mình không vội kết luận." }],
    know: "Bạn ấy ít tương tác và im lặng hơn trước.", guess: "Bạn ấy giận mình hoặc có chuyện nghiêm trọng.", cope: "Chủ động hỏi thăm nhẹ nhàng, lắng nghe và tôn trọng việc bạn chưa muốn chia sẻ." },
  { title: "Quá tải thông tin", story: "Một học sinh thức khuya xem video, liên tục kiểm tra thông báo và khó tập trung học tập vào ngày hôm sau.", question: "Một thay đổi nhỏ nào có thể giúp bạn cân bằng hơn?",
    options: [{ text: "Đặt giờ dừng dùng thiết bị và tắt thông báo trước khi ngủ.", fit: true, note: "Một thay đổi nhỏ, dễ duy trì có thể giúp giấc ngủ tốt hơn." }, { text: "Thức khuya hơn để xem hết nội dung.", fit: false, note: "Thiếu ngủ thường khiến ngày hôm sau mệt và khó tập trung hơn." }],
    know: "Mình thức khuya và khó tập trung hôm sau.", guess: "Mình không thể thay đổi thói quen này.", cope: "Đặt thời điểm dừng sử dụng thiết bị, tắt thông báo và tạo khoảng nghỉ trước khi ngủ." },
];

export function BehindScreen() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const s = SCENARIOS[index]!;
  const picked = answers[index];
  return (
    <ActivityShell id="phia-sau-man-hinh" n={2} title="Phía sau màn hình" goal="Nhận diện áp lực trong không gian số, phân biệt sự thật với suy đoán và lựa chọn cách ứng phó phù hợp.">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Chọn tình huống">
        {SCENARIOS.map((sc, i) => <button key={sc.title} type="button" role="tab" aria-selected={i === index} onClick={() => setIndex(i)} className={`size-10 rounded-full text-sm font-bold ${i === index ? "bg-primary text-primary-foreground" : answers[i] !== undefined ? "bg-mint text-primary" : "bg-pink-soft text-plum"}`}>{i + 1}</button>)}
      </div>
      <article className="space-y-4 rounded-xl bg-pink-soft p-5">
        <p className="text-xs font-bold uppercase tracking-wider text-plum">Tình huống {index + 1} (minh họa)</p>
        <h3 className="font-display text-xl font-bold text-plum">{s.title}</h3>
        <p className="text-sm leading-relaxed">{s.story}</p>
        <p className="font-semibold">{s.question}</p>
        <div className="grid gap-2">
          {s.options.map((o, i) => <button key={o.text} type="button" aria-pressed={picked === i} onClick={() => setAnswers({ ...answers, [index]: i })} className={`rounded-lg border p-3 text-left text-sm font-medium transition-colors ${picked === i ? "border-primary bg-card" : "border-border bg-card/70 hover:bg-card"}`}>{o.text}</button>)}
        </div>
        {picked !== undefined && (
          <div role="status" className="space-y-3">
            <p className="text-sm font-semibold text-primary">{s.options[picked]!.note}</p>
            <div className="grid gap-3 md:grid-cols-3">
              {[["Điều mình biết", s.know], ["Điều mình đang suy đoán", s.guess], ["Một cách ứng phó phù hợp", s.cope]].map(([h, t]) => <div key={h} className="rounded-lg bg-card p-4"><h4 className="font-display font-bold text-primary">{h}</h4><p className="mt-1 text-sm leading-relaxed">{t}</p></div>)}
            </div>
          </div>
        )}
      </article>
      <div className="flex flex-wrap justify-between gap-3">
        <Button variant="outline" disabled={index === 0} onClick={() => setIndex(index - 1)}><ChevronLeft />Tình huống trước</Button>
        <Button variant="outline" disabled={index === SCENARIOS.length - 1} onClick={() => setIndex(index + 1)}>Tình huống tiếp<ChevronRight /></Button>
      </div>
      <p className="border-l-4 border-primary bg-mint-soft p-4 text-sm leading-relaxed">Những trải nghiệm như so sánh, FOMO hoặc thiếu ngủ không tự động đồng nghĩa với trầm cảm. Tác động còn phụ thuộc vào mức độ, thời gian, hoàn cảnh và nguồn lực hỗ trợ của mỗi người.</p>
    </ActivityShell>
  );
}
