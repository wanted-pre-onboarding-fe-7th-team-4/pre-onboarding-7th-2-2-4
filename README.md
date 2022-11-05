# TypeScript Vite with husky

## 설치

```shell
yarn install
```

## 실행

```shell
yarn start
```

## husky script

- ### pre-commit
  commit 전에 prettier 적용
- ### pre-push
  git push전에 eslint 검사

## prettier 설정

```json
// .prettierrc
{
  "trailingComma": "none",
  "tabWidth": 2,
  "semi": true,
  "singleQuote": false,
  "arrowParens": "always",
  "printWidth": 80
}
```

## eslint 설정

```js
// .eslintrc.cjs
module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  rules: {
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": ["error", { varsIgnorePattern: "_" }],
    "react/react-in-jsx-scope": "off",
    "no-var": "error",
    "no-multiple-empty-lines": "error",
    "no-console": ["warn", { allow: ["warn", "error", "info"] }],
    eqeqeq: "error",
    "dot-notation": "warn",
    "no-unused-vars": "off",
    quotes: ["error", "double"],
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto"
      }
    ]
  }
};
```

## 절대경로 설정

### tsconfig.json

```json
"baseUrl": ".",
    "paths": {
      "@/*": [
        "src/*"
      ],
      "@components/*": ["src/components/*"]
    }
```

### vite.config.ts

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      { find: "@", replacement: resolve(__dirname, "src") },
      {
        find: "@components",
        replacement: resolve(__dirname, "src/components")
      }
    ]
  },

  plugins: [react(), tsconfigPaths()]
});
```
