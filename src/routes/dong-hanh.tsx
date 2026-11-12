import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, HeartHandshake, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import schoolImage from "@/assets/adult-companion-school.jpg";
import parentImage from "@/assets/adult-parent-listening.jpg";
import teacherImage from "@/assets/adult-teacher-listening.jpg";
import { AdultRoleLinks } from "@/components/adult-companion/role-entry";
import { PARENT_TOPICS, CONVERSATION_PHRASES, TEACHER_TOPICS } from "@/components/adult-companion/data";
import { ListeningWeek } from "@/components/adult-companion/listening-week";
import { ScenarioRoom } from "@/components/adult-companion/scenario-room";
import { AdultSupportNetwork } from "@/components/adult-companion/support-network";
import { AdultResources } from "@/components/adult-companion/resources";
import { DIRECT_SUPPORT_GUIDANCE } from "@/lib/support-safety";

export const Route = createFileRoute("/dong-hanh")({
  head: () => ({ meta: [
    { title: "Góc đồng hành | 5 CHẠM – Vững vàng tâm lý" },
    { name: "description", content: "Không gian dành cho cha mẹ, thầy cô và người có trách nhiệm: lắng nghe học sinh, phối hợp gia đình – nhà trường và kết nối hỗ trợ phù hợp." },
    { property: "og:title", content: "Góc đồng hành | 5 CHẠM – Vững vàng tâm lý" },
    { property: "og:description", content: "Thấu hiểu để gần nhau hơn – Đồng hành để các em vững vàng hơn." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: AdultCompanionPage,
});

function AdultCompanionPage() {
  return <main className="font-hero text-foreground">
    <section className="relative isolate bg-lt-green">
      <img src={schoolImage} alt="Hình minh họa gia đình, thầy cô và học sinh Việt Nam cùng trò chuyện ở sân trường" width={1536} height={1024} className="absolute inset-0 h-full w-full object-cover" />
      <div className="adult-hero-shade absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-4 py-12 text-primary-foreground sm:py-16">
        <p className="text-xs font-semibold uppercase">5 CHẠM · DÀNH CHO NGƯỜI ĐỒNG HÀNH</p><h1 className="mt-5 font-hero text-4xl font-extrabold leading-tight sm:text-5xl">GÓC ĐỒNG HÀNH</h1><p className="mt-4 max-w-xl text-lg font-medium leading-relaxed">Thấu hiểu để gần nhau hơn – Đồng hành để các em vững vàng hơn.</p>
        <h2 className="mt-8 max-w-xl font-hero text-2xl font-bold leading-tight sm:text-3xl">ĐỒNG HÀNH ĐỂ HIỂU – KẾT NỐI ĐỂ YÊU THƯƠNG</h2><p className="mt-5 max-w-xl text-base leading-relaxed">Mỗi học sinh đều cần được lắng nghe, thấu hiểu và tôn trọng. Sự quan tâm đúng cách từ gia đình, nhà trường và những người xung quanh có thể tạo nên điểm tựa quan trọng trên hành trình trưởng thành.</p>
      </div>
    </section>
    <section className="px-4 py-12"><div className="mx-auto max-w-6xl"><h2 className="font-hero text-xl font-bold text-lt-green">BẠN ĐẾN ĐÂY VỚI VAI TRÒ NÀO?</h2><div className="mt-6"><AdultRoleLinks /></div></div></section>

    <section id="cha-me" className="scroll-mt-24 bg-mint-soft px-4 py-16"><div className="mx-auto max-w-6xl">
      <div className="grid items-center gap-8 md:grid-cols-2"><div><p className="text-xs font-bold text-plum">01 / ĐỒNG HÀNH CÙNG CON</p><h2 className="mt-3 font-hero text-3xl font-bold leading-tight text-lt-green sm:text-4xl">LẮNG NGHE CON – HIỂU ĐIỀU CON CHƯA NÓI</h2><p className="mt-5 leading-relaxed">Tuổi học trò có những áp lực không phải lúc nào các em cũng dễ dàng chia sẻ. Một cuộc trò chuyện chân thành, không phán xét có thể mở ra cơ hội để cha mẹ hiểu con hơn.</p></div><img src={parentImage} width={1024} height={1024} loading="lazy" alt="Hình minh họa mẹ lắng nghe con trong một cuộc trò chuyện bình tĩnh" className="aspect-[4/3] w-full rounded-lg object-cover" /></div>
      <div className="mt-10 grid gap-8 md:grid-cols-2">{PARENT_TOPICS.slice(0, 2).map(topic => <div key={topic.title} className="border-t border-primary/20 pt-5"><h3 className="font-hero text-xl font-bold text-lt-green">{topic.title}</h3><ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed">{topic.items.map(item => <li key={item}>{item}</li>)}</ul>{topic === PARENT_TOPICS[1] && <p className="mt-4 text-sm font-semibold text-plum">Đây là những biểu hiện cần quan tâm, không phải căn cứ để cha mẹ tự chẩn đoán trầm cảm.</p>}</div>)}</div>
      <h3 className="mt-10 font-hero text-xl font-bold text-lt-green">Học cách trò chuyện cùng con</h3><div className="mt-5 grid gap-8 md:grid-cols-2"><div><p className="text-sm font-bold text-lt-green">NÊN NÓI</p><ul className="mt-3 space-y-3">{CONVERSATION_PHRASES.map(item => <li key={item.say} className="border-l-2 border-primary pl-4 text-sm leading-relaxed">“{item.say}”</li>)}</ul></div><div><p className="text-sm font-bold text-plum">TRÁNH</p><ul className="mt-3 space-y-3">{CONVERSATION_PHRASES.map(item => <li key={item.avoid} className="border-l-2 border-pink-number pl-4 text-sm leading-relaxed">“{item.avoid}”</li>)}</ul></div></div>
      <div className="mt-10 grid gap-8 md:grid-cols-2"><div><h3 className="font-hero text-xl font-bold text-lt-green">{PARENT_TOPICS[2].title}</h3><ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed">{PARENT_TOPICS[2].items.map(item => <li key={item}>{item}</li>)}</ul></div><div><h3 className="font-hero text-xl font-bold text-lt-green">Khi nào cần tìm kiếm hỗ trợ?</h3><p className="mt-4 text-sm leading-relaxed">Trao đổi với giáo viên, người có trách nhiệm trong nhà trường và chuyên gia tâm lý hoặc cơ sở y tế phù hợp khi những khó khăn kéo dài, ảnh hưởng rõ đến sinh hoạt, học tập hoặc sự an toàn của học sinh.</p><p className="mt-4 text-sm leading-relaxed">Nếu có dấu hiệu nguy cơ tự làm hại bản thân hoặc nguy hiểm tức thời, cần ưu tiên bảo đảm an toàn và kết nối ngay với người lớn có trách nhiệm, cơ sở y tế hoặc dịch vụ khẩn cấp phù hợp.</p><Button asChild variant="link" className="mt-3 h-auto whitespace-normal px-0 text-lt-green"><Link to="/diem-tua" hash="nguon-tro-giup">Tìm nguồn hỗ trợ phù hợp<ArrowUpRight aria-hidden="true" /></Link></Button></div></div>
      <ListeningWeek />
    </div></section>

    <section id="thay-co" className="scroll-mt-24 px-4 py-16"><div className="mx-auto max-w-6xl"><div className="grid items-center gap-8 md:grid-cols-2"><img src={teacherImage} width={1024} height={1024} loading="lazy" alt="Hình minh họa giáo viên quan tâm và lắng nghe học sinh" className="aspect-[4/3] w-full rounded-lg object-cover" /><div><p className="text-xs font-bold text-plum">02 / ĐỒNG HÀNH CÙNG HỌC TRÒ</p><h2 className="mt-3 font-hero text-3xl font-bold leading-tight text-lt-green sm:text-4xl">NHẬN DIỆN SỚM – ĐỒNG HÀNH ĐÚNG CÁCH</h2><p className="mt-5 leading-relaxed">Thầy cô không cần trở thành chuyên gia tâm lý để có thể giúp đỡ học sinh. Đôi khi, sự quan tâm đúng lúc, một cuộc trò chuyện không phán xét và sự kết nối với người có chuyên môn đã là bước khởi đầu quan trọng.</p></div></div>
    <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">{TEACHER_TOPICS.map((topic, index) => <div key={topic.title} className="border-t border-club/20 pt-5"><p className="text-xs font-bold text-plum">0{index + 1}</p><h3 className="mt-2 font-hero text-xl font-bold text-lt-green">{topic.title}</h3><p className="mt-3 text-sm leading-relaxed">{topic.text}</p>{index === 5 && <Button asChild variant="link" className="mt-3 h-auto px-0 text-lt-green"><Link to="/dong-hanh" hash="tai-lieu-dong-hanh">Mở thư viện người đồng hành<ArrowUpRight aria-hidden="true" /></Link></Button>}</div>)}</div><ScenarioRoom /></div></section>

    <section id="mang-luoi" className="scroll-mt-24 bg-pink-soft px-4 py-16"><div className="mx-auto max-w-6xl"><p className="text-xs font-bold text-plum">03 / MẠNG LƯỚI HỖ TRỢ</p><h2 className="mt-3 font-hero text-3xl font-bold leading-tight text-lt-green sm:text-4xl">KHÔNG AI PHẢI ĐỒNG HÀNH MỘT MÌNH</h2><AdultSupportNetwork /></div></section>
    <AdultResources />
    <section className="px-4 py-12"><div className="mx-auto max-w-6xl"><div className="flex items-start gap-3 border-l-4 border-destructive p-5"><ShieldAlert className="size-6 shrink-0 text-destructive" aria-hidden="true" /><div><p className="font-bold text-lt-green">An toàn, quyền riêng tư và lợi ích của học sinh là ưu tiên.</p><p className="mt-3 text-sm leading-relaxed">{DIRECT_SUPPORT_GUIDANCE}</p><p className="mt-3 text-sm leading-relaxed">Nội dung mang tính giáo dục, không chẩn đoán, không thay thế chuyên gia tâm lý hoặc bác sĩ. Không yêu cầu cung cấp thông tin nhận diện hay nội dung tâm sự.</p></div></div><Button asChild variant="outline" className="mt-6"><Link to="/diem-tua" hash="nguon-tro-giup"><HeartHandshake aria-hidden="true" />Tìm điểm tựa<ArrowUpRight aria-hidden="true" /></Link></Button><p className="mt-6 text-xs text-muted-foreground">Hình minh họa được tạo bằng AI, không phải ảnh chụp thật của Trường THPT.</p></div></section>
  </main>;
}