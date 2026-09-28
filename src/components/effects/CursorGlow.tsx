import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/hooks/useGsap";

/** Glowing cursor follower — desktop / fine-pointer only. */
export function CursorGlow() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches || prefersReducedMotion()) return;
    setEnabled(true);

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let frame = 0;

    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${x - 4}px, ${y - 4}px, 0)`;
    };

    const loop = () => {
      rx += (x - rx) * 0.12;
      ry += (y - ry) * 0.12;
      if (ring.current) ring.current.style.transform = `translate3d(${rx - 24}px, ${ry - 24}px, 0)`;
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move);
    frame = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(frame);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90] hidden md:block">
      <div
        ref={ring}
        className="absolute left-0 top-0 h-12 w-12 rounded-full border border-cyan/50"
        style={{ boxShadow: "0 0 26px rgba(34,211,238,0.45)" }}
      />
      <div
        ref={dot}
        className="absolute left-0 top-0 h-2 w-2 rounded-full"
        style={{ background: "#f43f5e", boxShadow: "0 0 18px #f43f5e" }}
      />
    </div>
  );
}
