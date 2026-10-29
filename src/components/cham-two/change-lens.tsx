import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ActivityShell, ChoiceChip } from "./choice";

type Reply = { text: string; fit: boolean };
const LENSES: { label: string; story: string; thoughts: string[]; others: string[]; replies: Reply[] }[] = [
  { label: "Tin nhắn chưa hồi âm", story: "Bạn nhắn tin cho một người bạn nhưng nhiều giờ chưa nhận được hồi âm. Bạn bắt đầu nghĩ rằng người ấy không muốn nói chuyện với mình.",
    thoughts: ["Bạn ấy giận mình rồi.", "Chắc bạn ấy đang bận.", "Mình đã nói sai điều gì?"],
    others: ["Người bạn đang bận học hoặc làm việc.", "Người bạn đang nghỉ ngơi, chưa xem điện thoại.", "Người bạn đang có chuyện riêng.", "Người bạn chưa biết trả lời thế nào.", "Có thể còn nguyên nhân khác mà mình chưa biết."],
    replies: [{ text: "Trách móc vì không được trả lời.", fit: false }, { text: "Đưa ra kết luận ngay lập tức.", fit: false }, { text: "Hỏi thăm nhẹ nhàng và tôn trọng thời gian của bạn.", fit: true }, { text: "Tạm chờ và tiếp tục công việc của mình.", fit: true }] },
  { label: "Bạn học ít nói", story: "Một bạn cùng lớp thường ngồi một mình, ít khi tham gia trò chuyện cùng nhóm.",
    thoughts: ["Bạn ấy kiêu, không muốn chơi với ai.", "Có lẽ bạn ấy ngại.", "Mình không biết vì sao."],
    others: ["Bạn ấy có tính cách hướng nội.", "Bạn ấy chưa quen với lớp.", "Bạn ấy đang có điều lo lắng.", "Có thể còn nguyên nhân khác mà mình chưa biết."],
    replies: [{ text: "Bàn tán về bạn ấy với người khác.", fit: false }, { text: "Mời bạn ấy tham gia một hoạt động nhỏ, không ép buộc.", fit: true }, { text: "Mặc kệ vì nghĩ bạn ấy không thích mình.", fit: false }] },
  { label: "Bị so sánh thành tích", story: "Một người bạn vừa bị người lớn so sánh điểm số với bạn khác và trông rất buồn.",
    thoughts: ["Chuyện nhỏ thôi mà.", "Chắc bạn ấy thấy tổn thương.", "Bạn ấy nên cố gắng hơn."],
    others: ["Bạn ấy đã rất cố gắng nhưng chưa được ghi nhận.", "Bạn ấy đang chịu nhiều áp lực.", "Có thể còn nguyên nhân khác mà mình chưa biết."],
    replies: [{ text: "Bảo bạn ấy đừng buồn vì chuyện vặt.", fit: false }, { text: "Lắng nghe và ghi nhận nỗ lực của bạn ấy.", fit: true }, { text: "Tiếp tục so sánh để bạn ấy có động lực.", fit: false }] },
  { label: "Bình luận gây tổn thương", story: "Một người bạn bị chế giễu trong phần bình luận trên mạng xã hội.",
    thoughts: ["Ai bảo bạn ấy đăng bài.", "Chắc bạn ấy đang rất khó chịu.", "Không liên quan đến mình."],
    others: ["Bạn ấy có thể đang xấu hổ hoặc sợ hãi.", "Bạn ấy chưa biết nên làm gì.", "Có thể còn nguyên nhân khác mà mình chưa biết."],
    replies: [{ text: "Thả thêm biểu tượng cười vào bình luận.", fit: false }, { text: "Nhắn riêng hỏi thăm và gợi ý chặn/báo cáo, tìm người lớn hỗ trợ.", fit: true }, { text: "Chia sẻ bài viết cho người khác xem.", fit: false }] },
];

export function ChangeLens() {
  const [li, setLi] = useState(0);
  const [step, setStep] = useState(1);
  const [thought, setThought] = useState("");
  const [custom, setCustom] = useState("");
  const [reply, setReply] = useState<number | null>(null);
  const lens = LENSES[li]!;
  const choose = (i: number) => { setLi(i); setStep(1); setThought(""); setCustom(""); setReply(null); };
  const picked = reply === null ? null : lens.replies[reply]!;

  return (
    <ActivityShell id="doi-chiec-kinh" n={3} title="Đổi chiếc kính" goal="Phát triển khả năng đồng cảm, nhìn nhận nhiều góc độ và giao tiếp không phán xét.">
      <div className="flex flex-wrap gap-2">{LENSES.map((l, i) => <ChoiceChip key={l.label} selected={i === li} onClick={() => choose(i)}>{l.label}</ChoiceChip>)}</div>
      <div className="space-y-4 rounded-xl bg-pink-soft p-5">
        <p className="text-xs font-bold uppercase tracking-wider text-plum">Tình huống minh họa</p>
        <p className="text-sm font-medium leading-relaxed">“{lens.story}”</p>
        {step >= 1 && <div className="space-y-3">
          <h3 className="font-display text-lg font-bold text-plum">Bước 1 – Nhìn từ phía mình</h3>
          <p className="text-sm">Suy nghĩ đầu tiên của bạn có thể là gì?</p>
          <div className="flex flex-wrap gap-2">{lens.thoughts.map((t) => <ChoiceChip key={t} selected={thought === t} onClick={() => setThought(thought === t ? "" : t)}>{t}</ChoiceChip>)}</div>
          <Input aria-label="Suy nghĩ của mình (không bắt buộc)" placeholder="Hoặc tự viết (không bắt buộc)" value={custom} onChange={(e) => setCustom(e.target.value)} className="max-w-lg bg-card" />
          {step === 1 && <Button onClick={() => setStep(2)}>Đổi chiếc kính</Button>}
        </div>}
        {step >= 2 && <div className="space-y-3">
          <h3 className="font-display text-lg font-bold text-plum">Bước 2 – Thử nhìn từ phía người khác</h3>
          <ul className="grid gap-2 sm:grid-cols-2">{lens.others.map((o) => <li key={o} className="rounded-lg bg-card p-3 text-sm">{o}</li>)}</ul>
          <p className="text-sm italic text-muted-foreground">Đây là những khả năng để suy nghĩ rộng hơn, không phải kết luận về tình huống thực tế.</p>
          {step === 2 && <Button onClick={() => setStep(3)}>Chọn cách kết nối</Button>}
        </div>}
        {step >= 3 && <div className="space-y-3">
          <h3 className="font-display text-lg font-bold text-plum">Bước 3 – Chọn cách kết nối</h3>
          <div className="grid gap-2">{lens.replies.map((r, i) => <button key={r.text} type="button" aria-pressed={reply === i} onClick={() => setReply(i)} className={`rounded-lg border p-3 text-left text-sm font-medium ${reply === i ? "border-primary bg-card" : "border-border bg-card/70 hover:bg-card"}`}>{r.text}</button>)}</div>
          {picked && <p role="status" className="rounded-lg bg-mint-soft p-4 text-sm leading-relaxed">{picked.fit ? "Cách này tôn trọng cảm xúc và thời gian của người khác, giúp cuộc trò chuyện cởi mở hơn mà không tạo thêm áp lực." : "Cách này dễ khiến người kia cảm thấy bị phán xét hoặc tổn thương. Thử chọn cách hỏi han nhẹ nhàng, tôn trọng – vì ta chưa biết hết câu chuyện."}</p>}
          <Button variant="outline" onClick={() => choose(li)}>Làm lại</Button>
        </div>}
      </div>
      <p className="border-l-4 border-primary bg-mint-soft p-4 font-semibold leading-relaxed text-primary">“Ta chỉ nhìn thấy một phần câu chuyện của người khác. Lắng nghe và hỏi han chân thành giúp ta hiểu nhau hơn, thay vì vội vàng phán xét.”</p>
      <p className="text-xs text-muted-foreground">Bạn không cần kể tên hoặc tiết lộ câu chuyện riêng tư của bạn bè.</p>
    </ActivityShell>
  );
}
