module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    "flowtype/require-valid-file-annotation": [
      2,
      "always", {
        "annotationStyle": "block",
        "strict": true,
      }
    ]
  }
};
