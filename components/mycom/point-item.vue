<template>
	<view  v-if="list.length!=0">
		<view class="uni-second-list">
			<view class="uni-second" v-for="(v,k) in list" :key="k" @click="stockDetails(v)">
				<view class="image-second">
					<image class="uni-second-image" :src="v.icon"></image>
				</view>
				<view class="uni-second-price">
					<view class="uni-second-title">{{v.title}}
					</view>
					<view class="uni-flex d-items-center price-con">
						<text class="price">{{v.point}}积分</text>
						<view class="point-price">
							￥{{v.old_price}}
						</view>
					</view>
					<view class="sku-name">
						月销{{v.sales}}
					</view>
					<!-- <image src="/static/img/tianjia.png" class="img"></image> -->

				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		props: {
			type: {
				type: String || Number
			},
			list: {
				type: Array,
				default () {
					return []
				}
			}
		},
		data() {
			return {}
		},
		methods: {
			set(val) {
				val.forEach(item => {
					this.list.push(item)
				})
			},
			onClick(e) {
				this.$emit("click", e)
			},
			stockDetails(v) {
				console.log(111)
				v.cun==1?this.$api.navTo(`/pages/details/goodsDetails?id=${v.id}&type=4`):this.$api.tip('该商品已下架!')
			}
		}
	}
</script>
<style scoped lang="scss">
	.point-price {
		font-size: 24upx;
		text-decoration: line-through;
		color: #666666;
		margin-left: 20upx;
	}

	.img {
		width: 60upx;
		height: 60upx;
		position: absolute;
		right: 40upx;
		bottom: 40upx;
	}

	.price-con {
		padding:10upx 0;
	}

	.price {
		color:#FD3D00;
		font-weight:Bold;
	}

	.sku-name {
		color:#999999;
		font-size: 22upx;
	}

	.second-title {
		padding: 30upx 20upx;
		width: 94%;
		box-sizing: border-box;
		margin: 0 auto;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 20upx 20upx 0 0;

		image {
			width: 40%;
			height: 34upx;
		}
	}

	.uni-second-list {
		display: flex;
		flex-wrap: wrap;
	}

	.uni-second {
		display: flex;
		flex-direction: column;
		margin: 0 0 14upx 14upx;
		width: 47%;
		box-sizing: border-box;
		background-color: #FFFFFF;
		border-radius: 6upx;
	}

	.image-second {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}

	.uni-second-image {
		// width: 339upx;
		height: 334upx;
		border-radius: 6upx;
	}

	.uni-second-title {
		word-break: break-all;
		display: -webkit-box;
		overflow: hidden;
		color: $uni-color-title;
		line-height: 1.5;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.uni-second-price {
		flex: 1;
		font-size: 28upx;
		line-height: 1.5;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding:20upx 10upx;
	}
</style>
