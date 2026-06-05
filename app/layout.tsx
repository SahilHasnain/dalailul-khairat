import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Naskh_Arabic, Source_Sans_3 } from "next/font/google";
import Link from "next/link";
import { siteUrl } from "@/lib/content";
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
  "Read Dalail al-Khairat online with Arabic text, transliteration, English translation, daily parts, and search.";

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
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <header className="site-header">
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
        <footer className="site-footer">
          <p>Built as an SEO-first reader for Dalail al-Khairat.</p>
          <div>
            <Link href="/dalail-al-khairat">All readings</Link>
            <Link href="/search">Search</Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
