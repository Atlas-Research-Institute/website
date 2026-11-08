/**
 * Cloudflare Web Analytics: cookieless page view counts.
 *
 * PASTE THE TOKEN HERE. Cloudflare dashboard → Web Analytics → Add a site →
 * hostname atlas-research.org → Done → Manage site. The JS snippet there
 * contains data-cf-beacon='{"token": "…"}'. Copy only the token value into
 * CLOUDFLARE_WEB_ANALYTICS_TOKEN below. Do not paste the whole snippet
 * anywhere; this file adds the script itself.
 *
 * Until a real token is in place nothing loads, so the placeholder never sends
 * a request.
 *
 * SINGLE-PAGE APP. "spa": true (Cloudflare's default, set explicitly here) makes
 * the beacon count every in-app route change, through the Navigation API where
 * the browser has it and by watching history.pushState and popstate otherwise.
 * Every page change in this app goes through React Router, which uses
 * pushState, so each one is counted as a page view.
 *
 * NOT COUNTED: localhost and other non-production hosts, so local previews do
 * not pollute the numbers.
 *
 * Cloudflare Web Analytics has no custom events and drops query strings, so it
 * cannot count button clicks or UTM parameters. See ResourceCtas.tsx.
 *
 * It runs alongside Vercel Web Analytics (main.tsx). Both are described on
 * /privacy; if either is removed, update src/pages/Privacy.tsx in the same
 * change.
 */
const PLACEHOLDER = "PASTE_CLOUDFLARE_TOKEN_HERE";
const CLOUDFLARE_WEB_ANALYTICS_TOKEN: string = "69b5b0225845418aaa7f8b781389aecd";

const PRODUCTION_HOSTS = ["atlas-research.org", "www.atlas-research.org"];

export function loadCloudflareWebAnalytics() {
  const token = CLOUDFLARE_WEB_ANALYTICS_TOKEN.trim();
  if (!token || token === PLACEHOLDER) return;
  if (!PRODUCTION_HOSTS.includes(window.location.hostname)) return;

  const script = document.createElement("script");
  script.defer = true;
  script.src = "https://static.cloudflareinsights.com/beacon.min.js";
  script.setAttribute(
    "data-cf-beacon",
    JSON.stringify({ token, spa: true })
  );
  document.head.appendChild(script);
}
