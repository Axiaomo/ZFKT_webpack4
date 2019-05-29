let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin")
let webpack = require("webpack");
// let Happypack = require("happypack");
module.exports = {
  // 代码抽离
  // optimization:{
  //   splitChunks:{//分割代码块
  //   cacheGroups:{//缓存组
  //   common:{//公共模块
  //   chunks:"initial",
  //   minSize:0, //大于0字节分离
  //   minChunks:2//使用两次分离
  //   },
  //   vendor:{
  //   priotity:1, //权重，先抽离第三方模块
  //   test:/node_modules/, //引用了node_modules文件，抽离出来
  //   chunks:"initial",
  //   minSize:0, //大于0字节分离
  //   minChunks:2//使用两次分离
  //   }
  //   }
  //   }
  //   },
  mode: "development",
  entry: "./src/index.js",
  // entry:{
  //   index:"./src/index.js",
  //   other:"./src/other.js",
  // },
  devServer:{
    hot:true,// 启用热更新
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
          ],
          plugins:[
            "@babel/plugin-syntax-dynamic-import"
          ]
        }
      }
      // use:"Happypack/;oader?id=js"
    }]
  },
  output: {
    filename: "bundle.js",
    // filename: "[name].js",
    // path: path.resolve(__dirname, "dist")
  },
  plugins: [
    // 多线程打包
    // new Happypack({
    //   id:"js",
    //   use:[{
    //       loader: "babel-loader",
    //     options: {
    //       presets: [
    //         "@babel/preset-env",
    //         "@babel/preset-react"
    //       ]
    //     }
    //   }]
    // }),
    // 清单找不到，再打包react 和react-dom，但是在html中需要写死链接
    // new webpack.DllReferencePlugin({
    //   manifest:path.resolve(__dirname,"dist","mainfest.json")
    // }),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
    new webpack.IgnorePlugin(/\.\/locale/, /moment/),
    new webpack.NamedModulesPlugin(),//打印更新的模块路径
    new webpack.HotModuleReplacementPlugin()//热更新插件
  ]
}