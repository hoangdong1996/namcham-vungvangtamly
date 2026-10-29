export const COMPANION_STEPS = [
  { title: "NHẬN RA VÀ QUAN TÂM", message: "Đôi khi, một lời hỏi thăm nhẹ nhàng là điểm bắt đầu của sự kết nối.", details: ["Chú ý khi bạn có vẻ khác với thường ngày, chẳng hạn ít giao tiếp, thu mình hoặc thường xuyên chia sẻ về áp lực.", "Không vội kết luận bạn mắc vấn đề tâm lý chỉ từ một vài biểu hiện.", "Hỏi thăm riêng tư, nhẹ nhàng, không làm bạn cảm thấy bị chú ý trước đám đông."], quote: "Mình thấy gần đây cậu có vẻ không được vui. Cậu có muốn chia sẻ với mình không?" },
  { title: "LẮNG NGHE KHÔNG PHÁN XÉT", message: "Đừng vội đưa lời khuyên. Hãy để bạn biết rằng mình đang được lắng nghe.", details: ["Dành thời gian và lắng nghe mà không ngắt lời.", "Tôn trọng cảm xúc, không so sánh nỗi buồn của bạn với người khác.", "Không ép bạn kể những điều chưa sẵn sàng chia sẻ.", "Không chế giễu, trách móc hoặc lan truyền câu chuyện của bạn."] },
  { title: "ĐỒNG HÀNH, KHÔNG LÀM THAY", message: "Ở bên bạn không có nghĩa là phải tự mình giải quyết mọi vấn đề.", details: ["Hỏi bạn muốn được hỗ trợ như thế nào.", "Có thể ngồi cùng bạn, cùng tìm người đáng tin cậy hoặc đi cùng bạn khi bạn muốn tìm sự giúp đỡ.", "Tôn trọng lựa chọn và ranh giới của bạn trong những tình huống an toàn.", "Không hứa sẽ giải quyết tất cả mọi việc.", "Không tự nhận trách nhiệm làm chuyên gia tâm lý cho bạn."], quote: "Cậu muốn mình ngồi nghe thêm, hay cậu muốn chúng mình cùng tìm một người có thể hỗ trợ?", reminder: "Em có thể là người bạn đồng hành tốt, nhưng em không cần gánh mọi khó khăn một mình." },
  { title: "KẾT NỐI VỚI NGƯỜI CÓ TRÁCH NHIỆM", message: "Khi vấn đề vượt quá khả năng của hai bạn, hãy cùng tìm một điểm tựa phù hợp.", details: [] },
  { title: "CHĂM SÓC CHÍNH MÌNH", message: "Muốn đồng hành lâu dài với người khác, em cũng cần chăm sóc chính mình.", details: ["Nghỉ ngơi khi cảm thấy mệt mỏi.", "Giữ ranh giới phù hợp và không cố gắng giải quyết mọi vấn đề thay bạn.", "Chia sẻ với người lớn đáng tin cậy khi cảm thấy lo lắng hoặc quá sức.", "Nhớ rằng việc tìm người hỗ trợ không phải là phản bội bạn; sự an toàn quan trọng hơn việc giữ bí mật tuyệt đối."], quote: "Mình quan tâm đến bạn, và mình cũng cần tìm sự giúp đỡ khi cả hai không thể tự giải quyết." },
];

export const GREETINGS = ["Dạo này cậu có thấy mệt không? Nếu cậu muốn, mình có thể ngồi đây cùng cậu một chút.", "Mình quan tâm đến cậu. Khi nào cậu sẵn sàng, mình luôn muốn lắng nghe.", "Hôm nay cậu thế nào? Cậu không cần kể ngay nếu chưa sẵn sàng."];

export const PHRASES = [
  { text: "Mình đang lắng nghe cậu.", helpful: true, explanation: "Câu nói cho bạn biết em đang hiện diện và sẵn sàng lắng nghe, không vội phán xét." },
  { text: "Cảm ơn cậu đã tin tưởng chia sẻ.", helpful: true, explanation: "Ghi nhận sự tin tưởng giúp bạn cảm thấy được tôn trọng và an toàn khi chia sẻ." },
  { text: "Mình chưa chắc hiểu hết, nhưng mình muốn lắng nghe.", helpful: true, explanation: "Em không cần có mọi câu trả lời. Sự chân thành giúp bạn cảm thấy được đón nhận." },
  { text: "Có thế mà cũng buồn.", helpful: false, explanation: "Câu nói xem nhẹ cảm xúc và có thể khiến bạn ngại chia sẻ. Hãy thử: “Mình đang lắng nghe cậu.”" },
  { text: "Cậu nghĩ nhiều quá thôi.", helpful: false, explanation: "Câu nói có thể khiến bạn thấy mình bị trách móc thay vì được thấu hiểu. Hãy hỏi thăm nhẹ nhàng và lắng nghe thêm." },
  { text: "Người khác còn khổ hơn cậu.", helpful: false, explanation: "So sánh nỗi buồn không làm cảm xúc của bạn biến mất; bạn có thể cảm thấy bị phủ nhận. Hãy tôn trọng trải nghiệm của bạn." },
];

export const CONTACTS = [
  { id: "ban-be", name: "Bạn bè đáng tin cậy", desc: "Có thể cùng lắng nghe và đồng hành khi tìm sự giúp đỡ." },
  { id: "gvcn", name: "Giáo viên chủ nhiệm", desc: "Xin một buổi trao đổi riêng để được hướng dẫn và kết nối." },
  { id: "thay-co", name: "Thầy cô giáo mà học sinh tin tưởng", desc: "Bắt đầu từ thầy cô khiến em cảm thấy được tôn trọng." },
  { id: "doan", name: "Đoàn trường", desc: "Hỏi về đầu mối hỗ trợ và người phụ trách tại trường." },
  { id: "y-te", name: "Nhân viên y tế trường học", desc: "Tìm hướng dẫn ban đầu trong phạm vi chuyên môn thực tế." },
  { id: "tu-van", name: "Cán bộ tư vấn tâm lý nếu nhà trường có bố trí", desc: "Hỏi nhà trường về đầu mối hiện có và cách đăng ký trao đổi." },
  { id: "ong-ba", name: "Gia đình hoặc người thân đáng tin cậy", desc: "Chọn một người lớn mà em cảm thấy an toàn khi chia sẻ." },
  { id: "co-so-y-te", name: "Cơ sở y tế hoặc chuyên gia phù hợp", desc: "Nhờ người lớn tìm nguồn chuyên môn có thông tin xác minh được." },
];

export const PRACTICE_OPTIONS = [
  { key: "A", text: "Đừng nghĩ nhiều nữa, vui lên đi!", feedback: "Lời động viên có ý tốt nhưng có thể khiến cảm xúc của bạn bị xem nhẹ. Hãy thử hỏi thăm nhẹ nhàng: “Nếu cậu muốn, mình sẵn sàng lắng nghe.”" },
  { key: "B", text: "Mình thấy cậu đang có vẻ khó khăn. Nếu cậu muốn, mình sẵn sàng lắng nghe.", feedback: "Đây là cách mở lời phù hợp vì thể hiện quan tâm, không phán xét và tôn trọng quyền lựa chọn của bạn." },
  { key: "C", text: "Cậu phải kể cho mình biết chuyện gì đã xảy ra.", feedback: "Ép bạn kể có thể khiến bạn cảm thấy không an toàn. Hãy cho bạn quyền quyết định thời điểm và mức độ chia sẻ." },
];
export const PRINCIPLES = ["Lắng nghe chân thành.", "Tôn trọng cảm xúc.", "Không ép buộc.", "Biết kết nối hỗ trợ."];