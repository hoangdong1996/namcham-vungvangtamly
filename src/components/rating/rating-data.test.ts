import { describe, expect, it } from "vitest";
import { RATING_LABELS, computeAverage, getVisitSessionId } from "./rating-data";

const memStore = () => { const m = new Map<string, string>(); return { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => void m.set(k, v) }; };

describe("website rating rules", () => {
  it("labels 1 and 5 stars", () => {
    expect(RATING_LABELS[1]).toBe("Chưa hài lòng");
    expect(RATING_LABELS[5]).toBe("Rất hữu ích");
  });
  it("average = total stars / count, rounded to one decimal", () => {
    expect(computeAverage([0, 0, 1, 1, 1])).toEqual({ total: 3, average: 4 });
    expect(computeAverage([1, 0, 0, 0, 2])).toEqual({ total: 3, average: 3.7 });
  });
  it("no ratings gives no average", () => {
    expect(computeAverage([0, 0, 0, 0, 0])).toEqual({ total: 0, average: null });
  });
  it("same visit keeps its id across reloads; a new visit gets a new id", () => {
    const tab = memStore();
    expect(getVisitSessionId(tab)).toBe(getVisitSessionId(tab));
    expect(getVisitSessionId(memStore())).not.toBe(getVisitSessionId(tab));
  });
});
