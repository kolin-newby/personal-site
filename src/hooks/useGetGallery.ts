import { useQuery } from "@tanstack/react-query";

import { client } from "@/api";
import { GetGalleryDocument } from "@/generated/graphql";

const fetchGallery = async () => {
  return await client.request(GetGalleryDocument);
};

export const useGetGallery = () => {
  return useQuery({ queryKey: ["gallery"], queryFn: fetchGallery });
};
