import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, HeartHandshake, Lock, RotateCcw, ShieldAlert, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { EXERCISES, MAX_SHARE_LENGTH, type Suggestion } from "@/lib/support-suggest/catalog";
import { getSupportSuggestion } from "@/lib/support-suggest/suggest.functions";
import { AI_PRIVACY_NOTICE, DIRECT_SUPPORT_GUIDANCE, presentSupportError } from "@/lib/support-safety";

/** Student shares a worry; AI suggests on-site exercises. Text lives only in component state. */
export function SharePressure() {
  const suggest = useServerFn(getSupportSuggestion);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ReturnType<typeof presentSupportError> | null>(null);
  const [result, setResult] = useState<Suggestion | null>(null);

  async function submit() {
    if (loading || text.trim().length < 3) return;
    setLoading(true); setError(null); setResult(null);
    try {
      setResult(await suggest({ data: { text } }));
    } catch (e) {
      setError(presentSupportError(e));
    } finally {
      setLoading(false);
    }
  }

  function clear() { setText(""); setResult(null); setError(null); }

  return (
    <div className="space-y-4 rounded-3xl bg-card p-6 shadow-sm">
      <p className="leading-relaxed text-foreground/90">
        Viết vài dòng về điều đang khiến bạn áp lực. Trợ lý AI sẽ gợi ý bài tập phù hợp trên website và nhắc bạn tìm người lớn đáng tin cậy khi cần.
      </p>
      <p className="flex items-start gap-2 rounded-2xl bg-mint/40 p-3 text-sm text-foreground/80">
        <Lock className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
        <span>{AI_PRIVACY_NOTICE} Website không lưu lịch sử chia sẻ; nội dung trên trang sẽ mất khi rời trang hoặc tải lại. Chưa xác minh được việc lưu giữ tại dịch vụ AI bên ngoài. Đây không phải công cụ chẩn đoán hay thay thế chuyên gia tâm lý hoặc bác sĩ.</span>
      </p>
      <label htmlFor="share-pressure" className="sr-only">Điều đang khiến bạn áp lực</label>
      <Textarea id="share-pressure" value={text} maxLength={MAX_SHARE_LENGTH} rows={4}
        onChange={(e) => { setText(e.target.value); setError(null); }}
        placeholder="Ví dụ: Sắp thi mà mình thấy học mãi không vào, tối nào cũng lo đến mất ngủ…" />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs text-foreground/60">{text.length}/{MAX_SHARE_LENGTH}</span>
        <div className="flex gap-2">
          {(text || result) && <Button variant="outline" onClick={clear} disabled={loading}>Xóa nội dung</Button>}
          <Button onClick={submit} disabled={loading || text.trim().length < 3}>
            <Sparkles className="h-4 w-4" aria-hidden="true" />{loading ? "Đang lắng nghe…" : "Nhận gợi ý"}
          </Button>
        </div>
      </div>

      {error && <div role="alert" className="space-y-3 rounded-2xl bg-destructive/10 p-3 text-sm text-destructive"><p>{error.message}</p><p>{DIRECT_SUPPORT_GUIDANCE}</p>{error.retryable && <Button variant="outline" onClick={submit} disabled={loading || text.trim().length < 3}><RotateCcw aria-hidden="true" />Thử lại</Button>}<Link to="/diem-tua" hash="nguon-tro-giup" className="inline-flex min-h-11 items-center gap-2 font-semibold underline">Tìm điểm tựa<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div>}

      {result && (
        <div aria-live="polite" className="space-y-4">
          {result.urgent && (
            <div role="alert" className="rounded-2xl border-2 border-destructive bg-destructive/10 p-4">
              <p className="flex items-center gap-2 font-bold text-destructive"><ShieldAlert className="h-4 w-4" aria-hidden="true" />Bạn không phải đối mặt một mình</p>
              <p className="mt-1 text-sm">{DIRECT_SUPPORT_GUIDANCE}</p>
            </div>
          )}
          <p className="rounded-2xl bg-pink-chip/40 p-4 leading-relaxed">{result.message}</p>
          {result.exercises.length > 0 && (
            <div>
              <p className="mb-2 font-semibold text-primary">Bài tập gợi ý cho bạn</p>
              <ul className="grid gap-2 sm:grid-cols-3">
                {result.exercises.map((id) => {
                  const ex = EXERCISES[id];
                  return (
                    <li key={id}>
                      <Link to={ex.to} {...(ex.hash ? { hash: ex.hash } : {})}
                        className="flex min-h-11 items-center justify-between gap-2 rounded-2xl border border-border bg-background p-3 text-sm font-semibold text-primary hover:bg-mint/30">
                        {ex.title}<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          <p className="flex items-start gap-2 text-sm text-foreground/80">
            <HeartHandshake className="mt-0.5 h-4 w-4 shrink-0 text-plum" aria-hidden="true" />
            <span>Nếu áp lực kéo dài, hãy chia sẻ với người lớn đáng tin cậy như bố mẹ, giáo viên chủ nhiệm hoặc thầy cô tư vấn. <Link to="/diem-tua" hash="nguon-tro-giup" className="font-semibold text-plum underline">Tìm điểm tựa</Link></span>
          </p>
        </div>
      )}
    </div>
  );
}
