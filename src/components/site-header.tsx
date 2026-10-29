import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { LOGO_URL } from "@/lib/logo";

const NAV_ITEMS = [
  { label: "Trang chủ", to: "/" },
  { label: "Năm chạm", to: "/", hash: "nam-cham" },
  { label: "CLB Đồng hành", to: "/clb" },
  { label: "Tìm điểm tựa", to: "/diem-tua" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-pink-band bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link
          to="/"
          className="flex items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <img
            src={LOGO_URL}
            alt="Logo 5 CHẠM – Vững vàng tâm lý"
            className="h-11 w-11 rounded-lg object-contain"
          />
          <span className="font-display text-lg font-bold tracking-wide text-primary">
            5 CHẠM
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              hash={"hash" in item ? item.hash : undefined}
              className="text-sm font-semibold text-foreground transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label={open ? "Đóng menu" : "Mở menu"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-mint md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <Menu className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-pink-band bg-white px-4 py-3 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                hash={"hash" in item ? item.hash : undefined}
                className="rounded-xl px-3 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-mint hover:text-primary"
                activeProps={{ className: "bg-mint text-primary" }}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-mint">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <p className="font-display text-lg font-bold text-primary">
          5 CHẠM – VỮNG VÀNG TÂM LÝ
        </p>
        <p className="mt-2 text-sm text-foreground/80">
          Website giáo dục sức khỏe tâm lý học đường – Trường THPT Tây Tiền Hải.
        </p>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-foreground/80">
          Website mang tính giáo dục và hỗ trợ,{" "}
          <strong className="font-bold text-foreground">không chẩn đoán</strong>{" "}
          hay gắn nhãn tâm lý cho học sinh. Nếu em đang gặp nguy hiểm, hãy báo
          ngay cho thầy cô, gia đình hoặc gọi 111 (Tổng đài bảo vệ trẻ em) /
          115.
        </p>
      </div>
    </footer>
  );
}
