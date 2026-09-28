import { useMemo } from "react";

/** Moving aurora gradient blobs + twinkling stars + grain. Pure CSS/SVG, no images. */
export function Atmosphere({ stars = 60, className = "" }: { stars?: number; className?: string }) {
  const points = useMemo(
    () =>
      Array.from({ length: stars }, (_, i) => ({
        id: i,
        left: (i * 61.8) % 100,
        top: (i * 37.5) % 100,
        size: (i % 3) + 1,
        delay: (i % 11) * 0.4,
      })),
    [stars],
  );

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden grain ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0e0b24_0%,#070a14_70%)]" />
      <div
        className="absolute -left-40 top-[-15%] h-[38rem] w-[38rem] rounded-full blur-[120px] opacity-45"
        style={{
          background: "radial-gradient(circle,#7c3aed,transparent 65%)",
          animation: "aurora-drift 22s ease-in-out infinite",
        }}
      />
      <div
        className="absolute right-[-12%] top-[10%] h-[34rem] w-[34rem] rounded-full blur-[130px] opacity-40"
        style={{
          background: "radial-gradient(circle,#f43f5e,transparent 65%)",
          animation: "aurora-drift 27s ease-in-out infinite reverse",
        }}
      />
      <div
        className="absolute bottom-[-20%] left-[25%] h-[30rem] w-[30rem] rounded-full blur-[140px] opacity-30"
        style={{
          background: "radial-gradient(circle,#22d3ee,transparent 65%)",
          animation: "aurora-drift 31s ease-in-out infinite",
        }}
      />
      {points.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            animation: `twinkle ${3 + (p.id % 5)}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/** Slow drifting fog bands. */
export function Fog() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2">
      <div
        className="absolute inset-x-[-25%] bottom-0 h-40 opacity-40 blur-2xl"
        style={{
          background: "linear-gradient(to top, rgba(124,58,237,0.35), transparent)",
          animation: "fog-drift 26s ease-in-out infinite alternate",
        }}
      />
      <div
        className="absolute inset-x-[-25%] bottom-10 h-28 opacity-30 blur-3xl"
        style={{
          background: "linear-gradient(to top, rgba(34,211,238,0.28), transparent)",
          animation: "fog-drift 34s ease-in-out infinite alternate-reverse",
        }}
      />
    </div>
  );
}

/** Floating embers / fireflies. */
export function Embers({ count = 26 }: { count?: number }) {
  const bits = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: (i * 43.7) % 100,
        delay: (i % 9) * 1.3,
        dur: 9 + (i % 7),
        size: 2 + (i % 3),
        color: i % 3 === 0 ? "#fbbf24" : i % 3 === 1 ? "#22d3ee" : "#f43f5e",
      })),
    [count],
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {bits.map((b) => (
        <span
          key={b.id}
          className="absolute bottom-[-10%] rounded-full"
          style={{
            left: `${b.left}%`,
            width: b.size,
            height: b.size,
            background: b.color,
            boxShadow: `0 0 12px ${b.color}`,
            animation: `ember-rise ${b.dur}s linear ${b.delay}s infinite`,
          }}
        />
      ))}
      <style>{`@keyframes ember-rise{0%{transform:translateY(0) translateX(0);opacity:0}10%{opacity:.9}50%{transform:translateY(-45vh) translateX(28px)}100%{transform:translateY(-95vh) translateX(-18px);opacity:0}}`}</style>
    </div>
  );
}
