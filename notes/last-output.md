# Discord on the application, deadline moved to October 25

Branch: `redesign` (checked with `git branch --show-current`). Two commits, pushed to `origin redesign` only. `npm run build` passes.

## Read first: the Discord username is not stored yet

The form now sends `discord` as the 16th key, but **the sheet will not get it until the Apps Script is edited.** The script, as last documented in the summer form's source, appends named fields (`d.name`, `d.email` … `d.referral_other`) and ignores any other key. To store the username:

1. Open the script bound to the applications sheet.
2. Add `d.discord` at the end of `appendRow([...])`.
3. Add a `Discord` header in the next empty column.
4. Redeploy: Deploy > Manage deployments > edit > Version: New version > Deploy. The URL stays the same.

I can't reach the script, so I haven't done this. Until it is done, every November applicant's Discord username is lost.

## Payload key order

```
name, email, school, city, country, grade, timezone, prompt, datasource,
completion, research, research_desc, consent, referral, referral_other, discord
```

That is 16 keys; the script adds the timestamp. `discord` is the trimmed username with one leading `@` removed, or `"Blocked where I live"`. It is always a string. I did not change `WAITLIST_ENDPOINT`, the no-cors fetch or the headers.

## New dates

- Applications close: **October 25, 2026** (`applicationsClose: "2026-10-25"`, label "October 25")
- Decisions by: **October 30, 2026** (`decisionsBy: "2026-10-30"`, label "October 30")
- Fellowship: November 2 to December 13, 2026 (unchanged)
- `PRIVACY_UPDATED`: "12 October 2026"

Every applications-close reference now says October 25: `index.html` (description, og, twitter, JSON-LD), `seo.ts` (site and /fellowship descriptions), `llms.txt`, `apply.html`, the README, and the homepage. The homepage's "Apply by …" button and "Applications close …" heading now read from `DATES`. `sitemap.xml` had no dates to change. I left the design reference files in `notes/redesign/` alone.

## Files changed

`src/lib/dates.ts`, `src/pages/Fellowship.tsx`, `src/pages/Privacy.tsx`, `src/pages/Landing.tsx`, `src/lib/seo.ts`, `index.html`, `public/llms.txt`, `public/apply.html`, `README.md`.

## Checks

There are no tests and no test runner in the repo, so there was nothing to update. Instead I drove the real form in headless Chrome. Requests to the Apps Script were intercepted and answered locally, so nothing reached the live sheet. Results:

- A blank username blocks submission, shows the error and moves focus to the field. So does `@x` (one character after the `@` is removed).
- With the blocked box checked and the username blank, it submits with `discord: "Blocked where I live"`.
- `"  @curious_researcher "` is sent as `curious_researcher`.
- `discord` is the last of 16 keys.
- A saved draft restores both the username and the blocked box.
- At 1280px and 375px nothing scrolls sideways and every control is at least 44px. The eyebrow is navy, and the new confirmation text and button render.

## Changes you did not ask for

- **Privacy policy, beyond the Discord line.** It still described the old waitlist form: name, email, school, city and country, plus "what you would want to research". It also said the site "stores nothing in your browser's local storage", which has been false since the restored application started saving drafts. The file's own comment says both must change in the same commit. Changes:
  - The list of what is collected now matches the real application.
  - "How we use it" now covers reviewing applications and emailing decisions, instead of telling waitlisters when the next cohort opens.
  - "Waitlist submissions" became "Applications".
  - The cookies section now explains the local draft.
  - "your grades" became "your marks", since the form does ask for grade level.
- **README:** reflowed the current-state paragraph and replaced the outdated "appends 16 columns" note with the 16-key rule and the script caveat.
- **`dates.ts`:** the comment on `WAITLIST_ENDPOINT` now explains that the script ignores `discord` until it is updated.
- **Homepage:** reads the close date from `DATES` instead of hard-coding it.

## Could not do

- Update the Apps Script; see the top of this report.
- `public/privacy.html` is only a redirect to `/privacy` and lists no fields, so there was nothing to add there.
