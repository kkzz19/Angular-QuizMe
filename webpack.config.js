var debug = process.env.NODE_ENV === "debug";
var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");

var plugins = [
  new HtmlWebpackPlugin({
    template: __dirname + "/index.html",
    inject: "body"
  }),
  new CopyWebpackPlugin([{
    from: "app/img",
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
    //publicPath: debug ? "" : "/Angular-QuizMe", //Production is for github pages
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
      {
        test: /\.html/,
        loader: "html-loader"
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: "file-loader?name=[path][name].[hash].[ext]"
      }
    ]
  }
};