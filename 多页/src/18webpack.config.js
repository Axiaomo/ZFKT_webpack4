// 出口生成地址插件
let path=require("path");
// html插件
const HtmlWebpackPlugin=require("html-webpack-plugin");
const CleanWebpackPlugin=require("clean-webpack-plugin");
const CopyWebpackPlugin=require("copy-webpack-plugin");
const webpack=require("webpack");
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
        test:/\.css$/, 
        use: ["style-loader","css-loader"]
      },
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
  // devtool:"eval-source-map",//不产生单独的文件，但是可以显示行和列
  // devtool:"cheap-module-source-map",//不会产生列，但是是一个单独的映射文件
  // devtool:"cheap-module-eval-source-map",//不会产生文件，也不会产生列
  // 实时打包，监控
  // watch: true,
  // watchOptions:{ //监控选项
  //     poll:1000, //每秒问我1000次，需要更新吗
  //     aggregateTimeout:500, //防抖 我一直输入代码 输入停止 500毫秒内开始打包
  //     ignored:/node_modules/ //不需要监控哪个文件夹
  // },
  output:{
    // name 为变量
    filename:'[name].js',
    path:path.resolve(__dirname,"dist")
  },
  // 重写方式 请求代理到express服务器上 解决跨域问题
  // devServer:{
  //   /* 方法一 */
  //   // proxy:{
  //   //   "/api":"http://localhost:3000"
  //   // }
  //   // proxy:{
  //   //   "/api":{
  //   //     target:"http://localhost:3000",
  //   //     pathRewrite:{"/api":""} //服务端不用写/api
  //   //   }
  //   // }
  //   /* 方法二  钩子函数*/
  //   before(app){
  //     app.get("/user",(req,res)=>{
  //         res.json({name:"珠峰=before"})
  //     })
  //   }
  // },
  /* 解析第三方包 */
  // resolve:{
  //   modules: [path.resolve("node_modules")],
  //   // mainFiles:[] //入口文件名字 index.js
  //   // mainFields:["style","main"] //按照文件名顺序查找
  //   // 填写扩展名，先找js js找不到，再找css
  //   extensions:[".js",".css",".json"]
  //   // alias: {
  //   //   bootstrap:"bootstrap/dist/css/bootstrap.css"
  //   // }
  // },
  // 配置插件
  plugins:[
    new webpack.DefinePlugin({
      DEV:JSON.stringify("production")
    }),
    new HtmlWebpackPlugin({
      template:"./index.html",
      filename:"index.html",
      chunks:["index"]
    }),
    new HtmlWebpackPlugin({
      template:"./index.html",
      filename:"my.html",
      chunks:["my"]
    }),
    // 清除插件
    new CleanWebpackPlugin(),
    // 拷贝插件
    new CopyWebpackPlugin([
      {
        "from":"doc",to:"./"
      }]
      ),
      new webpack.BannerPlugin("make 2019 syq")
  ]
}