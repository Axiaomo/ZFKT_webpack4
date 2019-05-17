let path = require("path");
let HtmlWebapckPlugin = require("html-webpack-plugin");
/* 抽离css */
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
module.exports = {
  optimization: {
    // 优化项
    minimizer: [
      new TerserJSPlugin({}),
      new OptimizeCSSAssetsPlugin()
    ],
  },
  /* 开发服务器配置 */
  devServer: {
    // port:3000, //端口
    progress: true, //滚动条
    open: "true", //自动打开浏览器
    compress: true, //压缩
    contentBase: "./dist" //指定文件夹
  },
  /* 
    模式 默认两种 production 生产模式 development 开发模式
  */

  mode: "development",
  //入口
  entry: "./src/index.js",
  // 出口
  output: {
    // 打包后的文件名
    // filename:"bundle.[hash:8].js", 每次修改产生一个新的文件
    filename: "bundle.js",
    /*
     path.resolve() 可以将相对路径解析为绝对路径
    __dirname 以当前目录下产生dist目录
    */
    path: path.resolve(__dirname, "dist") //路径必须是一个绝对路径
  },
  /* 数组 配置所有的webpack插件 */
  plugins: [
    new HtmlWebapckPlugin({
      template: "./src/index.html",
      filename: "index.html", //打包生成的文件名
      // 压缩
      minify: {
        removeAttributeQuotes: true, //移除双引
        collapseWhitespace: true //移除空格
      },
      hash: true //生成的版本带有哈希值
    }),
     /* 抽离css */
    new MiniCssExtractPlugin({
      filename:"main.css"
    })
  ],
  module: {
    //模块
    rules: [
      /* 
      es6转es5
      */
     {
       test:/\.js$/,
       use:{
         loader:"babel-loader",
         options:{
           presets:[
             "@babel/preset-env"
           ],
           /* 
           class A{
              a=1;
            }
           */
           plugins:[
            ["@babel/plugin-proposal-decorators", { "legacy": true }],
            ["@babel/plugin-proposal-class-properties", { "loose" : true }]
           ]
         }
       }
     },
     /*  规则 css-loader 解析@inport语法
      style-loader css插入到head标签中
      loader 的特点 单一
      loader 的用法，字符串只用一个loader
      多个loader需要[]
      loader 的顺序 默认从右向左执行 从下往上执行
      loader 还可以写成对象形式 */
      {
        test: /\.css$/,
        use: [
        /*   {
            loader: "style-loader",
            options: {
              insertAt: "top"
            }
          }, */
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
        ]
      },
     /* yarn add less less-loader
        sass node-sass sass-loader
        stylus stylus-loader */
      {
        test: /\.less$/,
        use: [
       /*    {
            loader: "style-loader",
            options: {
              insertAt: "top"
            }
          }, */
          MiniCssExtractPlugin.loader,
          "css-loader", //@import 解析路径
          "postcss-loader",
          "less-loader" //把less--》css
        ]
      }
    ]
  }
};
