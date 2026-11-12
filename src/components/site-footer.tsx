import { Link } from "@tanstack/react-router";
import { ArrowUpRight, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LOGO_URL } from "@/lib/logo";
import { DIRECT_SUPPORT_GUIDANCE } from "@/lib/support-safety";

const FOOTER_LINKS = [
  { name: "Chạm 1 – Lắng nghe", to: "/lang-nghe" },
  { name: "Chạm 2 – Thấu hiểu", to: "/hieu-minh" },
  { name: "Chạm 3 – Vững vàng", to: "/vung-vang" },
  { name: "Chạm 4 – Kết nối", to: "/ket-noi" },
  { name: "Chạm 5 – Điểm tựa", to: "/diem-tua" },
  { name: "CLB Đồng hành", to: "/clb" },
  { name: "Tài liệu", to: "/tai-lieu" },
  { name: "Góc đồng hành", to: "/dong-hanh" },
] as const;

export function SiteFooter() {
  return (
    <footer className="lt-footer">
      <div className="lt-inner">
        <div className="lt-footer-grid">
          <div><Link to="/" className="inline-flex items-center gap-3" aria-label="5 CHẠM – Trang chủ"><img src={LOGO_URL} alt="Logo 5 CHẠM" width={56} height={56} loading="lazy" className="h-14 w-14 object-contain" /><span className="font-hero text-2xl font-extrabold">5 CHẠM</span></Link><p className="mt-4 font-semibold">VỮNG VÀNG TÂM LÝ</p><p className="mt-3 text-sm leading-relaxed">Trường THPT</p><p className="mt-6 text-sm text-lt-footer-ink/75">CLB Đồng hành · Mô hình đề xuất</p></div>
          <nav aria-label="Tiếp nối hành trình"><h2 className="font-hero text-sm font-bold">TIẾP NỐI HÀNH TRÌNH</h2><ul className="lt-footer-links">{FOOTER_LINKS.map(link => <li key={link.to}><Link to={link.to}>{link.name}<ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></Link></li>)}</ul></nav>
          <div><h2 className="font-hero text-sm font-bold">TÌM KIẾM HỖ TRỢ</h2><p className="mt-4 text-sm leading-relaxed">Bạn không cần phải tự mình vượt qua mọi khó khăn.</p><Button variant="secondary" asChild className="mt-5 h-auto whitespace-normal bg-lt-pink px-5 py-3 text-lt-green hover:bg-pink-chip"><Link to="/diem-tua" hash="nguon-tro-giup"><HeartHandshake aria-hidden="true" />Tìm điểm tựa<ArrowUpRight aria-hidden="true" /></Link></Button></div>
        </div>
        <div className="lt-footer-safety"><p>Nội dung website phục vụ mục tiêu nâng cao nhận thức, kỹ năng chăm sóc sức khỏe tinh thần và tìm kiếm hỗ trợ; không thay thế đánh giá, tư vấn hoặc điều trị chuyên môn.</p><p className="mt-3">Website không chẩn đoán hay gắn nhãn tâm lý cho học sinh. {DIRECT_SUPPORT_GUIDANCE}</p></div>
      </div>
    </footer>
  );
}
