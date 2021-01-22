<template>
	<view class="groupCon">
		<view class="group-item" @click="userLook(v)" v-for="(v,k) in list" :key="k">
			<view class="group-item-tips">超值拼团</view>
			<view class="">
				<image :src="v.icon" class="group-item-img" lazy-load></image>
			</view>
			<view class="" style="padding:20upx;">
				<view class="group-title uni-ellipsis">
					{{v.title}}
				</view>
				<!-- <view class="group-sku-name">
					5kg
				</view> -->
				<view class="uni-flex uni-flex-item">
					<view class="uni-flex d-items-center">
						<view class="">
							<text style="font-size:28upx;color:#FF0000;">￥</text>
							<text style="font-size:40upx;color:#FF0000;font-weight:bold;">{{v.price | parsePrice}}</text>
						</view>
						<view class="" style="font-size:28upx;text-decoration: line-through;color: #333333;margin: 0 20upx;">
							￥{{v.old_price | parsePrice}}
						</view>
						<view class="" style="font-size:26upx;color: #666;">
							已团{{v.sales}}件
						</view>
						<view class="group-btn" hover-class="btn-hover">
						{{v.stocks!=0?'去拼团':'已售罄'}}	
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
			list: {
				type: Array,
				default () {
					return []
				}
			},
			tabIndex:{
				type:[String,Number],
				default:0
			}
		},
		data() {
			return {

			}
		},
		methods: {
			userLook(v) {
				let type=0;
				if(this.tabIndex==0){
					type=1;
				}else{
					type=6
				}
				v.stocks!=0?this.$api.navTo(`/pages/details/goodsDetails?id=${v.id}&type=${type}`):this.$api.tip('该商品已售罄!')
			}
		}
	}
</script>

<style scoped lang="scss">
	.groupCon {
		padding: 20upx;

		.group-item {
			background: #FFFFFF;
			box-shadow: 0px 10upx 40upx 0px rgba(207, 206, 206, 0.29);
			border-radius: 20upx;
			margin-top: 20upx;
			position: relative;
			content-visibility: auto;
		}

		.group-item-tips {
			position: absolute;
			top: 0;
			left: 0;
			width: 143upx;
			line-height: 56upx;
			text-align: center;
			background: #007030;
			border-radius: 20upx 0px 20upx 0px;
			font-size: 26upx;
			color: #FFFFFF;
			z-index: 9;
		}

		.group-item-img {
			width: 100%;
			height: 282upx;
			border-radius: 20upx 20upx 0px 0px;
		}

		.group-title {
			font-size: 32upx;
			color: #333333;
		}

		.group-sku-name {
			font-size: 24upx;
			color: #666666;
		}

		.group-btn {
			width: 166upx;
			line-height: 59upx;
			text-align: center;
			background: linear-gradient(90deg, #FFBB00, #FFA600);
			border-radius: 30upx;
			color: #FFFFFF;
			margin-left: 56upx;
		}
	}
</style>
