// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var publicPath = '/shop-web';

let baseUrl = 'http://test.wgmf.com'

let baseUrl1 = 'http://192.168.2.119:8080/'
var apis = [];
apis.push("/wechat-shop-back/**");
apis.push("/wechat-operation-back/**");
apis.push("/qiniu/**");
apis.push("/wechat-pay/**");
apis.push("/base-data-service/**");
apis.push("/wechat-propagate-back/**");
apis.push('/micro-mall-serve/**');
apis.push("/promotion/**");
apis.push("/webstat/**");
apis.push("/app/**");
apis.push('/wechat-service/**');
apis.push("/wechat-game-back/**");
apis.push("/wechat-shop-internal/**");


var pages = [];
pages.push('cookie')
//pages.push('shop/productServe')
pages.push('shop/orderList')
pages.push('shop/payOrder')
pages.push('shop/productIndex')
pages.push('shop/productDetail')
pages.push('shop/productCombo')
//pages.push('shop/myCart')
//pages.push('shop/addressManage')
pages.push('shop/productList')
//pages.push('shop/payH5Result')
module.exports = {
	page: 'shop/productIndex',
	pages: pages,
	buildAll:false,
	build: {
		env: require('./prod.env'),
		assetsRoot: path.resolve(__dirname, '../dist'),
		assetsSubDirectory: 'static',
		assetsPublicPath: publicPath,
		productionSourceMap: false,
		// Gzip off by default as many popular static hosts such as
		// Surge or Netlify already gzip all static assets for you.
		// Before setting to `true`, make sure to:
		// npm install --save-dev compression-webpack-plugin
		productionGzip: false,
		productionGzipExtensions: ['js', 'css'],
		// Run the build command with an extra argument to
		// View the bundle analyzer report after build finishes:
		// `npm run build --report`
		// Set to `true` or `false` to always turn it on or off
		bundleAnalyzerReport: process.env.npm_config_report
	},
	dev: {
		env: require('./dev.env'),
		port: 8080,
//		page: 'shop/productDetail',
		autoOpenBrowser: true,
		assetsSubDirectory: 'static', //'static',
		assetsPublicPath: publicPath,
		proxyTable: {
			proxy: {
				filter: apis,
				target: baseUrl,
				logLevel: 'debug'
			},
//			proxy1:{
//				filter:['/wechat-shop-back/**'],
//				target: baseUrl1,
//				logLevel: 'debug'
//			},
//			proxy2:{
//				filter:['/wechat-pay/**'],
//				target: 'http://192.168.2.116:8080/',
//				logLevel: 'debug'
//			}
		},
		// CSS Sourcemaps off by default because relat paths are "buggy"
		// with this option, according to the CSS-Loader README
		// (https://github.com/webpack/css-loader#sourcemaps)
		// In our experience, they generally work as expected,
		// just be aware of this issue when enabling this option.
		cssSourceMap: false
	}
}