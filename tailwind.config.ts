import type { Config } from "tailwindcss";

/**
 * Atlas design tokens.
 *
 * One typeface (Source Serif 4, 400-700, roman and italic), a navy and crimson
 * palette, 4px corners. No shadows, no gradients, no all-caps labels.
 *
 * crimson is for buttons and links only. Headings and dark sections are navy;
 * body text is ink.
 *
 * The older tokens (paper, surface, line, ink-hover, faint, alert) are kept so
 * the pages that have not been redesigned still render.
 */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        /** page background */
        paper: "#FFFFFF",
        /** cards, raised surfaces, alternating sections */
        surface: "#F5F5F6",
        /** hairline borders */
        line: "#E4E4E6",
        /** headings and dark sections */
        navy: "#13294B",
        /** buttons and links ONLY */
        crimson: "#8C1D2F",
        /** crimson hover */
        "crimson-hover": "#6A1523",
        /** body text */
        ink: "#1B2433",
        /** lead paragraphs and figcaptions */
        "body-muted": "#39455A",
        /** light sections and cards */
        mist: "#F2F4F7",
        /** hairline borders */
        rule: "#D9DDE3",
        /** borders on navy */
        "navy-border": "#4A6189",
        /** secondary text on navy */
        "on-navy-muted": "#C9D3E3",
        /** primary button hover only */
        "ink-hover": "#26262A",
        /** secondary text, captions, affiliations */
        muted: "#4A5568",
        /** eyebrows, meta labels, tertiary text */
        faint: "#8A8A92",
        /** form errors ONLY. Never decoration, never a status. */
        alert: "#B3402F",
      },
      fontFamily: {
        /** One typeface everywhere. All three names resolve to it. */
        display: ['"Source Serif 4"', "Georgia", "serif"],
        serif: ['"Source Serif 4"', "Georgia", "serif"],
        sans: ['"Source Serif 4"', "Georgia", "serif"],
      },
      letterSpacing: {
        caps: "0.18em",
        meta: "0.14em",
        lockup: "0.22em",
      },
      borderRadius: {
        /** the one corner radius: cards, panels, buttons, inputs */
        card: "4px",
        control: "4px",
        DEFAULT: "4px",
      },
    },
  },
  plugins: [],
} satisfies Config;
