import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { AnchorHTMLAttributes, ReactNode } from "react";

vi.mock("@tanstack/react-router", () => ({
  Link: ({ to, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { to: string; children: ReactNode }) => <a href={to} {...props}>{children}</a>,
}));
import { ModelConnections } from "@/components/home/model-connections";

afterEach(() => vi.unstubAllGlobals());

describe("Năm điểm chạm kết nối", () => {
  it.each([
    [1, "LẮNG NGHE", "/lang-nghe"],
    [2, "THẤU HIỂU", "/hieu-minh"],
    [3, "VỮNG VÀNG", "/vung-vang"],
    [4, "KẾT NỐI", "/ket-noi"],
    [5, "ĐIỂM TỰA", "/diem-tua"],
  ])("keeps point %i connected to %s", (number, title, path) => {
    render(<ModelConnections />);
    expect(screen.getByRole("link", { name: `Chạm ${number} – ${title}` })).toHaveAttribute("href", path);
  });

  it("reveals only on first entry and disconnects without replaying", () => {
    let notify: IntersectionObserverCallback | undefined;
    const disconnect = vi.fn();
    vi.stubGlobal("IntersectionObserver", class {
      constructor(callback: IntersectionObserverCallback) { notify = callback; }
      observe = vi.fn();
      disconnect = disconnect;
    });
    render(<ModelConnections />);
    const row = screen.getByRole("list", { name: "Năm điểm chạm kết nối" });
    expect(row).toHaveAttribute("data-motion", "pending");
    const entry = (isIntersecting: boolean) => act(() => notify?.([{ isIntersecting } as IntersectionObserverEntry], {} as IntersectionObserver));
    entry(false);
    expect(row).toHaveAttribute("data-motion", "pending");
    entry(true);
    expect(row).toHaveAttribute("data-motion", "started");
    expect(disconnect).toHaveBeenCalledTimes(1);
    entry(false);
    entry(true);
    expect(disconnect).toHaveBeenCalledTimes(1);
  });

  it("uses a static model without observing when motion is reduced", () => {
    const observer = vi.fn();
    vi.stubGlobal("matchMedia", () => ({ matches: true }));
    vi.stubGlobal("IntersectionObserver", observer);
    render(<ModelConnections />);
    expect(screen.getByRole("list", { name: "Năm điểm chạm kết nối" })).toHaveAttribute("data-motion", "static");
    expect(observer).not.toHaveBeenCalled();
  });
});