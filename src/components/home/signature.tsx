import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Info, RefreshCw, Sprout } from "lucide-react";
import { FiveTouchMark } from "./five-touch-mark";

type ChamPath = "/lang-nghe" | "/hieu-minh" | "/vung-vang" | "/ket-noi" | "/diem-tua";

const JOURNEY: { n: number; t: string; act: string; to: ChamPath; hash?: string }[] = [
  { n: 1, t: "Lắng nghe", act: "Dừng lại và gọi tên một cảm xúc của mình hôm nay", to: "/lang-nghe" },
  { n: 2, t: "Thấu hiểu", act: "Soi cảm xúc qua hoạt động Gương cảm xúc", to: "/hieu-minh", hash: "guong-cam-xuc" },
  { n: 3, t: "Vững vàng", act: "Thực hành Nút dừng bình tĩnh", to: "/vung-vang", hash: "nut-dung" },
  { n: 4, t: "Kết nối", act: "Đi hết hành trình kết nối với bạn bè, gia đình, thầy cô", to: "/ket-noi" },
  { n: 5, t: "Điểm tựa", act: "Chọn một người đáng tin cậy trên Bản đồ điểm tựa", to: "/diem-tua", hash: "ban-do" },
];

export function MyJourney() {
  const [done, setDone] = useState<number[]>([]);
  const toggle = (n: number) => setDone((d) => (d.includes(n) ? d.filter((x) => x !== n) : [...d, n]));
  const pct = Math.round((done.length / 5) * 100);
  return (
    <section id="hanh-trinh-cua-toi" aria-labelledby="my-journey-title" className="scroll-mt-20 bg-mint-soft px-4 py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div className="text-center lg:text-left">
          <h2 id="my-journey-title" className="font-display text-3xl font-extrabold text-primary sm:text-4xl">Hành trình 5 Chạm của tôi</h2>
          <p className="mt-3 text-foreground/80">Đánh dấu những hoạt động bạn đã thử. Mỗi điểm sáng lên là một bước bạn đã đi.</p>
          <div className="mx-auto mt-6 w-48 lg:mx-0">
            <FiveTouchMark animate={false} label={`Đã hoàn thành ${done.length} trên 5 Chạm`} className={`w-full transition-opacity ${done.length ? "opacity-100" : "opacity-40"}`} />
          </div>
          <p className="mt-3 font-display text-2xl font-bold text-green-deep" aria-live="polite">{done.length}/5 Chạm · {pct}%</p>
          <p className="mt-3 flex items-start gap-2 rounded-2xl bg-card px-4 py-3 text-left text-sm text-foreground/75">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            Bản demo: tiến trình chỉ hiển thị trong lần truy cập này, không được lưu hay gửi đi. Tải lại trang sẽ bắt đầu lại.
          </p>
        </div>
        <ol className="space-y-3">
          {JOURNEY.map((j) => {
            const on = done.includes(j.n);
            return (
              <li key={j.n} className={`flex flex-wrap items-center gap-3 rounded-3xl border-2 bg-card p-4 transition-colors ${on ? "border-primary" : "border-border"}`}>
                <button type="button" onClick={() => toggle(j.n)} aria-pressed={on} aria-label={`Đánh dấu đã làm Chạm ${j.n} – ${j.t}`} className={`grid h-11 w-11 shrink-0 place-items-center rounded-full font-display text-lg font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${on ? "bg-primary text-primary-foreground" : "bg-mint text-green-deep hover:bg-primary/20"}`}>
                  {on ? <Check className="h-5 w-5" aria-hidden="true" /> : j.n}
                </button>
                <div className="min-w-0 flex-1">
                  <p className="font-display font-bold text-green-deep">Chạm {j.n} – {j.t}</p>
                  <p className="text-sm text-foreground/75">{j.act}</p>
                </div>
                <Link to={j.to} hash={j.hash} className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:text-green-deep">Mở hoạt động <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

const STEPS: { t: string; how: string[]; tool: string; to: ChamPath; hash: string }[] = [
  { t: "Thở chậm 1 phút", how: ["Ngồi thẳng, đặt tay lên bụng.", "Hít vào 4 nhịp, giữ 2 nhịp, thở ra 6 nhịp.", "Lặp lại 5 lần rồi để ý cơ thể nhẹ hơn chưa."], tool: "Mở Nút dừng bình tĩnh", to: "/vung-vang", hash: "nut-dung" },
  { t: "Gọi tên cảm xúc", how: ["Hỏi mình: lúc này mình đang cảm thấy gì?", "Chọn một từ gần đúng nhất, không cần hoàn hảo.", "Tự nhủ: “Cảm xúc này được phép có mặt.”"], tool: "Mở Gương cảm xúc", to: "/hieu-minh", hash: "guong-cam-xuc" },
  { t: "Nghỉ màn hình 5 phút", how: ["Úp điện thoại xuống hoặc để xa tầm tay.", "Uống nước, vươn vai hoặc nhìn ra xa.", "Quay lại và ghi một dòng vào sổ tay."], tool: "Vào Trạm hồi phục 5 phút", to: "/vung-vang", hash: "tram-hoi-phuc" },
  { t: "Ghi một điều tốt hôm nay", how: ["Nghĩ về một việc nhỏ đã diễn ra ổn.", "Viết ra một câu ngắn trong sổ tay.", "Ghi thêm ai đã góp phần vào điều đó."], tool: "Mở Sổ tay chăm sóc bản thân", to: "/hieu-minh", hash: "so-tay" },
  { t: "Nhắn hỏi thăm một người", how: ["Nghĩ đến một người bạn tin tưởng.", "Gửi một câu đơn giản: “Dạo này cậu ổn không?”", "Lắng nghe, không cần đưa lời khuyên ngay."], tool: "Xem Bản đồ điểm tựa", to: "/diem-tua", hash: "ban-do" },
];

export function SmallStepToday() {
  const [i, setI] = useState(0);
  const s = STEPS[i];
  return (
    <section id="mot-buoc-nho" aria-labelledby="small-step-title" className="scroll-mt-20 bg-card px-4 py-16">
      <div className="mx-auto max-w-3xl rounded-[2rem] border-2 border-mint bg-mint-soft p-7 text-center sm:p-10">
        <Sprout className="mx-auto h-10 w-10 text-primary" aria-hidden="true" />
        <h2 id="small-step-title" className="mt-3 font-display text-3xl font-extrabold text-primary">Một bước nhỏ hôm nay</h2>
        <div key={i} className="companion-reveal mt-6 rounded-3xl bg-card p-6 text-left" aria-live="polite">
          <h3 className="font-display text-xl font-bold text-green-deep">{s.t}</h3>
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-foreground/85">
            {s.how.map((h) => <li key={h}>{h}</li>)}
          </ol>
          <Link to={s.to} hash={s.hash} className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-green-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
            {s.tool} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <button type="button" onClick={() => setI((i + 1) % STEPS.length)} className="mt-5 inline-flex items-center gap-2 rounded-full border-2 border-primary px-5 py-2.5 text-sm font-bold text-primary transition-colors hover:bg-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <RefreshCw className="h-4 w-4" aria-hidden="true" /> Gợi ý khác
        </button>
      </div>
    </section>
  );
}

const KIND = [
  { m: "Không sao nếu hôm nay bạn chỉ làm được một chút. Một chút vẫn là tiến bộ.", tone: "bg-mint text-green-deep" },
  { m: "Điểm số không nói hết bạn là ai.", tone: "bg-pink-soft text-plum" },
  { m: "Nếu thấy mệt, nghỉ một lát cũng là cách chăm sóc bản thân.", tone: "bg-club-faint text-club-ink" },
  { m: "Bạn không phải gánh mọi chuyện một mình. Hãy kể cho người bạn tin.", tone: "bg-mint-soft text-teal" },
  { m: "Cảm ơn vì đã là một người bạn biết lắng nghe.", tone: "bg-pink-soft text-plum" },
  { m: "Mỗi ngày đều có thể bắt đầu lại.", tone: "bg-mint text-green-deep" },
];

export function KindMessages() {
  return (
    <section id="thong-diep-tu-te" aria-labelledby="kind-title" className="scroll-mt-20 bg-pink-soft px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 id="kind-title" className="font-display text-3xl font-extrabold text-plum sm:text-4xl">Trạm thông điệp tử tế</h2>
          <span className="mt-3 inline-block rounded-full bg-card px-4 py-1.5 text-xs font-bold text-plum">THÔNG ĐIỆP MẪU MINH HỌA – CHƯA MỞ GỬI</span>
          <p className="mx-auto mt-3 max-w-2xl text-foreground/80">Đây là những câu mẫu để bạn có thể gửi cho chính mình hoặc một người bạn. Trạm chưa nhận thông điệp từ học sinh vì cần có thầy cô kiểm duyệt trước khi hiển thị.</p>
        </div>
        <ul className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {KIND.map((k) => (
            <li key={k.m} className={`mb-4 break-inside-avoid rounded-3xl p-6 font-display text-lg font-semibold leading-snug shadow-sm ${k.tone}`}>“{k.m}”</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
