import { createFileRoute } from "@tanstack/react-router";
import { ChamHero, PageBody, SectionHeading, StubNote } from "@/components/cham";

export const Route = createFileRoute("/clb")({
  head: () => ({
    meta: [
      { title: "CLB Đồng hành 5 Chạm | 5 CHẠM – Vững vàng tâm lý" },
      {
        name: "description",
        content:
          "Nơi các bạn học sinh cùng nhau học cách chăm sóc tâm lý và lan tỏa sự tử tế. CLB Đồng hành 5 Chạm – Trường THPT Tây Tiền Hải.",
      },
      { property: "og:title", content: "CLB Đồng hành 5 Chạm | 5 CHẠM" },
      {
        property: "og:description",
        content:
          "Nơi các bạn học sinh cùng nhau học cách chăm sóc tâm lý và lan tỏa sự tử tế.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ClbPage,
});

const CLUB_ACTIVITIES = [
  {
    title: "Sinh hoạt định kỳ",
    description: "Chủ đề kỹ năng sống, cảm xúc và kết nối mỗi tháng.",
  },
  {
    title: "Bạn đồng hành",
    description:
      "Học sinh được tập huấn lắng nghe và giới thiệu bạn đến thầy cô khi cần.",
  },
  {
    title: "Lan tỏa yêu thương",
    description: "Góc lời khen, thử thách tử tế, ngày hội sức khỏe tinh thần.",
  },
];

function ClbPage() {
  return (
    <main>
      <ChamHero
        eyebrow="Câu lạc bộ"
        title="CLB Đồng hành 5 Chạm"
        subtitle="Nơi các bạn học sinh cùng nhau học cách chăm sóc tâm lý và lan tỏa sự tử tế."
      />

      <PageBody>
        <div className="space-y-10">
          <section className="space-y-4">
            <SectionHeading>Hoạt động của CLB</SectionHeading>
            <div className="grid gap-4 sm:grid-cols-3">
              {CLUB_ACTIVITIES.map((activity) => (
                <div
                  key={activity.title}
                  className="rounded-2xl bg-card p-5 shadow-sm"
                >
                  <h3 className="font-display text-lg font-bold text-primary">
                    {activity.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                    {activity.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <SectionHeading>Cách tham gia</SectionHeading>
            <div className="rounded-2xl bg-mint px-6 py-5 text-sm leading-relaxed text-green-deep">
              Liên hệ giáo viên phụ trách CLB hoặc Ban chấp hành Đoàn trường để
              đăng ký. Biểu mẫu đăng ký trực tuyến sẽ được bổ sung sau.
            </div>
          </section>

          <StubNote />
        </div>
      </PageBody>
    </main>
  );
}
