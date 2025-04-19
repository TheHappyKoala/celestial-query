import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";

const baseConfig = {
  languageOptions: {
    parser: tsParser,
    globals: globals.node,
  },
  plugins: {
    "@typescript-eslint": tseslint,
    prettier: prettierPlugin,
  },
  rules: {
    ...pluginJs.configs.recommended.rules,
    ...tseslint.configs.recommended.rules,
    "prettier/prettier": "error",
  },
};

export default [
  {
    ...baseConfig,
    files: ["**/*.{js,mjs,cjs,ts}"],
  },
  {
    ...baseConfig,
    files: ["tests/**/*"],
    languageOptions: {
      ...baseConfig.languageOptions,
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
  },
];
