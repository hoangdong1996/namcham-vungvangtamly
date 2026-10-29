import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Ear, HandHeart, Link2, Map as MapIcon, MessageCircleHeart } from "lucide-react";
import type { ReactNode } from "react";
import { SupportMap } from "@/components/cham-five/support-map";
import { ConnectChallenge } from "@/components/cham-five/connect-challenge";
import { ClubProposal, openClubProposal } from "@/components/cham-five/club-proposal";
import { SupportProcess } from "@/components/cham-five/support-process";
import { STEPS } from "@/components/cham-five/data";

export const Route = createFileRoute("/diem-tua")({
  head: () => ({
    meta: [
      { title: "Chạm 5 – Điểm tựa | 5 CHẠM – Vững vàng tâm lý" },
      { name: "description", content: "Bạn không cần phải tự mình vượt qua tất cả. Bản đồ điểm tựa, cẩm nang “Khi bạn mình không ổn” và mô hình CLB đang được đề xuất tại Trường THPT Tây Tiền Hải." },
      { property: "og:title", content: "Chạm 5 – Điểm tựa | 5 CHẠM" },
      { property: "og:description", content: "Khi cần, bạn có thể tìm đến ai? Khám phá những điểm tựa quanh bạn và học cách đồng hành cùng bạn bè." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DiemTuaPage,
});

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

function Section({ id, title, lead, children }: { id: string; title: string; lead?: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 space-y-5">
      <div className="text-center">
        <h2 className="font-display text-2xl font-bold text-primary sm:text-3xl">{title}</h2>
        {lead && <p className="mx-auto mt-3 max-w-3xl leading-relaxed text-foreground/85">{lead}</p>}
      </div>
      {children}
    </section>
  );
}

function DiemTuaPage() {
  return (
    <main className="cham-two">
      <section className="hero-gradient px-4 pb-14 pt-14 text-center">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-plum">Chạm 5</p>
          <h1 className="mt-3 text-4xl font-extrabold text-primary sm:text-5xl">CHẠM 5 – ĐIỂM TỰA</h1>
          <p className="mt-4 font-display text-xl font-bold text-plum sm:text-2xl">“Bạn không cần phải tự mình vượt qua tất cả.”</p>
          <p className="mt-4 leading-relaxed text-foreground/85">Ai cũng có lúc cảm thấy mệt mỏi, áp lực hoặc không biết phải chia sẻ cùng ai. Tìm kiếm sự hỗ trợ không phải là yếu đuối, mà là một cách chủ động chăm sóc bản thân. Hãy cùng khám phá những điểm tựa quanh bạn và học cách đồng hành với một người đang cần được lắng nghe.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <button onClick={() => scrollTo("ban-do")} className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground shadow-md transition-transform hover:-translate-y-0.5"><MapIcon className="h-5 w-5" />Tìm điểm tựa cho mình</button>
            <button onClick={() => scrollTo("cam-nang")} className="inline-flex items-center gap-2 rounded-full border-2 border-primary bg-card px-6 py-3 font-bold text-primary transition-transform hover:-translate-y-0.5"><HandHeart className="h-5 w-5" />Học cách đồng hành cùng bạn</button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-14">
        <p className="rounded-full border border-dashed border-pink-band bg-card px-5 py-3 text-center text-sm text-muted-foreground">Trang này không chẩn đoán và không thu thập thông tin của em. Mọi lựa chọn chỉ tồn tại trong lúc em đang xem.</p>

        <Section id="ban-do" title="BẢN ĐỒ ĐIỂM TỰA – KHI CẦN, BẠN CÓ THỂ TÌM ĐẾN AI?" lead="Không phải lúc nào chúng ta cũng biết nên bắt đầu chia sẻ từ đâu. Hãy chọn điểm tựa khiến bạn cảm thấy an toàn và dễ mở lời nhất. Bạn có thể tìm đến một người trước, sau đó cùng họ tìm kiếm sự hỗ trợ phù hợp hơn nếu cần.">
          <SupportMap />
          <SupportProcess onGuide={() => scrollTo("cam-nang")} onClub={openClubProposal} />
        </Section>

        <Section id="cam-nang" title="KHI BẠN MÌNH KHÔNG ỔN – MÌNH CÓ THỂ LÀM GÌ?" lead="Đồng hành cùng một người bạn không có nghĩa là phải tự mình giải quyết mọi khó khăn của bạn ấy. Điều quan trọng là biết lắng nghe, tôn trọng, hỗ trợ trong khả năng của mình và kết nối với người lớn khi cần.">
          <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {STEPS.map((s, k) => (
              <li key={s.t} className="rounded-3xl bg-card p-5 shadow-sm transition-transform hover:-translate-y-1">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-chip font-display text-lg font-bold text-plum">{k + 1}</span>
                <h3 className="mt-3 font-display text-lg font-bold text-primary">Bước {k + 1}. {s.t}</h3>
                {s.body.length > 1 ? <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">{s.body.map((b) => <li key={b}>{b}</li>)}</ul> : <p className="mt-2 text-sm leading-relaxed">{s.body[0]}</p>}
                <div className="mt-3 rounded-2xl bg-mint p-3 text-sm"><p className="flex items-center gap-1 font-bold text-primary"><MessageCircleHeart className="h-4 w-4" />Câu gợi ý</p>{s.say.map((x) => <p key={x} className="italic">“{x}”</p>)}</div>
                {s.avoid && <div className="mt-2 rounded-2xl bg-pink-soft p-3 text-sm"><p className="font-bold text-plum">Tránh các câu như</p>{s.avoid.map((x) => <p key={x} className="italic line-through decoration-plum/50">“{x}”</p>)}</div>}
                {s.stress && <p className="mt-2 text-sm font-semibold text-plum">{s.stress}</p>}
              </li>
            ))}
          </ol>
          <div className="text-center"><button onClick={() => scrollTo("ban-do")} className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-6 py-2.5 font-semibold text-primary transition-colors hover:bg-mint"><MapIcon className="h-4 w-4" />Xem lại Bản đồ điểm tựa</button></div>
        </Section>

        <Section id="thu-thach" title="THỬ THÁCH “MỘT BƯỚC KẾT NỐI”" lead="Chọn cách phản hồi mà em thấy phù hợp nhất để thực hành kỹ năng hỗ trợ bạn bè.">
          <ConnectChallenge />
        </Section>

        <Section id="clb" title="MỘT ĐIỂM TỰA ĐANG ĐƯỢC ĐỀ XUẤT">
          <ClubProposal />
        </Section>
      </div>

      <section className="quote-gradient px-4 py-14">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-2xl font-bold text-primary sm:text-3xl">ĐIỂM TỰA ĐÔI KHI BẮT ĐẦU TỪ MỘT LỜI HỎI THĂM</h2>
          <p className="mt-4 leading-relaxed">Bạn không cần phải có mọi câu trả lời để giúp đỡ một người. Đôi khi, điều ý nghĩa nhất là lắng nghe, tôn trọng và cùng nhau tìm đến sự hỗ trợ phù hợp. Khi bạn cần giúp đỡ, hãy nhớ rằng bạn có quyền được lắng nghe và không phải tự mình vượt qua tất cả.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[{ i: Ear, t: "Lắng nghe", d: "Không phán xét cảm xúc của mình và người khác." }, { i: Link2, t: "Kết nối", d: "Chủ động tìm đến người đáng tin cậy khi cần." }, { i: HandHeart, t: "Đồng hành", d: "Quan tâm đến bạn bè nhưng không quên chăm sóc chính mình." }].map((m) => (
              <div key={m.t} className="rounded-3xl bg-card p-5 shadow-sm"><m.i className="mx-auto h-8 w-8 text-primary" /><p className="mt-2 font-display text-lg font-bold text-primary">{m.t}</p><p className="text-sm">{m.d}</p></div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/lang-nghe" className="inline-flex items-center gap-2 rounded-full border border-pink-band bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-pink-soft"><ArrowLeft className="h-4 w-4" />Quay lại Chạm 1 – Lắng nghe</Link>
            <Link to="/" hash="nam-cham" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-green-deep">Trở về hành trình 5 Chạm</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
