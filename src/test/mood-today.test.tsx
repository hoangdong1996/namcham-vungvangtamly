import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
vi.mock("@tanstack/react-router", () => ({ Link: ({ children, to, hash, ...p }: any) => <a href={`${to}${hash ? "#" + hash : ""}`} {...p}>{children}</a> }));
import { MoodToday } from "@/components/home/mood-today";
describe("Tâm trạng hôm nay", () => {
  it("shows a self-care suggestion linked to a real tool when a mood is picked", () => {
    render(<MoodToday />);
    fireEvent.click(screen.getByRole("button", { name: /Căng thẳng/ }));
    expect(screen.getByRole("link", { name: /Nút dừng bình tĩnh/ }).getAttribute("href")).toBe("/vung-vang#nut-dung");
  });
  it("never stores the chosen mood", () => {
    const spy = vi.spyOn(Storage.prototype, "setItem");
    render(<MoodToday />);
    fireEvent.click(screen.getByRole("button", { name: /Buồn/ }));
    expect(spy).not.toHaveBeenCalled();
  });
});
