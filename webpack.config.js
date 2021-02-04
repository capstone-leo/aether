const webpack = require('webpack');

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
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      API_KEY: '',
      AUTH_DOMAIN: '',
      projectId: '',
      STORAGE_BUCKET: '',
      MESSAGING_SENDER_ID: '',
      APP_ID: '',
      MEASUREMENT_ID: '',
    }),
  ],
};
