import { useEffect, useState } from "react";
import logo from "@/assets/logo-wordmark.png.asset.json";

/** Animated loader with the author wordmark and a glowing progress line. */
export function Loader() {
  const [progress, setProgress] = useState(8);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const tick = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + Math.random() * 18));
    }, 140);
    const end = setTimeout(() => setDone(true), 1500);
    return () => {
      clearInterval(tick);
      clearTimeout(end);
    };
  }, []);

  if (done) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-8 bg-[#070a14] transition-opacity duration-500"
      style={{ opacity: progress >= 100 ? 0 : 1 }}
    >
      <img
        src={logo.url}
        alt="John T. Rhoads"
        className="w-64 animate-float-soft md:w-96"
        style={{ filter: "drop-shadow(0 0 40px rgba(124,58,237,0.6))" }}
      />
      <div className="h-[3px] w-56 overflow-hidden rounded-full bg-white/10 md:w-80">
        <div
          className="h-full rounded-full transition-[width] duration-200"
          style={{
            width: `${Math.min(progress, 100)}%`,
            backgroundImage: "var(--gradient-brand-wide)",
            boxShadow: "0 0 18px #7c3aed",
          }}
        />
      </div>
      <p className="font-display text-xs tracking-[0.5em] text-muted-foreground">
        ENTERING THE PACK
      </p>
    </div>
  );
}
