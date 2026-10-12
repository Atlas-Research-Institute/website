# Homepage hero, Lessons layout, crimson cleanup

Branch: `redesign` (checked with `git branch --show-current`). One commit (`bbee9a7`), pushed to `origin redesign` only. `npm run build` passes.

## Check this: names on the hero slide

The Fuller slide has a Zoom gallery strip down its right side. The participant name labels are readable at hero size on high-resolution screens, and at least two show a first name *and* a surname. That breaks the copy rule "testimonials use first name and country only", and the slide is now the first image on the site. The faces look blurred, but the names are not. I left the image unchanged. To fix it, crop the strip off or blur the labels, then re-export `public/images/fuller-lesson.webp`.

## Files changed

- `src/pages/Landing.tsx`
- `src/pages/About.tsx`

## What changed

- **Hero:**
  - The eyebrow is deleted on the homepage only; the one on /fellowship is unchanged. The H1 now sits at the top of the hero's existing top padding.
  - New H1 and paragraph, word for word.
  - The button and "Hear from past fellows" link are unchanged.
- **Hero figure:**
  - The Fuller slide replaces `<HeroImage />`, with the same image, alt text, caption, width/height and rounded border.
  - It loads eagerly with no `loading="lazy"`, and has `fetchpriority="high"`.
  - A one-line comment says a photo of fellows will replace it. `HeroImage.tsx` is kept, and its import is removed from Landing.
- **Lessons:** the figure is removed. The heading and intro are on the left and `ResearcherList` with its note is on the right, both top-aligned. They stack on mobile, and `id="lessons"` is kept.

## Crimson to navy

1. `src/pages/Landing.tsx`: the week labels in the fellowship weeks section ("Week 1", "Week 2", "Weeks 3 to 4", "Weeks 5 to 6").
2. `src/pages/About.tsx`: the track labels in "How Atlas works" ("Open to everyone who applies", "For admitted fellows", "For fellows who finish").

The homepage eyebrow was also crimson, but it was deleted rather than recoloured. After these changes, every remaining `text-crimson` in `src/` is a link, a button or a hover state: the `.link` utility, the "Hear from past fellows" link, nav and footer hovers, and the Discord button on /fellowship.

## Checks

At 1280px and 375px there is no sideways scroll. The slide renders at its full 16:9 shape (544×307 at 1280px, 327×185 at 375px), so nothing is cropped. It is sharp: the 1600px source is wider than the 1088 device pixels the hero needs on a 2× screen. The caption sits directly under the slide. On mobile the figure stacks under the text and buttons. The Lessons columns start at the same top edge on desktop and stack on mobile. No console warnings.

## Changes you did not ask for

- **`fetchpriority` is written in lowercase.** React 18 doesn't recognize the camelCase `fetchPriority` prop: it logs a warning, though it still renders the attribute. The lowercase spelling avoids the warning and gives the same HTML. A comment notes that React 19 accepts camelCase.
- **Gap tweak:** the Lessons grid's vertical gap is 32px instead of 48px, so the stacked columns on mobile read as one block.

## Could not do

Nothing outstanding.

## Worth a look

- The Lessons intro still ends "To name a few of the researchers who teach them:". On desktop the colon now points across to the list in the right-hand column. It reads fine, but you may want different wording now the list isn't directly below it.
