import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Heart, Shield, Users, Wind, Star } from "lucide-react";
import { toast } from "sonner";
import { Atmosphere, Embers, Fog } from "@/components/effects/Atmosphere";
import { ForestScene, WolfSilhouette } from "@/components/effects/ForestScene";
import { WolfEyes } from "@/components/effects/WolfEyes";
import { BookCover3D } from "@/components/BookCover3D";
import { RetailerMarquee } from "@/components/RetailerMarquee";
import { useGsapScope, useReveal } from "@/hooks/useGsap";
import { amazonUrl, siteConfig } from "@/config/site";
import authorCutout from "@/assets/author-cutout.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "John T. Rhoads | Hope for the Wolf — A Paranormal Romance" },
      {
        name: "description",
        content:
          "Hope for the Wolf (Book One) by John T. Rhoads — a paranormal romance where love, loyalty and the wolf collide. Read the story, meet the author, get the book.",
      },
      { property: "og:title", content: "Hope for the Wolf — John T. Rhoads" },
      {
        property: "og:description",
        content: "A paranormal romance of wolves, freedom and forbidden love. Book One out now.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <RetailerMarquee />
      <AboutBookTeaser />
      <EnterThePack />
      <AuthorTeaser />
      <Reviews />
      <JoinThePack />
    </>
  );
}

/* ------------------------------- HERO ------------------------------- */

function Hero() {
  const scope = useGsapScope((gsap, el) => {
    const letters = el.querySelectorAll("[data-letter]");
    const tl = gsap.timeline({ delay: 1.5 });
    tl.from(letters, { opacity: 0, y: 70, rotateX: -80, stagger: 0.04, duration: 0.8, ease: "back.out(1.6)" })
      .from("[data-hero-sub]", { opacity: 0, y: 24, duration: 0.7 }, "-=0.35")
      .from("[data-hero-cta]", { opacity: 0, y: 24, stagger: 0.12, duration: 0.6 }, "-=0.3")
      .from("[data-hero-cover]", { opacity: 0, x: 90, rotateY: 35, duration: 1.1, ease: "power3.out" }, "-=0.9")
      .fromTo(
        "[data-claw]",
        { scaleX: 0, opacity: 1 },
        { scaleX: 1, duration: 0.5, stagger: 0.08, ease: "power4.in" },
        "-=1.2",
      )
      .to("[data-claw]", { opacity: 0, duration: 0.7 }, "-=0.1");
  });

  const title = "HOPE FOR THE WOLF";

  return (
    <section
      ref={scope}
      className="relative flex min-h-screen items-center overflow-hidden pt-32 pb-16"
    >
      <Atmosphere stars={90} />
      <ForestScene />
      <Fog />
      <Embers count={30} />

      {/* claw slash sweep */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-20 flex items-center">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            data-claw
            className="absolute h-[2px] w-full origin-left"
            style={{
              top: `${38 + i * 7}%`,
              transform: `rotate(-8deg)`,
              background:
                "linear-gradient(90deg, transparent, #f43f5e, #7c3aed, transparent)",
              boxShadow: "0 0 24px #f43f5e",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="font-display text-xs tracking-[0.5em] text-cyan" data-hero-sub>
            BOOK ONE · OUT NOW
          </p>
          <h1 className="mt-5 font-display text-[3rem] leading-[0.95] sm:text-[4.5rem] lg:text-[5.5rem]">
            {title.split(" ").map((word, wi) => (
              <span key={wi} className="mr-4 inline-block whitespace-nowrap">
                {word.split("").map((ch, ci) => (
                  <span key={ci} data-letter className="inline-block gradient-text">
                    {ch}
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground" data-hero-sub>
            A Paranormal Romance, Book One —{" "}
            <span className="text-white">by {siteConfig.author}</span>
          </p>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground" data-hero-sub>
            {siteConfig.tagline}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={amazonUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-brand claw-hover"
              data-hero-cta
            >
              Buy on Amazon
            </a>
            <Link to="/about-the-book" className="btn-ghost-brand" data-hero-cta>
              About the Book
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-4" data-hero-cta>
            <WolfEyes />
            <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              Something is watching
            </span>
          </div>
        </div>

        <div data-hero-cover className="relative mx-auto w-[16rem] sm:w-[20rem] lg:w-full lg:max-w-sm">
          <WolfSilhouette className="absolute -left-24 bottom-0 hidden h-64 text-black/70 lg:block" />
          <BookCover3D />
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-center">
        <div className="mx-auto h-12 w-6 rounded-full border border-cyan/40 p-1">
          <span className="mx-auto block h-2 w-2 animate-bounce rounded-full bg-cyan shadow-[0_0_14px_#22d3ee]" />
        </div>
        <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Scroll</p>
      </div>
    </section>
  );
}

/* --------------------------- ABOUT THE BOOK -------------------------- */

function AboutBookTeaser() {
  const scope = useReveal();

  return (
    <section ref={scope} className="relative overflow-hidden py-28">
      <Atmosphere stars={35} />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2">
        <div data-reveal className="mx-auto w-[16rem] sm:w-[22rem]">
          <BookCover3D />
        </div>
        <div>
          <p data-reveal className="font-display text-xs tracking-[0.45em] text-amber">
            ABOUT THE BOOK
          </p>
          <h2 data-reveal className="mt-4 font-display text-4xl leading-tight md:text-5xl">
            <span className="gradient-text">Love runs wild</span>
            <br />
            behind the fence.
          </h2>
          <p data-reveal className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
            In a valley where the treeline hides more than shadows, a woman discovers that the pack
            hunted by armed men is not the monster in this story. What begins as survival becomes a
            bond no cage, border or bullet can break.
          </p>
          <div data-reveal-stagger className="mt-8 flex flex-wrap gap-3">
            {["Paranormal Romance", "Werewolves", "Suspense"].map((t) => (
              <span
                key={t}
                className="glass glow-border rounded-full px-5 py-2 text-xs uppercase tracking-[0.2em] text-foreground/85"
              >
                {t}
              </span>
            ))}
          </div>
          <div data-reveal className="mt-10">
            <Link to="/about-the-book" className="btn-brand claw-hover">
              Discover the Book
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- ENTER THE PACK -------------------------- */

const pillars = [
  {
    icon: Heart,
    title: "Love",
    text: "A bond that ignites in the worst possible place and refuses to be tamed by fear.",
  },
  {
    icon: Shield,
    title: "Loyalty",
    text: "In the pack, a promise is blood. Betrayal costs more than any of them can pay.",
  },
  {
    icon: Users,
    title: "Pack",
    text: "Family isn't the one you're born to. It's the one that runs beside you in the dark.",
  },
  {
    icon: Wind,
    title: "Freedom",
    text: "Beyond the fence lies open forest — and the only life worth bleeding for.",
  },
];

function EnterThePack() {
  const scope = useGsapScope((gsap, el) => {
    const track = el.querySelector<HTMLElement>("[data-track]");
    if (!track) return;
    if (window.innerWidth < 768) return;
    gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth + 80),
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: () => `+=${track.scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
  });

  return (
    <section ref={scope} className="relative overflow-hidden bg-[#0e0b24] py-20 md:py-0">
      <Atmosphere stars={40} />
      <div className="relative flex min-h-[70vh] flex-col justify-center md:h-screen">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <p className="font-display text-xs tracking-[0.45em] text-cyan">SCROLL THROUGH</p>
          <h2 className="mt-3 font-display text-4xl md:text-6xl">
            ENTER THE <span className="gradient-text">PACK</span>
          </h2>
        </div>
        <div className="mt-12 overflow-hidden">
          <div data-track className="flex gap-6 px-4 sm:px-6 md:w-max">
            <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:flex md:w-auto">
              {pillars.map(({ icon: Icon, title, text }) => (
                <article
                  key={title}
                  className="glass glow-border claw-hover group relative flex min-h-[20rem] w-full flex-col justify-between rounded-3xl p-8 transition-transform duration-500 hover:-translate-y-2 md:h-[26rem] md:w-[24rem]"
                >
                  <Icon className="h-12 w-12 text-crimson transition-transform duration-500 group-hover:scale-125 group-hover:text-cyan" />
                  <div>
                    <h3 className="font-display text-3xl gradient-text">{title}</h3>
                    <p className="mt-4 leading-relaxed text-muted-foreground">{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- ABOUT THE AUTHOR ------------------------ */

function AuthorTeaser() {
  const scope = useReveal();

  return (
    <section ref={scope} className="relative overflow-hidden py-28">
      <Atmosphere stars={30} />
      <Embers count={16} />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
        <div data-reveal className="relative mx-auto w-72 sm:w-80">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 scale-125 rounded-full blur-3xl opacity-70"
            style={{ backgroundImage: "var(--gradient-brand)" }}
          />
          <img
            src={authorCutout.url}
            alt="Author John T. Rhoads"
            className="animate-float-soft w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
          />
        </div>
        <div>
          <p data-reveal className="font-display text-xs tracking-[0.45em] text-amber">
            ABOUT THE AUTHOR
          </p>
          <h2 data-reveal className="mt-4 font-display text-4xl md:text-5xl">
            <span className="gradient-text">John T. Rhoads</span>
          </h2>
          <p data-reveal className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
            John T. Rhoads writes paranormal romance with teeth — stories where tenderness and
            danger share the same breath. Hope for the Wolf is the first book in his wolf-pack
            saga.
          </p>
          <div data-reveal className="mt-9">
            <Link to="/about-the-author" className="btn-brand claw-hover">
              Meet the Author
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ REVIEWS ------------------------------ */

const reviews = [
  {
    quote: "Fierce, tender and impossible to put down. I read it in one night.",
    name: "Early Reader",
    stars: 5,
  },
  {
    quote: "The pack feels real. The romance burns. The tension never lets go.",
    name: "Beta Reader",
    stars: 5,
  },
  {
    quote: "A paranormal romance with genuine stakes — and a heart that howls.",
    name: "Advance Review",
    stars: 5,
  },
  {
    quote: "Cinematic from the first page. I want Book Two immediately.",
    name: "Reader Review",
    stars: 5,
  },
  {
    quote: "Dark, wild, and unexpectedly moving. Rhoads writes loyalty beautifully.",
    name: "Reader Review",
    stars: 4,
  },
];

function Reviews() {
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timer.current = setInterval(() => setIndex((i) => (i + 1) % reviews.length), 4200);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#0e0b24] py-28">
      <Atmosphere stars={40} />
      <div className="relative mx-auto max-w-6xl px-4 text-center sm:px-6">
        <p className="font-display text-xs tracking-[0.45em] text-cyan">READER REVIEWS</p>
        <h2 className="mt-3 font-display text-4xl md:text-5xl">
          Voices from <span className="gradient-text">the Pack</span>
        </h2>

        <div className="relative mt-16 h-[22rem] [perspective:1400px]">
          {reviews.map((r, i) => {
            const offset = (i - index + reviews.length) % reviews.length;
            const pos = offset > reviews.length / 2 ? offset - reviews.length : offset;
            const active = pos === 0;
            return (
              <article
                key={r.quote}
                className="glass glow-border absolute left-1/2 top-0 w-[19rem] rounded-3xl p-8 transition-all duration-700 ease-out sm:w-[26rem]"
                style={{
                  transform: `translateX(-50%) translateX(${pos * 220}px) translateZ(${active ? 0 : -260}px) rotateY(${pos * -22}deg) scale(${active ? 1 : 0.85})`,
                  opacity: Math.abs(pos) > 2 ? 0 : active ? 1 : 0.4,
                  zIndex: 10 - Math.abs(pos),
                }}
              >
                <div className="flex justify-center gap-1">
                  {Array.from({ length: 5 }, (_, s) => (
                    <Star
                      key={s}
                      className={`h-4 w-4 ${s < r.stars ? "fill-amber text-amber" : "text-muted-foreground/40"}`}
                    />
                  ))}
                </div>
                <p className="mt-6 font-display text-lg leading-relaxed text-foreground">
                  “{r.quote}”
                </p>
                <p className="mt-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  {r.name}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {reviews.map((r, i) => (
            <button
              key={r.quote}
              aria-label={`Show review ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${i === index ? "w-8 bg-crimson" : "w-2 bg-white/25"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- JOIN THE PACK --------------------------- */

function JoinThePack() {
  const [email, setEmail] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Welcome to the pack! Watch your inbox.");
    setEmail("");
  };

  return (
    <section className="relative overflow-hidden py-24">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: "var(--gradient-brand-wide)",
          backgroundSize: "250% 250%",
          animation: "gradient-pan 12s ease infinite",
          opacity: 0.85,
        }}
      />
      <div aria-hidden className="absolute inset-0 bg-[#070a14]/55" />
      <WolfSilhouette className="pointer-events-none absolute bottom-0 left-8 h-60 text-black/45" />
      <WolfSilhouette className="pointer-events-none absolute bottom-0 right-8 hidden h-44 -scale-x-100 text-black/35 md:block" />
      <Embers count={20} />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <h2 className="font-display text-4xl text-white md:text-6xl">JOIN THE PACK</h2>
        <p className="mx-auto mt-4 max-w-xl text-white/85">
          Get news about Book Two, excerpts and release dates — straight from the forest.
        </p>
        <form
          onSubmit={submit}
          className="mx-auto mt-9 flex max-w-lg flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            aria-label="Email address"
            className="flex-1 rounded-full border border-white/30 bg-black/40 px-5 py-3 text-sm text-white outline-none placeholder:text-white/60 focus:border-cyan focus:shadow-[0_0_24px_-6px_#22d3ee]"
          />
          <button type="submit" className="btn-brand">
            Sign Up
          </button>
        </form>
        <div className="mt-8">
          <a
            href={amazonUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-ghost-brand !text-white"
          >
            Buy on Amazon
          </a>
        </div>
      </div>
    </section>
  );
}
