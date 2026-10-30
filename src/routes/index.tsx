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
import heroImg from "@/assets/hero-connected.jpg";
import { MoodToday } from "@/components/home/mood-today";
import { FiveTouchMark } from "@/components/home/five-touch-mark";
import { ModelConnections } from "@/components/home/model-connections";
import { KindMessages, MyJourney, SmallStepToday } from "@/components/home/signature";
import { PracticeTools, ClubAndLibrary } from "@/components/home/explore";
import { LastTouch } from "@/components/home/last-touch";
import { AdultHomepageEntry } from "@/components/adult-companion/role-entry";
import cham1 from "@/assets/cham-1.jpg";
import cham2 from "@/assets/cham-2.jpg";
import cham3 from "@/assets/cham-3.jpg";
import cham4 from "@/assets/cham-4.jpg";
import cham5 from "@/assets/cham-5.jpg";

const INTRO = [
  { n: "1", t: "LẮNG NGHE", d: "Dừng lại, gọi tên cảm xúc của chính mình.", icon: Ear, to: "/lang-nghe" as const, dot: "bg-primary text-primary-foreground", border: "border-mint", soft: "bg-mint text-primary", text: "text-primary" },
  { n: "2", t: "THẤU HIỂU", d: "Hiểu áp lực số và những gì ảnh hưởng đến mình.", icon: Brain, to: "/hieu-minh" as const, dot: "bg-pink-band text-plum", border: "border-pink-band", soft: "bg-pink-soft text-plum", text: "text-plum" },
  { n: "3", t: "VỮNG VÀNG", d: "Luyện kỹ năng bình tĩnh và ứng phó với áp lực.", icon: Shield, to: "/vung-vang" as const, dot: "bg-teal text-primary-foreground", border: "border-teal/40", soft: "bg-mint-soft text-teal", text: "text-teal" },
  { n: "4", t: "KẾT NỐI", d: "Xây dựng quan hệ tích cực với bạn bè, gia đình, thầy cô.", icon: HeartHandshake, to: "/ket-noi" as const, dot: "bg-club-blue text-primary-foreground", border: "border-club-blue/40", soft: "bg-club-faint text-club-blue", text: "text-club-blue" },
  { n: "5", t: "ĐIỂM TỰA", d: "Biết tìm đến ai và khi nào cần giúp đỡ.", icon: LifeBuoy, to: "/diem-tua" as const, dot: "bg-green-deep text-primary-foreground", border: "border-primary/40", soft: "bg-mint text-green-deep", text: "text-green-deep" },
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
      <section className="hero-gradient overflow-hidden px-4 py-14 lg:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[minmax(0,52fr)_minmax(0,48fr)] md:gap-8 lg:gap-12">
          <div className="hero-copy min-w-0 text-center md:text-left">
            <div className="hero-brand inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-semibold text-green-deep shadow-sm">
              <GraduationCap className="h-4 w-4" aria-hidden="true" />
              5 CHẠM – VỮNG VÀNG TÂM LÝ · Trường THPT Tây Tiền Hải
            </div>
            <h1 className="mx-auto mt-7 hero-title font-hero font-extrabold uppercase md:mx-0">
              <span className="hero-line text-primary" style={{ lineHeight: 1.2 }}>
                <span className="block whitespace-nowrap">BẠN ĐANG KẾT NỐI</span> <span className="block whitespace-nowrap">VỚI CẢ THẾ GIỚI…</span>
              </span>
              <span className="hero-line hero-line-2 mt-5 text-plum sm:mt-6" style={{ fontSize: "0.86em" }}>
                <span className="block whitespace-nowrap">CÒN <span className="hero-self font-black">CHÍNH MÌNH</span></span> <span className="block whitespace-nowrap">THÌ SAO?</span>
              </span>
            </h1>
            <p className="hero-desc mx-auto mt-7 max-w-[600px] font-hero text-base font-normal leading-[1.75] text-green-deep/85 sm:text-[1.15rem] md:mx-0 lg:text-[1.2rem]">
              5 Chạm là hành trình giúp học sinh hiểu cảm xúc, rèn luyện khả năng ứng phó với áp lực và tìm kiếm những điểm tựa an toàn trên hành trình trưởng thành.
            </p>
            <div className="hero-cta mt-9 flex flex-wrap justify-center gap-3 font-hero md:justify-start">
              <a href="#hanh-trinh" className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-primary px-7 text-[15px] font-bold text-primary-foreground shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-green-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-reduce:hover:translate-y-0 sm:text-base">
                Bắt đầu hành trình 5 Chạm <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link to="/diem-tua" hash="nguon-tro-giup" className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-pink-band px-7 text-[15px] font-bold text-plum transition duration-200 hover:-translate-y-0.5 hover:bg-pink-chip focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum focus-visible:ring-offset-2 motion-reduce:hover:translate-y-0 sm:text-base">
                <HeartHandshake className="h-4 w-4" aria-hidden="true" /> Mình cần một điểm tựa
              </Link>
            </div>
            <Link to="/clb" className="hero-club mt-5 inline-flex items-center gap-2 font-hero text-[15px] font-semibold text-club underline-offset-4 transition-colors hover:text-club-deep hover:underline">
              <Users className="h-4 w-4" aria-hidden="true" /> Tham gia CLB
            </Link>

          </div>
          <div className="hero-img-wrap relative mx-auto w-full min-w-0 max-w-xl">
            <img src={heroImg} alt="Minh họa ba học sinh THPT cùng trò chuyện, được nối với nhau bằng những điểm chạm và trái tim" width={1280} height={1024} className="aspect-[5/4] h-auto w-full rounded-[2rem] object-contain shadow-lg" />
            <div className="absolute bottom-3 left-3 rounded-[1.25rem] bg-card p-2.5 shadow-md">
              <FiveTouchMark className="h-14 w-14 sm:h-16 sm:w-16" />
            </div>
          </div>
        </div>
      </section>

      <section id="hanh-trinh" aria-labelledby="hanh-trinh-title" className="scroll-mt-20 bg-card px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 id="hanh-trinh-title" className="text-center font-display text-3xl font-bold text-primary sm:text-4xl">Hành trình 5 CHẠM</h2>
          <ol className="relative mt-12 grid gap-6 lg:grid-cols-5 lg:gap-4">
            <div aria-hidden="true" className="absolute left-[10%] right-[10%] top-7 hidden h-1 rounded-full bg-gradient-to-r from-primary via-pink-chip to-club-blue lg:block" />
            <div aria-hidden="true" className="absolute bottom-6 left-7 top-6 w-1 rounded-full bg-gradient-to-b from-primary via-pink-chip to-club-blue lg:hidden" />
            {INTRO.map((c) => (
              <li key={c.n} className="relative flex gap-4 lg:flex-col lg:items-center lg:text-center">
                <span className={`relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full font-display text-2xl font-extrabold shadow-md ring-4 ring-card ${c.dot}`}>{c.n}</span>
                <Link to={c.to} className={`group flex flex-1 flex-col rounded-3xl border-2 bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-reduce:transition-none motion-reduce:hover:translate-y-0 lg:mt-4 lg:w-full ${c.border}`}>
                  <span className={`mx-0 grid h-11 w-11 place-items-center rounded-2xl lg:mx-auto ${c.soft}`}><c.icon className="h-5 w-5" aria-hidden="true" /></span>
                  <h3 className="mt-3 font-display text-lg font-bold leading-snug text-foreground">CHẠM {c.n} – {c.t}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-foreground/75">{c.d}</p>
                  <span className={`mt-auto inline-flex items-center gap-1 pt-4 text-sm font-bold lg:justify-center ${c.text}`}>Khám phá <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <MyJourney />
      <SmallStepToday />
      <MoodToday />
      <PracticeTools />

      {/* Mô hình 5 CHẠM */}
      <section id="mo-hinh" aria-labelledby="mo-hinh-title" className="bg-card py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-mint px-4 py-1.5 text-sm font-bold text-green-deep">
              <GraduationCap className="h-4 w-4" aria-hidden="true" />Trường THPT Tây Tiền Hải
            </span>
            <h2 id="mo-hinh-title" className="mt-4 font-display text-3xl font-extrabold text-primary sm:text-4xl">MÔ HÌNH 5 CHẠM</h2>
            <p className="mt-1 font-display text-xl font-bold text-plum">5 CHẠM – VỮNG VÀNG TÂM LÝ</p>
            <p className="mt-2 text-sm font-semibold text-foreground/70 sm:text-base">Vững vàng tâm lý – Chủ động kết nối – Biết tìm kiếm hỗ trợ</p>
          </div>

          <div className="mt-10 grid items-center gap-8 lg:grid-cols-2">
            <div className="space-y-4 text-base leading-relaxed text-foreground/85">
              <p>
                <strong className="text-green-deep">5 CHẠM</strong> là bộ giải pháp <strong className="text-green-deep">giáo dục sức khỏe tâm thần</strong> và hỗ trợ tâm lý học đường, được xây dựng và thử nghiệm trong khuôn khổ đề tài nghiên cứu khoa học xã hội và hành vi nhằm <strong className="text-green-deep">phòng ngừa nguy cơ trầm cảm</strong> ở học sinh Trường THPT Tây Tiền Hải.
              </p>
              <p>
                Thông qua năm thành tố liên kết gồm <strong className="text-green-deep">Lắng nghe – Thấu hiểu – Vững vàng – Kết nối – Điểm tựa</strong>, mô hình hướng tới trang bị cho học sinh kiến thức và kỹ năng chăm sóc bản thân, quản lý cảm xúc, ứng phó với áp lực, xây dựng các mối quan hệ tích cực và chủ động tìm kiếm sự hỗ trợ khi cần thiết.
              </p>
              <div className="rounded-2xl bg-mint px-5 py-3 text-sm font-semibold text-green-deep">
                Website mang tính giáo dục, không chẩn đoán hay gắn nhãn tâm lý cho học sinh.
              </div>
            </div>
            <img src={cham4} alt="Minh họa nhóm học sinh THPT trò chuyện và hỗ trợ nhau" loading="lazy" className="aspect-[4/3] w-full rounded-3xl object-cover shadow-md" />
          </div>

          <ModelConnections />

          <blockquote className="mx-auto mt-14 flex max-w-3xl flex-col items-center justify-center gap-3 rounded-3xl bg-pink-soft px-6 py-7 text-center sm:flex-row sm:gap-4 sm:px-10">
            <HeartHandshake className="h-10 w-10 shrink-0 text-plum" aria-hidden="true" />
            <p className="font-display text-lg font-bold leading-snug text-plum text-balance sm:text-xl">“Mỗi lần chạm là một bước gần hơn đến sự thấu hiểu, kết nối và vững vàng tâm lý.”</p>
          </blockquote>
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
      <KindMessages />
      <ClubAndLibrary />
      <AdultHomepageEntry />
      <LastTouch />
    </main>
  );
}
