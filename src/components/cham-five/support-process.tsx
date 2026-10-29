import { ArrowRight, ClipboardCheck, Ear, HandHeart, Repeat, Route as RouteIcon, ShieldAlert, Sprout } from "lucide-react";

const PROCESS = [
  { t: "TIẾP NHẬN", d: "Lắng nghe bình tĩnh, tôn trọng và không phán xét.", icon: Ear },
  { t: "ĐÁNH GIÁ NHU CẦU VÀ MỨC ĐỘ AN TOÀN", d: "Quan tâm đến khó khăn và dấu hiệu nguy cơ; không tự chẩn đoán.", icon: ClipboardCheck },
  { t: "THỐNG NHẤT PHƯƠNG ÁN HỖ TRỢ", d: "Cùng lựa chọn cách hỗ trợ phù hợp với nhu cầu và điều kiện thực tế.", icon: HandHeart },
  { t: "KẾT NỐI – CHUYỂN GỬI", d: "Kết nối với người lớn có trách nhiệm hoặc nguồn hỗ trợ chuyên môn khi cần.", icon: RouteIcon },
  { t: "THEO DÕI – PHẢN HỒI", d: "Tiếp tục quan tâm, điều chỉnh cách hỗ trợ và tôn trọng quyền riêng tư.", icon: Repeat },
];

export function SupportProcess({ onGuide, onClub }: { onGuide: () => void; onClub: () => void }) {
  return (
    <div className="space-y-8 pt-6">
      <div className="space-y-4">
        <h3 className="text-center font-display text-2xl font-bold text-primary">KHI CẦN HỖ TRỢ, HÃY ĐI THEO TỪNG BƯỚC</h3>
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {PROCESS.map((p, k) => (
            <li key={p.t} className="rounded-3xl border-2 border-pink-band bg-card p-4 transition-transform hover:-translate-y-1">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{k + 1}</span>
                <p.icon className="h-5 w-5 text-plum" />
              </div>
              <p className="mt-3 font-display font-bold leading-snug text-primary">{p.t}</p>
              <p className="mt-1 text-sm leading-relaxed">{p.d}</p>
            </li>
          ))}
        </ol>
        <p className="rounded-2xl bg-pink-soft p-4 text-center text-sm font-medium text-plum">Đây là quy trình định hướng giáo dục và kết nối hỗ trợ trong mô hình nghiên cứu; học sinh không thực hiện chẩn đoán, điều trị hoặc tự xử lý tình huống khẩn cấp.</p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl bg-mint p-5">
            <p className="flex items-center gap-2 font-display text-lg font-bold text-primary"><Sprout className="h-5 w-5" />NHÁNH THÔNG THƯỜNG</p>
            <p className="mt-2 text-sm leading-relaxed">Có thể bắt đầu bằng lắng nghe, chia sẻ với người đáng tin cậy, rèn luyện kỹ năng và kết nối hỗ trợ phù hợp.</p>
          </div>
          <div className="rounded-3xl border-2 border-destructive/40 bg-card p-5">
            <p className="flex items-center gap-2 font-display text-lg font-bold text-destructive"><ShieldAlert className="h-5 w-5" />NHÁNH KHẨN CẤP</p>
            <p className="mt-2 text-sm leading-relaxed">Khi có nguy cơ mất an toàn, cần báo ngay cho người lớn có trách nhiệm ở gần hoặc dịch vụ khẩn cấp phù hợp; không để học sinh tự xử lý một mình.</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button onClick={onGuide} className="inline-flex items-center gap-2 rounded-full bg-plum px-7 py-3.5 font-display font-bold text-primary-foreground shadow-md transition-transform hover:-translate-y-0.5">
          KHI BẠN MÌNH KHÔNG ỔN – MÌNH CÓ THỂ LÀM GÌ?<ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="rounded-3xl border-2 border-dashed border-primary/40 bg-card p-6 text-center">
        <span className="inline-block rounded-full border-2 border-dashed border-plum px-4 py-1 text-xs font-bold tracking-wider text-plum">MÔ HÌNH ĐỀ XUẤT – ĐANG ĐỂ NGỎ</span>
        <p className="mt-3 font-display text-xl font-bold text-primary">CLB HỖ TRỢ TÂM LÝ HỌC ĐƯỜNG – 5 CHẠM ĐỒNG HÀNH</p>
        <p className="mt-1 font-semibold italic text-plum">“Học sinh làm chủ hoạt động – Người lớn đồng hành – Mỗi kết nối mở ra một điểm tựa.”</p>
        <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed">Đây là mô hình câu lạc bộ đang được đề xuất trong khuôn khổ đề tài nghiên cứu, hướng tới xây dựng môi trường học đường biết lắng nghe, tăng cường kỹ năng tự chăm sóc và kết nối học sinh với nguồn hỗ trợ phù hợp.</p>
        <button onClick={onClub} className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5">
          KHÁM PHÁ MÔ HÌNH CLB 5 CHẠM<ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
