// Abstract, on-brand compositions used while real imagery is missing.
// Deliberately non-photographic so they can never be mistaken for client work.

const T = "#096B6C";
const TL = "#5FB3B3";
const W_ = "#FFFFFF";

function ratioToNum(ratio) {
  const [w, h] = ratio.split("/").map(Number);
  return w / h;
}

// deterministic pseudo-random so server and client render the same
function rand(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

const line = { fill: "none", vectorEffect: "non-scaling-stroke" };

function Plinth({ W, H }) {
  const cx = W * 0.5;
  const s = Math.min(W, H) * 0.22;
  const top = H * 0.36;
  return (
    <g>
      <ellipse cx={cx} cy={H * 0.8} rx={s * 1.9} ry={s * 0.28} fill={T} opacity="0.28" />
      <ellipse cx={cx} cy={H * 0.8} rx={s * 1.9} ry={s * 0.28} stroke={TL} strokeOpacity="0.5" strokeWidth="1" style={line} />
      {/* product box, isometric */}
      <path d={`M${cx - s} ${top + s * 0.5} L${cx} ${top} L${cx + s} ${top + s * 0.5} L${cx} ${top + s} Z`} fill={T} opacity="0.55" />
      <path
        d={`M${cx - s} ${top + s * 0.5} L${cx - s} ${top + s * 1.9} L${cx} ${top + s * 2.4} L${cx + s} ${top + s * 1.9} L${cx + s} ${top + s * 0.5} M${cx} ${top + s} L${cx} ${top + s * 2.4}`}
        stroke={TL}
        strokeWidth="1.25"
        style={line}
      />
      {/* key light */}
      <circle cx={W * 0.82} cy={H * 0.18} r={Math.min(W, H) * 0.035} fill={TL} opacity="0.9" />
      <path d={`M${W * 0.82} ${H * 0.18} L${cx + s * 0.4} ${top + s * 0.2}`} stroke={W_} strokeOpacity="0.18" strokeDasharray="2 4" strokeWidth="1" style={line} />
    </g>
  );
}

function Horizon({ W, H, uid }) {
  const hy = H * 0.64;
  const r = Math.min(W, H) * 0.12;
  return (
    <g>
      <defs>
        <clipPath id={`${uid}-sky`}>
          <rect x="0" y="0" width={W} height={hy} />
        </clipPath>
      </defs>
      <circle cx={W * 0.66} cy={hy} r={r} fill={T} clipPath={`url(#${uid}-sky)`} />
      <circle cx={W * 0.66} cy={hy} r={r * 1.6} stroke={TL} strokeOpacity="0.35" strokeWidth="1" style={line} clipPath={`url(#${uid}-sky)`} />
      <path d={`M0 ${hy} H${W}`} stroke={TL} strokeWidth="1.25" style={line} />
      {[0.08, 0.17, 0.28].map((d, i) => (
        <path key={i} d={`M0 ${hy + H * d} H${W}`} stroke={W_} strokeOpacity={0.14 - i * 0.03} strokeWidth="1" style={line} />
      ))}
      {/* reflection */}
      <rect x={W * 0.66 - r * 0.7} y={hy + H * 0.04} width={r * 1.4} height="1.6" fill={T} opacity="0.8" />
      <rect x={W * 0.66 - r * 0.45} y={hy + H * 0.1} width={r * 0.9} height="1.4" fill={T} opacity="0.55" />
      <rect x={W * 0.66 - r * 0.25} y={hy + H * 0.17} width={r * 0.5} height="1.2" fill={T} opacity="0.35" />
      {/* letterbox */}
      <rect x="0" y="0" width={W} height={H * 0.08} fill="#000" opacity="0.6" />
      <rect x="0" y={H * 0.92} width={W} height={H * 0.08} fill="#000" opacity="0.6" />
    </g>
  );
}

function Waveform({ W, H }) {
  const r = rand(7);
  const n = Math.round(W / 2.2);
  const step = (W * 0.84) / n;
  const x0 = W * 0.08;
  const cy = H * 0.42;
  return (
    <g>
      {Array.from({ length: n }).map((_, i) => {
        const a = (Math.sin(i / 5) * 0.5 + 0.5) * 0.7 + r() * 0.3;
        const h = a * H * 0.26 + 1;
        return <rect key={i} x={x0 + i * step} y={cy - h / 2} width={step * 0.5} height={h} fill={i < n * 0.62 ? T : W_} opacity={i < n * 0.62 ? 0.9 : 0.18} />;
      })}
      <path d={`M${x0 + n * 0.62 * step} ${H * 0.18} V${H * 0.86}`} stroke={TL} strokeWidth="1.5" style={line} />
      {[0.66, 0.74, 0.82].map((y, i) => (
        <g key={i}>
          <rect x={x0} y={H * y} width={W * 0.84} height={H * 0.045} fill={W_} opacity="0.06" />
          <rect x={x0 + W * (0.05 + i * 0.12)} y={H * y} width={W * (0.22 + i * 0.05)} height={H * 0.045} fill={T} opacity={0.75 - i * 0.2} />
        </g>
      ))}
    </g>
  );
}

function Wire({ W, H, uid }) {
  const vx = W * 0.5;
  const vy = H * 0.42;
  const floor = [];
  for (let i = -8; i <= 8; i++) floor.push(`M${vx} ${vy} L${vx + i * W * 0.16} ${H}`);
  const rows = [0.55, 0.62, 0.71, 0.83, 1].map((t) => `M0 ${H * t} H${W}`);
  const s = Math.min(W, H) * 0.14;
  const cx = W * 0.5;
  const cy = H * 0.3;
  const o = s * 0.45;
  return (
    <g>
      <path d={floor.join(" ")} stroke={T} strokeOpacity="0.55" strokeWidth="1" style={line} />
      <path d={rows.join(" ")} stroke={T} strokeOpacity="0.4" strokeWidth="1" style={line} />
      <rect x="0" y={vy - 0.5} width={W} height={H - vy} fill={`url(#${uid}-fade)`} />
      <defs>
        <linearGradient id={`${uid}-fade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b0e0e" stopOpacity="1" />
          <stop offset="0.35" stopColor="#0b0e0e" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={`M${cx - s} ${cy - s} h${s * 2} v${s * 2} h${-s * 2} Z M${cx - s + o} ${cy - s - o} h${s * 2} v${s * 2} h${-s * 2} Z M${cx - s} ${cy - s} l${o} ${-o} M${cx + s} ${cy - s} l${o} ${-o} M${cx + s} ${cy + s} l${o} ${-o} M${cx - s} ${cy + s} l${o} ${-o}`}
        stroke={TL}
        strokeWidth="1.25"
        style={line}
      />
      <circle cx={cx + o / 2} cy={cy - o / 2} r={s * 0.18} fill={T} />
    </g>
  );
}

function Triangle({ W, H }) {
  // the logo's "A" with its dot, as a compositional motif
  const h = H * 0.7;
  const w = h * 0.95;
  const x = W * (W / H > 1.4 ? 0.62 : 0.5);
  const top = H * 0.16;
  const sw = w * 0.11;
  return (
    <g>
      <path d={`M${x - w / 2} ${top + h} L${x} ${top} L${x + w / 2} ${top + h}`} stroke={T} strokeWidth={sw} fill="none" strokeLinejoin="miter" />
      <circle cx={x} cy={top + h * 0.6} r={sw * 0.55} fill={TL} />
      <path d={`M${x - w * 0.9} ${top + h} H${x + w * 0.9}`} stroke={W_} strokeOpacity="0.16" strokeWidth="1" style={line} />
    </g>
  );
}

function Grid({ W, H }) {
  const cols = Math.round(W / 9);
  const rows = 9;
  const dots = [];
  for (let i = 0; i < cols; i++)
    for (let j = 0; j < rows; j++) dots.push(<circle key={`${i}-${j}`} cx={(i + 0.5) * (W / cols)} cy={H * 0.12 + j * H * 0.095} r="0.55" fill={W_} opacity="0.22" />);
  const r = rand(3);
  const pts = Array.from({ length: 9 }, (_, i) => [W * 0.08 + (i * W * 0.84) / 8, H * (0.78 - i * 0.065 + (r() - 0.5) * 0.08)]);
  return (
    <g>
      {dots}
      <path d={`M${pts.map((p) => p.join(" ")).join(" L")}`} stroke={TL} strokeWidth="1.5" style={line} />
      <path d={`M${pts.map((p) => p.join(" ")).join(" L")} V${H * 0.9} H${W * 0.08} Z`} fill={T} opacity="0.3" />
      {pts.map((p, i) => (i % 2 === 0 ? <circle key={i} cx={p[0]} cy={p[1]} r={Math.min(W, H) * 0.012} fill={TL} /> : null))}
    </g>
  );
}

function Contact({ W, H }) {
  // social / digital: staggered vertical post frames
  const fh = H * 0.62;
  const fw = fh * 0.5625;
  const gap = fw * 0.22;
  const total = fw * 3 + gap * 2;
  const x0 = (W - total) / 2;
  return (
    <g>
      {[0, 1, 2].map((i) => {
        const x = x0 + i * (fw + gap);
        const y = H * 0.19 + (i === 1 ? -H * 0.05 : H * 0.03);
        return (
          <g key={i}>
            <rect x={x} y={y} width={fw} height={fh} rx={fw * 0.08} stroke={i === 1 ? TL : W_} strokeOpacity={i === 1 ? 1 : 0.25} strokeWidth="1.25" style={line} />
            <rect x={x + fw * 0.08} y={y + fh * 0.08} width={fw * 0.84} height={fh * 0.56} fill={T} opacity={i === 1 ? 0.85 : 0.35} />
            <rect x={x + fw * 0.08} y={y + fh * 0.7} width={fw * 0.6} height={fh * 0.035} fill={W_} opacity="0.3" />
            <rect x={x + fw * 0.08} y={y + fh * 0.78} width={fw * 0.4} height={fh * 0.035} fill={W_} opacity="0.18" />
          </g>
        );
      })}
    </g>
  );
}

function Aperture({ W, H }) {
  const cx = W * (W / H > 1.4 ? 0.64 : 0.5);
  const cy = H * 0.5;
  const R = Math.min(W, H) * 0.34;
  const blades = Array.from({ length: 6 }, (_, i) => {
    const a = (i / 6) * Math.PI * 2;
    const a2 = a + Math.PI / 3;
    const p1 = [cx + Math.cos(a) * R, cy + Math.sin(a) * R];
    const p2 = [cx + Math.cos(a2 + 0.5) * R * 0.38, cy + Math.sin(a2 + 0.5) * R * 0.38];
    return `M${p1[0]} ${p1[1]} L${p2[0]} ${p2[1]}`;
  });
  return (
    <g>
      <circle cx={cx} cy={cy} r={R * 1.25} stroke={W_} strokeOpacity="0.12" strokeWidth="1" style={line} />
      <circle cx={cx} cy={cy} r={R} stroke={TL} strokeWidth="1.25" style={line} />
      <circle cx={cx} cy={cy} r={R * 0.4} fill={T} opacity="0.9" />
      <path d={blades.join(" ")} stroke={TL} strokeOpacity="0.7" strokeWidth="1" style={line} />
      <circle cx={cx - R * 0.12} cy={cy - R * 0.12} r={R * 0.08} fill={W_} opacity="0.35" />
    </g>
  );
}

const ARTS = { plinth: Plinth, horizon: Horizon, waveform: Waveform, wire: Wire, triangle: Triangle, grid: Grid, contact: Contact, aperture: Aperture };

export default function PlaceholderArt({ art = "triangle", ratio = "16/9", uid = "ph" }) {
  const H = 100;
  const W = Math.round(ratioToNum(ratio) * H * 100) / 100;
  const Art = ARTS[art] || Triangle;
  const glowId = `${uid}-glow`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id={glowId} cx="0.62" cy="0.38" r="0.75">
          <stop offset="0" stopColor={T} stopOpacity="0.32" />
          <stop offset="1" stopColor={T} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={W} height={H} fill="#0b0e0e" />
      <rect width={W} height={H} fill={`url(#${glowId})`} />
      <Art W={W} H={H} uid={uid} />
    </svg>
  );
}
