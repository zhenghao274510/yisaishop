<template>
	<view class="mask" v-show="pickerShow" @click.stop="hidden">
		<view class="mask">

		</view>
		<view class="yaoqing-content" @click.stop='makeqrcode'>

			<canvas canvas-id="qrcode" ref='qrcode' class="qrcode-img"></canvas>
		</view>

	</view>
</template>

<script>
	import uQRCode from '@/common/js/uqrcode.js'
	export default {
		props: {
			complineId: ''
		},
		data() {
			return {
				pickerShow: false,
				id:''
			}
		},
		watch:{
			complineId(n){
				this.id=n;
				this.makeqrcode();
			}
		},
		methods: {
			open() {
				this.pickerShow = true;
			},
			makeqrcode(){
				uQRCode.make({
					canvasId: 'qrcode',
					componentInstance: this,
					text: this.id,
					size: 190,
					margin: 10,
					backgroundColor: '#ffffff',
					foregroundColor: '#000000',
					fileType: 'jpg',
					errorCorrectLevel: uQRCode.errorCorrectLevel.H,
					success: res => {}
				})
			},
			hidden() {
				this.pickerShow = false;
			},
		}
	}
</script>

<style scoped>
	.qrcode-img {
		width: 190px;
		height: 190px;
	}

	.mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 99;
		background: rgba(0, 0, 0, .3);
		z-index: 9999;
	}

	.yaoqing-content {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #FFFFFF;
		border-radius: 20upx;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 40rpx;
		box-sizing: border-box;
		z-index: 99999;
	}
</style>
