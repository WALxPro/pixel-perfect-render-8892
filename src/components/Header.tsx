import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo-wordmark.png.asset.json";
import { navLinks, siteConfig } from "@/config/site";
import { Socials } from "./Socials";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 ${
        scrolled
          ? "glass border-b border-border py-2 shadow-[0_10px_40px_-20px_rgba(124,58,237,0.8)]"
          : "border-b border-transparent py-4"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-4" onClick={() => setOpen(false)}>
          <img
            src={logo.url}
            alt="John T. Rhoads"
            className={`transition-all duration-500 ${scrolled ? "w-44 md:w-56" : "w-52 md:w-72"}`}
            style={{ filter: "drop-shadow(0 0 22px rgba(124,58,237,0.55))" }}
          />
          <span className="hidden max-w-[16rem] text-[11px] leading-snug text-muted-foreground xl:block">
            {siteConfig.tagline}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="group relative font-display text-[13px] tracking-[0.16em] text-muted-foreground transition-colors hover:text-white data-[status=active]:text-white"
            >
              {l.label.toUpperCase()}
              <span
                className="absolute -bottom-1.5 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full transition-transform duration-300 group-hover:scale-x-100 group-data-[status=active]:scale-x-100"
                style={{ backgroundImage: "var(--gradient-brand-wide)" }}
              />
            </Link>
          ))}
        </nav>

        <div className="hidden xl:block">
          <Socials size="sm" />
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white/5 text-white transition-colors hover:border-cyan lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 top-0 z-[-1] flex flex-col items-center justify-center gap-7 bg-[#070a14]/95 backdrop-blur-xl transition-all duration-500 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {navLinks.map((l, i) => (
          <Link
            key={l.to}
            to={l.to}
            onClick={() => setOpen(false)}
            className="font-display text-2xl tracking-[0.15em] text-foreground transition-all duration-500 data-[status=active]:gradient-text"
            style={{
              transform: open ? "translateY(0)" : "translateY(20px)",
              opacity: open ? 1 : 0,
              transitionDelay: `${i * 60}ms`,
            }}
          >
            {l.label}
          </Link>
        ))}
        <div className="mt-4">
          <Socials />
        </div>
      </div>
    </header>
  );
}
