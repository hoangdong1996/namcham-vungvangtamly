export const MAP_EMOTIONS = [
  { id: "happy", label: "Vui vẻ", symbol: "😊", tip: "Dành một phút ghi nhận điều khiến mình vui. Nếu muốn, chia sẻ niềm vui ấy với một người bạn tin tưởng." },
  { id: "peaceful", label: "Bình yên", symbol: "🌿", tip: "Giữ lại một khoảng nghỉ nhỏ: ngồi thoải mái, nhìn ra ngoài cửa sổ và tận hưởng nhịp thở tự nhiên." },
  { id: "excited", label: "Hào hứng", symbol: "✨", tip: "Chọn một việc nhỏ để dành năng lượng cho điều mình yêu thích, rồi nhớ nghỉ ngơi khi cơ thể cần." },
  { id: "worried", label: "Lo lắng", symbol: "😟", tip: "Thả lỏng vai, thở chậm theo nhịp dễ chịu. Chọn một việc nhỏ mình có thể làm ngay, những việc còn lại có thể chờ." },
  { id: "sad", label: "Buồn bã", symbol: "😔", tip: "Cho phép mình buồn mà không tự trách. Thử một hoạt động nhẹ nhàng hoặc trò chuyện với một người biết lắng nghe." },
  { id: "angry", label: "Tức giận", symbol: "😠", tip: "Tạm dừng cuộc tranh luận nếu có thể, uống chút nước và dành một khoảng nghỉ trước khi chọn cách nói điều mình cần." },
  { id: "lonely", label: "Cô đơn", symbol: "🫂", tip: "Thử kết nối bằng một lời chào hoặc lời nhắn ngắn với người mình tin tưởng. Mình không cần kể hết mọi chuyện ngay." },
  { id: "tired", label: "Mệt mỏi", symbol: "😴", tip: "Cho cơ thể một khoảng nghỉ, uống nước và giảm bớt một việc chưa cần làm ngay. Nghỉ ngơi cũng là chăm sóc bản thân." },
  { id: "other", label: "Cảm xúc khác", symbol: "💭", tip: "Không cần gọi tên cảm xúc ngay. Dành một chút thời gian quan sát điều cơ thể cần, rồi chọn một việc nhẹ nhàng cho mình." },
] as const;

export const MAP_CAUSES = [
  { id: "study", label: "Học tập", symbol: "📚" },
  { id: "family", label: "Gia đình", symbol: "🏡" },
  { id: "friends", label: "Bạn bè", symbol: "🤝" },
  { id: "social", label: "Mạng xã hội", symbol: "📱" },
  { id: "self", label: "Bản thân", symbol: "🌱" },
  { id: "unknown", label: "Chưa xác định", symbol: "☁️" },
] as const;

export type MapEmotionId = (typeof MAP_EMOTIONS)[number]["id"];
export type MapCauseId = (typeof MAP_CAUSES)[number]["id"];

export function emotionMapTip(emotionId: MapEmotionId, intensity: number) {
  const emotion = MAP_EMOTIONS.find((entry) => entry.id === emotionId);
  if (!emotion) return "Dành một khoảng nghỉ nhỏ và lắng nghe điều mình cần lúc này.";
  const difficult = ["worried", "sad", "angry", "lonely", "tired", "other"].includes(emotionId);
  return emotion.tip + (difficult && intensity >= 4 ? " Nếu cảm thấy khó tự xoay xở, hãy nhờ một người lớn đáng tin cậy ở bên và lắng nghe mình." : "");
}