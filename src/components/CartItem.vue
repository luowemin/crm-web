<template>
	<table class="product-item">
		<tr>
			<td v-if="showCheck" class="check">
				<span class="check-box" :class="{active:data.isCheck}" @click="triggerCheck(data)"></span>
			</td>
			<td class="pro_icon">
				<img :src="data.icon" alt="" />
				<img v-if="isGift" class="gift-img" src="http://7xv1io.com1.z0.glb.clouddn.com/product/image/zeng-pin.png" alt="" />
			</td>
			<td style="text-align: left;" class="top_padding">
				<div class="product_name">{{data.name}}</div>
				<div class="sub_font">{{data.skuName}}</div>
			</td>
			<td style="text-align: right;width: 3.5rem;" class="top_padding">
				<div class="price_label">￥{{isGift?0:currency(data.price)}}</div>
				<div class="sub_font">X{{isGift?data.num:data.quantity}}</div>
			</td>
		</tr>
		<slot></slot>
		<!--
		<tr>
			<td></td>
			<td></td>
			<td class="operator_num">
				<span @click="minusItem" class="op_down" :class="{disabled:!canMinus}">-</span>
				<span class="op_num">{{data.quantity}}</span>
				<span @click="addItem" class="op_up" :class="{disabled:!canAdd}">+</span>
			</td>
			<td style="text-align: right;">
				<span @click="delItem" v-show="isCheck" class="delete"></span>
			</td>
		</tr>
		-->
	</table>
</template>

<script>
	export default {
		name:'cart-item',
		props:{
			showCheck:{
				type:Boolean,
				default:false,
			},
			isGift:{//是否是赠品项：0-不是，1-是
				type:Boolean,
				default:false
			},
			data:{
				type:Object,
				required:true
			}
		},
		data(){
			return {
				isCheck:true
			};
		},
		methods:{
			currency(num,pre){
				if(num){
					return Math.round(num*100) / 100;
				}else{
					return '';
				}
			},
			triggerCheck(item){
				this.$emit('triggerCheck',item);
			}
		}
	}
</script>

<style>
	.product-item{border-bottom: 1px solid #F3F3F5;text-align: center;width: 100%;}
    	
	.product-item:last-child{border-bottom: none;}
	
	.product-item .check{
		width: 2rem;
		padding-right: 1rem;
	}
	.check-box{
		display: inline-block;
		width: 2rem;
		height: 2rem;
		background: url("http://7xv1io.com1.z0.glb.clouddn.com/product/image/check-icon.png") no-repeat right center /4rem auto;
	}
	.check-box.active{
		background: url("http://7xv1io.com1.z0.glb.clouddn.com/product/image/check-icon.png") no-repeat left center /4rem auto;
	}
	.pro_icon{
		width: 6rem;
		height: 6rem;
		padding: 1rem 1rem 1rem 0;
		position: relative;
	}
	.pro_icon img{
		max-height: 100%;
		max-width: 100%;
	}
	.pro_icon .gift-img{
	    position: absolute;
	    top: 0;
	    left: 0;
	    height: 2rem !important;
	}
	.product-item .delete{
		display: inline-block;
		width: 3rem;
		height: 3rem;
		background: url(http://7xv1io.com1.z0.glb.clouddn.com/product/image/btn_delete.png) no-repeat center/3rem auto;
	}
	.sub_font{
		font-size: 1.4rem;color: gray;
		margin-top: 1rem;
	}
	.product_name{
		font-size: 1.6rem;
	}
	.price_label{
		color: red;
		font-size: 1.6rem;
	}
	.top_padding{
		vertical-align: top;
		padding-top: 1rem;
		/*padding-right: 10px;*/
	}
	/*.operator_num{
		padding: 1rem 0;
	}
	.operator_num span.disabled{
		pointer-events: none;
		color: #D4D4D4;
		border-color: #D4D4D4;
	}
	.operator_num span{
		float: left;
		height: 30px;
		line-height: 30px;
		width: 30px;
		font-size: 20px;
		text-align: center;
		border: 1px solid gray;
		transition: 0.3s;
	}
	.operator_num .op_down{
		border-radius: 4px 0 0 4px;
	}
	.operator_num .op_up{
		border-radius:0 4px 4px 0;
	}
	.operator_num .op_num{
		width: 40px;
		border-width: 1px 0;
	}
	.operator_num .op_down:active,.operator_num .op_up:active{
		background-color: gray;
	}*/
		
</style>