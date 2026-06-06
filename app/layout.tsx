import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Naskh_Arabic, Source_Sans_3 } from "next/font/google";
import Link from "next/link";
import { AosInit } from "./components/aos-init";
import { siteUrl } from "@/lib/content";
import "aos/dist/aos.css";
import "./globals.css";
import "./batch2.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const notoNaskh = Noto_Naskh_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

const title = "Dalail al-Khairat Online";
const description =
  "Read Dalail al-Khairat online with Arabic text, English translation, daily parts, and search.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Dalail al-Khairat Online",
  },
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Dalail al-Khairat Online",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const navigation = [
  { href: "/dalail-al-khairat", label: "Read" },
  { href: "/search", label: "Search" },
  { href: "/about", label: "About" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sourceSans.variable} ${cormorant.variable} ${notoNaskh.variable} scroll-smooth`}
    >
      <body>
        <AosInit />
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <header className="site-header" data-aos="fade-down" data-aos-duration="600">
          <Link className="brand" href="/" aria-label="Dalail al-Khairat Online home">
            <span className="brand-mark">د</span>
            <span>Dalail al-Khairat</span>
          </Link>
          <nav className="site-nav" aria-label="Main navigation">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
        <div id="main-content">{children}</div>
        <footer className="site-footer" data-aos="fade-up">
          <p>Read Dalail al-Khairat with Arabic text and English translation.</p>
          <div>
            <Link href="/dalail-al-khairat">All readings</Link>
            <Link href="/search">Search</Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
