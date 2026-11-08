import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { computeAverage, formatScore } from "./rating-data";

const RANGES = [
  { id: "all", label: "Tất cả", days: null },
  { id: "30", label: "30 ngày", days: 30 },
  { id: "7", label: "7 ngày", days: 7 },
] as const;

export function RatingAdminStats() {
  const [range, setRange] = useState<(typeof RANGES)[number]["id"]>("all");
  const [counts, setCounts] = useState<number[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const days = RANGES.find((r) => r.id === range)!.days;
    const since = days ? new Date(Date.now() - days * 86400000).toISOString() : undefined;
    setCounts(null);
    supabase.rpc("website_rating_admin_stats", since ? { _since: since } : {}).then(({ data, error }) => {
      if (error) return setFailed(true);
      const c = [0, 0, 0, 0, 0];
      for (const row of data ?? []) c[row.stars - 1] = Number(row.total);
      setCounts(c);
    });
  }, [range]);

  if (failed) return null;
  const { total, average } = counts ? computeAverage(counts) : { total: 0, average: null };
  const max = counts ? Math.max(1, ...counts) : 1;

  return (
    <section aria-labelledby="rating-admin-title" className="mt-8 rounded-[2rem] border-2 border-dashed border-primary/40 bg-card p-5 text-left sm:p-7">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 id="rating-admin-title" className="font-display text-xl font-extrabold uppercase text-green-deep">Thống kê đánh giá website</h3>
        <div role="group" aria-label="Lọc theo thời gian" className="flex gap-2">
          {RANGES.map((r) => (
            <button key={r.id} type="button" aria-pressed={range === r.id} onClick={() => setRange(r.id)} className={`rounded-full px-3 py-1.5 text-sm font-bold ${range === r.id ? "bg-primary text-primary-foreground" : "bg-mint text-green-deep"}`}>{r.label}</button>
          ))}
        </div>
      </div>
      <p className="mt-1 text-xs text-foreground/60">Chỉ quản trị viên thấy mục này. Không hiển thị mã phiên hay thông tin cá nhân.</p>
      {!counts ? (
        <p className="mt-4 text-foreground/70"><Loader2 className="inline h-4 w-4 animate-spin" aria-hidden="true" /> Đang tải…</p>
      ) : total === 0 ? (
        <p className="mt-4 rounded-2xl bg-muted px-4 py-4 text-center text-foreground/70">Chưa có lượt đánh giá nào trong khoảng thời gian này.</p>
      ) : (
        <>
          <dl className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-mint px-4 py-3"><dt className="text-sm text-foreground/70">Tổng lượt đánh giá</dt><dd className="font-display text-2xl font-extrabold text-green-deep">{total.toLocaleString("vi-VN")}</dd></div>
            <div className="rounded-2xl bg-pink-soft px-4 py-3"><dt className="text-sm text-foreground/70">Điểm trung bình</dt><dd className="font-display text-2xl font-extrabold text-plum">{formatScore(average!)}/5</dd></div>
          </dl>
          <ul className="mt-5 space-y-2" aria-label="Phân bố theo số sao">
            {[5, 4, 3, 2, 1].map((s) => (
              <li key={s} className="flex items-center gap-3 text-sm">
                <span className="w-12 shrink-0 font-bold">{s} sao</span>
                <span className="h-4 flex-1 overflow-hidden rounded-full bg-muted"><span className="block h-full rounded-full bg-star transition-[width] duration-500" style={{ width: `${((counts[s - 1] ?? 0) / max) * 100}%` }} /></span>
                <span className="w-10 shrink-0 text-right font-semibold">{counts[s - 1]}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
