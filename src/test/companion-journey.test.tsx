import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CompanionJourney } from "@/components/cham-five/companion-journey";
import { SupportMap } from "@/components/cham-five/support-map";
import { ClubProposal } from "@/components/cham-five/club-proposal";
import { CONTACTS } from "@/components/cham-five/companion-data";
import { GROUPS } from "@/components/cham-five/data";

vi.mock("@tanstack/react-router", () => ({ Link: ({ to, hash, children }: { to: string; hash?: string; children: React.ReactNode }) => <a href={hash ? `${to}#${hash}` : to}>{children}</a> }));

describe("Hành trình đồng hành an toàn", () => {
  it("opens and collapses all five guides", () => {
    render(<CompanionJourney />);
    const buttons = screen.getAllByRole("button", { name: "Khám phá cách thực hiện" });
    expect(buttons).toHaveLength(5);
    buttons.forEach((button, index) => {
      fireEvent.click(button);
      expect(screen.getByRole("region", { name: `Hướng dẫn bước ${index + 1}` })).toBeTruthy();
      fireEvent.click(screen.getByRole("button", { name: "Thu gọn" }));
      expect(screen.queryByRole("region", { name: `Hướng dẫn bước ${index + 1}` })).toBeNull();
    });
  });
  it("cycles caring greetings and explains every comparison phrase", () => {
    render(<CompanionJourney />);
    const buttons = screen.getAllByRole("button", { name: "Khám phá cách thực hiện" });
    const first = buttons[0];
    const second = buttons[1];
    if (!first || !second) throw new Error("Missing journey steps");
    fireEvent.click(first);
    fireEvent.click(screen.getByRole("button", { name: "Thử một lời hỏi thăm" }));
    const greeting = screen.getByRole("status").textContent;
    fireEvent.click(screen.getByRole("button", { name: "Thử một lời hỏi thăm" }));
    expect(screen.getByRole("status").textContent).not.toBe(greeting);
    fireEvent.click(second);
    const panel = screen.getByRole("region", { name: "Hướng dẫn bước 2" });
    const phrases = within(panel).getAllByRole("button").filter((button) => button.textContent?.startsWith("“"));
    expect(phrases).toHaveLength(6);
    const explanations = new Set<string | null>();
    phrases.forEach((button) => { fireEvent.click(button); explanations.add(within(panel).getByRole("status").textContent); });
    expect(explanations.size).toBe(6);
  });
  it("shows immediate feedback for A, B, C and allows multiple principles", () => {
    render(<CompanionJourney />);
    for (const [key, text] of [["A", "bị xem nhẹ"], ["B", "tôn trọng quyền lựa chọn"], ["C", "không an toàn"]]) {
      fireEvent.click(screen.getByRole("button", { name: new RegExp(`^${key}\\.`) }));
      expect(screen.getByRole("status").textContent).toContain(text);
    }
    const listening = screen.getByRole("button", { name: "Lắng nghe chân thành." });
    const respect = screen.getByRole("button", { name: "Tôn trọng cảm xúc." });
    fireEvent.click(listening);
    fireEvent.click(respect);
    expect(listening).toHaveAttribute("aria-pressed", "true");
    expect(respect).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(listening);
    expect(listening).toHaveAttribute("aria-pressed", "false");
    expect(respect).toHaveAttribute("aria-pressed", "true");
  });
  it("all eight contact buttons open the correct existing map detail", () => {
    render(<><SupportMap /><CompanionJourney /></>);
    const fourth = screen.getAllByRole("button", { name: "Khám phá cách thực hiện" })[3];
    if (!fourth) throw new Error("Missing connection step");
    fireEvent.click(fourth);
    const buttons = screen.getAllByRole("button", { name: "Tìm hiểu cách liên hệ" });
    expect(buttons).toHaveLength(8);
    CONTACTS.forEach((contact, index) => {
      const person = GROUPS.flatMap((group) => group.people).find((p) => p.id === contact.id);
      const button = buttons[index];
      if (!person || !button) throw new Error(`Missing contact ${contact.id}`);
      fireEvent.click(button);
      expect(screen.getByRole("region", { name: person.name })).toBeTruthy();
    });
  });
  it("safety guidance is available before any answers and club button opens the proposal", () => {
    render(<><CompanionJourney /><ClubProposal /></>);
    expect(screen.getByRole("complementary")).toBeVisible();
    expect(screen.queryByRole("region", { name: "Hướng dẫn bước 4" })).toBeNull();
    act(() => fireEvent.click(screen.getByRole("button", { name: "KHÁM PHÁ MÔ HÌNH CLB 5 CHẠM" })));
    expect(screen.getByRole("button", { name: /TÌM HIỂU ĐỀ XUẤT CÂU LẠC BỘ/ })).toHaveAttribute("aria-expanded", "true");
  });
});