import type { LucideIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CircleCheck, Sparkles } from "lucide-react";
import type { ReactNode } from "react";

/** Pink→green gradient hero with eyebrow, title, subtitle and a floating icon badge. */
export function ChamHero({
  eyebrow,
  title,
  subtitle,
  icon: Icon,
  uppercaseTitle = false,
  image,
  imageAlt = "",
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  icon?: LucideIcon | undefined;
  uppercaseTitle?: boolean;
  image?: string | undefined;
  imageAlt?: string;
}) {
  return (
    <section className="hero-gradient px-4 pb-4 pt-14 text-center">
      <div className={image ? "mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2 md:gap-12 md:text-left" : "mx-auto max-w-3xl"}>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-plum">
            {eyebrow}
          </p>
          <h1
            className={`mt-3 text-4xl font-extrabold text-primary sm:text-5xl ${
              uppercaseTitle ? "uppercase" : ""
            }`}
          >
            {title}
          </h1>
          <p className="mt-4 text-base font-medium text-foreground/80 sm:text-lg">
            {subtitle}
          </p>
        </div>
        {image && <ChamIllustration src={image} alt={imageAlt} />}
      </div>
      {Icon && (
        <div className="mx-auto mt-8 flex h-16 w-16 translate-y-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
          <Icon className="h-7 w-7" />
        </div>
      )}
    </section>
  );
}

export function ChamIllustration({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      width={960}
      height={730}
      className="cham-illus mx-auto aspect-[4/3] w-full max-w-xl rounded-3xl object-cover shadow-xl"
    />
  );
}

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display text-2xl font-bold text-primary">{children}</h2>
  );
}

export function PageBody({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-6xl px-4 pb-16 pt-16">{children}</div>;
}

export function GoalCards({ items }: { items: string[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {items.map((text) => (
        <div
          key={text}
          className="flex items-start gap-3 rounded-2xl bg-card p-5 shadow-sm"
        >
          <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <p className="text-sm font-medium leading-relaxed">{text}</p>
        </div>
      ))}
    </div>
  );
}

export function ActivityCards({ items }: { items: string[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {items.map((text) => (
        <div
          key={text}
          className="flex items-start gap-3 rounded-2xl bg-pink-chip p-5 text-plum"
        >
          <Sparkles className="mt-0.5 h-5 w-5 shrink-0" />
          <p className="text-sm font-semibold leading-relaxed">{text}</p>
        </div>
      ))}
    </div>
  );
}

export function StubNote() {
  return (
    <div className="rounded-full border border-dashed border-pink-band bg-card/60 px-5 py-3 text-center text-sm text-muted-foreground">
      Nội dung mẫu – sẽ được bổ sung chi tiết trong các phiên bản tiếp theo.
    </div>
  );
}

export type ChamRoute =
  | "/"
  | "/lang-nghe"
  | "/hieu-minh"
  | "/vung-vang"
  | "/ket-noi"
  | "/diem-tua"
  | "/clb";

export function PrevNext({
  prev,
  next,
}: {
  prev?: { label: string; to: ChamRoute } | undefined;
  next?: { label: string; to: ChamRoute } | undefined;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      {prev ? (
        <Link
          to={prev.to}
          className="inline-flex items-center gap-2 rounded-full border border-pink-band bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-pink-soft"
        >
          <ArrowLeft className="h-4 w-4" />
          {prev.label}
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link
          to={next.to}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-green-deep"
        >
          {next.label}
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
