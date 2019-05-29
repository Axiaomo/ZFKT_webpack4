/* 
// 21节课
import jquery from "jquery";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");
var a = moment("20111031", "YYYYMMDD").fromNow();
console.log(a) */
// 22节课程
/* import React from "react";
import {
  render
} from "react-dom"
render( <h1> jsx </h1>,window.root) */
// 24节课内容
/* // import calc from "./test";
// console.log(calc.add(1,2)); */

// 25节课内容
// import "./a";
// import "./b";
// console.log("index.js")
// let button=document.createElement("button");
// button.innerHTML="hello";
// button.addEventListener("click",function(){
//   import("./26").then(data=>{
//     console.log(data.default)
//   })
// });
// document.body.appendChild(button)

// 热更新
import str from "./26";
console.log(str);
if(module.hot){ //支持热更新方法
  module.hot.accept("./26.js",()=>{
    let str=require("./26");
    console.log(str);
  })
}