import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Brain, LockKeyhole } from "lucide-react";
import { ChamHero, PageBody, SectionHeading } from "@/components/cham";
import { Button } from "@/components/ui/button";
import { FactorMap } from "@/components/cham-two/factor-map";
import { IntentionalDayChallenge, SelfCareNotebook } from "@/components/cham-two/notebook";
import { PRESSURES } from "@/components/cham-two/data";

export const Route = createFileRoute("/hieu-minh")({
  head: () => ({
    meta: [
      { title: "Chạm 2 – Thấu hiểu | 5 CHẠM – Vững vàng tâm lý" },
      {
        name: "description",
        content:
          "Hiểu áp lực số, nhận ra điểm tựa và thực hành chăm sóc bản thân. Chạm 2 – Thấu hiểu dành cho học sinh Trường THPT Tây Tiền Hải.",
      },
      { property: "og:title", content: "Chạm 2 – Thấu hiểu | 5 CHẠM" },
      {
        property: "og:description",
        content:
          "Hiểu áp lực số – Nhận ra điểm tựa – Chủ động chăm sóc bản thân, cùng sổ tay thực hành 7 ngày không chấm điểm nguy cơ.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HieuMinhPage,
});

function HieuMinhPage() {
  return (
    <main className="cham-two">
      <ChamHero eyebrow="Chạm 2" title="CHẠM 2 – THẤU HIỂU" subtitle="Hiểu áp lực số – Nhận ra điểm tựa – Chủ động chăm sóc bản thân" icon={Brain} />
      <PageBody>
        <div className="space-y-12">
          <p className="flex items-start gap-3 border-l-4 border-primary bg-mint-soft p-4 text-sm leading-relaxed"><LockKeyhole className="mt-1 size-5 shrink-0 text-primary" /><span>Câu trả lời chỉ ở trong phiên hiện tại, không được lưu hoặc gửi lên máy chủ. Khi tải lại hoặc rời trang, nội dung sẽ được xóa. Hoạt động này không chẩn đoán hay dự đoán trầm cảm.</span></p>
          <section className="space-y-5">
            <SectionHeading>Phần 1. Nhận diện áp lực trong không gian số</SectionHeading>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{PRESSURES.map((pressure, index) => <article key={pressure.title} className="rounded-lg border border-border bg-pink-soft p-5"><span className="mb-3 flex size-8 items-center justify-center rounded-full bg-pink-band text-sm font-bold text-plum">{index + 1}</span><h3 className="font-display text-lg font-bold text-plum">{pressure.title}</h3><p className="mt-2 text-sm leading-relaxed">{pressure.text}</p></article>)}</div>
            <p className="border-l-4 border-primary bg-mint-soft p-5 text-sm font-semibold leading-relaxed">Những trải nghiệm này không tự động đồng nghĩa với trầm cảm; tác động phụ thuộc vào hoàn cảnh, mức độ, thời gian và nguồn lực hỗ trợ của mỗi người.</p>
          </section>
          <section className="space-y-5"><SectionHeading>Phần 2. Bản đồ nguy cơ và yếu tố bảo vệ</SectionHeading><FactorMap /></section>
          <section className="space-y-5"><SectionHeading>Phần 3. Thực hành sổ tay tự chăm sóc bản thân</SectionHeading><SelfCareNotebook /></section>
          <section className="space-y-5"><SectionHeading>Phần 4. Thử thách nhỏ</SectionHeading><IntentionalDayChallenge /></section>
          <section className="space-y-5"><SectionHeading>Phần 5. Tổng kết</SectionHeading><blockquote className="border-y border-pink-band bg-pink-soft px-5 py-8 text-center font-display text-xl font-semibold leading-relaxed text-plum">“Hiểu mình không phải là tự trách bản thân. Đó là nhận ra điều gì đang tạo áp lực, điều gì giúp mình vững vàng và khi nào mình cần một điểm tựa.”</blockquote></section>
          <nav aria-label="Điều hướng giữa các Chạm" className="flex flex-wrap justify-between gap-3">
            <Button asChild variant="outline" className="h-auto whitespace-normal py-3 text-left"><Link to="/lang-nghe"><ArrowLeft />Quay lại Chạm 1 – Lắng nghe</Link></Button>
            <Button asChild className="h-auto whitespace-normal py-3 text-left"><Link to="/vung-vang">Tiếp tục Chạm 3 – Vững vàng<ArrowRight /></Link></Button>
          </nav>
        </div>
      </PageBody>
    </main>
  );
}
