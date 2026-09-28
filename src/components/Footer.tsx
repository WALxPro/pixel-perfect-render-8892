import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import logo from "@/assets/logo-wordmark.png.asset.json";
import { navLinks, retailers, siteConfig } from "@/config/site";
import { Socials } from "./Socials";

export function Footer() {
  const [email, setEmail] = useState("");

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("You're in the pack — thanks for subscribing!");
    setEmail("");
  };

  return (
    <footer className="relative overflow-hidden border-t border-border bg-[#0e0b24]">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[70rem] -translate-x-1/2 rounded-full opacity-30 blur-[120px]"
        style={{ backgroundImage: "var(--gradient-brand-wide)" }}
      />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <img
            src={logo.url}
            alt="John T. Rhoads"
            className="w-60 md:w-72"
            style={{ filter: "drop-shadow(0 0 24px rgba(244,63,94,0.4))" }}
          />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {siteConfig.tagline}
          </p>
          <div className="mt-6">
            <Socials />
          </div>

          <form onSubmit={subscribe} className="mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              aria-label="Email address for newsletter"
              className="flex-1 rounded-full border border-input bg-white/5 px-5 py-3 text-sm text-foreground outline-none transition-shadow placeholder:text-muted-foreground/70 focus:shadow-[0_0_24px_-6px_#7c3aed]"
            />
            <button type="submit" className="btn-brand">
              Join
            </button>
          </form>
        </div>

        <div>
          <h4 className="font-display text-sm tracking-[0.3em] text-amber">EXPLORE</h4>
          <ul className="mt-5 space-y-3">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-sm text-muted-foreground transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm tracking-[0.3em] text-amber">GET THE BOOK</h4>
          <ul className="mt-5 space-y-3">
            {retailers.map((r) => (
              <li key={r.name}>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="glow-border block rounded-full px-5 py-2.5 text-center text-xs font-semibold uppercase tracking-[0.15em] text-foreground/90 transition-transform duration-300 hover:-translate-y-0.5"
                >
                  {r.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>© 2026 John T. Rhoads. All rights reserved.</p>
          <p>
            Website designed and developed by{" "}
            <a
              href={siteConfig.credit.url}
              target="_blank"
              rel="noreferrer noopener"
              className="gradient-text font-semibold"
            >
              {siteConfig.credit.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
