import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Brain, Ear, LifeBuoy, Shield, Users } from "lucide-react";

const MODEL_PARTS = [
  { t: "LẮNG NGHE", icon: Ear, to: "/lang-nghe", tone: "model-point-green", d: "Tạo không gian để học sinh được chia sẻ và được tôn trọng." },
  { t: "THẤU HIỂU", icon: Brain, to: "/hieu-minh", tone: "model-point-pink", d: "Nhận diện cảm xúc, tôn trọng sự khác biệt và phát triển sự đồng cảm." },
  { t: "VỮNG VÀNG", icon: Shield, to: "/vung-vang", tone: "model-point-lavender", d: "Rèn luyện kỹ năng chăm sóc bản thân, quản lý cảm xúc và ứng phó với áp lực." },
  { t: "KẾT NỐI", icon: Users, to: "/ket-noi", tone: "model-point-blue", d: "Xây dựng quan hệ tích cực và kết nối với những người có thể hỗ trợ." },
  { t: "ĐIỂM TỰA", icon: LifeBuoy, to: "/diem-tua", tone: "model-point-green", d: "Nhận biết nguồn trợ giúp phù hợp và chủ động tìm đến khi cần." },
] as const;

/** Animate the existing model once, only when its five-point row enters view. */
export function ModelConnections() {
  const ref = useRef<HTMLOListElement>(null);
  const [motion, setMotion] = useState<"static" | "pending" | "started">("static");

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.IntersectionObserver) return;
    setMotion("pending");
    let revealed = false;
    const observer = new IntersectionObserver((entries) => {
      if (revealed || !entries.some((entry) => entry.isIntersecting)) return;
      revealed = true;
      setMotion("started");
      observer.disconnect();
    }, { threshold: 0.12 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <ol ref={ref} data-motion={motion} aria-label="Năm điểm chạm kết nối" className="model-connections relative mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <svg aria-hidden="true" viewBox="0 0 1000 32" preserveAspectRatio="none" className="model-connector pointer-events-none absolute z-20 hidden h-8 w-full lg:block">
        {MODEL_PARTS.slice(0, 4).map((c, i) => <path key={c.t} d={`M ${100 + i * 200} 8 C ${164 + i * 200} 8, ${170 + i * 200} 27, ${200 + i * 200} 27 S ${250 + i * 200} 8, ${300 + i * 200} 8`} pathLength="100" className={`model-connector-path model-line-${i + 1} ${c.tone} fill-none`} strokeWidth="2.5" vectorEffect="non-scaling-stroke" strokeLinecap="round" />)}
      </svg>
      {MODEL_PARTS.map((c, i) => (
        <li key={c.t} className={`model-node relative flex flex-col items-center rounded-3xl border border-border bg-card p-5 text-center shadow-sm ${c.tone}`}>
          <Link to={c.to} aria-label={`Chạm ${i + 1} – ${c.t}`} className="model-point relative z-30 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-display text-xl font-bold focus-visible:outline-none">
            {i + 1}
          </Link>
          <c.icon className="mt-3 h-7 w-7 text-primary" aria-hidden="true" />
          <h3 className="mt-2 font-display text-lg font-bold text-green-deep">{c.t}</h3>
          <p className="mt-1 text-sm leading-relaxed text-foreground/75">{c.d}</p>
        </li>
      ))}
    </ol>
  );
}