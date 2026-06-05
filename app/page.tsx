import Link from "next/link";
import { getReading, getReadings, getTodayReading } from "@/lib/content";

export const dynamic = "force-dynamic";

export default function Home() {
  const parts = getReadings().filter((reading) => reading.kind === "part");
  const today = getTodayReading();
  const preview = getReading(today?.slug ?? "part-1")?.paragraphs[0];

  return (
    <main>
      <section className="hero section-shell home-hero">
        <div className="home-hero-copy">
          <p className="eyebrow">دلائل الخيرات</p>
          <h1>Read Dalail al-Khairat in a calmer, faster web reader.</h1>
          <p className="hero-copy">
            Daily parts, Arabic text, transliteration, English translation, and search-friendly pages designed for focused devotional reading.
          </p>
          <div className="hero-actions">
            <Link className="button primary" href={today ? `/dalail-al-khairat/${today.slug}` : "/dalail-al-khairat"}>
              Start Today’s Reading
            </Link>
            <Link className="button secondary" href="/dalail-al-khairat">
              Browse All Parts
            </Link>
            <Link className="button ghost" href="/search">
              Search Text
            </Link>
          </div>
          <dl className="home-stats" aria-label="Reader features">
            <div>
              <dt>13</dt>
              <dd>reading sections</dd>
            </div>
            <div>
              <dt>3</dt>
              <dd>text views</dd>
            </div>
            <div>
              <dt>SEO</dt>
              <dd>server-rendered</dd>
            </div>
          </dl>
        </div>

        <aside className="home-preview" aria-label="Today’s reading preview">
          <span>Today’s reading</span>
          <h2>{today?.title ?? "Daily reading"}</h2>
          {today?.day ? <p className="preview-day">{today.day} wird</p> : null}
          {preview?.arabic ? (
            <p className="preview-arabic" lang="ar" dir="rtl">
              {preview.arabic}
            </p>
          ) : null}
          {preview?.translation ? <p className="preview-translation">{preview.translation}</p> : null}
          <Link href={today ? `/dalail-al-khairat/${today.slug}` : "/dalail-al-khairat"}>Open reading</Link>
        </aside>
      </section>

      <section className="section-shell value-strip" aria-label="Reader value proposition">
        <article>
          <span>01</span>
          <h2>Find today’s part quickly</h2>
          <p>The weekly cycle is surfaced directly from the homepage and reader index.</p>
        </article>
        <article>
          <span>02</span>
          <h2>Read without visual noise</h2>
          <p>Arabic text, transliteration, and translation are presented with clear hierarchy.</p>
        </article>
        <article>
          <span>03</span>
          <h2>Search real content</h2>
          <p>Search links directly to passages, not just pages.</p>
        </article>
      </section>

      <section className="section-shell split-section content-preview-section" aria-labelledby="content-preview">
        <div>
          <p className="eyebrow">Preview</p>
          <h2 id="content-preview">Arabic, transliteration, and translation in one flow</h2>
          <p>
            The reader keeps the devotional text primary while making supporting text easy to scan.
          </p>
        </div>
        <div className="mini-reader-card">
          {preview?.arabic ? (
            <p className="arabic" lang="ar" dir="rtl">
              {preview.arabic}
            </p>
          ) : null}
          {preview?.transliteration ? <p className="transliteration">{preview.transliteration}</p> : null}
          {preview?.translation ? <p className="translation">{preview.translation}</p> : null}
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
