import Image from "next/image";

// TEMPORARY logo files: auto-traced from Docs/monara_logo.jpeg. Replace /public/brand/*.svg
// with the client's official SVGs (same file names) and nothing else needs to change.
const FILES = {
  color: "/brand/monara-logo.svg", // black + teal, for light backgrounds
  reverse: "/brand/monara-logo-reverse.svg", // white + light teal #5FB3B3, for dark backgrounds (option C)
  white: "/brand/monara-logo-white.svg", // all white mono version (kept in the kit, currently unused)
};
const RATIO = 1282 / 376;

export default function Logo({ variant = "color", height = 34, className = "", priority = false }) {
  return (
    <Image
      src={FILES[variant]}
      alt="MONARA Productions"
      width={Math.round(height * RATIO)}
      height={height}
      priority={priority}
      unoptimized
      className={className}
      style={{ height, width: "auto" }}
    />
  );
}
