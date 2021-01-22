<template>

	<view class="cart-nothing" v-if="isShow==2">
		<view class="cart-icon">
			<image src="/static/img/weikaitongimg.png" mode="" class="empty-img"></image>
			<view class="empty-text">
				抱歉您所在的城市未开通
			</view>
		</view>
	<!-- 	<navigator url='/pages/public/distributionMode'  class="empty-to" v-if="noLocation">
			选择其他自提点
		</navigator> -->
		<view class="empty-to" @click="toDo" >
			去伊赛主商城的城市购买商品
		</view>
		
	</view>
</template>

<script>
	export default {
		props: {
			isShow: {
				type: [Number,String],
				default: '1'
			},
			noLocation:{
				type:Boolean,
				default: false
			}
		},
		methods: {
			toDo() {
				uni.setStorageSync('open', '2');
				uni.setStorageSync('merchantId', '0')
				this.$api.reLaunch(`/pages/tabs/index`)
			}
		}

	}
</script>

<style lang="scss" scoped>
	.cart-nothing {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}

	.empty-img {
		width: 401upx;
		height: 254upx;
	}

	.empty-text {
		height: 54upx;
		font-size: 28upx;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		line-height: 54upx;
		margin: 50upx;
	}

	.empty-to {
		height: 54upx;
		font-size: 30upx;
		font-weight: bold;
		color: #007030;
		line-height: 54upx;
		text-align: center;
	}
</style>
