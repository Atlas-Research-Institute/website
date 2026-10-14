# Referral required; select answers stay in English under browser translation

## Changes (`src/pages/Fellowship.tsx` only)
- **Translation-proof selects.** Each `<option>` in the country, grade and referral selects now has `value` set to its English text (`value={c}`, `value={g}`, `value={r}`). The placeholder options keep `value=""`. The research radios already had `value={v}` ("Yes" / "No"), so they needed no change.
- **"Other" check.** The "Tell us where" toggle and the payload both read the select's value through FormData, so they now compare against the English value, not the visible text.
- **Referral required.** It shows the "required" marker and gets the error "Tell us how you heard about Atlas." It is added to `REQUIRED`, `FieldName` and `FIELD_ORDER` (after `completion`).
- **"Tell us where" required when Other is chosen.** Its error is "Tell us where you heard about Atlas." It is added to `FieldName` and `FIELD_ORDER` right after `referral`.
- **Not changed:** the payload keys and their order, the endpoint and the fetch.

## Verification
`npm run build` passed. The browser checks ran in headless Chromium against `vite preview`. Every POST was intercepted and answered locally, so nothing reached the live sheet.

| Check | Result |
| --- | --- |
| Submit with no referral (rest valid) | Showed "Tell us how you heard about Atlas.", focused `#referral`, 0 POSTs |
| Other with "Tell us where" empty | Showed "Tell us where you heard about Atlas.", focused `#referral_other`, 0 POSTs |
| Option text rewritten with JS ("Brasil (pt)", "Outro (pt)", etc.) | "Tell us where" still appeared. The payload sent `country: "Brazil"`, `grade: "11th / Year 12"`, `referral: "Other"`. The 16 keys were in the same order |
| 375px width | `scrollWidth` 375 = `clientWidth`, so no sideways scroll |

notes/redesign/ and public/atlas-linkedin-cover-4200x700.png were not added.
