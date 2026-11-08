import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Eye, FileText, FolderHeart, Image as ImageIcon, Loader2, LogOut, Presentation, Search, Trash2, Upload, X } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { ACCEPT, KIND_LABELS, MAX_BYTES, detectKind, formatSize, type FileKind } from "./file-kinds";

type Doc = { id: string; name: string; storage_path: string; mime_type: string; kind: string; size_bytes: number; created_at: string };
type Mode = "public" | "private";
const CFG = {
  public: { table: "public_documents", bucket: "public-library", id: "thu-vien-cong-khai", title: "Thư viện công khai", desc: "Tài liệu mọi người đều xem và tải được. Chỉ quản trị viên thêm, sửa, xóa." },
  private: { table: "my_documents", bucket: "my-documents", id: "tai-lieu-cua-toi", title: "Tài liệu của tôi", desc: "Không gian riêng tư: chỉ bạn xem được các tài liệu do bạn tải lên." },
} as const;
const SIGNED_TTL = 300;
const KIND_ICON: Record<FileKind, typeof FileText> = { pdf: FileText, word: FileText, powerpoint: Presentation, image: ImageIcon };

export function PublicLibrary() {
  return <DocArea mode="public" />;
}

export function MyDocuments() {
  return <DocArea mode="private" />;
}

function DocArea({ mode }: { mode: Mode }) {
  const C = CFG[mode];
  const BUCKET = C.bucket;
  const [docs, setDocs] = useState<Doc[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [kind, setKind] = useState<FileKind | "all">("all");
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [preview, setPreview] = useState<{ doc: Doc; url: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const canManage = mode === "public" ? isAdmin : !!user;
  const load = useCallback(async (uid?: string | null) => {
    if (mode === "private" && !uid) { setDocs([]); setLoading(false); return; }
    let qy = supabase.from(C.table).select("*").order("created_at", { ascending: false });
    if (mode === "private") qy = qy.eq("uploaded_by", uid!);
    const { data } = await qy;
    setDocs((data as Doc[]) ?? []);
    setLoading(false);
  }, [mode, C.table]);

  useEffect(() => {
    const check = async (u: User | null) => {
      setUser(u);
      load(u?.id ?? null);
      if (!u) return setIsAdmin(false);
      const { data } = await supabase.from("user_roles").select("role").eq("user_id", u.id).eq("role", "admin").maybeSingle();
      setIsAdmin(!!data);
    };
    supabase.auth.getUser().then(({ data }) => check(data.user));
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") check(session?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, [load]);

  const shown = useMemo(() => {
    const t = q.trim().toLowerCase();
    return docs.filter((d) => (kind === "all" || d.kind === kind) && (!t || d.name.toLowerCase().includes(t)));
  }, [docs, q, kind]);

  async function upload(files: FileList | null) {
    if (!files?.length || !user) return;
    setUploading(true);
    setMsg(null);
    let ok = 0;
    const errors: string[] = [];
    for (const file of Array.from(files)) {
      const k = detectKind(file.name);
      if (!k) { errors.push(`${file.name}: định dạng không hỗ trợ`); continue; }
      if (file.size > MAX_BYTES) { errors.push(`${file.name}: vượt quá 20 MB`); continue; }
      const ext = file.name.split(".").pop()!.toLowerCase();
      const path = mode === "private" ? `${user.id}/${crypto.randomUUID()}.${ext}` : `${crypto.randomUUID()}.${ext}`;
      const up = await supabase.storage.from(BUCKET).upload(path, file, file.type ? { contentType: file.type } : {});
      if (up.error) { errors.push(`${file.name}: không tải lên được`); continue; }
      const ins = await supabase.from(C.table).insert({ name: file.name, storage_path: path, mime_type: file.type, kind: k, size_bytes: file.size });
      if (ins.error) { await supabase.storage.from(BUCKET).remove([path]); errors.push(`${file.name}: không lưu được`); continue; }
      ok++;
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
    setMsg(errors.length ? { ok: false, text: `${ok ? `Đã tải lên ${ok} tệp. ` : ""}${errors.join("; ")}` } : { ok: true, text: `Đã tải lên ${ok} tệp.` });
    load(user.id);
  }

  async function rename(doc: Doc) {
    const name = window.prompt("Tên mới cho tài liệu", doc.name)?.trim();
    if (!name || name === doc.name) return;
    await supabase.from(C.table).update({ name }).eq("id", doc.id);
    load(user?.id);
  }

  async function open(doc: Doc) {
    const { data } = await supabase.storage.from(BUCKET).createSignedUrl(doc.storage_path, SIGNED_TTL);
    if (data?.signedUrl) setPreview({ doc, url: data.signedUrl });
  }

  async function remove(doc: Doc) {
    if (!window.confirm(`Xóa tài liệu "${doc.name}"?`)) return;
    await supabase.storage.from(BUCKET).remove([doc.storage_path]);
    await supabase.from(C.table).delete().eq("id", doc.id);
    load(user?.id);
  }

  return (
    <section id={C.id} aria-labelledby={`${C.id}-title`} className="rounded-[2rem] border-2 border-pink-band bg-pink-soft/60 p-5 shadow-sm sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-mint text-primary"><FolderHeart className="h-6 w-6" aria-hidden="true" /></span>
          <div>
            <h2 id={`${C.id}-title`} className="font-display text-2xl font-bold text-green-deep">{C.title}</h2>
            <p className="text-foreground/75">{C.desc}</p>
          </div>
        </div>
        {user && (
          <button type="button" onClick={() => supabase.auth.signOut()} className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground/75 hover:bg-muted"><LogOut className="h-4 w-4" aria-hidden="true" />Đăng xuất</button>
        )}
      </div>

      <div className="mt-5">
        {canManage ? (
          <div className="rounded-3xl border-2 border-dashed border-primary/50 bg-card p-5 text-center">
            <input ref={fileRef} id={`${C.id}-file`} type="file" multiple accept={ACCEPT} className="sr-only" onChange={(e) => upload(e.target.files)} />
            <label htmlFor={`${C.id}-file`} className={`inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-bold text-primary-foreground transition-transform hover:-translate-y-0.5 ${uploading ? "pointer-events-none opacity-70" : ""}`}>
              {uploading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Upload className="h-4 w-4" aria-hidden="true" />}
              {uploading ? "Đang tải lên…" : "Tải lên tài liệu mới"}
            </label>
            <p className="mt-2 text-sm text-foreground/70">PDF, Word, PowerPoint, hình ảnh (JPG, PNG, GIF, WEBP) – tối đa 20 MB mỗi tệp</p>
            {msg && <p role="status" className={`mt-2 text-sm font-semibold ${msg.ok ? "text-primary" : "text-destructive"}`}>{msg.text}</p>}
          </div>
        ) : mode === "public" ? null : (
          <OwnerSignIn />
        )}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative block flex-1">
          <span className="sr-only">Tìm trong {C.title.toLowerCase()}</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Tìm theo tên tệp…" className="w-full rounded-full border border-input bg-background py-2.5 pl-12 pr-4 outline-none focus-visible:ring-2 focus-visible:ring-primary" />
        </label>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Lọc theo định dạng">
          {(["all", "pdf", "word", "powerpoint", "image"] as const).map((k) => (
            <button key={k} type="button" aria-pressed={kind === k} onClick={() => setKind(k)} className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${kind === k ? "bg-primary text-primary-foreground" : "bg-card text-green-deep hover:bg-mint"}`}>{k === "all" ? "Tất cả" : KIND_LABELS[k]}</button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="mt-5 text-center text-foreground/70"><Loader2 className="inline h-4 w-4 animate-spin" aria-hidden="true" /> Đang tải danh sách…</p>
      ) : shown.length === 0 ? (
        <p className="mt-5 rounded-2xl border border-dashed border-border bg-card px-5 py-6 text-center text-foreground/70">{docs.length ? "Không có tệp phù hợp." : mode === "private" && !user ? "Đăng nhập để xem tài liệu riêng của bạn." : "Chưa có tài liệu nào được tải lên."}</p>
      ) : (
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((d) => {
            const Icon = KIND_ICON[d.kind as FileKind] ?? FileText;
            return (
              <li key={d.id} className="flex flex-col rounded-3xl border border-border bg-card p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="break-words font-semibold leading-snug">{d.name}</p>
                    <p className="mt-1 text-xs text-foreground/65">{KIND_LABELS[d.kind as FileKind] ?? d.kind} · {formatSize(d.size_bytes)} · {new Date(d.created_at).toLocaleDateString("vi-VN")}</p>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button type="button" onClick={() => open(d)} className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-sm font-bold text-primary-foreground"><Eye className="h-4 w-4" aria-hidden="true" />Xem trước</button>
                  {canManage && <button type="button" onClick={() => rename(d)} aria-label={`Đổi tên ${d.name}`} className="rounded-full border border-border px-3 py-1.5 text-sm hover:bg-muted">Đổi tên</button>}
                  {canManage && <button type="button" onClick={() => remove(d)} aria-label={`Xóa ${d.name}`} className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-sm text-destructive hover:bg-muted"><Trash2 className="h-4 w-4" aria-hidden="true" />Xóa</button>}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {preview && <PreviewDialog doc={preview.doc} url={preview.url} onClose={() => setPreview(null)} />}
    </section>
  );
}

function PreviewDialog({ doc, url, onClose }: { doc: Doc; url: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  const office = doc.kind === "word" || doc.kind === "powerpoint";
  return (
    <div role="dialog" aria-modal="true" aria-label={`Xem trước ${doc.name}`} className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 p-3" onClick={onClose}>
      <div className="flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-card" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
          <p className="truncate font-semibold">{doc.name}</p>
          <div className="flex shrink-0 gap-2">
            <a href={url} target="_blank" rel="noreferrer" className="rounded-full border border-primary px-3 py-1 text-sm font-bold text-primary">Mở tab mới</a>
            <button type="button" onClick={onClose} aria-label="Đóng" className="rounded-full p-1.5 hover:bg-muted"><X className="h-5 w-5" /></button>
          </div>
        </div>
        <div className="flex-1 bg-muted">
          {doc.kind === "image" ? (
            <img src={url} alt={doc.name} className="h-full w-full object-contain" />
          ) : (
            <iframe title={doc.name} src={office ? `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}` : url} className="h-full w-full border-0" />
          )}
        </div>
      </div>
    </div>
  );
}

function OwnerSignIn() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setNote(null);
    if (mode === "in") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setNote("Email hoặc mật khẩu chưa đúng.");
    } else {
      const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/tai-lieu` } });
      setNote(error ? "Không tạo được tài khoản. Vui lòng thử lại." : "Đã gửi email xác nhận. Hãy mở email và bấm vào liên kết, sau đó đăng nhập.");
    }
    setBusy(false);
  }

  return (
    <form onSubmit={submit} className="rounded-3xl bg-card p-4 sm:p-5">
      <p className="text-sm text-foreground/75">Đăng nhập để tải lên và xem tài liệu riêng của bạn. Người khác không xem được các tài liệu này.</p>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input type="email" required autoComplete="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1 rounded-full border border-input bg-background px-4 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary" />
        <input type="password" required minLength={6} autoComplete={mode === "in" ? "current-password" : "new-password"} placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} className="flex-1 rounded-full border border-input bg-background px-4 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary" />
        <button type="submit" disabled={busy} className="rounded-full bg-primary px-5 py-2 font-bold text-primary-foreground disabled:opacity-70">{mode === "in" ? "Đăng nhập" : "Tạo tài khoản"}</button>
      </div>
      <button type="button" onClick={() => setMode(mode === "in" ? "up" : "in")} className="mt-2 text-sm font-semibold text-plum underline-offset-2 hover:underline">{mode === "in" ? "Chưa có tài khoản? Tạo tài khoản" : "Đã có tài khoản? Đăng nhập"}</button>
      {note && <p role="status" className="mt-2 text-sm text-foreground/80">{note}</p>}
    </form>
  );
}
