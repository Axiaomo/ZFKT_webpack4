let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin")
let webpack = require("webpack");
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devServer:{
    port:3000,
    open:true,
    contentBase:"./dist"
  },
  module: {
    noParse: /jquery/, //不去解析jquery 的依赖
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/, //排除 不找node_modules
      include: path.resolve("src"), //包含
      use: {
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
            "@babel/preset-react"
          ]
        }
      }
    }]
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    // 清单找不到，再打包react 和react-dom，但是在html中需要写死链接
    new webpack.DllReferencePlugin({
      manifest:path.resolve(__dirname,"dist","mainfest.json")
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
    new webpack.IgnorePlugin(/\.\/locale/, /moment/)
  ]
}