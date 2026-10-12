# Redesign: homepage, About page, Source Serif 4

Branch: `redesign` (checked with `git branch --show-current`). Six commits, pushed to `origin redesign`. `npm run build` passes.

## Read this first: where Apply points

**Every Apply button goes to `/fellowship`.** The old site had no button labelled "Apply". The header button said "Start a group" and opened the Principal Researcher Google Form (`https://forms.gle/s2qpP3XX3ydLc58k6`). That form is for leading a research group, not for applying to the fellowship. The site's own apply routes point somewhere else: the legacy `/apply` route redirects to `/fellowship`, and `public/apply.html` links to `/fellowship`. `/fellowship` holds the application form (the waitlist form). I used that target and did not change the form. The target is one constant, `APPLY_PATH` in `src/lib/dates.ts`.

**The problem:** `/fellowship` still says applications for this cohort are closed and offers only the waitlist. The new homepage says "Apply by November 1". Someone who clicks Apply will land on a page that says applications are closed. You need to decide what that page should say. I was told not to change the form, so I didn't.

## What changed

- **Type:** Source Serif 4 (400 to 700, roman and italic) is now the only typeface. It replaces Instrument Serif and Archivo in `index.html`, `tailwind.config.ts` (display, serif and sans all map to it), `src/index.css`, `public/apply.html` and `public/privacy.html`. The privacy page now loads the font as well as declaring it. The Archivo `fontFamily` in `BriefPreview.tsx` is also replaced.
- **Tokens:** navy, crimson (plus crimson-hover #6A1523, taken from the reference's hover colour), ink #1B2433, body-muted, muted #4A5568, mist, rule, navy-border, on-navy-muted. All corners are 4px. Removed sitewide: the paper-grain texture, the card shadow and lift, and the all-caps `.meta-label`. Meta labels are now italic. Links (`.link`) are crimson. The focus outline is 3px crimson, white on navy sections.
- **Header and footer:** 8px navy bar, the wordmark, Fellowship (`/#fellowship`), Lessons (`/#lessons`), Journal (`/journal`), About (`/about`) and a crimson Apply button. The footer has About, Journal, Privacy, the mailto link, and Instagram and LinkedIn icons from `react-icons/fa6`, each with an aria-label.
- **Homepage:** rebuilt in React and Tailwind to match `home.html`, with the 10 sections in the reference order and the copy word for word. The hero image points at `/images/hero.jpg` and shows a plain mist block until that file exists, with no placeholder text. The Fuller slide is `public/images/fuller-lesson.png` (now committed). The researcher names and the non-affiliation line come from one component (`ResearcherList`), so neither can appear without the other.
- **About:** new page at `/about`, matching `about.html`. It is linked from the nav and the footer, and has an SEO entry and a sitemap entry.
- **Lumiere:** the README rule and `public/llms.txt` now say scholarships.
- **404 page:** the button is restyled, and its text no longer points readers to the research group directory in the nav, since that link is gone.

## Files touched

`index.html`, `tailwind.config.ts`, `src/index.css`, `public/apply.html`, `public/privacy.html`, `public/llms.txt`, `public/sitemap.xml`, `public/images/fuller-lesson.png` (added), `README.md`, `package.json`, `package-lock.json`, `src/App.tsx`, `src/lib/dates.ts`, `src/lib/seo.ts`, `src/components/Nav.tsx`, `src/components/Footer.tsx`, `src/components/visuals/BriefPreview.tsx`, `src/pages/Landing.tsx`, `src/pages/About.tsx` (new), `src/components/site/{Container,Researchers,Quote,HeroImage}.tsx` (new).

No page or component was deleted. The old homepage sections (FeaturedGroups, ResearchGroupsPitch, EventsStrip, ProcessTrack, StatementPanel, FieldIndex, OutputSection, ProofBand, GetInvolvedLine, FellowshipStrip, Faq, Closing, Hero, HatchDivider) are still in the repo but no longer used. I did not touch the Google Sheets loaders in `src/lib/*Source.ts`.

## Pages no longer linked from anywhere

- `/events`, which also cuts off `/events/:slug`, since those pages were only linked from `/events` and the old homepage strip
- `/get-involved`
- `/partners`

Still linked: `/research-groups` (from a link on `/fellowship` and from `public/apply.html`, though no longer from the nav), `/research-groups/:slug` (from `/research-groups`), and `/journal/:slug` (from `/journal`).

## Checks

- Ran headless Chrome against the dev server at 1280px and 375px on both pages. Neither page scrolls sideways. At 375px the nav wraps to the four links on one row with Apply below it.
- Every link and button is at least 44px tall. The legal line's inline email was the one exception, so it is now plain text; the mailto link in the row above is 50px.
- Tabbing through the page, every focusable element shows a visible outline. Every internal link loads a real route, the `#fellowship`, `#lessons` and `#fellows` anchors exist, and there were no console errors.

## Could not match, or decisions to check

- **`.claude/skills/frontend-design/SKILL.md` does not exist.** The `.claude/skills/` folder is empty.
- **README copy rules conflict with the reference text.** As instructed, I used the reference word for word, which breaks three README rules: it says "education access" (the README bans that framing), it names individuals (professors, fellows), and it presents the fellowship as open (the README and `dates.ts` say it is closed). The README design-system section also still describes the old monochrome, Instrument Serif system. I left both sections alone because you only asked me to change the Lumiere rule. Both need rewriting before someone "fixes" the site back.
- **Footer legal line kept.** The reference footer doesn't have the "operates as a project of a California nonprofit…" line, but the code marks it as exact required wording. I kept it as a small line under the footer row.
- **Nav targets:** Journal goes to the real `/journal` page, not the reference's `#journal` anchor. That keeps the Journal page linked. The "Where your paper goes" section still has `id="journal"`.
- **Site meta description** in `index.html` and `seo.ts` still talks about research groups and says fellowship applications are closed. I did not change it.
- **Hero image alt text** is "An Atlas fellow at work". This is screen-reader text, not visible copy. Replace it once the real photo, with the fellow's name, arrives.
- `fuller-lesson.png` is 1.5 MB. It is lazy-loaded, but a compressed JPG or WebP would be lighter.
- I did not touch `notes/redesign/` or `public/atlas-linkedin-cover-4200x700.png`; neither is committed.
