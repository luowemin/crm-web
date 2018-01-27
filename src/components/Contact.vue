<template>
	<div class="lxkf" @click="goService">
		<img src="http://7xv1io.com1.z0.glb.clouddn.com/product/image/lian-xi-ke-fu-tu-biao.png"/>
	</div>
</template>

<script>
	export default {
		name:'contact',
		props:{
			product:Object
		},
	    methods: {
	        goService() {
	        	var info = this.$info;
	        	var param = "partnerId=op"+info.openId;
	        	if(!info.wxBrowser){
	        		param = "partnerId=cu"+info.cusId;
	        	}
		    	var product = this.product;
		    	if(product){
		    		var imgUrl = product.groupedImages.icon && product.groupedImages.icon[0].imageUrl;
		    		var name = product.productTemplateName;
		    		var obj = {customField11:name};
		    		imgUrl = encodeURIComponent(imgUrl || "http://7xv1io.com1.z0.glb.clouddn.com/product/image/shareLogo.jpg");
		    		param += "&visitTitle="+name+"&customerFields="+JSON.stringify(obj)+"&abstract_info=如需要咨询产品相关信息，请发送给客服";
		    		param += "&thumbnail_info="+imgUrl+"&title_info="+name+"&realname="+name;
		    	}
    			location.assign('http://www.sobot.com/chat/h5/index.html?sysNum=cf3347dac6344e71abd5592bd2ee2184&'+param);
	        }
	    },
	}
</script>

<style>
	.lxkf{position: fixed;right: 0;bottom: 20%;height: 112px;margin-top: -56px;z-index: 8;}
	.lxkf img{height: 100% !important;width: auto !important;}
</style>