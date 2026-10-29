import { describe, it, expect } from "vitest";
import { detectKind } from "@/components/library/file-kinds";
describe("my documents formats", () => {
  it("accepts PDF, Word, PowerPoint and common images", () => {
    expect(detectKind("a.PDF")).toBe("pdf");
    expect(detectKind("b.docx")).toBe("word");
    expect(detectKind("c.ppt")).toBe("powerpoint");
    expect(detectKind("d.jpeg")).toBe("image");
  });
  it("rejects other formats", () => {
    expect(detectKind("virus.exe")).toBeNull();
    expect(detectKind("data.zip")).toBeNull();
  });
});
