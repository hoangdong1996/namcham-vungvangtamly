import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Compass, Users, UserCheck, Stethoscope } from "lucide-react";

const GOALS = [
  "Nâng cao nhận thức về sức khỏe tâm lý học đường.",
  "Rèn luyện kỹ năng nhận diện cảm xúc, tự chăm sóc và ứng phó với áp lực.",
  "Phát triển văn hóa lắng nghe, tôn trọng và hỗ trợ bạn bè.",
  "Kết nối học sinh với giáo viên, nhân viên y tế trường học, gia đình và nguồn hỗ trợ chuyên môn phù hợp.",
];
const FORMS = [
  "Góc lắng nghe và chia sẻ an toàn.",
  "Hoạt động truyền thông tích cực về sức khỏe tâm lý.",
  "Sinh hoạt chuyên đề, trò chơi tình huống và thực hành kỹ năng.",
  "Sổ tay, phiếu thực hành và tài nguyên tự chăm sóc.",
  "Hoạt động kết nối bạn bè và người lớn đáng tin cậy.",
  "Hướng dẫn tìm kiếm hỗ trợ khi gặp khó khăn.",
];
const TIERS = [
  { t: "Tầng 1 – Học sinh chủ động", icon: Users, items: ["Tham gia thiết kế hoạt động.", "Xây dựng nội dung truyền thông tích cực.", "Tổ chức trò chơi, hoạt động trải nghiệm và thực hành kỹ năng.", "Khuyến khích văn hóa quan tâm, lắng nghe và tôn trọng."] },
  { t: "Tầng 2 – Người lớn đồng hành", icon: UserCheck, items: ["Giáo viên hoặc người phụ trách được nhà trường phân công.", "Giáo viên chủ nhiệm, thầy cô đáng tin cậy và Đoàn trường.", "Nhân viên y tế trường học trong phạm vi chức năng.", "Đầu mối tư vấn tâm lý nếu nhà trường có bố trí."] },
  { t: "Tầng 3 – Kết nối chuyên môn", icon: Stethoscope, items: ["Gia đình hoặc người giám hộ phù hợp.", "Cơ sở y tế, chuyên gia và dịch vụ hỗ trợ chuyên môn đã được xác minh.", "Đầu mối hỗ trợ khẩn cấp khi có nguy cơ mất an toàn."] },
];
const ROADMAP = [
  "Khảo sát nhu cầu và điều kiện thực tế.",
  "Hoàn thiện đề xuất mô hình, xin ý kiến và sự chấp thuận của nhà trường.",
  "Xây dựng đội ngũ học sinh nòng cốt và người lớn đồng hành.",
  "Thử nghiệm một số hoạt động phù hợp, an toàn và có thể đánh giá.",
  "Tổng kết, lấy phản hồi và điều chỉnh trước khi đề xuất mở rộng.",
];

const Status = () => <span className="inline-block rounded-full border-2 border-dashed border-plum px-4 py-1 text-xs font-bold tracking-wider text-plum">MÔ HÌNH ĐỀ XUẤT – ĐANG ĐỂ NGỎ</span>;

export const openClubProposal = () => {
  window.dispatchEvent(new Event("open-club-proposal"));
  setTimeout(() => document.getElementById("clb")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
};

export function ClubProposal() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setOpen(true);
    window.addEventListener("open-club-proposal", h);
    return () => window.removeEventListener("open-club-proposal", h);
  }, []);
  return (
    <div className="space-y-6 rounded-3xl bg-card p-6 shadow-sm sm:p-8">
      <div className="text-center">
        <Status />
        <h3 className="mt-3 font-display text-2xl font-bold text-primary">CLB HỖ TRỢ TÂM LÝ HỌC ĐƯỜNG – 5 CHẠM ĐỒNG HÀNH</h3>
        <p className="mt-2 font-semibold italic text-plum">“Học sinh làm chủ hoạt động – Người lớn đồng hành – Mỗi kết nối mở ra một điểm tựa.”</p>
        <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed">CLB Hỗ trợ tâm lý học đường – 5 Chạm đồng hành là mô hình được đề xuất trong khuôn khổ đề tài nghiên cứu nhằm tạo môi trường thân thiện để học sinh nâng cao hiểu biết về sức khỏe tâm lý, rèn luyện kỹ năng tự chăm sóc, lắng nghe và kết nối với nguồn hỗ trợ phù hợp. Hoạt động hướng đến sự tham gia chủ động của học sinh, có sự hướng dẫn của người lớn và tuân thủ nguyên tắc an toàn, tôn trọng, bảo mật phù hợp.</p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Link to="/" hash="nam-cham" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5">
          <Compass className="h-4 w-4" />KHÁM PHÁ MÔ HÌNH 5 CHẠM
        </Link>
        <button onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="clb-de-xuat"
          className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-6 py-3 text-sm font-bold text-primary transition-colors hover:bg-mint">
          TÌM HIỂU ĐỀ XUẤT CÂU LẠC BỘ<ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
      </div>

      {open && (
        <div id="clb-de-xuat" className="animate-in fade-in slide-in-from-top-2 space-y-8 border-t border-pink-band pt-6">
          <div className="text-center"><Status /></div>
          <section>
            <h4 className="font-display text-xl font-bold text-primary">1. Mục tiêu dự kiến</h4>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">{GOALS.map((g) => <li key={g} className="rounded-2xl bg-mint p-4 text-sm font-medium">{g}</li>)}</ul>
          </section>
          <section>
            <h4 className="font-display text-xl font-bold text-primary">2. Hình thức hoạt động dự kiến</h4>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{FORMS.map((f) => <li key={f} className="rounded-2xl bg-pink-chip p-4 text-sm font-semibold text-plum">{f}</li>)}</ul>
            <p className="mt-3 rounded-2xl border-2 border-dashed border-primary/40 p-4 text-sm font-medium">Học sinh có thể tổ chức hoạt động truyền thông, thực hành kỹ năng và hỗ trợ kết nối; không tự chẩn đoán, tư vấn điều trị, xử lý khủng hoảng hoặc cam kết giữ bí mật tuyệt đối trong trường hợp có nguy cơ mất an toàn.</p>
          </section>
          <section>
            <h4 className="font-display text-xl font-bold text-primary">3. Cơ chế vận hành dự kiến</h4>
            <div className="mt-3 space-y-3">
              {TIERS.map((t, k) => (
                <div key={t.t} className="rounded-2xl border-2 border-pink-band p-4" style={{ marginInline: `${k * 4}%` }}>
                  <p className="flex items-center gap-2 font-bold text-primary"><t.icon className="h-5 w-5" />{t.t}</p>
                  <ul className="mt-2 list-disc space-y-1 pl-6 text-sm">{t.items.map((x) => <li key={x}>{x}</li>)}</ul>
                </div>
              ))}
              <p className="text-sm italic text-muted-foreground">Học sinh là chủ thể tích cực trong hoạt động; những tình huống vượt quá khả năng của học sinh cần được chuyển đến người lớn có trách nhiệm và nguồn hỗ trợ phù hợp.</p>
            </div>
          </section>
          <section>
            <h4 className="font-display text-xl font-bold text-primary">4. Lộ trình dự kiến</h4>
            <ol className="mt-3 space-y-2">
              {ROADMAP.map((r, k) => (
                <li key={r} className="flex items-start gap-3 text-sm"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">{k + 1}</span><span className="pt-1">{r}</span></li>
              ))}
            </ol>
            <p className="mt-3 text-sm italic text-muted-foreground">Lộ trình trên là phương án dự kiến, cần điều chỉnh theo kết quả nghiên cứu, nguồn lực thực tế và quyết định của nhà trường.</p>
          </section>
        </div>
      )}
      <p className="text-center"><Link to="/" hash="nam-cham" className="inline-block py-3 text-sm font-semibold text-primary underline-offset-4 hover:underline">Quay lại hành trình 5 Chạm</Link></p>
    </div>
  );
}
