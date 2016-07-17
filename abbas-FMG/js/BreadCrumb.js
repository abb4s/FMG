var Breadcrumb=React.createClass({

  goToPath : function (i){
    this.props.fmg.openBreadCrumbs(this.props.index);
  },

  render : function (){
    return(
      <a href="#" onClick={this.goToPath}>{this.props.text}></a>
    );
  }
});

module.exports = Breadcrumb;
