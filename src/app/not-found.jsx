import { ButtonLink, ArrowLink } from "@/components/ui/Links";
import FrameMarks from "@/components/media/FrameMarks";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[100svh] items-center overflow-hidden bg-ink text-white">
      <FrameMarks inset="clamp(16px,3vw,36px)" />
      <div className="container-x relative z-[3] pt-24">
        <p className="eyebrow flex items-center gap-3 text-teal-light">
          <span className="rec-dot h-2 w-2 rounded-full bg-teal-light" aria-hidden="true" />
          404 · Out of frame
        </p>
        <h1 className="display-caps mt-6 max-w-4xl text-h1">This page isn&apos;t in the shot.</h1>
        <p className="mt-6 max-w-xl text-lead font-light text-white/80">The page you are looking for may have moved or no longer exists.</p>
        <div className="mt-12 flex flex-wrap items-center gap-8">
          <ButtonLink href="/" variant="solid" tone="dark">
            Back to home
          </ButtonLink>
          <ArrowLink href="/#services" className="text-white">
            Our services
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}
