



  var FFile = require('./FFile.js');
  var Breadcrumb=require('./BreadCrumb.js');
  var Menu =require('./Menu.js');








      var Fmg=React.createClass({
        getInitialState: function () {
          return {
            currentPath: ["root"],
            files: [],
          };
        },
        openFile : function(i){
          if(this.state.files[i].ext== "folder"){
            this.changePath(this.state.currentPath.join("/")+"/"+this.state.files[i].name);
          }
          else {
            alert("hey it is not directory !!");
          }
        },
        openBreadCrumbs: function(i){
          var thePath="";
          for(var j=0 ; j<i ; j++){
            thePath+=this.state.currentPath[j]+"/"
          }
          thePath+=this.state.currentPath[i];
          console.log("Breadcrumb path : " + thePath + "\n");
          this.changePath(thePath);
        },
        changePath : function(path){
          $.ajax({
            url: "http://127.0.0.1:3000/" + path  ,
            dataType: 'json',
            cache: false,
            success: function(data) {
              this.setState({
                files: data,
                currentPath : path.split("/"),
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
            url: "http://127.0.0.1:3000/root/",
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
        mkdir : function(){
          var thePath= this.state.currentPath[this.state.currentPath.length-1];
          $.ajax({
            url: "http://127.0.0.1:3000/mkdir/"+ thePath +"-newfolder",
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
                <Menu mkdir={this.mkdir}/>
                <div className="files">
                  {
                    this.state.files.map(function(item,i){
                      return(
                        <FFile key={i} index={i}  fileName={item.name}  author={item.owner} ext={item.ext} fmg={this} />
                      );
                    }.bind(this))
                  }
                </div>

              </div>


          );
        }
      });
      ReactDOM.render(
        <Fmg />,
        document.getElementById('dev')
      );
