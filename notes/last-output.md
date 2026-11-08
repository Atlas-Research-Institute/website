# Paper covers: report (2026-11-07)

Result: **shipped.** Every remaining check passed. PR #14 is merged and live on production.

## Scope agreed after the first stop

- Normal browser scroll snapping is accepted, with no JavaScript swipe handler. The "one sheet per flick" check is dropped. A hard, fast flick can skip a sheet; this was reproduced on a minimal plain-CSS control page as well, so it is how this Chrome handles snapping, not something in the Atlas code.
- The 900:910 frame is kept. It shows about the top 78% of the page; "portrait" and "70%" can't both hold on a 900×1164 page.

## What changed (commit 9c2f2e4)

- `src/data/featuredPapers.ts`: adds `cover: string` to the type and a `/papers/covers/<slug>.webp` path to each entry. Nothing else in the file changed.
- `src/components/home/FeaturedPapers.tsx`:
  - The section is on the mist background (`bg-mist`).
  - Each cover is a white sheet with a 1px `border-rule` edge and a soft navy-tinted drop shadow. A comment marks it as the one deliberate exception to the no-shadow rule, for paper covers only.
  - Tilts are -2, 1.5 and -1 degrees. On hover and on keyboard focus the sheet straightens to 0 degrees and lifts 6px. All tilt, lift and transitions are behind `motion-safe:`, so under `prefers-reduced-motion` the sheets sit flat and don't move.
  - The cover frame is 900:910 with `object-fit: cover; object-position: top`. Images have `loading="lazy"`, `decoding="async"` and `width=900 height=1164`. Alt text is "First page of " + title.
  - Under the sheet, all as real text: the title clamped to 2 lines, authorsShort, context, date and "Read abstract". The title button stretches over the whole sheet and its caption, so clicking or tapping anywhere on it opens the pop-up.
  - Desktop shows three sheets in a row with 48px gaps.
  - Mobile is a native scroll-snap track (`snap-x snap-mandatory`, `snap-start`, `snap-always`) with no library. Each sheet is 78% wide with the next peeking in, and the scrollbar is hidden. Three dots underneath follow the scroll position and scroll to a sheet when tapped.
  - The pop-up is unchanged apart from a small 96px cover sheet above the title.
- `public/papers/covers/*.webp`: the three provided covers, committed as-is.
- No other section, the Journal page or `src/data/publications.ts` was touched.

## Verification

- `npm run build`: passes.
- A headless Chrome 157 script ran against `vite preview` at 360px and 1440px, at 2x pixel density. **197 of 197 checks passed, in 3 consecutive runs.** It confirmed:
  - **Section:**
    - mist background, directly before the apply band and after "Where your paper goes";
    - three sheets in one row at 1440px with 48px gaps;
    - no horizontal page overflow at either width.
  - **Covers:**
    - the right `src` and alt text;
    - cropped from the top (`object-fit: cover`, `object-position: 50% 0%`), showing the top 78%;
    - sharp, since the 900px source is at least the displayed width × 2 at both widths;
    - lazy, with width and height set and the box size reserved before the image loads.
  - **Sheets:**
    - white page, 1px edge, drop shadow, and the tilts -2, 1.5 and -1 degrees;
    - at 1440px, hover straightens to 0 degrees and lifts 6px, keyboard focus does the same, and the focus ring is visible.
  - **Text:** titles are 2 lines at most, and the text under each sheet matches `featuredPapers.ts`.
  - **Mobile carousel:**
    - the track scrolls inside itself only (818px of content in a 360px track) and the page itself never scrolls sideways;
    - one sheet is in view with the next peeking;
    - a swipe moves one sheet forward or back, and the dot follows;
    - slow drags of 30, 60 and 100px snap back to the same sheet, and a drag past halfway advances one sheet;
    - tapping a dot goes to that sheet.
  - **Pop-up:**
    - clicking (1440px) or tapping (360px) each sheet image opens the right paper, with focus inside;
    - the small cover sits above the title and the PDF link is correct;
    - Escape and a backdrop click both close it, and focus returns to that sheet every time.
  - **Reduced motion, at both widths:**
    - every sheet has `transform: none`, and hover and focus do not move it;
    - the transition is the site's existing global 0.01ms reduced-motion rule from `src/index.css`, so nothing visibly animates.
  - **Files:** all three covers return 200 `image/webp` in preview.

### Test fixes during this re-run (the code didn't change)

The first re-run showed 2 failures. Both were in the test, not the page:

1. **A 100px slow drag from sheet 2 landed on sheet 3.** That is correct snapping. Sheet 3 rests at the end of the track, only 195px from sheet 2, so 100px is past halfway. The check now uses drags under half the gap (30 and 60px from sheet 2, 100px from sheet 1), plus one past halfway (130px) that should advance.
2. **Slow drags kept moving forward in the full suite but not in standalone probes.** An earlier edit to the test's swipe helper had silently not applied, so it ignored the "no momentum" flag and sent every "slow drag" as a flick. Once that was fixed, all drag checks passed. A separate probe also ran short slow drags 96 times from every sheet in both directions, and they snapped back 96 of 96 times.

## Ship

- One commit, `9c2f2e4`, containing the component, the data file and the three cover images. Pushed `paper-covers`.
- PR https://github.com/Atlas-Research-Institute/website/pull/14 merged with a merge commit (`56c07d5`). Then `git checkout main && git pull`.
- The Vercel Production deployment (id 7628794122) for `56c07d5` reached `success` within about 40 seconds.
- Live checks:
  - 200 https://atlas-research.org/
  - 200 image/webp, 152060 bytes: https://atlas-research.org/papers/covers/greenville-teacher-retention.webp
  - 200 image/webp, 157594 bytes: https://atlas-research.org/papers/covers/digital-access-stem-spain.webp
  - 200 image/webp, 159692 bytes: https://atlas-research.org/papers/covers/loneliness-after-spousal-loss.webp
  - Sizes match the local files, and the live JS bundle references all three cover paths.

## Not included in the commit

These were left untracked or modified on purpose: `notes/last-output.md` (this report), `notes/redesign/` and `public/atlas-linkedin-cover-4200x700.png`.
