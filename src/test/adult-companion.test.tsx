import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
vi.mock("@tanstack/react-router", () => ({ Link: ({ to, hash, children, ...props }: { to: string; hash?: string; children: React.ReactNode }) => <a href={hash ? `${to}#${hash}` : to} {...props}>{children}</a> }));
import { ListeningWeek } from "@/components/adult-companion/listening-week";
import { ScenarioRoom } from "@/components/adult-companion/scenario-room";
import { ADULT_SCENARIOS, LISTENING_DAYS, SUPPORT_STEPS, adultResources, listeningProgress } from "@/components/adult-companion/data";

afterEach(() => { cleanup(); vi.restoreAllMocks(); });
describe("Adult companion rules", () => {
  it("tracks exactly seven days, supports deselection and resets without persistence", () => {
    const storage = vi.spyOn(Storage.prototype, "setItem");
    const view = render(<ListeningWeek />);
    expect(LISTENING_DAYS).toHaveLength(7);
    const boxes = screen.getAllByRole("checkbox");
    boxes.forEach(box => fireEvent.click(box));
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "7");
    expect(listeningProgress([true, true, true, true, true, true, true])).toEqual({ completed: 7, percent: 100 });
    fireEvent.click(boxes[0]);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "6");
    fireEvent.click(screen.getByRole("button", { name: "Bắt đầu lại" }));
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "0");
    expect(storage).not.toHaveBeenCalled();
    fireEvent.click(boxes[1]);
    view.unmount(); render(<ListeningWeek />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "0");
  });
  it("offers three responses for each of five cases, with urgent safety before answering", () => {
    expect(ADULT_SCENARIOS).toHaveLength(5);
    expect(ADULT_SCENARIOS.every(s => s.options.length === 3)).toBe(true);
    expect(ADULT_SCENARIOS[4]?.urgent).toBe(true);
    render(<ScenarioRoom />);
    fireEvent.click(screen.getByRole("button", { name: "5. Khi học sinh không an toàn" }));
    expect(screen.getByRole("alert")).toBeVisible();
    expect(screen.queryByRole("region", { name: "Phân tích cách phản hồi" })).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: /B\. Bình tĩnh lắng nghe/ }));
    expect(screen.getByRole("region", { name: "Phân tích cách phản hồi" })).toBeVisible();
  });
  it("does not fabricate parent/teacher resources and includes only existing common links", () => {
    expect(adultResources("cha-me")).toEqual([]);
    expect(adultResources("giao-vien")).toEqual([]);
    expect(adultResources("chung").map(d => d.id)).toEqual(["quy-trinh", "nguon-tro-giup", "ban-do-diem-tua"]);
    expect(adultResources("chung").every(d => Boolean(d.view || d.downloadUrl))).toBe(true);
  });
  it("keeps the five support steps in the requested order", () => {
    expect(SUPPORT_STEPS.map(s => s.title)).toEqual(["LẮNG NGHE", "THẤU HIỂU", "KẾT NỐI", "HỖ TRỢ", "THEO DÕI"]);
  });
});