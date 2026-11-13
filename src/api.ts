import { print, type GraphQLFormattedError } from "graphql";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";

type GraphQLResponse<TResult> = {
  data?: TResult | null;
  errors?: readonly GraphQLFormattedError[];
};

export class GraphQLRequestError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly errors: readonly GraphQLFormattedError[] = [],
  ) {
    super(message);
    this.name = "GraphQLRequestError";
  }
}

export type GraphQLClient = {
  request<TResult, TVariables>(
    document: TypedDocumentNode<TResult, TVariables>,
    variables?: TVariables,
  ): Promise<TResult>;
};

// A minimal client over fetch: POSTs the operation and returns `data`, or
// throws if the response isn't OK or carries any GraphQL errors.
export const createClient = (endpoint: string): GraphQLClient => ({
  async request(document, variables) {
    const res = await fetch(endpoint, {
      method: "POST",
      credentials: "omit",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/graphql-response+json, application/json",
      },
      body: JSON.stringify({ query: print(document), variables }),
    });

    let body: GraphQLResponse<never>;
    try {
      body = await res.json();
    } catch {
      throw new GraphQLRequestError(
        `GraphQL request failed: ${res.status} ${res.statusText}`,
        res.status,
      );
    }

    if (!res.ok || body.errors?.length || body.data == null) {
      const detail = body.errors?.map((e) => e.message).join("; ");
      throw new GraphQLRequestError(
        `GraphQL request failed: ${detail || `${res.status} ${res.statusText}`}`,
        res.status,
        body.errors,
      );
    }

    return body.data;
  },
});

let browserClient: GraphQLClient | undefined;

// Created on first use rather than at load, so this module can also be
// imported while prerendering, where there's no window.
export const getClient = () =>
  (browserClient ??= createClient(
    new URL(import.meta.env.VITE_API_URL, window.location.origin).toString(),
  ));
