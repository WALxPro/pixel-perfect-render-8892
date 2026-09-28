import { useRef } from "react";
import cover from "@/assets/book-cover.jpg.asset.json";

/** Book cover with 3D mouse tilt, float and gradient glow. */
export function BookCover3D({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1100px) rotateY(${px * 18}deg) rotateX(${-py * 14}deg) scale(1.03)`;
  };

  const reset = () => {
    if (ref.current)
      ref.current.style.transform = "perspective(1100px) rotateY(0deg) rotateX(0deg) scale(1)";
  };

  return (
    <div className={`relative ${className}`}>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 scale-110 rounded-[2rem] blur-3xl opacity-70"
        style={{ backgroundImage: "var(--gradient-brand-wide)" }}
      />
      <div className="animate-float-soft">
        <div
          ref={ref}
          onMouseMove={onMove}
          onMouseLeave={reset}
          className="overflow-hidden rounded-xl border border-white/15 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] transition-transform duration-300 ease-out"
        >
          <img
            src={cover.url}
            alt="Hope for the Wolf, Book One, a paranormal romance by John T. Rhoads — book cover"
            className="block w-full"
          />
        </div>
      </div>
    </div>
  );
}
