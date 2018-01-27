import $ from '@/assets/js/zepto'
export let configWxApi = () => {
	var host = location.host;
	var api = ['onMenuShareTimeline','onMenuShareAppMessage','chooseWXPay','getLocation','chooseImage','hideMenuItems'];
	var url = "/wechat-service/wechatApi/JsSdkSign";
	if(host !== 'wx.wgmf.com'){//使测试环境能够调起支付页面
		url = "http://wx.wgmf.com" + url;
	}
	$.ajax({
		url,
		type:'GET',
		dataType:'json',
		success:function(data){
			var attrs = data.attributes;
			wx.config({
				debug : false,//host === 'test.wgmf.com',
				appId : attrs.appid,
				timestamp : attrs.timestamp,
				nonceStr : attrs.nonceStr,
				signature : attrs.signature,
				jsApiList : api
			});
		},
	});
}

export let checkCare = (openId,call) => {//判断微信号是否关注公众号
	$.ajax({
		url:"/wechat-propagate-back/user/subscribe",
		data:{openId:openId},
		success:function(data){
			var hasCare = (data.status == 0);
			if(typeof call == "function"){
				call(null,hasCare);
			}
		},
		error:function(err){
			if(typeof call == "function"){
				call(err);
			}
		}
	});
}

export let checkBind = (opneId,call) => {//判断微信号是否绑定手机号
	$.ajax({
		url:"/wechat-propagate-back/user/bind",
		data:{openId:openId},
		success:function(data){
			var hasBind = (data.status == 0);
			if(typeof call == "function"){
				call(null,hasBind);
			}
		},
		error:function(err){
			if(typeof call == "function"){
				call(err);
			}
		}
	});
}

export default {
	payWx(options){//data.payState(1-此订单已付款,2-此订单不存在,5-拼团已结束，不能再参团！)
		var df = () => {};
		options.paySuccess = options.paySuccess || df;
		options.payError = options.payError || df;
		options.payCancel = options.payCancel || df;
		$.ajax({
			url : "/wechat-pay/pay/bill/" + options.billId,
			type : 'POST',
			dataType : 'json',
			success : function(data){
				if(typeof options.preSuccess == "function"){
					options.preSuccess(data);
				}
				if (data.payState == 0) {
	    			wx.chooseWXPay({
						timestamp : data.timeStamp,
						nonceStr : data.nonceStr,
						package : data.packageStr,
						signType : 'MD5',
						paySign : data.paySign,
						success : options.paySuccess,
						fail : options.payError,
						cancel:options.payCancel
					});
				}
			},
			error:function(xhr){
				if(typeof options.preError == "function"){
					options.preError(xhr);
				}
			}
		});
	},
	payH5(billId){
		var url = '/wechat-pay/pay/bill/' + billId + '/web';
		$.get(url,(data) => {
			var trigger = document.createElement('a');
			var payLink = data.result;
			var isTest = location.host !== 'wx.wgmf.com';
			var redirect = 'http://wx.wgmf.com/shop-web/shop/payH5Result.html?billId='+billId;
			if(isTest){
				redirect = 'http://test.wgmf.com/shop-web/shop/payH5Result.html?billId='+billId;
			}
			payLink += '&redirect_url=' + encodeURIComponent(redirect)
			trigger.href = payLink;
			trigger.click();
		});
	}
}
