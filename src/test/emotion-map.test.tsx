import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { EmotionMap } from "@/components/cham-one/emotion-map";
import { MAP_EMOTIONS, emotionMapTip } from "@/components/cham-one/emotion-map-data";

function openPractice() {
  fireEvent.click(screen.getByRole("button", { name: /Bản đồ cảm xúc của tôi/ }));
}
function selectAndSubmit() {
  fireEvent.click(screen.getByRole("button", { name: "Lo lắng", exact: true }));
  fireEvent.click(screen.getByRole("button", { name: "Học tập", exact: true }));
  fireEvent.click(screen.getByRole("button", { name: "Tạo bản đồ cảm xúc" }));
}

afterEach(() => vi.restoreAllMocks());

describe("Chạm 1 emotion map", () => {
  it("offers all nine requested emotions and switches the selection", () => {
    render(<EmotionMap />); openPractice();
    expect(MAP_EMOTIONS.map((entry) => entry.label)).toEqual(["Vui vẻ", "Bình yên", "Hào hứng", "Lo lắng", "Buồn bã", "Tức giận", "Cô đơn", "Mệt mỏi", "Cảm xúc khác"]);
    for (const entry of MAP_EMOTIONS) {
      fireEvent.click(screen.getByRole("button", { name: entry.label, exact: true }));
      expect(screen.getByRole("button", { name: entry.label, exact: true })).toHaveAttribute("aria-pressed", "true");
    }
    expect(screen.getByRole("button", { name: "Vui vẻ", exact: true })).toHaveAttribute("aria-pressed", "false");
  });

  it("supports intensity 1–5 and shows the concrete chosen value", () => {
    render(<EmotionMap />); openPractice();
    const slider = screen.getByRole("slider", { name: "Mức độ cảm xúc" });
    expect(slider).toHaveAttribute("min", "1");
    expect(slider).toHaveAttribute("max", "5");
    expect(slider).toHaveAttribute("step", "1");
    fireEvent.change(slider, { target: { value: "5" } });
    selectAndSubmit();
    expect(screen.getByRole("region", { name: "Bản đồ cảm xúc đã tạo" }).textContent).toContain("5 / 5");
  });

  it("requires emotion and causes, supports all six causes, and optional sharing", () => {
    render(<EmotionMap />); openPractice();
    expect(screen.getByRole("button", { name: "Tạo bản đồ cảm xúc" })).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: "Bình yên", exact: true }));
    expect(screen.getByRole("button", { name: "Tạo bản đồ cảm xúc" })).toBeDisabled();
    for (const cause of ["Học tập", "Gia đình", "Bạn bè", "Mạng xã hội", "Bản thân", "Chưa xác định"]) fireEvent.click(screen.getByRole("button", { name: cause, exact: true }));
    fireEvent.click(screen.getByRole("button", { name: "Tạo bản đồ cảm xúc" }));
    const map = screen.getByRole("region", { name: "Bản đồ cảm xúc đã tạo" });
    for (const cause of ["Học tập", "Gia đình", "Bạn bè", "Mạng xã hội", "Bản thân", "Chưa xác định"]) expect(within(map).getByText(cause)).toBeInTheDocument();
  });

  it("shows different supportive tips by emotion and adult support for strong difficult feelings", () => {
    expect(emotionMapTip("happy", 5)).not.toEqual(emotionMapTip("sad", 5));
    expect(emotionMapTip("sad", 4)).toContain("người lớn đáng tin cậy");
    expect(emotionMapTip("sad", 3)).not.toContain("người lớn đáng tin cậy");
  });

  it("clears every answer on reset, close and remount, with no network or browser persistence", () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const localSpy = vi.spyOn(Storage.prototype, "setItem");
    const { unmount } = render(<EmotionMap />); openPractice();
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "Nội dung thử nghiệm không nhận diện" } });
    selectAndSubmit();
    expect(screen.getByText("Nội dung thử nghiệm không nhận diện")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Làm lại" }));
    expect(screen.getByRole("textbox")).toHaveValue("");
    expect(screen.getByRole("slider")).toHaveValue("3");
    expect(screen.getByRole("button", { name: "Lo lắng", exact: true })).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByRole("button", { name: "Học tập", exact: true })).toHaveAttribute("aria-pressed", "false");
    selectAndSubmit();
    fireEvent.click(screen.getByRole("button", { name: "Quay về Chạm 1" }));
    openPractice();
    expect(screen.getByRole("button", { name: "Tạo bản đồ cảm xúc" })).toBeDisabled();
    unmount(); render(<EmotionMap />); openPractice();
    expect(screen.getByRole("textbox")).toHaveValue("");
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(localSpy).not.toHaveBeenCalled();
  });
});