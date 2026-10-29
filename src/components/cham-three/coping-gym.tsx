import { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ActivityShell } from "@/components/cham-two/choice";

type S = { title: string; story: string; options: string[]; good: number; limits: string[]; feedback: string; tryIt: string };
export const GYM: S[] = [
  { title: "Áp lực điểm số", story: "Bạn nhận được kết quả kiểm tra thấp hơn mong đợi. Bạn cảm thấy thất vọng và nghĩ rằng mình không đủ khả năng.",
    options: ["Tự trách mình và bỏ cuộc.", "So sánh kết quả với tất cả bạn bè.", "Xem lại những phần chưa hiểu, chia nhỏ kế hoạch ôn tập và hỏi người có thể giúp mình.", "Giả vờ như mình không quan tâm dù đang rất buồn."], good: 2,
    limits: ["Tự trách khiến mình mệt thêm và khó nhìn ra bước tiếp theo.", "So sánh thường làm tăng áp lực mà không giúp mình hiểu bài hơn.", "", "Che giấu cảm xúc có thể khiến mình chịu đựng một mình."],
    feedback: "Kết quả một bài kiểm tra không quyết định toàn bộ năng lực hoặc giá trị của bạn. Chia nhỏ vấn đề và tìm hỗ trợ học tập có thể giúp bạn xác định bước tiếp theo.", tryIt: "Viết ra 1 phần kiến thức chưa hiểu và hỏi thầy cô hoặc bạn trong tuần này." },
  { title: "So sánh trên mạng xã hội", story: "Bạn thấy người khác đăng ảnh thành công, vui vẻ và bắt đầu cảm thấy mình thua kém.",
    options: ["Tiếp tục xem nội dung khiến mình khó chịu.", "Tự đánh giá giá trị bản thân qua thành tích hoặc lượt thích của người khác.", "Nhắc mình rằng nội dung trực tuyến chỉ phản ánh một phần cuộc sống; chủ động nghỉ xem và quay lại việc có ý nghĩa với mình.", "Đăng nội dung gây chú ý để chứng minh bản thân."], good: 2,
    limits: ["Tiếp tục xem có thể làm cảm giác thua kém mạnh hơn.", "Lượt thích của người khác không phải thước đo giá trị của bạn.", "", "Cách này dễ khiến mình phụ thuộc thêm vào sự công nhận trực tuyến."],
    feedback: "Bạn có thể chủ động lựa chọn nội dung mình xem, giới hạn thời gian sử dụng và tránh dùng hình ảnh trực tuyến làm thước đo duy nhất cho bản thân.", tryIt: "Tạm ẩn một tài khoản khiến mình thấy áp lực." },
  { title: "Bình luận gây tổn thương", story: "Một người đăng bình luận chế giễu ngoại hình hoặc thành tích của bạn.",
    options: ["Đáp trả bằng lời lẽ xúc phạm.", "Im lặng chịu đựng dù sự việc tiếp diễn.", "Không tham gia tranh cãi, lưu bằng chứng khi cần, chặn hoặc báo cáo nội dung và tìm người hỗ trợ.", "Chia sẻ lại thông tin cá nhân của người kia để trả đũa."], good: 2,
    limits: ["Đáp trả dễ làm xung đột leo thang.", "Bạn không cần chịu đựng một mình khi sự việc tiếp diễn.", "", "Trả đũa có thể gây hại cho người khác và cho chính bạn."],
    feedback: "Bảo vệ bản thân không đồng nghĩa với trả đũa. Khi bị bắt nạt hoặc đe dọa, hãy tìm người lớn đáng tin cậy hoặc bộ phận có trách nhiệm hỗ trợ.", tryIt: "Tìm hiểu cách chặn và báo cáo trên ứng dụng mình hay dùng." },
  { title: "Quá tải vì nhiều việc", story: "Bạn có bài tập, hoạt động ngoại khóa và nhiều tin nhắn cần phản hồi. Bạn cảm thấy không biết nên bắt đầu từ đâu.",
    options: ["Cố làm tất cả cùng lúc.", "Trì hoãn mọi việc vì cảm thấy quá tải.", "Viết ra các nhiệm vụ, chọn một việc quan trọng và làm từng bước.", "Thức khuya liên tục để cố hoàn thành tất cả."], good: 2,
    limits: ["Làm nhiều việc cùng lúc thường khiến khó tập trung.", "Trì hoãn có thể làm việc dồn lại nhiều hơn.", "", "Thiếu ngủ kéo dài ảnh hưởng đến sức khỏe và sự tập trung."],
    feedback: "Chia nhỏ công việc, ưu tiên nhiệm vụ và bố trí thời gian nghỉ giúp công việc dễ bắt đầu hơn. Nếu khối lượng vượt quá khả năng, hãy trao đổi để được hỗ trợ.", tryIt: "Viết danh sách việc cần làm và khoanh tròn một việc làm trước." },
  { title: "Cảm thấy cô đơn", story: "Bạn có nhiều bạn bè trên mạng nhưng vẫn cảm thấy không có ai thực sự hiểu mình.",
    options: ["Kết luận rằng không ai quan tâm đến mình.", "Cố tỏ ra vui vẻ và không chia sẻ với bất kỳ ai.", "Chủ động trò chuyện riêng với người đáng tin cậy hoặc tham gia một hoạt động có kết nối trực tiếp.", "Tự trách mình vì cảm thấy cô đơn."], good: 2,
    limits: ["Đây là kết luận vội – có thể còn những người quan tâm mà mình chưa nhận ra.", "Giấu cảm xúc khiến cảm giác cô đơn kéo dài.", "", "Cảm thấy cô đơn không phải lỗi của bạn."],
    feedback: "Cảm giác cô đơn có thể xuất hiện ngay cả khi có nhiều tương tác trực tuyến. Kết nối có ý nghĩa thường cần sự lắng nghe, tôn trọng và thời gian.", tryIt: "Hẹn một người bạn hoặc người thân trò chuyện trực tiếp 10 phút." },
  { title: "Khó khăn kéo dài", story: "Bạn nhận thấy mình buồn bã hoặc căng thẳng kéo dài, khó ngủ, khó tập trung và các hoạt động thường ngày trở nên khó khăn.",
    options: ["Chờ đợi vô thời hạn và cố chịu đựng một mình.", "Tự kết luận rằng mình mắc bệnh.", "Chia sẻ với người đáng tin cậy và tìm sự hỗ trợ từ người có chuyên môn phù hợp.", "Tự tìm cách điều trị theo thông tin chưa được kiểm chứng trên mạng."], good: 2,
    limits: ["Chịu đựng một mình có thể khiến khó khăn kéo dài hơn.", "Không thể tự kết luận chỉ từ vài dấu hiệu.", "", "Thông tin chưa kiểm chứng có thể không an toàn."],
    feedback: "Không thể xác định nguyên nhân chỉ từ một vài dấu hiệu. Nếu khó khăn kéo dài hoặc ảnh hưởng rõ đến sinh hoạt, học tập và các mối quan hệ, tìm hỗ trợ là một lựa chọn chủ động và phù hợp.", tryIt: "Nghĩ xem mình có thể nói chuyện với ai đầu tiên: người thân, giáo viên chủ nhiệm hay người có chuyên môn." },
];

export function CopingGym() {
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const s = GYM[i]!;
  const picked = answers[i];
  const explored = Object.keys(answers).length;
  return (
    <ActivityShell id="phong-tap" n={2} title="Phòng tập ứng phó" goal="Thực hành cách ứng phó với áp lực học tập, so sánh trên mạng xã hội, bình luận gây tổn thương và mâu thuẫn trong quan hệ bạn bè.">
      <div className="flex flex-wrap items-center gap-2">
        {GYM.map((g, k) => <button key={g.title} type="button" aria-label={`Tình huống ${k + 1}: ${g.title}${answers[k] !== undefined ? " (đã khám phá)" : ""}`} aria-current={k === i} onClick={() => setI(k)} className={`size-10 rounded-full text-sm font-bold ${k === i ? "bg-primary text-primary-foreground" : answers[k] !== undefined ? "bg-mint text-primary" : "bg-pink-soft text-plum"}`}>{answers[k] !== undefined && k !== i ? "✓" : k + 1}</button>)}
        <span className="ml-auto text-sm text-muted-foreground">Đã khám phá {explored}/{GYM.length} tình huống</span>
      </div>
      <article className="space-y-4 rounded-xl bg-pink-soft p-5">
        <p className="text-xs font-bold uppercase tracking-wider text-plum">Tình huống {i + 1} – minh họa, không phải dữ liệu nghiên cứu</p>
        <h3 className="font-display text-xl font-bold text-plum">{s.title}</h3>
        <p className="leading-relaxed">“{s.story}”</p>
        <p className="font-semibold">Bạn có thể làm gì?</p>
        <div className="grid gap-2">{s.options.map((o, k) => <button key={o} type="button" aria-pressed={picked === k} onClick={() => setAnswers({ ...answers, [i]: k })} className={`rounded-lg border p-3 text-left text-sm font-medium transition-colors ${picked === k ? "border-primary bg-card ring-2 ring-primary" : "border-border bg-card/70 hover:bg-card"}`}>{o}</button>)}</div>
        {picked !== undefined && <div role="status" className="space-y-3 rounded-lg bg-card p-4 text-sm leading-relaxed">
          <p className="font-bold text-primary">{picked === s.good ? "✓ Cách ứng phó phù hợp" : "Cách này có hạn chế"}</p>
          {picked !== s.good && <p>{s.limits[picked]}</p>}
          <p>{s.feedback}</p>
          <p className="rounded-md bg-mint-soft p-3"><strong>Thử ngoài đời: </strong>{s.tryIt}</p>
        </div>}
      </article>
      <div className="flex flex-wrap justify-between gap-3">
        <Button variant="outline" disabled={i === 0} onClick={() => setI(i - 1)}><ChevronLeft />Tình huống trước</Button>
        <Button variant="ghost" onClick={() => { setAnswers({}); setI(0); }}><RotateCcw />Làm lại</Button>
        <Button variant="outline" disabled={i === GYM.length - 1} onClick={() => setI(i + 1)}>Tình huống tiếp<ChevronRight /></Button>
      </div>
    </ActivityShell>
  );
}
