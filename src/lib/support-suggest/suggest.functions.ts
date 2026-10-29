import { createServerFn } from "@tanstack/react-start";
import { MAX_SHARE_LENGTH } from "./catalog";
import { suggestSupport } from "./suggest.server";

export const getSupportSuggestion = createServerFn({ method: "POST" })
  .validator((input: { text: string }) => {
    const text = typeof input?.text === "string" ? input.text.trim() : "";
    if (text.length < 3) throw new Error("Bạn hãy viết thêm một chút nhé.");
    return { text: text.slice(0, MAX_SHARE_LENGTH) };
  })
  .handler(async ({ data }) => suggestSupport(data.text));
