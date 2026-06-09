import type { ReactNode } from "react";

type SacredRule = {
  pattern: RegExp;
  suffix: string;
  clean?: (value: string) => string;
};

const prophetSalawatPattern = /,?\s*(?:may Allah exalt and preserve him|may Allah bless him and grant him peace|ﷺ)\s*$/iu;
const otherProphetSalamPattern = /,?\s*(?:peace be upon him|عليه السلام|\(A\.S\.\)|A\.S\.)\s*$/iu;

const prophetReferenceRules: SacredRule[] = [
  {
    pattern: /\b(?:our Master\s+|Master\s+|Sayyidina\s+)?Mu(?:ḥ|h)ammad\b(?:,?\s*(?:may Allah exalt and preserve him|may Allah bless him and grant him peace|ﷺ))?/iu,
    suffix: "ﷺ",
    clean: (value) => value.replace(prophetSalawatPattern, ""),
  },
  {
    pattern: /\b(?:the\s+)?(?:Chosen\s+|Beloved\s+|Unlettered\s+|Ummī\s+|ascetic\s+)?(?:Prophet|Messenger|Nabi)(?:\s+of\s+(?:Allah|Mercy|the Lord of the Worlds))?\b(?:\s*ﷺ)?/iu,
    suffix: "ﷺ",
    clean: (value) => value.replace(/\s*ﷺ\s*$/u, ""),
  },
  {
    pattern: /\b(?:him|he)\b,?\s*(?:may Allah exalt and preserve him|may Allah bless him and grant him peace|ﷺ)/iu,
    suffix: "ﷺ",
    clean: (value) => value.replace(prophetSalawatPattern, ""),
  },
];

const otherProphetNames = [
  "Shīth",
  "Nūḥ",
  "Ibrāhīm",
  "Ismā'īl",
  "Isḥāq",
  "Ya'qūb",
  "Yūsuf",
  "Ayyūb",
  "Mūsā",
  "Hārūn",
  "Dā'ūd",
  "Sulaymān",
  "Zakariyyā",
  "Yaḥyā",
  "Yūnus",
  "Yūsha'",
  "Ilyās",
  "al-Yasa'",
  "ʿĪsā",
  "Armiyā'",
  "Sha'iyā'",
  "Adam",
  "Hūd",
  "Ṣāliḥ",
  "Shu'ayb",
  "Dhū al-Kifl",
  "Jibrīl",
  "Mīkā'īl",
  "Isrāfīl",
  "'Azrā'īl",
];

const otherProphetRules: SacredRule[] = otherProphetNames.map((name) => ({
  pattern: new RegExp(`(?<![\\p{L}\\p{M}])(?:our Master\\s+)?${escapeRegExp(name)}(?![\\p{L}\\p{M}])(?:,?\\s*(?:peace be upon him|عليه السلام|\\(A\\.S\\.\\)|A\\.S\\.))?`, "iu"),
  suffix: "عليه السلام",
  clean: (value) => value.replace(otherProphetSalamPattern, ""),
}));

const sacredRules = [...prophetReferenceRules, ...otherProphetRules];

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function renderText(value: string, query?: string) {
  if (!query) return value;

  const index = value.toLocaleLowerCase().indexOf(query.toLocaleLowerCase());
  if (index === -1) return value;

  return (
    <>
      {value.slice(0, index)}
      <mark>{value.slice(index, index + query.length)}</mark>
      {value.slice(index + query.length)}
    </>
  );
}

export function SacredText({ text, query }: { text: string; query?: string }) {
  const nodes: ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining) {
    const next = sacredRules
      .map((rule) => {
        const match = remaining.match(rule.pattern);
        return match?.index === undefined ? null : { rule, match, index: match.index };
      })
      .filter((match): match is { rule: SacredRule; match: RegExpMatchArray; index: number } => Boolean(match))
      .sort((a, b) => a.index - b.index || b.match[0].length - a.match[0].length)[0];

    if (!next) {
      nodes.push(<span key={key++}>{renderText(remaining, query)}</span>);
      break;
    }

    if (next.index > 0) {
      nodes.push(<span key={key++}>{renderText(remaining.slice(0, next.index), query)}</span>);
    }

    const matchedText = next.match[0];
    const displayText = next.rule.clean?.(matchedText).trimEnd() ?? matchedText.trimEnd();
    nodes.push(
      <span key={key++}>
        {renderText(displayText, query)} <sup className="sacred-suffix">{next.rule.suffix}</sup>
      </span>,
    );

    remaining = remaining.slice(next.index + matchedText.length);
  }

  return <>{nodes}</>;
}
