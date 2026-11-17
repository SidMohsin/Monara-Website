import Link from "next/link";
import Media from "@/components/media/Media";
import { getCapability } from "@/lib/services";
import { Arrow } from "@/components/ui/Links";

export default function WorkCard({ project, ratio, sizes = "(min-width: 1024px) 50vw, 100vw", headingLevel = 3, className = "" }) {
  const H = `h${headingLevel}`;
  const tags = project.capabilities.map((s) => getCapability(s)?.title).filter(Boolean);
  return (
    <article className={`group ${className}`} data-reveal>
      <Link href={`/work/${project.slug}`} className="block">
        <div className="overflow-hidden">
          <div className="transition-transform duration-[1.2s] ease-out-soft group-hover:scale-[1.03]">
            <Media id={project.cover} ratio={ratio} sizes={sizes} reveal={false} />
          </div>
        </div>
        <div className="mt-5 flex items-start justify-between gap-6">
          <div>
            {project.placeholder && (
              <p className="mb-2 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-teal">
                <span className="h-1.5 w-1.5 rounded-full bg-teal" aria-hidden="true" />
                Placeholder project
              </p>
            )}
            <H className="display-caps text-h3">{project.title}</H>
            <p className="mt-2 text-sm text-muted">
              {project.client} · <span className="tabular">{project.year}</span>
            </p>
          </div>
          <Arrow className="mt-8 text-muted group-hover:translate-x-1 group-hover:text-teal" />
        </div>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Services">
          {tags.map((t) => (
            <li key={t} className="border border-line px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-muted">
              {t}
            </li>
          ))}
        </ul>
      </Link>
    </article>
  );
}
