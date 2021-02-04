const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/index.js',
  output: {
    path: __dirname,
    filename: './public/bundle.js',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
      { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [new HtmlWebpackPlugin({ template: './public/index.html' })],
};
