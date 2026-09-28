import { Facebook, Instagram, Youtube, BookOpen, Music2 } from "lucide-react";
import { socials } from "@/config/site";

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  Facebook,
  Instagram,
  YouTube: Youtube,
  Goodreads: BookOpen,
  TikTok: Music2,
};

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.9 2H22l-7.1 8.1L23.2 22h-6.6l-5.2-6.8L5.5 22H2.4l7.6-8.7L1.2 2h6.8l4.7 6.2L18.9 2Zm-1.1 18h1.8L7.3 3.9H5.4L17.8 20Z" />
    </svg>
  );
}

export function Socials({ size = "md" }: { size?: "sm" | "md" }) {
  const box = size === "sm" ? "h-9 w-9" : "h-10 w-10";
  const icon = size === "sm" ? "h-4 w-4" : "h-[18px] w-[18px]";

  return (
    <ul className="flex flex-wrap items-center gap-2">
      {socials.map((s) => {
        const Icon = icons[s.name] ?? XIcon;
        return (
          <li key={s.name}>
            <a
              href={s.url}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={s.name}
              className={`${box} flex items-center justify-center rounded-full border border-border bg-white/5 text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan hover:text-white hover:shadow-[0_0_22px_-4px_#22d3ee]`}
            >
              <Icon className={icon} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
