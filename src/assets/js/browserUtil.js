export default {
	intervalTime:7*24*60*60*1000,
	getURLParameter:function(name,search){
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		var search = search || window.location.search.substr(1);
	    var r = search.match(reg);
	    if(r){
	    	return  decodeURI(r[2]);
	    }
	    return null;
	},
	getCookie:function(name){
		var value = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
		return decodeURI(value ? value.pop() : '');
	},
	setCookie:function(name,value,days){
		var exdate=new Date();
		exdate.setTime(exdate.getTime()+(days*1000*60*60*24));
		var expires = days ? "" : ";expires="+exdate.toGMTString();
		var domain = ";domain="+location.host+";path=/";
		var domain1 = ";path=/";
		document.cookie = name+ "=" +encodeURI(value) + expires + domain;
		document.cookie = name+ "=" +encodeURI(value) + expires + domain1;
	},
	removeCookie:function(name){
		this.setCookie(name, "", -1);
	},
	appendMtaH5:function(sid,cid){
		var _mtac = {};
		var mta = document.createElement("script");
		mta.src = "http://pingjs.qq.com/h5/stats.js?v2.0.4";
		mta.setAttribute("name", "MTAH5");
		mta.setAttribute("sid", sid || "500151725");
		mta.setAttribute("cid", cid || "500437616");
		var s = document.getElementsByTagName("script")[0];
		s.parentNode.insertBefore(mta, s);
	},
	reportError:function(){//错误信息上报
		window.addEventListener('error',function(e){
			console.log(e);
			var errorInfo = msg+":<br>at "+e.url+" "+e.line+" line";
			var img = new Image();
			var domain = location.host;
			if(domain === "wx.wgmf.com"){
				img.src = "http://wx.wgmf.com/logServer/sendMessage/web?topicId=23&stactinfo="+errorInfo;
			}else{
				img.src = "http://test.wgmf.com/logServer/sendMessage/web?topicId=23&stactinfo="+errorInfo;
			}
		},true);
	},
	appendDebugger:function(){
		var df = this.getCookie('.debugger.');
		if(df === 'init'){
			var mta = document.createElement("script");
			mta.src = "http://7xv1io.com1.z0.glb.clouddn.com/js/lib/vconsole.min.js";
			document.body.appendChild(mta);
		}
	},
	appendCartTrack:function(info){
		var openId = info.openId;
		var cusId = info.cusId;
		if(!info.wxBorwser && !cusId){
			return;
		}
		var s = document.createElement('script');
		var host = location.hostname;
		if(host !== 'wx.wgmf.com'){
			host = 'test.wgmf.com';
		}
		s.src = 'http://'+host+'/wechat-shop-track/shoppingCartTrack/script?openId='+openId+'&cusId='+cusId;
		document.body.appendChild(s);
	},
	requestOauth:function(redirect){
		// 没输入就取当前网页地址
		var redirectUrl = !redirect ? window.location.href : redirect;
		// TODO 协议修改成https
		var protocol = "http://";
		var domain = window.location.hostname;
		localStorage.setItem('lastOauth',Date.now());
		var url = protocol + domain + "/wechat-service/oauth2/build?redirect=" + encodeURIComponent(redirectUrl);
		window.location.href = url;
	},
	initPage(init,forceOauth){//WeixinJSBridge
		var ua = window.navigator.userAgent.toLowerCase();
		var openId = this.getCookie('openId');
		var cusId = this.getCookie('customerId');
		var wxBrowser = true;
	    if(ua.match(/MicroMessenger/i)=="micromessenger") {
	    	var lastOauth = localStorage.getItem('lastOauth') || 0;
	    	var curTime = Date.now();
	    	var oauthFlag = curTime - lastOauth > this.intervalTime;
	    	if(forceOauth && oauthFlag){//强制授权同步cusid信息
    			this.requestOauth();
	    	}else if(!openId && !cusId){//openId与cusId都没有时授权获取
    			this.requestOauth();
	    	}
	    }else{
	    	wxBrowser = false;
	    }
	    if(typeof init === 'function'){
	    	init({openId,cusId,wxBrowser});
	    }
	}
}