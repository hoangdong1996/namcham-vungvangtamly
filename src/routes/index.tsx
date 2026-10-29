import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Brain,
  Ear,
  GraduationCap,
  HeartHandshake,
  LifeBuoy,
  Shield,
  Users,
  type LucideIcon,
} from "lucide-react";
import heroImg from "@/assets/hero-students.jpg";
import cham1 from "@/assets/cham-1.jpg";
import cham2 from "@/assets/cham-2.jpg";
import cham3 from "@/assets/cham-3.jpg";
import cham4 from "@/assets/cham-4.jpg";
import cham5 from "@/assets/cham-5.jpg";

const INTRO = [
  { n: "1", t: "NHẬN DIỆN", d: "Nhận biết cảm xúc và dấu hiệu căng thẳng.", icon: Ear, to: "/lang-nghe" as const, bg: "bg-mint" },
  { n: "2", t: "THẤU HIỂU", d: "Hiểu bản thân, nhận diện áp lực và nhu cầu cá nhân.", icon: Brain, to: "/hieu-minh" as const, bg: "bg-pink-soft" },
  { n: "3", t: "RÈN LUYỆN", d: "Thực hành quản lý cảm xúc và chăm sóc bản thân.", icon: Shield, to: "/vung-vang" as const, bg: "bg-mint" },
  { n: "4", t: "KẾT NỐI", d: "Chia sẻ với bạn bè, gia đình và người đáng tin cậy.", icon: HeartHandshake, to: "/ket-noi" as const, bg: "bg-pink-soft" },
  { n: "5", t: "TÌM HỖ TRỢ", d: "Biết tìm kiếm sự giúp đỡ khi cần thiết.", icon: LifeBuoy, to: "/diem-tua" as const, bg: "bg-mint" },
];

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
  img: string;
  to: "/" | "/lang-nghe" | "/hieu-minh" | "/vung-vang" | "/ket-noi" | "/diem-tua";
}[] = [
  {
    number: "01",
    label: "Chạm 1",
    title: "Lắng nghe",
    img: cham1,
    description:
      "Học cách dừng lại, quan sát và gọi tên cảm xúc của chính mình mỗi ngày.",
    icon: Ear,
    to: "/lang-nghe",
  },
  {
    number: "02",
    label: "Chạm 2",
    title: "Thấu hiểu",
    img: cham2,
    description:
      "Khám phá điểm mạnh, giá trị bản thân và những suy nghĩ ảnh hưởng đến cảm xúc.",
    icon: Brain,
    to: "/hieu-minh",
  },
  {
    number: "03",
    label: "Chạm 3",
    title: "Vững vàng",
    img: cham3,
    description:
      "Rèn kỹ năng ứng phó với áp lực thời đại số và những thay đổi trong cuộc sống.",
    icon: Shield,
    to: "/vung-vang",
  },
  {
    number: "04",
    label: "Chạm 4",
    title: "Kết nối",
    img: cham4,
    description:
      "Xây dựng mối quan hệ tích cực với bạn bè, thầy cô và gia đình.",
    icon: HeartHandshake,
    to: "/ket-noi",
  },
  {
    number: "05",
    label: "Chạm 5",
    title: "Điểm tựa",
    img: cham5,
    description:
      "Biết khi nào cần giúp đỡ và tìm đến ai: thầy cô, chuyên viên tư vấn, gia đình và các nguồn hỗ trợ phù hợp.",
    icon: LifeBuoy,
    to: "/diem-tua",
  },
];

function Index() {
  return (
    <main>
      <section className="hero-gradient px-4 py-12 lg:py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <div className="min-w-0 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-mint px-4 py-2 text-sm font-semibold text-green-deep">
              <GraduationCap className="h-4 w-4" />
              Trường THPT Tây Tiền Hải
            </div>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight text-primary sm:text-5xl">
              5 CHẠM –
              <span className="block text-plum">VỮNG VÀNG TÂM LÝ</span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-foreground/85 sm:text-lg">
              Hành trình giúp học sinh nhận diện cảm xúc, chăm sóc bản thân, kết nối với mọi người
              và chủ động tìm kiếm sự hỗ trợ khi cần.
            </p>
            <p className="mt-3 text-base font-semibold italic text-green-deep">
              Lắng nghe bản thân – Kết nối yêu thương – Vững vàng mỗi ngày
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Link
                to="/lang-nghe"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold tracking-wide text-primary-foreground shadow-md transition-colors hover:bg-green-deep"
              >
                BẮT ĐẦU HÀNH TRÌNH
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/clb"
                className="inline-flex items-center gap-2 rounded-full bg-pink-band px-6 py-3.5 text-sm font-semibold text-plum transition-colors hover:bg-pink-chip"
              >
                <Users className="h-4 w-4" />
                Tham gia CLB
              </Link>
            </div>
          </div>
          <div className="min-w-0">
            <img
              src={heroImg}
              alt="Nhóm học sinh THPT trò chuyện, lắng nghe và kết nối với nhau"
              width={1280}
              height={1024}
              className="aspect-[5/4] w-full rounded-[2rem] border-4 border-card object-cover shadow-xl"
            />
          </div>
        </div>
      </section>

      <section className="bg-card px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-display text-3xl font-bold text-primary">Hành trình 5 CHẠM</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {INTRO.map((c) => (
              <Link
                key={c.n}
                to={c.to}
                className={`group flex flex-col rounded-3xl border border-border p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg ${c.bg}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-4xl font-extrabold text-primary">{c.n}</span>
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-card text-primary shadow-sm">
                    <c.icon className="h-5 w-5" />
                  </span>
                </div>
                <h3 className="mt-3 font-display text-lg font-bold leading-snug text-plum">CHẠM {c.n} – {c.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">{c.d}</p>
                <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-primary">
                  Khám phá <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
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
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-extrabold uppercase tracking-wide text-primary sm:text-4xl">
              HÀNH TRÌNH 5 CHẠM
            </h2>
            <p className="mt-4 text-base font-medium text-foreground/80 sm:text-lg">
              Mỗi bước thấu hiểu bản thân là một bước tiến tới sức khỏe tâm lý vững vàng.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-6">
            {CHAMS.map((cham) => (
              <article
                key={cham.number}
                className="flex w-full flex-col overflow-hidden rounded-3xl bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
              >
                <div className="relative bg-pink-band">
                  <img
                    src={cham.img}
                    alt={`Minh họa ${cham.label} – ${cham.title}`}
                    width={1024}
                    height={768}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-contain"
                  />
                  <span className="absolute right-3 top-3 rounded-2xl bg-card/90 px-3 py-1 font-display text-2xl font-extrabold text-primary shadow-sm">
                    {cham.number}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-xl font-extrabold uppercase text-primary">
                    {cham.label} – {cham.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/80">
                    {cham.description}
                  </p>
                  <Link
                    to={cham.to}
                    className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-green-deep"
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
