import { LIBRARY_DOCS } from "@/components/library/data";

export const ADULT_ROLES = [
  { id: "cha-me", name: "DÀNH CHO CHA MẸ", button: "ĐỒNG HÀNH CÙNG CON", message: "Lắng nghe con – Hiểu điều con chưa nói." },
  { id: "thay-co", name: "DÀNH CHO THẦY CÔ", button: "ĐỒNG HÀNH CÙNG HỌC TRÒ", message: "Nhận diện sớm – Đồng hành đúng cách." },
  { id: "mang-luoi", name: "MẠNG LƯỚI HỖ TRỢ", button: "KHÁM PHÁ MẠNG LƯỚI", message: "Gia đình – Nhà trường – Chuyên môn cùng kết nối." },
] as const;

export const LISTENING_DAYS = [
  "Dành thời gian trò chuyện cùng con.",
  "Lắng nghe con mà không ngắt lời.",
  "Hỏi con về một điều khiến con vui trong ngày.",
  "Cùng con thực hiện một hoạt động yêu thích.",
  "Ghi nhận một nỗ lực của con.",
  "Cùng con xây dựng một thói quen chăm sóc bản thân.",
  "Nhìn lại những khoảnh khắc tích cực trong tuần.",
] as const;

export function listeningProgress(days: readonly boolean[]) {
  const completed = days.slice(0, 7).filter(Boolean).length;
  return { completed, percent: completed / 7 * 100 };
}

export const PARENT_TOPICS = [
  { title: "Hiểu con trong thế giới hôm nay", items: ["Những thay đổi tâm lý thường gặp ở lứa tuổi THPT.", "Áp lực học tập, bạn bè, ngoại hình và kỳ vọng.", "Ảnh hưởng của mạng xã hội, so sánh bản thân và nhu cầu được công nhận.", "Nhu cầu được tôn trọng, lắng nghe và tự chủ."] },
  { title: "Nhận biết những thay đổi cần quan tâm", items: ["Con ít giao tiếp hoặc thu mình hơn trước.", "Thay đổi về giấc ngủ, sinh hoạt, học tập.", "Dễ cáu gắt, buồn bã hoặc mất hứng thú với hoạt động quen thuộc.", "Có biểu hiện né tránh bạn bè hoặc gia đình."] },
  { title: "Cùng con xây dựng thói quen tích cực", items: ["Ăn uống, ngủ nghỉ hợp lý.", "Cân bằng thời gian sử dụng Internet.", "Tạo hoạt động chung giữa các thành viên.", "Khuyến khích con vận động và tham gia hoạt động yêu thích.", "Tôn trọng không gian riêng tư phù hợp của con."] },
] as const;

export const CONVERSATION_PHRASES = [
  { say: "Bố/mẹ sẵn sàng lắng nghe nếu con muốn chia sẻ.", avoid: "Có thế mà cũng buồn." },
  { say: "Điều gì khiến con cảm thấy áp lực nhất lúc này?", avoid: "Ngày xưa bố mẹ còn vất vả hơn." },
  { say: "Bố/mẹ có thể giúp con bằng cách nào?", avoid: "Con phải mạnh mẽ lên, đừng nghĩ linh tinh." },
] as const;

export const TEACHER_TOPICS = [
  { title: "Nhận diện những thay đổi", text: "Quan tâm những thay đổi trong cảm xúc, hành vi và học tập so với trước đây. Trao đổi riêng, không vội gắn nhãn hay kết luận về sức khỏe tâm lý của học sinh." },
  { title: "Trò chuyện không phán xét", text: "Chọn thời điểm phù hợp, lắng nghe không ngắt lời, ghi nhận cảm xúc và hỏi học sinh mong muốn được hỗ trợ như thế nào." },
  { title: "Hỗ trợ trước những áp lực", text: "Cùng học sinh tìm bước nhỏ trước áp lực học tập, quan hệ bạn bè và mạng xã hội. Không so sánh, trách móc hoặc yêu cầu em phải mạnh mẽ ngay." },
  { title: "Phối hợp với cha mẹ", text: "Chia sẻ thông tin cần thiết trên tinh thần tôn trọng và bảo mật phù hợp. Giải thích cho học sinh khi cần kết nối người có trách nhiệm để bảo vệ an toàn; không hứa giữ bí mật tuyệt đối." },
  { title: "Kết nối đúng người", text: "Trao đổi với người được nhà trường phân công hỗ trợ và nguồn chuyên môn phù hợp theo quy trình bảo vệ học sinh. Không mặc định thầy cô phải tự xử lý mọi khó khăn." },
  { title: "Thư viện dành cho giáo viên", text: "Tham khảo tài liệu thực tế về kết nối hỗ trợ và phối hợp gia đình – nhà trường; chỉ sử dụng nguồn có thể kiểm tra được." },
] as const;

type ResponseOption = { text: string; advantage: string; limitation: string };
export type AdultScenario = { id: string; title: string; context: string; urgent: boolean; options: readonly ResponseOption[]; guidance: string; takeaway: string };

export const ADULT_SCENARIOS: readonly AdultScenario[] = [
  {
    id: "thu-minh", title: "Khi học trò thu mình", urgent: false,
    context: "Một học sinh trước đây vui vẻ, hòa đồng nhưng gần đây ít nói và thường ngồi một mình. Trong giờ nghỉ, thầy cô nhận thấy em ít tham gia cùng các bạn.",
    options: [
      { text: "Gọi em đứng lên trước lớp để hỏi vì sao không hòa đồng.", advantage: "Thầy cô đã nhận thấy sự thay đổi và muốn quan tâm.", limitation: "Hỏi trước tập thể có thể khiến em ngại, bị chú ý hoặc khó chia sẻ thật lòng." },
      { text: "Mời em trò chuyện riêng: Thầy/cô thấy gần đây em ít nói hơn. Em có muốn chia sẻ điều gì không?", advantage: "Tôn trọng sự riêng tư, mô tả điều quan sát được và cho em quyền lựa chọn chia sẻ.", limitation: "Một cuộc trò chuyện có thể chưa đủ; cần tiếp tục quan tâm và tìm hỗ trợ nếu khó khăn kéo dài." },
      { text: "Chờ em tự tìm đến, không nhắc tới sự thay đổi.", advantage: "Không ép học sinh phải nói khi chưa sẵn sàng.", limitation: "Thiếu lời mời hỗ trợ có thể khiến em nghĩ rằng không ai quan tâm đến mình." },
    ],
    guidance: "Chọn một cuộc trò chuyện riêng, lắng nghe điều em muốn nói và hỏi em cần gì. Nếu thay đổi kéo dài hoặc ảnh hưởng rõ đến sinh hoạt, phối hợp người có trách nhiệm và gia đình theo cách an toàn.",
    takeaway: "Quan tâm bắt đầu từ điều quan sát được, không phải một nhãn chẩn đoán.",
  },
  {
    id: "diem-so", title: "Áp lực điểm số", urgent: false,
    context: "Một học sinh thường xuyên lo lắng vì điểm số, sợ làm cha mẹ thất vọng. Em nói rằng mỗi bài kiểm tra đều khiến mình căng thẳng và khó tập trung.",
    options: [
      { text: "Nói: Chỉ cần cố gắng học hơn nữa thì em sẽ hết lo.", advantage: "Thầy cô muốn khuyến khích nỗ lực học tập.", limitation: "Có thể làm tăng áp lực và bỏ qua cảm xúc, nhu cầu nghỉ ngơi hoặc hỗ trợ của em." },
      { text: "Nói: Thầy/cô nghe em đang rất lo. Mình cùng xem điều gì đang khó nhất và bước nhỏ nào có thể giúp nhé.", advantage: "Ghi nhận cảm xúc và cùng em tìm hỗ trợ cụ thể, không đồng nhất giá trị với điểm số.", limitation: "Cần phối hợp thêm khi kỳ vọng hoặc khó khăn từ gia đình tiếp tục ảnh hưởng đến em." },
      { text: "Liên hệ cha mẹ ngay và yêu cầu họ kiểm soát việc học chặt hơn.", advantage: "Có ý định huy động gia đình hỗ trợ.", limitation: "Tăng kiểm soát khi chưa hiểu tình hình có thể khiến em thêm căng thẳng; cần trao đổi tôn trọng và đúng mục đích." },
    ],
    guidance: "Lắng nghe áp lực cụ thể, cùng em chia nhỏ việc học và nghỉ ngơi phù hợp. Khi cần, trao đổi với cha mẹ theo hướng hỗ trợ, không trách móc hay tạo thêm kỳ vọng.",
    takeaway: "Điểm số là một phần của việc học, không phải toàn bộ giá trị của học sinh.",
  },
  {
    id: "bat-nat", title: "Cô lập và bắt nạt", urgent: false,
    context: "Một học sinh bị cô lập hoặc có dấu hiệu bị bắt nạt trong lớp. Em né tránh giờ sinh hoạt nhóm và lo lắng khi phải ngồi cạnh một số bạn.",
    options: [
      { text: "Yêu cầu em và các bạn liên quan đối chất ngay trước lớp.", advantage: "Thầy cô muốn xử lý tình huống thay vì bỏ qua.", limitation: "Đối chất công khai có thể tăng nguy cơ bị trả đũa, khiến em khó nói hoặc mất cảm giác an toàn." },
      { text: "Trao đổi riêng, hỏi về mức độ an toàn và kết nối người có trách nhiệm theo quy trình bảo vệ học sinh.", advantage: "Ưu tiên an toàn, tránh đổ lỗi và huy động trách nhiệm của người lớn.", limitation: "Cần theo dõi, phối hợp và bảo vệ thông tin phù hợp; không dừng ở một cuộc trò chuyện." },
      { text: "Khuyên em bỏ qua vì bạn bè chỉ trêu đùa.", advantage: "Thầy cô có ý định giúp em bớt căng thẳng.", limitation: "Làm nhẹ nguy cơ và có thể khiến học sinh không tiếp tục tìm trợ giúp." },
    ],
    guidance: "Bình tĩnh lắng nghe, không đổ lỗi cho em. Đánh giá nhu cầu an toàn trực tiếp, kết nối người có trách nhiệm, phối hợp gia đình khi an toàn và theo dõi nguy cơ tiếp diễn; nếu nguy hiểm tức thời, hỗ trợ khẩn cấp ngay.",
    takeaway: "Bắt nạt không phải việc học sinh phải tự chịu đựng hay tự giải quyết.",
  },
  {
    id: "mang-xa-hoi", title: "So sánh trên mạng xã hội", urgent: false,
    context: "Một học sinh chịu áp lực khi so sánh bản thân với người khác trên mạng xã hội. Em cảm thấy mình kém hơn sau khi xem những bài đăng về thành tích và ngoại hình.",
    options: [
      { text: "Nói: Em đừng quan tâm nữa, mạng xã hội không có gì đáng nghĩ.", advantage: "Thầy cô muốn em giảm tiếp xúc với nguồn áp lực.", limitation: "Phủ nhận cảm xúc có thể khiến em thấy không được thấu hiểu." },
      { text: "Lắng nghe rồi cùng em xem những nội dung nào gây áp lực và cách cân bằng thời gian dùng mạng.", advantage: "Tôn trọng trải nghiệm của em và cùng xây dựng thói quen phù hợp, không phán xét.", limitation: "Không nên biến cuộc trao đổi thành kiểm soát tài khoản hay đòi em cung cấp nội dung riêng tư." },
      { text: "Yêu cầu xem toàn bộ tài khoản và tin nhắn cá nhân của em.", advantage: "Thầy cô muốn tìm hiểu nguyên nhân khó khăn.", limitation: "Thu thập quá mức thông tin riêng có thể làm mất niềm tin; chỉ xử lý thông tin cần thiết theo quy trình an toàn." },
    ],
    guidance: "Ghi nhận cảm xúc, giúp em phân biệt hình ảnh được chọn lọc trên mạng với đời sống đầy đủ. Cùng tìm hoạt động trực tiếp, thói quen nghỉ ngơi và nguồn hỗ trợ nếu áp lực kéo dài.",
    takeaway: "Thấu hiểu áp lực số không đồng nghĩa kiểm soát đời sống riêng tư của học sinh.",
  },
  {
    id: "nguy-co", title: "Khi học sinh không an toàn", urgent: true,
    context: "Một học sinh bày tỏ sự tuyệt vọng hoặc nói đến việc muốn làm tổn thương bản thân. Em nói rằng không biết phải tìm đến ai và mong thầy cô giữ kín chuyện này.",
    options: [
      { text: "Hứa giữ bí mật tuyệt đối và để em về tự nghỉ ngơi.", advantage: "Có ý định giữ niềm tin và sự riêng tư của học sinh.", limitation: "Bí mật tuyệt đối và để em tự xoay xở có thể cản trở hỗ trợ cần thiết khi nguy cơ cao." },
      { text: "Bình tĩnh lắng nghe, không để em một mình khi có nguy cơ tức thời và kết nối ngay người có trách nhiệm.", advantage: "Ưu tiên an toàn và hỗ trợ trực tiếp, không trách móc hoặc giao toàn bộ trách nhiệm cho học sinh.", limitation: "Cần giải thích việc chia sẻ thông tin cần thiết để bảo vệ em và thực hiện đúng quy trình; thầy cô không thay chuyên gia." },
      { text: "Nói em phải mạnh mẽ và tự làm một bài tập để hết suy nghĩ tiêu cực.", advantage: "Có ý định động viên và gợi ý cách tự chăm sóc.", limitation: "Động viên hoặc bài tập không thay thế hỗ trợ khẩn cấp; lời nói có thể làm em ngại tiếp tục chia sẻ." },
    ],
    guidance: "Bình tĩnh lắng nghe và không trách móc. Không hứa giữ bí mật tuyệt đối, không để học sinh tự xoay xở. Kết nối ngay người có trách nhiệm trong nhà trường và gia đình theo quy trình bảo vệ học sinh; nếu nguy cơ tức thời, ưu tiên an toàn và cơ sở y tế hoặc dịch vụ khẩn cấp phù hợp.",
    takeaway: "An toàn cần được bảo đảm ngay, không chờ bài tập hoặc quy trình tuần tự.",
  },
];

export const SUPPORT_RINGS = [
  { id: "gia-dinh", title: "GIA ĐÌNH", members: ["Cha mẹ", "Người thân đáng tin cậy", "Người chăm sóc học sinh"], responsibility: "Lắng nghe, quan tâm những thay đổi, tạo môi trường an toàn và phối hợp với nhà trường hoặc người có chuyên môn khi cần." },
  { id: "nha-truong", title: "NHÀ TRƯỜNG", members: ["Giáo viên chủ nhiệm", "Giáo viên bộ môn", "Ban Giám hiệu", "Người được nhà trường phân công hỗ trợ học sinh", "Đoàn Thanh niên và các tổ chức hỗ trợ phù hợp"], responsibility: "Quan tâm học sinh, bảo vệ thông tin cần thiết, phối hợp gia đình và kết nối nguồn hỗ trợ theo trách nhiệm, quy trình của nhà trường." },
  { id: "chuyen-mon", title: "NGUỒN HỖ TRỢ CHUYÊN MÔN", members: ["Chuyên gia tâm lý có chuyên môn phù hợp", "Cơ sở y tế", "Dịch vụ bảo vệ trẻ em và các đơn vị hỗ trợ có thẩm quyền"], responsibility: "Đánh giá, tư vấn hoặc hỗ trợ trong phạm vi chuyên môn và thẩm quyền. Cùng người lớn xác minh cơ sở và chuyên môn qua kênh chính thức, không tự tìm dịch vụ chưa rõ danh tính." },
] as const;

export const SUPPORT_STEPS = [
  { title: "LẮNG NGHE", text: "Tiếp nhận và tôn trọng chia sẻ của học sinh." },
  { title: "THẤU HIỂU", text: "Tìm hiểu khó khăn, không vội kết luận hoặc chẩn đoán." },
  { title: "KẾT NỐI", text: "Kết nối học sinh với người có trách nhiệm phù hợp." },
  { title: "HỖ TRỢ", text: "Giới thiệu đến chuyên gia hoặc cơ sở chuyên môn khi cần thiết." },
  { title: "THEO DÕI", text: "Quan tâm, động viên và duy trì sự hỗ trợ phù hợp." },
] as const;

export type AdultAudience = "cha-me" | "giao-vien" | "chung";
const COMMON_RESOURCE_IDS = ["quy-trinh", "nguon-tro-giup", "ban-do-diem-tua"];
export function adultResources(audience: AdultAudience) {
  if (audience !== "chung") return [];
  return LIBRARY_DOCS.filter(doc => doc.visible && COMMON_RESOURCE_IDS.includes(doc.id) && Boolean(doc.view || doc.downloadUrl));
}