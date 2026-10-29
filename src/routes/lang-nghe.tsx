import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  BatteryLow,
  Check,
  CircleHelp,
  CloudDrizzle,
  CloudRain,
  Ear,
  Flame,
  Heart,
  Leaf,
  Map,
  MessageCircleQuestion,
  NotebookPen,
  PieChart,
  Smile,
  Sparkles,
  User,
  Wind,
  type LucideIcon,
} from "lucide-react";
import {
  ChamHero,
  PageBody,
  PrevNext,
  SectionHeading,
} from "@/components/cham";

export const Route = createFileRoute("/lang-nghe")({
  head: () => ({
    meta: [
      { title: "Chạm 1 – Lắng nghe | 5 CHẠM – Vững vàng tâm lý" },
      {
        name: "description",
        content:
          "Dừng lại một chút, lắng nghe điều mình đang cảm nhận. Chạm 1 – Lắng nghe, mô hình 5 CHẠM tại Trường THPT Tây Tiền Hải.",
      },
      { property: "og:title", content: "Chạm 1 – Lắng nghe | 5 CHẠM" },
      {
        property: "og:description",
        content:
          "Dừng lại một chút, lắng nghe điều mình đang cảm nhận – hoạt động nhận diện cảm xúc mỗi ngày.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LangNghePage,
});

const EMOTIONS: { label: string; icon: LucideIcon }[] = [
  { label: "Vui vẻ", icon: Smile },
  { label: "Bình yên", icon: Leaf },
  { label: "Hào hứng", icon: Sparkles },
  { label: "Lo lắng", icon: CloudRain },
  { label: "Buồn bã", icon: CloudDrizzle },
  { label: "Tức giận", icon: Flame },
  { label: "Mệt mỏi", icon: BatteryLow },
  { label: "Bối rối", icon: CircleHelp },
  { label: "Cô đơn", icon: User },
  { label: "Khó gọi tên cảm xúc", icon: MessageCircleQuestion },
];

const PAUSE_STEPS = [
  "Tạm dừng hoạt động đang làm nếu có thể.",
  "Thả lỏng vai và cơ thể.",
  "Hít thở chậm, nhẹ nhàng theo nhịp thoải mái.",
  "Quan sát cảm xúc mà không ép bản thân phải thay đổi ngay.",
  "Tự hỏi: “Điều gì sẽ giúp mình cảm thấy được hỗ trợ hơn lúc này?”",
];

const REMINDERS = [
  "Cảm xúc là một phần tự nhiên của trải nghiệm con người.",
  "Nhận diện cảm xúc giúp chúng ta hiểu nhu cầu và lựa chọn cách ứng phó phù hợp.",
  "Không cần tự trách mình vì đang buồn, lo lắng hoặc mệt mỏi.",
  "Nếu cảm xúc khó chịu kéo dài, ảnh hưởng đáng kể đến sinh hoạt hoặc khiến bản thân cảm thấy không an toàn, hãy tìm sự hỗ trợ từ người lớn đáng tin cậy hoặc người có chuyên môn.",
];

const SUGGESTED_ACTIVITIES: { label: string; icon: LucideIcon }[] = [
  { label: "Bánh xe cảm xúc", icon: PieChart },
  { label: "Nhật ký cảm xúc 3 dòng", icon: NotebookPen },
  { label: "1 phút hít thở chánh niệm", icon: Wind },
];

function LangNghePage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [mapOpened, setMapOpened] = useState(false);
  const [paused, setPaused] = useState(false);

  const toggleEmotion = (label: string) =>
    setSelected((prev) =>
      prev.includes(label) ? prev.filter((e) => e !== label) : [...prev, label],
    );

  return (
    <main>
      <ChamHero
        eyebrow="Chạm 1"
        title="CHẠM 1 – LẮNG NGHE"
        subtitle="Dừng lại một chút, lắng nghe điều mình đang cảm nhận."
        icon={Ear}
      />

      <PageBody>
        <div className="space-y-10">
          {/* Chạm đến điều chưa được nói ra */}
          <section className="space-y-4">
            <SectionHeading>Chạm đến điều chưa được nói ra...</SectionHeading>
            <div className="rounded-3xl bg-card p-6 shadow-sm">
              <p className="leading-relaxed text-foreground/90">
                Cảm xúc nào cũng có lí do để xuất hiện. Có những áp lực không
                xuất hiện trong điểm số, không thể nhìn thấy qua một nụ cười và
                cũng không dễ được chia sẻ thành lời. Điểm chạm đầu tiên tạo cơ
                hội để bạn nói lên những áp lực, nhu cầu và khó khăn của mình
                thông qua khảo sát, phiếu phản hồi hoặc những hình thức chia sẻ
                phù hợp.
              </p>
              <p className="mt-4 font-semibold leading-relaxed text-primary">
                Bạn không cần phải luôn vui vẻ hay mạnh mẽ. Hãy dành một chút
                thời gian nhận biết điều mình đang cảm thấy và điều mình cần lúc
                này!
              </p>
            </div>
          </section>

          {/* Hoạt động 1 */}
          <section className="space-y-4">
            <SectionHeading>Hoạt động 1: Hôm nay mình thế nào?</SectionHeading>
            <div className="rounded-3xl bg-card p-6 shadow-sm">
              <p className="leading-relaxed text-foreground/90">
                Chọn một hoặc nhiều cảm xúc mà bạn đang cảm nhận lúc này. Không
                có cảm xúc nào là đúng hay sai cả.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {EMOTIONS.map((emotion) => {
                  const active = selected.includes(emotion.label);
                  return (
                    <button
                      key={emotion.label}
                      type="button"
                      onClick={() => toggleEmotion(emotion.label)}
                      aria-pressed={active}
                      className={`flex flex-col items-center gap-2 rounded-2xl border p-4 text-sm font-semibold transition-colors ${
                        active
                          ? "border-primary bg-mint text-green-deep ring-2 ring-primary"
                          : "border-pink-band bg-mint-soft text-foreground hover:bg-mint"
                      }`}
                    >
                      <emotion.icon className="h-6 w-6 text-green-deep" />
                      {emotion.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Hoạt động gợi ý */}
          <section className="space-y-4">
            <SectionHeading>Hoạt động gợi ý</SectionHeading>
            <div className="grid gap-4 sm:grid-cols-3">
              {SUGGESTED_ACTIVITIES.map((activity) => (
                <div
                  key={activity.label}
                  className="flex items-center gap-3 rounded-2xl bg-card p-5 shadow-sm"
                >
                  <activity.icon className="h-5 w-5 shrink-0 text-primary" />
                  <p className="text-sm font-semibold leading-snug">
                    {activity.label}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Hoạt động 2 */}
          <section className="space-y-4">
            <SectionHeading>Hoạt động 2: Bản đồ cảm xúc của tôi</SectionHeading>
            <button
              type="button"
              onClick={() => setMapOpened(true)}
              className="flex w-full items-center gap-4 rounded-3xl bg-primary p-6 text-left text-primary-foreground shadow-sm transition-colors hover:bg-green-deep"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-pink-band text-plum">
                <Map className="h-6 w-6" />
              </span>
              <span>
                <span className="block font-display text-lg font-bold">
                  Bản đồ cảm xúc của tôi
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-primary-foreground/90">
                  Nhấn vào đây để bắt đầu vẽ bản đồ cảm xúc của riêng bạn – chỉ
                  mất vài phút!
                </span>
              </span>
            </button>
            {mapOpened && (
              <div className="rounded-2xl bg-mint px-5 py-3 text-sm font-semibold text-green-deep">
                Bản đồ cảm xúc sẽ được cập nhật trong phiên bản tiếp theo.
              </div>
            )}
          </section>

          {/* Hoạt động 3 */}
          <section className="space-y-4">
            <SectionHeading>Hoạt động 3: Dừng lại một phút</SectionHeading>
            <div className="rounded-3xl bg-card p-6 shadow-sm">
              <p className="leading-relaxed text-foreground/90">
                Một bài thực hành rất ngắn để bạn tạm dừng và kết nối lại với
                chính mình. Bạn không cần nhắm mắt hay thực hiện bài thở nếu cảm
                thấy không thoải mái.
              </p>
              <ol className="mt-5 space-y-3">
                {PAUSE_STEPS.map((step, i) => (
                  <li
                    key={step}
                    className="flex items-start gap-3 rounded-2xl bg-mint-soft p-4"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-pink-band text-sm font-bold text-plum">
                      {i + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-foreground/90">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
              <button
                type="button"
                onClick={() => setPaused(true)}
                disabled={paused}
                className={`mt-5 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold shadow-sm transition-colors ${
                  paused
                    ? "bg-mint text-green-deep"
                    : "bg-primary text-primary-foreground hover:bg-green-deep"
                }`}
              >
                {paused && <Check className="h-4 w-4" />}
                Mình đã dừng lại một phút
              </button>
              {paused && (
                <p className="mt-3 text-sm font-semibold text-primary">
                  Em vừa dành một phút để lắng nghe chính mình.
                </p>
              )}
            </div>
          </section>

          {/* Điều cần nhớ */}
          <section className="space-y-4">
            <SectionHeading>Điều cần nhớ</SectionHeading>
            <div className="grid gap-4 sm:grid-cols-2">
              {REMINDERS.map((reminder) => (
                <div
                  key={reminder}
                  className="flex items-start gap-3 rounded-2xl bg-pink-chip p-5 text-plum"
                >
                  <Heart className="mt-0.5 h-5 w-5 shrink-0" />
                  <p className="text-sm font-medium leading-relaxed">
                    {reminder}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Lời nhắn cuối */}
          <section className="space-y-4">
            <SectionHeading>Lời nhắn cuối Chạm 1</SectionHeading>
            <div className="quote-gradient rounded-3xl px-6 py-8 text-center">
              <p className="mx-auto max-w-2xl text-lg font-semibold italic text-primary">
                “Lắng nghe bản thân không phải là giải quyết mọi vấn đề ngay
                lập tức, mà là bước đầu nhận ra mình đang cần gì.”
              </p>
            </div>
          </section>

          <PrevNext
            prev={{ label: "Quay lại trang chủ", to: "/" }}
            next={{
              label: "Tiếp tục Chạm 2 – Thấu hiểu",
              to: "/hieu-minh",
            }}
          />
        </div>
      </PageBody>
    </main>
  );
}
