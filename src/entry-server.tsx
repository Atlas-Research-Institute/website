import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { AppShell } from "./App";

/**
 * Renders one route to HTML at build time. Used only by the resourcePages
 * plugin in vite.config.ts, which writes the result into #root of the
 * prerendered /resources pages; main.tsx then hydrates it instead of rendering
 * from scratch.
 *
 * Same tree as main.tsx minus <Analytics />, which renders no markup.
 */
export function render(url: string): string {
  return renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <AppShell />
      </StaticRouter>
    </React.StrictMode>
  );
}
