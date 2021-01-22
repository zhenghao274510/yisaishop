<template>
	<view v-if="list.length!=0">
		<view class="second-title-goods" v-if="type==3">
			<image src="/static/img/baioti.png" mode=""></image>
		</view>
		<view class="uni-second-list">
			<view class="uni-second" v-for="(v,k) in list" :key="k" @click="stockDetails(v.id)">
				<view class="image-second">
					<image class="uni-second-image" :src="v.icon" mode="aspectFill" lazy-load="true"></image>
				</view>
				<view class="uni-second-price">
					<view class="uni-second-title">{{v.title}}
					</view>
					<view class="uni-flex d-items-center price-con">
						<text class="price">￥{{v.price | parsePrice}}</text>
						<image src="/static/img/home-huiyuan.png" class="vip-img" v-if="type==1"></image>
					</view>
					<view class="sku-name">
						<text style="text-decoration: line-through;">￥{{v.old_price | parsePrice}}</text> <text style="margin-left: 20upx;">月销{{v.sales}}</text>
					</view>
					<image src="/static/img/tianjia.png" class="img"></image>

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
			stockDetails(id) {
				if(uni.getStorageSync('uid')){
					if(this.type==3){
						let obj={
							id:id,
							type:5
						}
						this.$emit('click',obj)
					}else{
						this.$api.navTo(`/pages/details/goodsDetails?id=${id}&type=5`);
					}
					
				}else{
					// #ifdef MP-WEIXIN
					this.$api.navTo('/pages/index/author')
					//#endif
					// #ifdef H5
					this.$api.tip('公众号授权')
					//#endif
					
					
				}
				
			}
		}
	}
</script>
<style scoped lang="scss">
	.vip-img{
		width:41upx;
		height:25upx;
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
		color: #FD3D00;
		font-weight: Bold;
	}

	.sku-name {
		color: $uni-color-paragraph;
		font-size: 22upx;
	}
	.second-title-goods{
		padding:40upx 20upx;
		width: 94%;
		margin: 0 auto;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 20upx 20upx 0 0;
		box-sizing: border-box;
		image {
			width:532upx;
			height:51upx;
		}
	}

	.second-title {
		padding: 40upx 20upx;
		width: 94%;
		box-sizing: border-box;
		margin: 0 auto;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 20upx 20upx 0 0;
		image {
			width:239upx;
			height: 39upx;
		}
	}
	.uni-second-list {
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 20upx;
	}

	.uni-second {
		display: flex;
		flex-direction: column;
		margin: 0 0 20upx 20upx;
		width: 46%;
		box-sizing: border-box;
		background-color: #FFFFFF;
		border-radius: 6upx;
	}

	.image-second {
		width:345upx;
		height:334upx;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}

	.uni-second-image {
		width: 100%;
		height: 100%;
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
