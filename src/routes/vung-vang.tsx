import { createFileRoute } from "@tanstack/react-router";
import { Shield } from "lucide-react";
import { StubChamPage } from "@/components/stub-cham-page";

export const Route = createFileRoute("/vung-vang")({
  head: () => ({
    meta: [
      { title: "Chạm 3 – Vững vàng | 5 CHẠM – Vững vàng tâm lý" },
      {
        name: "description",
        content:
          "Rèn kỹ năng ứng phó với áp lực học tập, thi cử và những thay đổi trong cuộc sống. Chạm 3 – Vững vàng, mô hình 5 CHẠM tại Trường THPT Tây Tiền Hải.",
      },
      { property: "og:title", content: "Chạm 3 – Vững vàng | 5 CHẠM" },
      {
        property: "og:description",
        content:
          "Rèn kỹ năng ứng phó với áp lực học tập, thi cử và những thay đổi trong cuộc sống.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VungVangPage,
});

function VungVangPage() {
  return (
    <main>
      <StubChamPage
        eyebrow="Chạm 3"
        title="Vững vàng"
        subtitle="Rèn kỹ năng ứng phó với áp lực học tập, thi cử và những thay đổi trong cuộc sống."
        icon={Shield}
        goals={[
          "Quản lý thời gian và áp lực học tập",
          "Thực hành kỹ năng thư giãn",
          "Xây dựng thói quen ngủ, vận động lành mạnh",
        ]}
        activities={[
          "Kỹ thuật thở 4-7-8",
          "Kế hoạch tuần cân bằng",
          "Hộp công cụ bình tĩnh",
        ]}
        prev={{ label: "Chạm 2 – Thấu hiểu", to: "/hieu-minh" }}
        next={{ label: "Chạm 4 – Kết nối", to: "/ket-noi" }}
      />
    </main>
  );
}
