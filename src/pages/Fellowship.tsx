import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Container, SectionHeading } from "@/components/site/Container";
import { FactStrip } from "@/components/site/FactStrip";
import { CONTACT_EMAIL, DATES, DISCORD_URL, WAITLIST_ENDPOINT } from "@/lib/dates";
import { logPayload } from "@/lib/payloadLog";

/**
 * The exact keys the Apps Script reads, in the order it appends them.
 *
 * THE SCRIPT WRITES POSITIONALLY and must not change. It appends:
 *
 *   new Date(), name, email, school, city, country, grade, timezone, prompt,
 *   datasource, completion, research, research_desc, consent, referral,
 *   referral_other
 *
 * These are the summer 2026 application's questions, and the columns of the
 * sheet the summer cohort applied into. The script supplies the timestamp, so
 * the client sends the fifteen field keys only, every one as a string:
 * `undefined` does not survive JSON.stringify and would shift the columns.
 *
 * `consent` is the OPTIONAL "keep me in the loop" box, Yes or No, as it was in
 * the summer. The required privacy agreement blocks submission and is not a
 * column.
 */
export type ApplicationPayload = {
  name: string;
  email: string;
  school: string;
  city: string;
  country: string;
  grade: string;
  timezone: string;
  prompt: string;
  datasource: string;
  completion: string;
  research: string;
  research_desc: string;
  consent: string;
  referral: string;
  referral_other: string;
};

type FieldName =
  | "name"
  | "email"
  | "school"
  | "city"
  | "country"
  | "grade"
  | "timezone"
  | "research"
  | "prompt"
  | "datasource"
  | "completion"
  | "agree";
export type ApplicationErrors = Partial<Record<FieldName, string>>;

/** Field order, so the first error can take focus. */
const FIELD_ORDER: FieldName[] = [
  "name",
  "email",
  "school",
  "city",
  "country",
  "grade",
  "timezone",
  "research",
  "prompt",
  "datasource",
  "completion",
  "agree",
];

const REQUIRED: Partial<Record<FieldName, string>> = {
  name: "Enter your full name.",
  email: "Enter your email address.",
  school: "Enter the name of your school.",
  city: "Enter your school's city.",
  country: "Select your country.",
  grade: "Select your grade or year.",
  timezone: "Enter your time zone.",
  research: "Choose yes or no.",
};

/** Word limits from the summer application. Minimums block; maximums warn. */
const LIMITS = {
  prompt: { min: 40, max: 350 },
  datasource: { min: 5, max: Infinity },
  completion: { min: 20, max: 300 },
} as const;

export function wordCount(s: string): number {
  const t = s.trim();
  return t ? t.split(/\s+/).length : 0;
}

/** The validation rule, as a pure function of the submitted FormData. */
export function validateApplication(fd: FormData): ApplicationErrors {
  const text = (k: string) => String(fd.get(k) ?? "").trim();
  const found: ApplicationErrors = {};

  for (const [key, msg] of Object.entries(REQUIRED) as [FieldName, string][]) {
    if (!text(key)) found[key] = msg;
  }

  // The browser accepts "x@y"; require a dot in the domain too.
  if (text("email") && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(text("email"))) {
    found.email =
      "Enter a complete email address, including the part after the dot (for example, name@gmail.com).";
  }

  for (const key of ["prompt", "datasource", "completion"] as const) {
    const n = wordCount(text(key));
    if (n < LIMITS[key].min) {
      found[key] =
        n === 0
          ? "This question is required."
          : `This response is too short to review. You have written ${n} word${n === 1 ? "" : "s"}. Please write at least ${LIMITS[key].min}.`;
    }
  }

  // An unchecked checkbox is absent from FormData entirely.
  if (!fd.get("agree")) found.agree = "Agree to the privacy policy to submit your application.";

  return found;
}

/** Build the POST body. Call only after validateApplication returns clean. */
export function buildApplicationPayload(fd: FormData): ApplicationPayload {
  const text = (k: string) => String(fd.get(k) ?? "").trim();
  const referral = text("referral");
  return {
    name: text("name"),
    email: text("email"),
    school: text("school"),
    city: text("city"),
    country: text("country"),
    grade: text("grade"),
    timezone: text("timezone"),
    prompt: text("prompt"),
    datasource: text("datasource"),
    completion: text("completion"),
    research: text("research"),
    research_desc: text("research_desc"),
    consent: fd.get("consent") ? "Yes" : "No",
    referral,
    referral_other: referral === "Other" ? text("referral_other") : "",
  };
}

/* The summer application's option lists, unchanged so the columns stay comparable. */
const COUNTRIES = "Afghanistan|Albania|Algeria|Argentina|Australia|Austria|Bangladesh|Belgium|Bolivia|Brazil|Cambodia|Canada|Chile|China|Colombia|Czech Republic|Denmark|Ecuador|Egypt|Ethiopia|Finland|France|Germany|Ghana|Greece|Guatemala|Hungary|India|Indonesia|Iran|Iraq|Ireland|Israel|Italy|Japan|Jordan|Kazakhstan|Kenya|Kuwait|Lebanon|Libya|Malaysia|Mexico|Morocco|Myanmar|Nepal|Netherlands|New Zealand|Nigeria|Norway|Oman|Pakistan|Palestine|Panama|Peru|Philippines|Poland|Portugal|Qatar|Romania|Russia|Saudi Arabia|Senegal|Singapore|Somalia|South Africa|South Korea|Spain|Sri Lanka|Sudan|Sweden|Switzerland|Syria|Taiwan|Tanzania|Thailand|Tunisia|Turkey|UAE|Uganda|Ukraine|United Kingdom|USA|Uzbekistan|Venezuela|Vietnam|Yemen|Other".split("|");
/* "University" is new: university students can now apply. */
const GRADES = ["9th / Year 10", "10th / Year 11", "11th / Year 12", "12th / Year 13", "University", "Other"];
const REFERRALS = [
  "Google search",
  "ChatGPT or another AI assistant",
  "Instagram or TikTok",
  "A friend or classmate",
  "A teacher or school",
  "Other",
];

/* A closed tab should lose nothing. Same idea as the summer form's draft. */
const DRAFT_KEY = "atlas_application_draft_v2";
const DRAFT_FIELDS = [
  "name", "email", "school", "city", "country", "grade", "timezone", "research",
  "research_desc", "prompt", "datasource", "completion", "referral", "referral_other",
];

const inputCls =
  "w-full rounded border border-rule bg-paper px-4 py-3 text-[17px] leading-[1.5] text-ink placeholder:text-muted focus:border-navy aria-[invalid=true]:border-crimson";

type SubmitState = "idle" | "sending" | "sent" | "error";

/**
 * /fellowship: the November 2026 Fellowship and its application.
 *
 * The form posts to WAITLIST_ENDPOINT, the live Apps Script the summer cohort
 * applied through. See the comment on the fetch for why the POST is no-cors.
 */
export function Fellowship() {
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<SubmitState>("idle");
  const [errors, setErrors] = useState<ApplicationErrors>({});
  const [counts, setCounts] = useState({ prompt: 0, completion: 0 });
  const [referral, setReferral] = useState("");

  // Restore a saved draft once.
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      const d = JSON.parse(raw) as Record<string, string | boolean>;
      for (const key of DRAFT_FIELDS) {
        const v = d[key];
        if (typeof v !== "string") continue;
        const el = form.elements.namedItem(key);
        if (el instanceof RadioNodeList) el.value = v;
        else if (el && "value" in el) (el as HTMLInputElement).value = v;
      }
      (form.elements.namedItem("consent") as HTMLInputElement).checked = Boolean(d.consent);
      setCounts({
        prompt: wordCount(String(d.prompt ?? "")),
        completion: wordCount(String(d.completion ?? "")),
      });
      setReferral(String(d.referral ?? ""));
    } catch {
      /* storage blocked or draft malformed: start empty */
    }
  }, []);

  const saveDraft = () => {
    const form = formRef.current;
    if (!form) return;
    const fd = new FormData(form);
    const d: Record<string, string | boolean> = {};
    for (const key of DRAFT_FIELDS) d[key] = String(fd.get(key) ?? "");
    d.consent = Boolean(fd.get("consent"));
    setCounts({ prompt: wordCount(String(d.prompt)), completion: wordCount(String(d.completion)) });
    setReferral(String(d.referral));
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(d));
    } catch {
      /* storage blocked: nothing to save to */
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const found = validateApplication(fd);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      setState("idle");
      const first = FIELD_ORDER.find((k) => found[k]);
      const el = first && form.elements.namedItem(first);
      const target = el instanceof RadioNodeList ? (el[0] as HTMLElement) : (el as HTMLElement | null);
      target?.focus();
      target?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const payload = buildApplicationPayload(fd);
    // The POST is no-cors, so this is the only way to see what left the
    // browser. Silent on the live domain; see src/lib/payloadLog.ts.
    logPayload("application", payload);

    setErrors({});
    setState("sending");
    try {
      /*
       * THE RESPONSE IS OPAQUE BY NECESSITY. Do not "improve" this by reading
       * res.ok or removing mode: "no-cors".
       *
       * The Apps Script /exec endpoint answers a POST with a 302 to
       * script.googleusercontent.com, which sends no
       * Access-Control-Allow-Origin header. A CORS-mode fetch would reject
       * even though the row was already written. no-cors is what the summer
       * form used and what is known to work; the cost is that "sent" means
       * "the request left the browser", not "the server accepted it".
       */
      await fetch(WAITLIST_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch {
        /* nothing to clear */
      }
      setState("sent");
    } catch {
      // Only a network-level failure reaches here.
      setState("error");
    }
  };

  useEffect(() => {
    if (state === "sent") {
      doneRef.current?.focus();
      doneRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [state]);

  const errorCount = Object.keys(errors).length;

  return (
    <div className="bg-paper text-ink text-[19px] leading-[1.65]">
      <Container className="pt-16 pb-12">
        <p className="m-0 mb-[18px] text-[18px] italic text-crimson">
          Applications open for the {DATES.cohortName}
        </p>
        <h1 className="m-0 mb-6 max-w-[20ch] text-[length:clamp(40px,5.2vw,62px)] leading-[1.08] tracking-[-0.01em]">
          Apply to the Atlas Fellowship
        </h1>
        <div className="max-w-[36em] text-[21px] text-body-muted">
          <p className="m-0 mb-4">
            The Atlas Fellowship is six weeks of guided research. You pick a
            question about education access where you live, learn how to find
            and test evidence, and finish your first research paper.
          </p>
          <p className="m-0">
            No prior research experience is required. We care about how you
            think, not what you have already done.
          </p>
        </div>
      </Container>

      <Container>
        <FactStrip />
      </Container>

      <section id="apply" className="mx-auto max-w-[760px] px-6 pt-[88px] pb-[104px]">
        {state === "sent" ? (
          <div
            ref={doneRef}
            tabIndex={-1}
            role="status"
            className="rounded bg-mist p-8 md:p-10"
          >
            <h2 className="m-0 mb-3 text-[length:clamp(30px,3.4vw,42px)] leading-[1.15]">
              Application received.
            </h2>
            <p className="m-0 mb-7">
              Thank you. Your application to the {DATES.cohortName} has been
              received. We read every application ourselves.
            </p>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded bg-crimson px-7 py-[15px] text-[18px] font-semibold text-white no-underline hover:bg-crimson-hover transition-colors"
            >
              Join the Atlas Discord
            </a>
          </div>
        ) : (
          <>
            <SectionHeading className="m-0 mb-3">Your application</SectionHeading>
            <p className="m-0 mb-12 text-muted">
              Applications close {DATES.applicationsCloseLabel}. Your answers
              are saved in this browser as you type.
            </p>

            <form
              ref={formRef}
              onSubmit={onSubmit}
              onInput={saveDraft}
              onChange={saveDraft}
              noValidate
              className="grid gap-14"
            >
              <Group title="Who you are">
                <Q id="name" label="Full name" required error={errors.name}>
                  <input id="name" name="name" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby="name-error" className={inputCls} />
                </Q>
                <Q id="email" label="Email" required error={errors.email}>
                  <input id="email" name="email" type="email" autoComplete="email" required aria-invalid={!!errors.email} aria-describedby="email-error" className={inputCls} placeholder="you@email.com" />
                </Q>
                <Q id="school" label="School name" required error={errors.school}>
                  <input id="school" name="school" autoComplete="organization" required aria-invalid={!!errors.school} aria-describedby="school-error" className={inputCls} />
                </Q>
                <Q id="city" label="Your school's city" required hint="The city where your school is located, not necessarily where you live." error={errors.city}>
                  <input id="city" name="city" required aria-invalid={!!errors.city} aria-describedby="city-hint city-error" className={inputCls} placeholder="e.g. Dhaka, Nairobi, San Jose" />
                </Q>
                <div className="grid gap-8 sm:grid-cols-2">
                  <Q id="country" label="Country" required error={errors.country}>
                    <select id="country" name="country" required defaultValue="" aria-invalid={!!errors.country} aria-describedby="country-error" className={inputCls}>
                      <option value="" disabled>Select country</option>
                      {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </Q>
                  <Q id="grade" label="Grade / year" required error={errors.grade}>
                    <select id="grade" name="grade" required defaultValue="" aria-invalid={!!errors.grade} aria-describedby="grade-error" className={inputCls}>
                      <option value="" disabled>Select grade</option>
                      {GRADES.map((g) => <option key={g}>{g}</option>)}
                    </select>
                  </Q>
                </div>
                <Q id="timezone" label="Your time zone" required hint="Lessons run across many time zones. This helps us schedule sessions you can actually attend." error={errors.timezone}>
                  <input id="timezone" name="timezone" required aria-invalid={!!errors.timezone} aria-describedby="timezone-hint timezone-error" className={inputCls} placeholder="e.g. PST, GMT+5:30, CET" />
                </Q>
              </Group>

              <Group title="Context">
                <fieldset className="m-0 border-0 p-0" aria-describedby="research-hint research-error">
                  <legend className="p-0 font-semibold text-navy">
                    Have you done research before? <Req required />
                  </legend>
                  <p id="research-hint" className="m-0 mt-1 text-[17px] text-muted">
                    This is context, not a requirement. Most fellows have not.
                    It does not affect your chances.
                  </p>
                  <div className="mt-3 flex gap-8">
                    {["Yes", "No"].map((v) => (
                      <label key={v} className="flex min-h-11 cursor-pointer items-center gap-3">
                        <input type="radio" name="research" value={v} aria-invalid={!!errors.research} className="h-5 w-5 accent-crimson" />
                        {v}
                      </label>
                    ))}
                  </div>
                  <ErrorText id="research" error={errors.research} />
                </fieldset>
                <Q id="research_desc" label="If yes, one line on what it was">
                  <input id="research_desc" name="research_desc" className={inputCls} placeholder="Topic or project, one line" />
                </Q>
              </Group>

              <Group title="How you think and work" note="This is what we read most closely.">
                <Q
                  id="prompt"
                  label="Where you live, who gets a good education and who gets left behind? Describe one specific problem like this that you have noticed."
                  required
                  hint="This could be about who can afford school, who lives too far from a good one, who has to work instead, who speaks the wrong language in class, or anything else you have seen. Write in your own voice. There is no right answer and no expected vocabulary. We want to see how you notice a problem and how you think about it."
                  error={errors.prompt}
                >
                  <textarea id="prompt" name="prompt" rows={9} required aria-invalid={!!errors.prompt} aria-describedby="prompt-hint prompt-count prompt-error" className={inputCls + " resize-y"} placeholder="Start here..." />
                  <Count id="prompt" n={counts.prompt} {...LIMITS.prompt} />
                </Q>
                <Q
                  id="datasource"
                  label="How would you try to find out if this is really happening, and how big it is?"
                  required
                  hint="You might look for numbers someone has already collected, like government or school data or a UN report. Or you might describe how you would gather your own, like a survey or interviews. There is no single right source. We want to see how you would start looking."
                  error={errors.datasource}
                >
                  <textarea id="datasource" name="datasource" rows={5} required aria-invalid={!!errors.datasource} aria-describedby="datasource-hint datasource-error" className={inputCls + " resize-y"} placeholder="What you would look at, and why you think it would help." />
                </Q>
                <Q
                  id="completion"
                  label="Tell us about something you started on your own and finished."
                  required
                  hint="We want to know that you finish what you start. Tell us about something you set out to do and saw through to the end: a project, a goal, something you taught yourself, something you built or fixed or organized. What made it hard, and how did you get it done?"
                  error={errors.completion}
                >
                  <textarea id="completion" name="completion" rows={6} required aria-invalid={!!errors.completion} aria-describedby="completion-hint completion-count completion-error" className={inputCls + " resize-y"} placeholder="What you set out to do, and how you saw it through." />
                  <Count id="completion" n={counts.completion} {...LIMITS.completion} />
                </Q>
              </Group>

              <Group title="One last thing">
                <Q id="referral" label="How did you hear about Atlas?">
                  <select id="referral" name="referral" defaultValue="" className={inputCls}>
                    <option value="">Select one</option>
                    {REFERRALS.map((r) => <option key={r}>{r}</option>)}
                  </select>
                </Q>
                <div hidden={referral !== "Other"}>
                  <Q id="referral_other" label="Tell us where">
                    <input id="referral_other" name="referral_other" className={inputCls} placeholder="Where you heard about us" />
                  </Q>
                </div>
              </Group>

              <div className="grid gap-5 border-t border-rule pt-8">
                <div>
                  <label className="flex cursor-pointer items-start gap-3">
                    <input type="checkbox" name="agree" aria-invalid={!!errors.agree} aria-describedby="agree-error" className="mt-1.5 h-5 w-5 shrink-0 accent-crimson" />
                    <span>
                      I agree to the Atlas{" "}
                      <Link to="/privacy" target="_blank" className="link py-[9px]">
                        privacy policy
                      </Link>
                      . <Req required />
                      <span className="block text-[17px] text-muted">
                        Your information is used only to run the fellowship.
                      </span>
                    </span>
                  </label>
                  <ErrorText id="agree" error={errors.agree} />
                </div>
                <label className="flex cursor-pointer items-start gap-3">
                  <input type="checkbox" name="consent" className="mt-1.5 h-5 w-5 shrink-0 accent-crimson" />
                  <span>
                    Yes, keep me in the loop. <Req />
                    <span className="block text-[17px] text-muted">
                      Get invitations to live sessions with researchers, and
                      first notice when the next cohort opens.
                    </span>
                  </span>
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={state === "sending"}
                  className="rounded bg-crimson px-7 py-[15px] text-[18px] font-semibold text-white hover:bg-crimson-hover transition-colors disabled:opacity-60"
                >
                  {state === "sending" ? "Submitting..." : "Submit application"}
                </button>
                {errorCount > 0 && (
                  <p role="alert" className="m-0 mt-4 text-[17px] text-crimson">
                    {errorCount === 1
                      ? "One answer needs attention. It is marked above."
                      : `${errorCount} answers need attention. They are marked above.`}
                  </p>
                )}
                {state === "error" && (
                  <p role="alert" className="m-0 mt-4 text-[17px] text-crimson">
                    Something went wrong. Please try again, or email{" "}
                    {CONTACT_EMAIL}.
                  </p>
                )}
              </div>
            </form>
          </>
        )}
      </section>
    </div>
  );
}

function Group({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <fieldset className="m-0 grid gap-8 border-0 p-0">
      <legend className="mb-6 w-full border-b border-rule p-0 pb-3">
        <span className="text-[24px] font-semibold leading-[1.25] text-navy">{title}</span>
        {note && <span className="block text-[17px] italic text-muted">{note}</span>}
      </legend>
      {children}
    </fieldset>
  );
}

function Req({ required = false }: { required?: boolean }) {
  return (
    <span className="ml-1 text-[15px] font-normal italic text-muted">
      {required ? "required" : "optional"}
    </span>
  );
}

function ErrorText({ id, error }: { id: string; error?: string }) {
  return (
    <p id={`${id}-error`} className="m-0 mt-2 text-[17px] text-crimson" hidden={!error}>
      {error}
    </p>
  );
}

function Q({
  id,
  label,
  required = false,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block font-semibold leading-[1.45] text-navy">
        {label} <Req required={required} />
      </label>
      {hint && (
        <p id={`${id}-hint`} className="m-0 mt-1 text-[17px] text-muted">
          {hint}
        </p>
      )}
      <div className="mt-3">{children}</div>
      <ErrorText id={id} error={error} />
    </div>
  );
}

function Count({ id, n, min, max }: { id: string; n: number; min: number; max: number }) {
  const over = n > max;
  return (
    <p id={`${id}-count`} className="m-0 mt-2 text-[16px] italic text-muted">
      {n} {n === 1 ? "word" : "words"}. {min} to {max} words.
      {over && (
        <span className="text-crimson">
          {" "}
          Over {max} words. Try to tighten it, but you can still submit.
        </span>
      )}
    </p>
  );
}
