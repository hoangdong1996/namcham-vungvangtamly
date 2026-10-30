import { Link } from "@tanstack/react-router";
import { ArrowUpRight, GraduationCap, Network, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import parentImage from "@/assets/adult-parent-listening.jpg";
import teacherImage from "@/assets/adult-teacher-listening.jpg";
import schoolImage from "@/assets/adult-companion-school.jpg";
import { ADULT_ROLES } from "./data";

const IMAGES = [parentImage, teacherImage, schoolImage];
const ICONS = [UsersRound, GraduationCap, Network];
export function AdultRoleLinks({ homepage = false }: { homepage?: boolean }) {
  return <div className="grid gap-6 md:grid-cols-3">{ADULT_ROLES.map((role, index) => {
    const Icon = ICONS[index] ?? Network;
    return <article key={role.id} className="flex min-w-0 flex-col overflow-hidden rounded-lg border border-border bg-card">
      <img src={IMAGES[index] ?? schoolImage} width={1024} height={1024} loading="lazy" alt={role.id === "cha-me" ? "Hình minh họa cha mẹ lắng nghe con" : role.id === "thay-co" ? "Hình minh họa thầy cô trò chuyện cùng học sinh" : "Hình minh họa gia đình, nhà trường và học sinh cùng kết nối"} className="aspect-[4/3] w-full object-cover" />
      <div className="flex flex-1 flex-col p-5"><p className="flex items-center gap-2 text-xs font-bold text-lt-green"><Icon className="size-4 shrink-0" aria-hidden="true" />{homepage ? ["Mình là cha mẹ", "Mình là thầy cô", "Mình muốn tìm hiểu mạng lưới hỗ trợ"][index] : role.name}</p><p className="mt-3 text-base font-medium leading-relaxed">{role.message}</p><Button asChild variant="link" className="mt-auto h-auto justify-start whitespace-normal px-0 pb-0 pt-5 text-left text-sm font-bold text-lt-green"><Link to="/dong-hanh" hash={role.id}>{role.button}<ArrowUpRight aria-hidden="true" className="size-4 shrink-0" /></Link></Button></div>
    </article>;
  })}</div>;
}

export function AdultHomepageEntry() {
  return <section id="goc-dong-hanh" className="bg-mint-soft px-4 py-16 font-hero text-foreground"><div className="mx-auto max-w-6xl"><p className="text-sm font-semibold text-plum">GÓC ĐỒNG HÀNH</p><h2 className="mt-3 max-w-3xl font-hero text-3xl font-bold leading-tight text-lt-green sm:text-4xl">BẠN ĐẾN ĐÂY VỚI VAI TRÒ NÀO?</h2><p className="mt-5 max-w-3xl leading-relaxed">Hành trình vững vàng tâm lý không chỉ cần sự nỗ lực của học sinh mà còn cần những người lớn biết lắng nghe, thấu hiểu và đồng hành.</p><div className="mt-8"><AdultRoleLinks homepage /></div></div></section>;
}