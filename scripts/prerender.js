// Fills dist/index.html with the rendered page and the data it was rendered
// from, so crawlers and link previews get real content without running JS.
// Runs after both the client build (dist/) and the SSR build (dist-server/).
import { readFile, writeFile } from "node:fs/promises";
import { loadEnv } from "vite";

const htmlPath = "dist/index.html";

const env = { ...loadEnv("production", process.cwd(), ""), ...process.env };

// VITE_API_URL is relative in .env (the browser resolves it against the
// page). Here it's resolved against the API origin, falling back to Netlify's
// URL for the site itself, which proxies the API in production.
const endpoint = new URL(
  env.VITE_API_URL,
  env.API_PROXY_TARGET || env.URL || "http://localhost:3000"
).toString();

const { prerender } = await import("../dist-server/entry-server.js");

let result;
try {
  result = await prerender(endpoint);
} catch (error) {
  // Failing the deploy keeps the last good version live. Locally the
  // client-only page still works, so just say so.
  if (env.CI || env.NETLIFY) {
    console.error(`Prerender failed fetching ${endpoint}`);
    throw error;
  }
  console.warn(
    `Skipping prerender - couldn't fetch site data from ${endpoint}.\n` +
      "Set API_PROXY_TARGET to the API origin to prerender locally.\n",
    error.message
  );
  process.exit(0);
}

// Escaping "<" keeps any "</script>" in the data from closing the tag early.
const state = JSON.stringify(result.state).replace(/</g, "\\u003c");

const template = await readFile(htmlPath, "utf8");
const html = template
  .replace("<!--app-html-->", () => result.html)
  .replace(
    "<!--site-data-->",
    () => `<script id="site-data" type="application/json">${state}</script>`
  );

await writeFile(htmlPath, html);
console.log(`Prerendered ${htmlPath} from ${endpoint}`);
