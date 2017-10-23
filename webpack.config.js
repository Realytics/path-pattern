var path = require('path');
var webpack = require('webpack');
var process = require('process');

var env = process.env.NODE_ENV;

var config = {
  context: __dirname,
  target: 'web',
  name: 'path-pattern',
  entry: './src/index.ts',

  output: {
    library: 'PathPattern',
    libraryTarget: 'umd',
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },

  plugins: [new webpack.optimize.OccurrenceOrderPlugin()],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        include: path.join(__dirname, 'src'),
        options: {
          configFile: 'tsconfig.json',
          silent: false,
        },
      },
      {
        test: /\.tsx?$/,
        loader: 'tslint-loader',
        include: path.join(__dirname, 'src'),
        enforce: 'pre',
      },
    ],
  },

  externals: {
    'path-to-regexp': {
      root: 'PathToRegexp',
      commonjs2: 'path-to-regexp',
      commonjs: 'path-to-regexp',
      amd: 'path-to-regexp',
    },
  },
};

if ('production' === env) {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false,
        screw_ie8: false,
      },
      mangle: {
        screw_ie8: false,
      },
      output: {
        screw_ie8: false,
      },
    })
  );
}

module.exports = config;
