import { createFileRoute } from "@tanstack/react-router";
import { HeartHandshake } from "lucide-react";
import { StubChamPage } from "@/components/stub-cham-page";

export const Route = createFileRoute("/ket-noi")({
  head: () => ({
    meta: [
      { title: "Chạm 4 – Kết nối | 5 CHẠM – Vững vàng tâm lý" },
      {
        name: "description",
        content:
          "Xây dựng mối quan hệ tích cực với bạn bè, thầy cô và gia đình. Chạm 4 – Kết nối, mô hình 5 CHẠM tại Trường THPT Tây Tiền Hải.",
      },
      { property: "og:title", content: "Chạm 4 – Kết nối | 5 CHẠM" },
      {
        property: "og:description",
        content:
          "Xây dựng mối quan hệ tích cực với bạn bè, thầy cô và gia đình.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: KetNoiPage,
});

function KetNoiPage() {
  return (
    <main>
      <StubChamPage
        eyebrow="Chạm 4"
        title="Kết nối"
        subtitle="Xây dựng mối quan hệ tích cực với bạn bè, thầy cô và gia đình."
        icon={HeartHandshake}
        goals={[
          "Giao tiếp tôn trọng và lắng nghe tích cực",
          "Biết cách chia sẻ và đề nghị giúp đỡ",
          "Lan tỏa sự tử tế trong lớp học",
        ]}
        activities={[
          "Góc lời khen",
          "Thử thách “1 tin nhắn yêu thương”",
          "Vòng tròn chia sẻ",
        ]}
        prev={{ label: "Chạm 3 – Vững vàng", to: "/vung-vang" }}
        next={{ label: "Chạm 5 – Tìm điểm tựa", to: "/diem-tua" }}
      />
    </main>
  );
}
