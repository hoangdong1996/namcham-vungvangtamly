import { useCallback, useEffect, useState } from "react";
import { Loader2, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { RATING_LABELS, formatScore, getVisitSessionId } from "./rating-data";
import { RatingAdminStats } from "./rating-admin-stats";

type Summary = { total: number; average: number | null };

export function StarRow({ value, size = "h-5 w-5" }: { value: number; size?: string }) {
  return (
    <span className="inline-flex gap-1" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = Math.max(0, Math.min(1, value - (i - 1)));
        return (
          <span key={i} className={`relative inline-block ${size}`}>
            <Star className={`absolute inset-0 ${size} fill-star-muted text-star-muted`} />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star className={`${size} fill-star text-star`} />
            </span>
          </span>
        );
      })}
    </span>
  );
}

export function WebsiteRating() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [status, setStatus] = useState<"checking" | "open" | "done">("checking");
  const [picked, setPicked] = useState(0);
  const [hover, setHover] = useState(0);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const loadSummary = useCallback(async () => {
    const { data, error } = await supabase.rpc("website_rating_summary");
    if (error) return;
    const row = data?.[0];
    setSummary({ total: Number(row?.total ?? 0), average: row?.average == null ? null : Number(row.average) });
  }, []);

  useEffect(() => {
    const id = getVisitSessionId();
    setSessionId(id);
    supabase.rpc("website_rating_session_used", { _session_id: id }).then(({ data }) => setStatus(data ? "done" : "open"));
    loadSummary();
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return;
      const { data: r } = await supabase.from("user_roles").select("role").eq("user_id", data.user.id).eq("role", "admin").maybeSingle();
      setIsAdmin(!!r);
    });
  }, [loadSummary]);

  async function submit() {
    if (!picked || !sessionId || sending) return;
    setSending(true);
    setError(null);
    const { data, error } = await supabase.rpc("submit_website_rating", { _rating: picked, _session_id: sessionId });
    setSending(false);
    if (error || data === "invalid") {
      setError("Chưa gửi được đánh giá. Vui lòng kiểm tra kết nối và bấm “Gửi đánh giá” để thử lại.");
      return;
    }
    // "duplicate" means this visit was already recorded – show thanks without counting again.
    setStatus("done");
    loadSummary();
  }

  const shown = hover || picked;

  return (
    <section id="danh-gia-website" aria-labelledby="danh-gia-title" className="bg-mint-soft px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h2 id="danh-gia-title" className="font-display text-2xl font-extrabold uppercase text-green-deep sm:text-3xl">Bạn đánh giá website như thế nào?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-foreground/75">Mỗi đánh giá của bạn là một đóng góp quý giá giúp chúng tôi hoàn thiện hành trình 5 Chạm và mang đến những trải nghiệm tốt hơn.</p>

        <div className="mt-8 rounded-[2rem] border border-border bg-card p-6 shadow-sm sm:p-8">
          {status === "checking" ? (
            <p className="text-foreground/70"><Loader2 className="inline h-4 w-4 animate-spin" aria-hidden="true" /> Đang tải…</p>
          ) : status === "done" ? (
            <div role="status">
              <p className="font-display text-xl font-extrabold uppercase text-primary sm:text-2xl">Cảm ơn bạn đã đánh giá!</p>
              <p className="mx-auto mt-2 max-w-xl text-foreground/80">Ý kiến của bạn giúp 5 Chạm ngày càng hoàn thiện hơn. Hẹn gặp lại bạn trong những hành trình tiếp theo! 💚</p>
            </div>
          ) : (
            <>
              <p className="font-semibold text-foreground">Bạn cảm thấy website hữu ích như thế nào?</p>
              <div role="radiogroup" aria-label="Chọn số sao" className="mt-4 flex justify-center gap-1 sm:gap-3" onMouseLeave={() => setHover(0)}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <button
                    key={i}
                    type="button"
                    role="radio"
                    aria-checked={picked === i}
                    aria-label={`${i} sao – ${RATING_LABELS[i]}`}
                    disabled={sending}
                    onClick={() => setPicked(i)}
                    onMouseEnter={() => setHover(i)}
                    onFocus={() => setHover(i)}
                    onBlur={() => setHover(0)}
                    className="rounded-full p-1.5 transition-transform duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-reduce:transition-none"
                  >
                    <Star className={`h-11 w-11 transition-colors duration-200 sm:h-14 sm:w-14 ${i <= shown ? "fill-star text-star" : "fill-star-muted text-star-muted"}`} aria-hidden="true" />
                  </button>
                ))}
              </div>
              <p className="mt-3 min-h-7 font-display text-lg font-bold text-plum" aria-live="polite">{shown ? `${shown} sao – ${RATING_LABELS[shown]}` : "Chạm vào ngôi sao để chọn"}</p>
              <button
                type="button"
                onClick={submit}
                disabled={!picked || sending}
                className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-7 py-2.5 font-bold uppercase text-primary-foreground transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {sending && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                {sending ? "Đang gửi…" : "Gửi đánh giá"}
              </button>
              {error && <p role="alert" className="mt-3 text-sm font-semibold text-destructive">{error}</p>}
            </>
          )}
        </div>

        <div className="mt-6 rounded-3xl bg-card/70 px-5 py-5" aria-live="polite">
          {summary === null ? null : summary.total === 0 || summary.average === null ? (
            <p className="font-semibold text-green-deep">Hãy là người đầu tiên đánh giá website 5 Chạm!</p>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <StarRow value={summary.average} size="h-6 w-6" />
              <p className="font-display text-3xl font-extrabold text-green-deep">{formatScore(summary.average)}/5 sao</p>
              <p className="text-foreground/75">{summary.total.toLocaleString("vi-VN")} lượt đánh giá</p>
            </div>
          )}
        </div>

        {isAdmin && <RatingAdminStats />}
      </div>
    </section>
  );
}
