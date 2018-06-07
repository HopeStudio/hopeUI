module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "rules": {
    "react/jsx-filename-extension": [1, {
      "extensions": [".js", ".jsx"]
    }],
    "no-param-reassign": [2, {"props": false}]
  },
  "env": {
    "browser": true,
    "jest": true
  }
};