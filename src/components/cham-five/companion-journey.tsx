import { useState } from "react";
import stepImg1 from "@/assets/step-1-notice.jpg";
import stepImg2 from "@/assets/step-2-listen.jpg";
import stepImg3 from "@/assets/step-3-walk.jpg";
import stepImg4 from "@/assets/step-4-connect.jpg";
import stepImg5 from "@/assets/step-5-selfcare.jpg";
const STEP_IMGS = [stepImg1, stepImg2, stepImg3, stepImg4, stepImg5];
import { ArrowDown, ArrowRight, Check, ChevronDown, Ear, Heart, HeartHandshake, Leaf, Link2, MessageCircleHeart, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import illustration from "@/assets/friend-companion.jpg";
import { openClubProposal } from "./club-proposal";
import { openSupporter } from "./support-map";
import { COMPANION_STEPS, CONTACTS, GREETINGS, PHRASES, PRACTICE_OPTIONS, PRINCIPLES } from "./companion-data";

const ICONS = [Heart, Ear, HeartHandshake, Users, Leaf];
const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
const actionClass = "h-auto min-h-11 whitespace-normal rounded-full px-5 py-3 text-sm font-bold";

function Practice() {
  const [answer, setAnswer] = useState<string | null>(null);
  const [values, setValues] = useState<string[]>([]);
  const result = PRACTICE_OPTIONS.find((option) => option.key === answer);
  return (
    <section className="border-y border-pink-band bg-pink-soft px-5 py-10 sm:px-8" aria-labelledby="companion-practice-title">
      <p className="text-center text-sm font-bold text-plum">EM SẼ CHỌN CÁCH NÀO?</p>
      <h3 id="companion-practice-title" className="mx-auto mt-2 max-w-3xl text-center font-display text-2xl font-bold text-green-deep">THỬ THÁCH NHỎ – LỰA CHỌN CỦA EM CÓ THỂ TẠO NÊN KHÁC BIỆT</h3>
      <p className="mx-auto mt-5 max-w-3xl text-center leading-relaxed">“Gần đây, một người bạn thường ngồi một mình, ít trò chuyện và nói rằng mình đang rất mệt mỏi. Em muốn giúp nhưng chưa biết nên bắt đầu như thế nào.”</p>
      <div className="mx-auto mt-6 grid max-w-4xl gap-3 md:grid-cols-3">
        {PRACTICE_OPTIONS.map((option) => <Button key={option.key} variant="outline" aria-pressed={answer === option.key} onClick={() => setAnswer(option.key)} className={`h-auto min-h-32 items-start justify-start whitespace-normal rounded-2xl p-5 text-left leading-relaxed ${answer === option.key ? "border-primary bg-mint" : "bg-card"}`}><span className="font-display text-xl font-bold text-plum">{option.key}.</span><span>“{option.text}”</span></Button>)}
      </div>
      {result && <div role="status" className="mx-auto mt-4 max-w-4xl border-l-4 border-primary bg-card p-5 leading-relaxed">{result.feedback}</div>}
      {result && <fieldset className="mx-auto mt-7 min-w-0 max-w-4xl"><legend className="font-display text-xl font-bold text-green-deep">Điều quan trọng nhất khi đồng hành cùng bạn là gì?</legend><div className="mt-4 flex flex-wrap gap-3">{PRINCIPLES.map((value) => <Button key={value} variant="outline" aria-pressed={values.includes(value)} onClick={() => setValues((current) => current.includes(value) ? current.filter((v) => v !== value) : [...current, value])} className={`${actionClass} ${values.includes(value) ? "border-primary bg-mint text-green-deep" : "bg-card"}`}>{values.includes(value) && <Check />}{value}</Button>)}</div>{values.length > 0 && <p role="status" className="mt-5 font-semibold text-green-deep">Mỗi lựa chọn của em đều góp phần tạo nên sự đồng hành an toàn: lắng nghe chân thành, tôn trọng cảm xúc, không ép buộc và biết kết nối hỗ trợ.</p>}</fieldset>}
    </section>
  );
}

export function CompanionJourney() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [greetingIndex, setGreetingIndex] = useState(-1);
  const [phrase, setPhrase] = useState<string | null>(null);
  const explanation = PHRASES.find((item) => item.text === phrase);
  return (
    <section id="cam-nang" className="companion-area scroll-mt-24 space-y-10" aria-labelledby="companion-title">
      <div className="text-center">
        <p className="font-bold text-plum">MỘT NGƯỜI BẠN ĐANG CẦN BẠN</p>
        <h2 id="companion-title" className="mt-3 font-display text-3xl font-extrabold leading-tight text-green-deep sm:text-4xl">KHI BẠN MÌNH KHÔNG ỔN…<br /><span className="text-plum">MÌNH CÓ THỂ LÀM GÌ?</span></h2>
        <img src={illustration} alt="Hai nữ sinh trò chuyện và lắng nghe nhau trong sân trường an toàn." width={1536} height={1024} loading="lazy" className="mx-auto mt-6 aspect-[3/2] w-full max-w-xl rounded-3xl object-contain" />
        <p className="mx-auto mt-6 max-w-2xl leading-relaxed">“Bạn không cần phải có mọi câu trả lời. Đôi khi, điều quý giá nhất là lắng nghe, ở bên và cùng bạn tìm kiếm sự giúp đỡ.”</p>
        <Button className={`${actionClass} mt-6`} onClick={() => scrollTo("nam-buoc-dong-hanh")}>BẮT ĐẦU HÀNH TRÌNH ĐỒNG HÀNH<ArrowDown /></Button>
        <p className="mt-5 font-display text-lg font-semibold text-plum">“Lắng nghe bằng sự chân thành. Đồng hành bằng sự tôn trọng.”</p>
      </div>

      <div id="nam-buoc-dong-hanh" className="scroll-mt-24">
        <h3 className="mb-6 text-center font-display text-2xl font-bold text-green-deep">5 BƯỚC ĐỒNG HÀNH</h3>
        <ol className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {COMPANION_STEPS.map((step, index) => {
            const Icon = ICONS[index] ?? Heart;
            const open = expanded === index;
            return <li key={step.title} className={`min-w-0 rounded-3xl border p-5 shadow-sm ${open ? "border-primary bg-mint" : "border-pink-band bg-card"}`}>
              {STEP_IMGS[index] && <img src={STEP_IMGS[index]} alt={`Minh họa bước ${index + 1}: ${step.title}`} width={944} height={704} loading="lazy" className="mb-3 aspect-[4/3] w-full rounded-2xl object-cover" />}<div className="flex items-center justify-between"><span className="font-display text-4xl font-extrabold text-pink-number">0{index + 1}</span><Icon aria-hidden className="h-8 w-8 text-primary" /></div>
              <h4 className="mt-4 font-display text-lg font-bold leading-snug text-green-deep lg:min-h-20">{step.title}</h4>
              <p className="mt-2 text-sm leading-relaxed lg:min-h-32">“{step.message}”</p>
              <Button variant="ghost" aria-expanded={open} aria-controls="companion-expanded-content" onClick={() => {
                setExpanded(open ? null : index);
                if (!open && window.matchMedia?.("(max-width: 1023px)").matches) {
                  setTimeout(() => scrollTo("companion-expanded-content"), 50);
                }
              }} className="mt-4 h-auto min-h-11 w-full justify-between whitespace-normal px-0 text-left text-sm font-bold text-green-deep">Khám phá cách thực hiện<ChevronDown className={`transition-transform motion-reduce:transition-none ${open ? "rotate-180" : ""}`} /></Button>
            </li>;
          })}
        </ol>

        {expanded !== null && COMPANION_STEPS[expanded] && (() => {
          const step = COMPANION_STEPS[expanded];
          return <div id="companion-expanded-content" role="region" aria-label={`Hướng dẫn bước ${expanded + 1}`} className="companion-reveal mt-6 scroll-mt-24 border-l-4 border-primary bg-mint-soft p-5 sm:p-8">
            <h4 className="font-display text-xl font-bold text-green-deep">BƯỚC {expanded + 1} – {step.title}</h4>
            {step.details.length > 0 && <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed">{step.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>}
            {step.quote && <blockquote className="mt-5 border-l-2 border-pink-band pl-4"><p className="text-sm font-bold text-plum">{expanded === 4 ? "Hộp thông điệp" : "Em có thể nói:"}</p><p className="mt-1 italic leading-relaxed">“{step.quote}”</p></blockquote>}
            {expanded === 0 && <><Button variant="outline" className={`${actionClass} mt-5 bg-card`} onClick={() => setGreetingIndex((i) => (i + 1) % GREETINGS.length)}><MessageCircleHeart />Thử một lời hỏi thăm</Button>{greetingIndex >= 0 && <p role="status" className="mt-4 font-semibold text-green-deep">“{GREETINGS[greetingIndex]}”</p>}</>}
            {expanded === 1 && <><div className="mt-6 grid gap-6 sm:grid-cols-2">{[true, false].map((helpful) => <div key={String(helpful)}><h5 className={`font-bold ${helpful ? "text-green-deep" : "text-plum"}`}>{helpful ? "NÊN NÓI" : "NÊN TRÁNH"}</h5><div className="mt-3 space-y-2">{PHRASES.filter((item) => item.helpful === helpful).map((item) => <Button key={item.text} variant="outline" aria-pressed={phrase === item.text} onClick={() => setPhrase(item.text)} className={`h-auto min-h-12 w-full justify-start whitespace-normal rounded-xl px-4 py-3 text-left ${phrase === item.text ? "border-primary bg-mint" : helpful ? "bg-card" : "bg-pink-soft"}`}>“{item.text}”</Button>)}</div></div>)}</div>{explanation && <p role="status" className="mt-5 border-l-4 border-primary bg-card p-4 leading-relaxed">{explanation.explanation}</p>}</>}
            {step.reminder && <p className="mt-5 font-display text-xl font-semibold text-plum">“{step.reminder}”</p>}
            {expanded === 3 && <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{CONTACTS.map((contact) => <div key={contact.id} className="flex min-w-0 flex-col rounded-2xl border border-pink-band bg-card p-4"><h5 className="font-bold text-green-deep">{contact.name}</h5><p className="mb-4 mt-2 text-sm leading-relaxed">{contact.desc}</p><Button variant="link" onClick={() => openSupporter(contact.id)} className="mt-auto h-auto min-h-11 justify-start whitespace-normal px-0 text-left font-bold text-green-deep">Tìm hiểu cách liên hệ<ArrowRight /></Button></div>)}</div>}
            <Button variant="ghost" onClick={() => setExpanded(null)} className="mt-6 font-bold text-green-deep">Thu gọn<ChevronDown className="rotate-180" /></Button>
          </div>;
        })()}
      </div>

      <aside className="flex gap-4 rounded-2xl border-2 border-plum/30 bg-pink-soft p-5 sm:p-6" aria-labelledby="companion-safety-title">
        <ShieldCheck className="h-8 w-8 shrink-0 text-plum" aria-hidden />
        <div><h3 id="companion-safety-title" className="font-display text-xl font-bold text-plum">KHI CÓ NGUY CƠ MẤT AN TOÀN</h3><p className="mt-2 leading-relaxed">Nếu bạn nói muốn tự làm hại bản thân, có nguy cơ bị bạo lực hoặc đang gặp nguy hiểm, đừng giữ bí mật một mình. Hãy báo ngay cho người lớn đáng tin cậy ở gần hoặc dịch vụ khẩn cấp phù hợp. Không để bạn ở một mình trong tình huống nguy hiểm nếu có thể hỗ trợ an toàn.</p></div>
      </aside>

      <Practice />

      <section className="bg-mint px-5 py-8 text-center sm:px-8" aria-labelledby="companion-reminders-title">
        <h3 id="companion-reminders-title" className="font-display text-2xl font-bold text-green-deep">3 ĐIỀU HÃY NHỚ</h3>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">{[{ icon: Ear, title: "LẮNG NGHE", text: "Đừng vội phán xét cảm xúc của bạn." }, { icon: Link2, title: "KẾT NỐI", text: "Hãy tìm người có trách nhiệm khi cần hỗ trợ." }, { icon: ShieldCheck, title: "BẢO VỆ AN TOÀN", text: "Không tự xử lý một mình khi có nguy cơ nghiêm trọng." }].map((item) => <div key={item.title}><item.icon className="mx-auto h-8 w-8 text-primary" /><h4 className="mt-3 font-display text-lg font-bold text-green-deep">{item.title}</h4><p className="mt-2 text-sm">{item.text}</p></div>)}</div>
        <p className="mx-auto mt-7 max-w-3xl font-semibold leading-relaxed text-plum">“Bạn không cần trở thành chuyên gia để giúp đỡ một người. Hãy bắt đầu bằng sự quan tâm chân thành và biết khi nào cần tìm thêm sự hỗ trợ.”</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3"><Button variant="outline" className={`${actionClass} bg-card text-green-deep`} onClick={() => scrollTo("ban-do")}>QUAY LẠI BẢN ĐỒ ĐIỂM TỰA<ArrowRight /></Button><Button className={`${actionClass} whitespace-nowrap`} onClick={openClubProposal}>KHÁM PHÁ CLB 5 ĐỒNG HÀNH<ArrowRight /></Button></div>
      </section>
    </section>
  );
}