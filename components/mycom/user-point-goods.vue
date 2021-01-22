<template>
	<view class="">
		<view class="compline-item" v-for="(v,k) in list" :key="k">
			<view class="compline-item-top">
				<view class="" style="font-size: 22upx;color: #656565;">
					订单编号：{{v.orderid}}
				</view>
				<view class="item-tips y-bg">
					已兑换
				</view>
			</view>
			<view class="compline-item-left uni-flex uni-flex-item">
				<view class="uni-flex-item uni-flex d-column" style="padding-left:20upx;">
					<view class="" style="font-size:30upx;font-weight:bold;">
						{{v.title}}
					</view>
					<view class="" style="font-size:24upx;color:#999999;padding: 20upx 0;">
						{{v.createDate}}
					</view>
					<view class="uni-flex">
						<text style="font-size: 26upx;color: #656565;">消耗:</text> <text class="" style="font-size:26upx;color: #EC103C;">
							{{v.point}}积分
						</text>
					</view>

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list:{
				type:Array,
				default(){
					return []
				}
			}
		},
		data() {
			return {

			}
		}
	}
</script>

<style scoped>
	view {
		line-height: 1.2;
	}

	.compline-item-top {
		padding:30upx 20upx;
		border: 1upx solid #F1F1F1;
	}

	.y-bg {
		background: #FFB500;
	}

	.has-see-icon {
		width: 159upx;
		height: 128upx;
	}

	.compline-item-bg {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #000000;
		opacity: 0.5;
		border-radius: 15upx;
		z-index: 99;
		display: flex;
		align-items: center;
	}

	.compline-item {
		width: 92%;
		height: 258upx;
		background: #FFFFFF;
		border-radius: 10upx;
		margin: 20upx auto 0;
		content-visibility: auto;
		position: relative;

	}

	.item-tips {
		position: absolute;
		top: 0;
		right: 0;
		width: 146upx;
		line-height: 43upx;
		text-align: center;
		border-radius: 4upx 10upx 0px 20upx;
		font-size: 26upx;
	}

	.compline-item-left {
		display: flex;
		align-items: center;
		padding: 20upx 0;
		box-sizing: border-box;
	}
</style>
