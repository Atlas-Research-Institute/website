/**
 * Cover images and diagrams for Resources posts.
 *
 *   npm run covers              build anything missing or out of date
 *   npm run covers -- --refresh also re-download every YouTube thumbnail
 *
 * Runs before `npm run dev` and `npm run build`, so a new post gets its cover
 * without anyone opening a design tool.
 *
 * COVERS. Every post in src/content/resources/ gets
 * public/images/resources/<slug>.jpg, 1280×720. It is the image on the post's
 * card, at the top of the post and in its link previews (og:image).
 *
 *   Video posts (youtubeId set): the video's own thumbnail from YouTube, at the
 *   highest resolution YouTube has (maxresdefault, then sddefault, then
 *   hqdefault). Downloaded once and committed; pass --refresh after changing
 *   the thumbnail on YouTube.
 *
 *   Everything else: drawn here in the style of the Atlas YouTube thumbnails.
 *   Cream ground, the title in navy Source Serif 4, a thin crimson rule,
 *   "Atlas" small in the corner and one flat illustration chosen by the post's
 *   `illustration:` field. The choices are the keys of ILLUSTRATIONS below.
 *   Redrawn on every run, so editing a title updates its cover.
 *
 * DIAGRAMS. The named diagrams in DIAGRAMS below are written to
 * public/images/resources/diagrams/<name>.webp and used inside posts with
 * ![alt text](/images/resources/diagrams/<name>.webp). Same palette and fonts
 * as the covers. Only add one when it explains something the text cannot do as
 * well; never as decoration.
 *
 * Every file must be under 150 KB; the script fails if one is not.
 *
 * Text is set with the Source Serif 4 files in scripts/resource-covers/fonts
 * (SIL Open Font License, LICENSE.md there), never system fonts, so a cover
 * comes out the same on any machine.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT = join(root, "src/content/resources");
const OUT = join(root, "public/images/resources");
const DIAGRAM_OUT = join(OUT, "diagrams");
const FONT_DIR = join(root, "scripts/resource-covers/fonts");
const MAX_BYTES = 150 * 1024;
const REFRESH = process.argv.includes("--refresh");

const FONTS = readdirSync(FONT_DIR)
  .filter((file) => file.endsWith(".ttf"))
  .map((file) => join(FONT_DIR, file));

/* ------------------------------------------------------------------------- */
/* Palette and type                                                           */
/* ------------------------------------------------------------------------- */

const C = {
  cream: "#F7F2E7",
  sand: "#E8DEC8",
  navy: "#13294B",
  crimson: "#8C1D2F",
  ink: "#1B2433",
  muted: "#39455A",
  white: "#FFFFFF",
  line: "#C9D3E3",
  blue: "#BFD0EA",
  rose: "#EBC3CA",
  gold: "#F2CF6B",
};

const DISPLAY = 'font-family="Source Serif 4 Display" font-weight="600"';
const TEXT = 'font-family="Source Serif 4" font-weight="400"';
const TEXT_SEMIBOLD = 'font-family="Source Serif 4" font-weight="600"';
const TEXT_ITALIC = 'font-family="Source Serif 4" font-weight="400" font-style="italic"';

const escape = (text) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const resvg = (svg, options = {}) =>
  new Resvg(svg, {
    font: { fontFiles: FONTS, loadSystemFonts: false, defaultFontFamily: "Source Serif 4" },
    ...options,
  });

/** Rendered width of one line of text, in px. */
function measure(text, font, size) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="4000" height="400"><text x="0" y="200" ${font} font-size="${size}">${escape(text)}</text></svg>`;
  return resvg(svg).getBBox()?.width ?? 0;
}

/** Greedy word wrap to a maximum line width. */
function wrap(text, font, size, maxWidth) {
  const lines = [];
  let line = "";
  for (const word of text.split(/\s+/)) {
    const candidate = line ? `${line} ${word}` : word;
    if (line && measure(candidate, font, size) > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/** <text> with one <tspan> per line. `y` is the first baseline. */
function textBlock(lines, { x, y, size, lineHeight, font, fill }) {
  const spans = lines
    .map((line, i) => `<tspan x="${x}" y="${y + i * size * lineHeight}">${escape(line)}</tspan>`)
    .join("");
  return `<text ${font} font-size="${size}" fill="${fill}">${spans}</text>`;
}

/* ------------------------------------------------------------------------- */
/* Illustrations                                                              */
/* ------------------------------------------------------------------------- */

/**
 * One flat illustration per key, drawn in a 440×460 box. A post picks one with
 * `illustration: <key>`. To add a choice, add a key here and list it in the
 * README; keep to flat shapes in the palette above, with no people.
 */
const textLines = (x, y, widths, gap = 22, fill = C.line) =>
  widths
    .map((w, i) => `<rect x="${x}" y="${y + i * gap}" width="${w}" height="9" rx="4.5" fill="${fill}"/>`)
    .join("");

const ILLUSTRATIONS = {
  /** A paper with three passages highlighted and numbered: reading in passes. */
  "three-passes": () => `
    <g transform="rotate(-4 220 230)">
      <rect x="62" y="34" width="316" height="410" rx="6" fill="${C.sand}"/>
      <rect x="50" y="20" width="316" height="410" rx="6" fill="${C.white}"/>
      <rect x="84" y="56" width="200" height="14" rx="7" fill="${C.navy}"/>
      <rect x="78" y="88" width="262" height="64" rx="4" fill="${C.gold}" opacity="0.75"/>
      ${textLines(90, 100, [236, 220, 180])}
      ${textLines(90, 176, [236, 210, 230])}
      <rect x="78" y="238" width="262" height="86" rx="4" fill="${C.blue}" opacity="0.8"/>
      ${textLines(90, 250, [236, 226, 236, 150])}
      <rect x="78" y="340" width="262" height="64" rx="4" fill="${C.rose}" opacity="0.85"/>
      ${textLines(90, 352, [236, 200, 120])}
    </g>
    ${[
      [26, 104, "1"],
      [36, 268, "2"],
      [44, 368, "3"],
    ]
      .map(
        ([cx, cy, n]) => `
      <circle cx="${cx}" cy="${cy}" r="24" fill="${C.navy}"/>
      <text ${TEXT_SEMIBOLD} font-size="28" fill="${C.white}" x="${cx}" y="${cy + 10}" text-anchor="middle">${n}</text>`
      )
      .join("")}`,

  /** A stack of journals with a paper on top: choosing where to publish. */
  "journal-stack": () => {
    const book = (x, y, w, h, fill, band) => `
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="${fill}"/>
      <rect x="${x + w - 30}" y="${y + 7}" width="22" height="${h - 14}" rx="2" fill="${C.white}"/>
      ${[0.3, 0.5, 0.7].map((t) => `<rect x="${x + w - 30}" y="${y + h * t}" width="22" height="2" fill="${C.line}"/>`).join("")}
      <rect x="${x + 26}" y="${y + h / 2 - 5}" width="${w * 0.42}" height="10" rx="5" fill="${band}"/>`;
    return `
      <rect x="40" y="430" width="380" height="14" rx="7" fill="${C.sand}"/>
      ${book(50, 352, 350, 78, C.navy, C.gold)}
      ${book(78, 282, 320, 70, C.crimson, C.cream)}
      ${book(36, 220, 340, 62, C.gold, C.navy)}
      ${book(68, 160, 300, 60, C.blue, C.navy)}
      <g transform="rotate(-8 230 110)">
        <rect x="120" y="30" width="210" height="140" rx="5" fill="${C.sand}"/>
        <rect x="112" y="22" width="210" height="140" rx="5" fill="${C.white}"/>
        <rect x="134" y="44" width="120" height="12" rx="6" fill="${C.navy}"/>
        ${textLines(134, 72, [166, 150, 160, 100], 20)}
      </g>`;
  },

  /** A magnifying glass over a bar chart: finding and testing evidence. */
  magnifier: () => `
    <rect x="40" y="60" width="330" height="330" rx="6" fill="${C.white}"/>
    <rect x="80" y="320" width="250" height="4" fill="${C.navy}"/>
    <rect x="96" y="250" width="44" height="70" fill="${C.blue}"/>
    <rect x="160" y="190" width="44" height="130" fill="${C.navy}"/>
    <rect x="224" y="220" width="44" height="100" fill="${C.blue}"/>
    <rect x="288" y="140" width="44" height="180" fill="${C.gold}"/>
    ${textLines(80, 96, [180, 120], 24)}
    <circle cx="300" cy="250" r="92" fill="${C.cream}" fill-opacity="0.35" stroke="${C.navy}" stroke-width="22"/>
    <rect x="352" y="318" width="26" height="120" rx="10" fill="${C.crimson}" transform="rotate(-45 365 378)"/>`,

  /** A clipboard with ticked items: a checklist or a step-by-step method. */
  checklist: () => `
    <rect x="80" y="40" width="290" height="390" rx="10" fill="${C.navy}"/>
    <rect x="100" y="66" width="250" height="344" rx="4" fill="${C.white}"/>
    <rect x="170" y="26" width="110" height="40" rx="8" fill="${C.gold}"/>
    ${[0, 1, 2, 3]
      .map((i) => {
        const y = 110 + i * 74;
        const done = i < 3;
        return `
      <rect x="124" y="${y}" width="34" height="34" rx="4" fill="${done ? C.crimson : C.white}" stroke="${C.crimson}" stroke-width="4"/>
      ${done ? `<path d="M131 ${y + 18} l8 8 l14 -16" stroke="${C.white}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` : ""}
      ${textLines(176, y + 6, [140, 96], 20)}`;
      })
      .join("")}`,
};

/* ------------------------------------------------------------------------- */
/* Covers                                                                     */
/* ------------------------------------------------------------------------- */

const W = 1280;
const H = 720;

function coverSvg(title, illustration) {
  const maxWidth = 620;
  let size = 68;
  let lines = wrap(title, DISPLAY, size, maxWidth);
  while (lines.length > 4 && size > 48) {
    size -= 4;
    lines = wrap(title, DISPLAY, size, maxWidth);
  }
  if (lines.length > 5) {
    throw new Error(`title too long for a cover; add a shorter coverTitle: "${title}"`);
  }
  const lineHeight = 1.14;
  const blockHeight = size * lineHeight * (lines.length - 1) + size;
  const top = Math.round((H - blockHeight) / 2) - 10;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${C.cream}"/>
  <rect x="88" y="${top - 44}" width="96" height="5" fill="${C.crimson}"/>
  ${textBlock(lines, { x: 88, y: top + size * 0.8, size, lineHeight, font: DISPLAY, fill: C.navy })}
  <text font-family="Source Serif 4 Display" font-weight="700" font-size="40" fill="${C.navy}" x="88" y="650">Atlas</text>
  <g transform="translate(760 130)">${ILLUSTRATIONS[illustration]()}</g>
</svg>`;
}

async function writeJpeg(file, input) {
  for (const quality of [86, 80, 72, 64]) {
    const buffer = await sharp(input)
      .resize(W, H, { fit: "cover" })
      .jpeg({ quality, mozjpeg: true })
      .toBuffer();
    if (buffer.length <= MAX_BYTES) {
      writeFileSync(file, buffer);
      return buffer.length;
    }
  }
  throw new Error(`${file} is still over 150 KB at quality 64`);
}

async function youtubeThumbnail(id) {
  for (const name of ["maxresdefault", "sddefault", "hqdefault"]) {
    const response = await fetch(`https://i.ytimg.com/vi/${id}/${name}.jpg`);
    if (response.ok) return Buffer.from(await response.arrayBuffer());
  }
  throw new Error(`no thumbnail found on YouTube for video ${id}`);
}

/** The few frontmatter fields this script needs. resourceMeta.ts validates the rest. */
function frontmatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const fields = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z]+):\s*(.*)$/);
    if (kv) fields[kv[1]] = kv[2].trim().replace(/^"(.*)"$/, "$1");
  }
  return fields;
}

/* ------------------------------------------------------------------------- */
/* Diagrams                                                                   */
/* ------------------------------------------------------------------------- */

/**
 * Drawn at 460 px wide, the width they are shown at in a post, and rendered at
 * 2× for sharp screens. Keep the words in step with the post that uses them.
 */
const DIAGRAM_WIDTH = 460;

const DIAGRAMS = {
  /** how-to-read-a-research-paper.md */
  "three-passes": () => {
    const steps = [
      ["Pass 1", "5 to 10 minutes", "Title, abstract, introduction, headings, conclusion.", "Answer the five Cs and decide whether to read on."],
      ["Pass 2", "Up to an hour", "The whole paper, with close attention to figures and tables. Skip proofs.", "Explain the main argument and its evidence to a friend."],
      ["Pass 3", "One to five hours", "Rebuild the study in your head, questioning every assumption.", "Name the paper's strong and weak points from memory."],
    ];
    let y = 40;
    const rows = steps.map(([pass, time, read, outcome], i) => {
      const readLines = wrap(read, TEXT, 18, 350);
      const outcomeLines = wrap(outcome, TEXT_ITALIC, 18, 350);
      const top = y;
      const body = `
        <circle cx="44" cy="${top + 10}" r="20" fill="${C.navy}"/>
        <text ${TEXT_SEMIBOLD} font-size="22" fill="${C.white}" x="44" y="${top + 18}" text-anchor="middle">${i + 1}</text>
        <text ${TEXT_SEMIBOLD} font-size="22" fill="${C.navy}" x="84" y="${top + 18}">${pass}</text>
        <text ${TEXT} font-size="18" fill="${C.muted}" x="${84 + measure(pass, TEXT_SEMIBOLD, 22) + 12}" y="${top + 18}">·  ${time}</text>
        ${textBlock(readLines, { x: 84, y: top + 50, size: 18, lineHeight: 1.4, font: TEXT, fill: C.ink })}
        ${textBlock(outcomeLines, { x: 84, y: top + 50 + readLines.length * 25.2 + 6, size: 18, lineHeight: 1.4, font: TEXT_ITALIC, fill: C.crimson })}`;
      y += 50 + (readLines.length + outcomeLines.length) * 25.2 + 6 + 34;
      return { top, body };
    });
    const height = Math.round(y - 30);
    const connectors = rows
      .slice(1)
      .map((row, i) => `<rect x="43" y="${rows[i].top + 34}" width="2" height="${row.top - rows[i].top - 48}" fill="${C.line}"/>`)
      .join("");
    return {
      height,
      svg: `<rect width="${DIAGRAM_WIDTH}" height="${height}" fill="${C.cream}"/>${connectors}${rows.map((r) => r.body).join("")}`,
    };
  },

  /** where-to-publish-your-first-research-paper.md. Fees as in that post. */
  "journal-fees": () => {
    const groups = [
      ["No fee", [
        ["The Atlas Journal", "free"],
        ["Ulysseus Young Explorers in Science", "free"],
        ["NHSJS", "free; fast-track $280"],
      ]],
      ["Pay only if accepted", [
        ["The Curieux Review", "$200 or $250"],
        ["IJHSR", "$350"],
        ["STEM Fellowship Journal", "CAD $400"],
      ]],
      ["Pay when you submit", [
        ["Journal of Emerging Investigators", "$49"],
        ["Journal of High School Science", "$95"],
      ]],
    ];
    let y = 48;
    const parts = [];
    for (const [label, rows] of groups) {
      parts.push(`<rect x="32" y="${y - 22}" width="40" height="3" fill="${C.crimson}"/>`);
      parts.push(`<text ${TEXT_SEMIBOLD} font-size="22" fill="${C.navy}" x="32" y="${y + 10}">${label}</text>`);
      y += 46;
      for (const [name, fee] of rows) {
        parts.push(`<text ${TEXT} font-size="18" fill="${C.ink}" x="32" y="${y}">${escape(name)}</text>`);
        parts.push(`<text ${TEXT_SEMIBOLD} font-size="18" fill="${C.navy}" x="${DIAGRAM_WIDTH - 32}" y="${y}" text-anchor="end">${escape(fee)}</text>`);
        parts.push(`<rect x="32" y="${y + 12}" width="${DIAGRAM_WIDTH - 64}" height="1" fill="${C.sand}"/>`);
        y += 38;
      }
      y += 44;
    }
    const height = Math.round(y - 30);
    return { height, svg: `<rect width="${DIAGRAM_WIDTH}" height="${height}" fill="${C.cream}"/>${parts.join("")}` };
  },
};

async function writeDiagram(name) {
  const { height, svg } = DIAGRAMS[name]();
  const full = `<svg xmlns="http://www.w3.org/2000/svg" width="${DIAGRAM_WIDTH}" height="${height}" viewBox="0 0 ${DIAGRAM_WIDTH} ${height}">${svg}</svg>`;
  const png = resvg(full, { fitTo: { mode: "zoom", value: 2 } }).render().asPng();
  const buffer = await sharp(png).webp({ quality: 90 }).toBuffer();
  if (buffer.length > MAX_BYTES) throw new Error(`diagram ${name} is over 150 KB`);
  writeFileSync(join(DIAGRAM_OUT, `${name}.webp`), buffer);
  return buffer.length;
}

/* ------------------------------------------------------------------------- */
/* Run                                                                        */
/* ------------------------------------------------------------------------- */

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

async function main() {
  mkdirSync(DIAGRAM_OUT, { recursive: true });
  const errors = [];

  for (const file of readdirSync(CONTENT).filter((f) => f.endsWith(".md")).sort()) {
    const slug = file.replace(/\.md$/, "");
    const fields = frontmatter(readFileSync(join(CONTENT, file), "utf8"));
    const target = join(OUT, `${slug}.jpg`);
    try {
      if (fields.youtubeId) {
        if (existsSync(target) && !REFRESH) continue;
        const size = await writeJpeg(target, await youtubeThumbnail(fields.youtubeId));
        console.log(`covers: ${slug}.jpg from YouTube (${kb(size)})`);
      } else {
        if (!fields.illustration) {
          throw new Error(`needs "illustration:" (one of ${Object.keys(ILLUSTRATIONS).join(", ")})`);
        }
        if (!ILLUSTRATIONS[fields.illustration]) {
          throw new Error(`unknown illustration "${fields.illustration}" (one of ${Object.keys(ILLUSTRATIONS).join(", ")})`);
        }
        const svg = coverSvg(fields.coverTitle || fields.title || slug, fields.illustration);
        const size = await writeJpeg(target, resvg(svg).render().asPng());
        console.log(`covers: ${slug}.jpg drawn (${kb(size)})`);
      }
    } catch (err) {
      errors.push(`${file}: ${err.message}`);
    }
  }

  for (const name of Object.keys(DIAGRAMS)) {
    try {
      const size = await writeDiagram(name);
      console.log(`covers: diagrams/${name}.webp (${kb(size)})`);
    } catch (err) {
      errors.push(`diagram ${name}: ${err.message}`);
    }
  }

  if (errors.length) {
    for (const error of errors) console.error(`covers: ${error}`);
    process.exit(1);
  }
}

main();
