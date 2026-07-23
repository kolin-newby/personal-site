import { useQuery } from "@tanstack/react-query";

import { client } from "@/api";
import { GetPersonalLinkListDocument } from "@/generated/graphql";

const fetchPersonalLinkList = async () => {
  return await client.request(GetPersonalLinkListDocument);
};

export const useGetPersonalLinkList = () => {
  return useQuery({
    queryKey: ["personalLinkList"],
    queryFn: fetchPersonalLinkList,
  });
};
