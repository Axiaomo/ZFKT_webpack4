// 出口生成地址插件
let path=require("path");
// html插件
const HtmlWebpackPlugin=require("html-webpack-plugin");
module.exports={
  // 多入口
  mode:"development",
  entry:{
    index:"./src/index.js",
    my:"./src/my.js"
  },
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