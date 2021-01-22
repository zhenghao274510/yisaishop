<template>
	<view class="">
		<s-pull-scroll ref="pullScroll" :pullDown="pullDown" :pullUp="loadData" :back-top="true">
			<view class="skill-top">
				<image :src="skillImage" mode=""></image>
				<view class="uni-flex skill-bottom">
					<view class="time-left">
						秒杀商品不可用券
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
				<view class="uni-second" @tap.stop="gotoDetails(v)" v-for="(v,k) in dataList" :key="k">
					<view class="image-second lazyload lazypic" :class="{loaded: v.loaded}">
						<image class="uni-second-image" :src="v.icon" mode="aspectFill" lazy-load="true" @load="imageOnLoad(v)"></image>
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
									<text class="price-symbol " style="color:#F22519;">￥</text><text class="price">{{v.price | parsePrice}}</text>
								</view>
								<view style="text-decoration: line-through;" class="old-price">
									￥{{v.old_price | parsePrice}}
								</view>
							</view>
							<view class="small-btn" hover-class="btn-hover">
								{{v.stocks!=0?'立即抢购':'已售罄'}}
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
	import bbsCountdown from "@/components/bbs-countdown/bbs-countdown.vue"
	export default {
		components: {
			sPullScroll,
			bbsCountdown
		},
		data() {
			return {
				skillImage: '',
				endtime: '',
				dataList: []
			}
		},
		onLoad() {
			this.refresh();
		},
		methods: {
			//  #ifdef H5
			shareH5() {
				this.$wechat.share({
					title: ''
				})
			},
			// #endif
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
			gotoDetails(v) {
				v.stocks != 0 ? this.$api.navTo(`/pages/details/goodsDetails?id=${v.id}&type=2`) : this.$api.tip('该商品已售罄!')
			},
			async loadData(pullScroll) {
				if (pullScroll.page == 1) {
					this.dataList = [];
				}
				let e = {
					cmd: 'getSpikeProductList',
					merchantId: uni.getStorageSync('merchantId'),
					nowPage: pullScroll.page,
					uid: uni.getStorageSync('uid')
				}
				const curList = [];
				const res = await this._reqw.post(e);
				if (res.result != 0) {
					this.$api.tip(res.resultNote);
					return
				}
				this.skillImage = res.body.image;
				this.endtime = res.body.endtime;
				console.log(this.endtime)
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

	.price::after {
		content: '秒杀价';
		padding: 0 4upx;
		border: 1upx solid #F5B3AB;
		border-radius: 4upx;
		font-size: 20upx !important;
		font-weight: 500;
		color: #E23229;
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
		padding: 20upx;
		width: 100%;
		box-sizing: border-box;
		background-color: #FFFFFF;
		border-radius: 4upx;
		margin-bottom: 10upx;
	}

	.image-second {
		width: 160upx;
		height: 160upx;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}

	.uni-second-image {
		width: 100%;
		height: 100%;
		border-radius: 10upx;
	}

	.uni-second-title {
		font-size: 26upx;
		color: #000000;
	}

	.uni-second-title::before {
		content: '限时秒杀';
		padding: 4upx 10upx;
		border-radius: 40upx;
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

	.store-num {
		font-size: 22upx;
		color: rgba(102, 102, 102, 1);
	}
</style>
