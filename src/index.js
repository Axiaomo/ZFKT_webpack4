// // let str = require("./a.js");
// // require("@babel/polyfill")
// // console.log(str);
require("./css.css");
// // require("./a.less");
// // let fn=()=>{
// //   console.log("log")
// // }
// // fn();
// // @log
// // class A{
// //   a=1;
// // }
// // class B{
// //   a=1;
// // }
// // let a=new A();
// // console.log(a.a)

// // function log(targer){
// //   console.log(targer)
// // }
// // function* gen(){
// //   yield 1;
// // }
// // aa.includes("a")
// import $ from "jquery";
// // expose-loader 暴露全局的loader
// /* 
// pre 前面执行的loader
// normal 普通loader
// post 后置loader
// 内联loader
// */
// console.log($)
// console.log(window.$)

// 打包图片
import logo from "./logo.jpg";
let image=new Image();
image.src=logo;
document.body.appendChild(image);