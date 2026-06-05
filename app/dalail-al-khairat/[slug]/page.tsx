import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getReading, getReadings, siteUrl } from "@/lib/content";

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

  if (!reading) notFound();

  const currentIndex = allReadings.findIndex((item) => item.slug === reading.slug);
  const previous = allReadings[currentIndex - 1];
  const next = allReadings[currentIndex + 1];
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
        <Link href="/dalail-al-khairat">All readings</Link>
        {allReadings.map((item) => (
          <Link key={item.slug} href={`/dalail-al-khairat/${item.slug}`} className={item.slug === reading.slug ? "active" : ""}>
            {item.label}
          </Link>
        ))}
      </aside>

      <article className="reader-article">
        <header className="reader-header">
          <p className="eyebrow">{reading.day ? `${reading.day} reading` : reading.kind}</p>
          <h1>{reading.title}</h1>
          <p>{reading.description}</p>
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
          {previous ? <Link href={`/dalail-al-khairat/${previous.slug}`}>Previous: {previous.label}</Link> : <span />}
          {next ? <Link href={`/dalail-al-khairat/${next.slug}`}>Next: {next.label}</Link> : <span />}
        </nav>
      </article>
    </main>
  );
}
