export const RATING_LABELS: Record<number, string> = {
  1: "Chưa hài lòng",
  2: "Cần cải thiện",
  3: "Bình thường",
  4: "Hữu ích",
  5: "Rất hữu ích",
};

const KEY = "5cham-rating-session";

/** Random visit ID kept for the browser tab's lifetime (survives reloads, not new tabs/visits). Not linked to identity. */
export function getVisitSessionId(store: Pick<Storage, "getItem" | "setItem"> = sessionStorage): string {
  const existing = store.getItem(KEY);
  if (existing && /^[0-9a-f-]{36}$/i.test(existing)) return existing;
  const id = crypto.randomUUID();
  store.setItem(KEY, id);
  return id;
}

export function computeAverage(counts: number[]): { total: number; average: number | null } {
  const total = counts.reduce((a, b) => a + b, 0);
  if (!total) return { total: 0, average: null };
  const sum = counts.reduce((a, c, i) => a + c * (i + 1), 0);
  return { total, average: Math.round((sum / total) * 10) / 10 };
}

export const formatScore = (n: number) => n.toLocaleString("vi-VN", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
