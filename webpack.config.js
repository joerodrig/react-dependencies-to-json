const webpackage = require('webpack');

const config = {
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ],
  }
};
