/** Exercises on this site that the AI may suggest. Browser-safe. */
export const EXERCISES = {
  "guong-cam-xuc": { title: "Gương cảm xúc", to: "/hieu-minh", hash: "guong-cam-xuc", about: "gọi tên cảm xúc đang có" },
  "phia-sau-man-hinh": { title: "Phía sau màn hình", to: "/hieu-minh", hash: "phia-sau-man-hinh", about: "áp lực mạng xã hội, so sánh, quá tải thông tin" },
  "doi-chiec-kinh": { title: "Đổi chiếc kính", to: "/hieu-minh", hash: "doi-chiec-kinh", about: "nhìn vấn đề theo góc khác, bớt tự trách" },
  "so-tay": { title: "Sổ tay chăm sóc bản thân", to: "/hieu-minh", hash: "so-tay", about: "lập kế hoạch chăm sóc bản thân" },
  "nut-dung": { title: "Nút dừng bình tĩnh", to: "/vung-vang", hash: "nut-dung", about: "dừng lại, hít thở khi căng thẳng tức thời" },
  "phong-tap": { title: "Phòng tập ứng phó", to: "/vung-vang", hash: "phong-tap", about: "luyện cách ứng phó với tình huống áp lực (thi cử, mâu thuẫn)" },
  "tram-hoi-phuc": { title: "Trạm hồi phục 5 phút", to: "/vung-vang", hash: "tram-hoi-phuc", about: "nghỉ ngắn để hồi phục năng lượng" },
  "thu-thach-7-ngay": { title: "Thử thách 7 ngày", to: "/vung-vang", hash: "thu-thach-7-ngay", about: "xây thói quen tích cực nhỏ mỗi ngày" },
  "ket-noi": { title: "Hành trình kết nối", to: "/ket-noi", hash: undefined, about: "cô đơn, mâu thuẫn với bạn bè, gia đình, thầy cô" },
  "ban-do": { title: "Bản đồ kết nối an toàn", to: "/diem-tua", hash: "ban-do", about: "chọn người lớn đáng tin cậy để chia sẻ" },
} as const;

export type ExerciseId = keyof typeof EXERCISES;
export const EXERCISE_IDS = Object.keys(EXERCISES) as [ExerciseId, ...ExerciseId[]];
export const MAX_SHARE_LENGTH = 1000;

export type Suggestion = {
  message: string;
  exercises: ExerciseId[];
  urgent: boolean;
};

/** Keep only known, unique exercise ids (max 3). */
export function normalizeExercises(ids: readonly string[]): ExerciseId[] {
  const out: ExerciseId[] = [];
  for (const id of ids) if (id in EXERCISES && !out.includes(id as ExerciseId)) out.push(id as ExerciseId);
  return out.slice(0, 3);
}
