import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { adultResources, type AdultAudience } from "./data";

const AUDIENCES: { id: AdultAudience; title: string }[] = [{ id: "cha-me", title: "Dành cho cha mẹ" }, { id: "giao-vien", title: "Dành cho giáo viên" }, { id: "chung", title: "Tài liệu chung" }];
export function AdultResources() {
  const [audience, setAudience] = useState<AdultAudience>("chung");
  const resources = adultResources(audience);
  return <section id="tai-lieu-dong-hanh" className="scroll-mt-24 bg-club-faint px-4 py-16"><div className="mx-auto max-w-6xl"><p className="flex items-center gap-2 text-xs font-bold text-plum"><BookOpen aria-hidden="true" className="size-4" />CÙNG TÌM HIỂU</p><h2 className="mt-3 font-hero text-3xl font-bold text-lt-green">THƯ VIỆN TÀI LIỆU DÀNH CHO NGƯỜI ĐỒNG HÀNH</h2><div className="mt-7 flex flex-wrap gap-3" role="group" aria-label="Lọc tài liệu người đồng hành">{AUDIENCES.map(item => <Button key={item.id} variant={audience === item.id ? "default" : "outline"} aria-pressed={audience === item.id} onClick={() => setAudience(item.id)}>{item.title}</Button>)}</div>
  <div className="mt-7" aria-live="polite">{resources.length === 0 ? <p className="border-l-4 border-plum/30 py-4 pl-5 leading-relaxed">Chưa có tài liệu chuyên biệt phù hợp với nhóm này. Các nguồn hướng dẫn chung hiện có nằm trong mục “Tài liệu chung”.</p> : <ul className="divide-y divide-border">{resources.map(doc => <li key={doc.id} className="flex flex-col justify-between gap-4 py-6 sm:flex-row sm:items-center"><div className="max-w-3xl"><span className="text-xs font-semibold text-plum">Tài liệu chung · Trang trực tuyến</span><h3 className="mt-2 font-hero text-lg font-bold text-lt-green">{doc.title}</h3><p className="mt-2 text-sm leading-relaxed">{doc.desc}</p></div>{doc.view && <Button asChild variant="outline" className="shrink-0"><Link to={doc.view.to} {...(doc.view.hash ? { hash: doc.view.hash } : {})}>Mở tài liệu<ArrowUpRight aria-hidden="true" className="size-4" /></Link></Button>}</li>)}</ul>}</div>
  <Button asChild variant="link" className="mt-6 h-auto whitespace-normal px-0 text-lt-green"><Link to="/tai-lieu" hash="tai-lieu-cua-toi">Xem tài liệu đã bổ sung trong thư viện<ArrowUpRight aria-hidden="true" /></Link></Button>
  </div></section>;
}