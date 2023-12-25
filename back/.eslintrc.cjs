module.exports = {
    "extends": [
      "plugin:adonis/typescriptApp",
      "plugin:prettier/recommended"
    ],
    "rules": {
      "prettier/prettier": "error",
      "no-console": "error"
    },
    parserOptions: {
      project: 'tsconfig.json',
      tsconfigRootDir: __dirname,
      extraFileExtensions: [''],
   },
   ignorePatterns: "*.cjs"
}