import { useEffect, useRef } from "react";

/** Glowing eyes in the dark that track the cursor. */
export function WolfEyes({
  className = "",
  color = "#fbbf24",
}: {
  className?: string;
  color?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const pupils = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!wrap.current) return;
      const r = wrap.current.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / Math.max(window.innerWidth / 2, 1);
      const dy = (e.clientY - (r.top + r.height / 2)) / Math.max(window.innerHeight / 2, 1);
      pupils.current.forEach((p) => {
        if (p) p.style.transform = `translate(${dx * 6}px, ${dy * 4}px)`;
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={wrap} aria-hidden className={`flex items-center gap-5 ${className}`}>
      {[0, 1].map((i) => (
        <span
          key={i}
          className="relative flex h-3.5 w-8 items-center justify-center rounded-full"
          style={{ background: "rgba(0,0,0,0.6)", boxShadow: `0 0 26px ${color}` }}
        >
          <span
            ref={(el) => {
              if (el) pupils.current[i] = el;
            }}
            className="block h-3 w-4 rounded-full transition-transform duration-200"
            style={{ background: color, boxShadow: `0 0 16px ${color}` }}
          />
        </span>
      ))}
    </div>
  );
}
