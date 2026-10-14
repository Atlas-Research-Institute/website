/**
 * Single source of truth for fellowship state + contact.
 *
 * CURRENT STATE: applications for the Winter Fellowship are OPEN.
 * They close December 21, 2026; decisions go out by December 28, 2026; the
 * fellowship runs January 4 to February 14, 2027. Pages render the labels
 * below, never their own copy of a date.
 */
export const DATES = {
  status: "open" as const,
  /** ISO dates, for anything that needs to compare against today. */
  applicationsClose: "2026-12-21",
  decisionsBy: "2026-12-28",
  fellowshipStart: "2027-01-04",
  fellowshipEnd: "2027-02-14",
  /** Display labels. */
  applicationsCloseLabel: "December 21",
  decisionsByLabel: "December 28",
  fellowshipRunsLabel: "January 4 to February 14",
  cohortName: "Winter Fellowship",
} as const;

/** The Atlas Discord, linked from the application confirmation. */
export const DISCORD_URL = "https://discord.gg/MzCHHTqzKs";

/**
 * The contact address, everywhere. There is no second address — do not
 * reintroduce info@ or any personal mailbox.
 */
export const CONTACT_EMAIL = "admin@atlas-research.org";

/**
 * Partnership enquiries only, used on the Partners page.
 *
 * This is the ONE page that does not use CONTACT_EMAIL. Every other surface —
 * footer, privacy policy, form errors — uses the address above. Kept as a named
 * constant so the exception exists in exactly one place rather than being
 * pasted into a page.
 */
export const PARTNERS_EMAIL = "nirav.goenka@atlas-research.org";

/**
 * When the privacy policy was last substantively changed.
 *
 * Pulled from here so the date cannot go stale silently while the text is
 * edited. Update it in the same commit as any change to the policy content.
 */
export const PRIVACY_UPDATED = "12 October 2026";


/**
 * DO NOT DELETE — LIVE FELLOWSHIP APPLICATION BACKEND.
 *
 * The deployed Google Apps Script that receives every fellowship application
 * submitted from /fellowship. The summer 2026 cohort applied through this same
 * endpoint. The script is bound to a Google Sheet and appends one row per
 * submission, positionally:
 *
 *   Timestamp | Name | Email | School | City | Country | Grade | Timezone |
 *   Prompt | Data_Source | Completion | Research | Research_Desc | Consent |
 *   Referral | Referral_Other
 *
 * The client also sends `discord` as a sixteenth key (added October 2026).
 * The script, as last documented, appends named keys d.name ... d.referral_other
 * and IGNORES anything else, so the username is not stored until the script's
 * appendRow gets `d.discord` at the end, a Discord column header is added, and
 * the script is redeployed (Deploy > Manage deployments > edit > New version;
 * the URL stays the same).
 *
 * Deleting, renaming, or pointing this elsewhere silently drops applications
 * on the floor with no error surface. The name is historical: the endpoint was
 * called the waitlist backend while applications were closed.
 */
export const WAITLIST_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbzoGRSNMoJhYjcbHbqG2NEdIqCZ9DJ5vGVaMBvnXHwnRnoQInQ6RsuwWirb5nb0iwTqlA/exec";


/**
 * DO NOT DELETE — LIVE PARTNERSHIP ENQUIRY BACKEND.
 *
 * This is the deployed Google Apps Script that receives every partnership
 * enquiry submitted from /partners. It is a real, in-production endpoint
 * writing to a live Google Sheet. Deleting, renaming, or pointing this
 * elsewhere silently drops enquiries on the floor with no error surface.
 *
 * A DIFFERENT DEPLOYMENT AND A DIFFERENT SHEET from WAITLIST_ENDPOINT above.
 * The two are not interchangeable and must never be consolidated — they have
 * different column contracts. Partnership rows are:
 *
 *   new Date(), name, email, titleorg, interest, consent, 'New', '', ''
 *
 * The last three columns are written by the script itself. The client must not
 * send Status, Reviewer, or Notes.
 *
 * Typed as `string | null` so nulling it restores the disabled form state via
 * isFormEndpointConfigured() with no other edit.
 */
export const FORM_ENDPOINT: string | null =
  "https://script.google.com/macros/s/AKfycbz9ef5zv5geRWZXklzo-tbO9gNV6ix2UcLTsgXOB2n-qT1Rjj6qL10yloM2fOVbIm-ZzA/exec";

/**
 * Where every Apply button points.
 *
 * /fellowship carries the application form. The legacy /apply route and
 * public/apply.html also send applicants there. Change it here and every Apply
 * button follows.
 */
export const APPLY_PATH = "/fellowship";

/** The Get involved page's volunteer form. Every "Fill out the form" button points here. */
export const GET_INVOLVED_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSercnF_jbDTA6nDOr-2fFd8tJ0w_1eP8M382YbsROGxeRvrtQ/viewform";
