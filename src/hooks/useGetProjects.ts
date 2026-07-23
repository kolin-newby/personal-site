import { useQuery } from "@tanstack/react-query";

import { client } from "@/api";
import { GetProjectDisplayDocument } from "@/generated/graphql";

const fetchProjects = async () => {
  return await client.request(GetProjectDisplayDocument);
};

export const useGetProjects = () => {
  return useQuery({ queryKey: ["projects"], queryFn: fetchProjects });
};
