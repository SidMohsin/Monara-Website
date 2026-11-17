// Marks text awaiting client approval. Visible only when NEXT_PUBLIC_SHOW_DRAFTS=true.
const SHOW = process.env.NEXT_PUBLIC_SHOW_DRAFTS === "true";

export default function Draft({ on = true, children }) {
  if (!SHOW || !on) return children ?? null;
  return (
    <span className="relative">
      {children}
      <span className="ml-2 inline-block translate-y-[-0.4em] rounded-sm bg-teal px-1.5 py-0.5 align-middle text-[10px] font-medium uppercase not-italic leading-none tracking-[0.15em] text-white">
        Draft
      </span>
    </span>
  );
}
