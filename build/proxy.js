var express = require('express');
var proxyMiddleware = require('http-proxy-middleware');
var app = new express();
var path = require('path');
var target0 = "http://app.wgmf.com/";//精准后台(需要登录后才能获取数据)
var target1 = "http://wx.wgmf.com/";//正式环境代理的数据源
var target2 = "http://test.wgmf.com/";//测试环境代理的数据源
var target3 = "http://192.168.2.116:8081/";//胡兵服务地址
var target4 = "http://192.168.5.46:9798/";//
var target5 = "http://192.168.5.54:8080/";//精准营销测试服务器

var target = target2;
var apis = [];
apis.push("/wechat-shop-back/**");
apis.push("/wechat-operation-back/**");
apis.push("/qiniu/**");
apis.push("/wechat-pay/**");
apis.push("/base-data-service/**");
app.use(proxyMiddleware(apis,{
	target:target,
	changeOrigin: true,
	logLevel: 'debug'
}));
/**********************************************/
apis = [];
apis.push("/wechat-propagate-back/**");
apis.push('/micro-mall-serve/**');
apis.push("/promotion/**");
apis.push("/webstat/**");
apis.push("/app/**");
apis.push("/wechat-game-back/**");
apis.push("/wechat-shop-internal/**");
app.use(proxyMiddleware(apis, {
	target:target,
	changeOrigin: true,
	logLevel: 'debug'
}));
/**********************************************/
app.use(proxyMiddleware('/wgmfjz', {
	target:"http://app.wgmf.com",
	changeOrigin: true,
	logLevel: 'debug',
	auth:'668:123456'
}));


app.use("/shop-web", express.static(path.resolve(__dirname,'../shop-web')));
var port = "80";
app.listen(port, function (err) {
	if (err) {
	    console.log(err);
	    return;
	}
	var uri = 'http://localhost:' + port+"/shop-web";
	console.log('Listening at ' + uri + '\n');
});
