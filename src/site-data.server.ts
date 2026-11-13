/// <reference types="node" />
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { createClient } from "@/api";
import { fetchSiteData, siteDataQueryKey } from "@/hooks/useGetSiteData";

// VITE_API_URL is relative in .env (the browser resolves it against the
// page). Here it's resolved against the API origin, falling back to Netlify's
// URL for the site itself, which proxies the API in production.
const siteDataEndpoint = () =>
  new URL(
    import.meta.env.VITE_API_URL,
    process.env.API_PROXY_TARGET || process.env.URL || "http://localhost:3000"
  ).toString();

// Called by the root loader, which runs at build time for every prerendered
// path (and on each request under `react-router dev`). Returns the query cache
// for the browser to hydrate from, so its first render matches the HTML.
export const getDehydratedSiteData = async () => {
  const endpoint = siteDataEndpoint();
  const queryClient = new QueryClient();

  try {
    // fetchQuery, unlike prefetchQuery, throws when the request fails.
    await queryClient.fetchQuery({
      queryKey: siteDataQueryKey,
      queryFn: () => fetchSiteData(createClient(endpoint))
    });
  } catch (error) {
    // Failing the deploy keeps the last good version live. Locally the pages
    // still work without the data (they fetch it in the browser), so just
    // say so.
    if (process.env.CI || process.env.NETLIFY) {
      console.error(`Prerender failed fetching ${endpoint}`);
      throw error;
    }
    console.warn(
      `Rendering without site data - couldn't fetch it from ${endpoint}.\n` +
        "Set API_PROXY_TARGET to the API origin to prerender with it.\n",
      error instanceof Error ? error.message : error
    );
    return null;
  }

  return dehydrate(queryClient);
};
