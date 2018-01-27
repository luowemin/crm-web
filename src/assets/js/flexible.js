/**
 * 在width = 375,devicePixelRatio = 2 的情况下 1rem = 10px
 */
! function(window) {

	/* 设计图文档宽度 */
//	var docWidth = 640;

	var doc = window.document,
		docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
	var dpr = window.devicePixelRatio || 1
	var clientWidth = docEl.clientWidth;
	var ua = window.navigator.userAgent.toLowerCase();
	var isWx = ua.match(/MicroMessenger/i)=="micromessenger";
	var recalc = (function refreshRem() {
//		var clientWidth = docEl.getBoundingClientRect().width;
		var p = (clientWidth * dpr) / 750
		if(isWx) p = 1;
		
		docEl.style.fontSize = (p * 10) + 'px';//(clientWidth / 24) + 'px';
		return refreshRem;
	})();

	/* 添加倍屏标识，安卓倍屏为1 */
	docEl.setAttribute('data-dpr', window.navigator.appVersion.match(/iphone/gi) ? window.devicePixelRatio : 1);

	if(/iP(hone|od|ad)/.test(window.navigator.userAgent)) {
		/* 添加IOS标识 */
		doc.documentElement.classList.add('ios');
		/* IOS8以上给html添加hairline样式，以便特殊处理 */
		if(parseInt(window.navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)[1], 10) >= 8)
			doc.documentElement.classList.add('hairline');
	}

	if(!doc.addEventListener) return;
	window.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);

}(window);