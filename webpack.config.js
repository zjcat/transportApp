/*
* @Author: Administrator
* @Date:   2017-09-13 15:10:09
* @Last Modified by:   Administrator
* @Last Modified time: 2017-09-13 16:41:09
*/
var ExtractTextPlugin = require("extract-text-webpack-plugin");//css单独打包
var HtmlWebpackPlugin = require('html-webpack-plugin') ;

var WEBPACK_ENV = process.env.WEBPACK_ENV || 'DEV';
var config = {
	entry : {
		'index' : ['./src/page/index/index.js']
	},
	output : {
		path       : './dist',
		pablicPath : '/dist',
		filename   : 'js/[name].js' 
	},
	externals :{
		'jquery' : 'window.jQuery'
	},
	module : {
		loaders : [
     		{test : /\.css$/, loader : ExtractTextPlugin.extract("style-loader","css-loader") },
			{test : /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=20000&name=image/[name].[ext]'},
			{test : /\.string$/, loader: 'html-loader'}

		]
	},
	//配置绝对路径
	resolve : {
        alias : {
            node_modules : __dirname + '/node_modules',
            util : __dirname + '/src/util',
            page : __dirname + '/src/page',
            service : __dirname + '/src/service',
            image : __dirname + '/src/image'
        }
    },
	plugin : [
		//独立通用模块到js/base.js
     	new webpack.optimize.CommonsChunkPlugin({
     		name     : 'common',//自建公共文件名
     		filename : 'js/base.js'//公共的内容所存在的文件
     	}),
     	//把css单独打包到文件夹
     	new ExtractTextPlugin("css/[name].css"),
     	//html模板处理
     	new HtmlWebpackPlugin(getHtmlConfig('index','首页'))
	]
}
if(WEBPACK_ENV === 'dev'){
	config.entry.common.push('webpack-dev-server/client?http://localhost:8089/')
}

module.exports = config;