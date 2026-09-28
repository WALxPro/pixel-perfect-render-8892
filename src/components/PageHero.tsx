import { Atmosphere, Embers } from "@/components/effects/Atmosphere";

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative flex min-h-[60vh] items-center overflow-hidden pt-36 pb-16">
      <Atmosphere stars={60} />
      <Embers count={18} />
      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
        <p className="font-display text-xs tracking-[0.5em] text-cyan">{eyebrow}</p>
        <h1 className="mt-5 font-display text-4xl leading-tight md:text-6xl">
          <span className="gradient-text">{title}</span>
        </h1>
        {subtitle ? (
          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>
    </section>
  );
}
