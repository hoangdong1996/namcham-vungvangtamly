import illus from "@/assets/illus-cham-3.webp";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, BatteryCharging, CalendarCheck, CircleCheck, Dumbbell, LockKeyhole, PauseCircle, Shield } from "lucide-react";
import { ChamHero, PageBody } from "@/components/cham";
import { Button } from "@/components/ui/button";
import { CalmStop } from "@/components/cham-three/calm-stop";
import { CopingGym } from "@/components/cham-three/coping-gym";
import { RecoveryStation } from "@/components/cham-three/recovery-station";
import { SevenDayChallenge } from "@/components/cham-three/seven-day";

export const Route = createFileRoute("/vung-vang")({
  head: () => ({
    meta: [
      { title: "Chạm 3 – Vững vàng | 5 CHẠM – Vững vàng tâm lý" },
      { name: "description", content: "Bình tĩnh trước áp lực, linh hoạt trong ứng phó và chủ động chăm sóc bản thân với 4 hoạt động thực hành cho học sinh Trường THPT." },
      { property: "og:title", content: "Chạm 3 – Vững vàng | 5 CHẠM" },
      { property: "og:description", content: "Nút dừng bình tĩnh, Phòng tập ứng phó, Trạm hồi phục 5 phút và Thử thách 7 ngày vững vàng." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VungVangPage,
});

const GUIDES = ["Nhận biết dấu hiệu căng thẳng của bản thân.", "Thử những cách ứng phó an toàn, vừa sức.", "Xây dựng thói quen số cân bằng.", "Biết khi nào nên tìm đến người hỗ trợ."];
const ACTS = [
  { id: "nut-dung", t: "Nút dừng bình tĩnh", d: "Thực hành kỹ thuật dừng lại, thở chậm và quan sát.", icon: PauseCircle },
  { id: "phong-tap", t: "Phòng tập ứng phó", d: "Luyện cách xử lý các tình huống áp lực trong đời sống và không gian số.", icon: Dumbbell },
  { id: "tram-hoi-phuc", t: "Trạm hồi phục 5 phút", d: "Chọn một hoạt động nhỏ để chăm sóc bản thân.", icon: BatteryCharging },
  { id: "thu-thach-7-ngay", t: "Thử thách 7 ngày vững vàng", d: "Lập kế hoạch thực hành kỹ năng ứng phó trong một tuần.", icon: CalendarCheck },
];
const REMEMBER = [
  { t: "Vững vàng không có nghĩa là không buồn.", d: "Mọi người đều có thể trải qua những cảm xúc khó chịu. Điều quan trọng là nhận biết, chăm sóc bản thân và lựa chọn cách ứng phó phù hợp." },
  { t: "Không phải mọi vấn đề đều có thể giải quyết ngay.", d: "Khi một vấn đề quá lớn, hãy chia nhỏ việc cần làm hoặc tìm người hỗ trợ." },
  { t: "Nghỉ ngơi không phải là thất bại.", d: "Cơ thể và tâm trí cần thời gian phục hồi. Nghỉ ngơi hợp lý có thể giúp chúng ta quay lại công việc với sự tập trung tốt hơn." },
  { t: "Tìm sự giúp đỡ là một kỹ năng.", d: "Nếu khó khăn kéo dài, ảnh hưởng đáng kể đến học tập, giấc ngủ, sinh hoạt hoặc các mối quan hệ, hãy trao đổi với người lớn đáng tin cậy hoặc người có chuyên môn phù hợp." },
];

function VungVangPage() {
  return (
    <main>
      <ChamHero image={illus} imageAlt="Học sinh viết nhật ký cảm xúc bên cạnh một mầm cây xanh đang vươn lên" eyebrow="Chạm 3" title="CHẠM 3 – VỮNG VÀNG" subtitle="Bình tĩnh trước áp lực – Linh hoạt trong ứng phó – Chủ động chăm sóc bản thân" icon={Shield} />
      <PageBody>
        <div className="space-y-10">
          <p className="mx-auto max-w-3xl text-center leading-relaxed">Không phải lúc nào chúng ta cũng có thể thay đổi những điều đang xảy ra, nhưng chúng ta có thể học cách phản ứng với chúng theo hướng lành mạnh hơn. Vững vàng không có nghĩa là lúc nào cũng mạnh mẽ hay không được buồn. Vững vàng là biết dừng lại khi quá tải, lựa chọn cách ứng phó phù hợp, cho bản thân thời gian hồi phục và tìm kiếm sự giúp đỡ khi cần.</p>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{GUIDES.map((g) => <li key={g} className="flex items-start gap-2 rounded-xl bg-mint-soft p-4 text-sm font-semibold"><CircleCheck className="mt-0.5 size-5 shrink-0 text-primary" />{g}</li>)}</ul>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ACTS.map((a, i) => <article key={a.id} className="flex flex-col rounded-2xl bg-pink-soft p-5">
              <span className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground"><a.icon className="size-6" /></span>
              <p className="mt-4 text-xs font-bold uppercase tracking-widest text-plum">Hoạt động {i + 1}</p>
              <h2 className="font-display text-lg font-bold text-primary">{a.t}</h2>
              <p className="mt-1 flex-1 text-sm leading-relaxed">{a.d}</p>
              <Button asChild size="sm" className="mt-4 self-start"><a href={`#${a.id}`}>Bắt đầu<ArrowRight /></a></Button>
            </article>)}
          </div>
          <p className="flex items-start gap-3 border-l-4 border-primary bg-mint-soft p-4 text-sm leading-relaxed"><LockKeyhole className="mt-1 size-5 shrink-0 text-primary" /><span>Mọi lựa chọn và ghi chép chỉ ở trong phiên hiện tại, không được lưu hay gửi lên máy chủ. Các tình huống là minh họa. Trang không chẩn đoán, không chấm điểm sức khỏe tâm thần.</span></p>
          <CalmStop />
          <CopingGym />
          <RecoveryStation />
          <SevenDayChallenge />
          <section className="space-y-5">
            <h2 className="font-display text-2xl font-bold text-primary">Điều cần nhớ</h2>
            <div className="grid gap-4 sm:grid-cols-2">{REMEMBER.map((r, i) => <article key={r.t} className="rounded-2xl border border-pink-band bg-card p-5"><span className="flex size-8 items-center justify-center rounded-full bg-pink-band text-sm font-bold text-plum">{i + 1}</span><h3 className="mt-3 font-display text-lg font-bold text-plum">{r.t}</h3><p className="mt-1 text-sm leading-relaxed">{r.d}</p></article>)}</div>
          </section>
          <section className="space-y-4 rounded-2xl border-t-8 border-primary bg-pink-band px-5 py-10 text-center sm:px-10">
            <blockquote className="font-display text-xl font-semibold leading-relaxed text-plum sm:text-2xl">“Vững vàng không phải là tự mình chịu đựng tất cả. Vững vàng là biết dừng lại, chọn cách ứng phó phù hợp và tìm kiếm sự hỗ trợ khi cần.”</blockquote>
            <p className="text-sm">Hôm nay, bạn không cần thay đổi tất cả. Hãy chọn một việc nhỏ, vừa sức và bắt đầu từ đó.</p>
          </section>
          <nav aria-label="Điều hướng giữa các Chạm" className="flex flex-wrap justify-between gap-3">
            <Button asChild variant="outline" className="h-auto whitespace-normal py-3 text-left"><Link to="/hieu-minh"><ArrowLeft />Quay lại Chạm 2 – Thấu hiểu</Link></Button>
            <Button asChild className="h-auto whitespace-normal py-3 text-left"><Link to="/ket-noi">Tiếp tục Chạm 4 – Kết nối<ArrowRight /></Link></Button>
          </nav>
        </div>
      </PageBody>
    </main>
  );
}
