module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "rules": {
    "no-console": 0,
    "react/jsx-filename-extension": [1, {
      "extensions": [".js", ".jsx"]
    }],
    "import/no-extraneous-dependencies": 0,
    "import/no-unresolved": [2,{ "ignore": ["jQuery", "react", "react-dom"] }],
    "no-param-reassign": [2, {"props": false}]
  },
  "env": {
    "browser": true,
  }
};