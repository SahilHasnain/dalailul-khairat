import type { Metadata } from "next";
import Link from "next/link";
import { getReadings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Read Dalail al-Khairat",
  description:
    "Browse Dalail al-Khairat by opening duas, daily parts, completion dua, and names sections.",
  alternates: {
    canonical: "/dalail-al-khairat",
  },
};

export default function DalailIndexPage() {
  const readings = getReadings();

  return (
    <main className="section-shell page-stack">
      <section className="page-hero narrow">
        <p className="eyebrow">Reader</p>
        <h1>Dalail al-Khairat readings</h1>
        <p>
          Browse the opening duas, names sections, daily parts, and completion dua. Every section is server-rendered for a fast reader experience and strong SEO.
        </p>
      </section>

      <section className="card-grid" aria-label="Dalail al-Khairat reading sections">
        {readings.map((reading) => (
          <Link className="reading-card large" href={`/dalail-al-khairat/${reading.slug}`} key={reading.slug}>
            <span>{reading.day ?? reading.kind}</span>
            <strong>{reading.title}</strong>
            <small>{reading.description}</small>
          </Link>
        ))}
      </section>
    </main>
  );
}
