module.exports = {
  entry: ["./js/Icon.js","./js/FFile.js","./js/BreadCrumb.js","./js/UploadModal.js","./js/Menu.js","./js/FMG.js"],
  output: {
    filename: 'bundle.js',
    path: __dirname + '/built'
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }


};
