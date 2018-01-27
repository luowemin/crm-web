<template>
	<div v-if="show" class="wx-mask-layer">
		<div class="wx-bind">
			<span @click="show=false" class="wx-bind-close"></span>
			<div class="wx-bind-title">{{title}}</div>
			<div class="wx-bind-line top">
				<input type="number" v-model="phone" class="wx-bind-phone" placeholder="请输入手机号码" />
				<button @click="sendCode" class="wx-bind-code" :class="{'wx-bind-disabled':disableCode}">{{btnCode}}</button>
			</div>
			<div class="wx-bind-line">
				<input v-model="code" type="number" placeholder="请输入短信验证码" />
			</div>
			<button @click="submitPhone" class="wx-bind-submit" :class="{'wx-bind-disabled':disableConfirm}">{{codeType === 1?'登陆':'立刻绑定'}}</button>
			<div class="wx-bind-call">
				<span>客服热线：</span>
				<a href="tel:4006836080">400-683-6080</a>
			</div>
		</div>
	</div>
</template>

<script>
	import $ from '@/assets/js/zepto'
	var reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
	export default {
		data(){
			return {
				title:'',
				show:false,
				btnCode:'发送验证码',
				disableCode:false,
				disableConfirm:true,
				intervalTime:60,
				phone:'',
				code:'',
				codeType:1,//1-登陆，2-绑定手机号
			};
		},
		methods:{
			showLogin(){//h5环境下
				this.codeType = 1;
				this.title = '手机登陆';
				this.show = true;
			},
			showBind(){//微信环境下
				this.codeType = 2;
				this.title = '绑定手机号';
				this.show = true;
			},
			checkCare(call){//微信环境下
				var openId = this.$info.openId;
				var vm = this;
				$.ajax({
					url:"/wechat-propagate-back/user/subscribe",
					data:{openId:openId},
					success:function(data){
						var hasCare = (data.status == 0);
						if(typeof call == "function"){
							call(hasCare);
						}
					},
					error:function(){
						vm.$toast("网络或服务器异常");
					}
				});
			},
			checkBind(call){//微信环境下
				var openId = this.$info.openId;
				var vm = this;
				$.ajax({
					url:"/wechat-propagate-back/user/bind",
					data:{openId:openId},
					success:function(data){
						var hasBind = (data.status == 0);
						if(typeof call == "function"){
							call(hasBind);
						}
						if(!hasBind){//未绑定手机号提示绑定手机号
							vm.showBind();
						}
					},
					error:function(){
						vm.$toast("网络或服务器异常");
					}
				});
			},
			sendCode(){
				var phone = this.phone;
				if(!reg.test(phone)){
					this.$toast("请输入正确的手机格式！");
					return;
				}
				this.disableCode = true;
				var tick = this.intervalTime;
				this.btnCode = "重新发送("+tick+")";
				var vm = this;
				var timer = setInterval(() => {
					tick--;
					this.btnCode = "重新发送("+tick+")";
					if(tick === 0){
						clearTimer();
					}
				},1000);
				var clearTimer = () => {
					vm.disableCode = false;
					vm.btnCode = "发送验证码";
					clearInterval(timer);
				}
				if(this.codeType === 1){
					$.ajax({
						type:"get",
						url:"/app/information/webLoginSendSMS?mobile="+phone,
						dataType:'json',
						success:function(data){
							var msgCode = data.msgCode;
							if(msgCode == 0){
								vm.disableConfirm = false;
							}else{
								vm.$toast(data.msgInfo);
								clearTimer()
							}
						},
						error:function(){
							vm.$toast('网络或服务器异常');
							clearTimer()
						}
					});
				}else{
				 	var openId = this.$info.openId;
					$.ajax({
						url:"/app/information/getUpdateMobileCheckCode",
						type:"post",
						data:{openId:openId,phoneNo:phone},
						success:function(data){
							console.log(data);
							var msgCode = data.msgCode;
							if(msgCode == 0){
								vm.disableConfirm = false;
							}else if(msgCode == 1006){
								vm.$toast(data.msgContent);
								clearTimer()
							}
						},
						error:function(){
							vm.$toast('网络或服务器异常');
							clearTimer()
						}
					});
				}
			},
			submitPhone(){
				var phone = this.phone;
				if(!reg.test(phone)){
					this.$toast("请输入正确的手机格式！");
					return;
				}
				var code = this.code;
				if(!code){
					this.$toast("请输入短信验证码！");
					return;
				}
				if(this.codeType === 1){
					this.login();
				}else{
					this.bindPhone();
				}
			},
			bindPhone(){//微信环境下绑定手机号
				var openId = this.$info.openId;
				var phoneNo = this.phone;
				var checkCode = this.code;
				var vm = this;
				$.ajax({
					type:"post",
					url:"/app/information/updateMobileByCheckCode",
					data:{openId,phoneNo,checkCode},
					dataType:"json",
					success:function(data){
						console.log(data);
						var msgCode = data.msgCode;
						if(msgCode == 0){
							this.$browser.requestOauth();
//							data.codeType = 2;
//							vm.$emit('checkSuccess',data);
//							vm.show = false;
						}else if(msgCode == 1006){
							vm.$toast(data.msgContent);
						}
					},
					error:function(){
						vm.$toast("网络或者服务器异常!");
					}
				});
			},
			login(){//h5环境登陆
				var vm = this;
				var mobile = this.phone;
				var checkCode = this.code;
				$.ajax({
					type:"post",
					url:"/app/information/webLogin",
					data:{mobile,checkCode},
					success:function(data){
						if(data.msgCode == 0){
							var cusId = data.resultInfo && data.resultInfo.customerId
							var openId = data.resultInfo && data.resultInfo.openId
							vm.$browser.setCookie('customerId',cusId,30);
							if(openId){
								vm.$browser.setCookie('openId',openId,30);
							}
							location.reload();
//							data.codeType = 1;
//							vm.$emit('checkSuccess',data);
//							vm.show = false;
						}else{
							vm.$toast(data.msgInfo);
						}
					},
					error:function(e){
						vm.$toast('网络或服务器异常');
					}
				});
			}
		}
	}
</script>

<style>
.wx-mask-layer{
	position: fixed;
	top: 0;bottom: 0;
	left: 0;right: 0;
	background-color: rgba(0,0,0,0.6);
	z-index: 10;
}
.wx-mask-layer *{
	-webkit-appearance:none;  border:none; outline:none;
}
.wx-bind{
	width: 90%;
	background-color: white;
	border-radius: 5px;
	height: 26rem;
	position: absolute;
	top: 50%;left: 50%;
	margin: -13rem 0 0 -45%;
	box-sizing: border-box;
	padding:2.5rem 1rem;
}
.wx-care-close,.wx-bind-close{
	position: absolute;
	top: .5rem;
	right: .5rem;
	width: 2.5rem;
	height: 2.5rem;
	background-image: url("http://7xv1io.com1.z0.glb.clouddn.com/close.png");
	background-size: 100% 100%;
}
.wx-bind-title{text-align: center;font-size: 1.8rem;font-weight: bold;margin: 1rem 0;}
.wx-bind-line{
	height: 4rem;line-height: 4rem;background-color: white;
	border-bottom: 1px solid #DCDCDC;
}
.wx-bind-line.top{
	border-top: 1px solid #DCDCDC;
}
.wx-bind-line input{height:3.5rem;font-size: 1.6rem;width: 100%;padding: 0;}
.wx-bind-phone{width: 63% !important;float: left;}
.wx-bind-code{
	float: right;height:3.4rem;max-width: 12rem;width:35%;
	margin:.3rem 0;border-radius: .5rem;background-color: #FF6600;color: white;
	font-size: 1.4rem;padding: 0;
}
.wx-bind-submit{
	border-radius: .5rem;background-color: #FF6600;color: white;display: block;width: 90%;
	margin: 1.5rem auto;padding: 1rem 0;font-size: 1.8rem;
}
.wx-bind .wx-bind-disabled{
	pointer-events: none;background-color: #DBDBDB !important;
}
.wx-bind-call{text-align: center;color: #CFCCC2;font-size: 1.4rem !important;}
.wx-bind-call a{display: inline !important;}
</style>