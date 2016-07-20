var UploadModal = React.createClass({

  open : function(){
    var modal = document.getElementById('uploadModal');
    modal.style.display = "block";
  },
  close : function(){
    var modal = document.getElementById('uploadModal');
    modal.style.display = "none";
  },
  render : function(){
      return (
        <div id="uploadModal"  className="modal">
          <div className="modal-content">
            <span className="close" onClick={this.close}>×</span>
            <p>
              <h3>Upload file </h3>
              <form action={"/upload/"+this.props.path} method="post" encType="multipart/form-data">
                <input type="file" name="theFile"/>
                <br /><br />
                <input type="submit" value="upload" />
              </form>
            </p>
          </div>
        </div>
      );
  }
});

module.exports = UploadModal;
