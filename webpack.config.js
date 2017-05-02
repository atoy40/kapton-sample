var path = require('path');
var webpack = require('webpack');

var plugins = [new webpack.HotModuleReplacementPlugin()];
var entry =  [];
var devtool;
var transform = true;
var loaders = [
  {
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
  },
  {
    test: /\.js$/,
    loader: 'babel-loader',
    include: /node_modules\/kapton/,
    query: { babelrc: false, plugins: [ 'transform-es2015-modules-commonjs' ] },
  },
];

if(process.env.NODE_ENV === "production") {
  devtool = undefined;
  plugins.push(new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }, comments: false}));
  plugins.push(new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }));
  if (transform) {
    loaders = [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules\/(?!kapton)/,
      }
    ];
  }
} else {
  devtool = 'eval';
  entry.push('webpack-dev-server/client?http://localhost:3000');
  entry.push('webpack/hot/only-dev-server');
}

entry.push('./src/index');

module.exports = {
  devtool: devtool,
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
    loaders: loaders
  }
};
