# Fellowship reopened, site copy updated

Branch: `redesign` (checked with `git branch --show-current`). Pushed to `origin redesign`. `npm run build` passes.

## Where submissions go

**Service:** a Google Apps Script web app. The form POSTs JSON to:

`https://script.google.com/macros/s/AKfycbzoGRSNMoJhYjcbHbqG2NEdIqCZ9DJ5vGVaMBvnXHwnRnoQInQ6RsuwWirb5nb0iwTqlA/exec`

In the code this is `WAITLIST_ENDPOINT` in `src/lib/dates.ts`. I did not change the pipeline.

**Spreadsheet:** the summer form's source carried a copy of the script. That copy writes with `SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().appendRow(...)`. That means the script is *bound* to one Google Sheet and appends to its first tab. It writes 16 columns: Timestamp | Name | Email | School | City | Country | Grade | Timezone | Prompt | Data_Source | Completion | Research | Research_Desc | Consent | Referral | Referral_Other.

**It is the summer spreadsheet.** Every version of the summer form in git, from July 8 to July 24, 2026, used this exact endpoint. The waitlist used it from August, and the restored form uses it now. Summer applications, waitlist sign-ups and new November applications all land in the same sheet, one under the other.

**Account: I could not determine it.** Nothing in the repo or the endpoint's responses names the owner. Accounts that appear in git history, none of them verified as the owner:
- `atlas.research.org@gmail.com`: the site's contact address while the summer form was built (July 2026). This is the most likely.
- `atlas.research.institute@gmail.com`
- `hamaadm574@gmail.com`: the git committer.

**How to find the sheet:** sign in to each account and search Google Drive for `TEST SUBMISSION - Claude Code`. My test row should contain that text, and Drive searches inside Sheets. Or open script.google.com > My projects: a bound script is listed with its spreadsheet's name. Once found, delete the test row.

**Test submission:** I sent one, through the real form in headless Chrome. It used name "TEST SUBMISSION - Claude Code - please delete", email admin@atlas-research.org, and TEST in the other fields.
- The POST got a 302 redirect, then a 200 from Google's echo URL. Apps Script only sends that redirect after `doPost` finishes without an error.
- The confirmation then rendered and took focus.
- **I could not see the sheet, so I have not confirmed the row is actually there.** Please check it when you find the sheet.

## What changed

1. **/fellowship:** restored the full summer application from `public/apply.html` as it was before commit `eaf5337`, rebuilt in React.
   - The questions are the same, as are the word limits (prompt 40 to 350 words, data source at least 5, completion 20 to 300), the email check and the saved draft.
   - The sheet contract is the same: 15 keys in the same order, with `consent` as the optional "keep me in the loop" Yes/No.
   - After submitting, the page shows "Application received." and a "Join the Atlas Discord" button (https://discord.gg/MzCHHTqzKs).
   - Restyled to match the homepage. Everything about closed applications, the waitlist and the old research group model is gone.
   - `public/apply.html` now redirects to `/fellowship`.
   - In `src/lib/dates.ts`, `DATES` says the fellowship is open: applications close November 1, 2026; it runs November 2 to December 13, 2026. The homepage fact strip now reads those dates too. `FELLOWSHIP_WEEKS` is now 6.
2. **Site description:** set to your text in `index.html` (description, og, twitter and JSON-LD) and in `SITE_DESCRIPTION` in `seo.ts`. I also updated the /fellowship SEO entry, which still said applications were closed.
3. **`public/llms.txt`:** rewritten from current site copy. It covers the November 2026 dates, free and online, who can apply, the weeks, the summer results, the three researchers with the non-affiliation line, the partners in the site's own wording, and the application link.
4. **README:** design system, current state, copy rules and routes rewritten to match the site now; obsolete rules deleted.
5. **Sitemap:** removed `/events`, `/get-involved` and `/partners`. The pages themselves still exist.
6. **Fuller slide:** now `fuller-lesson.webp` at 91 KB and 1600×900. The 1.5 MB PNG is removed (it is still in git history).

Checks on /fellowship at 1280px and 375px: nothing scrolls sideways, every control is at least 44px, and no text mentions closed applications, the waitlist or research groups. Submitting an empty form flags all 12 required answers and moves focus to the first. No console errors.

## Decisions to check

- **The grade list gained "University"**, because university students can now apply. Otherwise the option lists are the summer ones. Country is a dropdown again (the summer list, with "Turkey" and "USA" spellings). The waitlist form had used a free-text country field.
- **The Consent column changes meaning partway down the sheet.** In summer rows it means "keep me in the loop" (Yes/No). The waitlist rows from August onward wrote "yes" for the privacy agreement and put "Waitlist for next cohort" in Referral. New rows use the summer meaning.
- **Crimson on things that aren't clickable:** the italic eyebrow lines and week labels, from the homepage reference and repeated on /fellowship, are crimson but not clickable. That breaks the README rule you asked for. Form errors now use the `alert` token instead of crimson.
- **Copy I wrote, since the reference had none for /fellowship:** the heading "Apply to the Atlas Fellowship", the confirmation text, and the line "Your answers are saved in this browser as you type". The keep-in-the-loop line also drops the summer version's mention of chapter applications. Everything else is homepage text or the summer form's own wording.
- **No page links to `/research-groups` anymore.** Its only remaining link, on the old /fellowship page, is gone. It is still in the sitemap.
