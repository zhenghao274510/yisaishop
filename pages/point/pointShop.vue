<template>
	<view class="">
		<s-pull-scroll ref="pullScroll" :pullDown="pullDown" :pullUp="loadData" :back-top="true">
		<view class="point-top-con">
			<view class="uni-flex point-top-con-title">
				<navigator url="./pointDetails" class="uni-flex d-items-center uni-flex-item">
					<image src="/static/img/touruguize.png" class="point-icon"></image>
					<view class="" style="margin: 0 20upx;">
						<text style="font-size:26rpx;color:#EC103C;">{{point}}</text>
						<text style="font-size:26rpx;color:#666666;">积分</text>
					</view>
					<view class="uni-icon uni-icon-arrowright"></view>
				</navigator>
				<navigator url="../mineoptions/mywebView?type=6" class="uni-flex d-items-center uni-flex-item">
					<image src="/static/img/touruguize.png" class="point-icon"></image>
					<text style="font-size:26rpx;color:#666666;margin-left: 20upx;">规则</text>
				</navigator>
			</view>
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
		<view class="uni-flex d-items-center" style="padding: 20upx 2%;" v-if="pointProductList.length!=0">
			<image src="/static/img/kajuan.png" class="kajuan-icon"></image>
			<view class="" style="font-size: 32upx;font-weight: bold;color: #000000;">
				积分兑商品
			</view>
		</view>
		<point-item :list='pointProductList'></point-item>
		<view class="uni-flex d-items-center" style="padding: 20upx 2%;" v-if="pointComplineList.length!=0">
			<image src="/static/img/kajuan.png" class="kajuan-icon"></image>
			<view class="" style="font-size: 32upx;font-weight: bold;color: #000000;">
				积分兑劵
			</view>
		</view>
		<point-compline-item :list='pointComplineList'></point-compline-item>
				</s-pull-scroll>
	</view>
</template>

<script>
	import sPullScroll from "@/components/s-pull-scroll/index.vue"
	import pointItem from "@/components/mycom/point-item.vue"
	import pointComplineItem from "@/components/mycom/point-compline-item.vue"
	export default {
		components: {
			pointItem,
			sPullScroll,
			pointComplineItem
		},
		data() {
			return {
				point: 0,
				navsList: [{
						icon: '/static/img/youhuijuan.png',
						name: '积分兑商品'
					},
					{
						icon: '/static/img/jifenhuanjuan.png',
						name: '积分兑券'
					},
					{
						icon: '/static/img/duihuanjilu.png',
						name: '兑换记录'
					},
				],
				pointProductList: [],
				pointComplineList:[]
			}
		},
		onLoad(options) {
			this.point = options.id;
			this.loadData();
		},
		methods: {
			loadData() {
				this.getPointProductList();
				this.getPointComplineList();
			},
			async getPointProductList() {
				this.$api.loading('加载中....')
				let e = {
					cmd: 'getPointProductList',
					uid: uni.getStorageSync('uid'),
					merchantId: uni.getStorageSync('merchantId'),
					nowPage: '1',
					pageCount:'4'
				}
				const res = await this._reqw.post(e);
				uni.hideLoading();
				if (res.result != 0) {
					this.$api.tip(res.resultNote);
					return
				}
				this.pointProductList = res.body.dataList;
			},
			async getPointComplineList() {
				let e = {
					cmd: 'getPointCouponList',
					uid: uni.getStorageSync('uid'),
					merchant_id: uni.getStorageSync('merchantId'),
					nowPage: '1',
					pageCount:'4'
				}
				const res = await this._reqw.post(e);
				if (res.result != 0) {
					this.$api.tip(res.resultNote);
					return
				}
				this.pointComplineList = res.body.dataList;
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
						this.$api.navTo(`/pages/point/pointRecords`);
						break;
				}
			}
		}
	}
</script>
<style scoped lang="scss">
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
		width: 750upx;
		background: #FFFFFF;
	}

	.point-icon {
		width: 42upx;
		height: 42upx;
	}

	.point-top-con-title {
		padding: 30upx;
		width: 80%;
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
