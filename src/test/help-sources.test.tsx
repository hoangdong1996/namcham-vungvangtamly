import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@tanstack/react-router", () => ({ Link: ({ to, hash, children, ...props }: any) => <a href={hash ? `${to}#${hash}` : to} {...props}>{children}</a> }));
import { HelpSources } from "@/components/cham-five/help-sources";
import { HELP_SOURCES } from "@/components/cham-five/help-sources-data";
import { SiteHeader } from "@/components/site-header";

describe("Help source access", () => {
  it.each(HELP_SOURCES)("opens $id and returns to the source list", (source) => {
    render(<HelpSources />);
    const button = screen.getByRole("button", { name: source.button });
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("region", { name: source.title })).toHaveFocus();
    fireEvent.click(screen.getByRole("button", { name: "Quay lại danh sách nguồn trợ giúp" }));
    expect(screen.queryByRole("region")).toBeNull();
    expect(button).toHaveFocus();
  });

  it("makes emergency guidance immediately accessible without personal input", () => {
    const { container } = render(<HelpSources />);
    const emergency = screen.getByRole("button", { name: "Xem hướng dẫn an toàn" });
    expect(emergency).toBeEnabled();
    fireEvent.click(emergency);
    expect(screen.getByRole("region", { name: "HỖ TRỢ KHI KHẨN CẤP" })).toBeVisible();
    expect(container.querySelectorAll("input, textarea, select, form")).toHaveLength(0);
  });

  it("links the heart to the existing help section and return actions to existing journeys", () => {
    render(<><SiteHeader /><HelpSources /></>);
    expect(screen.getByRole("link", { name: "Tìm điểm tựa" })).toHaveAttribute("href", "/diem-tua#nguon-tro-giup");
    expect(screen.getByRole("link", { name: /Quay lại Chạm 5/ })).toHaveAttribute("href", "/diem-tua#cham-5");
    expect(screen.getByRole("link", { name: /Khám phá hành trình 5 Chạm/ })).toHaveAttribute("href", "/#nam-cham");
  });
});