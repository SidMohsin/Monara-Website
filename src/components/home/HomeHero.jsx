import { home } from "@/content/copy";
import { site } from "@/content/site";
import { getMedia } from "@/content/media";
import { ButtonLink, ArrowLink } from "@/components/ui/Links";
import Timecode from "./Timecode";
import Positioning from "@/components/brand/Positioning";

/**
 * Full-viewport dark hero. If the hero video (media "home-hero") is supplied it plays
 * behind a scrim; until then a line-drawn "A" from the logo carries the composition.
 */
export default function HomeHero() {
  const video = getMedia("home-hero");
  const words = home.hero.heading.split(" ");

  return (
    <section aria-labelledby="hero-heading" className="grain relative flex min-h-[100svh] flex-col overflow-hidden bg-ink text-white">
      {/* Background */}
      {video.src ? (
        <>
          <video className="absolute inset-0 h-full w-full object-cover" src={video.src} poster={video.poster || undefined} muted loop playsInline autoPlay preload="metadata" aria-hidden="true" />
          <div className="absolute inset-0 bg-black/55" aria-hidden="true" />
        </>
      ) : (
        <div className="absolute inset-0" aria-hidden="true">
          {/* soft key light */}
          <div className="absolute -right-[10%] top-[-10%] h-[90%] w-[70%] rounded-full bg-teal/25 blur-[120px]" />
          {/* the logo "A", drawn */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="xMaxYMax meet" className="absolute bottom-0 right-[-38%] h-[78%] w-auto opacity-45 sm:right-[-10%] sm:h-[88%] sm:opacity-70 lg:right-[4%] lg:opacity-90">
            <path d="M8 100 L50 6 L92 100" fill="none" stroke="#096B6C" strokeWidth="9.5" strokeLinejoin="miter" pathLength="1" className="draw-line" />
            <circle cx="50" cy="62" r="5.2" fill="#5FB3B3" className="fade-in-late max-sm:hidden" />
          </svg>
          {/* horizon guides */}
          <div className="absolute inset-x-0 top-2/3 h-px bg-white/[0.07]" />
          <div className="absolute inset-y-0 left-1/3 w-px bg-white/[0.05]" />
        </div>
      )}

      {/* Viewfinder HUD */}
      <div className="pointer-events-none absolute inset-[clamp(14px,2.4vw,32px)] top-[calc(clamp(14px,2.4vw,32px)+76px)] z-[2] lg:top-[calc(clamp(14px,2.4vw,32px)+92px)]" aria-hidden="true">
        <span className="absolute left-0 top-0 h-6 w-6 border-l border-t border-white/40" />
        <span className="absolute right-0 top-0 h-6 w-6 border-r border-t border-white/40" />
        <span className="absolute bottom-0 left-0 h-6 w-6 border-b border-l border-white/40" />
        <span className="absolute bottom-0 right-0 h-6 w-6 border-b border-r border-white/40" />
        <div className="absolute left-6 top-4 hidden items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white/60 sm:flex">
          <span className="rec-dot h-2 w-2 rounded-full bg-teal-light" /> Rec
        </div>
        <div className="absolute right-6 top-4 hidden text-[11px] tracking-[0.2em] text-white/60 sm:block">
          <Timecode />
        </div>
        {!video.src && (
          <div className="absolute bottom-4 right-6 hidden text-[10px] uppercase tracking-[0.2em] text-white/45 md:block">Placeholder · Hero film awaiting client footage</div>
        )}
      </div>

      {/* Content */}
      <div className="container-x relative z-[3] flex flex-1 flex-col justify-end pb-[clamp(88px,11vh,128px)] pt-48 lg:pt-56">
        <div className="fade-in-late" style={{ animationDelay: "0.1s" }}>
          <Positioning className="text-teal-light" />
        </div>
        <h1 id="hero-heading" className="display-caps mt-6 max-w-[15ch] text-display" style={{ fontSize: "min(var(--text-display), 12.5svh)" }}>
          {words.map((w, i) => (
            <span key={i} className="hero-word mr-[0.22em]" style={{ "--i": i }}>
              {w}
            </span>
          ))}
        </h1>
        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="fade-in-late max-w-md text-lead font-light text-white/85">{home.hero.tagline}</p>
          <div className="fade-in-late flex flex-wrap items-center gap-x-8 gap-y-5">
            <ButtonLink href={site.cta.href} variant="solid" tone="dark">
              {site.cta.label}
            </ButtonLink>
            <ArrowLink href="/#services" className="text-white">
              Explore our services
            </ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
