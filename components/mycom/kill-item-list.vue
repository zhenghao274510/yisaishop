<template>
	<view class="content">
		<view class="uni-second-list">
			<view class="uni-second" @click="gotoDetails(v)" v-for="(v,k) in list" :key="k">
				<view class="image-second">
					<image class="uni-second-image" :src="v.icon"></image>
				</view>
				<view class="uni-second-price">
					<view class="uni-second-title uni-two-cut">{{v.title}}
					</view>					
					<!-- <view class="uni-flex d-items-center d-between">
						<view class="sku-name uni-ellipsis">
							5kg
						</view>
					</view> -->
					<view class="uni-flex d-between d-items-center">
						<view class="">
							<view class="">
								<text class="price-symbol " style="color:#F22519;">￥</text><text class="price">{{v.price}}</text>								
							</view>
							<view style="text-decoration: line-through;" class="old-price">
								￥{{v.old_price}}
							</view>							
						</view>
						<view class="small-btn" hover-class="btn-hover" @click.stop="userOptions(v)">
							{{ v.stocks!=0?'立即抢购':'已售罄'}}
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
				v.stocks!=0?this.$api.navTo(`/pages/details/goodsDetails?id=${v.id}&type=2`):this.$api.tip('该商品已售罄!')
			}
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
	.price::after{
		content: '秒杀价';
		padding: 4upx;
		border: 2upx solid #F5B3AB;
		border-radius: 4upx;
		font-size: 20upx !important;
		font-weight: 500;
		color:#E23229;
		margin-left: 20upx;
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
		width: 220upx;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}

	.uni-second-image {
		width: 220upx;
		height: 220upx;
		border-radius: 10upx;
	}

	.uni-second-title {
		font-size:26upx;
		color: #000000;
	}
	.uni-second-title::before{
		content: '限时秒杀';
		padding:4upx  10upx;
		border-radius:40upx;
		margin-right: 10upx;
		background: #FFB600;
		font-size: 20upx;
		color: #FFFFFF;
	}

	.uni-second-price {
		width: 75%;
		font-size: 28upx;
		line-height: 1.5;
		padding-left: 15upx;
		position: relative;
		display: flex;
		flex-direction: column;
		// justify-content: space-between;
		position: relative;
	}
	.store-num{
		font-size:22upx;
		color:rgba(102,102,102,1);
	}
</style>
