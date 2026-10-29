import { Link } from "@tanstack/react-router";
import { ArrowRight, Heart, MessageCircleHeart, Network, Phone, Puzzle, SearchCheck, ShieldAlert, UserRound, Users } from "lucide-react";
import p1 from "@/assets/process-1.jpg";
import p2 from "@/assets/process-2.jpg";
import p3 from "@/assets/process-3.jpg";
import p4 from "@/assets/process-4.jpg";
import p5 from "@/assets/process-5.jpg";

const STEPS = [
  { t: "Lắng nghe và tôn trọng", m: "Cho bạn cơ hội được nói ra cảm xúc.", img: p1, alt: "Hai học sinh trò chuyện ở sân trường, một bạn chăm chú lắng nghe", icon: MessageCircleHeart, border: "border-club-blue/40 hover:border-club-blue", badge: "bg-club-blue", text: "text-club-blue" },
  { t: "Xác định nhu cầu và mức độ an toàn", m: "Tìm hiểu điều bạn cần, không tự chẩn đoán.", img: p2, alt: "Học sinh trao đổi riêng với người lớn đáng tin cậy trong phòng yên tĩnh", icon: SearchCheck, border: "border-primary/40 hover:border-primary", badge: "bg-primary", text: "text-green-deep" },
  { t: "Thống nhất hướng hỗ trợ", m: "Cùng tìm bước tiếp theo phù hợp.", img: p3, alt: "Hai học sinh cùng trao đổi, giáo viên đứng bên cạnh hỗ trợ", icon: Puzzle, border: "border-club/40 hover:border-club", badge: "bg-club", text: "text-club" },
  { t: "Kết nối hoặc chuyển gửi", m: "Đưa bạn đến đúng nguồn hỗ trợ.", img: p4, alt: "Học sinh giới thiệu bạn mình với giáo viên chủ nhiệm và phụ huynh", icon: Network, border: "border-teal/40 hover:border-teal", badge: "bg-teal", text: "text-teal" },
  { t: "Theo dõi và phản hồi", m: "Tiếp tục quan tâm và điều chỉnh khi cần.", img: p5, alt: "Nhóm học sinh trò chuyện vui vẻ trong thư viện", icon: Heart, border: "border-pink-number/60 hover:border-plum", badge: "bg-plum", text: "text-plum" },
];

export function SupportJourney() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="font-display text-[28px] font-bold uppercase text-club-ink sm:text-4xl">Quy trình kết nối hỗ trợ</h2>
        <p className="mt-2 font-display text-lg font-semibold text-club">Lắng nghe đúng cách – Kết nối đúng người – Đồng hành an toàn</p>
      </div>

      <div className="relative">
        {/* connecting line: horizontal on desktop, vertical on mobile/tablet */}
        <div aria-hidden className="absolute left-[10%] right-[10%] top-[19px] hidden h-1 rounded-full bg-gradient-to-r from-club-blue via-club to-pink-number lg:block" />
        <div aria-hidden className="absolute bottom-6 left-[19px] top-6 w-1 rounded-full bg-gradient-to-b from-club-blue via-club to-pink-number lg:hidden" />
        <ol className="relative grid gap-6 lg:grid-cols-5 lg:gap-4">
          {STEPS.map((s, i) => {
            const I = s.icon;
            return (
              <li key={s.t} className="relative flex flex-col pl-14 lg:pl-0">
                <span className={`absolute left-0 top-0 z-10 flex h-10 w-10 items-center justify-center rounded-full font-display text-lg font-bold text-primary-foreground ring-4 ring-background lg:left-1/2 lg:-translate-x-1/2 ${s.badge}`}>{i + 1}</span>
                <article className={`group flex flex-1 flex-col overflow-hidden rounded-[20px] border-2 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0 lg:mt-14 ${s.border}`}>
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={s.img} alt={s.alt} width={944} height={704} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <I aria-hidden className={`h-7 w-7 ${s.text}`} />
                    <h3 className="mt-2 font-display text-lg font-bold uppercase leading-snug text-club-ink">{s.t}</h3>
                    <p className={`mt-auto pt-2 text-[15px] font-semibold italic leading-relaxed ${s.text}`}>“{s.m}”</p>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </div>

      <aside aria-labelledby="clb-khan-cap" className="mx-auto max-w-4xl rounded-[20px] border-2 border-destructive/60 bg-pink-soft p-6 shadow-sm">
        <h3 id="clb-khan-cap" className="flex items-center gap-2 font-display text-xl font-bold uppercase text-destructive"><ShieldAlert aria-hidden className="h-6 w-6" />Khi có nguy cơ mất an toàn</h3>
        <ul className="mt-4 space-y-3 leading-relaxed">
          <li className="flex gap-3"><UserRound aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />Báo ngay cho thầy cô, cha mẹ hoặc người lớn đáng tin cậy gần nhất.</li>
          <li className="flex gap-3"><Phone aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-destructive" /><span>Gọi <strong>115</strong> khi cần cấp cứu hoặc có nguy cơ nguy hiểm tức thời; <strong>111</strong> là Tổng đài điện thoại quốc gia bảo vệ trẻ em trong phạm vi hỗ trợ phù hợp.</span></li>
          <li className="flex gap-3"><Users aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />Không để bạn ở một mình khi có nguy cơ nguy hiểm tức thời; thành viên câu lạc bộ không tự chẩn đoán, điều trị hay tự xử lý.</li>
        </ul>
        <Link to="/diem-tua" hash="nguon-tro-giup" className="mt-5 inline-flex items-center gap-2 rounded-full bg-pink-band px-5 py-2.5 text-sm font-bold text-plum transition-colors hover:bg-pink-chip">
          <span aria-hidden>♡</span>Tìm điểm tựa<ArrowRight aria-hidden className="h-4 w-4" />
        </Link>
      </aside>
    </div>
  );
}
