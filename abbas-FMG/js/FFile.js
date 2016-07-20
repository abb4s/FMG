
  var Icon= require('./Icon.js');
var FFile = React.createClass({
  open : function(){
    this.props.fmg.openFile(this.props.index);
  },
  delete : function(){
    this.props.fmg.delete(this.props.index,this.props.ext);
  },
  render: function() {
    return (
      <div className="fmg-element" onDoubleClick={this.open}>
        <Icon ext={this.props.ext}/>
        {this.props.fileName},
        {this.props.author},
        <a href="#" onClick={this.delete}> delete</a>
      </div>
    );
  },
});

module.exports = FFile;
