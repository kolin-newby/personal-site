import React from "react";
import ReactDOM from "react-dom/client";
import {
  QueryClient,
  QueryClientProvider,
  hydrate
} from "@tanstack/react-query";
import "./index.css";
import App from "./App";

const queryClient = new QueryClient();

const container = document.getElementById("root")!;
// Written by scripts/prerender.js. Missing in dev, or when the build couldn't
// reach the API.
const siteData = document.getElementById("site-data");

const app = (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);

if (siteData?.textContent && container.hasChildNodes()) {
  // The prerendered data is from the last build, so it's stale straight away
  // and gets refetched on mount.
  hydrate(queryClient, JSON.parse(siteData.textContent));
  ReactDOM.hydrateRoot(container, app);
} else {
  ReactDOM.createRoot(container).render(app);
}
