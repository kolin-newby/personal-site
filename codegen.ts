import type { CodegenConfig } from "@graphql-codegen/cli";

// Same variable as `npm run dev:prod` and the prerender: set it to read the
// schema from another API origin instead of a locally running one.
const apiOrigin = process.env.API_PROXY_TARGET || "http://localhost:3000";

const config: CodegenConfig = {
  schema: `${apiOrigin}/api/graphql`,
  documents: ["src/**/*.ts", "src/**/*.tsx", "src/**/*.graphql"],
  generates: {
    "src/generated/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typed-document-node",
      ],
      config: {
        useTypeImports: true,
      },
    },
  },
};

export default config;
