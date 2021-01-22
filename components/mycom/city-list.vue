<template>
	<view class="content">
		<view class="bill-item-con" v-for="(v,k) in 2" :key="k">
			<view class="bill-item-top uni-flex d-items-center d-between">
				<view class="bill-item-top-title">
					银基王朝店
				</view>
				<view class="bill-item-bottom">
					1.7km
				</view>
			</view>
			<view class="bill-item-top uni-flex d-items-center d-between">
				<view class=" uni-flex d-items-center">
					<image src="/static/img/shouyedizhi.png" class="icon-img"></image>
					<view class="" style="font-size: 24upx;color: #666666;">
						金水区福元路157号21-24号裙楼房底商
					</view>
				</view>
				<view class="bill-item-bottom">
				</view>
			</view>
			<view class="bill-item-top uni-flex d-items-center d-between">
				<view class=" uni-flex d-items-center">
				</view>
				<view style="font-size: 22upx;color:#007030;">
					查看详情
				</view>
			</view>

		</view>
	</view>
</template>
<script>
	export default {
		props: {
			list: {
				type: Array,
				default () {
					return []
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.icon-img{
		width: 22upx;
		height: 25upx;
		margin-right: 20upx;
	}
	.price-symbol {
		font-size: 28upx;
		color: rgba(255, 65, 28, 1);
	}

	.price {
		font-size: 50upx;
		color: rgba(255, 65, 28, 1);
		font-weight: bold;
	}

	.bill-item-con {
		width:94%;
		height: 186upx;
		background: #FFFFFF;
		border-radius: 15upx;
		margin:20upx auto 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		content-visibility: auto;
	}

	.bill-item-top {
		padding: 0 20upx;
		width: 100%;
		box-sizing: border-box;
	}
	.bill-item-bottom {
		font-size: 26upx;
		color: rgba(204, 204, 204, 1)
	}

	.bill-item-top-title {
		font-size: 32upx;
		color: rgba(51, 51, 51, 1);
	}
</style>
