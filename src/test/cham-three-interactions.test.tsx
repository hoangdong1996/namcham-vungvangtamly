import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CopingGym, GYM } from "@/components/cham-three/coping-gym";
import { SevenDayChallenge, DAYS } from "@/components/cham-three/seven-day";

describe("Chạm 3 activities", () => {
  it("coping gym has 6 scenarios, gives feedback and counts explored only", () => {
    render(<CopingGym />);
    expect(GYM).toHaveLength(6);
    fireEvent.click(screen.getByRole("button", { name: GYM[0]!.options[0]! }));
    expect(screen.getByRole("status").textContent).toContain("Cách này có hạn chế");
    expect(screen.getByText("Đã khám phá 1/6 tình huống")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Làm lại" }));
    expect(screen.getByText("Đã khám phá 0/6 tình huống")).toBeTruthy();
  });

  it("seven-day plan is editable, checkable and resets", () => {
    render(<SevenDayChallenge />);
    fireEvent.click(screen.getByRole("button", { name: "Bắt đầu thử thách" }));
    const goal = screen.getByRole("textbox", { name: "Mục tiêu ngày 2" });
    expect(goal).toHaveValue(DAYS[1]!.g);
    fireEvent.change(goal, { target: { value: "Riêng" } });
    fireEvent.click(screen.getByRole("checkbox", { name: "Hoàn thành ngày 2" }));
    expect(screen.getByRole("checkbox", { name: "Hoàn thành ngày 2" })).toHaveAttribute("data-state", "checked");
    fireEvent.click(screen.getByRole("button", { name: "Làm lại kế hoạch" }));
    expect(screen.getByRole("textbox", { name: "Mục tiêu ngày 2" })).toHaveValue(DAYS[1]!.g);
  });
});
