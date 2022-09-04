module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json"],
  },
  plugins: ["@typescript-eslint"],
  rules: {
    // Typescriptを使うので
    "react/require-default-props": "off",
    "react/jsx-props-no-spreading": "off",
  },
  overrides: [
    {
      files: ["**/*.stories.tsx"],
      rules: {
        "import/no-extraneous-dependencies": "off",
        "react/function-component-definition": [
          "error",
          {
            namedComponents: "arrow-function",
          },
        ],
      },
    },
  ],
};
