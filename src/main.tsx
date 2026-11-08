import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Analytics } from "@vercel/analytics/react";
import { loadCloudflareWebAnalytics } from "./lib/analytics";
import "./index.css";

/**
 * Two analytics tools, both cookieless: Vercel Web Analytics (below) and
 * Cloudflare Web Analytics (src/lib/analytics.ts, inactive until its token is
 * pasted in).
 *
 * Neither sets a cookie, stores a persistent identifier, or tracks across
 * sites. The privacy policy at /privacy describes them in exactly those terms —
 * if either is removed or another analytics provider added, update
 * src/pages/Privacy.tsx in the same change.
 */
loadCloudflareWebAnalytics();

const app = (
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>
);

/**
 * /resources and every Resources post arrive with their HTML already in #root
 * (prerendered by vite.config.ts), marked with the path it was rendered for.
 * Hydrate that rather than rebuild it. If the URL is not exactly that path,
 * say /resources?category=guide, the markup is for a different view, so start
 * clean instead of hydrating a mismatch.
 */
const root = document.getElementById("root")!;
const prerendered = root.dataset.prerendered;
const here = window.location.pathname.replace(/\/$/, "") || "/";
if (prerendered && prerendered === here && !window.location.search) {
  ReactDOM.hydrateRoot(root, app);
} else {
  root.replaceChildren();
  ReactDOM.createRoot(root).render(app);
}
