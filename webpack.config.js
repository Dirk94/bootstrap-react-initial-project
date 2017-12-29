const path = require('path');
const webpack = require('webpack');

// Use the provide plugin to provide dependencies to the global scope.
// jQuery and Popper are needed globally for bootstrap v4.
const ProvidePluginConfig = new webpack.ProvidePlugin({
     $: "jquery",
     jQuery: "jquery",
     Popper: "popper.js",
 });

// Use the extract text plugin to search for all .scss files instead of
// using the webpack dependency graph.
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtractTextPluginConfig = new ExtractTextPlugin({
    filename: 'app.css',
    allChunks: true,
});

// Automatically copy the views/index.html to the public/index.html and
// inject the javascript and css files.
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './app/views/index.html',
  filename: 'index.html',
  css: 'app.css',
  inject: 'body'
});

// Copy the static directory to the public directory.
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CopyWebpackPluginConfig = new CopyWebpackPlugin([
  {
    from: 'app/static'
  }
]);

// Uglify the bundles and reduce the file sizes.
UglifyJsPluginConfig = new webpack.optimize.UglifyJsPlugin({
  compress: { warnings: false },
});

module.exports = {
  // Generate a depency graph for both the javascript and sass files.
  entry: ['./app/js/index.js', './app/scss/index.scss'],

  // When running webpack keep watching for file changes.
  watch: true,

  output: {
    path: path.resolve('public'),
    filename: 'app.js'
  },

  module: {
    loaders: [

      // Pack all the sass and css files.
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  minimize: true,
                },
              },
              {
                loader: 'sass-loader',
                options: {
                  minimize: true,
                },
              },
            ]
        }),
      },

      // Transpile ES6 to ES5 using Babel
      {
        test: [/\.js$/, /\.jsx$/],
        loader: 'babel-loader',
        exclude: /node_modules/
      },
    ]
  },
  plugins: [
    ProvidePluginConfig,
    ExtractTextPluginConfig,
    HtmlWebpackPluginConfig,
    CopyWebpackPluginConfig,
    UglifyJsPluginConfig,
  ]
}
