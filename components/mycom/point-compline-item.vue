<template>
	<view  v-if="list.length!=0">
		<view class="uni-second-list">
			<view class="uni-second" v-for="(v,k) in list" :key="k" @tap.stop="stockDetails(v)">
				<view class="image-second">
					<view class="uni-second-image uni-flex d-items-center d-content-center" v-if="v.use_type==1">
						<view class="">
							<view class="">
								<text class="compline-slome">￥</text><text class="compline-price">{{v.amount}}</text>
							</view>
							<view class="compline-max">
								满{{v.price}}元可用
							</view>
						</view>
					</view>
					<view class="uni-second-image uni-flex d-items-center d-content-center" v-if="v.use_type==2">
						<view class="">
							<view class="compline-max">
								{{v.money}}元优惠劵
							</view>
						</view>
					</view>
				</view>
				<view class="uni-second-price">
					<!-- "type":"",// 类型（1：全场通用2：单品类3:单商品）
					            "use_type":"",// 使用类型（1：满减2：无门槛） -->
					<view class="uni-second-title" v-if="v.use_type==1">满{{v.price}}元减{{v.amount}}元券
					</view>
					<view class="uni-second-title" v-if="v.use_type==2">{{v.money}}元优惠劵
					</view>
					<view class="uni-flex d-items-center price-con">
						<view class="price">{{v.point}}</view>
						<view class="" style="font-size: 24upx;color:#FF0000;">
							积分
						</view>
					</view>
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
			stockDetails(v) {
				this.$api.navTo(`/pages/point/pointComplineDetails?id=${v.id}&title=满${v.price}元减${v.amount}元券`);
			}
		}
	}
</script>
<style scoped lang="scss">
	view{
		line-height:1.2;
	}
	.compline-slome{
		color: #FFFFFF;
		font-size: 31upx;
	}
	.compline-price{
		color: #FFFFFF;
		font-size:80upx;
	}
	.compline-max{
		color: #FFFFFF;
	}
	.price-con {
		padding: 10upx 0;
	}

	.price {
		color: #FD3D00;
		font-weight: Bold;
	}

	.sku-name {
		color: $uni-color-paragraph;
		font-size: 22upx;
	}

	.second-title {
		padding: 30upx 20upx;
		width: 94%;
		box-sizing: border-box;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 20upx 20upx 0 0;
	}

	.uni-second-list {
		display: flex;
		flex-wrap: wrap;
	}

	.uni-second {
		display: flex;
		flex-direction: column;
		margin: 0 0 20upx 20upx;
		width: 46%;
		box-sizing: border-box;
		border-radius: 6upx;
		background-color: #FFFFFF;
	}

	.image-second {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		border:2upx solid #E5E5E5;
		border-radius: 6upx;
		padding: 15upx 30upx;
		background-color: #FFFFFF;
	}

	.uni-second-image {
		width: 276upx;
		height: 181upx;
		border-radius: 6upx;
		background: url(../../static/img/duiquanbg.png);
		background-size: 100% 100%;
	}

	.uni-second-title {
		word-break: break-all;
		display: -webkit-box;
		overflow: hidden;
		color: #000000;
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
		padding: 20upx 10upx;
	}
</style>
