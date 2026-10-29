import { createFileRoute } from "@tanstack/react-router";
import { Brain } from "lucide-react";
import { StubChamPage } from "@/components/stub-cham-page";

export const Route = createFileRoute("/hieu-minh")({
  head: () => ({
    meta: [
      { title: "Chạm 2 – Hiểu mình | 5 CHẠM – Vững vàng tâm lý" },
      {
        name: "description",
        content:
          "Khám phá điểm mạnh, giá trị bản thân và những suy nghĩ ảnh hưởng đến cảm xúc. Chạm 2 – Hiểu mình, mô hình 5 CHẠM tại Trường THPT Tây Tiền Hải.",
      },
      { property: "og:title", content: "Chạm 2 – Hiểu mình | 5 CHẠM" },
      {
        property: "og:description",
        content:
          "Khám phá điểm mạnh, giá trị bản thân và những suy nghĩ ảnh hưởng đến cảm xúc.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HieuMinhPage,
});

function HieuMinhPage() {
  return (
    <main>
      <StubChamPage
        eyebrow="Chạm 2"
        title="Hiểu mình"
        subtitle="Khám phá điểm mạnh, giá trị bản thân và những suy nghĩ ảnh hưởng đến cảm xúc."
        icon={Brain}
        goals={[
          "Nhận ra điểm mạnh của bản thân",
          "Phân biệt suy nghĩ và sự thật",
          "Tự nói chuyện với mình bằng sự tử tế",
        ]}
        activities={[
          "Cây điểm mạnh",
          "Thẻ “Suy nghĩ thay thế”",
          "Lá thư gửi chính mình",
        ]}
        prev={{ label: "Chạm 1 – Lắng nghe", to: "/lang-nghe" }}
        next={{ label: "Chạm 3 – Vững vàng", to: "/vung-vang" }}
      />
    </main>
  );
}
