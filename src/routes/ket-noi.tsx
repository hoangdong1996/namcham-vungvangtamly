import { createFileRoute } from "@tanstack/react-router";
import { HeartHandshake } from "lucide-react";
import { ChamHero, PageBody, PrevNext } from "@/components/cham";
import { ConnectionJourney } from "@/components/cham-four/journey";

export const Route = createFileRoute("/ket-noi")({
  head: () => ({
    meta: [
      { title: "Chạm 4 – Kết nối | 5 CHẠM – Vững vàng tâm lý" },
      { name: "description", content: "Hành trình từ khoảng cách vô hình đến kết nối với bạn bè, gia đình và thầy cô. Chạm 4 – Kết nối, mô hình 5 CHẠM tại Trường THPT Tây Tiền Hải." },
      { property: "og:title", content: "Chạm 4 – Kết nối | 5 CHẠM" },
      { property: "og:description", content: "Hành trình từ khoảng cách vô hình đến kết nối với bạn bè, gia đình và thầy cô." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: KetNoiPage,
});

function KetNoiPage() {
  return (
    <main className="cham-two">
      <ChamHero eyebrow="Chạm 4" title="CHẠM 4 – KẾT NỐI" subtitle="Từ khoảng cách vô hình đến kết nối: bạn bè – gia đình – thầy cô." icon={HeartHandshake} />
      <PageBody>
        <div className="space-y-10">
          <ConnectionJourney />
          <PrevNext prev={{ label: "Chạm 3 – Vững vàng", to: "/vung-vang" }} next={{ label: "Chạm 5 – Điểm tựa", to: "/diem-tua" }} />
        </div>
      </PageBody>
    </main>
  );
}
