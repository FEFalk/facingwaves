module.exports = {
  singleQuote: true,
  printWidth: 120,
  endOfLine: "auto",
  overrides: [
    {
      files: '*.scss',
      options: {
        singleQuote: false,
      },
    },
  ],
};
