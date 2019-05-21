// 出口生成地址插件
let path=require("path");
// html插件
const HtmlWebpackPlugin=require("html-webpack-plugin");
module.exports={
  // 多入口
  // mode:"development",
  mode:"production",
  entry:{
    index:"./src/index.js",
    my:"./src/my.js"
  },
  // 规则
  module:{
    rules:[
      {
        test:/\.js$/, //以js结尾
        use:{
          loader:"babel-loader", //使用的loader
          options:{
            presets:["@babel/preset-env"] //预设
          }
        }
      }
    ]
  },
  // 源码映射 会单独生成一个souremap 文件，出错了，会标识 当前报错的行和列
  // devtool:"source-map",//增加映射文件 可以帮我们调理源代码
  devtool:"eval-source-map",//不产生单独的文件，但是可以显示行和列
  output:{
    // name 为变量
    filename:'[name].js',
    path:path.resolve(__dirname,"dist")
  },
  // 配置插件
  plugins:[
    new HtmlWebpackPlugin({
      template:"./index.html",
      filename:"index.html",
      chunks:["index"]
    }),
    new HtmlWebpackPlugin({
      template:"./index.html",
      filename:"my.html",
      chunks:["my"]
    })
  ]
}