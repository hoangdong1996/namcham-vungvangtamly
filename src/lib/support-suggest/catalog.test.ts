import { describe, expect, it } from "vitest";
import { normalizeExercises } from "./catalog";

describe("normalizeExercises", () => {
  it("drops unknown ids, duplicates and keeps at most 3", () => {
    expect(normalizeExercises(["nut-dung", "fake", "nut-dung", "so-tay", "ban-do", "ket-noi"])).toEqual(["nut-dung", "so-tay", "ban-do"]);
  });
});
