import { GraphQLClient } from "graphql-request";

export const createClient = (endpoint: string) =>
  new GraphQLClient(endpoint, {
    credentials: "omit",
  });

let browserClient: GraphQLClient | undefined;

// Created on first use rather than at load, so this module can also be
// imported while prerendering, where there's no window.
export const getClient = () =>
  (browserClient ??= createClient(
    new URL(import.meta.env.VITE_API_URL, window.location.origin).toString(),
  ));
