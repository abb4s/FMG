
  var Icon= require('./Icon.js');
var FFile = React.createClass({
  open : function(){
    this.props.fmg.openFile(this.props.index);
  },
  render: function() {
    return (
      <div className="fmg-element" onDoubleClick={this.open}>
        <Icon ext={this.props.ext}/>
        {this.props.fileName},
        {this.props.author}
      </div>
    );
  },
});

module.exports = FFile;
