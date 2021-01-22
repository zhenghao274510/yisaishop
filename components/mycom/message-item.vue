<template>
	<view class="content">
		<view class="uni-second-list">
			<view class="uni-second" v-for="(v,k) in list" :key="k" @click="details(v)">
				<view class="image-second">
					<image class="uni-second-image" src="/static/img/xiaoxi.png"></image>
				</view>
				<view class="uni-second-price">
					<view class="uni-flex d-items-center d-between" style="margin-bottom: 10upx;">
						<text class="price">{{v.title}}</text>
					</view>
					<view class="uni-second-title uni-two-cut" v-if="v.type==1">系统消息,点击查看
					</view>
					<view class="uni-second-title uni-two-cut" v-if="v.type==2">订单有了新动态,点击查看
					</view>
					<view class="uni-second-title uni-two-cut" v-if="v.type==3">直播订阅消息
					</view>
					<view class="sku-name">
						{{v.time}}
					</view>
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
		},
		methods: {
			details(e) {
				let url = '';
				e.type == 2? url = `/pages/order/orderDetails?id=${e.objId}` : url =
					`/pages/mineoptions/massagedetails?content=${encodeURIComponent(e.content)}&title=${e.title}`
				this.$api.navTo(url)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.uni-second-image {
		height: 86upx;
	}
	.content {
		box-sizing: border-box;
		margin-top:20upx;
	}
	.price {
		color: #666666;
		font-size: 28upx;
		font-weight: bold;
	}

	.sku-name {
		color: $uni-color-paragraph;
		font-size: 22upx;
	}

	.uni-second-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0 10upx;
		margin-bottom: 10upx;
	}

	.uni-second {
		display: flex;
		padding: 20upx;
		width: 100%;
		box-sizing: border-box;
		background-color: #FFFFFF;
		border-radius: 4upx;
		margin-bottom: 20upx;
	}

	.image-second {
		width: 86upx;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}

	.uni-second-title {
		color: #999999;
		font-size: 26upx;
		background-color: #F6F6F6;
		padding: 10upx 5upx;
		margin-bottom: 10upx;
	}

	.uni-second-price {
		width: 75%;
		font-size: 28upx;
		padding-left: 15upx;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: relative;
	}
</style>
