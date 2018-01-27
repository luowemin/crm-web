var path = require("path");
const webpack = require("webpack")

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
//	entry:utils.entries(),
	entry:{
		vendor:['vue/dist/vue.esm.js','@/assets/js/zepto'],
	},
  output: {
    path: path.join(__dirname, '../static/js'),
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
    }
  },
  plugins: [
  	new webpack.DllPlugin({
      path: path.join(__dirname, '..', '[name]-manifest.json'),
      name: '[name]_library', 
      context: __dirname
    }),
    // 压缩打包的文件
    new webpack.optimize.UglifyJsPlugin({ 
      compress: {
        warnings: false
      }
    })
  ],
}
