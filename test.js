var express = require('express');
var app = express();
var path = require('path');


app.get("/contactUs",function(req,res){
  res.sendFile(path.join(__dirname +'/theView.html'));

});
app.listen(3000,function(){
  console.log("server dare kar mikone");
});
