<template>
	<view class="">
		<view class="uni-second-list">
			<view class="uni-second" @click="gotoDetails(v.id)" v-for="(v,k) in list" :key="k">
				<view class="image-second lazyload lazypic" :class="{loaded: v.loaded}">
					<image class="uni-second-image" :src="v.icon" mode="aspectFill" lazy-load="true" @load="imageOnLoad(v)"></image>
				</view>
				<view class="uni-second-price">
					<view class="uni-second-title uni-ellipsis">{{v.title}}
					</view>					
					<view class="uni-flex d-items-center d-between">
						<view class="sku-name uni-ellipsis">
							<!-- 商品介绍 -->
						</view>
						<view class="small-btn" hover-class="btn-hover">
							立即抢购
						</view>
					</view>
					<view class="uni-flex d-between d-items-center">
						<view class="uni-flex d-items-center">
							<view class="">
								<text class="price-symbol " style="color:#F22519;">￥</text><text class="price">{{v.price}}</text>								
							</view>
							<view style="text-decoration: line-through;">
								<text class="old-price">￥</text><text class="old-price">{{v.old_price}}</text>
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
</template>
<script>
	export default {
		props: {
			list: {
				type: Array,
				default: []
			}
		},
		onLoad() {

		},
		onShow() {

		},
		methods: {
			gotoDetails(v) {
				v.cun==1?(v.stocks!=0?this.$api.navTo(`/pages/details/goodsDetails?id=${id}&type=3`):this.$api.tip('该商品已售罄!')):this.$api.tip('该商品已下架!')
			},
		}
	}
</script>
<style lang="scss" scoped>
	.small-btn {
		width:150upx;
		height:50upx;
		background:#007030;
		border-radius:25upx;
		text-align: center;
		line-height: 50upx;
		color: #FFFFFF;
		font-size: 26upx;
	}
	.old-price{
		font-size:22upx;
		color:rgba(153,153,153,1);
	}

	.content {
		box-sizing: border-box;
		padding-top: 20upx;
	}

	.price {
		color: #FF0000;
		font-size: 28upx;
		font-weight: bold;
		margin-right: 30upx;
	}
	.price-symbol{
		font-size: 20upx;
	}

	.sku-name {
		color:#666666;
		font-size: 22upx;
		width: 70%;
	}

	.uni-second-list {
		margin-bottom: 10upx;
	}

	.uni-second {
		display: flex;
		padding:30upx;
		width: 100%;
		box-sizing: border-box;
		background-color: #FFFFFF;
		border-radius: 4upx;
		margin-bottom:10upx;
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
		font-size:26upx;
		color: #000000;
	}

	.uni-second-price {
		width: 75%;
		font-size: 28upx;
		line-height: 1.5;
		padding-left: 15upx;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: relative;
	}
	.store-num{
		font-size:22upx;
		color:rgba(102,102,102,1);
	}
</style>
