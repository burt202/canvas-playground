import eslintJs from "@eslint/js"
import globals from "globals"
import tsEslint from "typescript-eslint"
import simpleImportSort from "eslint-plugin-simple-import-sort"
import importPlugin from "eslint-plugin-import"

export default [
  {
    ignores: [
      "build/",
      "eslint.config.mjs",
      "lint-staged.config.mjs",
      "prettier.config.mjs",
    ],
  },
  {
    languageOptions: {
      parser: tsEslint.parser,
      ecmaVersion: 2023,
      sourceType: "script",
      parserOptions: {
        project: "./tsconfig.json",
      },
      globals: {...globals.browser, ...globals.node},
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  eslintJs.configs.recommended,
  ...tsEslint.configs.recommended,
  ...tsEslint.configs.recommendedTypeChecked,
  importPlugin.flatConfigs.recommended,
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      eqeqeq: "error",
      complexity: ["error", {max: 10}],
      "object-shorthand": "error",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
        },
      ],
      "simple-import-sort/imports": "error",
      "import/no-unresolved": "off",
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
    },
  },
]
