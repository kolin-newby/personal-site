import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig(
  { ignores: ["build", ".react-router", "src/generated"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true }
      ]
    }
  },
  {
    // Route modules (see src/routes.ts). React Router reads these exports
    // and handles them during hot reload, so they're safe next to the
    // component. ErrorBoundary, HydrateFallback and Layout are components,
    // which the rule already allows.
    files: ["src/root.tsx", "src/pages/**/*.tsx"],
    rules: {
      "react-refresh/only-export-components": [
        "warn",
        {
          allowConstantExport: true,
          allowExportNames: [
            "middleware",
            "clientMiddleware",
            "loader",
            "clientLoader",
            "action",
            "clientAction",
            "headers",
            "handle",
            "links",
            "meta",
            "shouldRevalidate"
          ]
        }
      ]
    }
  }
);
