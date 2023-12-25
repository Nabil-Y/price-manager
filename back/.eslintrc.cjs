module.exports = {
    "extends": [
      "plugin:adonis/typescriptApp",
      "plugin:prettier/recommended"
    ],
    "plugins": [
      "prettier"
    ],
    "rules": {
      "prettier/prettier": "error",
      "no-console": "error"
    },
    parserOptions: {
      project: 'tsconfig.json',
      tsconfigRootDir: __dirname
   },
   ignorePatterns: "*.cjs"
}