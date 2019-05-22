let path=require("path");
let webpack=require("webpack");
module.exports={
  mode:"development",
  entry:{
    // test:"./src/test.js"
    react:["react","react-dom"]
  },
  output:{
    filename:'_dll_[name].js', //产生的文件名
    path:path.resolve(__dirname,"dist"),
    library:"_dll_[name]",//打包完成的js 赋一个变量
    // libraryTarget:"var" //exports 方式 node 中使用 umb模式 var this
  },
  plugins:[
    new webpack.DllPlugin({
      name:"_dll_[name]",
      path:path.resolve(__dirname,"dist","mainfest.json") //任务清单列表
    })
  ]
}