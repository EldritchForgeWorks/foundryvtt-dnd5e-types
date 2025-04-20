import { defineConfig, globalIgnores } from "eslint/config";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import stylisticPlugin from "@stylistic/eslint-plugin";
import prettierConfig from "eslint-config-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default defineConfig([globalIgnores([
    "**/dist/",
    "**/node_modules/",
    "**/docs/",
    "**/*.js",
    "**/dist/",
    "**/docs/",
    "**/node_modules/",
    "**/scripts/",
    "**/examples/",
    "**/tmp/",
    "**/dnd5e-analysis.json",
    "**/*.config.js",
    "**/commitlint.config.js",
]), {
    extends: compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended"),

    plugins: {
        "@typescript-eslint": typescriptEslint,
        "@stylistic": stylisticPlugin,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
        },

        parser: tsParser,
    },

    rules: {
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-explicit-any": "warn",

        "@typescript-eslint/no-unused-vars": ["warn", {
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^_",
        }],

        "@typescript-eslint/ban-ts-comment": "warn",
        "no-console": "off",
        "no-debugger": "warn",
        "no-duplicate-case": "error",
        "no-empty": "warn",
        "no-extra-semi": "warn",
        "no-irregular-whitespace": "warn",

        // Note: Most stylistic rules are handled by Prettier
        // We only keep rules that don't conflict with Prettier
    },
}, {
    files: ["**/*.d.ts"],

    rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/triple-slash-reference": "off",
    },
}, {
    // Configuration specific to test files
    files: ["**/*.test.ts", "**/*.spec.ts", "**/tests/**/*.ts"],
    rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
    },
}, {
    // Configuration specific to scripts
    files: ["scripts/**/*.js", "scripts/**/*.ts"],
    rules: {
        "no-console": "off",
        "@typescript-eslint/no-var-requires": "off",
    },
},
// Add Prettier config last to override conflicting rules
prettierConfig]);
