let path=require("path");
let HtmlWebapckPlugin=require("html-webpack-plugin");
module.exports={
  /* 开发服务器配置 */
  devServer:{
    port:3000, //端口
    progress:true,//滚动条
    open:"true",//自动打开浏览器
    compress:true,//压缩
    contentBase:"./build"//指定文件夹
  },
  /* 
    模式 默认两种 production 生产模式 development 开发模式
  */ 
   mode:"production",
  //入口
  entry:'./src/index.js',
  // 出口
  output:{
    // 打包后的文件名
    // filename:"bundle.[hash:8].js", 每次修改产生一个新的文件
    filename:"bundle.js",
    /*
     path.resolve() 可以将相对路径解析为绝对路径
    __dirname 以当前目录下产生dist目录
    */
    path:path.resolve(__dirname,"build")//路径必须是一个绝对路径
  },
  /* 数组 配置所有的webpack插件 */
  plugins:[
    new HtmlWebapckPlugin({
      template:"./src/index.html",//模板文件
      filename:"index.html",//打包生成的文件名
      // 压缩
      minify:{
        removeAttributeQuotes:true,//移除双引
        collapseWhitespace:true,//移除空格
      },
      hash:true//生成的版本带有哈希值
    })
  ]
}