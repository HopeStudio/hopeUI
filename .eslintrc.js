module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "no-param-reassign": [2, { "props": false }],
    "react/forbid-prop-types": [1, { "forbid": ["array"] }],
    "react/prop-types": [1, { "ignore": ["className", "id"] }],
  },
  "env": {
    "browser": true,
    "jest": true
  }
};