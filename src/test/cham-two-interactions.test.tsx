import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { FactorMap } from "@/components/cham-two/factor-map";
import { IntentionalDayChallenge, SelfCareNotebook } from "@/components/cham-two/notebook";

describe("Chạm 2 session-only self-care", () => {
  it("provides an action for a selected factor and removes it when deselected", () => {
    render(<FactorMap />);
    const choice = screen.getByRole("checkbox", { name: "Thiếu ngủ, ít vận động" });
    fireEvent.click(choice);
    const suggestions = document.querySelector('[aria-live="polite"]');
    expect(suggestions?.querySelectorAll("li")).toHaveLength(1);
    expect(suggestions?.textContent).toContain("Chọn giờ dừng sử dụng thiết bị buổi tối");
    fireEvent.click(choice);
    expect(suggestions?.querySelectorAll("li")).toHaveLength(0);
  });

  it("keeps all seven days individually editable and completable", () => {
    render(<SelfCareNotebook />);
    for (let day = 1; day <= 7; day++) {
      const goal = screen.getByRole("textbox", { name: `Mục tiêu ngày ${day}` });
      fireEvent.change(goal, { target: { value: `Mục tiêu riêng ${day}` } });
      expect(goal).toHaveValue(`Mục tiêu riêng ${day}`);
      fireEvent.change(screen.getByRole("textbox", { name: `Hành động ngày ${day}` }), { target: { value: `Hành động ${day}` } });
      const done = screen.getByRole("checkbox", { name: `Hoàn thành ngày ${day}` });
      fireEvent.click(done);
      expect(done).toHaveAttribute("aria-checked", "true");
    }
    fireEvent.click(screen.getByRole("checkbox", { name: "Hoàn thành ngày 3" }));
    expect(screen.getByRole("checkbox", { name: "Hoàn thành ngày 3" })).toHaveAttribute("aria-checked", "false");
    expect(screen.getByRole("checkbox", { name: "Hoàn thành ngày 7" })).toHaveAttribute("aria-checked", "true");
  });

  it("does not persist or submit private answers and clears them on leaving", () => {
    const local = vi.spyOn(Storage.prototype, "setItem");
    const network = vi.spyOn(globalThis, "fetch");
    const { unmount } = render(<SelfCareNotebook />);
    fireEvent.change(screen.getByRole("textbox", { name: "Người tin cậy 1" }), { target: { value: "Vai trò riêng tư" } });
    fireEvent.change(screen.getByRole("textbox", { name: "Mục tiêu ngày 1" }), { target: { value: "Ghi chú riêng tư" } });
    fireEvent.click(screen.getByRole("checkbox", { name: "Đi bộ" }));
    expect(local).not.toHaveBeenCalled();
    expect(network).not.toHaveBeenCalled();
    unmount();
    render(<SelfCareNotebook />);
    expect(screen.getByRole("textbox", { name: "Người tin cậy 1" })).toHaveValue("");
    expect(screen.getByRole("textbox", { name: "Mục tiêu ngày 1" })).toHaveValue("");
    expect(screen.getByRole("checkbox", { name: "Đi bộ" })).toHaveAttribute("aria-checked", "false");
    local.mockRestore();
    network.mockRestore();
  });

  it("allows trusted names or roles to be added and removed without contact details", () => {
    render(<SelfCareNotebook />);
    fireEvent.click(screen.getByRole("button", { name: "Thêm người tin cậy" }));
    fireEvent.change(screen.getByRole("textbox", { name: "Người tin cậy 2" }), { target: { value: "Giáo viên" } });
    expect(screen.getByRole("textbox", { name: "Người tin cậy 2" })).toHaveValue("Giáo viên");
    fireEvent.click(screen.getByRole("button", { name: "Xóa người tin cậy 1" }));
    expect(screen.getByRole("textbox", { name: "Người tin cậy 1" })).toHaveValue("Giáo viên");
    expect(screen.queryByRole("textbox", { name: "Người tin cậy 2" })).toBeNull();
  });

  it("completes and reverses the challenge with an editable reflection", () => {
    const { container } = render(<IntentionalDayChallenge />);
    fireEvent.change(screen.getByRole("textbox", { name: "Khoảng thời gian học tập mình chọn" }), { target: { value: "19:00–19:30" } });
    fireEvent.change(screen.getByRole("textbox", { name: "Điều gì hữu ích với bản thân sau thử thách?" }), { target: { value: "Mình tập trung hơn" } });
    const choices = within(container).getAllByRole("checkbox");
    expect(choices).toHaveLength(3);
    choices.forEach((choice) => fireEvent.click(choice));
    expect(screen.getByRole("status")).toBeTruthy();
    const first = choices[0];
    if (!first) throw new Error("Missing challenge step");
    fireEvent.click(first);
    expect(screen.queryByRole("status")).toBeNull();
    expect(screen.getByRole("textbox", { name: "Điều gì hữu ích với bản thân sau thử thách?" })).toHaveValue("Mình tập trung hơn");
  });
});