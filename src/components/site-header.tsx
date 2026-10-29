import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { BookOpen, Menu, Users, X } from "lucide-react";
import { LOGO_URL } from "@/lib/logo";
import { Button } from "@/components/ui/button";

export const NAV_ITEMS = [
  { label: "Trang chủ", to: "/" as const, title: "Trang chủ" },
  { label: "Chạm 1", to: "/lang-nghe" as const, title: "Chạm 1 – Lắng nghe" },
  { label: "Chạm 2", to: "/hieu-minh" as const, title: "Chạm 2 – Hiểu mình" },
  { label: "Chạm 3", to: "/vung-vang" as const, title: "Chạm 3 – Vững vàng" },
  { label: "Chạm 4", to: "/ket-noi" as const, title: "Chạm 4 – Kết nối" },
  { label: "Chạm 5", to: "/diem-tua" as const, title: "Chạm 5 – Tìm điểm tựa" },
  { label: "CLB Đồng hành", to: "/clb" as const, title: "CLB Đồng hành" },
  { label: "Tài liệu", to: "/tai-lieu" as const, title: "Tài liệu" },
  { label: "Tìm điểm tựa", to: "/diem-tua" as const, title: "Tìm điểm tựa" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-pink-band bg-card/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
        <Link to="/" className="flex shrink-0 items-center gap-2" onClick={() => setOpen(false)}>
          <img src={LOGO_URL} alt="Logo 5 CHẠM – Vững vàng tâm lý" className="h-10 w-10 rounded-lg object-contain" />
          <span className="font-display text-lg font-bold tracking-wide text-primary">5 CHẠM</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex xl:gap-2" aria-label="Điều hướng chính">
          {NAV_ITEMS.map((item) => item.to === "/clb" ? (
            <Link key={item.label} to="/clb" title={item.title} className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-club-soft px-4 py-2 text-[15px] font-bold text-club-ink transition-colors duration-300 hover:bg-club hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-club focus-visible:ring-offset-2 active:scale-95" activeProps={{ className: "!bg-club !text-primary-foreground shadow-inner" }}>
              <Users className="h-4 w-4" aria-hidden="true" />CLB Đồng hành
            </Link>
          ) : item.to === "/tai-lieu" ? (
            <Link key={item.label} to="/tai-lieu" title="Thư viện tài liệu" className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-mint bg-mint-soft px-3 py-2 text-[15px] font-bold text-green-deep transition-colors duration-200 hover:bg-mint" activeProps={{ className: "!bg-primary !text-primary-foreground !border-primary" }}>
              <BookOpen className="h-4 w-4" aria-hidden="true" />Tài liệu
            </Link>
          ) : item.label === "Tìm điểm tựa" ? (
            <Button key={item.label} asChild variant="secondary" className="rounded-full bg-pink-band px-4 font-bold text-plum hover:bg-pink-chip">
              <Link to="/diem-tua" hash="nguon-tro-giup" title={item.title}><span aria-hidden="true" className="text-xl">♡</span>Tìm điểm tựa</Link>
            </Button>
          ) : (
            <Link
              key={item.label}
              to={item.to}
              title={item.title}
              activeOptions={{ exact: true }}
              className="whitespace-nowrap rounded-full px-3 py-2 text-[15px] font-semibold text-foreground transition-colors duration-200 hover:bg-mint hover:text-primary"
              activeProps={{ className: "bg-mint text-green-deep underline decoration-2 underline-offset-[6px]" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label={open ? "Đóng menu" : "Mở menu"}
          aria-expanded={open}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-mint lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-pink-band bg-card px-4 py-3 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {NAV_ITEMS.map((item) => item.to === "/clb" ? (
              <Link key={item.label} to="/clb" onClick={() => setOpen(false)} className="inline-flex items-center gap-2 rounded-full bg-club-soft px-4 py-3 text-base font-bold text-club-ink transition-colors duration-300 hover:bg-club hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-club" activeProps={{ className: "!bg-club !text-primary-foreground" }}>
                <Users className="h-5 w-5" aria-hidden="true" />CLB Đồng hành
              </Link>
            ) : item.to === "/tai-lieu" ? (
              <Link key={item.label} to="/tai-lieu" onClick={() => setOpen(false)} className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-base font-bold text-green-deep transition-colors hover:bg-mint" activeProps={{ className: "!bg-primary !text-primary-foreground" }}>
                <BookOpen className="h-5 w-5" aria-hidden="true" />Tài liệu
              </Link>
            ) : item.label === "Tìm điểm tựa" ? (
              <Button key={item.label} asChild variant="secondary" className="h-auto justify-start rounded-full bg-pink-band px-4 py-3 font-bold text-plum hover:bg-pink-chip">
                <Link to="/diem-tua" hash="nguon-tro-giup" onClick={() => setOpen(false)}><span aria-hidden="true" className="text-xl">♡</span>Tìm điểm tựa</Link>
              </Button>
            ) : (
              <Link
                key={item.label}
                to={item.to}
                activeOptions={{ exact: true }}
                className="rounded-xl px-4 py-3 text-base font-semibold text-foreground transition-colors hover:bg-mint hover:text-primary"
                activeProps={{ className: "bg-mint text-green-deep" }}
                onClick={() => setOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
