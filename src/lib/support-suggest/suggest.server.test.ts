import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ streamText: vi.fn(), responses: vi.fn() }));
vi.mock("@ai-sdk/openai", () => ({ createOpenAI: () => ({ responses: mocks.responses }) }));
vi.mock("ai", () => ({
  streamText: mocks.streamText,
  Output: { object: vi.fn() },
  NoObjectGeneratedError: { isInstance: (error: unknown) => Boolean((error as { noObject?: boolean })?.noObject) },
}));
import { suggestSupport } from "./suggest.server";

describe("Pressure sharing AI failure safety", () => {
  beforeEach(() => {
    vi.stubEnv("LOVABLE_API_KEY", "test-only-not-a-key");
    vi.spyOn(console, "error").mockImplementation(() => {});
    mocks.streamText.mockReset();
  });
  afterEach(() => { vi.restoreAllMocks(); vi.unstubAllEnvs(); });

  it.each([
    [429, "Hệ thống đang bận, bạn thử lại sau ít phút nhé."],
    [402, "Tính năng gợi ý tạm hết lượt sử dụng."],
    [403, "Chưa tạo được gợi ý lúc này."],
    [500, "Chưa tạo được gợi ý lúc này."],
  ])("handles simulated AI status %s without logging shared text or retrying", async (statusCode, message) => {
    const privateText = "private-test-sentinel";
    mocks.streamText.mockImplementation(() => ({ output: Promise.reject({ statusCode, message: privateText }) }));
    await expect(suggestSupport(privateText)).rejects.toThrow(message);
    expect(mocks.streamText).toHaveBeenCalledTimes(1);
    expect(JSON.stringify(vi.mocked(console.error).mock.calls)).not.toContain(privateText);
    expect(mocks.streamText.mock.calls[0]?.[0]).toMatchObject({
      maxRetries: 0,
      providerOptions: { openai: { store: false } },
    });
  });

  it("ends a simulated refusal with urgent adult-support guidance", async () => {
    mocks.streamText.mockImplementation(() => ({ output: Promise.reject({ noObject: true, finishReason: "content-filter" }) }));
    await expect(suggestSupport("private-test-sentinel")).resolves.toMatchObject({ urgent: true, exercises: ["ban-do"] });
    expect(mocks.streamText).toHaveBeenCalledTimes(1);
    expect(JSON.stringify(vi.mocked(console.error).mock.calls)).not.toContain("private-test-sentinel");
  });
});