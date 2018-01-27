<template>
	<div class="select-panel">
		<div class="panel-title">地址选择<span @click="close"></span></div>
		<div class="select-header">
			<div :class="{active:curType===0}">
				<span @click="goProvince">{{curPro.regionName?curPro.regionName:'省'}}</span>
			</div>
			<div :class="{active:curType===1}">
				<span @click="goCity">{{curCity.regionName?curCity.regionName:'市'}}</span>
			</div>
			<div :class="{active:curType===2}">
				<span>{{curDist.regionName?curDist.regionName:'区县'}}</span>
			</div>
		</div>
		<div class="select-pages">
			<div class="page-item1" @touchstart.stop="touchStart">
				<div class="select-city-item" v-for="item in listItem" @click="setSelectItem(item)">{{item.regionName}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	import $ from '@/assets/js/zepto'
	var addressCache;
	export default {
		name:'choose-address',
		props:{
			curAddress:{
				type:Object
			}
		},
		data(){
			return {
				curType:0,//0-省份，1-城市，2-区域
				curPro:{},
				curCity:{},
				curDist:{},
				list:[]
			};
		},
		computed:{
			listItem(){
				if(this.curType === 0){
					return this.list;
				}else if(this.curType === 1){
					return this.curPro.subRegions;
				}else{
					return this.curCity.subRegions;
				}
			}
		},
		watch:{
			curAddress(n,o){
				this.curPro = n.province || {};
				this.curCity = n.city || {};
				this.curDist = n.district || {};
			},
		},
		created(){
			this.getSelectData();
		},
		methods:{
			close(){
				this.$emit('close')
			},
			touchStart(){},
			getSelectData(){
				var vm = this;
				$.get("/shop-web/static/json/normalRegion.json",function(data){
					vm.list = data;
				});
			},
			setSelectItem(item){
				var t = this.curType;
				if(t === 0){
					this.curPro = item;
					this.curType = 1;
				}else if(t === 1){
					this.curCity = item;
					this.curType = 2;
				}else if(t === 2){
					this.curDist = item;
					this.curType = 0;
					var {regionName,id} = this.curPro;
					var province = {regionName,id};
					var {regionName,id} = this.curCity;
					var city = {regionName,id};
					var {regionName,id} = this.curDist;
					var district = {regionName,id};
					var address = {
						province,
						city,
						district
					};
					this.$emit('setAddress',address);
					this.$emit('close');
				}
			},
			goProvince(){
				this.curType = 0;
				this.curPro =  {};
				this.curCity = {};
				this.curDist = {};
			},
			goCity(){
				if(this.curType <= 1) return;
				this.curType = 1;
				this.curCity = {};
				this.curDist = {};
			}
		}
	}
</script>

<style>
	.panel-title{
		height: 4rem;
		line-height: 4rem;
		font-size: 1.6rem;
		text-align: center;
		position: relative;
	}
	.panel-title span{
		position: absolute;
		top: 1rem;
		right: 1rem;
		width: 2rem;
		height: 2rem;
		background: url(http://7xqiu3.com1.z0.glb.clouddn.com/btn_store_close.png) no-repeat center/2rem 2rem;
	}
	.select-panel{
		position: fixed;
		z-index: 10;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: white;
		transition: 0.3s;
	}
	.select-header{
		height: 5rem;
		line-height: 5rem;
		text-align: center;
		border-bottom: 1px solid #DBDBDB;
		font-size: 1.6rem;
		position: relative;
	}
	.select-header>div{
		float: left;width: 33.333%;
		text-align: center;
	}
	.select-header span{
		width: 80%;display: inline-block;
		white-space:nowrap;word-break:keep-all;overflow:hidden;text-overflow:ellipsis;
	}
	.select-header>div.active span{
		border-bottom: 0.2rem solid #FFD11B;
	}
	/*.select-header .active-line{
		position: absolute;
		width: 20%;
		left: 6.5%;
		bottom: 0;
		border-bottom: 0.4rem solid #FFD11B;
		transition: left 0.2s ease-out;
	}*/
	.select-pages{
		position: absolute;
		top: 9rem;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.page-item1{
		height: 100%;
		width: 100%;
		overflow: scroll;
		-webkit-overflow-scrolling : touch;
	}
	.select-city-item{
		font-size: 1.6rem;
		padding: 1.5rem 0 1.5rem 2rem;
		border-bottom: 1px solid #DBDBDB;
		text-align: left;
	}
	.select-city-item:active{
		background-color: #B6B6B6;
	}
</style>