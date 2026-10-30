import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Heart, Lightbulb, LockKeyhole, MessageCircle, Send, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LETTER_CATEGORIES, LETTER_RECEPTION_ENABLED } from "./last-touch-data";

const CATEGORY_ICONS = [Heart, MessageCircle, Lightbulb, Send];

export function OpenLetter() {
  const [category, setCategory] = useState<string>(LETTER_CATEGORIES[0]);
  const [draft, setDraft] = useState("");
  const [opened, setOpened] = useState(false);
  return (
    <section id="hom-thu-5-cham" className="lt-letter lt-scene" aria-labelledby="lt-letter-title">
      <div className="lt-inner">
        <div className="lt-section-label"><span>03 / HÒM THƯ 5 CHẠM</span><span aria-hidden="true">Một khoảng dành cho bạn</span></div>
        <div className="lt-letter-grid">
          <div>
            <Button variant="ghost" className="lt-envelope-button" aria-label={opened ? "Khép phong thư" : "Mở phong thư"} aria-expanded={opened} onClick={() => setOpened(v => !v)}>
              <svg viewBox="0 0 440 340" aria-hidden="true" className={`lt-envelope ${opened ? "is-open" : ""}`}>
                <rect x="30" y="115" width="380" height="200" rx="8" className="fill-lt-pink" />
                <path d="M30 115 220 12 410 115" className="lt-envelope-flap fill-pink-chip stroke-plum/20" strokeWidth="2" />
                <rect x="68" y="66" width="304" height="202" rx="6" className="lt-envelope-paper fill-card stroke-plum/15" strokeWidth="2" />
                <path d="M114 118H270M114 140H324M114 162H300" className="lt-envelope-paper stroke-lt-green/30" strokeWidth="3" strokeLinecap="round" />
                <path d="M30 115 220 230 410 115V315H30Z" className="fill-lt-pink stroke-plum/15" strokeWidth="2" />
                <path d="m30 315 156-112q34-22 68 0l156 112" className="fill-pink-band stroke-plum/15" strokeWidth="2" />
                <circle cx="220" cy="232" r="30" className="fill-lt-green" />
                <path d="M207 229c-8-13 12-21 13-8 2-13 22-5 13 8l-13 13z" className="fill-lt-pink" />
              </svg>
            </Button>
            <p className="mt-5 flex items-center gap-2 text-sm font-semibold text-lt-green"><LockKeyhole className="h-4 w-4 shrink-0" aria-hidden="true" /> Hòm thư chưa mở tiếp nhận</p>
            <p id="lt-letter-privacy" className="mt-3 max-w-sm text-sm leading-relaxed text-foreground">Nội dung bạn viết chỉ ở trang này, không được gửi hoặc lưu. Rời trang hay tải lại sẽ xóa nội dung. Bạn không cần ghi tên, lớp hoặc thông tin liên hệ.</p>
          </div>
          <div className="min-w-0">
            <h2 id="lt-letter-title" className="lt-heading">ĐIỀU BẠN<br className="hidden sm:block" /> CHƯA KỊP NÓI</h2>
            <p className="lt-body mt-5">Một lời nhắn, một cảm xúc, một ý tưởng hay một điều bạn mong muốn được lắng nghe.</p>
            <fieldset className="mt-8">
              <legend className="text-sm font-semibold text-lt-green">Điều bạn muốn viết</legend>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {LETTER_CATEGORIES.map((item, i) => {
                  const Icon = CATEGORY_ICONS[i] ?? MessageCircle;
                  return <Button type="button" key={item} variant="ghost" className={`lt-category ${category === item ? "lt-category-selected" : ""}`} aria-pressed={category === item} onClick={() => setCategory(item)}><Icon aria-hidden="true" />{item}</Button>;
                })}
              </div>
            </fieldset>
            <label htmlFor="lt-draft" className="mt-6 block text-sm font-semibold text-lt-green">Lời nhắn của bạn</label>
            <Textarea id="lt-draft" value={draft} onChange={e => setDraft(e.target.value)} aria-describedby="lt-letter-privacy lt-letter-status" placeholder="Điều mình muốn nói là…" className="mt-3 min-h-40 resize-y bg-card/70 text-base leading-relaxed shadow-none" />
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Button type="button" disabled={!LETTER_RECEPTION_ENABLED} className="lt-action"><Send aria-hidden="true" />Gửi lời nhắn</Button>
              <Button type="button" variant="ghost" disabled={!draft} onClick={() => setDraft("")}><Trash2 aria-hidden="true" />Xóa nội dung</Button>
            </div>
            <p id="lt-letter-status" className="mt-3 text-sm font-medium text-plum">Chưa kích hoạt gửi · Chưa có người phụ trách tiếp nhận.</p>
          </div>
        </div>
        <aside className="lt-letter-safety" aria-label="An toàn khi cần hỗ trợ">
          <div><strong>Đây không phải kênh hỗ trợ khẩn cấp.</strong><p className="mt-2 text-sm leading-relaxed">Nếu bạn có ý nghĩ tự làm hại bản thân hoặc đang gặp nguy hiểm, hãy báo ngay cho người lớn đáng tin cậy ở gần. Gọi 111 (Tổng đài bảo vệ trẻ em) hoặc 115 khi cần cấp cứu y tế.</p></div>
          <Button asChild variant="link" className="h-auto shrink-0 whitespace-normal text-lt-green"><Link to="/diem-tua" hash="nguon-tro-giup">Tìm nguồn trợ giúp<ArrowUpRight aria-hidden="true" /></Link></Button>
        </aside>
      </div>
    </section>
  );
}