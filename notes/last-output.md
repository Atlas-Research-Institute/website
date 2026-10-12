# Confirmation-email notice on /fellowship

Branch: `redesign` (checked with `git branch --show-current`). Commit `54993f7`, pushed to `origin redesign` only. `npm run build` passes.

## What changed (`src/pages/Fellowship.tsx` only)

- **New paragraph** in the "Application received." box, between the thank-you paragraph and "While you wait, say hello in the Atlas Discord.":
  "You should get a confirmation email at **{email}** from {CONTACT_EMAIL} within a few minutes. If you do not see it, check your spam folder."
- **Where the address comes from:** it is saved in component state (`submittedEmail`) at submit time, from the payload's trimmed email. It is not read from localStorage. The sender comes from `CONTACT_EMAIL` in `src/lib/dates.ts`.
- **Long addresses:** the paragraph uses `overflow-wrap: anywhere`, so they wrap inside the box.
- **Not changed:** the payload, the endpoint and the fetch.

## Browser checks

Run in headless Chrome. The POST was intercepted and answered locally, so nothing reached the live sheet. Test address: a 104-character email, typed with surrounding spaces.

| Width | Sideways scroll | Address | Inside the box |
| --- | --- | --- | --- |
| 1280px | none | trimmed, semibold (600) | yes |
| 375px | none | trimmed, semibold, wraps over five lines | yes |

The paragraphs appear in the requested order. The draft was cleared after submit, and the address still showed. The payload still has 16 keys. No console errors.

## Not asked for

Nothing.

## Note

The site only says what the email will say. I can't see or test the Apps Script's email, so I haven't confirmed that it sends, that it comes from admin@atlas-research.org, or that it arrives within a few minutes.
