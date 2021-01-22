<template>
	<view class="mask" v-show="pickerShow" @click.stop="close">
		<view class="mask">
	
		</view>
		<view class="yaoqing-content">
			<image class="pic" :src="openCouponGood.productImage" @click.stop="userOptions"></image>
		</view>
	
	</view>
</template>

<script>

	export default {
		data() {
			return {
				openCouponGood: {},
				pickerShow:false
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			init() {
				this.openCouponGood = uni.getStorageSync('openCoupon');
				console.log(this.openCouponGood )
				this.open();
			},
			userOptions(){
				this.close();
				this.$api.navTo(`/pages/details/goodsDetails?id=${this.openCouponGood.productId}&type=${this.openCouponGood.type}`)
			},
			open() {
				this.pickerShow=true;
			},
			close() {
				this.pickerShow=false;
			}
		}
	}
</script>

<style scoped lang="scss">
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
	.pic {
		width: 530rpx;
		height: 600rpx;
	}

	.icon-close {
		padding: 20rpx 40rpx;
		margin-top: 20rpx;
		font-size: 48rpx;
		color: #fff;
	}
</style>
