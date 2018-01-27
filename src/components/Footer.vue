<template>
	<div class="footerTab">
		<div class="hysp" :class="{active:activeIndex==0}" @click="goPage('productIndex.html',0)">
			<b></b><span>商城</span>
		</div>
		<div class="feinei" :class="{active:activeIndex==1}" @click="goPage('productList.html?_campaign=chanpinfenlei',1)">
			<b></b><span>分类</span>
		</div>
		<div class="family" @click="goPage('myCart.html',2)">
			<b><span v-show="cartTotal>0" class="cart-num">{{cartTotal}}</span></b><span>购物车</span>
		</div>
		<div class="grzx" @click="goPage('orderList.html',3)">
			<b></b><span>我的订单</span>
		</div>
	</div>
</template>

<script>
	export default {
		props:{
			activeIndex:{
				required:true
			},
			cartTotal:{
				type:Number,
				default:0
			}
		},
		methods:{
			goPage(link,index){
				if(this.activeIndex == index){
					return;
				}
				location.assign(link);
			}
		}
	}
</script>

<style>
	.footerTab{position:fixed;bottom:0;z-index:5;height:6rem;width:100%;border-top:1px solid #E2E3DC;background:#fff;display:-webkit-box;text-align: center;font-size: 1.6rem !important;}
	.footerTab a{color:#9A9A9A;}
	.footerTab div{-webkit-box-flex:1;width:30%;}
	.footerTab div b{display:block;margin:0.6rem auto 0.5rem;}
	.footerTab div span{color:#9A9A9A;}
	.footerTab .family b{position:relative;width:2.6rem;height:2.6rem;background:url(http://7xv1io.com1.z0.glb.clouddn.com/product/image/btn_bottom_shopping_cart_1.png) no-repeat;background-size:100% 100%;}
	.footerTab .hysp b{width:2.6rem;height:2.6rem;background:url(http://7xv1io.com1.z0.glb.clouddn.com/memberXb-btn_bottom_store_1.png) no-repeat;background-size:100% 100%;}
	.footerTab .grzx b{width:2.6rem;height:2.6rem;background:url(http://7xv1io.com1.z0.glb.clouddn.com/memberXb-btn_bottom_personal_center_1.png) no-repeat;background-size:100% 100%;}
	.footerTab .feinei b{width:2.6rem;height:2.6rem;background:url(http://7xv1io.com1.z0.glb.clouddn.com/memberXb-btn_bottom_classify_1.png) no-repeat;background-size:100% 100%;}
	.footerTab .hysp.active b{width:2.6rem;height:2.6rem;background:url(http://7xv1io.com1.z0.glb.clouddn.com/memberXb-btn_bottom_store_2.png) no-repeat;background-size:100% 100%;}
	.footerTab .grzx.active b{width:2.6rem;height:2.6rem;background:url(http://7xv1io.com1.z0.glb.clouddn.com/memberXb-btn_bottom_personal_center_2.png) no-repeat;background-size:100% 100%;}
	.footerTab div.active span{color:#FE9F1B;}
	.cart-num{
		position: absolute;
	    top: -5px;
	    right: -5px;
	    background-color: red;
	    width: 20px;
	    height: 20px;
	    color: white !important;
	    line-height: 20px;
	    border-radius: 50%;
	    text-align: center;
	    font-size: 1.4rem;
	}
</style>