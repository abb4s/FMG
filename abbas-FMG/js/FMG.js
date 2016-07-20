



  var FFile = require('./FFile.js');
  var Breadcrumb=require('./BreadCrumb.js');
  var Menu =require('./Menu.js');
  var UploadModal=require('./UploadModal')







      var Fmg=React.createClass({
        getInitialState: function () {
          return {
            currentPath: ["root"],
            files: [],
          };
        },
        openFile : function(i){
          if(this.state.files[i].ext== "folder"){
            var _do= function (path){
              this.state.currentPath.push(path);
            }.bind(this);
            this.changePath(/*this.state.currentPath.join("/")+"/"+*/this.state.files[i].name,_do);
          }
          else {
            alert("hey it is not directory !!");
          }
        },
        openBreadCrumbs: function(i){
          /*var thePath="";
          for(var j=0 ; j<i ; j++){
            thePath+=this.state.currentPath[j]+"/"
          }
          thePath+=this.state.currentPath[i];
          console.log("Breadcrumb path : " + thePath + "\n");*/
          var _do= function (){
            this.state.currentPath=this.state.currentPath.slice(0,i+1);
          }.bind(this);
          this.changePath(this.state.currentPath[i],_do);
        },

        refresh : function (){
          var _do = function(){};
          this.changePath(this.state.currentPath[this.state.currentPath.length-1],_do);
        },
        changePath : function(path,_doAfterSucces){
          $.ajax({
            url: "http://127.0.0.1:3000/browse/" + path  ,
            dataType: 'json',
            cache: false,
            success: function(data) {

              _doAfterSucces(path);
              this.setState({
                files: data,
                currentPath : this.state.currentPath,
              });
              console.log("the current path now :"+this.state.currentPath);
            }.bind(this),
            error: function(xhr, status, err) {
              console.error("http://127.0.0.1:3000/", status, err.toString());
            }.bind(this)
          });
        },
        componentDidMount: function() {
          $.ajax({
            url: "http://127.0.0.1:3000/browse/root/",
            dataType: 'json',
            cache: false,
            success: function(data) {
              this.setState({files: data});
            }.bind(this),
            error: function(xhr, status, err) {
              console.error("http://127.0.0.1:3000/", status, err.toString());
            }.bind(this)
          });
        },
        mkdir : function(folderName){
          var thePath= this.state.currentPath[this.state.currentPath.length-1];
          $.ajax({
            url: "http://127.0.0.1:3000/mkdir/"+ thePath +"-"+folderName,
            cache: false,
            success: function(data) {
              console.log(data);
              this.refresh();
            }.bind(this),
            error: function(xhr, status, err) {
              console.error("http://127.0.0.1:3000/", status, err.toString());
            }.bind(this)
          });
        },
        showUpload : function(){
          this.refs.UploadModal.open();
        },
        delete : function(i,ext){
          var dataToSent={
            ext : ext,
          };
          if(ext=="folder"){
            dataToSent.folderName = this.state.files[i];
          }
          else{
            dataToSent.folderName=this.state.currentPath[this.state.currentPath.length-1];
            dataToSent.fileName=this.state.files[i].name;
          }
          $.ajax({
            url: "http://127.0.0.1:3000/delete/"  ,

            type : "POST",
            data : dataToSent,
            cache: false,
            success: function(data) {
              console.log(data);
            }.bind(this),
            error: function(xhr, status, err) {
              console.error("http://127.0.0.1:3000/", status, err.toString());
            }.bind(this)
          });

        },
        render: function(){

          return(

              <div id="FMG">
                <div>
                  {
                    this.state.currentPath.map(function(item,i){
                      return(
                        <Breadcrumb key={i} index={i} fmg={this} text={item}/>
                      );
                    }.bind(this))
                  }
                </div>
                <Menu fmg={this}/>
                <div className="files">
                  {
                    this.state.files.map(function(item,i){
                      return(
                        <FFile key={i} index={i}  fileName={item.name}  author={item.owner} ext={item.ext} fmg={this} />
                      );
                    }.bind(this))
                  }
                </div>
                <UploadModal ref="UploadModal" path={this.state.currentPath[this.state.currentPath.length-1]}/>
              </div>


          );
        }
      });
      ReactDOM.render(
        <Fmg />,
        document.getElementById('dev')
      );
