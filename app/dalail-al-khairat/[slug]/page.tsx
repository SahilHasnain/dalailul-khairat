import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getReading, getReadingGroups, getReadings, siteUrl } from "@/lib/content";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getReadings().map((reading) => ({ slug: reading.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const reading = getReading(slug);

  if (!reading) {
    return {
      title: "Reading not found",
    };
  }

  return {
    title: reading.title,
    description: reading.description,
    alternates: {
      canonical: `/dalail-al-khairat/${reading.slug}`,
    },
    openGraph: {
      title: `${reading.title} | Dalail al-Khairat Online`,
      description: reading.description,
      url: `/dalail-al-khairat/${reading.slug}`,
      type: "article",
    },
  };
}

export default async function ReadingPage({ params }: Props) {
  const { slug } = await params;
  const reading = getReading(slug);
  const allReadings = getReadings();
  const groups = getReadingGroups();

  if (!reading) notFound();

  const currentIndex = allReadings.findIndex((item) => item.slug === reading.slug);
  const previous = allReadings[currentIndex - 1];
  const next = allReadings[currentIndex + 1];
  const paragraphCount = reading.paragraphs.length;
  const firstParagraphId = reading.paragraphs[0]?.id;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: reading.title,
    description: reading.description,
    inLanguage: ["ar", "en"],
    isPartOf: {
      "@type": "Book",
      name: "Dalail al-Khairat",
    },
    url: `${siteUrl}/dalail-al-khairat/${reading.slug}`,
  };

  return (
    <main className="reader-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <aside className="reader-sidebar" aria-label="Reading navigation">
        <Link className="all-readings-link" href="/dalail-al-khairat">All readings</Link>
        {groups.map((group) => (
          <div className="reader-nav-group" key={group.title}>
            <p>{group.title}</p>
            {group.readings.map((item) => (
              <Link
                key={item.slug}
                href={`/dalail-al-khairat/${item.slug}`}
                className={item.slug === reading.slug ? "active" : ""}
                aria-current={item.slug === reading.slug ? "page" : undefined}
              >
                <span>{item.label}</span>
                {item.day ? <small>{item.day}</small> : null}
              </Link>
            ))}
          </div>
        ))}
      </aside>

      <article className="reader-article">
        <header className="reader-header">
          <p className="eyebrow">{reading.day ? `${reading.day} reading` : reading.kind}</p>
          <h1>{reading.title}</h1>
          <p className="hero-copy">{reading.description}</p>
          <div className="reader-meta-row">
            <span>{paragraphCount} passages</span>
            <span>Arabic</span>
            <span>Transliteration</span>
            <span>English</span>
          </div>
          {firstParagraphId ? (
            <a className="button secondary reader-start" href={`#${firstParagraphId}`}>
              Start reading
            </a>
          ) : null}
        </header>

        {reading.paragraphs.length === 0 ? (
          <div className="notice-card">
            <h2>Source content unavailable</h2>
            <p>The source HTML for this reading was not found in the HTTrack mirror.</p>
          </div>
        ) : (
          <div className="paragraph-list">
            {reading.paragraphs.map((paragraph) => (
              <section className="reading-paragraph" id={paragraph.id} key={paragraph.id}>
                <a className="paragraph-anchor" href={`#${paragraph.id}`} aria-label={`Link to passage ${paragraph.id.replace("p-", "")}`}>
                  {paragraph.id.replace("p-", "")}
                </a>
                {paragraph.arabic ? (
                  <p className="arabic" lang="ar" dir="rtl">
                    {paragraph.arabic}
                  </p>
                ) : null}
                {paragraph.transliteration ? <p className="transliteration">{paragraph.transliteration}</p> : null}
                {paragraph.translation ? <p className="translation">{paragraph.translation}</p> : null}
              </section>
            ))}
          </div>
        )}

        <nav className="reader-pager" aria-label="Previous and next reading">
          {previous ? (
            <Link className="pager-card previous" href={`/dalail-al-khairat/${previous.slug}`}>
              <span>Previous</span>
              <strong>{previous.title}</strong>
              <small>{previous.day ?? previous.kind}</small>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link className="pager-card next" href={`/dalail-al-khairat/${next.slug}`}>
              <span>Next</span>
              <strong>{next.title}</strong>
              <small>{next.day ?? next.kind}</small>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </article>
    </main>
  );
}
