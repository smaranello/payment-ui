const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: "./src/index.jsx",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isProduction ? "bundle.[contenthash].js" : "bundle.js",
      publicPath: "/",
      clean: true,
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: "asset/resource",
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
    ],
    devtool: isProduction ? "source-map" : "eval-source-map",
    devServer: {
      port: 3001,
      hot: true,
      historyApiFallback: true,
    },
  };
};
