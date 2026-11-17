// Viewfinder corner marks + faint rule-of-thirds guides.
export default function FrameMarks({ thirds = true, inset = "clamp(10px, 2vw, 20px)", size = "clamp(14px, 2.2vw, 26px)", className = "" }) {
  const corner = "absolute border-white/55";
  const s = { width: size, height: size };
  return (
    <div className={`pointer-events-none absolute inset-0 z-[2] ${className}`} aria-hidden="true">
      {thirds && (
        <>
          <div className="absolute inset-y-0 left-1/3 w-px bg-white/[0.06]" />
          <div className="absolute inset-y-0 left-2/3 w-px bg-white/[0.06]" />
          <div className="absolute inset-x-0 top-1/3 h-px bg-white/[0.06]" />
          <div className="absolute inset-x-0 top-2/3 h-px bg-white/[0.06]" />
        </>
      )}
      <div className={`${corner} border-l border-t`} style={{ ...s, left: inset, top: inset }} />
      <div className={`${corner} border-r border-t`} style={{ ...s, right: inset, top: inset }} />
      <div className={`${corner} border-b border-l`} style={{ ...s, left: inset, bottom: inset }} />
      <div className={`${corner} border-b border-r`} style={{ ...s, right: inset, bottom: inset }} />
    </div>
  );
}
