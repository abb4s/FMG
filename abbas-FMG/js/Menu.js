 var Menu=React.createClass({

   mkdir : function(){
    var folderName=prompt("Please enter folderName : ","newFolder");
    if(folderName!=null){
      this.props.fmg.mkdir(folderName);
    }
   },
   upload : function () {
     this.props.fmg.showUpload();
   },
   render : function(){

       return (
         <div className="menu">
            <a href="#" onClick={this.mkdir} >mkdir,</a>
            <a href="#" onClick={this.upload} >upload file,</a>
         </div>
       );



   }
 });

 module.exports = Menu;
