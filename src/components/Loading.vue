<template>
	<div v-show="showLoading" class="loading-layer">
		<div class="sk-wave">
			<div class="sk-rect sk-rect1"></div>
			<div class="sk-rect sk-rect2"></div>
			<div class="sk-rect sk-rect3"></div>
			<div class="sk-rect sk-rect4"></div>
			<div class="sk-rect sk-rect5"></div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'loading',
		data() {
			return {
				showLoading: true,
			}
		},
		methods: {
			show() {
				this.showLoading = true;
			},
			hide() {
				this.showLoading = false;
			}
		}
	}
</script>

<style>
	.loading-layer{
		position: fixed;
		top: 0;bottom: 0;
		right: 0;left: 0;
		z-index: 100;
		background-color: rgba(255,255,255,0.8);
	}
	.sk-wave {
		position: absolute;
		top: 50%;left: 50%;
		margin: -2rem 0 0 -2.5rem;
		width: 5rem;
		height: 4rem;
		text-align: center;
		font-size: 1rem;
	}
	
	.sk-wave .sk-rect {
		background-color: #FE9F1B;
		height: 100%;
		width: .6rem;
		display: inline-block;
		-webkit-animation: sk-waveStretchDelay 1.2s infinite ease-in-out;
		animation: sk-waveStretchDelay 1.2s infinite ease-in-out;
	}
	
	.sk-wave .sk-rect1 {
		-webkit-animation-delay: -1.2s;
		animation-delay: -1.2s;
	}
	
	.sk-wave .sk-rect2 {
		-webkit-animation-delay: -1.1s;
		animation-delay: -1.1s;
	}
	
	.sk-wave .sk-rect3 {
		-webkit-animation-delay: -1s;
		animation-delay: -1s;
	}
	
	.sk-wave .sk-rect4 {
		-webkit-animation-delay: -0.9s;
		animation-delay: -0.9s;
	}
	
	.sk-wave .sk-rect5 {
		-webkit-animation-delay: -0.8s;
		animation-delay: -0.8s;
	}
	
	@keyframes sk-waveStretchDelay {
		0%,
		40%,
		100% {
			-webkit-transform: scaleY(0.4);
			transform: scaleY(0.4);
		}
		20% {
			-webkit-transform: scaleY(1);
			transform: scaleY(1);
		}
	}
</style>