import type { LucideIcon } from "lucide-react";
import {
  ActivityCards,
  ChamHero,
  GoalCards,
  PageBody,
  PrevNext,
  SectionHeading,
  StubNote,
  type ChamRoute,
} from "@/components/cham";

export function StubChamPage({
  eyebrow,
  title,
  subtitle,
  icon,
  goals,
  activities,
  prev,
  next,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  goals: string[];
  activities: string[];
  prev?: { label: string; to: ChamRoute };
  next?: { label: string; to: ChamRoute };
}) {
  return (
    <>
      <ChamHero eyebrow={eyebrow} title={title} subtitle={subtitle} icon={icon} />
      <PageBody>
        <div className="space-y-10">
          <section className="space-y-4">
            <SectionHeading>Mục tiêu</SectionHeading>
            <GoalCards items={goals} />
          </section>
          <section className="space-y-4">
            <SectionHeading>Hoạt động gợi ý</SectionHeading>
            <ActivityCards items={activities} />
          </section>
          <StubNote />
          <PrevNext prev={prev} next={next} />
        </div>
      </PageBody>
    </>
  );
}
