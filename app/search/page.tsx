import type { Metadata } from "next";
import Link from "next/link";
import { getAllReadingContent } from "@/lib/content";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export const metadata: Metadata = {
  title: "Search Dalail al-Khairat",
  description: "Search the Arabic text, transliteration, and English translation of Dalail al-Khairat.",
  alternates: {
    canonical: "/search",
  },
};

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const normalizedQuery = query.toLocaleLowerCase();
  const results = normalizedQuery
    ? getAllReadingContent().flatMap((reading) =>
        reading.paragraphs
          .filter((paragraph) =>
            [paragraph.arabic, paragraph.transliteration, paragraph.translation, reading.title, reading.day]
              .filter(Boolean)
              .join(" ")
              .toLocaleLowerCase()
              .includes(normalizedQuery),
          )
          .slice(0, 8)
          .map((paragraph) => ({ reading, paragraph })),
      )
    : [];

  return (
    <main className="section-shell page-stack">
      <section className="page-hero narrow">
        <p className="eyebrow">Search</p>
        <h1>Search Dalail al-Khairat</h1>
        <p>Find Arabic phrases, transliteration, English translation, daily parts, and names sections.</p>
      </section>

      <form className="search-form" action="/search">
        <label htmlFor="q">Search text</label>
        <div>
          <input id="q" name="q" type="search" defaultValue={query} placeholder="Try Allahumma, mercy, Muhammad..." />
          <button className="button primary" type="submit">Search</button>
        </div>
      </form>

      {query ? (
        <section aria-live="polite" className="search-results">
          <h2>{results.length} results for “{query}”</h2>
          {results.length ? (
            <div className="result-list">
              {results.map(({ reading, paragraph }) => (
                <Link className="result-card" href={`/dalail-al-khairat/${reading.slug}#${paragraph.id}`} key={`${reading.slug}-${paragraph.id}`}>
                  <span>{reading.title}</span>
                  {paragraph.arabic ? <strong lang="ar" dir="rtl">{paragraph.arabic}</strong> : null}
                  <small>{paragraph.translation ?? paragraph.transliteration ?? reading.description}</small>
                </Link>
              ))}
            </div>
          ) : (
            <p>No matching text found. Try a shorter phrase or search in Arabic.</p>
          )}
        </section>
      ) : null}
    </main>
  );
}
