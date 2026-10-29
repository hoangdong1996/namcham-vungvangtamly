import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@tanstack/react-router", () => ({ Link: ({ to, hash, children, ...p }: any) => <a href={hash ? `${to}#${hash}` : to} {...p}>{children}</a> }));
import { SupportMap } from "@/components/cham-five/support-map";
import { ConnectChallenge } from "@/components/cham-five/connect-challenge";
import { ClubProposal } from "@/components/cham-five/club-proposal";

describe("Chạm 5", () => {
  it("map opens a supporter and goes back", () => {
    render(<SupportMap />);
    fireEvent.click(screen.getByRole("button", { name: /ĐIỂM TỰA NHÀ TRƯỜNG/ }));
    fireEvent.click(screen.getByRole("button", { name: "Nhân viên y tế trường học" }));
    expect(screen.getByRole("region", { name: "Nhân viên y tế trường học" })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /Quay lại bản đồ/ }));
    expect(screen.queryByRole("region")).toBeNull();
  });
  it("challenge option B is the suitable answer", () => {
    render(<ConnectChallenge />);
    fireEvent.click(screen.getByRole("button", { name: /^B\./ }));
    expect(screen.getByRole("status").textContent).toContain("Đây là cách mở lời phù hợp");
  });
  it("club stays a proposal and links to the 5 Chạm journey", () => {
    render(<ClubProposal />);
    expect(screen.getByRole("link", { name: /KHÁM PHÁ MÔ HÌNH 5 CHẠM/ })).toHaveAttribute("href", "/#nam-cham");
    fireEvent.click(screen.getByRole("button", { name: /TÌM HIỂU ĐỀ XUẤT/ }));
    expect(screen.getAllByText("MÔ HÌNH ĐỀ XUẤT – ĐANG ĐỂ NGỎ").length).toBe(2);
    expect(document.body.textContent).not.toMatch(/đã thành lập/);
  });
});
