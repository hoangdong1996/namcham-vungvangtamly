import cham1 from "@/assets/illus-cham-1.webp";
import cham2 from "@/assets/illus-cham-2.webp";
import cham3 from "@/assets/illus-cham-3.webp";
import cham4 from "@/assets/illus-cham-4.webp";
import cham5 from "@/assets/illus-cham-5.webp";

export const LAST_TOUCH_POINTS = [
  { id: 1, name: "Lắng nghe", to: "/lang-nghe", image: cham1, message: "Dành thời gian nhận diện và lắng nghe cảm xúc của mình." },
  { id: 2, name: "Thấu hiểu", to: "/hieu-minh", image: cham2, message: "Hiểu áp lực, nhận ra điểm tựa và hình thành thói quen chăm sóc bản thân." },
  { id: 3, name: "Vững vàng", to: "/vung-vang", image: cham3, message: "Thực hành kỹ năng quản lý cảm xúc và ứng phó với áp lực." },
  { id: 4, name: "Kết nối", to: "/ket-noi", image: cham4, message: "Chủ động trò chuyện và xây dựng những kết nối tích cực." },
  { id: 5, name: "Điểm tựa", to: "/diem-tua", image: cham5, message: "Nhận biết khi cần hỗ trợ và chủ động tìm kiếm sự giúp đỡ phù hợp." },
] as const;

export const LETTER_CATEGORIES = ["Lời nhắn tích cực", "Chia sẻ cảm xúc", "Góp ý cho website", "Đề xuất hoạt động"] as const;
// There is no real recipient or delivery service. Never turn a local draft into a sent message.
export const LETTER_RECEPTION_ENABLED = false;