<template>
	<view>
		<view class="icon">
			<image src="/static/img/duihuanchenggong.png"></image>
		</view>
		<view class="tis">
			订单支付成功
		</view>
		<view class="back">
			<view class="btn" @tap="toOrder">查看订单</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:0,
				send_type:1
			};
		},
		onLoad(options) {
			this.type=options.type;
		},
		onShow() {
			this.getUserBuyType();
		},
		methods: {
			getUserBuyType() {
				//  主商城
				if (uni.getStorageSync('open') == 2) {
					this.send_type = 3;
				}
			},
			toOrder() {
				if(this.type=='pay'){
					this.$api.back();
				}else{
					this.$api.redirectTo(`/pages/order/index?id=${this.send_type}`);
				}
			}
		},
	}
</script>

<style lang="scss">
	view {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.icon {
		width: 100%;
		margin-top: 10vw;

		image {
			width: 350upx;
			height:280upx;
		}
	}

	.tis {
		width: 100%;
		margin-top: 20upx;
		font-size: 30upx;
		color: #333333;
		font-weight: bold;
	}

	.pay-amount {
		width: 100%;
		margin-top: 10upx;
		font-size: 32upx;
	}

	.back {
		width: 100%;
		margin-top: 80upx;

		.btn {
			width: 500upx;
			height: 70upx;
			margin:60upx auto 0;
			background-color:#006F2F;
			color: #FFFFFF;
			align-items: center;
			border-radius:36upx;
			font-size: 26upx;
		}
	}
</style>
