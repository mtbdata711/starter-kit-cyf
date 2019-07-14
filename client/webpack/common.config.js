const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./client/src/index.js",
  output:{
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader?cacheDirectory",
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        loader: "file-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
  historyApiFallback: true,
},
  plugins: [
    new HtmlWebpackPlugin({
      favicon: "./client/src/favicon.ico",
      template: "./client/src/index.html",
    }),
  ],
};
