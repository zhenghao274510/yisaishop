<template>
	<view class="content">
		<view class="uni-second-list">
			<checkbox-group>
				<view class="" @click="gotoDetails(v.id)" v-for="(v,k) in list" :key="k">
					<view class="">
						<view class="">
							<view class="">
								自提
							</view>
							<view class="">
								订单编号：201051262461
							</view>
						</view>
						<view class="">
							待自提
						</view>
						
					</view>
					
					
					<view class="uni-second">
						<radio :value="v.id" style="transform: scale(.7);" color="#007030" />
						<view class="uni-flex d-items-center">
							<view class="image-second">
								<image class="uni-second-image" :src="v.icon"></image>
							</view>
							<view class="uni-second-price">
								<view class="uni-second-title uni-ellipsis">{{v.name}}
								</view>
								<view class="uni-flex d-items-center d-between">
									<view class="sku-name uni-ellipsis">
										商品介绍
									</view>
								</view>
								<view class="uni-flex d-between d-items-center">
									<view class="uni-flex d-items-center">
										<view class="">
											<text class="price-symbol " style="color:#F22519;">￥</text><text class="price">{{v.price}}</text>
										</view>
									</view>
									<view class="uni-flex d-items-center">
										<view class="">
											<text class="price-symbol " style="color:#F22519;">￥</text><text class="price">{{v.price}}</text>
										</view>
									</view>
									<!-- <view class="store-num">
											库存：300份
										</view> -->
								</view>
							</view>
						</view>
					</view>
				</view>
			</checkbox-group>
		</view>
	</view>
</template>
<script>
	export default {
		props: {
			list: {
				type: Array,
				default: []
			},
			tabIndex: {
				type: [String, Number],
				default: 0
			}
		},
		onLoad() {

		},
		onShow() {

		},
		methods: {
			gotoDetails(id) {
				this.$api.navTo(`/pages/goodDetails/gooddetails?id=${id}&type=0`)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.old-price {
		font-size: 17upx;
		color: rgba(153, 153, 153, 1);
	}

	.content {
		box-sizing: border-box;
		padding-top: 20upx;
	}

	.price {
		color: #FF0000;
		font-size: 32upx;
		font-weight: bold;
		margin-right: 30upx;
	}

	.price-symbol {
		font-size: 20upx;
	}

	.sku-name {
		color: #666666;
		font-size: 22upx;
		width: 70%;
	}

	.uni-second-list {
		margin-bottom: 10px;
	}

	.uni-second {
		display: flex;
		padding: 20upx 0;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		background-color: #FFFFFF;
		border-radius: 4upx;
		margin-bottom: 20upx;
	}

	.image-second {
		width: 155upx;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}

	.uni-second-image {
		width: 155upx;
		height: 155upx;
		border-radius: 10upx;
	}

	.uni-second-title {
		font-size: 32upx;
		font-weight: bold;
		width: 90%;
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
		box-sizing: border-box;
	}

	.store-num {
		font-size: 22upx;
		color: rgba(102, 102, 102, 1);
	}
</style>
