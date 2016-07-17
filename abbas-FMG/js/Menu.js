 var Menu=React.createClass({
   mkdir : function(){
     this.props.mkdir();
   },
   render : function(){
     return (
       <div className="menu">
          <a href="#" onClick={this.mkdir} >mkdir</a>
       </div>
     );

   }
 });

 module.exports = Menu;
