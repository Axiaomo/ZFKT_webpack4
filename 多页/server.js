let express=require("express");
let app=express();
let webpack=require("webpack");
let middle=require("webpack-dev-middleware");
let config=require("./webpack.config");
let compiler=webpack(config);
app.use(middle(compiler));
app.get("/user",(req,res)=>{
  res.json({name:"11"})
});
app.listen(3000)