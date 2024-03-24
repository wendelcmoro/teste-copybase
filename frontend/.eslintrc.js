module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:vue/base",
    "plugin:vuetify/base",
    "@vue/prettier",
  ],
  parserOptions: {
    parser: "@babel/eslint-parser",
    requireConfigFile: false,
  },
};
