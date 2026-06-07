import type { Metadata } from "next";
import Link from "next/link";
import { SacredText } from "../components/sacred-text";
import { getAllReadingContent } from "@/lib/content";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export const metadata: Metadata = {
  title: "Search Dalail al-Khairat",
  description: "Search the Arabic text and English translation of Dalail al-Khairat.",
  alternates: {
    canonical: "/search",
  },
};

const suggestedSearches = ["Allahumma", "Muhammad", "mercy", "forgive", "Friday", "اللَّهُمَّ"];

function getMatchText(query: string, values: Array<string | undefined>) {
  const normalizedQuery = query.toLocaleLowerCase();
  const value = values.find((item) => item?.toLocaleLowerCase().includes(normalizedQuery));

  return value ?? values.find(Boolean) ?? "";
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const normalizedQuery = query.toLocaleLowerCase();
  const results = normalizedQuery
    ? getAllReadingContent().flatMap((reading) =>
        reading.paragraphs
          .filter((paragraph) =>
            [paragraph.arabic, paragraph.translation, reading.title, reading.day]
              .filter(Boolean)
              .join(" ")
              .toLocaleLowerCase()
              .includes(normalizedQuery),
          )
          .slice(0, 8)
          .map((paragraph) => ({
            reading,
            paragraph,
            matchText: getMatchText(query, [paragraph.arabic, paragraph.translation, reading.title, reading.day]),
          })),
      )
    : [];

  return (
    <main className="section-shell page-stack search-page">
      <section className="search-hero" data-aos="fade-up">
        <div className="page-hero narrow">
          <p className="eyebrow">Search</p>
          <h1>Search the Dalail al-Khairat text</h1>
          <p>Find Arabic phrases, English translation, daily parts, and names sections.</p>
        </div>
        <div className="search-help-card">
          <span>Tip</span>
          <p>Short phrases work best. Try Arabic roots, “Allahumma”, “Muhammad”, or English words like “mercy”.</p>
        </div>
      </section>

      <form className="search-form" data-aos="fade-up" data-aos-delay="120" action="/search">
        <label htmlFor="q">Search text</label>
        <div>
          <input id="q" name="q" type="search" defaultValue={query} placeholder="Try Allahumma, mercy, Muhammad..." autoComplete="off" />
          <button className="button primary" type="submit">Search</button>
        </div>
      </form>

      <section className="suggested-searches" data-aos="fade-up" aria-label="Suggested searches">
        <span>Try</span>
        {suggestedSearches.map((suggestion) => (
          <Link href={`/search?q=${encodeURIComponent(suggestion)}`} key={suggestion}>
            {suggestion}
          </Link>
        ))}
      </section>

      {query ? (
        <section aria-live="polite" className="search-results" data-aos="fade-up">
          <div className="search-results-header">
            <p className="eyebrow">Results</p>
            <h2>{results.length} results for “{query}”</h2>
          </div>
          {results.length ? (
            <div className="result-list">
              {results.map(({ reading, paragraph, matchText }, index) => (
                <Link
                  className="result-card"
                  data-aos="fade-up"
                  data-aos-delay={Math.min(index * 50, 250)}
                  href={`/dalail-al-khairat/${reading.slug}#${paragraph.id}`}
                  key={`${reading.slug}-${paragraph.id}`}
                >
                  <span>{reading.day ? `${reading.day} · ${reading.title}` : reading.title}</span>
                  {paragraph.arabic ? <strong lang="ar" dir="rtl">{paragraph.arabic}</strong> : null}
                  <small>
                    <SacredText text={matchText} query={query} />
                  </small>
                  <em>Open passage {paragraph.id.replace("p-", "")}</em>
                </Link>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h2>No matching text found</h2>
              <p>Try a shorter phrase, search in Arabic, or use one of the suggested searches above.</p>
              <Link className="button secondary" href="/dalail-al-khairat">Browse readings instead</Link>
            </div>
          )}
        </section>
      ) : (
        <section className="empty-state search-start-state" data-aos="fade-up">
          <h2>Search across the reader</h2>
          <p>Results will link directly to matching passages in the reading pages.</p>
        </section>
      )}
    </main>
  );
}
