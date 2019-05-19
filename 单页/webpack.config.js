let path = require("path");
let HtmlWebapckPlugin = require("html-webpack-plugin");
/* 抽离css */
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
// const webpack=require("webpack");
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
    path: path.resolve(__dirname, "dist") ,//路径必须是一个绝对路径
    // publicPath:"http://localhost:8080",//所有的增加默认引用的路径
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
      filename:"css/main.css"
    }),
    /* 每个模块中都引入jquery */
    // new webpack.providePlugin({
    //   jquery:"$"
    // })
  ],
  /* 外部引入，不需要打包 */
  externals:{
    jquery:"$"
  },
  module: {
    //模块
    rules: [ //loader默认从右向左执行 从下到上执行
      /* 匹配html图片 */
      {
        test:/\.html$/,
        use:"html-withimg-loader"
      },
      /* 匹配图片 */
      {
        test:/\.(png|jpg|gif)$/,
        // use:"file-loader"
        use:{
          loader:"url-loader",
          options:{
            limit:1,//大于多少,产出图片
            outputPath:"/img/",//产生地址
            publicPath:"http://localhost:8080", //只给图片增加
          }
        }
      },
      /* 
      jquery暴露到全局
      */
    //  {
    //    test:require.resolve("jquery"),
    //    use:"expose-loader?$"
    //  },
      /* 
      校验eslint
      */
    //  {
    //    test:/\.js%/,
    //    use:{
    //      loader:"eslint-loader",
    //      options:{
    //       enforce:"pre"//强制在普通loader之前执行 post 之后执行
    //      }
    //    }
    //  },
      /* 
      es6转es5
      */
     { //normal 普通loader
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
            ["@babel/plugin-proposal-class-properties", { "loose" : true }],
            ["@babel/plugin-transform-runtime"]
           ]
         }
       },
       include:path.resolve(__dirname,"src"), //js找哪个文件下的目录
       exclude:/node_modules/ //排除哪个文件下的目录
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
