var Icon =React.createClass({
  render: function() {
    if(this.props.ext == "folder"){
      return(
        <img src="folder.png" width="40px" />
      );
    }
    else if(this.props.ext=="jpeg"){
      return(
        <img src="pic.png" width="40px"  styel="margin-bottom:-10px; margin-right:20px;"/>
      );
    }
      else if(this.props.ext=="txt.png"){
        return(
          <img src="txt.png" width="40px"  />
        );
    }
    else {
      return(
        <img src="file.png" width="40px"  />
      );
    }

  }
});

module.exports = Icon;
