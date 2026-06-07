import Link from "next/link";
import { getReading, getReadings, getTodayReading, getTodayReadings } from "@/lib/content";
import { SacredText } from "./components/sacred-text";

export const dynamic = "force-dynamic";

export default function Home() {
  const parts = getReadings().filter((reading) => reading.kind === "part");
  const today = getTodayReading();
  const todaysReadings = getTodayReadings();
  const preview = getReading(today?.slug ?? "part-1")?.paragraphs[0];

  return (
    <main>
      <section className="hero section-shell home-hero" id="home-top">
        <div className="home-hero-copy" data-aos="fade-up" data-aos-delay="80">
          <p className="eyebrow">دلائل الخيرات</p>
          <h1>Read Dalail al-Khairat in a calmer, faster web reader.</h1>
          <p className="hero-copy">
            Daily parts, Arabic text, and English translation for focused devotional reading.
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
              <dt>2</dt>
              <dd>text views</dd>
            </div>
            <div>
              <dt>7</dt>
              <dd>day cycle</dd>
            </div>
          </dl>
        </div>

        <aside className="home-preview" data-aos="fade-left" data-aos-delay="180" aria-label="Today’s reading preview">
          <span>Today’s reading</span>
          <h2>{today?.title ?? "Daily reading"}</h2>
          <p className="preview-day">{todaysReadings.label}</p>
          <div className="home-preview-scroll">
            <ul className="today-sequence" aria-label="Today’s reading sequence">
              {todaysReadings.readings.map((reading) => (
                <li key={reading.slug}>{reading.title}</li>
              ))}
            </ul>
            {preview?.arabic ? (
              <p className="preview-arabic" lang="ar" dir="rtl">
                {preview.arabic}
              </p>
            ) : null}
            {preview?.translation ? <p className="preview-translation"><SacredText text={preview.translation} /></p> : null}
          </div>
          <Link href={today ? `/dalail-al-khairat/${today.slug}` : "/dalail-al-khairat"}>Open reading</Link>
        </aside>

        <a className="home-down" href="#home-values" aria-label="Scroll to next section">
          ↓
        </a>
      </section>

      <section className="section-shell value-strip" id="home-values" aria-label="Reader value proposition">
        <article data-aos="fade-up" data-aos-delay="0">
          <span>01</span>
          <h2>Find today’s part quickly</h2>
          <p>The weekly cycle is surfaced directly, including the Monday completion and new beginning.</p>
        </article>
        <article data-aos="fade-up" data-aos-delay="120">
          <span>02</span>
          <h2>Read without visual noise</h2>
          <p>Arabic text and translation are presented with clear hierarchy.</p>
        </article>
        <article data-aos="fade-up" data-aos-delay="240">
          <span>03</span>
          <h2>Search the text</h2>
          <p>Find Arabic phrases and English translation across the readings.</p>
        </article>
      </section>

      <section className="section-shell split-section content-preview-section" aria-labelledby="content-preview">
        <div data-aos="fade-right">
          <p className="eyebrow">Preview</p>
          <h2 id="content-preview">Arabic and translation in one focused flow</h2>
          <p>The reader keeps the devotional text primary while making supporting text easy to scan.</p>
        </div>
        <div className="mini-reader-card" data-aos="fade-left" data-aos-delay="120">
          <div className="mini-reader-scroll">
            {preview?.arabic ? (
              <p className="arabic" lang="ar" dir="rtl">
                {preview.arabic}
              </p>
            ) : null}
            {preview?.translation ? <p className="translation"><SacredText text={preview.translation} /></p> : null}
          </div>
        </div>
      </section>

      <section className="section-shell split-section" aria-labelledby="daily-reading">
        <div data-aos="fade-right">
          <p className="eyebrow">Daily Wird</p>
          <h2 id="daily-reading">Browse by daily part</h2>
          <p>Move through the weekly recitation cycle from Monday through Sunday, completing and beginning again on Monday.</p>
        </div>
        <div className="card-grid compact" data-aos="fade-left" data-aos-delay="120">
          {parts.map((part) => (
            <Link className="reading-card" href={`/dalail-al-khairat/${part.slug}`} key={part.slug}>
              <span>{part.day ?? "Completion"}</span>
              <strong>{part.title}</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-shell feature-panel" data-aos="fade-up" aria-labelledby="reading-focus">
        <p className="eyebrow">Reading</p>
        <h2 id="reading-focus">A simple way to keep the weekly wird</h2>
        <div className="feature-grid">
          <article>
            <h3>Begin</h3>
            <p>Open with the introductory duas and names sections before the daily recitation.</p>
          </article>
          <article>
            <h3>Read</h3>
            <p>Follow the daily parts with clear Arabic text and English translation.</p>
          </article>
          <article>
            <h3>Complete</h3>
            <p>Continue through the completion dua and return to the cycle when ready.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
