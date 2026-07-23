import { useQuery } from "@tanstack/react-query";

import { client } from "@/api";
import { GetIntroductionDocument } from "@/generated/graphql";

const fetchIntroduction = async () => {
  return await client.request(GetIntroductionDocument);
};

export const useGetIntroduction = () => {
  return useQuery({ queryKey: ["intro"], queryFn: fetchIntroduction });
};
