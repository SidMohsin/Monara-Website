import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "MONARA Productions: Every Frame Tells a Story.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded share image (uses the TEMPORARY traced logo until the official SVG is supplied).
export default async function OgImage() {
  const svg = await readFile(path.join(process.cwd(), "public/brand/monara-logo-reverse.svg"));
  const logo = `data:image/svg+xml;base64,${svg.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#000", padding: 72, color: "#fff", position: "relative" }}>
        <div style={{ position: "absolute", left: 36, top: 36, width: 40, height: 40, borderLeft: "2px solid rgba(255,255,255,.5)", borderTop: "2px solid rgba(255,255,255,.5)" }} />
        <div style={{ position: "absolute", right: 36, top: 36, width: 40, height: 40, borderRight: "2px solid rgba(255,255,255,.5)", borderTop: "2px solid rgba(255,255,255,.5)" }} />
        <div style={{ position: "absolute", left: 36, bottom: 36, width: 40, height: 40, borderLeft: "2px solid rgba(255,255,255,.5)", borderBottom: "2px solid rgba(255,255,255,.5)" }} />
        <div style={{ position: "absolute", right: 36, bottom: 36, width: 40, height: 40, borderRight: "2px solid rgba(255,255,255,.5)", borderBottom: "2px solid rgba(255,255,255,.5)" }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} width={420} height={123} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, letterSpacing: 2, textTransform: "uppercase" }}>Every Frame Tells a Story.</div>
          <div style={{ marginTop: 20, fontSize: 24, letterSpacing: 8, color: "#5FB3B3", textTransform: "uppercase" }}>Creativity · Production · Smart Tech</div>
        </div>
      </div>
    ),
    size,
  );
}
