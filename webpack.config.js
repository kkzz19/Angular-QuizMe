var debug = process.env.NODE_ENV === "debug";
var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");

var plugins = [
  new HtmlWebpackPlugin({
    template: __dirname + "/app/index.html",
    inject: "body"
  }),
  new CopyWebpackPlugin([{
    from: "img",
    to: "img"
  }])
];

var fileName = "[name].min.js";

//Hide source in production
if(!debug) {
  fileName = "[name].[hash].min.js";
  plugins.push(new webpack.optimize.UglifyJsPlugin({ sourcemap: false }));
}

module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : false,
  entry: "./app/app.js",
  output: {
    path: __dirname + "/docs",
    filename: fileName
  },
  plugins: plugins,
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: "babel-loader"
      },
      {
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader"
      },
    ]
  }
};