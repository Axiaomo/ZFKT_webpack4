let str = require("./a.js");
console.log(str);
require("./css.css");
require("./a.less");
let fn=()=>{
  console.log("log")
}
fn();
@log
class A{
  a=1;
}
let a=new A();
console.log(a.a)

function log(targer){
  console.log(targer)
}