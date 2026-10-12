# Atlas Research Institute — website

Vite + React 18 + TypeScript + Tailwind CSS 3. No animation library. Runtime
dependencies are React Router, react-icons (footer brand icons) and two class
utilities.

The site leads with **the Atlas Fellowship**: a free, six-week online research
fellowship. Applications for the November 2026 Fellowship are open.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc -b && vite build
```

On Windows you can also double-click `dev.cmd`.

## Deploy on Vercel

Vercel auto-detects Vite. Build command `npm run build`, output directory
`dist`, no environment variables.

## Design system

Light mode only. Tokens live in `tailwind.config.ts`.

**Type: Source Serif 4 only**, weights 400 to 700, roman and italic, loaded from
Google Fonts in `index.html`. `font-display`, `font-serif` and `font-sans` all
resolve to it. Do not add a second typeface.

| Token | Value | Job |
| --- | --- | --- |
| `navy` | `#13294B` | headings, dark sections |
| `crimson` | `#8C1D2F` | buttons and links only |
| `crimson-hover` | `#6A1523` | crimson hover |
| `ink` | `#1B2433` | body text |
| `body-muted` | `#39455A` | lead paragraphs, figcaptions |
| `muted` | `#4A5568` | captions, affiliations, secondary text |
| `mist` | `#F2F4F7` | light sections and cards |
| `rule` | `#D9DDE3` | hairline borders |
| `navy-border` | `#4A6189` | borders on navy |
| `on-navy-muted` | `#C9D3E3` | secondary text on navy |
| `paper` | `#FFFFFF` | page background |

`alert` (`#B3402F`) is for form errors only.

`surface`, `line`, `ink-hover` and `faint` remain for pages that have
not been redesigned (journal, research groups, events). Do not use them on new
work.

Rules:

- **Crimson is only for things you can click**: buttons and links. Never a
  heading, a label colour or decoration.
- **4px corner radius** everywhere (`rounded`, `rounded-card` and
  `rounded-control` are all 4px). No shadows, no gradients.
- **No all-caps labels.** Labels are italic, sentence case.
- Headings are navy at weight 600. Body is 19px with 1.65 line height on the
  redesigned pages.
- Dark sections are navy with the `on-navy` class, which turns headings white and
  the focus outline white.
- Keyboard focus is a 3px crimson outline, offset 3px. Never remove it.
- Tap targets are at least 44px.
- The design reference for the homepage and About page is `notes/redesign/`.

### Brand mark

**`public/atlas-mark.svg` is the source of truth for the mark.** One path on a
`0 0 1000 1000` viewBox — a serif A whose crossbar resolves into a pen nib. Edit
that file, never a copy of it.

`src/components/AtlasMark.tsx` exports `AtlasMark` (mark alone) and
`AtlasLockup` (mark plus the wordmark, horizontal or stacked). **Nothing sits
beneath the wordmark** — a descriptor line there repeated "Research Institute"
twice, and the tagline that used to sit under the wordmark in the artwork has
been removed from the brand. The component copies the path from
`public/atlas-mark.svg` verbatim; do not hand-edit the numbers.

Legibility floor is **24px**, and the nav and footer both sit exactly on it. At
24px the counter and the nib still read; at 16px the nib closes into the
crossbar. Below 24px use a tile (`public/atlas-mark-tile.svg`), which is what the
favicons do.

To change the mark: edit `public/atlas-mark.svg`, run
`node scripts/generate-icons.mjs`, then copy the new path into the `MARK`
constant in `src/components/AtlasMark.tsx`. The generator needs `sharp`, which is
a devDependency, so it just runs.

It reads two sources and writes six files:

| Source | Writes |
| --- | --- |
| `atlas-mark.svg` | `favicon-16x16.png`, `favicon-32x32.png`, `icon-192.png`, `icon-512.png` |
| `atlas-lockup-horizontal-white.svg` | `og.svg`, then `og-image.png` **from that same `og.svg`** |

**`og.svg` is the editable source of `og-image.png`.** The raster is produced
from the vector in the same run, so the file the site serves cannot disagree with
the file you edit. It used to: `og.svg` carried a tagline on a light ground while
`og-image.png` was dark with none.

`og.svg` contains **no `<text>` elements** — the wordmark comes from the lockup as
outlined paths, so rendering never depends on a font being installed. An earlier
version used live text and silently rasterised in Georgia on a machine without
Instrument Serif. Do not reintroduce live text there.

The generator deliberately does **not** overwrite `favicon.svg`, `favicon.ico`,
`apple-touch-icon.png` or the `public/atlas-*` files — those are authored
artwork, not derivatives, and have to be replaced by hand.

It also validates the lockup's measured ink box before writing anything, and
fails with the correct numbers if the lockup has been redrawn, rather than
quietly producing an off-centre card.

## Data layer — edit these, never a page

Every list on the site is driven by a file in `src/data/`. No page or component
hardcodes a group, role, event, or publication.

| File | Owns |
| --- | --- |
| `src/data/research-groups.ts` | research groups + the `Field` union |
| `src/data/openings.ts` | every role, and whether it is open |
| `src/data/events.ts` | every event |
| `src/data/publications.ts` | journal working papers and articles |
| `src/lib/stats.ts` | every displayed number |
| `src/lib/dates.ts` | fellowship dates, Apply target, contact email, form endpoints |

Behaviour that is automatic, so you never edit a page for it:

- An **opening** whose `deadline` has passed renders as closed
  (`effectiveStatus`).
- An **event** whose `date` has passed moves from upcoming to past
  (`upcomingEvents` / `pastEvents`).
- An **archived** research group drops out of the directory
  (`isVisibleByDefault`); it is reachable only via the "Include archived"
  toggle.
- A null `formUrl` / `registrationUrl` / `fullTextUrl` renders a **disabled**
  control, never a dead link.

### Stats are off until you fill them in

Every value in `src/lib/stats.ts` is `null`, so the stat band renders nothing.
Set one to a real number and the band appears — no other file changes. Do not
put placeholder numbers or "coming soon" in a stat slot.

### Images

`image` is `null` on every seeded record, which renders a designed typographic
fallback rather than an empty box. See `public/images/README.md` for dimensions
and rules before adding any.

## Current state — read before editing copy

- **Applications for the November 2026 Fellowship are open.** They close
  October 25, 2026, decisions go out by October 30, 2026, and the fellowship
  runs November 2 to December 13, 2026. The dates live in `src/lib/dates.ts`
  (`DATES`). Every Apply button points at `APPLY_PATH` (`/fellowship`).
- The application form on `/fellowship` posts to `WAITLIST_ENDPOINT` in
  `src/lib/dates.ts`, the live Apps Script the summer 2026 cohort applied
  through. The payload is 16 keys; `discord` is last and new keys only ever go
  at the end. Do not rename, reorder or remove a key. The script must append
  `d.discord` before that column is actually stored (see the comment on
  `WAITLIST_ENDPOINT`).
- `public/apply.html` redirects to `/fellowship`. It is kept because old emails
  link to it.
- The research groups, events, get-involved and partners pages still exist but
  no page links to them. Events, get-involved and partners are out of the
  sitemap.

## Copy rules

- **Education access framing is allowed** and is the fellowship's theme.
- **Testimonials use first name and country only.** Never a surname, school or
  photo without permission.
- **Named researchers always appear with the non-affiliation line**: "Atlas is
  not affiliated with or endorsed by these universities." `ResearcherList` in
  `src/components/site/Researchers.tsx` renders both together; use it.
- **Never say Atlas partnered with a university.** Researchers teach Atlas
  fellows; their universities are not partners.
- **Lumiere gives scholarships** to Lumiere programs for Atlas fellows. Never
  discounts.
- **The Atlas Journal is read by Atlas editors and is not externally peer
  reviewed.** Never call it peer reviewed. Acceptance at outside journals is the
  journal's decision, never promised.
- Never write "ISSN", "501(c)(3)", "tax deductible", an EIN or a street address.
- Contact is `admin@atlas-research.org` everywhere.
- Banned words: empower, foster, robust, holistic, comprehensive, leverage,
  unlock, cutting-edge, seamless, journey, passionate, dedicated to.

## Routes

In the nav, footer or sitemap: `/` · `/fellowship` · `/about` · `/journal` ·
`/journal/:slug` · `/privacy`

Still routed but linked from no page: `/research-groups`,
`/research-groups/:slug`, `/events`, `/events/:slug`, `/get-involved`,
`/partners`

`/chapters`, `/chapters/:slug`, and `/apply` redirect to their current
equivalents so older links keep working.
