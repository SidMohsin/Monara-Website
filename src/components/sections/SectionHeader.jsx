/** Section opener: numbered eyebrow + heading, optional aside (link / text). */
export default function SectionHeader({ index, eyebrow, title, id, aside, dark = false, className = "" }) {
  return (
    <div className={`flex flex-col gap-6 border-t pt-6 md:flex-row md:items-end md:justify-between ${dark ? "border-ink-line" : "border-line"} ${className}`}>
      <div>
        <p className={`eyebrow flex items-center gap-3 ${dark ? "text-teal-light" : "text-teal"}`} data-reveal>
          {index && <span className="tabular">{index}</span>}
          {index && <span aria-hidden="true" className={`h-px w-8 ${dark ? "bg-teal-light/60" : "bg-teal/60"}`} />}
          {eyebrow}
        </p>
        {title && (
          <h2 id={id} className="display-caps mt-5 text-h2" data-reveal style={{ "--reveal-i": 1 }}>
            {title}
          </h2>
        )}
      </div>
      {aside && (
        <div data-reveal style={{ "--reveal-i": 2 }}>
          {aside}
        </div>
      )}
    </div>
  );
}
