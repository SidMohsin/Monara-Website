import Link from "next/link";

export function Arrow({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" className={`shrink-0 transition-transform duration-500 ease-out-soft ${className}`} aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

/** Primary / outline button-style link. */
export function ButtonLink({ href, children, variant = "solid", tone = "light", className = "", ...rest }) {
  const base = "group inline-flex items-center gap-3 px-6 py-4 text-sm font-medium uppercase tracking-[0.16em] transition-colors duration-300";
  const styles = {
    "solid-light": "bg-teal text-white hover:bg-teal-deep",
    "solid-dark": "bg-white text-ink hover:bg-teal-light",
    "outline-light": "border border-ink/25 text-ink hover:border-ink",
    "outline-dark": "border border-white/35 text-white hover:border-white",
  }[`${variant}-${tone}`];
  return (
    <Link href={href} className={`${base} ${styles} ${className}`} {...rest}>
      {children}
      <Arrow className="group-hover:translate-x-1" />
    </Link>
  );
}

/** Text link with arrow. */
export function ArrowLink({ href, children, className = "", ...rest }) {
  return (
    <Link href={href} className={`group inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.16em] ${className}`} {...rest}>
      <span className="link-underline pb-1">{children}</span>
      <Arrow className="group-hover:translate-x-1" />
    </Link>
  );
}
