import { Jost } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MotionController from "@/components/motion/MotionController";
import { site } from "@/content/site";
import { SITE_URL, INDEXABLE } from "@/lib/seo";

const jost = Jost({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-jost", display: "swap" });

export const metadata = {
  // Absolute URLs for share images: the real domain once set, else the Vercel deployment URL, else local.
  metadataBase: new URL(SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")),
  title: { default: `${site.name} | ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  // Until a real domain is configured, nothing is indexed.
  ...(INDEXABLE ? {} : { robots: { index: false, follow: false } }),
  openGraph: { siteName: site.name, type: "website", locale: "en_LK" },
};

export const viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={jost.variable} suppressHydrationWarning>
      <head>
        {/* Enables motion styles only once JS runs, so content is never hidden without JS */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MotionController />
        {/* Vercel Web Analytics: cookieless page-view counts; only reports when hosted on Vercel */}
        <Analytics />
      </body>
    </html>
  );
}
