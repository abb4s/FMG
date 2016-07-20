var express = require('express');

var busboy = require('connect-busboy');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

app.use(busboy());
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));




var DB =  [
    {
      name : "root" , ext : "folder" , owner:"abbas",
      parent : null,
      files : [
        {name:"readme.txt", ext:"txt" , owner:"abbas"},
        {name:"logo.png", ext:"jpeg" , owner:"abbas"},
        {name:"readme.txt", ext:"txt" , owner:"abbas"},
        {name:"logo.png", ext:"jpeg" , owner:"abbas"},
        {name:"readme.txt", ext:"txt" , owner:"abbas"},
        {name:"logo.png", ext:"jpeg" , owner:"abbas"},
        {name:"readme.txt", ext:"txt" , owner:"abbas"},
        {name:"logo.png", ext:"jpeg" , owner:"abbas"},
      ],
    },
    {
      name:"pics", ext:"folder" , owner:"abbas",
      parent : "root",
      files : [
        {name:"anotherReadme.txt", ext:"txt" , owner:"abbas"},
        {name:"anotherLogo.png", ext:"jpeg" , owner:"abbas"}
      ]
    },
    {

      name:"documents", ext:"folder" , owner:"abbas",
      parent : "root",
      files : [
        {name:"anotherReadme33.txt", ext:"txt" , owner:"abbas"},
        {name:"anotherLogo33.png", ext:"jpeg" , owner:"abbas"}
      ]
    },

  ];



app.get("/browse/:folderName", function(req, res){

    var theFolder = DB.find(function(item){

      return item.name == req.params.folderName;
    });

    var files = theFolder.files;
    var subFolders = DB.filter(function(item){
      return item.parent == req.params.folderName;
    });

    res.json(
        subFolders.concat(files)
	   );
});
app.get("/", function(req, res){

  res.sendFile(path.join(__dirname+'/abbas-FMG/index.html'));
});






app.get("/mkdir/:path-:folderName",function(req,res){

  DB.push({
    name : req.params.folderName,
    ext : "folder",
    parent :req.params.path,
    owner : "abbas",
    files : [],
  });
  res.send("you want to create a folder "+ req.params.folderName +" in : " + req.params.path);
});

/*app.use(function(req, res) {
  console.log(req.busboy);

  req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {
    // ...
  });
  req.pipe(req.busboy);
  // etc ...
});*/

app.post("/upload/:path",function(req,res){
  req.pipe(req.busboy);

  req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {

    DB.find(function(item){
      return item.name==req.params.path ;
    }).files.push({
      name : filename,
      owner : "abbas",
      ext : mimetype,
    });
  });


  if (!req.busboy) {
      res.send('No files were uploaded.');
      return;
  }
  res.send(req.files);
});





app.post('/delete/',function(req,res){


  if(req.body.ext=="folder"){
    var i = DB.indexOf(
      DB.find(function(item){
        return item.name==req.body.folderName ;
      })
    );
    console.log(req.body.folderName);
    console.log(i);
    if(i>-1){
      splice(i, 1);
    }
  }
  else {

  }

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
