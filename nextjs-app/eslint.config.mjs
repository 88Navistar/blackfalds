//skipped reactCompiler
// compare * as tseslint from other project
// Did not use nextPlugin as it's pre loaded
// Did not use reactHooks
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tseslint from "@typescript-eslint/eslint-plugin";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import prettierPlugin from "eslint-plugin-prettier";
export default [
  js.configs.recommended,
  // Next.js's ESLint configuration is automatically loaded
  {
    ignores: ["**/node_modules/**", ".next/**", "dist/**", "./sanity.types.ts"],
    linterOptions: {},
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        React: true,
        JSX: true,
        URL: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "simple-import-sort": simpleImportSort,
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "no-console": "off",
      "no-unused-vars": "warn",
      "no-undef": "warn",
      "no-undef-init": "warn",
      "no-unused-expressions": "warn",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
