import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Users, Building2, Trees, Flame } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { BookCover3D } from "@/components/BookCover3D";
import { RetailerMarquee } from "@/components/RetailerMarquee";
import { Atmosphere } from "@/components/effects/Atmosphere";
import { useReveal } from "@/hooks/useGsap";
import { amazonUrl, retailers } from "@/config/site";

export const Route = createFileRoute("/about-the-book")({
  head: () => ({
    meta: [
      { title: "About the Book — Hope for the Wolf | John T. Rhoads" },
      {
        name: "description",
        content:
          "Read the synopsis and an excerpt from Hope for the Wolf (Book One), a paranormal romance by John T. Rhoads.",
      },
      { property: "og:title", content: "About Hope for the Wolf — Book One" },
      {
        property: "og:description",
        content: "Synopsis, excerpt and book details for Hope for the Wolf by John T. Rhoads.",
      },
    ],
  }),
  component: AboutBook,
});

const insides = [
  { icon: Users, title: "The Pack", text: "A family bound by instinct, scars and a loyalty deeper than language." },
  { icon: Building2, title: "The Facility", text: "Behind a quiet fence, someone is studying what should never be caged." },
  { icon: Trees, title: "The Forest", text: "Endless pine and mountain — shelter, hunting ground and hiding place." },
  { icon: Flame, title: "Forbidden Love", text: "Two hearts on opposite sides of a war neither of them chose." },
];

const excerpt =
  "She heard them before she saw them — not footsteps, but breathing, low and steady, spread wide through the trees. The forest had gone still the way a room does when everyone already knows the truth. Then the first pair of eyes lifted out of the dark, and Hope understood that running had never been an option.";

function AboutBook() {
  const scope = useReveal();

  return (
    <div ref={scope}>
      <PageHero
        eyebrow="BOOK ONE"
        title="Hope for the Wolf"
        subtitle="A paranormal romance where love, loyalty and the wolf collide."
      />

      <section className="relative overflow-hidden py-20">
        <Atmosphere stars={35} />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
          <div data-reveal className="mx-auto w-[16rem] sm:w-[22rem]">
            <BookCover3D />
          </div>
          <div>
            <span className="glass glow-border rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.3em] text-amber">
              Book One
            </span>
            <h2 data-reveal className="mt-6 font-display text-3xl md:text-4xl">
              The Story
            </h2>
            <div data-reveal className="mt-5 space-y-4 leading-relaxed text-muted-foreground">
              <p>
                In a valley walled in by mountains and pine, a wolf pack survives out of sight —
                until armed men with orders and floodlights decide they are worth more alive than
                free.
              </p>
              <p>
                Caught between the hunters and the hunted, a woman finds herself drawn to a man who
                is not entirely a man, and to a family that offers her something she has never had:
                a place to belong. Choosing him means choosing the pack. Choosing the pack means war.
              </p>
              <p>
                Hope for the Wolf is a cinematic paranormal romance about devotion, defiance and the
                wild thing inside all of us that refuses a cage.
              </p>
            </div>
            <div data-reveal-stagger className="mt-8 grid gap-3 sm:grid-cols-2">
              {retailers.map((r) => (
                <a
                  key={r.name}
                  href={r.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn-brand claw-hover"
                >
                  {r.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0e0b24] py-24">
        <Atmosphere stars={30} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <h2 data-reveal className="text-center font-display text-3xl md:text-5xl">
            Inside the <span className="gradient-text">Story</span>
          </h2>
          <div data-reveal-stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {insides.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="glass glow-border claw-hover rounded-3xl p-7 transition-transform duration-500 hover:-translate-y-2"
              >
                <Icon className="h-9 w-9 text-cyan" />
                <h3 className="mt-5 font-display text-xl text-foreground">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Excerpt />

      <section className="relative overflow-hidden py-20">
        <Atmosphere stars={25} />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <h2 data-reveal className="text-center font-display text-3xl md:text-4xl">
            Book <span className="gradient-text">Details</span>
          </h2>
          <dl data-reveal className="glass glow-border mt-10 divide-y divide-white/10 rounded-3xl p-2">
            {[
              ["Title", "Hope for the Wolf"],
              ["Series", "Hope for the Wolf — Book One"],
              ["Genre", "Paranormal Romance / Suspense"],
              ["Author", "John T. Rhoads"],
              ["Formats", "eBook, Paperback (details coming soon)"],
            ].map(([k, v]) => (
              <div key={k} className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:justify-between">
                <dt className="text-xs uppercase tracking-[0.25em] text-amber">{k}</dt>
                <dd className="text-sm text-foreground/90">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <RetailerMarquee label="Get Your Copy" />

      <section className="relative overflow-hidden py-20 text-center">
        <Atmosphere stars={20} />
        <div className="relative mx-auto max-w-2xl px-4">
          <h2 className="font-display text-3xl md:text-4xl">
            Ready to <span className="gradient-text">run with the pack?</span>
          </h2>
          <a
            href={amazonUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-brand claw-hover mt-8"
          >
            Buy on Amazon
          </a>
        </div>
      </section>
    </div>
  );
}

function Excerpt() {
  const [shown, setShown] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          io.disconnect();
          const id = setInterval(() => {
            setShown((n) => {
              if (n >= excerpt.length) {
                clearInterval(id);
                return n;
              }
              return n + 2;
            });
          }, 18);
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden py-24">
      <Atmosphere stars={30} />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <h2 className="text-center font-display text-3xl md:text-4xl">
          An <span className="gradient-text">Excerpt</span>
        </h2>
        <div className="glass glow-border mt-10 rounded-3xl p-8 md:p-14">
          <p className="min-h-[9rem] font-display text-lg leading-relaxed text-foreground/90 md:text-xl">
            {excerpt.slice(0, shown)}
            <span className="ml-0.5 inline-block h-5 w-[2px] animate-pulse bg-crimson align-middle" />
          </p>
        </div>
      </div>
    </section>
  );
}
