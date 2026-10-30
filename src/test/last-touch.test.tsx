import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
vi.mock("@tanstack/react-router", () => ({ Link: ({ children, to, hash, ...props }: { children: React.ReactNode; to: string; hash?: string }) => <a href={`${to}${hash ? `#${hash}` : ""}`} {...props}>{children}</a> }));
import { OpenLetter } from "@/components/home/open-letter";
import { LastTouch } from "@/components/home/last-touch";

describe("Last Touch privacy and navigation", () => {
  it("does not allow letter delivery without a real reception service", () => {
    render(<OpenLetter />);
    fireEvent.change(screen.getByLabelText("Lời nhắn của bạn"), { target: { value: "Một ý tưởng cho hoạt động" } });
    expect(screen.getByRole("button", { name: "Gửi lời nhắn" })).toBeDisabled();
  });
  it("does not persist or transmit a draft and clears it on request", () => {
    const storage = vi.spyOn(Storage.prototype, "setItem");
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    render(<OpenLetter />);
    fireEvent.click(screen.getByRole("button", { name: "Góp ý cho website" }));
    fireEvent.change(screen.getByLabelText("Lời nhắn của bạn"), { target: { value: "Một ý tưởng cho hoạt động" } });
    expect(storage).not.toHaveBeenCalled();
    expect(fetchSpy).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Xóa nội dung" }));
    expect(screen.getByLabelText("Lời nhắn của bạn")).toHaveValue("");
  });
  it("makes safety help accessible without writing a letter", () => {
    render(<OpenLetter />);
    expect(screen.getByRole("link", { name: "Tìm nguồn trợ giúp" })).toHaveAttribute("href", "/diem-tua#nguon-tro-giup");
  });
  it("links each selected touch to its existing page", () => {
    render(<LastTouch />);
    const names = ["Lắng nghe", "Thấu hiểu", "Vững vàng", "Kết nối", "Điểm tựa"];
    const paths = ["/lang-nghe", "/hieu-minh", "/vung-vang", "/ket-noi", "/diem-tua"];
    names.forEach((name, index) => {
      fireEvent.click(screen.getByRole("button", { name: new RegExp(name) }));
      expect(screen.getByRole("link", { name: `Đến Chạm ${index + 1}` })).toHaveAttribute("href", paths[index]);
    });
  });
});