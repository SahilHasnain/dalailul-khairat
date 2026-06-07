"use client";

import { useState } from "react";
import type { ReadingParagraph } from "@/lib/content";
import { SacredText } from "./sacred-text";

export function ReadingParagraphs({ paragraphs }: { paragraphs: ReadingParagraph[] }) {
  const [openTranslations, setOpenTranslations] = useState<Set<string>>(new Set());
  const translationCount = paragraphs.filter((paragraph) => paragraph.translation).length;
  const allOpen = translationCount > 0 && openTranslations.size >= translationCount;

  function toggleAll() {
    if (allOpen) {
      setOpenTranslations(new Set());
      return;
    }

    setOpenTranslations(new Set(paragraphs.filter((paragraph) => paragraph.translation).map((paragraph) => paragraph.id)));
  }

  function toggleOne(id: string) {
    setOpenTranslations((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="paragraph-list">
      {translationCount ? (
        <div className="translation-toolbar" data-aos="fade-up">
          <button className="button secondary" type="button" onClick={toggleAll}>
            {allOpen ? "Hide all translations" : "Show all translations"}
          </button>
        </div>
      ) : null}

      {paragraphs.map((paragraph) => {
        const isOpen = openTranslations.has(paragraph.id);

        return (
          <section className="reading-paragraph" data-aos="fade-up" id={paragraph.id} key={paragraph.id}>
            <a className="paragraph-anchor" href={`#${paragraph.id}`} aria-label={`Link to passage ${paragraph.id.replace("p-", "")}`}>
              {paragraph.id.replace("p-", "")}
            </a>
            {paragraph.arabic ? (
              <p className="arabic" lang="ar" dir="rtl">
                {paragraph.arabic}
              </p>
            ) : null}
            {paragraph.translation ? (
              <div className="translation-panel">
                <button
                  aria-controls={`${paragraph.id}-translation`}
                  aria-expanded={isOpen}
                  className="translation-toggle"
                  type="button"
                  onClick={() => toggleOne(paragraph.id)}
                >
                  {isOpen ? "Hide translation" : "Show translation"}
                </button>
                {isOpen ? (
                  <p className="translation" id={`${paragraph.id}-translation`}>
                    <SacredText text={paragraph.translation} />
                  </p>
                ) : null}
              </div>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}
