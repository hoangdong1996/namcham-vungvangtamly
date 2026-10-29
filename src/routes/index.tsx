import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Brain,
  Compass,
  Ear,
  GraduationCap,
  HeartHandshake,
  LifeBuoy,
  Shield,
  Users,
  type LucideIcon,
} from "lucide-react";
import { LOGO_URL } from "@/lib/logo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Trang chủ | 5 CHẠM – Vững vàng tâm lý" },
      {
        name: "description",
        content:
          "Lắng nghe bản thân – Kết nối yêu thương – Vững vàng mỗi ngày. Mô hình 5 CHẠM về giáo dục sức khỏe tâm lý học đường tại Trường THPT Tây Tiền Hải.",
      },
      { property: "og:title", content: "5 CHẠM – Vững vàng tâm lý" },
      {
        property: "og:description",
        content:
          "Lắng nghe bản thân – Kết nối yêu thương – Vững vàng mỗi ngày. Website giáo dục sức khỏe tâm lý học đường – Trường THPT Tây Tiền Hải.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const CHAMS: {
  number: string;
  label: string;
  title: string;
  description: string;
  icon: LucideIcon;
  to: "/" | "/lang-nghe" | "/hieu-minh" | "/vung-vang" | "/ket-noi" | "/diem-tua";
}[] = [
  {
    number: "01",
    label: "Chạm 1",
    title: "Lắng nghe",
    description:
      "Học cách dừng lại, quan sát và gọi tên cảm xúc của chính mình mỗi ngày.",
    icon: Ear,
    to: "/lang-nghe",
  },
  {
    number: "02",
    label: "Chạm 2",
    title: "Hiểu mình",
    description:
      "Khám phá điểm mạnh, giá trị bản thân và những suy nghĩ ảnh hưởng đến cảm xúc.",
    icon: Brain,
    to: "/hieu-minh",
  },
  {
    number: "03",
    label: "Chạm 3",
    title: "Vững vàng",
    description:
      "Rèn kỹ năng ứng phó với áp lực học tập, thi cử và những thay đổi trong cuộc sống.",
    icon: Shield,
    to: "/vung-vang",
  },
  {
    number: "04",
    label: "Chạm 4",
    title: "Kết nối",
    description:
      "Xây dựng mối quan hệ tích cực với bạn bè, thầy cô và gia đình.",
    icon: HeartHandshake,
    to: "/ket-noi",
  },
  {
    number: "05",
    label: "Chạm 5",
    title: "Tìm điểm tựa",
    description:
      "Biết khi nào cần giúp đỡ và tìm đến ai: thầy cô, chuyên viên tư vấn, gia đình.",
    icon: LifeBuoy,
    to: "/diem-tua",
  },
];

function Index() {
  return (
    <main>
      {/* Hero */}
      <section className="hero-gradient px-4 pb-16 pt-12 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mx-auto max-w-md rounded-3xl bg-card p-4 shadow-xl">
            <img
              src={LOGO_URL}
              alt="Logo 5 CHẠM – Vững vàng tâm lý"
              className="mx-auto w-full rounded-2xl"
            />
          </div>

          <div className="mt-7 inline-flex items-center gap-2 rounded-full bg-mint px-4 py-2 text-sm font-semibold text-green-deep">
            <GraduationCap className="h-4 w-4" />
            Trường THPT Tây Tiền Hải
          </div>

          <h1 className="mt-5 font-display text-5xl font-extrabold leading-tight text-primary sm:text-6xl">
            5 CHẠM
            <span className="mt-1 block text-3xl text-plum sm:text-4xl">
              VỮNG VÀNG TÂM LÝ
            </span>
          </h1>

          <div className="mx-auto mt-6 max-w-xl rounded-2xl border-l-4 border-primary bg-card px-6 py-4 text-left">
            <p className="text-base font-semibold italic text-foreground/90">
              Lắng nghe bản thân – Kết nối yêu thương – Vững vàng mỗi ngày
            </p>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/"
              hash="nam-cham"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-green-deep"
            >
              <Compass className="h-4 w-4" />
              Khám phá 5 CHẠM
            </Link>
            <Link
              to="/clb"
              className="inline-flex items-center gap-2 rounded-full bg-pink-band px-6 py-3 text-sm font-semibold text-plum transition-colors hover:bg-pink-chip"
            >
              <Users className="h-4 w-4" />
              Tham gia CLB
            </Link>
            <Link
              to="/diem-tua"
              className="inline-flex items-center gap-2 rounded-full border border-primary bg-card px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-mint"
            >
              <LifeBuoy className="h-4 w-4" />
              Tìm kiếm sự hỗ trợ
            </Link>
          </div>
        </div>
      </section>

      {/* Mô hình 5 CHẠM */}
      <section className="bg-card py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-display text-3xl font-bold text-primary">
            Mô hình 5 CHẠM tại Trường THPT Tây Tiền Hải
          </h2>
          <p className="mt-5 text-base leading-relaxed text-foreground/80">
            5 CHẠM là bộ giải pháp giáo dục sức khỏe tâm lý học đường, được xây
            dựng và thử nghiệm trong khuôn khổ đề tài nghiên cứu khoa học xã hội
            hành vi nhằm phòng ngừa nguy cơ trầm cảm ở học sinh. Thông qua năm
            “chạm” nhẹ nhàng – lắng nghe, hiểu mình, vững vàng, kết nối và tìm
            điểm tựa – học sinh được trang bị kỹ năng chăm sóc cảm xúc, xây dựng
            mối quan hệ tích cực và biết tìm đến sự hỗ trợ khi cần.
          </p>
          <div className="mt-6 rounded-2xl bg-mint px-6 py-4 text-sm font-semibold text-green-deep">
            Website mang tính giáo dục, không chẩn đoán hay gắn nhãn tâm lý cho
            học sinh.
          </div>
        </div>
      </section>

      {/* Năm chạm yêu thương */}
      <section id="nam-cham" className="bg-pink-soft py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-primary">
              Năm chạm yêu thương
            </h2>
            <p className="mt-3 text-base text-foreground/80">
              Mỗi chạm là một bước nhỏ giúp em vững vàng hơn mỗi ngày.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CHAMS.map((cham) => (
              <article
                key={cham.number}
                className="flex flex-col overflow-hidden rounded-3xl bg-card shadow-sm"
              >
                <div className="flex items-center justify-between bg-pink-band px-5 py-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-card text-primary">
                    <cham.icon className="h-5 w-5" />
                  </span>
                  <span className="font-display text-4xl font-extrabold text-pink-number">
                    {cham.number}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-foreground/60">
                    {cham.label}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-bold text-primary">
                    {cham.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/80">
                    {cham.description}
                  </p>
                  <Link
                    to={cham.to}
                    className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-green-deep"
                  >
                    Tìm hiểu
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
