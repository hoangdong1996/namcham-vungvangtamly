import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowDown, ArrowLeft, ArrowRight, BookOpen, ChevronDown, Ear, Handshake, HeartHandshake, Lightbulb, Link2,
  Lock, Map as MapIcon, MessageCircle, Shield, ShieldAlert, Sparkles, Stethoscope, Target, UserCheck, Users,
} from "lucide-react";
import { SupportJourney } from "@/components/clb/support-journey";
import clbImage from "@/assets/clb-students.jpg";
import tierStudents from "@/assets/clb-tier-students.jpg";
import tierAdults from "@/assets/clb-tier-adults.jpg";
import tierNetwork from "@/assets/clb-tier-network.jpg";

export const Route = createFileRoute("/clb")({
  head: () => ({
    meta: [
      { title: "CLB 5 Đồng hành | 5 CHẠM – Vững vàng tâm lý" },
      { name: "description", content: "CLB 5 Đồng hành – mô hình câu lạc bộ hỗ trợ tâm lý học đường được đề xuất tại Trường THPT Tây Tiền Hải." },
      { property: "og:title", content: "CLB 5 Đồng hành | 5 CHẠM" },
      { property: "og:description", content: "Học sinh làm chủ hoạt động – Người lớn đồng hành – Chuyên gia hỗ trợ đúng lúc." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ClbPage,
});

const GOALS = [
  { t: "Nâng cao nhận thức về sức khỏe tâm lý.", icon: Lightbulb },
  { t: "Phát triển năng lực tự chăm sóc và ứng phó với áp lực.", icon: Sparkles },
  { t: "Xây dựng văn hóa lắng nghe, tôn trọng và không kỳ thị.", icon: Ear },
  { t: "Kết nối học sinh với nguồn hỗ trợ phù hợp.", icon: Link2 },
];
const PRINCIPLES = [
  { t: "Tôn trọng", icon: Handshake, d: "Tôn trọng cảm xúc, suy nghĩ và sự khác biệt của mỗi người." },
  { t: "Lắng nghe", icon: Ear, d: "Lắng nghe trọn vẹn, không phán xét, không vội đưa lời khuyên." },
  { t: "Tự nguyện", icon: HeartHandshake, d: "Mỗi bạn tham gia và chia sẻ khi thực sự sẵn sàng." },
  { t: "An toàn", icon: Shield, d: "Ưu tiên sự an toàn của học sinh trong mọi hoạt động." },
  { t: "Bảo mật có trách nhiệm", icon: Lock, d: "Giữ kín điều được chia sẻ, trừ khi có nguy cơ mất an toàn cần báo người lớn." },
];
const TIERS = [
  { img: tierStudents, alt: "Học sinh cùng lên ý tưởng với giấy nhớ, lập kế hoạch hoạt động câu lạc bộ", t: "TẦNG 1 – HỌC SINH CHỦ ĐỘNG", icon: Users, tone: "border-club bg-club-soft", ic: "bg-club", items: ["Đề xuất chủ đề hoạt động.", "Thiết kế sản phẩm truyền thông tích cực.", "Tổ chức hoạt động trải nghiệm.", "Hỗ trợ bạn bè trong phạm vi phù hợp: lắng nghe và giới thiệu đến người lớn."] },
  { img: tierAdults, alt: "Giáo viên đứng phía sau hỗ trợ, học sinh chủ động thảo luận", t: "TẦNG 2 – NGƯỜI LỚN ĐỒNG HÀNH VÀ CHUYÊN GIA HỖ TRỢ", icon: UserCheck, tone: "border-club-blue bg-card", ic: "bg-club-blue", items: ["Giáo viên hoặc người phụ trách do nhà trường phân công.", "Giáo viên chủ nhiệm và thầy cô đáng tin cậy.", "Đoàn trường.", "Nhân viên y tế trường học trong phạm vi chuyên môn.", "Chuyên gia tâm lý hoặc chuyên gia sức khỏe tâm thần (Nguồn lực chuyên gia dự kiến kết nối): góp ý nội dung giáo dục, hướng dẫn kỹ năng phù hợp, hỗ trợ chuyên môn cho người phụ trách và hỗ trợ kết nối hoặc chuyển gửi khi cần."] },
  { img: tierNetwork, alt: "Mạng lưới hỗ trợ kết nối học sinh với gia đình, người hỗ trợ chuyên môn và cơ sở y tế", t: "TẦNG 3 – MẠNG LƯỚI HỖ TRỢ", icon: Stethoscope, tone: "border-club-ink bg-club-faint", ic: "bg-club-ink", items: ["Gia đình hoặc người giám hộ phù hợp.", "Cơ sở y tế.", "Dịch vụ chuyên môn đã được xác minh."] },
];
const GROUPS = [
  { t: "Góc lắng nghe", icon: Ear, d: "Không gian chia sẻ an toàn, luyện kỹ năng lắng nghe không phán xét.", to: "/lang-nghe" as const },
  { t: "Hiểu mình – Chăm sóc mình", icon: Sparkles, d: "Nhận diện cảm xúc, áp lực số và thực hành tự chăm sóc.", to: "/hieu-minh" as const },
  { t: "Vững vàng trước áp lực", icon: Shield, d: "Rèn kỹ năng bình tĩnh, ứng phó và hồi phục.", to: "/vung-vang" as const },
  { t: "Kết nối tích cực", icon: Handshake, d: "Xây dựng kết nối với bạn bè, gia đình và thầy cô.", to: "/ket-noi" as const },
  { t: "Điểm tựa an toàn", icon: HeartHandshake, d: "Biết tìm đến đúng người khi cần được hỗ trợ.", to: "/diem-tua" as const },
];
const STEPS = [
  { t: "Lựa chọn chủ đề", d: "Học sinh đề xuất chủ đề dựa trên nhu cầu thực tế, người phụ trách cùng xem xét." },
  { t: "Thiết kế hoạt động", d: "Xây dựng nội dung, hình thức và phân công phù hợp với mục tiêu." },
  { t: "Rà soát an toàn", d: "Người lớn đồng hành kiểm tra nội dung, tránh gây tổn thương hoặc lộ thông tin riêng tư." },
  { t: "Tổ chức thực hiện", d: "Triển khai hoạt động với sự tham gia tự nguyện và có người lớn hỗ trợ." },
  { t: "Thu thập phản hồi", d: "Lắng nghe ý kiến người tham gia theo cách ẩn danh, tôn trọng." },
  { t: "Đánh giá và điều chỉnh", d: "Rút kinh nghiệm và cải tiến cho các hoạt động tiếp theo." },
];
const ROADMAP = ["Khảo sát nhu cầu.", "Hoàn thiện đề xuất.", "Chuẩn bị đội ngũ và nguồn lực.", "Thử nghiệm hoạt động.", "Đánh giá và điều chỉnh."];
const CRITERIA = ["Mức độ tham gia.", "Kiến thức về sức khỏe tâm lý.", "Kỹ năng tự chăm sóc.", "Khả năng xác định nguồn hỗ trợ.", "Cảm nhận an toàn.", "Phản hồi và cải tiến."];
const RESOURCES = [
  { t: "Sổ tay chăm sóc bản thân", icon: BookOpen, to: "/hieu-minh" as const, hash: "so-tay" },
  { t: "Bộ phiếu thực hành quản lý cảm xúc", icon: Sparkles, to: "/hieu-minh" as const, hash: "guong-cam-xuc" },
  { t: "Hướng dẫn giao tiếp không phán xét", icon: MessageCircle, to: "/lang-nghe" as const },
  { t: "Kế hoạch sử dụng Internet cân bằng trong 7 ngày", icon: Target, to: "/vung-vang" as const },
  { t: "Bản đồ kết nối an toàn – Em không đơn độc", icon: MapIcon, to: "/diem-tua" as const, hash: "ban-do" },
  { t: "Cẩm nang “Khi bạn mình không ổn – Mình có thể làm gì?”", icon: HeartHandshake, to: "/diem-tua" as const, hash: "cam-nang" },
];

const card = "rounded-2xl border-2 border-club-soft bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-club hover:shadow-md";
const btn = "inline-flex items-center justify-center gap-2 rounded-full bg-club px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-sm transition-colors hover:bg-club-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-club focus-visible:ring-offset-2";

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-center font-display text-2xl font-bold text-club-ink sm:text-3xl">{children}</h2>;
}
const Status = () => (
  <span className="inline-block rounded-full border-2 border-dashed border-club px-4 py-1 text-xs font-bold tracking-wider text-club-ink">MÔ HÌNH ĐỀ XUẤT – ĐANG ĐỂ NGỎ</span>
);

function ClbPage() {
  const [step, setStep] = useState<number | null>(null);
  return (
    <main className="bg-background">
      <section className="bg-club-soft">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-16">
          <div className="space-y-4 text-center md:text-left">
            <Status />
            <h1 className="flex items-center justify-center gap-3 font-display text-4xl font-bold text-club-ink sm:text-5xl md:justify-start">
              <Link2 className="h-9 w-9 shrink-0 text-club-blue" aria-hidden="true" />CLB 5 ĐỒNG HÀNH
            </h1>
            <p className="font-display text-lg font-semibold italic text-club">“Học sinh làm chủ hoạt động – Người lớn đồng hành – Chuyên gia hỗ trợ đúng lúc.”</p>
            <p className="leading-relaxed text-club-ink">CLB 5 Đồng hành là mô hình câu lạc bộ hỗ trợ tâm lý học đường được đề xuất nhằm giúp học sinh nâng cao hiểu biết về sức khỏe tâm lý, phát triển năng lực tự chăm sóc, rèn luyện kỹ năng ứng phó với áp lực và kết nối với nguồn hỗ trợ phù hợp.</p>
          </div>
          <img src={clbImage} alt="Học sinh cùng nhau trò chuyện và lên kế hoạch hoạt động câu lạc bộ" width={1024} height={768} className="w-full rounded-3xl border-4 border-card object-cover shadow-md" />
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-14">
        <section className="space-y-6">
          <H2>Mục tiêu CLB</H2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {GOALS.map(({ t, icon: I }, i) => (
              <div key={t} className={card}>
                <I className={`h-8 w-8 ${i % 2 ? "text-club-blue" : "text-club"}`} aria-hidden="true" />
                <p className="mt-3 font-semibold leading-relaxed text-club-ink">{t}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <H2>Năm nguyên tắc đồng hành</H2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {PRINCIPLES.map(({ t, d, icon: I }, i) => (
              <div key={t} className="rounded-2xl bg-club-faint p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-club-soft text-club"><I className="h-5 w-5" aria-hidden="true" /></div>
                <h3 className="mt-3 font-display text-lg font-bold text-club-ink">{i + 1}. {t}</h3>
                <p className="mt-1 leading-relaxed text-foreground/80">{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <H2>Cơ cấu vận hành ba tầng</H2>
          <div className="mx-auto max-w-4xl">
            {TIERS.map(({ t, icon: I, tone, ic, items, img, alt }, i) => (
              <div key={t}>
                <div className={`grid items-center gap-5 rounded-3xl border-2 p-6 sm:grid-cols-[1fr_14rem] ${tone}`}>
                  <div>
                  <div className="flex items-center gap-3">
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-primary-foreground ${ic}`}><I className="h-5 w-5" aria-hidden="true" /></span>
                    <h3 className="font-display text-lg font-bold text-club-ink">{t}</h3>
                  </div>
                  <ul className="mt-3 list-disc space-y-1 pl-6 leading-relaxed">{items.map((x) => <li key={x}>{x}</li>)}</ul>
                  </div>
                  <img src={img} alt={alt} width={992} height={672} loading="lazy" className="aspect-[3/2] w-full rounded-2xl object-cover" />
                </div>
                {i < TIERS.length - 1 && (
                  <div className="flex flex-col items-center py-2 text-club-blue" aria-hidden="true"><span className="h-4 w-0.5 bg-club-soft" /><ArrowDown className="h-5 w-5" /></div>
                )}
              </div>
            ))}
            <p className="mt-4 rounded-2xl bg-club-faint p-4 text-center text-sm font-semibold text-club-ink">Học sinh không chẩn đoán và không chịu trách nhiệm xử lý tình huống nguy hiểm – khi cần, luôn kết nối với người lớn và chuyên môn.</p>
          </div>
        </section>

        <section className="space-y-6">
          <H2>Năm nhóm hoạt động</H2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {GROUPS.map(({ t, d, icon: I, to }) => (
              <div key={t} className={`${card} flex flex-col`}>
                <div className="flex h-16 items-center justify-center rounded-xl bg-club-faint"><I className="h-8 w-8 text-club-blue" aria-hidden="true" /></div>
                <h3 className="mt-3 font-display text-lg font-bold text-club-ink">{t}</h3>
                <p className="mt-1 flex-1 leading-relaxed text-foreground/80">{d}</p>
                <Link to={to} className={`${btn} mt-4`}>Tìm hiểu hoạt động</Link>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <H2>Quy trình hoạt động</H2>
          <ol className="relative mx-auto max-w-3xl space-y-3 border-l-4 border-club-soft pl-6">
            {STEPS.map((s, i) => (
              <li key={s.t} className="relative">
                <span className="absolute -left-[2.35rem] top-2 flex h-8 w-8 items-center justify-center rounded-full bg-club font-bold text-primary-foreground">{i + 1}</span>
                <button type="button" aria-expanded={step === i} onClick={() => setStep(step === i ? null : i)} className="flex w-full items-center justify-between gap-3 rounded-2xl border-2 border-club-soft bg-card px-5 py-3 text-left font-display text-lg font-bold text-club-ink transition-colors hover:border-club">
                  {s.t}<ChevronDown className={`h-5 w-5 shrink-0 text-club-blue transition-transform ${step === i ? "rotate-180" : ""}`} />
                </button>
                {step === i && <p className="mt-2 rounded-2xl bg-club-faint px-5 py-3 leading-relaxed">{s.d}</p>}
              </li>
            ))}
          </ol>
        </section>

        <section className="space-y-6">
          <SupportJourney />
        </section>

        <section className="space-y-6">
          <H2>Lộ trình và đánh giá</H2>
          <ol className="grid gap-3 sm:grid-cols-5">
            {ROADMAP.map((r, i) => (
              <li key={r} className="relative rounded-2xl bg-club-soft p-4 text-center">
                <span className="text-xs font-bold tracking-wider text-club">GIAI ĐOẠN {i + 1}</span>
                <p className="mt-1 font-semibold text-club-ink">{r}</p>
              </li>
            ))}
          </ol>
          <div className="rounded-2xl border-2 border-club-soft bg-card p-5">
            <h3 className="font-display text-lg font-bold text-club-ink">Tiêu chí đánh giá</h3>
            <ul className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {CRITERIA.map((c) => <li key={c} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-club-blue" />{c}</li>)}
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <H2>Thư viện tài nguyên</H2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {RESOURCES.map(({ t, icon: I, to, hash }, i) => (
              <div key={t} className={`${card} flex flex-col`}>
                <I className={`h-7 w-7 ${i % 2 ? "text-club-blue" : "text-club"}`} aria-hidden="true" />
                <h3 className="mt-2 flex-1 font-semibold text-club-ink">{t}</h3>
                <Link to={to} {...(hash ? { hash } : {})} className={`${btn} mt-4 self-start`}>Mở tài liệu<ArrowRight className="h-4 w-4" /></Link>
              </div>
            ))}
          </div>
        </section>

        <nav className="flex flex-wrap justify-center gap-3 border-t border-club-soft pt-8" aria-label="Điều hướng tiếp">
          <Link to="/diem-tua" className="inline-flex items-center gap-2 rounded-full border-2 border-club px-5 py-2.5 text-sm font-bold text-club-ink hover:bg-club-soft"><ArrowLeft className="h-4 w-4" />QUAY LẠI CHẠM 5 – ĐIỂM TỰA</Link>
          <Link to="/" hash="nam-cham" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground hover:opacity-90">KHÁM PHÁ HÀNH TRÌNH 5 CHẠM</Link>
          <Link to="/diem-tua" hash="nguon-tro-giup" className="inline-flex items-center gap-2 rounded-full bg-pink-band px-5 py-2.5 text-sm font-bold text-plum hover:bg-pink-chip"><span aria-hidden="true">♡</span>TÌM ĐIỂM TỰA</Link>
        </nav>
      </div>
    </main>
  );
}
