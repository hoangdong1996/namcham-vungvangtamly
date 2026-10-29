import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Opt = { text: string; fit: boolean; fb: string };
type Scene = { title: string; story: string; options: Opt[] };
export type Stage = { name: string; motto: string; focus: string; scenes: Scene[]; practice: string; reflect: string; bridge?: string };

export const STAGES: Stage[] = [
  {
    name: "Kết nối bạn bè",
    motto: "Lắng nghe để hiểu nhau – Chân thành để gần nhau hơn.",
    focus: "Hiểu lầm, cảm giác bị bỏ lại, lời đùa gây tổn thương, bất đồng và những điều chưa dám nói.",
    scenes: [
      { title: "Cảm giác bị bỏ lại", story: "Nhóm bạn thân rủ nhau đi chơi cuối tuần nhưng không ai nhắn cho bạn. Bạn thấy ảnh cả nhóm đăng lên mạng.",
        options: [
          { text: "Đăng một dòng trạng thái bóng gió cho cả nhóm đọc.", fit: false, fb: "Lời bóng gió dễ khiến hiểu lầm lớn dần và người khác thấy bị trách móc." },
          { text: "Im lặng và tự rút ra khỏi nhóm.", fit: false, fb: "Im lặng giúp tránh va chạm lúc đầu, nhưng cảm giác tổn thương vẫn còn và khoảng cách sẽ xa hơn." },
          { text: "Nhắn riêng một bạn: “Mình hơi buồn vì không được rủ, có chuyện gì không?”", fit: true, fb: "Bạn nói thật cảm xúc của mình mà không buộc tội ai, nhờ vậy cả hai có cơ hội hiểu nhau." },
        ] },
      { title: "Lời đùa gây tổn thương", story: "Một bạn hay đùa về ngoại hình của bạn trước cả lớp. Mọi người cười, còn bạn thấy khó chịu.",
        options: [
          { text: "Đùa lại thật nặng để “trả đũa”.", fit: false, fb: "Đáp trả bằng lời làm tổn thương dễ biến trò đùa thành mâu thuẫn." },
          { text: "Gặp riêng bạn ấy: “Khi bạn đùa về ngoại hình, mình thấy không thoải mái. Mong bạn đừng đùa vậy nữa.”", fit: true, fb: "Câu nói rõ ràng, bình tĩnh, nói về cảm xúc của mình – giúp bạn kia hiểu ranh giới mà không bị bẽ mặt." },
          { text: "Cười theo cho qua dù trong lòng không vui.", fit: false, fb: "Cười cho qua khiến bạn kia nghĩ trò đùa không sao, và bạn tiếp tục chịu đựng." },
        ] },
    ],
    practice: "Thử viết một câu nói lên cảm xúc mà không trách móc. Gợi ý: “Mình cảm thấy… khi… Mình mong…”",
    reflect: "Có điều gì bạn từng muốn nói với một người bạn nhưng chưa nói?",
    bridge: "Đôi khi, chúng ta dễ chia sẻ với bạn bè nhưng lại khó nói ra điều mình thực sự cảm thấy với những người thân yêu nhất.",
  },
  {
    name: "Kết nối gia đình",
    motto: "Thử nói điều khó nói – Học cách lắng nghe nhau.",
    focus: "Khác biệt giữa cha mẹ và con cái, áp lực học tập, kỳ vọng, nhu cầu được lắng nghe và mong muốn có không gian riêng.",
    scenes: [
      { title: "Áp lực điểm số", story: "Bạn vừa nhận điểm kiểm tra thấp hơn mong đợi. Về nhà, bố mẹ hỏi điểm và bắt đầu so sánh với anh chị.",
        options: [
          { text: "Cãi lại: “Bố mẹ chỉ biết điểm số thôi!”", fit: false, fb: "Lời nói lúc nóng giận khiến cả hai bên đều thấy bị tổn thương và khó nghe nhau." },
          { text: "Chờ lúc bình tĩnh rồi nói: “Con cũng buồn vì điểm này. Con mong bố mẹ nghe con kể con đã cố gắng thế nào.”", fit: true, fb: "Bạn chọn thời điểm phù hợp, nói rõ cảm xúc và mong muốn – mở ra cơ hội để bố mẹ hiểu bạn hơn." },
          { text: "Giấu điểm những lần sau.", fit: false, fb: "Giấu điểm tránh được áp lực trước mắt nhưng làm mất dần sự tin tưởng giữa hai bên." },
        ] },
      { title: "Không gian riêng", story: "Bạn muốn có thời gian riêng trong phòng, nhưng mẹ thường vào hỏi han và xem bạn đang làm gì.",
        options: [
          { text: "Khóa cửa và không trả lời.", fit: false, fb: "Mẹ có thể càng lo lắng hơn khi không hiểu chuyện gì đang xảy ra." },
          { text: "Nói: “Con cần một chút thời gian yên tĩnh. Con sẽ ra nói chuyện với mẹ sau bữa tối nhé.”", fit: true, fb: "Bạn trình bày nhu cầu rõ ràng và vẫn cho mẹ thấy sự quan tâm – cả hai bên đều được tôn trọng." },
          { text: "Thử hỏi mẹ đang lo điều gì để hiểu thêm.", fit: true, fb: "Lắng nghe góc nhìn của người thân giúp bạn hiểu lý do phía sau, từ đó dễ cùng tìm cách phù hợp." },
        ] },
    ],
    practice: "Viết thử một câu bạn muốn nói với người thân, bằng ngôn ngữ tôn trọng.",
    reflect: "Mỗi gia đình đều khác nhau. Một cuộc trò chuyện có thể chưa giải quyết được mọi điều – nhưng bạn muốn bắt đầu từ điều gì nhỏ nhất?",
    bridge: "Không chỉ trong tình bạn hay gia đình, đôi khi một lời chưa kịp nói với thầy cô cũng có thể tạo nên khoảng cách trong quá trình học tập và trưởng thành.",
  },
  {
    name: "Kết nối thầy cô",
    motto: "Mạnh dạn bày tỏ – Tôn trọng để thấu hiểu.",
    focus: "Ngại hỏi khi chưa hiểu bài, khó trình bày khi bị nhắc nhở, chưa biết cách trao đổi khi gặp khó khăn và cảm giác chưa được lắng nghe.",
    scenes: [
      { title: "Ngại hỏi bài", story: "Bạn chưa hiểu phần bài mới, nhưng sợ hỏi sẽ bị các bạn nghĩ mình kém.",
        options: [
          { text: "Im lặng và tự đoán cách làm.", fit: false, fb: "Chỗ chưa hiểu có thể tích tụ dần, khiến bài sau còn khó hơn." },
          { text: "Cuối giờ gặp thầy cô: “Em chưa hiểu phần này, thầy/cô có thể giải thích thêm giúp em không ạ?”", fit: true, fb: "Câu hỏi lịch sự, cụ thể giúp thầy cô biết cách hỗ trợ bạn. Hỏi là một cách học chủ động." },
          { text: "Nói với bạn bè rằng thầy cô dạy khó hiểu.", fit: false, fb: "Than phiền sau lưng không giúp bạn hiểu bài và dễ tạo khoảng cách với thầy cô." },
        ] },
      { title: "Bị nhắc nhở", story: "Bạn bị nhắc nhở vì nộp bài muộn, trong khi hôm đó bạn có lý do chính đáng.",
        options: [
          { text: "Phản ứng ngay trước lớp rằng mình không sai.", fit: false, fb: "Phản ứng gay gắt trước lớp khiến cả hai bên khó lắng nghe nhau." },
          { text: "Tiếp nhận lời nhắc, sau đó xin gặp riêng để trình bày lý do một cách bình tĩnh.", fit: true, fb: "Bạn vừa tôn trọng thầy cô, vừa có cơ hội được lắng nghe. Sự thấu hiểu cần đến từ cả hai phía." },
          { text: "Giữ trong lòng và nghĩ rằng thầy cô không công bằng.", fit: false, fb: "Khi không trao đổi, cả bạn và thầy cô đều thiếu thông tin để hiểu nhau." },
        ] },
    ],
    practice: "Viết thử một câu bạn muốn hỏi hoặc trao đổi với thầy cô.",
    reflect: "Điều gì giúp bạn tự tin hơn khi trao đổi với thầy cô?",
  },
];

const ENDING = [
  "Với bạn bè, hãy chân thành thay vì để hiểu lầm lớn dần.",
  "Với gia đình, hãy thử nói ra điều mình cần và lắng nghe điều người thân muốn chia sẻ.",
  "Với thầy cô, hãy mạnh dạn hỏi, bày tỏ và trao đổi bằng sự tôn trọng.",
  "Và với tất cả những người quanh mình, hãy nhớ rằng mỗi người đều có một câu chuyện mà chúng ta chưa hiểu hết.",
];

const PATH = ["Khoảng cách vô hình", "Bạn bè", "Gia đình", "Thầy cô", "Kết nối"];

function ProgressPath({ step }: { step: number }) {
  return (
    <ol aria-label="Tiến trình hành trình" className="flex items-start justify-between gap-1">
      {PATH.map((p, i) => (
        <li key={p} className="flex flex-1 flex-col items-center text-center" aria-current={i === step ? "step" : undefined}>
          <div className="flex w-full items-center">
            <span className={`h-1 flex-1 rounded ${i === 0 ? "invisible" : i <= step ? "bg-primary" : "bg-pink-band"}`} />
            <span className={`flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all duration-500 ${i < step ? "bg-primary text-primary-foreground" : i === step ? "bg-primary text-primary-foreground ring-4 ring-pink-band scale-110" : "bg-card text-muted-foreground border border-pink-band"}`}>{i + 1}</span>
            <span className={`h-1 flex-1 rounded ${i === PATH.length - 1 ? "invisible" : i < step ? "bg-primary" : "bg-pink-band"}`} />
          </div>
          <span className={`mt-2 text-[11px] font-semibold leading-tight sm:text-xs ${i === step ? "text-primary" : "text-muted-foreground"}`}>{p}</span>
        </li>
      ))}
    </ol>
  );
}

/** Two circles that drift closer and overlap as the journey progresses. */
function Circles({ step }: { step: number }) {
  const gap = [64, 44, 26, 10, -18][step] ?? 0;
  return (
    <div aria-hidden className="flex h-24 items-center justify-center">
      <span className="size-20 rounded-full bg-pink-band/80 transition-all duration-700" style={{ marginRight: gap / 2 }} />
      <span className="size-20 rounded-full bg-primary/40 transition-all duration-700" style={{ marginLeft: gap / 2 }} />
    </div>
  );
}

function StageView({ stage, index, onNext }: { stage: Stage; index: number; onNext: () => void }) {
  const [picks, setPicks] = useState<(number | null)[]>(stage.scenes.map(() => null));
  const [practice, setPractice] = useState("");
  const [reflect, setReflect] = useState("");
  const done = picks.every((p) => p !== null);
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 space-y-6 duration-500">
      <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-plum">Chặng {index + 1}</p>
        <h2 className="font-display text-3xl font-bold uppercase text-primary">{stage.name}</h2>
        <p className="mt-2 font-semibold text-plum">“{stage.motto}”</p>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground">{stage.focus}</p>
      </div>
      {stage.scenes.map((s, si) => {
        const p = picks[si];
        const opt = p == null ? null : s.options[p]!;
        return (
          <div key={s.title} className="space-y-3 rounded-2xl bg-pink-soft p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-plum">Tình huống {si + 1} – {s.title}</p>
            <p className="text-sm font-medium leading-relaxed">“{s.story}”</p>
            <p className="text-sm font-semibold">Bạn sẽ ứng xử thế nào?</p>
            <div className="grid gap-2">
              {s.options.map((o, oi) => (
                <button key={o.text} type="button" aria-pressed={p === oi} onClick={() => setPicks(picks.map((x, k) => (k === si ? oi : x)))}
                  className={`rounded-lg border p-3 text-left text-sm font-medium transition-colors ${p === oi ? "border-primary bg-card" : "border-border bg-card/70 hover:bg-card"}`}>{o.text}</button>
              ))}
            </div>
            {opt && <p role="status" className="rounded-lg bg-mint-soft p-4 text-sm leading-relaxed"><strong>{opt.fit ? "Cách ứng xử phù hợp: " : "Hãy cân nhắc thêm: "}</strong>{opt.fb}</p>}
          </div>
        );
      })}
      <div className="space-y-3 rounded-2xl border border-pink-band bg-card p-5">
        <label className="block text-sm font-semibold" htmlFor={`practice-${index}`}>Luyện nói: {stage.practice}</label>
        <Textarea id={`practice-${index}`} value={practice} onChange={(e) => setPractice(e.target.value)} placeholder="Không bắt buộc – chỉ mình bạn thấy" />
        <label className="block text-sm font-semibold" htmlFor={`reflect-${index}`}>Suy ngẫm: {stage.reflect}</label>
        <Textarea id={`reflect-${index}`} value={reflect} onChange={(e) => setReflect(e.target.value)} placeholder="Không bắt buộc – chỉ mình bạn thấy" />
      </div>
      {!done && <p className="text-center text-sm text-muted-foreground">Chọn cách ứng xử cho cả hai tình huống để đi tiếp.</p>}
      {done && (
        <div className="animate-in fade-in space-y-4 text-center duration-500">
          {stage.bridge && <p className="mx-auto max-w-2xl border-l-4 border-primary bg-mint-soft p-4 text-left italic leading-relaxed">“{stage.bridge}”</p>}
          <Button size="lg" onClick={onNext}>{index < STAGES.length - 1 ? `Sang chặng ${index + 2} – ${STAGES[index + 1]!.name}` : "Đến điểm kết nối"} <ArrowRight /></Button>
        </div>
      )}
    </div>
  );
}

export function ConnectionJourney() {
  const [step, setStep] = useState(0);
  const [round, setRound] = useState(0);
  const go = (n: number) => { setStep(n); document.getElementById("hanh-trinh")?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const restart = () => { setRound(round + 1); go(0); };

  return (
    <section id="hanh-trinh" className="scroll-mt-24 space-y-6 rounded-2xl border border-pink-band bg-card p-5 shadow-sm sm:p-8">
      <ProgressPath step={step} />
      <Circles step={step} />
      {step === 0 && (
        <div className="animate-in fade-in mx-auto max-w-2xl space-y-4 text-center duration-500">
          <h2 className="font-display text-3xl font-bold uppercase text-primary">Khoảng cách vô hình</h2>
          <p className="leading-relaxed">Có những ngày, chúng ta vẫn cười nói cùng bạn bè, vẫn ngồi bên gia đình, vẫn gặp thầy cô mỗi ngày… nhưng trong lòng lại có những điều chưa thể nói thành lời.</p>
          <p className="leading-relaxed">Khoảng cách đôi khi không nằm ở việc chúng ta xa nhau bao nhiêu, mà ở việc chúng ta đã thực sự lắng nghe và thấu hiểu nhau hay chưa.</p>
          <p className="font-semibold leading-relaxed text-plum">Hãy bắt đầu hành trình này bằng một câu hỏi: Điều gì đang khiến chúng ta chưa thể đến gần nhau hơn?</p>
          <Button size="lg" onClick={() => go(1)}>BẮT ĐẦU HÀNH TRÌNH <ArrowRight /></Button>
        </div>
      )}
      {step >= 1 && step <= 3 && <StageView key={`${round}-${step}`} stage={STAGES[step - 1]!} index={step - 1} onNext={() => go(step + 1)} />}
      {step === 4 && (
        <div className="mx-auto max-w-3xl space-y-5 text-center">
          <h2 className="font-display text-2xl font-bold uppercase text-primary sm:text-3xl">Khoảng cách có thể thu hẹp khi chúng ta bắt đầu lắng nghe</h2>
          <ul className="space-y-3">
            {ENDING.map((t, i) => (
              <li key={t} className="animate-in fade-in slide-in-from-bottom-2 fill-mode-both rounded-xl bg-pink-soft p-4 leading-relaxed duration-700" style={{ animationDelay: `${i * 500}ms` }}>“{t}”</li>
            ))}
          </ul>
          <p className="animate-in fade-in fill-mode-both rounded-2xl bg-primary p-6 font-display text-xl font-bold uppercase leading-snug text-primary-foreground duration-700" style={{ animationDelay: "2200ms" }}>
            “Kết nối không phải là không còn khoảng cách, mà là chúng ta sẵn sàng lắng nghe và tìm cách đến gần nhau hơn.”
          </p>
          <p className="italic text-muted-foreground">Bạn không cần thay đổi tất cả trong một ngày. Hãy bắt đầu từ một lời hỏi han, một lần lắng nghe trọn vẹn hoặc một câu nói chân thành.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg"><Link to="/diem-tua">TIẾP TỤC ĐẾN CHẠM 5 – ĐIỂM TỰA <ArrowRight /></Link></Button>
            <Button variant="outline" size="lg" onClick={restart}><RotateCcw /> TRẢI NGHIỆM LẠI HÀNH TRÌNH</Button>
          </div>
        </div>
      )}
      <p className="text-center text-xs text-muted-foreground">Câu trả lời của bạn chỉ hiển thị trong lúc xem trang, không được lưu lại hay gửi đi.</p>
    </section>
  );
}
