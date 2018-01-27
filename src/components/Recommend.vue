<template>
	<div v-if="recommeds.length>0" class="pro_container">
    	<div class="rec-title">
	    	<div class="abs_line"></div>
	    	<div class="product_rec">猜你喜欢</div>
	    </div>
		<div v-for="item in recommeds" class="pro_item">
			<a :href="goDetail(item.productTemplateid)">
			<div class="pro_item_bg">
				<div class="img">
					<img :src="item.imageUrl" alt="">
				</div>
				<div class="pro_name">{{item.productTemplateName}}</div>
				<div class="pro_price">￥{{item.minPrice}}</div>
				<div style="font-size: 1.2rem;color: gray;font-weight: normal;">销量：{{item.sold}}</div>
			</div>
			</a>
		</div>
	</div>
</template>

<script>
	import $ from '@/assets/js/zepto'
	export default {
		props:{
			tplIds:{
				type:Array,
				required:true
			},
		},
		data(){
			return {
				recommeds:[]
			};
		},
		created(){
			this.getRecommendData();
		},
	    methods: {
	        getRecommendData() {
	        	var pIds = this.tplIds;
	    		var vm = this;
	    		$.ajax({
	    			type:"post",
	    			url:"/wechat-shop-back/product/info/productPushList",
	    			data:JSON.stringify(pIds),
	    			contentType:'application/json',
	    			success:function(data){
	    				if(data.status ==0){
	    					vm.recommeds = data.data;
	    				}
	    			},
	    		});
	        },
	        goDetail(tplId){
	        	return "productDetail.html?pId="+tplId+"&_appid=android&_adTag=wx&_campaign=guanlianxs3.3";
	        }
	    },
	}
</script>

<style>
	.pro_container{
		font-size: 1.6rem;
		padding: 0 .5rem 1rem .5rem;
		overflow: auto;
		background: #EFEFEF;
	}
	.rec-title{
		position: relative;z-index: 1;text-align: center;padding: 1rem 0;
	}
	.pro_container a{
		text-decoration: none;
	}
	.pro_item{
		width: 50%;
		box-sizing: border-box;
		float: left;
		padding: .5rem;
	}
	.pro_item_bg{
		background: white;
		border-radius: .3rem;
		padding: .6rem;
		position: relative;
	}
	.img{
		width: 100%;
		height: 16rem;
		text-align: center;
	}
	.img img{
		max-height: 100%;
		max-width: 100%;
	}
	.abs_line{
		position: absolute;top: 50%;left: 2rem;right: 2rem;border-top: 1px solid #d2d2d2;
	}
	.product_rec{
		display: inline-block;
		padding: 1rem 2.5rem;
		color: #757575;
		background-color: #EFEFEF;
		position: relative;
		z-index: 1;
	}
	.pro_name{
		padding-top: 1rem;
		color: #111;
		overflow: hidden;
		white-space:nowrap; 
	}
	.pro_price{
		font-size: 2rem;
		color: #FB1115;
		padding: .5rem 4.5rem .5rem 0;
		font-weight: bold;
	}
</style>