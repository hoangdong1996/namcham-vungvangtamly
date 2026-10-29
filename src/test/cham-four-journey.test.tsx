import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@tanstack/react-router", () => ({ Link: ({ to, children, ...p }: any) => <a href={to} {...p}>{children}</a> }));
import { ConnectionJourney, STAGES } from "@/components/cham-four/journey";

describe("Chạm 4 journey", () => {
  it("goes intro → 3 stages → ending, then restarts", () => {
    Element.prototype.scrollIntoView = () => {};
    render(<ConnectionJourney />);
    fireEvent.click(screen.getByRole("button", { name: /BẮT ĐẦU HÀNH TRÌNH/ }));
    for (const st of STAGES) {
      expect(screen.getByRole("heading", { name: st.name })).toBeTruthy();
      for (const sc of st.scenes) fireEvent.click(screen.getByRole("button", { name: sc.options[0]!.text }));
      fireEvent.click(screen.getByRole("button", { name: /Sang chặng|Đến điểm kết nối/ }));
    }
    expect(screen.getByRole("link", { name: /TIẾP TỤC ĐẾN CHẠM 5/ })).toHaveAttribute("href", "/diem-tua");
    fireEvent.click(screen.getByRole("button", { name: /TRẢI NGHIỆM LẠI/ }));
    expect(screen.getByRole("button", { name: /BẮT ĐẦU HÀNH TRÌNH/ })).toBeTruthy();
  });
});
