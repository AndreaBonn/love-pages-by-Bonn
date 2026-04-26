import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "script",
      globals: {
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        console: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        performance: "readonly",
        requestAnimationFrame: "readonly",
        btoa: "readonly",
        atob: "readonly",
        HTMLElement: "readonly",
        Image: "readonly",
        FormData: "readonly",
        XMLHttpRequest: "readonly",
        encodeURIComponent: "readonly",
        decodeURIComponent: "readonly",
      },
    },
    rules: {
      "no-unused-vars": ["warn", { vars: "all", args: "none", caughtErrors: "none" }],
      "no-redeclare": "off",
    },
  },
  {
    ignores: ["node_modules/", "scripts/", "eslint.config.mjs"],
  },
];
