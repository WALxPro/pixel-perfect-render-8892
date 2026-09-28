import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/hooks/useGsap";

/** Stylized howling-wolf silhouette (pure SVG, no images). */
export function WolfSilhouette({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 200" className={className} aria-hidden fill="currentColor">
      <path d="M118 8c3 9 3 18 1 27 6 6 11 13 14 21 4 10 4 20 9 29 4 7 11 12 15 19 6 10 6 22 4 33-2 12-7 23-9 35-1 8-1 17 2 25H132c-3-8-4-17-2-25 2-9 6-17 7-26 1-7 0-15-4-21-5 6-12 10-19 12-11 3-23 2-34 5-9 2-17 8-22 16-4 6-6 13-6 20H32c0-13 3-26 10-37 7-12 18-21 30-28 8-5 17-8 23-15 6-6 8-15 8-24 0-8-2-16-1-24 1-9 6-17 12-24 2-3 3-6 4-9 0-3-1-6 0-9Z" />
    </svg>
  );
}

/** Layered parallax mountains + pine forest silhouettes. */
export function ForestScene() {
  const far = useRef<HTMLDivElement>(null);
  const mid = useRef<HTMLDivElement>(null);
  const near = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const onScroll = () => {
      const y = window.scrollY;
      if (far.current) far.current.style.transform = `translateY(${y * 0.08}px)`;
      if (mid.current) mid.current.style.transform = `translateY(${y * 0.16}px)`;
      if (near.current) near.current.style.transform = `translateY(${y * 0.26}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const pines = (color: string, opacity: number) => (
    <svg viewBox="0 0 1440 220" preserveAspectRatio="none" className="h-full w-full">
      <g fill={color} opacity={opacity}>
        {Array.from({ length: 40 }, (_, i) => {
          const x = i * 38 + ((i * 17) % 22);
          const h = 90 + ((i * 53) % 90);
          const w = 26 + ((i * 11) % 14);
          return (
            <polygon key={i} points={`${x},220 ${x + w / 2},${220 - h} ${x + w},220`} />
          );
        })}
      </g>
    </svg>
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%]">
      <div ref={far} className="absolute inset-x-0 bottom-0 h-full">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="h-full w-full">
          <polygon points="0,320 240,120 430,320" fill="#141133" opacity="0.9" />
          <polygon points="300,320 620,60 940,320" fill="#171041" opacity="0.9" />
          <polygon points="820,320 1120,140 1440,320" fill="#141133" opacity="0.9" />
        </svg>
      </div>
      <div ref={mid} className="absolute inset-x-0 bottom-0 h-[60%] opacity-90">
        {pines("#0d0a26", 0.95)}
      </div>
      <div ref={near} className="absolute inset-x-0 -bottom-4 h-[42%]">
        {pines("#05040f", 1)}
      </div>
    </div>
  );
}
