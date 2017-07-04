// Karma configuration
module.exports = function(config) {
  config.set({
    // ... normal karma configuration
    files: [
      // all files ending in ".spec.js"
      {pattern: './spec.js', watched: false}
      // each file acts as entry point for the webpack configuration
    ],

    preprocessors: {
      // add webpack as preprocessor
      './spec.js': ['webpack']
    },

    frameworks: ["jasmine"],

    webpack: {
      // karma watches the test entry points
      // (you don't need to specify the entry option)
      // webpack watches dependencies

      // webpack configuration
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
    },

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      stats: 'errors-only'
    }
  });
};