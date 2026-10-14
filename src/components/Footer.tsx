import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedin, FaTiktok, FaYoutube } from "react-icons/fa6";
import { CONTACT_EMAIL } from "@/lib/dates";

const INSTAGRAM_URL = "https://www.instagram.com/research.atlas/";
const LINKEDIN_URL = "https://www.linkedin.com/company/atlas-research-institute";
const TIKTOK_URL = "https://www.tiktok.com/@research_atlas";
const YOUTUBE_URL = "https://www.youtube.com/@atlas-research";

const linkCls =
  "py-3 text-muted underline underline-offset-4 hover:text-crimson transition-colors";

/** Sitewide footer. No donate link and no donate page in this build. */
export function Footer() {
  return (
    <footer className="bg-paper border-t border-rule">
      <div className="mx-auto max-w-[1200px] px-6 py-7 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 text-[16px] leading-[1.65] text-muted">
        <div className="py-3">Atlas Research Institute</div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
          <Link to="/about" className={linkCls}>
            About
          </Link>
          <Link to="/journal" className={linkCls}>
            Journal
          </Link>
          <Link to="/get-involved" className={linkCls}>
            Get Involved
          </Link>
          <Link to="/privacy" className={linkCls}>
            Privacy
          </Link>
          <a href={`mailto:${CONTACT_EMAIL}`} className={linkCls}>
            {CONTACT_EMAIL}
          </a>
          <span className="flex items-center gap-1">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Atlas on Instagram"
              className="inline-flex h-11 w-11 items-center justify-center text-muted hover:text-crimson transition-colors"
            >
              <FaInstagram aria-hidden size={22} />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Atlas on LinkedIn"
              className="inline-flex h-11 w-11 items-center justify-center text-muted hover:text-crimson transition-colors"
            >
              <FaLinkedin aria-hidden size={22} />
            </a>
            <a
              href={TIKTOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Atlas on TikTok"
              className="inline-flex h-11 w-11 items-center justify-center text-muted hover:text-crimson transition-colors"
            >
              <FaTiktok aria-hidden size={22} />
            </a>
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Atlas on YouTube"
              className="inline-flex h-11 w-11 items-center justify-center text-muted hover:text-crimson transition-colors"
            >
              <FaYoutube aria-hidden size={22} />
            </a>
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-6 pb-8">
        {/*
          Exact required wording. The parent entity is deliberately NOT named.
          Do not reintroduce a company name, an EIN, "501(c)(3)", or
          "tax deductible" here.
        */}
        <p className="text-[14px] leading-relaxed max-w-2xl text-muted">
          Atlas Research Institute operates as a project of a California
          nonprofit public benefit corporation. For more information contact{" "}
          {/* Plain text: the mailto link sits in the row above, at 44px. */}
          {CONTACT_EMAIL}
        </p>
      </div>
    </footer>
  );
}
