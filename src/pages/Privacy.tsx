import { Prose } from "@/components/Prose";
import { CONTACT_EMAIL, PRIVACY_UPDATED } from "@/lib/dates";

/**
 * Privacy policy.
 *
 * Written to describe what the site ACTUALLY does, not a generic template.
 * Two things to keep true if the code changes:
 *
 *   1. The cookie section says this site sets no cookies. That is currently
 *      accurate — Vercel Web Analytics is cookieless. The one thing stored
 *      client-side is the application draft in localStorage, which the
 *      section describes. If any cookie, other storage, or third-party script
 *      is added, this section must change in the same commit.
 *   2. The collected-fields list matches the application form on /fellowship
 *      exactly. Adding a field there means adding it here.
 *
 * PRIVACY_UPDATED lives in src/lib/dates.ts so the date cannot go stale while
 * the text is edited.
 *
 * Do not add "501(c)(3)", the sponsoring entity's name, a postal address, or
 * any personal name beyond the two contact addresses.
 */
export function Privacy() {
  return (
    <div className="bg-paper">
      <section className="border-b border-line">
        <div className="mx-auto max-w-4xl px-6 pt-16 md:pt-20 pb-10">
          <p className="meta-label">Legal</p>
          <h1 className="type-hero font-display mt-4">Privacy policy</h1>
          <p className="mt-5 meta-label text-muted">
            Last updated {PRIVACY_UPDATED}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-12">
        <Prose>
          <p>
            This policy covers atlas-research.org. It describes what the site
            collects, why, where it goes, and how to get it removed. If
            something here is unclear, email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and ask.
          </p>

          <h2>What we collect</h2>
          <p>
            One form on this site collects personal information: the Fellowship
            application. It asks for:
          </p>
          <ul>
            <li>Your name</li>
            <li>Your email address</li>
            <li>Your school, and your school's city and country</li>
            <li>Your grade or year, and your time zone</li>
            <li>
              Whether you have done research before, and optionally one line on
              what it was
            </li>
            <li>Your three written responses</li>
            <li>Optionally, how you heard about Atlas</li>
            <li>
              Your Discord username, or that Discord is blocked where you live.
              We use the username only to give admitted fellows access to the
              fellowship channels.
            </li>
            <li>
              Whether you want to hear from us about live sessions and future
              cohorts
            </li>
          </ul>
          <p>
            That is everything. We do not ask for your date of birth, your
            address, your phone number, your marks, or a résumé. We do not buy
            information about you from anyone, and we do not sell, rent, or
            share your information with third parties.
          </p>

          <h2>How we use it</h2>
          <p>
            To review your application, email you our decision, give admitted
            fellows access to the fellowship, and answer you if you write to
            us. If you ticked "keep me in the loop", we also tell you about live
            sessions and when the next cohort opens. Nothing else. We do not send unrelated marketing, and
            we do not use your information to build a profile of you.
          </p>

          <h2>Where it is stored</h2>
          <p>
            Applications are sent through Google Apps Script and stored
            in Google Sheets. We use Brevo to send email. Both providers process
            this information on our behalf under their own terms.
          </p>
          <p>
            Access is limited to the people at Atlas who run the programme.
          </p>

          <h2>Cookies and analytics</h2>
          <p>
            <strong>This site sets no cookies.</strong> While you fill in the
            application, your answers are saved in your own browser's local
            storage so a closed tab does not lose them. They stay on your
            device and are cleared when you submit. There are no advertising
            trackers, no social media pixels, and no cross-site tracking of any
            kind.
          </p>
          <p>
            We use Vercel Web Analytics to count page views. It is cookieless:
            it does not set a cookie, does not store a persistent identifier for
            you, and does not follow you to other websites. It tells us which
            pages are read, not who read them.
          </p>
          <p>
            The site loads fonts from Google Fonts, which means your browser
            makes a request to Google's servers when a page loads. That request
            includes your IP address, as any web request does. We do not receive
            or store it.
          </p>

          <h2>How long we keep it</h2>
          <p>
            Until you ask us to remove it. There is no fixed expiry — if you
            want your information deleted, we delete it.
          </p>

          <h2>Getting a copy, or getting it deleted</h2>
          <p>
            Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and
            ask. You can request:
          </p>
          <ul>
            <li>A copy of what we hold about you</li>
            <li>A correction to anything inaccurate</li>
            <li>Deletion of your information</li>
          </ul>
          <p>
            You do not need to give a reason, and asking will not affect any
            application.
          </p>

          <h2>If you are under 18</h2>
          <p>
            Many people who apply to Atlas are under 18. We collect the minimum
            necessary to run the programme, which is the short list above, and
            we do not ask for your date of birth.
          </p>
          <p>
            A parent or guardian may email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> to ask what
            we hold about a young person, or to have it removed. We act on those
            requests without requiring the student to be involved.
          </p>
          <p>
            If you are under 18, we would rather you told a parent or guardian
            that you are signing up.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            If this policy changes, the date at the top of this page changes
            with it.
          </p>

          <h2>Contact</h2>
          <p>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
        </Prose>
      </div>
    </div>
  );
}
