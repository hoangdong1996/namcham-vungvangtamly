export type DocGroupId = "nghien-cuu" | "so-tay" | "phieu" | "khong-gian-so" | "clb" | "tham-khao";

export const DOC_GROUPS: { id: DocGroupId; title: string; desc: string }[] = [
  { id: "nghien-cuu", title: "Tài liệu nghiên cứu", desc: "Cơ sở lý luận, thực tiễn, phương pháp và bộ giải pháp của đề tài." },
  { id: "so-tay", title: "Sổ tay chăm sóc bản thân", desc: "Sản phẩm hỗ trợ học sinh tự chăm sóc sức khỏe tinh thần." },
  { id: "phieu", title: "Bộ phiếu thực hành quản lý cảm xúc", desc: "Phiếu thực hành giúp nhận diện và điều chỉnh cảm xúc." },
  { id: "khong-gian-so", title: "Công cụ hỗ trợ trong không gian số", desc: "Dùng mạng lành mạnh, ứng phó áp lực và chăm sóc tinh thần." },
  { id: "clb", title: "Tài liệu cho hoạt động CLB Đồng hành", desc: "Phục vụ mô hình đề xuất và quá trình nghiên cứu, thử nghiệm trong phạm vi thực tế." },
  { id: "tham-khao", title: "Tài liệu tham khảo và nguồn trợ giúp", desc: "Văn bản đã xác minh và hướng dẫn tìm đến người hỗ trợ phù hợp." },
];

/** Thêm tài liệu mới: chỉ điền viewUrl/downloadUrl khi tệp hoặc trang thực sự tồn tại. */
export type LibraryDoc = {
  id: string;
  title: string;
  group: DocGroupId;
  desc: string;
  format: string;
  visible: boolean;
  /** Đường dẫn nội bộ đến công cụ trực tuyến đang hoạt động trên website. */
  view?: { to: "/hieu-minh" | "/vung-vang" | "/diem-tua" | "/clb" | "/lang-nghe"; hash?: string };
  downloadUrl?: string;
};

const soon = (id: string, group: DocGroupId, title: string, desc: string, format = "Tài liệu"): LibraryDoc => ({ id, group, title, desc, format, visible: true });

export const LIBRARY_DOCS: LibraryDoc[] = [
  soon("gioi-thieu", "nghien-cuu", "Giới thiệu đề tài nghiên cứu", "Mục tiêu, phạm vi và ý nghĩa của đề tài."),
  soon("ly-luan", "nghien-cuu", "Cơ sở lý luận", "Sức khỏe tinh thần học đường và nguy cơ trầm cảm ở học sinh THPT."),
  soon("thuc-tien", "nghien-cuu", "Cơ sở thực tiễn tại Trường THPT", "Kết quả được trình bày dạng tổng hợp, bảo vệ danh tính học sinh."),
  soon("phuong-phap", "nghien-cuu", "Phương pháp khảo sát và đánh giá", "Cách thức thu thập và phân tích dữ liệu của đề tài."),
  soon("giai-phap", "nghien-cuu", "Mô hình, quy trình và bộ giải pháp phòng ngừa", "Tổng hợp mô hình 5 CHẠM và các giải pháp đề xuất."),

  { id: "so-tay-cham-soc", group: "so-tay", title: "SỔ TAY CHĂM SÓC BẢN THÂN – HỌC SINH THPT", desc: "Gợi ý những hoạt động đơn giản giúp học sinh nhận diện cảm xúc, chăm sóc bản thân, cân bằng học tập và cuộc sống.", format: "Công cụ trực tuyến · In được", visible: true, view: { to: "/hieu-minh", hash: "so-tay" } },

  soon("ban-do-ap-luc", "phieu", "Phiếu “Bản đồ áp lực của tôi”", "Ghi lại các nguồn áp lực và mức độ ảnh hưởng để nhìn rõ hơn.", "Phiếu"),
  { id: "nhan-dien-cam-xuc", group: "phieu", title: "Phiếu nhận diện cảm xúc", desc: "Thực hành “Gương cảm xúc”: gọi tên cảm xúc và điều mình cần.", format: "Công cụ trực tuyến", visible: true, view: { to: "/hieu-minh" } },
  { id: "quan-ly-cam-xuc", group: "phieu", title: "Phiếu thực hành quản lý cảm xúc", desc: "Nút dừng bình tĩnh và Trạm hồi phục 5 phút để làm dịu cảm xúc.", format: "Công cụ trực tuyến", visible: true, view: { to: "/vung-vang" } },
  soon("gia-tri-rieng", "phieu", "Phiếu “Giá trị riêng của tôi”", "Nhận ra điểm mạnh và giá trị của bản thân.", "Phiếu"),
  { id: "ke-hoach-cham-soc", group: "phieu", title: "Phiếu lập kế hoạch chăm sóc bản thân", desc: "Thử thách 7 ngày vững vàng: tự lập kế hoạch và in ra để thực hiện.", format: "Công cụ trực tuyến · In được", visible: true, view: { to: "/vung-vang", hash: "thu-thach-7-ngay" } },

  soon("internet-7-ngay", "khong-gian-so", "Phiếu “Kế hoạch sử dụng Internet cân bằng trong 7 ngày”", "Lập kế hoạch thời gian dùng mạng hợp lý, dành chỗ cho đời sống trực tiếp.", "Phiếu"),
  soon("kiem-chung", "khong-gian-so", "Bộ quy tắc “5 bước kiểm chứng thông tin số”", "Giúp bình tĩnh trước thông tin gây hoang mang trên mạng.", "Bộ quy tắc"),
  soon("lam-chu", "khong-gian-so", "Tài liệu “Làm chủ không gian số – Vững vàng tâm lý”", "Mối liên hệ giữa không gian số lành mạnh, kỹ năng ứng phó và sức khỏe tinh thần."),
  soon("thong-diep", "khong-gian-so", "Bảng thông điệp tích cực của lớp", "Gợi ý xây dựng thông điệp động viên chung cho tập thể lớp.", "Bảng"),

  soon("nhom-tich-cuc", "clb", "Hướng dẫn tổ chức hoạt động nhóm tích cực", "Gợi ý tổ chức buổi sinh hoạt an toàn, tự nguyện."),
  soon("the-tinh-huong", "clb", "Thẻ tình huống thực hành lắng nghe và thấu hiểu", "Tình huống để luyện lắng nghe không phán xét.", "Bộ thẻ"),
  { id: "nhan-biet", group: "clb", title: "Hướng dẫn nhận biết khi bạn cần được hỗ trợ", desc: "Cẩm nang “Khi bạn mình không ổn… mình có thể làm gì?” với 5 bước đồng hành.", format: "Công cụ trực tuyến", visible: true, view: { to: "/diem-tua", hash: "cam-nang" } },
  { id: "quy-trinh", group: "clb", title: "Quy trình kết nối với người lớn đáng tin cậy", desc: "5 bước kết nối hỗ trợ của mô hình CLB 5 ĐỒNG HÀNH.", format: "Trang trực tuyến", visible: true, view: { to: "/clb" } },
  soon("bao-mat", "clb", "Nguyên tắc bảo mật thông tin và an toàn khi hỗ trợ bạn bè", "Khi nào giữ kín, khi nào cần báo người lớn để bảo đảm an toàn."),
  soon("phan-hoi", "clb", "Phiếu phản hồi sau hoạt động", "Ghi nhận cảm nhận chung, không thu thông tin định danh.", "Phiếu"),

  { id: "nguon-tro-giup", group: "tham-khao", title: "Nguồn trợ giúp khi cần", desc: "Hướng dẫn tìm đến gia đình, thầy cô, người lớn đáng tin cậy, nhân viên y tế trường học và hỗ trợ khẩn cấp.", format: "Trang trực tuyến", visible: true, view: { to: "/diem-tua", hash: "nguon-tro-giup" } },
  { id: "ban-do-diem-tua", group: "tham-khao", title: "Bản đồ kết nối an toàn học sinh", desc: "Sơ đồ những người em có thể tìm đến và quy trình hỗ trợ.", format: "Hình ảnh", visible: true, view: { to: "/diem-tua", hash: "ban-do" } },
  soon("van-ban", "tham-khao", "Tài liệu tham khảo khoa học, văn bản chính thức", "Chỉ bổ sung khi xác minh được tên, cơ quan ban hành hoặc tác giả, năm và đường dẫn hợp lệ."),
];
