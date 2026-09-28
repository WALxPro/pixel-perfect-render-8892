import { retailers } from "@/config/site";

/** Infinite auto-scrolling retailer marquee, pauses on hover. */
export function RetailerMarquee({ label = "Available Now At" }: { label?: string }) {
  const row = [...retailers, ...retailers];

  return (
    <section className="relative border-y border-border bg-[#0e0b24]/60 py-10">
      <p className="mb-6 text-center font-display text-xs tracking-[0.45em] text-amber">
        {label.toUpperCase()}
      </p>
      <div className="group relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex w-max animate-marquee gap-5 group-hover:[animation-play-state:paused]">
          {row.map((r, i) => (
            <a
              key={`${r.name}-${i}`}
              href={r.url}
              target="_blank"
              rel="noreferrer noopener"
              className="glass glow-border claw-hover whitespace-nowrap rounded-full px-8 py-3 font-display text-sm tracking-[0.2em] text-foreground/90 transition-transform duration-300 hover:-translate-y-1"
            >
              {r.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
