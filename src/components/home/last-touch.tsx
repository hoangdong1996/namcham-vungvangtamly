import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FiveTouchMark } from "./five-touch-mark";
import { LAST_TOUCH_POINTS } from "./last-touch-data";
import { OpenLetter } from "./open-letter";
import schoolImage from "@/assets/last-touch-school.jpg";
import companionImage from "@/assets/step-3-walk.jpg";

function TakeWithYou() {
  const [selected, setSelected] = useState<number>(1);
  const point = LAST_TOUCH_POINTS.find(p => p.id === selected) ?? LAST_TOUCH_POINTS[0];
  return (
    <section id="mang-theo-sau-hanh-trinh" className="lt-take lt-scene" aria-labelledby="lt-take-title">
      <div className="lt-inner">
        <div className="lt-section-label"><span>02 / MANG THEO SAU HÀNH TRÌNH</span><span aria-hidden="true">Năm chạm, một điều ở lại</span></div>
        <h2 id="lt-take-title" className="lt-heading max-w-3xl">MỘT ĐIỀU BẠN MUỐN MANG THEO SAU HÀNH TRÌNH NÀY?</h2>
        <div className="lt-touch-system" role="group" aria-label="Chọn điều muốn mang theo">
          <svg className="lt-touch-thread" viewBox="0 0 1000 140" preserveAspectRatio="none" aria-hidden="true"><path d="M100 65Q200 130 300 65T500 65T700 65T900 65" className="fill-none stroke-club/35" strokeWidth="2" /></svg>
          {LAST_TOUCH_POINTS.map(p => <Button key={p.id} variant="ghost" className="lt-touch-choice" aria-pressed={selected === p.id} aria-controls="lt-touch-message" onClick={() => setSelected(p.id)}>
            <span className="lt-touch-portrait"><img src={p.image} alt="" width={160} height={160} loading="lazy" /></span>
            <span className="lt-touch-number">0{p.id}</span><span className="lt-touch-name">{p.name}</span>
          </Button>)}
        </div>
        <div id="lt-touch-message" className="lt-touch-message" aria-live="polite" aria-atomic="true">
          <span className="lt-message-index" aria-hidden="true">0{point.id}</span>
          <div className="min-w-0"><h3 className="font-hero text-sm font-bold uppercase text-lt-green">CHẠM {point.id} – {point.name}</h3><p className="mt-3 text-lg font-medium leading-relaxed text-lt-green sm:text-2xl">{point.message}</p><Button variant="link" asChild className="mt-4 h-auto px-0 text-lt-green"><Link to={point.to}>Đến Chạm {point.id}<ArrowUpRight aria-hidden="true" /></Link></Button></div>
        </div>
      </div>
    </section>
  );
}

export function LastTouch() {
  const intro = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const element = intro.current;
    if (!element || typeof IntersectionObserver === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setVisible(true); return; }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.15 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return (
    <div id="the-last-touch" className="last-touch">
      <section ref={intro} className={`lt-intro lt-scene ${visible ? "lt-visible" : ""}`} aria-labelledby="lt-intro-title">
        <div className="lt-inner">
          <div className="lt-section-label"><span>01 / CHẠM ĐỂ TIẾP NỐI</span><span aria-hidden="true">Kết nối vẫn còn</span></div>
          <div className="lt-intro-heading">
            <FiveTouchMark animate={false} className="lt-signature" />
            <h2 id="lt-intro-title" className="lt-heading lt-title-reveal">5 CHẠM KHÉP LẠI.<br /><span className="text-plum">KẾT NỐI VẪN CÒN.</span></h2>
          </div>
          <div className="lt-intro-description lt-copy-reveal"><span className="lt-fine-line" aria-hidden="true" /><p className="lt-body max-w-2xl">Bạn đã học cách lắng nghe, thấu hiểu, vững vàng, kết nối và tìm kiếm điểm tựa. Hãy mang những điều ấy vào cuộc sống mỗi ngày.</p></div>
          <figure className="lt-school-image"><img src={schoolImage} alt="Minh họa năm học sinh cùng bước đi và trò chuyện trong sân trường" width={1536} height={1024} loading="lazy" /><figcaption>5 CHẠM – VỮNG VÀNG TÂM LÝ<span>Minh họa hành trình kết nối</span></figcaption></figure>
        </div>
      </section>
      <TakeWithYou />
      <OpenLetter />
      <section id="cham-de-tiep-noi" className="lt-next lt-scene" aria-labelledby="lt-next-title">
        <div className="lt-inner">
          <div className="lt-section-label"><span>04 / BƯỚC TIẾP THEO CỦA BẠN</span><span aria-hidden="true">Hành trình tiếp tục</span></div>
          <div className="lt-next-grid">
            <div><h2 id="lt-next-title" className="lt-heading">ĐỪNG NGỪNG<br />KẾT NỐI.</h2><p className="lt-body mt-6 max-w-xl">Bạn không cần phải tự mình vượt qua mọi khó khăn. Hãy bắt đầu bằng một cuộc trò chuyện với người bạn tin tưởng.</p><Button asChild className="lt-action mt-8"><Link to="/diem-tua" hash="nguon-tro-giup"><HeartHandshake aria-hidden="true" />TÌM ĐIỂM TỰA<ArrowRight aria-hidden="true" /></Link></Button></div>
            <img src={companionImage} alt="Minh họa hai học sinh đồng hành cùng nhau" width={1024} height={768} loading="lazy" className="lt-next-image" />
          </div>
          <p className="lt-closing">Một lần chạm – Một lần thấu hiểu – Một bước trưởng thành.</p>
        </div>
      </section>
    </div>
  );
}