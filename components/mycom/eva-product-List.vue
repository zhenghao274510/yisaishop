<template>
	<view class="eva-section">
		<view class="eva-box" v-for="(v,k) in list" :key="k" :style="{padding:pad+'rpx'}">
			<view class="eva-top ">
				<view class="uni-flex d-items-center">
					<image class="img" :src="v.icon" mode="aspectFill"></image>
					<view class="name">{{v.nickname}}</view>
				</view>
				<view class="adtime">
					{{v.createDate}}
				</view>
			</view>
			<view class="eva-content">
				<view class="con">{{v.content}}</view>
				<view class="eva-img-con" v-if="v.images.length!=0">
					<image class="img" v-for=" (m,n) in v.images" :key="n" :src="m" mode="scaleToFill" @click="ImgDetails(k,n)"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array
			},
			pad:{
				type:[Number,String],
				default:0
			}
		},
		data() {
			return {
			}
		},
		methods: {
			ImgDetails(k, n) {
				uni.previewImage({
					urls: this.list[k].images,
					current: this.list[k].images[n]
				})
			}
		}
	};
</script>

<style scoped lang="scss">
	.adtime {
		font-size: 22upx;
		color: #999999;
	}
	/* 评价 */
	.eva-section {
		display: flex;
		flex-direction: column;
	}

	.eva-box {
		display: flex;
		flex-direction: column;
		margin-bottom: 10upx;
		background-color: #FFFFFF;
		content-visibility:auto;
		.eva-top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			// margin-top: 20upx;
			.img {
				width: 90upx;
				height: 90upx;
				border-radius: 50%;
				margin-right: 20upx;
			}
			.name {
				color: #000000;
				font-size: 30upx;
				font-weight: bold;
			}
		}

		.eva-content {
			margin: 20upx 0;

			.con {
				color: #666666;
				font-size: 24upx;
				padding: 10upx;
			}

			.eva-img-con {
				display: flex;
				align-items: center;
				padding:10upx 0;

				.img {
					width: 160upx;
					height: 160upx;
					margin-right: 20upx;
				}
			}
		}
	}
</style>
