import { useEffect, useRef } from "react";

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type GsapModule = typeof import("gsap")["gsap"];

/**
 * Runs GSAP + ScrollTrigger code on the client only, scoped to the returned ref.
 * The callback receives the gsap instance and the scope element.
 */
export function useGsapScope(
  setup: (gsap: GsapModule, scope: HTMLElement) => void,
  deps: unknown[] = [],
) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      gsap.registerPlugin(ScrollTrigger);
      if (cancelled || !ref.current) return;
      ctx = gsap.context(() => setup(gsap, ref.current as HTMLElement), ref.current);
      ScrollTrigger.refresh();
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}

/** Standard staggered fade-up reveal for elements with [data-reveal] inside the scope. */
export function useReveal() {
  return useGsapScope((gsap, scope) => {
    const items = scope.querySelectorAll<HTMLElement>("[data-reveal]");
    items.forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: 48,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
    });

    const groups = scope.querySelectorAll<HTMLElement>("[data-reveal-stagger]");
    groups.forEach((group) => {
      gsap.from(group.children, {
        opacity: 0,
        y: 42,
        scale: 0.97,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: group, start: "top 85%" },
      });
    });
  });
}
