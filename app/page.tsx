import Link from "next/link";
import { getReadings } from "@/lib/content";

export default function Home() {
  const parts = getReadings().filter((reading) => reading.kind === "part");

  return (
    <main>
      <section className="hero section-shell">
        <p className="eyebrow">دلائل الخيرات</p>
        <h1>Read Dalail al-Khairat online with clarity, speed, and reverence.</h1>
        <p className="hero-copy">
          A clean reader for the daily litanies, Arabic text, transliteration, English translation, and search-friendly pages.
        </p>
        <div className="hero-actions">
          <Link className="button primary" href="/dalail-al-khairat">
            Start Reading
          </Link>
          <Link className="button secondary" href="/search">
            Search Text
          </Link>
        </div>
      </section>

      <section className="section-shell split-section" aria-labelledby="daily-reading">
        <div>
          <p className="eyebrow">Daily Wird</p>
          <h2 id="daily-reading">Browse by daily part</h2>
          <p>
            Each reading has a permanent, crawlable URL with meaningful page metadata and internal links.
          </p>
        </div>
        <div className="card-grid compact">
          {parts.map((part) => (
            <Link className="reading-card" href={`/dalail-al-khairat/${part.slug}`} key={part.slug}>
              <span>{part.day ?? "Completion"}</span>
              <strong>{part.title}</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-shell feature-panel" aria-labelledby="mvp-focus">
        <p className="eyebrow">MVP Focus</p>
        <h2 id="mvp-focus">SEO-first, reader-first</h2>
        <div className="feature-grid">
          <article>
            <h3>Semantic HTML</h3>
            <p>Core devotional text is rendered on the server so search engines and users receive useful content immediately.</p>
          </article>
          <article>
            <h3>Reading UX</h3>
            <p>Large Arabic typography, calm spacing, and focused content hierarchy improve long-form reading on mobile.</p>
          </article>
          <article>
            <h3>Fast Discovery</h3>
            <p>The search page indexes the extracted source content and links directly to matching paragraphs.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
