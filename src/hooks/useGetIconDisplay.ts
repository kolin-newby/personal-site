import { useQuery } from "@tanstack/react-query";

import { client } from "@/api";
import { GetIconDisplayDocument } from "@/generated/graphql";

const fetchIconDisplay = async () => {
  return await client.request(GetIconDisplayDocument);
};

export const useGetIconDisplay = () => {
  return useQuery({ queryKey: ["iconDisplay"], queryFn: fetchIconDisplay });
};
