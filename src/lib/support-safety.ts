/** Shared safety guidance; never a call action or a substitute for direct adult help. */
export const DIRECT_SUPPORT_GUIDANCE = "Nếu em đang cảm thấy không an toàn hoặc có nguy cơ làm tổn thương bản thân, hãy tìm đến ngay một người lớn đáng tin cậy, giáo viên hoặc người có trách nhiệm để được hỗ trợ trực tiếp. Trong tình huống khẩn cấp, hãy đến cơ sở y tế gần nhất hoặc nhờ người lớn liên hệ dịch vụ cấp cứu phù hợp.";

export const AI_PRIVACY_NOTICE = "Không nhập họ tên, số điện thoại, địa chỉ, tên lớp hoặc thông tin có thể nhận diện bản thân và người khác. Nội dung có thể được xử lý bởi dịch vụ AI bên ngoài website.";
export const AI_NETWORK_MESSAGE = "Kết nối đang gặp sự cố. Em có thể thử lại sau ít phút hoặc tìm đến một người đáng tin cậy để trò chuyện.";

const SAFE_AI_ERRORS = ["Tính năng gợi ý chưa được cấu hình.", "Hệ thống đang bận, bạn thử lại sau ít phút nhé.", "Tính năng gợi ý tạm hết lượt sử dụng.", "Chưa tạo được gợi ý lúc này.", "Bạn hãy viết thêm một chút nhé."];

/** Only transport failures allow an explicit user retry; never expose raw exception text. */
export function presentSupportError(error: unknown): { message: string; retryable: boolean } {
  const message = error instanceof Error ? error.message : "";
  if (/failed to fetch|fetch failed|networkerror|network request failed|load failed|network connection|connection.*lost/i.test(message)) {
    return { message: AI_NETWORK_MESSAGE, retryable: true };
  }
  return { message: SAFE_AI_ERRORS.includes(message) ? message : "Chưa tạo được gợi ý lúc này.", retryable: false };
}