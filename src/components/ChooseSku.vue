<template>
	<transition name="slide-bottom" mode="out-in">
		<div v-show='show' transition="slide" class="quantity-bg">
			<div class="quantity-container">
				<div class="quantity-info">
					<span class="quantity-info-close" @click="colseSku"></span>
					<div class="quantity-info-img"><img :src="icon" /></div>
					<div class="">
						<div v-show="actType !==6" class="quantity-info-price">￥{{skuPrice}}</div>
						<div v-show="actType ===6">
							<font color="red">预付款：￥{{curSKU.prePrice?curSKU.prePrice:product.prePrice}}</font>
							<div>总价：￥{{skuPrice}}</div>
						</div>
						<div class="quantity-info-text">库存:{{curSKU.stock>0?curSKU.stock:product.stock}}</div>
						<div class="quantity-info-text">{{curSKU.skuName?"已选:"+curSKU.skuName:"请选择分类"}}</div>
					</div>
				</div>
				<div class="quantity-info">
					<div class="quantity-info-text">规格</div>
					<div class="list_suk">
						<div v-for="pro in product.products" class="suk-item">
							<span :class="{active:curSKU.id==pro.id,disabled:pro.stock<=0}" @click="setSKU(pro)">{{pro.skuName}}</span>
						</div>
					</div>
				</div>
				<div class="quantity-info">
					<div class="operator_label">
						<div>购买数量</div>
						<div v-show="showLimitNum()">限购：{{showLimitNum()}}</div>
					</div>
					<div class="operator_num">
						<span @click="addNum" class="op_up" :class="{disabled:!canAddq}">+</span>
						<span class="op_num">{{quantity}}</span>
						<span @click="minusNum" class="op_down" :class="{disabled:!canMinus}">-</span>
					</div>
				</div>
				<div @click='quantityOk' class="quantity-btn" :class="{disabled:product.stock<=0}">确定</div>
			</div>
		</div>
	</transition>
</template>

<script>
	export default {
		name: 'choose-sku',
		props:{
			actType:{//0正常销售，1秒杀未开始，2秒杀进行中，3秒杀结束，4限时折扣，5预付款未开始，6预付款未进行中，7预付款已结束,8团购
				type:Number,
				default:0
			},
			product:{
				type:Object,
				required:true
			},
			show:{
				type:Boolean,
				default:false
			},
			operationType:{//0-加入购物车，1-立即购买，2-拼团购买
				type:Number,
				required:true
			}
		},
		data() {
			return {
				curSKU:{},
				quantity:1,
			}
		},
		watch:{
			show(n){
				if(n){
					var h = $(window).height();
					$('body').css({'height':h,'overflow':'hidden'});
					var products = this.product.products;
					if(products && products.length === 1){
						if(products[0].stock > 0){
							this.curSKU = products[0];
						}
					}
				}else{
					$('body').removeAttr('style');
				}
			}
		},
		computed:{
			canMinus:function(){
				var num = this.quantity;
				if(num<=1){
					return false;
				}else{
					return true;
				}
			},
			canAddq:function(){
				var groupId = this.product.productGroupId;
				var stock = this.curSKU.stock;
				var maxLimit = this.curSKU.purchaseLimitQuantity || 100;
				stock = Math.min(stock,maxLimit);
				var type = this.operationType;
				
//				if(this.actType === 2){
//					stock = Math.min(stock,this.secNum);
//				}
//				if(this.actType === 8 && type === 2){
//					stock = Math.min(stock,this.secNum);
//				}
				var sId = this.curSKU.id;
				var cartNum = this.$shopCart.getProductNum(sId);
				var num = this.quantity;
				if(type === 0){
					if((cartNum+num) >= stock){
						return false;
					}else{
						return true;
					}
				}else if(type === 1){
					if(num >= stock){
						return false;
					}else{
						return true;
					}
				}
			},
			skuPrice:function(){
				var sukId = this.curSKU.id;
				var price = this.curSKU.price;
				if(price || price == 0){
					return price
				}else{
					return this.product.price
				}
//				return price || ;
//				if(this.isSeckill === 8 && this.isGroupBuy){//显示团购价
//					if(sukId){
//						return groupMap[sukId].purchasePrice;
//					}else{
//						return this.groupPrice;
//					}
//				}else if(this.isSeckill === 2){//显示秒杀价
//					if(sukId){
//						return killMap[sukId].buyNowPrice;
//					}else{
//						return this.killPrice;
//					}
//				}else{
//					var price = this.curSKU.price;
//					return price || this.product.price;
//				}
			},
			icon(){
				var imgs = this.product.groupedImages;
				if(imgs && imgs.icon){
					return imgs.icon[0].imageUrl;
				}else{
					return "";
				}
			},
			
		},
		methods: {
			colseSku(){
				this.quantity = 1;
				this.curSKU = {};
				this.$emit('closeSku');
			},
			showLimitNum(){
				if(this.actType === 8 && this.operationType === 2){
					return this.secNum;
				}else{
					return this.curSKU.purchaseLimitQuantity;
				}
			},
			setSKU(sku){
				if(sku.stock <= 0){
					this.$toast('库存不足！');
					return;
				}
				this.quantity = 1;
				this.curSKU = sku;
			},
			addNum:function(){
				if(!this.curSKU.id){
					this.$toast("请选择产品规格");
					return;
				}
				if(!this.canAddq){
					return;
				}
				this.quantity++;
			},
			minusNum:function(){
				if(!this.curSKU.id){
					this.$toast("请选择产品规格");
					return;
				}
				if(!this.canMinus){
					return;
				}
				this.quantity--;
			},
			quantityOk(){
				if(!this.curSKU.id){
					this.$toast("请选择产品规格");
					return;
				}
				this.$emit('closeSku');
				if(this.quantity === 0){
					return;
				}
				var type = this.operationType;
				var product = this.product;
				var sku = this.curSKU;
				var param = {};
				param.icon = product.groupedImages.icon && product.groupedImages.icon[0].imageUrl;
				if(this.actType === 6){//预付款
					param.price = sku.prePrice;
				}else if(this.actType === 8 && type === 2){//团购价
					param.price = sku.groupPrice;//groupMap[sku.id].purchasePrice;
				}else if(this.isSeckill === 2){//秒杀价
					param.price = sku.secPrice;//killMap[sku.id].buyNowPrice;
				}else{
					param.price = sku.price;
				}
				param.skuName = sku.skuName;
				param.name = product.productTemplateName;
				param.stock = sku.stock;
				param.transportFee = sku.transportFee;
				param.productId = sku.id;
				param.productTemplateId = sku.productTemplateId;
				param.warehouseCode = product.warehouseCode;
				param.quantity = this.quantity;
				param.integralStatus = product.integralStatus;
				if(type === 0){
					var flag = this.$shopCart.addCart(param);
					if(flag){
						this.$emit('addCartNum',this.quantity);
//						this.cartTotal = this.cartTotal + this.quantity;
					}
					this.quantity = 1;
					setTimeout("saveShoppingCartTrack('addCart')",0);
				}else{
//					var canBuySec = wxOauth.getCookie('canBuySec');
//					var isSec = me.seckillId;
//					if(isSec > 0&& canBuySec && canBuySec=='false'){
//						$("#loading").css('display','block');
//						toast.toast("正在努力为您挤入结算页面",5000);
//						setTimeout(function(){
//							$("#loading").css('display','none');
//							toast.toast("被别人挤出来了-_-，再来试试");
//						},5000);
//						return;
//					}
					
					this.$shopCart.setBuyNow([param]);
					var referr = "";
					var referrOpenId = this.$browser.getURLParameter('refer_openId');
					if(referrOpenId){
						referr = "&refer_openId="+productInfo.referrOpenId;
					}
					if(this.actType === 2){
						var isSec = product.buyNow.id;
						referr = "&seckillId="+isSec; 
					}
					if(this.actType === 6){
						referr = "&yfk="+this.product.presell.id;
						//TODO 保存预付款数据到本地
						var preData = {};
						preData.lastPrice = (sku.price - param.price)*this.quantity;
						preData.startTime = me.preStartLabel;
						preData.endTime = this.preEndLabel;
						preData.prePrice = param.price * this.quantity;
						localStorage.setItem('preData',JSON.stringify(preData));
					}
					if(this.actType === 8 && type === 2){
						var groupPurchaseId = this.groupPurchaseId;
						referr = '&groupPurchaseId='+groupPurchaseId;
					}
					if(sku.fqfh){
						referr = '&fqfh='+sku.fqfh;
					}
					var webStatParam = location.search.substr(1);
	    			if(webStatParam){
	    				referr += "&"+webStatParam;
	    			}
    				window.location.href = "payOrder.html?productId="+param.productId+"&v=3"+referr;
				}
			}
		},
	}
</script>

<style>
	.slide-bottom-enter .quantity-container,
	.slide-bottom-leave-active .quantity-container{
		transform: translateY(100%);
	}
	.quantity-bg{
		position: fixed;
		top: 0;bottom: 0;
		left: 0;right: 0;
		background-color: rgba(0,0,0,0.6);
		transition: 0.3s;
	    z-index: 10;
	}
	.quantity-container{
		background-color: white;
		position: absolute;
		bottom: 0;
		width: 100%;
		transition: 0.3s;
	}
	.quantity-info{
		margin: 0 1rem;
		padding: 1rem 0;
		overflow: auto;
		position: relative;
		border-bottom: 1px solid #DCDCDC;
	}
	.quantity-info-img{
		width: 10rem;
		height: 10rem;
		float: left;
		margin-right: 1rem;
	}
	.quantity-info-img img{
		max-width: 100%;
		max-height: 100%;
	}
	.quantity-info-price{
		height: 4rem;
		font-size: 2.4rem;
		color: red;
	}
	.quantity-info-text{
		font-size: 1.6rem;
		color: gray;
		height: 3rem;
		line-height: 3.5rem;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.quantity-info-close,.colse_price span{
		position: absolute;
		top: 1rem;
		right: 0;
		width: 2.5rem;
		height: 2.5rem;
		background: url(http://7xqiu3.com1.z0.glb.clouddn.com/btn_store_close.png) no-repeat center/2.5rem 2.5rem;
	}
	.list_suk{
		overflow: auto;
	}
	.suk-item{
		float: left;
		margin: 0 1rem 1rem 0;
		/*border: 1px solid red;*/
	}
	.suk-item span{
		float: left;
		margin: 0 1rem 1rem 0;
		display: block;
		text-align: center;
		margin-bottom: 1rem;
		padding: .5rem 1.5rem;
		border-radius: .5rem;
		border: 1px solid black;
		transition: 0.3s;
	}
	.suk-item span.active{
		color: white;
		background: #FF461D;
		border-color: #FF461D;
	}
	.suk-item span.disabled,.operator_num span.disabled{
		color: #D4D4D4;
		border-color: #D4D4D4;
	}
	.operator_num span.disabled{
		pointer-events: none;
	}
	.operator_label{
		height: 5rem;
		float: left;
		color: gray;
		padding: 1.5rem 0;
	}
	.operator_num{
		height: 4rem;
		line-height: 4rem;
		padding: 1.5rem 0;
	}
	.operator_num span{
		float: right;
		height: 4rem;
		width: 4rem;
		font-size: 2.4rem;
		text-align: center;
		border: 1px solid gray;
		transition: 0.3s;
	}
	.operator_num .op_down{
		border-radius: .6rem 0 0 .6rem;
	}
	.operator_num .op_up{
		border-radius:0 .6rem .6rem 0;
	}
	.operator_num .op_num{
		width: 5rem;
		border-width: 1px 0;
	}
	.operator_num .op_down:active,.operator_num .op_up:active{
		background-color: gray;
	}
	.quantity-btn{
	    padding: 1.5rem 0;
	    text-align: center;
	    color: white;
	    background-color: #FF491D;
	}
	.quantity-btn.disabled{
		color: white;
		border-color: #D4D4D4;
		pointer-events: none;
	    background-color: #CCCCCC !important;
	}
</style>