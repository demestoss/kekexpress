const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    server: "./src/index.js",
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "bundle.js",
  },
  target: "node",
};
