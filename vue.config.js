const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");
const path = require("path");
const deps = require("./package.json");

const version = "1.0.0";
const name = "seventh_floor";

module.exports = defineConfig({
  outputDir: path.resolve(__dirname, `./dist/${name}_${version}`),
  devServer: {
    /**
     * * Порт локальной разработки текущего приложения
     */
    port: 1000,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
    historyApiFallback: true,
  },
  pages: {
    index: {
      entry: "./src/index.ts",
    },
  },
  /**
   * TODO: Поменять на 'auto'
   */
  publicPath: "/",
  configureWebpack: {
    devServer: {
      hot: false,
    },
    optimization: {
      splitChunks: false,
      runtimeChunk: false,
    },
    plugins: [
      new webpack.container.ModuleFederationPlugin({
        name,
      }),
    ],
  },
  transpileDependencies: false,
});
