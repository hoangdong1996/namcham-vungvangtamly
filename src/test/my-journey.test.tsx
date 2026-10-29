import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
vi.mock("@tanstack/react-router", () => ({ Link: ({ children, to, hash, ...p }: any) => <a href={`${to}${hash ? "#" + hash : ""}`} {...p}>{children}</a> }));
import { MyJourney } from "@/components/home/signature";

describe("Hành trình 5 Chạm của tôi", () => {
  it("đếm tiến trình 0/5 → 2/5 và bỏ chọn được", () => {
    render(<MyJourney />);
    expect(screen.getByText("0/5 Chạm · 0%")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /Chạm 1 – Lắng nghe/ }));
    fireEvent.click(screen.getByRole("button", { name: /Chạm 5 – Điểm tựa/ }));
    expect(screen.getByText("2/5 Chạm · 40%")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /Chạm 5 – Điểm tựa/ }));
    expect(screen.getByText("1/5 Chạm · 20%")).toBeTruthy();
  });
});
