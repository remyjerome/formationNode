module.exports = {
  root: true,
  env: {
    node: true,
    "jest/globals": true
  },
  plugins: ["jest"],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    indent: ["error", 2],
    "keyword-spacing": [
      "error",
      {
        after: true,
        before: true
      }
    ],
    "linebreak-style": ["error", "unix"],
    "object-curly-spacing": ["error", "always"],
    quotes: ["error", "single"],
    semi: ["error", "never"]
  }
};
