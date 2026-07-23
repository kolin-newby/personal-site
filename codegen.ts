import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:3000/api/graphql",
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
