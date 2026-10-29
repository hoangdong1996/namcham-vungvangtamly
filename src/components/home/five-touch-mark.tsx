/** Biểu tượng độc quyền: năm điểm sáng nối thành một vòng tròn mở. */
const POINTS = [
  { x: 60, y: 14, c: "fill-primary" },
  { x: 104, y: 46, c: "fill-pink-chip" },
  { x: 88, y: 98, c: "fill-teal" },
  { x: 32, y: 98, c: "fill-club-blue" },
  { x: 16, y: 46, c: "fill-green-deep" },
];

export function FiveTouchMark({ className = "", animate = true, label = "Biểu tượng 5 CHẠM: năm điểm chạm nối thành vòng tròn mở" }: { className?: string; animate?: boolean; label?: string }) {
  const path = POINTS.map((p, i) => `${i ? "L" : "M"}${p.x} ${p.y}`).join(" ");
  return (
    <svg viewBox="0 0 120 120" role="img" aria-label={label} className={`${animate ? "touch-mark" : ""} ${className}`}>
      <path d={path} className="touch-mark-line fill-none stroke-primary/50" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" pathLength={100} />
      {POINTS.map((p, i) => (
        <g key={i} className="touch-mark-dot" style={{ animationDelay: `${i * 140}ms` }}>
          <circle cx={p.x} cy={p.y} r="12" className={`${p.c} opacity-20`} />
          <circle cx={p.x} cy={p.y} r="7" className={p.c} />
        </g>
      ))}
    </svg>
  );
}
