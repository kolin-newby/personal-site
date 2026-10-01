import { useQuery } from "@tanstack/react-query";
import type { GraphQLClient } from "graphql-request";

import { getClient } from "@/api";
import { GetSiteDataDocument } from "@/generated/graphql";

// Shared with the prerender, which fills the cache under this key.
export const siteDataQueryKey = ["siteData"];

export const fetchSiteData = async (client: GraphQLClient = getClient()) => {
  return await client.request(GetSiteDataDocument);
};

export const useGetSiteData = () => {
  return useQuery({
    queryKey: siteDataQueryKey,
    queryFn: () => fetchSiteData()
  });
};
