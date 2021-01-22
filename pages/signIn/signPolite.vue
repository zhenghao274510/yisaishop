<template>
	<view class="" catchtouchmove="return">
		<s-pull-scroll ref="pullScroll" :pullDown="pullDown" :pullUp="loadData" :back-top="true">
			<view class="indexBg" style="height:226upx;"></view>
			<view class="uni-flex d-between d-items-center point-con">
				<navigator url="../mineoptions/mywebView?type=5" class="uni-flex d-items-center">
					<image src="/static/img/guize.png" class="guze-icon"></image>
					<view class="" style="font-size: 26upx;color: #FFFFFF;">
						规则
					</view>
				</navigator>
				<view class="uni-flex uni-flex-item d-content-center d-items-center">
					<view class="" style="font-size:90upx;font-weight: bold;color: #FFFFFF;">
						{{dataobject.point}}
					</view>
					<view class="" style="font-size:30upx;color: #FFFFFF;margin:30upx 0 0 20upx;">
						积分
					</view>

				</view>
			</view>
			<view class="sign-con">
				<view class="uni-flex" style="padding:0 0 50upx 10upx;">
					<view class="uni-flex-item  uni-flex" v-for="(v,k) in dataobject.signList" :key="k" style="position: relative;">
						<view class="uni-flex-item d-column uni-flex d-content-center">
							<view class="uni-flex-item  uni-flex  d-items-center">
								<image src="/static/img/jifendui.png" class="sign-icon" v-if="dataobject.days-1>=k"></image>
								<image src="/static/img/jifen.png" class="sign-icon" v-else></image>
								<view class="line " v-if="k!=6">

								</view>
							</view>
							<view class="sign-point" v-if="k!=6">
								{{v.point}}积分
							</view>
							<view class="" v-else style="height:15upx;margin-top: -10upx;">

							</view>
							<view class="seven-point" v-if="k==6">
								优惠券
							</view>
							<view class="" style="font-size: 24upx;color: #666666;width: 62upx;text-align: center;">
								{{v.number}}天
							</view>
						</view>

					</view>
				</view>
				<view class="sign-btn" hover-class="btn-hover" :class="[dataobject.sign==2?'y-bg':'c-bg']" @click='userOptionsSign'>
					{{dataobject.sign==2?"立即签到":"已签到"}}
				</view>
			</view>

			<view class="point-top-con">

				<view class="uni-flex d-between d-items-center point-nav-con">
					<view class="uni-flex-item uni-flex d-items-center d-content-center" style="flex-direction: column;" v-for="(v,k) in navsList"
					 :key="k" @click="tabNavTap(k)">
						<image :src="v.icon" class="point-img"></image>
						<view class="point-nav-title">
							{{v.name}}
						</view>
					</view>
				</view>
			</view>


			<goods-swiper :list="dataobject.bannerList" type="6"></goods-swiper>

			<view class="uni-flex d-items-center d-between" style="padding: 20upx 2%;">
				<view class="uni-flex d-items-center">
					<image src="/static/img/kajuan.png" class="kajuan-icon"></image>
					<view class="" style="font-size: 32upx;font-weight: bold;color: #000000;">
						积分兑商品
					</view>
				</view>
				<view class="" style="font-size: 26upx;color: #999999;" @click="tabNavTap(0)">
					查看更多
				</view>
			</view>
			<point-item :list='dataobject.pointProductList'></point-item>
			<view class="" style="margin: 0 10upx;background: #FFFFFF;">
				<view class="uni-flex d-items-center d-between" style="padding: 20upx 2%;">
					<view class="uni-flex d-items-center">
						<image src="/static/img/kajuan.png" class="kajuan-icon"></image>
						<view class="" style="font-size: 32upx;font-weight: bold;color: #000000;">
							积分兑劵
						</view>
					</view>
					<view class="" style="font-size: 26upx;color:#999999;" @click="tabNavTap(1)">
						查看更多
					</view>
				</view>
				<point-compline-item :list='dataobject.couponList'></point-compline-item>
			</view>

		</s-pull-scroll>
		<home-poup type="1" ref='homePoup'></home-poup>
	</view>
</template>

<script>
	import sPullScroll from "@/components/s-pull-scroll/index.vue"
	import pointItem from "@/components/mycom/point-item.vue"
	import pointComplineItem from "@/components/mycom/point-compline-item.vue"
	import homePoup from "@/components/mycom/homePoup.vue"
	import goodsSwiper from "@/components/mycom/swiper.vue"
	export default {
		components: {
			goodsSwiper,
			pointItem,
			homePoup,
			sPullScroll,
			pointComplineItem
		},
		data() {
			return {
				dataobject: {
					point:0,
					sign: "2", // 今天是否签到（1：是2：否）
					days: "4", // 连签天数
					signList: [],
					bannerList: [],
					pointProductList: [],
					couponList: []
				},
				navsList: [{
						icon: '/static/img/jifenhuanjuan.png',
						name: '积分兑商品'
					},
					{
						icon: '/static/img/youhuijuan.png',
						name: '积分兑券'
					},
					{
						icon: '/static/img/duihuanjilu.png',
						name: '积分明细'
					},
				]
			}
		},
		onLoad() {
			this.refresh();
		},
		methods: {
			userOptionsSign() {
				if (this.dataobject.sign == 1) {
					this.$api.tip('今日已签到!')
					return
				}
				let parmas = {
					cmd: 'sign',
					uid: uni.getStorageSync('uid'),
					merchantId: uni.getStorageSync('merchantId')
				}
				this._reqw.post(parmas).then(res => {
					res.result == 0 ? (this.$refs.homePoup.open(), this.$api.tip('签到成功!'), this.refresh()) : this.$api.tip(res.resultNote)
				}).catch(err => {})
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
			loadData(pullScroll) {
				if (pullScroll.page == 1) {
					this.dataList = [];
				}
				let e = {
					cmd: 'signInfo',
					uid:uni.getStorageSync('uid'),
					merchantId: uni.getStorageSync('merchantId'),
					nowPage: pullScroll.page
				}
				this._reqw.post(e).then(res => {
					res.result == 0 ?
						(pullScroll.finish(), this.dataobject = res.body) :
						this.$api.tip(res.resultNote);
				})
			},
			tabNavTap(ind) {
				switch (ind) {
					case 0:
						this.$api.navTo(`/pages/point/pointGoods`);
						break;
					case 1:
						this.$api.navTo(`/pages/point/pointCompline`);
						break;
					case 2:
						this.$api.navTo(`/pages/point/pointDetails`);
						break;
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	//   签到  部分
	.sign-icon {
		width: 62upx;
		height: 62upx;
	}

	.line {
		height: 5upx;
		width: 40upx;
		background: #FFEAB8;
		border-radius: 3upx;
	}

	.seven-point {
		font-size: 22upx;
		color: #EE3D59;
		position: absolute;
		top: -28upx;
		left: 0;
		// transform: translateX(30px);
	}

	.sign-point {
		width: 68upx;
		line-height: 28upx;
		background: #007030;
		border-radius: 14upx;
		box-sizing: border-box;
		// padding: 0 4upx;
		text-align: center;
		margin-top: -10upx;
		font-size: 19upx;
		color: #F2FFF8;
		z-index: 99;
	}

	.y-bg {
		background: #FFB600;
		color: #FFFAF4;
	}

	.c-bg {
		background: #F6F6F6;
	}

	.sign-btn {
		width: 687upx;
		line-height: 80upx;
		border-radius: 40upx;
		font-size: 32upx;
		text-align: center;
		margin-top: 30upx;
	}

	.guze-icon {
		width: 32upx;
		height: 32upx;
		margin-right: 20upx;
	}

	.point-con {
		padding: 0 30upx;
	}

	.sign-con {
		width: 98%;
		margin: 0 0 20upx 1%;
		height: 384upx;
		background: #FFFFFF;
		border-radius: 15upx;
		padding: 50upx 20upx;
		box-sizing: border-box;
		// position: absolute;
	}

	//     3   图标
	.kajuan-icon {
		width: 48upx;
		height: 28upx;
		margin-right: 20upx;
	}

	.uni-icon-arrowright {
		color: #666666;
		font-size: 24upx;
	}

	.point-top-con {
		width: 98%;
		margin-left: 1%;
		background: #FFFFFF;
	}

	.point-icon {
		width: 42upx;
		height: 42upx;
	}

	.point-top-con-title {
		padding: 30upx;
	}

	.point-img {
		width: 90upx;
		height: 90upx;
	}

	.point-nav-con {
		padding: 60upx 0;
	}

	.point-nav-title {
		padding-top: 20upx;
		font-size: 24upx;
		color: #666666;
	}
</style>
