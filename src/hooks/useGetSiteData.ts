import { useQuery } from "@tanstack/react-query";

import { client } from "@/api";
import { GetSiteDataDocument } from "@/generated/graphql";

const fetchSiteData = async () => {
  return await client.request(GetSiteDataDocument);
};

export const useGetSiteData = () => {
  return useQuery({ queryKey: ["siteData"], queryFn: fetchSiteData });
};
