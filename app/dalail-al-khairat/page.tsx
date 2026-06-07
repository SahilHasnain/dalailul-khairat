import type { Metadata } from "next";
import Link from "next/link";
import { getReadingGroups, getTodayReadings } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Read Dalail al-Khairat",
  description:
    "Browse Dalail al-Khairat by opening duas, daily parts, completion dua, and names sections.",
  alternates: {
    canonical: "/dalail-al-khairat",
  },
};

export default function DalailIndexPage() {
  const groups = getReadingGroups();
  const today = getTodayReadings();
  const dailyParts = groups.find((group) => group.title === "Daily Parts")?.readings ?? [];

  return (
    <main className="section-shell page-stack">
      <section className="reader-index-hero" data-aos="fade-up">
        <div className="page-hero narrow">
          <p className="eyebrow">Reader</p>
          <h1>Choose your Dalail al-Khairat reading</h1>
          <p>
            Start with today’s part, browse the full weekly cycle, or open the preparatory duas and names sections.
          </p>
        </div>
        <div className="today-card">
          <span>Today’s reading</span>
          <strong>{today.day}</strong>
          <small>{today.description}</small>
          <div className="today-links" aria-label="Today’s reading sequence">
            {today.readings.map((reading) => (
              <Link href={`/dalail-al-khairat/${reading.slug}`} key={reading.slug}>
                {reading.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="cycle-strip" data-aos="fade-up" aria-label="Weekly daily reading cycle">
        {dailyParts.map((reading) => (
          <Link href={`/dalail-al-khairat/${reading.slug}`} key={reading.slug}>
            <span>{reading.day ?? "Extra"}</span>
            <strong>{reading.label}</strong>
          </Link>
        ))}
      </section>

      <section className="reading-groups" aria-label="Dalail al-Khairat reading sections">
        {groups.map((group) => (
          <div className="reading-group" data-aos="fade-up" key={group.title}>
            <header>
              <p className="eyebrow">{group.title}</p>
              <h2>{group.title === "Daily Parts" ? "Weekly reading cycle" : group.title}</h2>
              <p>{group.description}</p>
            </header>
            <div className="card-grid">
              {group.readings.map((reading, index) => (
                <Link
                  className="reading-card large"
                  data-aos="fade-up"
                  data-aos-delay={Math.min(index * 60, 240)}
                  href={`/dalail-al-khairat/${reading.slug}`}
                  key={reading.slug}
                >
                  <span>{reading.day ?? reading.kind}</span>
                  <strong>{reading.title}</strong>
                  <small>{reading.description}</small>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
