import React from "react";
import { renderToString } from "react-dom/server";
import {
  QueryClient,
  QueryClientProvider,
  dehydrate
} from "@tanstack/react-query";
import { createClient } from "./api";
import { fetchSiteData, siteDataQueryKey } from "./hooks/useGetSiteData";
import App from "./App";

// Run at build time by scripts/prerender.js: fetches the site data from
// `endpoint` and renders the page with it. Returns the page's HTML and the
// query cache, which the browser hydrates from so its first render matches.
export const prerender = async (endpoint: string) => {
  const queryClient = new QueryClient();
  const data = await fetchSiteData(createClient(endpoint));
  queryClient.setQueryData(siteDataQueryKey, data);

  const html = renderToString(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>
  );

  return { html, state: dehydrate(queryClient) };
};
