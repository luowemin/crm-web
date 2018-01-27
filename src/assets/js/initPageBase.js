import Toast from '@/components/Toast';
import Loading from '@/components/Loading';
import browser from '@/assets/js/browserUtil'
browser.reportError();
export let initPageBase = (Vue) => {
	var T = Vue.extend(Toast);
	var instance = new T({
		el: document.createElement('div')
	});
	document.body.appendChild(instance.$el);
	var toast = instance.show;
	Vue.prototype.$toast = toast;
	
	var L = Vue.extend(Loading);
	var loading = new L({
		el: document.createElement('div')
	});
	document.body.appendChild(loading.$el);
	Vue.prototype.$loading = loading;
	
	Vue.prototype.$browser = browser;
	browser.appendMtaH5();
	browser.appendDebugger();
	browser.initPage((info) => {
		Vue.prototype.$info = info;
	});
	var info = Vue.prototype.$info
	return {browser,loading,toast,info};
}
