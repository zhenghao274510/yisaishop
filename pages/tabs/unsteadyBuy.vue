<template>
	<view class="">
		<s-pull-scroll ref="pullScroll" :pullDown="pullDown" :pullUp="loadData" :back-top="true">
			<view class="skill-top">
				<image :src="image" mode=""></image>
				<view class="uni-flex skill-bottom">
					<view class="time-left">
						活动商品不可用券
					</view>
					<view class="time-right uni-flex-item" v-if="endtime!=0">
						<view class="" style="font-size: 24upx;">
							距结束仅剩
						</view>
						<view class="">
							<bbs-countdown :time="endtime"></bbs-countdown>
						</view>
					</view>
					<view class="time-right uni-flex-item" v-else>
						<view class="" style="font-size: 24upx;">
							活动已结束
						</view>
					</view>
				</view>
			</view>
			<view class="uni-second-list">
				<view class="uni-second" @click="gotoDetails(v)" v-for="(v,k) in dataList" :key="k">
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
								{{v.stocks==0?'已售罄':'立即抢购'}}
							</view>
						</view>
						<view class="uni-flex d-between d-items-center">
							<view class="uni-flex d-items-center">
								<view class="">
									<text class="price-symbol " style="color:#F22519;">￥</text>
									<text class="price">{{v.price |parsePrice}}</text>
								</view>
								<view style="text-decoration: line-through;">
									<text class="old-price">￥</text><text class="old-price">{{v.old_price | parsePrice}}</text>
								</view>
							</view>
							<!-- <view class="store-num">
								库存：300份
							</view> -->
						</view>
					</view>
				</view>
			</view>
		</s-pull-scroll>
	</view>
</template>

<script>
	import sPullScroll from "@/components/s-pull-scroll/index.vue"
	export default {
		components: {
			sPullScroll
		},
		data() {
			return {
				dataList: [],
				image: '',
				endtime: ''
			}
		},
		onLoad() {
			this.refresh();
		},
		methods: {
			gotoDetails(v) {
				v.stocks != 0 ? this.$api.navTo(`/pages/details/goodsDetails?id=${v.id}&type=3`) : this.$api.tip('该商品已售罄!')
			},
			refresh() {
				this.$nextTick(() => {
					this.$refs.pullScroll.refresh();
				});
			},
			pullDown(pullScroll) {
				setTimeout(() => {
					this.loadData(pullScroll);
				}, 200)
			},
			async loadData(pullScroll) {
				if (pullScroll.page == 1) {
					this.dataList = [];
				}
				let e = {
					cmd: 'getActivityProductList',
					uid: uni.getStorageSync('uid'),
					merchantId: uni.getStorageSync('merchantId'),
					nowPage: pullScroll.page
				}
				const curList = [];
				const res = await this._reqw.post(e);
				this.image = res.body.image;
				this.endtime = res.body.endtime;
				res.body.dataList.length == 0 ? (pullScroll.empty()) : res.body.dataList.forEach(item => {
						curList.push(item)
					}), this.dataList = this.dataList.concat(curList), pullScroll.page >= res.body.totalPage ? pullScroll.finish() :
					pullScroll.success()
			}
		}
	}
</script>

<style scoped lang="scss">
	.skill-top {
		position: relative;
		width: 100%;

		image {
			width: 100%;
		}
	}

	.skill-bottom {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
	}

	.time-left {
		width: 353upx;
		height: 127upx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: linear-gradient(130deg, #FE753F, #FF2B68);
		color: #FFFFFF;
	}

	.time-right {
		height: 127upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: #FEF0E5;
	}

	.small-btn {
		width: 150upx;
		height: 50upx;
		background: #007030;
		border-radius: 25upx;
		text-align: center;
		line-height: 50upx;
		color: #FFFFFF;
		font-size: 26upx;
	}

	.old-price {
		font-size: 22upx;
		color: rgba(153, 153, 153, 1);
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

	.price-symbol {
		font-size: 20upx;
	}

	.sku-name {
		color: #666666;
		font-size: 22upx;
		width: 70%;
	}

	.uni-second-list {
		margin-bottom: 10upx;
	}

	.uni-second {
		display: flex;
		padding: 30upx;
		width: 100%;
		box-sizing: border-box;
		background-color: #FFFFFF;
		border-radius: 4upx;
		margin-bottom: 10upx;
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
		font-size: 26upx;
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

	.store-num {
		font-size: 22upx;
		color: rgba(102, 102, 102, 1);
	}
</style>
