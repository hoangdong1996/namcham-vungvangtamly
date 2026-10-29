export type FileKind = "pdf" | "word" | "powerpoint" | "image";

export const KIND_LABELS: Record<FileKind, string> = {
  pdf: "PDF",
  word: "Word",
  powerpoint: "PowerPoint",
  image: "Hình ảnh",
};

const EXT: Record<string, FileKind> = {
  pdf: "pdf",
  doc: "word",
  docx: "word",
  ppt: "powerpoint",
  pptx: "powerpoint",
  jpg: "image",
  jpeg: "image",
  png: "image",
  gif: "image",
  webp: "image",
};

export const ACCEPT = Object.keys(EXT).map((e) => `.${e}`).join(",");
export const MAX_BYTES = 20 * 1024 * 1024;

/** Returns the file kind from its name, or null when the format is not supported. */
export function detectKind(fileName: string): FileKind | null {
  const ext = fileName.split(".").pop()?.toLowerCase() ?? "";
  return EXT[ext] ?? null;
}

export function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
