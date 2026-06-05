import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Dalail al-Khairat",
  description:
    "Learn about this SEO-first Dalail al-Khairat reader and the MVP focus on readable devotional text.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <main className="section-shell page-stack">
      <section className="page-hero narrow" data-aos="fade-up">
        <p className="eyebrow">About</p>
        <h1>A focused web reader for Dalail al-Khairat</h1>
        <p>
          This MVP turns the mirrored reference content into a clean, fast, search-friendly reading experience.
        </p>
      </section>

      <section className="prose-card" data-aos="fade-up">
        <h2>Product principles</h2>
        <p>
          The first release prioritizes SEO, mobile reading comfort, semantic server-rendered content, and simple navigation. Features like accounts, bookmarks, audio controls, and advanced reader settings can come later.
        </p>
        <h2>Current scope</h2>
        <p>
          The MVP includes core reading pages, metadata, sitemap, robots, internal links, and search over extracted Arabic and English text.
        </p>
        <Link className="button primary" href="/dalail-al-khairat">Browse readings</Link>
      </section>
    </main>
  );
}
