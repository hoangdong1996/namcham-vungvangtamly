import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Clock, Download, ExternalLink, FileText, FlaskConical, HeartHandshake, LifeBuoy, NotebookPen, Search, Smartphone, Users } from "lucide-react";
import { MyDocuments, PublicLibrary } from "@/components/library/my-documents";
import { DOC_GROUPS, LIBRARY_DOCS, type DocGroupId } from "@/components/library/data";

export const Route = createFileRoute("/tai-lieu")({
  head: () => ({
    meta: [
      { title: "Thư viện tài liệu | 5 CHẠM – Vững vàng tâm lý" },
      { name: "description", content: "Cơ sở khoa học, công cụ thực hành và sản phẩm nghiên cứu chăm sóc sức khỏe tinh thần cho học sinh THPT." },
      { property: "og:title", content: "Thư viện tài liệu | 5 CHẠM" },
      { property: "og:description", content: "Cơ sở khoa học – Công cụ thực hành – Sản phẩm nghiên cứu." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LibraryPage,
});

const ICONS: Record<DocGroupId, typeof BookOpen> = {
  "nghien-cuu": FlaskConical, "so-tay": NotebookPen, phieu: HeartHandshake, "khong-gian-so": Smartphone, clb: Users, "tham-khao": LifeBuoy,
};

function LibraryPage() {
  const [q, setQ] = useState("");
  const [group, setGroup] = useState<DocGroupId | "all">("all");
  const docs = useMemo(() => {
    const term = q.trim().toLowerCase();
    return LIBRARY_DOCS.filter((d) => d.visible && (group === "all" || d.group === group) && (!term || d.title.toLowerCase().includes(term) || d.desc.toLowerCase().includes(term)));
  }, [q, group]);
  const groups = DOC_GROUPS.filter((g) => group === "all" || g.id === group);

  return (
    <main>
      <section className="hero-gradient px-4 py-14 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-1.5 text-sm font-bold text-primary shadow-sm"><BookOpen className="h-4 w-4" aria-hidden="true" />Tài liệu</span>
        <h1 className="mt-4 font-display text-4xl font-extrabold text-green-deep sm:text-5xl">THƯ VIỆN TÀI LIỆU</h1>
        <p className="mt-2 font-display text-lg font-bold text-plum sm:text-xl">Cơ sở khoa học – Công cụ thực hành – Sản phẩm nghiên cứu</p>
        <p className="mx-auto mt-4 max-w-3xl leading-relaxed text-foreground/80">“Không gian tổng hợp các tài liệu, công cụ thực hành và sản phẩm phục vụ hoạt động chăm sóc sức khỏe tinh thần, phòng ngừa nguy cơ trầm cảm và hỗ trợ tâm lý học đường cho học sinh THPT.”</p>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-10"><PublicLibrary /></div>
        <div className="mb-10"><MyDocuments /></div>
        <div className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-4 shadow-sm sm:p-5">
          <label className="relative block">
            <span className="sr-only">Tìm theo tên tài liệu</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Tìm theo tên tài liệu…" className="w-full rounded-full border border-input bg-background py-3 pl-12 pr-4 text-base outline-none focus-visible:ring-2 focus-visible:ring-primary" />
          </label>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Lọc theo nhóm tài liệu">
            {[{ id: "all" as const, title: "Tất cả" }, ...DOC_GROUPS].map((g) => (
              <button key={g.id} type="button" aria-pressed={group === g.id} onClick={() => setGroup(g.id)} className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${group === g.id ? "bg-primary text-primary-foreground" : "bg-mint-soft text-green-deep hover:bg-mint"}`}>{g.title}</button>
            ))}
          </div>
        </div>

        <div className="mt-10 space-y-12">
          {groups.map((g, gi) => {
            const Icon = ICONS[g.id];
            const items = docs.filter((d) => d.group === g.id);
            const isClub = g.id === "clb";
            return (
              <section key={g.id} aria-labelledby={`nhom-${g.id}`}>
                <div className="flex items-start gap-3">
                  <span className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${isClub ? "bg-club-soft text-club" : gi % 2 ? "bg-pink-band text-plum" : "bg-mint text-primary"}`}><Icon className="h-6 w-6" aria-hidden="true" /></span>
                  <div>
                    <h2 id={`nhom-${g.id}`} className={`font-display text-2xl font-bold ${isClub ? "text-club-ink" : "text-green-deep"}`}>Nhóm {DOC_GROUPS.indexOf(g) + 1}. {g.title}</h2>
                    <p className="text-foreground/75">{g.desc}</p>
                  </div>
                </div>
                {isClub && <p className="mt-3 rounded-2xl bg-club-faint px-4 py-3 text-sm text-club-ink">Tài liệu phục vụ mô hình đề xuất – CLB chưa chính thức hoạt động. Học sinh không dùng tài liệu để tự chẩn đoán, điều trị hoặc thay thế vai trò của người lớn và chuyên gia phù hợp.</p>}
                {items.length === 0 ? (
                  <p className="mt-5 rounded-2xl border border-dashed border-border bg-card px-5 py-6 text-center text-foreground/70">Không có tài liệu phù hợp trong nhóm này.</p>
                ) : (
                  <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((d) => (
                      <li key={d.id} className={`flex flex-col rounded-3xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md ${isClub ? "border-club-soft" : "border-border"}`}>
                        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-foreground/70"><FileText className="h-3.5 w-3.5" aria-hidden="true" />{d.format}</span>
                        <h3 className="mt-3 font-display text-lg font-bold leading-snug text-foreground">{d.title}</h3>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/75">{d.desc}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {d.view ? (
                            <Link to={d.view.to} {...(d.view.hash ? { hash: d.view.hash } : {})} className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5 ${isClub ? "bg-club" : "bg-primary"}`}>Xem tài liệu<ExternalLink className="h-4 w-4" aria-hidden="true" /></Link>
                          ) : (
                            <span className="inline-flex items-center gap-2 rounded-full bg-pink-soft px-4 py-2 text-sm font-semibold text-plum"><Clock className="h-4 w-4" aria-hidden="true" />Tài liệu sẽ được cập nhật sau</span>
                          )}
                          {d.downloadUrl && <a href={d.downloadUrl} download className="inline-flex items-center gap-2 rounded-full border border-primary px-4 py-2 text-sm font-bold text-primary"><Download className="h-4 w-4" aria-hidden="true" />Tải xuống</a>}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
