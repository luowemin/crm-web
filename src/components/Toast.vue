<template>
	<transition name="fade" mode="out-in">
		<div v-show="showToast" class="toast">
			<span>{{msg}}</span>
		</div>
	</transition>
</template>

<script>
	export default{
		data(){
			return {
				msg:'',
				showToast:false
			};
		},
		methods:{
			show(msg,time){
				var vm = this;
				vm.showToast = true;
				vm.msg = msg || '';
				setTimeout(() => {
					vm.showToast = false;
					vm.showToast = '';
				},time || 3000);
			},
		},
	}
</script>

<style lang='less'>
	.fade-enter-active,
	.fade-leave-active {
		transition: all .2s ease;
	}
	
	.fade-enter,
	.fade-leave-active {
		opacity: 0;
	}
	.toast{
		position: fixed;
		bottom: 50%;
		left: 0;right: 0;color: white;
		z-index: 100;text-align: center;
		span{
			background-color: black;
			opacity: 0.8;
			display: inline-block;
			padding: 15px;
			border-radius: 5px;
			max-width: 80%;
			word-break:break-word;
			font-size: 1.6rem;
		}
	}
</style>