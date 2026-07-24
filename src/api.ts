import { GraphQLClient } from "graphql-request";

const endpoint = new URL(
  import.meta.env.VITE_API_URL,
  window.location.origin,
).toString();

export const client = new GraphQLClient(endpoint, {
  credentials: "omit",
});
