let path=require("path");
module.exports={
  /* 
    模式 默认两种 production 生产模式 development 开发模式
  */ 
   mode:"development",
  //入口
  entry:'./src/index.js',
  // 出口
  output:{
    // 打包后的文件名
    filename:"bundle.js",
    /*
     path.resolve() 可以将相对路径解析为绝对路径
    __dirname 以当前目录下产生dist目录
    */
    path:path.resolve(__dirname,"build")//路径必须是一个绝对路径
  }
}