import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Dalail al-Khairat",
  description:
    "Learn about Dalail al-Khairat and this online reader for Arabic text and English translation.",
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
          Read the daily parts of Dalail al-Khairat with Arabic text, English translation, and simple navigation.
        </p>
      </section>

      <section className="prose-card" data-aos="fade-up">
        <h2>About the reading</h2>
        <p>
          Dalail al-Khairat is a celebrated collection of salawat upon the Prophet ﷺ. The reading is commonly arranged into daily sections so it can be completed through the week.
        </p>
        <h2>How to use this site</h2>
        <p>
          Start with today’s reading, browse the weekly cycle, or search for a phrase in the Arabic text or English translation.
        </p>
        <Link className="button primary" href="/dalail-al-khairat">Browse readings</Link>
      </section>
    </main>
  );
}
