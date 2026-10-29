import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, GraduationCap, HeartHandshake, House, ShieldAlert, Stethoscope, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import illustration from "@/assets/friend-companion.jpg";
import { HELP_SOURCES, type HelpSourceId } from "./help-sources-data";

const ICONS = { "ban-be": Users, "gia-dinh": House, "nha-truong": GraduationCap, "y-te": Stethoscope, "chuyen-mon": HeartHandshake, "khan-cap": ShieldAlert };

export function HelpSources() {
  const [selected, setSelected] = useState<HelpSourceId | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Partial<Record<HelpSourceId, HTMLButtonElement | null>>>({});
  const source = HELP_SOURCES.find((item) => item.id === selected);

  useEffect(() => {
    if (selected) {
      detailRef.current?.focus({ preventScroll: true });
      detailRef.current?.scrollIntoView?.({ block: "nearest", behavior: "smooth" });
    }
  }, [selected]);

  function back() {
    const previous = selected;
    setSelected(null);
    if (previous) cardRefs.current[previous]?.focus({ preventScroll: true });
    document.getElementById("danh-sach-tro-giup")?.scrollIntoView?.({ block: "start", behavior: "smooth" });
  }

  return (
    <section id="nguon-tro-giup" aria-labelledby="help-sources-title" className="scroll-mt-20 bg-background px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="help-sources-title" className="font-display text-3xl font-extrabold text-primary sm:text-4xl">NGUỒN TRỢ GIÚP KHI CẦN</h2>
          <p className="mt-4 leading-relaxed">“Bạn không cần phải tự mình vượt qua tất cả. Khi cảm thấy áp lực, lo lắng, buồn bã hoặc gặp khó khăn, bạn có thể tìm đến những người đáng tin cậy để được lắng nghe và hỗ trợ.”</p>
          <img src={illustration} alt="Hai học sinh trò chuyện, lắng nghe và đồng hành cùng nhau trong sân trường" className="mx-auto mt-6 aspect-[3/2] w-full max-w-sm rounded-2xl object-cover" />
        </div>

        <div id="danh-sach-tro-giup" className="mt-8 grid scroll-mt-24 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {HELP_SOURCES.map((item) => {
            const Icon = ICONS[item.id];
            const urgent = item.id === "khan-cap";
            return (
              <Button key={item.id} ref={(node) => { cardRefs.current[item.id] = node; }} variant="outline" aria-label={item.button} aria-expanded={selected === item.id} aria-controls="huong-dan-nguon-tro-giup" onClick={() => setSelected(item.id)} className={`h-auto min-h-72 flex-col items-start justify-start gap-0 whitespace-normal rounded-2xl border-2 p-6 text-left text-foreground ${urgent ? "border-plum/40 bg-pink-soft hover:bg-pink-band/50" : "border-pink-band bg-card hover:bg-mint-soft"}`}>
                <span className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full ${urgent ? "bg-pink-band text-plum" : "bg-mint text-green-deep"}`}><Icon className="size-6" /></span>
                <span className={`font-display text-xl font-bold ${urgent ? "text-plum" : "text-green-deep"}`}>{item.title}</span>
                <span className="mb-5 mt-3 text-sm font-medium leading-relaxed">{item.description}</span>
                <span className="mt-auto flex items-center gap-2 text-sm font-bold text-green-deep">{item.button}<ArrowRight className="size-4" /></span>
              </Button>
            );
          })}
        </div>

        {source && (
          <div id="huong-dan-nguon-tro-giup" role="region" aria-label={source.title} ref={detailRef} tabIndex={-1} className="mt-8 scroll-mt-24 border-y border-pink-band bg-mint-soft px-5 py-8 outline-none sm:px-8">
            <h3 className="font-display text-2xl font-bold text-green-deep">{source.title}</h3>
            <ol className="mt-5 list-decimal space-y-3 pl-5 leading-relaxed">{source.guidance.map((text) => <li key={text}>{text}</li>)}</ol>
            {"opener" in source && <blockquote className="mt-6 border-l-4 border-pink-number bg-card px-5 py-4 font-semibold text-plum">“{source.opener}”</blockquote>}
            <Button variant="outline" onClick={back} className="mt-6 h-auto whitespace-normal py-3"><ArrowLeft />Quay lại danh sách nguồn trợ giúp</Button>
          </div>
        )}

        <div className="mt-10 border-t border-pink-band pt-8 text-center">
          <h3 className="font-display text-2xl font-bold text-primary">“TÌM KIẾM SỰ GIÚP ĐỠ LÀ MỘT ĐIỀU DŨNG CẢM.”</h3>
          <p className="mx-auto mt-3 max-w-2xl leading-relaxed">“Bạn có quyền được lắng nghe, được tôn trọng và được hỗ trợ. Hãy bắt đầu từ một người mà bạn cảm thấy an toàn.”</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild variant="outline" className="h-auto whitespace-normal py-3"><Link to="/diem-tua" hash="cham-5"><ArrowLeft />Quay lại Chạm 5 – Điểm tựa</Link></Button>
            <Button asChild className="h-auto whitespace-normal py-3"><Link to="/" hash="nam-cham">Khám phá hành trình 5 Chạm<ArrowRight /></Link></Button>
          </div>
        </div>
      </div>
    </section>
  );
}