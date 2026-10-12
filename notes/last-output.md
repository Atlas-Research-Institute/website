# Hard word limits on /fellowship

Branch: `redesign` (checked with `git branch --show-current`). Commit `a1bbf2f`, pushed to `origin redesign` only. `npm run build` passes.

## What changed (`src/pages/Fellowship.tsx` only)

- **Count line, within limits:** unchanged, for example "120 words. 20 to 300 words."
- **Count line, over the maximum:** shows only "Over 300 words" (or "Over 350 words" for the first question) in the alert colour. "Try to tighten it, but you can still submit." is gone.
- **Validation:** `validateApplication` now blocks when the count is over `LIMITS[key].max`, with "Over {max} words. Cut it to {max} or fewer to submit." The field takes focus and scrolls into view, like the other errors.
- **`LIMITS` comment:** now says both minimums and maximums block. The data source question has no maximum (`Infinity`), so it can never trip this check.

## Browser checks

Run in headless Chrome. Requests to the Apps Script were intercepted and answered locally, so nothing reached the live sheet.

| Case | Count line | Result |
| --- | --- | --- |
| Completion, 301 words | "Over 300 words", alert colour | Blocked, error shown, completion focused and in view, no POST |
| Completion, 300 words | "300 words. 20 to 300 words." | Submitted, one POST |
| First question, 351 words | "Over 350 words", alert colour | Blocked, error shown, field focused and in view, no POST |
| First question, 350 words | "350 words. 40 to 350 words." | Submitted, one POST |

No console errors.

## Not asked for

Nothing.
