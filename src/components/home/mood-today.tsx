import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CloudRain, Frown, Meh, Smile, Sun, Zap } from "lucide-react";

type MoodId = "vui" | "binh-thuong" | "met" | "buon" | "cang-thang";
type Path = "/hieu-minh" | "/vung-vang" | "/ket-noi" | "/diem-tua" | "/lang-nghe";

export const MOODS: { id: MoodId; label: string; icon: typeof Smile; tips: string[]; link: { to: Path; hash?: string; label: string } }[] = [
  { id: "vui", label: "Vui vẻ", icon: Sun, tips: ["Ghi lại một điều khiến bạn vui hôm nay.", "Chia sẻ niềm vui với một người bạn quý."], link: { to: "/hieu-minh", hash: "so-tay", label: "Mở sổ tay chăm sóc bản thân" } },
  { id: "binh-thuong", label: "Bình thường", icon: Smile, tips: ["Thử dừng lại 1 phút để gọi tên cảm xúc của mình.", "Uống một cốc nước và vươn vai nhẹ."], link: { to: "/hieu-minh", hash: "guong-cam-xuc", label: "Thử Gương cảm xúc" } },
  { id: "met", label: "Mệt mỏi", icon: Meh, tips: ["Nghỉ 5 phút, rời xa màn hình.", "Ngủ đủ giấc tối nay quan trọng hơn làm thêm bài."], link: { to: "/vung-vang", hash: "tram-hoi-phuc", label: "Vào Trạm hồi phục 5 phút" } },
  { id: "buon", label: "Buồn", icon: CloudRain, tips: ["Buồn là cảm xúc bình thường, bạn không cần giấu nó.", "Nhắn tin hoặc nói chuyện với một người bạn tin tưởng."], link: { to: "/ket-noi", label: "Khám phá Chạm 4 – Kết nối" } },
  { id: "cang-thang", label: "Căng thẳng", icon: Zap, tips: ["Hít vào 4 nhịp, giữ 4 nhịp, thở ra 6 nhịp – lặp lại 3 lần.", "Chia việc lớn thành một bước nhỏ làm ngay."], link: { to: "/vung-vang", hash: "nut-dung", label: "Dùng Nút dừng bình tĩnh" } },
];

export function MoodToday() {
  const [mood, setMood] = useState<MoodId | null>(null);
  const m = MOODS.find((x) => x.id === mood);
  return (
    <section id="tam-trang" aria-labelledby="tam-trang-title" className="bg-background px-4 py-16">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-border bg-card p-6 shadow-sm sm:p-10">
        <h2 id="tam-trang-title" className="text-center font-display text-3xl font-extrabold text-primary">Tâm trạng hôm nay</h2>
        <p className="mt-2 text-center text-foreground/75">Hôm nay bạn thấy thế nào? Chọn một cảm xúc để nhận gợi ý nhỏ.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3" role="group" aria-label="Chọn cảm xúc">
          {MOODS.map((x) => (
            <button key={x.id} type="button" aria-pressed={mood === x.id} onClick={() => setMood(x.id)} className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-5 py-2.5 font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${mood === x.id ? "border-primary bg-primary text-primary-foreground" : "border-border bg-mint-soft text-green-deep hover:bg-mint"}`}>
              <x.icon className="h-5 w-5" aria-hidden="true" />{x.label}
            </button>
          ))}
        </div>
        <div aria-live="polite">
          {m && (
            <div className="mt-6 rounded-3xl bg-pink-soft p-5 sm:p-6">
              <p className="font-display text-lg font-bold text-plum">Gợi ý cho bạn</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-foreground/85">{m.tips.map((t) => <li key={t}>{t}</li>)}</ul>
              <Link to={m.link.to} {...(m.link.hash ? { hash: m.link.hash } : {})} className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground hover:bg-green-deep">{m.link.label}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
          )}
        </div>
        <p className="mt-6 flex items-start justify-center gap-2 text-center text-xs text-foreground/65"><Frown className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />Lựa chọn của bạn không được lưu lại. Đây không phải công cụ chẩn đoán. Nếu cảm xúc kéo dài hoặc bạn thấy không an toàn, hãy <Link to="/diem-tua" hash="nguon-tro-giup" className="font-semibold text-plum underline">tìm điểm tựa</Link>.</p>
      </div>
    </section>
  );
}
