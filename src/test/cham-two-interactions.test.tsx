import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EmotionMirror } from "@/components/cham-two/emotion-mirror";
import { BehindScreen, SCENARIOS } from "@/components/cham-two/behind-screen";
import { SelfCareNotebook, SUGGESTED_GOALS } from "@/components/cham-two/notebook";

describe("Chạm 2 session-only activities", () => {
  it("emotion mirror gives a suggestion for the chosen need and resets", () => {
    render(<EmotionMirror />);
    fireEvent.click(screen.getByRole("button", { name: "Lo lắng" }));
    fireEvent.click(screen.getByRole("button", { name: "Tiếp tục" }));
    fireEvent.click(screen.getByRole("button", { name: "Tiếp tục" }));
    fireEvent.click(screen.getByRole("button", { name: "Nghỉ ngơi" }));
    fireEvent.click(screen.getByRole("button", { name: "Xem gợi ý" }));
    expect(screen.getByRole("status").textContent).toContain("Cho mình 10–15 phút nghỉ");
    fireEvent.click(screen.getByRole("button", { name: "Làm lại" }));
    expect(screen.getByRole("button", { name: "Lo lắng" })).toHaveAttribute("aria-pressed", "false");
  });

  it("behind screen has 6 scenarios and shows know/guess/cope after a choice", () => {
    render(<BehindScreen />);
    expect(SCENARIOS).toHaveLength(6);
    fireEvent.click(screen.getByRole("button", { name: SCENARIOS[0]!.options[0]!.text }));
    const s = screen.getByRole("status").textContent ?? "";
    expect(s).toContain("Điều mình biết");
    expect(s).toContain("Điều mình đang suy đoán");
    expect(s).toContain("Một cách ứng phó phù hợp");
  });

  it("notebook fills 7 suggested goals, stays editable and resets", () => {
    render(<SelfCareNotebook />);
    fireEvent.click(screen.getByRole("button", { name: "Dùng mục tiêu gợi ý" }));
    for (let d = 1; d <= 7; d++) expect(screen.getByRole("textbox", { name: `Mục tiêu ngày ${d}` })).toHaveValue(SUGGESTED_GOALS[d - 1]);
    const g = screen.getByRole("textbox", { name: "Mục tiêu ngày 3" });
    fireEvent.change(g, { target: { value: "Riêng của mình" } });
    expect(g).toHaveValue("Riêng của mình");
    fireEvent.click(screen.getByRole("button", { name: "Làm lại" }));
    expect(screen.getByRole("textbox", { name: "Mục tiêu ngày 3" })).toHaveValue("");
  });
});
