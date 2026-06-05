import fs from "node:fs";
import path from "node:path";

export type ReadingKind = "dua" | "part" | "names";

export type ReadingMeta = {
  slug: string;
  title: string;
  label: string;
  description: string;
  kind: ReadingKind;
  sourceFile: string;
  day?: string;
  order: number;
};

export type ReadingParagraph = {
  id: string;
  arabic?: string;
  translation?: string;
};

export type Reading = ReadingMeta & {
  paragraphs: ReadingParagraph[];
};

export type ReadingGroup = {
  title: string;
  description: string;
  readings: ReadingMeta[];
};

const mirrorRoot = path.join(process.cwd(), "httrack", "dalailalkhayrat.com");

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dalailul-khairat.local";

export const readings: ReadingMeta[] = [
  {
    slug: "opening-dua",
    title: "Opening Dua",
    label: "Opening",
    description: "Read the opening dua of Dalail al-Khairat in Arabic with English translation.",
    kind: "dua",
    sourceFile: "duas61e2.html",
    order: 1,
  },
  {
    slug: "names-of-allah",
    title: "Names of Allah",
    label: "Names of Allah",
    description: "Read the Names of Allah section from Dalail al-Khairat in Arabic and English.",
    kind: "names",
    sourceFile: "namesc5db.html",
    order: 2,
  },
  {
    slug: "names-of-the-prophet",
    title: "Names of the Prophet ﷺ",
    label: "Names of the Prophet ﷺ",
    description: "Read the blessed names of the Prophet ﷺ from Dalail al-Khairat.",
    kind: "names",
    sourceFile: "names8a90.html",
    order: 3,
  },
  {
    slug: "intention-dua",
    title: "Dua of Intention",
    label: "Intention",
    description: "Read the dua of intention before the daily Dalail al-Khairat recitation.",
    kind: "dua",
    sourceFile: "duas0f54.html",
    order: 4,
  },
  {
    slug: "part-1",
    title: "Part 1",
    label: "Part 1",
    description: "Read Part 1 of Dalail al-Khairat for Monday in Arabic with English translation.",
    kind: "part",
    sourceFile: "parts5aaa.html",
    day: "Monday",
    order: 5,
  },
  {
    slug: "part-2",
    title: "Part 2",
    label: "Part 2",
    description: "Read Part 2 of Dalail al-Khairat for Tuesday in Arabic with English translation.",
    kind: "part",
    sourceFile: "parts259a.html",
    day: "Tuesday",
    order: 6,
  },
  {
    slug: "part-3",
    title: "Part 3",
    label: "Part 3",
    description: "Read Part 3 of Dalail al-Khairat for Wednesday in Arabic with English translation.",
    kind: "part",
    sourceFile: "parts6b6f.html",
    day: "Wednesday",
    order: 7,
  },
  {
    slug: "part-4",
    title: "Part 4",
    label: "Part 4",
    description: "Read Part 4 of Dalail al-Khairat for Thursday in Arabic with English translation.",
    kind: "part",
    sourceFile: "partsbec6.html",
    day: "Thursday",
    order: 8,
  },
  {
    slug: "part-5",
    title: "Part 5",
    label: "Part 5",
    description: "Read Part 5 of Dalail al-Khairat for Friday in Arabic with English translation.",
    kind: "part",
    sourceFile: "parts2c41.html",
    day: "Friday",
    order: 9,
  },
  {
    slug: "part-6",
    title: "Part 6",
    label: "Part 6",
    description: "Read Part 6 of Dalail al-Khairat for Saturday in Arabic with English translation.",
    kind: "part",
    sourceFile: "parts11a0.html",
    day: "Saturday",
    order: 10,
  },
  {
    slug: "part-7",
    title: "Part 7",
    label: "Part 7",
    description: "Read Part 7 of Dalail al-Khairat for Sunday in Arabic with English translation.",
    kind: "part",
    sourceFile: "parts5c9e.html",
    day: "Sunday",
    order: 11,
  },
  {
    slug: "part-8",
    title: "Part 8",
    label: "Part 8",
    description: "Read Part 8 and the completion section of Dalail al-Khairat in Arabic with English translation.",
    kind: "part",
    sourceFile: "parts2f95.html",
    order: 12,
  },
  {
    slug: "completion-dua",
    title: "Dua of Completion",
    label: "Completion",
    description: "Read the completion dua of Dalail al-Khairat in Arabic with English translation.",
    kind: "dua",
    sourceFile: "duas0423.html",
    order: 13,
  },
];

const entityMap: Record<string, string> = {
  amp: "&",
  quot: '"',
  apos: "'",
  lt: "<",
  gt: ">",
  nbsp: " ",
};

function decodeHtml(value: string) {
  return value
    .replace(/<br\s*\/?>(\s*)/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&(#\d+|#x[\da-f]+|[a-z]+);/gi, (_, entity: string) => {
      if (entity.startsWith("#x")) return String.fromCodePoint(Number.parseInt(entity.slice(2), 16));
      if (entity.startsWith("#")) return String.fromCodePoint(Number.parseInt(entity.slice(1), 10));
      return entityMap[entity] ?? `&${entity};`;
    })
    .replace(/\s+/g, " ")
    .trim();
}

function extractParagraphs(sourceFile: string): ReadingParagraph[] {
  const filePath = path.join(mirrorRoot, sourceFile);

  if (!fs.existsSync(filePath)) return [];

  const html = fs.readFileSync(filePath, "utf8");
  const matches = [...html.matchAll(/<p\s+class="([^"]*)"[^>]*>([\s\S]*?)<\/p>/gi)];
  const paragraphs: ReadingParagraph[] = [];
  let current: ReadingParagraph | null = null;

  for (const match of matches) {
    const className = match[1];
    const text = decodeHtml(match[2]);
    if (!text) continue;

    if (className.includes("arabicText")) {
      current = { id: `p-${paragraphs.length + 1}`, arabic: text };
      paragraphs.push(current);
      continue;
    }

    if (!current) continue;
    if (className.split(/\s+/).includes("trans") && !current.translation) {
      current.translation = text;
    }
  }

  return paragraphs;
}

export function getReadings() {
  return [...readings].sort((a, b) => a.order - b.order);
}

export function getReadingGroups(): ReadingGroup[] {
  const sortedReadings = getReadings();

  return [
    {
      title: "Begin",
      description: "Opening, names, and intention sections before the daily wird.",
      readings: sortedReadings.filter((reading) => reading.order < 5),
    },
    {
      title: "Daily Parts",
      description: "The weekly recitation cycle from Monday through Sunday, plus Part 8.",
      readings: sortedReadings.filter((reading) => reading.kind === "part"),
    },
    {
      title: "Complete",
      description: "Completion dua after finishing the cycle.",
      readings: sortedReadings.filter((reading) => reading.slug === "completion-dua"),
    },
  ];
}

export function getTodayReading(date = new Date()) {
  const dayToSlug = ["part-7", "part-1", "part-2", "part-3", "part-4", "part-5", "part-6"];
  const slug = dayToSlug[date.getDay()];

  return readings.find((reading) => reading.slug === slug) ?? readings.find((reading) => reading.slug === "part-1");
}

export function getReading(slug: string): Reading | undefined {
  const meta = readings.find((reading) => reading.slug === slug);
  if (!meta) return undefined;

  return {
    ...meta,
    paragraphs: extractParagraphs(meta.sourceFile),
  };
}

export function getAllReadingContent() {
  return getReadings().map((reading) => ({
    ...reading,
    paragraphs: extractParagraphs(reading.sourceFile),
  }));
}
