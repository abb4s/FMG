var express = require('express');
var app = express();
var path = require('path');
app.get("/root", function(req, res){
    res.json(
          [
            {name:"pics", ext:"folder" , owner:"abbas"},
            {name:"documents", ext:"folder" , owner:"abbas"},
            {name:"readme.txt", ext:"txt" , owner:"abbas"},
            {name:"logo.png", ext:"jpeg" , owner:"abbas"},
            {name:"readme.txt", ext:"txt" , owner:"abbas"},
            {name:"logo.png", ext:"jpeg" , owner:"abbas"},
            {name:"readme.txt", ext:"txt" , owner:"abbas"},
            {name:"logo.png", ext:"jpeg" , owner:"abbas"},
            {name:"readme.txt", ext:"txt" , owner:"abbas"},
            {name:"logo.png", ext:"jpeg" , owner:"abbas"}
          ]

	   );
});
app.get("/", function(req, res){
  res.sendFile(path.join(__dirname+'/abbas-FMG/index.html'));


});


app.get("/root/pics/", function(req, res){
  res.json(

        [

          {name:"anotherReadme.txt", ext:"txt" , owner:"abbas"},
          {name:"anotherLogo.png", ext:"jpeg" , owner:"abbas"}
        ]

   );


});


app.get("/root/documents/", function(req, res){
  res.json(

        [

          {name:"anotherReadme234.txt", ext:"txt" , owner:"abbas"},
          {name:"anotherLogo.png", ext:"jpeg" , owner:"abbas"}
        ]

   );


});

app.get("/mkdir/:path-:foldername",function(req,res){
  res.send("you want to create a folder "+ req.params.foldername +" in : " + req.params.path);
});

app.use(express.static('abbas-FMG/js'));
app.use(express.static('abbas-FMG/built'));
app.use(express.static('abbas-FMG/img'));
app.use(express.static('abbas-FMG/css'));
app.use(express.static('abbas-FMG/lib'));

//app.use('/thepath',express.static('abbas-FMG/js'));

app.set('json spaces', 40);
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
