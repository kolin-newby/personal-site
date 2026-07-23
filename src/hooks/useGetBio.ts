import { useQuery } from "@tanstack/react-query";

import { client } from "@/api";
import { GetBioDocument } from "@/generated/graphql";

const fetchBio = async () => {
  return await client.request(GetBioDocument);
};

export const useGetBio = () => {
  return useQuery({ queryKey: ["bio"], queryFn: fetchBio });
};
