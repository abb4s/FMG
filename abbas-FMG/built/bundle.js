/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	module.exports = __webpack_require__(6);


/***/ },
/* 1 */
/***/ function(module, exports) {

	var Icon = React.createClass({
	  displayName: "Icon",

	  render: function () {
	    if (this.props.ext == "folder") {
	      return React.createElement("img", { src: "folder.png", width: "40px" });
	    } else if (this.props.ext == "jpeg") {
	      return React.createElement("img", { src: "pic.png", width: "40px", styel: "margin-bottom:-10px; margin-right:20px;" });
	    } else if (this.props.ext == "txt.png") {
	      return React.createElement("img", { src: "txt.png", width: "40px" });
	    } else {
	      return React.createElement("img", { src: "file.png", width: "40px" });
	    }
	  }
	});

	module.exports = Icon;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	
	var Icon = __webpack_require__(1);
	var FFile = React.createClass({
	  displayName: "FFile",

	  open: function () {
	    this.props.fmg.openFile(this.props.index);
	  },
	  delete: function () {
	    this.props.fmg.delete(this.props.index, this.props.ext);
	  },
	  render: function () {
	    return React.createElement(
	      "div",
	      { className: "fmg-element", onDoubleClick: this.open },
	      React.createElement(Icon, { ext: this.props.ext }),
	      this.props.fileName,
	      ",",
	      this.props.author,
	      ",",
	      React.createElement(
	        "a",
	        { href: "#", onClick: this.delete },
	        " delete"
	      )
	    );
	  }
	});

	module.exports = FFile;

/***/ },
/* 3 */
/***/ function(module, exports) {

	var Breadcrumb = React.createClass({
	  displayName: "Breadcrumb",


	  goToPath: function (i) {
	    this.props.fmg.openBreadCrumbs(this.props.index);
	  },

	  render: function () {
	    return React.createElement(
	      "a",
	      { href: "#", onClick: this.goToPath },
	      this.props.text,
	      ">"
	    );
	  }
	});

	module.exports = Breadcrumb;

/***/ },
/* 4 */
/***/ function(module, exports) {

	var UploadModal = React.createClass({
	  displayName: 'UploadModal',


	  open: function () {
	    var modal = document.getElementById('uploadModal');
	    modal.style.display = "block";
	  },
	  close: function () {
	    var modal = document.getElementById('uploadModal');
	    modal.style.display = "none";
	  },
	  render: function () {
	    return React.createElement(
	      'div',
	      { id: 'uploadModal', className: 'modal' },
	      React.createElement(
	        'div',
	        { className: 'modal-content' },
	        React.createElement(
	          'span',
	          { className: 'close', onClick: this.close },
	          '×'
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'h3',
	            null,
	            'Upload file '
	          ),
	          React.createElement(
	            'form',
	            { action: "/upload/" + this.props.path, method: 'post', encType: 'multipart/form-data' },
	            React.createElement('input', { type: 'file', name: 'theFile' }),
	            React.createElement('br', null),
	            React.createElement('br', null),
	            React.createElement('input', { type: 'submit', value: 'upload' })
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = UploadModal;

/***/ },
/* 5 */
/***/ function(module, exports) {

	var Menu = React.createClass({
	  displayName: "Menu",


	  mkdir: function () {
	    var folderName = prompt("Please enter folderName : ", "newFolder");
	    if (folderName != null) {
	      this.props.fmg.mkdir(folderName);
	    }
	  },
	  upload: function () {
	    this.props.fmg.showUpload();
	  },
	  render: function () {

	    return React.createElement(
	      "div",
	      { className: "menu" },
	      React.createElement(
	        "a",
	        { href: "#", onClick: this.mkdir },
	        "mkdir,"
	      ),
	      React.createElement(
	        "a",
	        { href: "#", onClick: this.upload },
	        "upload file,"
	      )
	    );
	  }
	});

	module.exports = Menu;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	

	var FFile = __webpack_require__(2);
	var Breadcrumb = __webpack_require__(3);
	var Menu = __webpack_require__(5);
	var UploadModal = __webpack_require__(4);

	var Fmg = React.createClass({
	  displayName: 'Fmg',

	  getInitialState: function () {
	    return {
	      currentPath: ["root"],
	      files: []
	    };
	  },
	  openFile: function (i) {
	    if (this.state.files[i].ext == "folder") {
	      var _do = function (path) {
	        this.state.currentPath.push(path);
	      }.bind(this);
	      this.changePath( /*this.state.currentPath.join("/")+"/"+*/this.state.files[i].name, _do);
	    } else {
	      alert("hey it is not directory !!");
	    }
	  },
	  openBreadCrumbs: function (i) {
	    /*var thePath="";
	    for(var j=0 ; j<i ; j++){
	      thePath+=this.state.currentPath[j]+"/"
	    }
	    thePath+=this.state.currentPath[i];
	    console.log("Breadcrumb path : " + thePath + "\n");*/
	    var _do = function () {
	      this.state.currentPath = this.state.currentPath.slice(0, i + 1);
	    }.bind(this);
	    this.changePath(this.state.currentPath[i], _do);
	  },

	  refresh: function () {
	    var _do = function () {};
	    this.changePath(this.state.currentPath[this.state.currentPath.length - 1], _do);
	  },
	  changePath: function (path, _doAfterSucces) {
	    $.ajax({
	      url: "http://127.0.0.1:3000/browse/" + path,
	      dataType: 'json',
	      cache: false,
	      success: function (data) {

	        _doAfterSucces(path);
	        this.setState({
	          files: data,
	          currentPath: this.state.currentPath
	        });
	        console.log("the current path now :" + this.state.currentPath);
	      }.bind(this),
	      error: function (xhr, status, err) {
	        console.error("http://127.0.0.1:3000/", status, err.toString());
	      }.bind(this)
	    });
	  },
	  componentDidMount: function () {
	    $.ajax({
	      url: "http://127.0.0.1:3000/browse/root/",
	      dataType: 'json',
	      cache: false,
	      success: function (data) {
	        this.setState({ files: data });
	      }.bind(this),
	      error: function (xhr, status, err) {
	        console.error("http://127.0.0.1:3000/", status, err.toString());
	      }.bind(this)
	    });
	  },
	  mkdir: function (folderName) {
	    var thePath = this.state.currentPath[this.state.currentPath.length - 1];
	    $.ajax({
	      url: "http://127.0.0.1:3000/mkdir/" + thePath + "-" + folderName,
	      cache: false,
	      success: function (data) {
	        console.log(data);
	        this.refresh();
	      }.bind(this),
	      error: function (xhr, status, err) {
	        console.error("http://127.0.0.1:3000/", status, err.toString());
	      }.bind(this)
	    });
	  },
	  showUpload: function () {
	    this.refs.UploadModal.open();
	  },
	  delete: function (i, ext) {
	    var dataToSent = {
	      ext: ext
	    };
	    if (ext == "folder") {
	      dataToSent.folderName = this.state.files[i];
	    } else {
	      dataToSent.folderName = this.state.currentPath[this.state.currentPath.length - 1];
	      dataToSent.fileName = this.state.files[i].name;
	    }
	    $.ajax({
	      url: "http://127.0.0.1:3000/delete/",

	      type: "POST",
	      data: dataToSent,
	      cache: false,
	      success: function (data) {
	        console.log(data);
	      }.bind(this),
	      error: function (xhr, status, err) {
	        console.error("http://127.0.0.1:3000/", status, err.toString());
	      }.bind(this)
	    });
	  },
	  render: function () {

	    return React.createElement(
	      'div',
	      { id: 'FMG' },
	      React.createElement(
	        'div',
	        null,
	        this.state.currentPath.map(function (item, i) {
	          return React.createElement(Breadcrumb, { key: i, index: i, fmg: this, text: item });
	        }.bind(this))
	      ),
	      React.createElement(Menu, { fmg: this }),
	      React.createElement(
	        'div',
	        { className: 'files' },
	        this.state.files.map(function (item, i) {
	          return React.createElement(FFile, { key: i, index: i, fileName: item.name, author: item.owner, ext: item.ext, fmg: this });
	        }.bind(this))
	      ),
	      React.createElement(UploadModal, { ref: 'UploadModal', path: this.state.currentPath[this.state.currentPath.length - 1] })
	    );
	  }
	});
	ReactDOM.render(React.createElement(Fmg, null), document.getElementById('dev'));

/***/ }
/******/ ]);