import { createFileRoute } from "@tanstack/react-router";
import { LifeBuoy } from "lucide-react";
import { StubChamPage } from "@/components/stub-cham-page";

export const Route = createFileRoute("/diem-tua")({
  head: () => ({
    meta: [
      { title: "Chạm 5 – Điểm tựa | 5 CHẠM – Vững vàng tâm lý" },
      {
        name: "description",
        content:
          "Biết khi nào cần giúp đỡ và tìm đến ai: thầy cô, chuyên viên tư vấn, gia đình. Chạm 5 – Điểm tựa, mô hình 5 CHẠM tại Trường THPT Tây Tiền Hải.",
      },
      { property: "og:title", content: "Chạm 5 – Điểm tựa | 5 CHẠM" },
      {
        property: "og:description",
        content:
          "Biết khi nào cần giúp đỡ và tìm đến ai: thầy cô, chuyên viên tư vấn, gia đình.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DiemTuaPage,
});

function DiemTuaPage() {
  return (
    <main>
      <StubChamPage
        eyebrow="Chạm 5"
        title="Điểm tựa"
        subtitle="Biết khi nào cần giúp đỡ và tìm đến ai: thầy cô, chuyên viên tư vấn, gia đình."
        icon={LifeBuoy}
        goals={[
          "Nhận biết dấu hiệu cần được hỗ trợ",
          "Biết các kênh hỗ trợ tin cậy trong và ngoài trường",
          "Hỗ trợ bạn bè đúng cách",
        ]}
        activities={[
          "Bản đồ điểm tựa của em",
          "Thẻ liên hệ khẩn cấp",
          "Hướng dẫn “Khi bạn mình không ổn”",
        ]}
        prev={{ label: "Chạm 4 – Kết nối", to: "/ket-noi" }}
        next={{ label: "Tham gia CLB", to: "/clb" }}
      />
    </main>
  );
}
