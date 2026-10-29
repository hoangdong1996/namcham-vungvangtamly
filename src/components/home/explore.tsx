import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Ear, Eye, FolderHeart, NotebookPen, ShieldCheck, Smartphone, Timer, Users, Wind } from "lucide-react";

type Tool = { title: string; desc: string; icon: typeof Wind; to: "/hieu-minh" | "/vung-vang"; hash: string; action: string };

const TOOLS: Tool[] = [
  { title: "Gương cảm xúc", desc: "3 bước nhận diện và gọi tên cảm xúc.", icon: Eye, to: "/hieu-minh", hash: "guong-cam-xuc", action: "Bắt đầu" },
  { title: "Phía sau màn hình", desc: "6 tình huống ứng xử trong không gian số.", icon: Smartphone, to: "/hieu-minh", hash: "phia-sau-man-hinh", action: "Thử tình huống" },
  { title: "Sổ tay chăm sóc bản thân", desc: "Ghi chép 7 ngày và in thành sổ tay A4.", icon: NotebookPen, to: "/hieu-minh", hash: "so-tay", action: "Mở sổ tay" },
  { title: "Nút dừng bình tĩnh", desc: "Bài thở có hướng dẫn khi thấy căng thẳng.", icon: Wind, to: "/vung-vang", hash: "nut-dung", action: "Thực hành" },
  { title: "Trạm hồi phục 5 phút", desc: "8 trạm nghỉ ngắn có đồng hồ đếm giờ.", icon: Timer, to: "/vung-vang", hash: "tram-hoi-phuc", action: "Vào trạm" },
  { title: "Thử thách 7 ngày", desc: "Lập kế hoạch vững vàng và in ra.", icon: ShieldCheck, to: "/vung-vang", hash: "thu-thach-7-ngay", action: "Nhận thử thách" },
];

export function PracticeTools() {
  return (
    <section id="cong-cu" aria-labelledby="cong-cu-title" className="bg-mint-soft px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <h2 id="cong-cu-title" className="text-center font-display text-3xl font-bold text-primary sm:text-4xl">Công cụ thực hành</h2>
        <p className="mt-2 text-center text-foreground/75">Các bài tập dùng được ngay, không cần đăng nhập và không lưu câu trả lời của bạn.</p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((t) => (
            <li key={t.title}>
              <Link to={t.to} hash={t.hash} className="group flex h-full items-start gap-4 rounded-3xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-reduce:transition-none">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-mint text-primary"><t.icon className="h-6 w-6" aria-hidden="true" /></span>
                <span className="flex flex-col">
                  <span className="font-display text-lg font-bold text-green-deep">{t.title}</span>
                  <span className="text-sm text-foreground/75">{t.desc}</span>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-primary">{t.action} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ClubAndLibrary() {
  return (
    <section aria-label="CLB Đồng hành và Thư viện tài liệu" className="bg-card px-4 py-16">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
        <div className="flex flex-col rounded-[2rem] border-2 border-club-soft bg-club-faint p-7 sm:p-9">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-club-soft px-3 py-1 text-xs font-bold text-club-ink">MÔ HÌNH ĐỀ XUẤT – ĐANG ĐỂ NGỎ</span>
          <h2 className="mt-4 flex items-center gap-3 font-display text-3xl font-extrabold text-club-ink"><Users className="h-8 w-8 text-club" aria-hidden="true" />CLB 5 ĐỒNG HÀNH</h2>
          <p className="mt-3 font-semibold text-club">Học sinh làm chủ hoạt động – Người lớn đồng hành – Chuyên gia hỗ trợ đúng lúc.</p>
          <ul className="mt-4 space-y-2 text-sm text-foreground/80">
            <li className="flex gap-2"><Ear className="h-4 w-4 shrink-0 text-club" aria-hidden="true" />Kỹ năng lắng nghe và đồng hành an toàn</li>
            <li className="flex gap-2"><ShieldCheck className="h-4 w-4 shrink-0 text-club" aria-hidden="true" />Quy tắc bảo mật và tìm kiếm hỗ trợ</li>
          </ul>
          <Link to="/clb" className="mt-auto inline-flex w-fit items-center gap-2 self-start rounded-full bg-club px-6 py-3 pt-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-club-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-club focus-visible:ring-offset-2 [margin-top:1.5rem]">Khám phá CLB <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
        <div className="flex flex-col rounded-[2rem] border-2 border-pink-band bg-pink-soft p-7 sm:p-9">
          <h2 className="flex items-center gap-3 font-display text-3xl font-extrabold text-green-deep"><BookOpen className="h-8 w-8 text-primary" aria-hidden="true" />THƯ VIỆN TÀI LIỆU</h2>
          <p className="mt-3 text-foreground/80">Cơ sở khoa học – Công cụ thực hành – Sản phẩm nghiên cứu. Tìm kiếm, lọc theo nhóm và xem trước tài liệu ngay trên trang.</p>
          <p className="mt-3 flex gap-2 text-sm text-foreground/75"><FolderHeart className="h-4 w-4 shrink-0 text-plum" aria-hidden="true" />Có mục “Tài liệu của tôi” để quản lý tài liệu nghiên cứu.</p>
          <Link to="/tai-lieu" className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-green-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">Mở thư viện <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
