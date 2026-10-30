import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ suggest: vi.fn() }));
vi.mock("@tanstack/react-start", () => ({ useServerFn: () => mocks.suggest }));
vi.mock("@/lib/support-suggest/suggest.functions", () => ({ getSupportSuggestion: vi.fn() }));
vi.mock("@tanstack/react-router", () => ({ Link: ({ to, hash, children, ...props }: { to: string; hash?: string; children: React.ReactNode }) => <a href={hash ? `${to}#${hash}` : to} {...props}>{children}</a> }));
import { SharePressure } from "@/components/cham-one/share-pressure";
import { AI_NETWORK_MESSAGE, presentSupportError } from "@/lib/support-safety";

describe("Student sharing safety rules", () => {
  beforeEach(() => { mocks.suggest.mockReset(); });
  afterEach(() => { cleanup(); vi.restoreAllMocks(); });

  it("requires a fresh click to retry a network failure, sending only once per click", async () => {
    mocks.suggest.mockRejectedValueOnce(new TypeError("Failed to fetch")).mockResolvedValueOnce({ message: "Test response", urgent: false, exercises: ["nut-dung"] });
    render(<SharePressure />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "test-only-scenario" } });
    fireEvent.click(screen.getByRole("button", { name: "Nhận gợi ý" }));
    await screen.findByRole("button", { name: "Thử lại" });
    expect(mocks.suggest).toHaveBeenCalledTimes(1);
    expect(presentSupportError(new TypeError("Failed to fetch"))).toEqual({ message: AI_NETWORK_MESSAGE, retryable: true });
    fireEvent.click(screen.getByRole("button", { name: "Thử lại" }));
    await waitFor(() => expect(mocks.suggest).toHaveBeenCalledTimes(2));
    expect(mocks.suggest).toHaveBeenLastCalledWith({ data: { text: "test-only-scenario" } });
  });

  it("does not offer transport retry for a terminal service failure", () => {
    expect(presentSupportError(new Error("Tính năng gợi ý tạm hết lượt sử dụng."))).toEqual({ message: "Tính năng gợi ý tạm hết lượt sử dụng.", retryable: false });
    expect(presentSupportError(new Error("private-provider-body"))).toEqual({ message: "Chưa tạo được gợi ý lúc này.", retryable: false });
  });

  it("keeps student text out of browser persistence and clears it when leaving", async () => {
    const local = vi.spyOn(Storage.prototype, "setItem");
    mocks.suggest.mockResolvedValue({ message: "Test response", urgent: true, exercises: ["ban-do"] });
    const view = render(<SharePressure />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "private-test-sentinel" } });
    fireEvent.click(screen.getByRole("button", { name: "Nhận gợi ý" }));
    await waitFor(() => expect(mocks.suggest).toHaveBeenCalledTimes(1));
    expect(local).not.toHaveBeenCalled();
    view.unmount();
    render(<SharePressure />);
    expect(screen.getByRole("textbox")).toHaveValue("");
  });
});