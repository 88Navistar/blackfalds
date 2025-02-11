//skipped reactCompiler
// compare * as tseslint from other project
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
    linterOptions: {
    
  },
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
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "simple-import-sort": simpleImportSort,
      prettier: prettierPlugin,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
];
