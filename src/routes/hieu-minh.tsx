import illus from "@/assets/illus-cham-2.webp";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, BookHeart, Brain, Glasses, LockKeyhole, Smartphone, Sparkles } from "lucide-react";
import { ChamHero, PageBody } from "@/components/cham";
import { Button } from "@/components/ui/button";
import { EmotionMirror } from "@/components/cham-two/emotion-mirror";
import { BehindScreen } from "@/components/cham-two/behind-screen";
import { ChangeLens } from "@/components/cham-two/change-lens";
import { SelfCareNotebook } from "@/components/cham-two/notebook";

export const Route = createFileRoute("/hieu-minh")({
  head: () => ({
    meta: [
      { title: "Chạm 2 – Thấu hiểu | 5 CHẠM – Vững vàng tâm lý" },
      { name: "description", content: "Hiểu áp lực số, nhận ra điểm tựa và chủ động chăm sóc bản thân với 4 hoạt động tương tác dành cho học sinh Trường THPT." },
      { property: "og:title", content: "Chạm 2 – Thấu hiểu | 5 CHẠM" },
      { property: "og:description", content: "Gương cảm xúc, Phía sau màn hình, Đổi chiếc kính và Sổ tay chăm sóc bản thân – không chấm điểm, không lưu câu trả lời." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HieuMinhPage,
});

const ACTIVITIES = [
  { id: "guong-cam-xuc", t: "Gương cảm xúc", d: "Nhận diện cảm xúc, điều ảnh hưởng đến mình và nhu cầu lúc này.", icon: Sparkles },
  { id: "phia-sau-man-hinh", t: "Phía sau màn hình", d: "Phân biệt sự thật với suy đoán trong 6 tình huống số.", icon: Smartphone },
  { id: "doi-chiec-kinh", t: "Đổi chiếc kính", d: "Nhìn từ phía người khác và chọn cách kết nối không phán xét.", icon: Glasses },
  { id: "so-tay", t: "Sổ tay chăm sóc bản thân", d: "Kế hoạch 7 ngày, điều giúp mình hồi phục và cam kết nhỏ.", icon: BookHeart },
];

function HieuMinhPage() {
  return (
    <main className="cham-two">
      <ChamHero image={illus} imageAlt="Học sinh tò mò quan sát những mảnh ghép cảm xúc nhiều màu đang dần sắp xếp hài hòa" eyebrow="Chạm 2" title="CHẠM 2 – THẤU HIỂU" subtitle="Hiểu áp lực số – Nhận ra điểm tựa – Hình thành thói quen chăm sóc bản thân" icon={Brain} />
      <PageBody>
        <div className="space-y-10">
          <p className="mx-auto max-w-3xl text-center leading-relaxed">Có những lúc ta cảm thấy mệt mỏi, tự ti hoặc cô đơn mà chưa hiểu rõ nguyên nhân. Có những điều trên mạng khiến ta vui vẻ, nhưng cũng có những điều làm ta vô tình so sánh mình với người khác. Chạm 2 là hành trình giúp bạn nhận diện áp lực, hiểu cảm xúc và nhu cầu của bản thân, tìm ra những nguồn lực bảo vệ mình và học cách thấu cảm với mọi người.</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ACTIVITIES.map((a, i) => (
              <article key={a.id} className="flex flex-col rounded-2xl bg-pink-soft p-5">
                <span className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground"><a.icon className="size-6" /></span>
                <p className="mt-4 text-xs font-bold uppercase tracking-widest text-plum">Hoạt động {i + 1}</p>
                <h2 className="font-display text-lg font-bold text-primary">{a.t}</h2>
                <p className="mt-1 flex-1 text-sm leading-relaxed">{a.d}</p>
                <Button asChild size="sm" className="mt-4 self-start"><a href={`#${a.id}`}>Bắt đầu<ArrowRight /></a></Button>
              </article>
            ))}
          </div>
          <p className="flex items-start gap-3 border-l-4 border-primary bg-mint-soft p-4 text-sm leading-relaxed"><LockKeyhole className="mt-1 size-5 shrink-0 text-primary" /><span>Câu trả lời chỉ ở trong phiên hiện tại, không được lưu hoặc gửi lên máy chủ. Khi tải lại hoặc rời trang, nội dung sẽ được xóa. Các tình huống đều là minh họa. Hoạt động này không chẩn đoán, không chấm điểm hay dự đoán trầm cảm.</span></p>
          <EmotionMirror />
          <BehindScreen />
          <ChangeLens />
          <SelfCareNotebook />
          <section className="space-y-5 rounded-2xl border-t-8 border-primary bg-pink-band px-5 py-10 text-center sm:px-10">
            <h2 className="font-display text-2xl font-bold text-primary">Tổng kết</h2>
            <blockquote className="font-display text-xl font-semibold leading-relaxed text-plum sm:text-2xl">“Hiểu mình không phải là tự trách bản thân. Đó là nhận ra điều gì đang tạo áp lực, điều gì giúp mình vững vàng và khi nào mình cần một điểm tựa.”</blockquote>
            <p className="mx-auto max-w-3xl text-sm leading-relaxed">Mỗi người có hoàn cảnh và cách trải nghiệm khác nhau. Nếu khó khăn kéo dài hoặc ảnh hưởng đáng kể đến học tập, giấc ngủ, các mối quan hệ hay sinh hoạt, bạn có thể tìm đến người lớn đáng tin cậy hoặc người có chuyên môn để được hỗ trợ.</p>
          </section>
          <nav aria-label="Điều hướng giữa các Chạm" className="flex flex-wrap justify-between gap-3 print:hidden">
            <Button asChild variant="outline" className="h-auto whitespace-normal py-3 text-left"><Link to="/lang-nghe"><ArrowLeft />Quay lại Chạm 1 – Lắng nghe</Link></Button>
            <Button asChild className="h-auto whitespace-normal py-3 text-left"><Link to="/vung-vang">Tiếp tục Chạm 3 – Vững vàng<ArrowRight /></Link></Button>
          </nav>
        </div>
      </PageBody>
    </main>
  );
}
