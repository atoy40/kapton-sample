var path = require('path');
var webpack = require('webpack');

var plugins = [new webpack.HotModuleReplacementPlugin()];
var entry =  [];

if(process.env.NODE_ENV === "production") {
  plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true, comments: false}));
} else {
  entry.push('webpack-dev-server/client?http://localhost:3000');
  entry.push('webpack/hot/only-dev-server');
}

entry.push('./src/index');

module.exports = {
  devtool: 'eval',
  entry: entry,
  output: {
    libraryTarget: "var",
    library: "Kapton",
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/app/',
  },
  plugins: plugins,
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    }]
  }
};
