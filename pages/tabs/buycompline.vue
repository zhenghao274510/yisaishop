<template>
	<view class="">
		<s-pull-scroll ref="pullScroll" :pullDown="pullDown" :pullUp="loadData" :back-top="true">
			<block v-for="(item,index) in dataList" :key='index'>
				<view class="compline-item uni-flex" v-for="(v,k) in item.dataList" :key="k">
					<view class="item-tips y-bg">
						{{v.use_type==1?'满减券':'无门槛'}}
					</view>
					<view class="compline-item-left uni-flex uni-flex-item">
						<view class="item-left-con uni-flex d-items-center d-between">
							<view class="" v-if="v.amount">
								<text style="font-size:20upx;">￥</text> <text style="font-size:60upx;color:#EC103C;">{{v.amount}}</text>
							</view>
							<view class="" v-if="v.money">
								<text style="font-size:20upx;">￥</text> <text style="font-size:60upx;color:#EC103C;">{{v.money}}</text>
							</view>
							<view class="" style="font-size:22upx;color: #666666;" v-if="v.use_type==1">
								满￥{{v.price}}可用
							</view>

						</view>
						<view class="uni-flex-item uni-flex d-column" style="padding-left:20upx;">
							<view class="uni-flex d-items-center d-between">
								<view class="" style="font-size:26upx;color: #EC103C;">
									{{v.line_type==1?'线上通用':'线上/线下通用'}}
								</view>
							</view>

							<view class="" style="font-size:30upx;font-weight:bold;padding: 20upx 0;" v-if="v.type==1">
								全场通用
							</view>
							<view class="" style="font-size:30upx;font-weight:bold;padding: 20upx 0;" v-else>
								{{v.type==2? v.categoryName:v.productTitle }}专用
							</view>
							<view class="" style="font-size:24upx;color:666666;">
								{{v.startDate}} 至 {{v.endDate}}
							</view>
						</view>
					</view>
				</view>
				<view class="bill-btn" hover-class="btn-hover" @click="userBuyCard(item)">
					立即购买
				</view>
			</block>
		</s-pull-scroll>
	</view>
</template>

<script>
	import sPullScroll from "@/components/s-pull-scroll/index.vue"
	import complineItem from '@/components/mycom/compline-item.vue'
	export default {
		components: {
			complineItem,
			sPullScroll
		},
		data() {
			return {
				dataList: []
			}
		},
		onLoad() {
			this.refresh();
		},
		methods: {
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
			userBuyCard(e) {
				const data = {
					cmd: 'saveCouponPackageOrder',
					uid: uni.getStorageSync('uid'),
					id: e.id
				}
				this.throttle(async () => {
					const res = await this._reqw.post(data);
					if (res.result == 0) {
						this.payCard(res.body)
						console.log(res.body)
					}
					console.log(e)
				})
			},
			async payCard(data) {
				const parmas = {
					cmd: 'payCouponPackageOrder',
					uid: uni.getStorageSync('uid'),
					id: data.id
				}
				//#ifdef MP-WEIXIN
				parmas.pay_type=2
				// #endif
				//#ifdef H5
				parmas.pay_type=1
				// #endif
				const res = await this._reqw.post(parmas);
				if (res.result == 0) {
					console.log(res)
                    //#ifdef MP-WEIXIN
					this.$api.PayBywx(JSON.parse(res.body.body).sign_package, r => {
						console.log(r)
						this.$api.tip('购买成功!可前往优惠券中心查看');
					})
					// #endif
				}else{
					this.$api.tip(res.resultNote)
				}
			},
			loadData(pullScroll) {
				if (pullScroll.page == 1) {
					this.dataList = [];
				}
				let e = {
					cmd: 'getMerchantCouponPackageList',
					uid: uni.getStorageSync('uid'),
					merchant_id: uni.getStorageSync('merchantId')
				}
				const curList = [];
				this._reqw.post(e).then(res => {
					res.result == 0 ?
						(
							(res.body.dataList.length == 0 ? (pullScroll.empty()) : res.body.dataList.forEach(item => {
								curList.push(item)
							}), this.dataList = this.dataList.concat(curList), pullScroll.finish())
						) :
						this.$api.tip(res.resultNote);
				}).catch(err => {})
			}
		}
	}
</script>
<style>
	page {
		background-color: #FFFFFF;
	}
</style>

<style scoped lang="scss">
	.bill-btn {
		width: 300upx;
		line-height: 80upx;
		background: #007030;
		border-radius: 44upx;
		text-align: center;
		margin: 40upx auto 0;
		color: #FFFFFF;
		font-size: 32upx;
	}

	view {
		line-height: 1.2;
	}

	.y-bg {
		background: #FFB500;
	}

	.c-bg {
		background: #BFBFBF;
	}

	.l-btn-bg {
		background: #007030;
		border-left: 2upx dashed rgba(238, 238, 238, 0.65);
	}

	.c-btn-bg {
		background: #BFBFBF;
		border-left: 2px dashed rgba(238, 238, 238, 0.65);
	}

	.has-see-icon {
		width: 159upx;
		height: 128upx;
	}

	.compline-item {
		width: 94%;
		height: 199upx;
		background: #FFFFFF;
		border-radius: 10upx;
		margin: 20upx auto 0;
		content-visibility: auto;
		position: relative;

	}

	.item-tips {
		position: absolute;
		top: 0;
		left: 0;
		width: 146upx;
		line-height: 43upx;
		text-align: center;
		border-radius: 10upx 4upx 4upx 0px;
		font-size: 26upx;
	}

	.compline-item-left {
		display: flex;
		align-items: center;
		padding: 20upx 0;
		box-sizing: border-box;
		border-left: 2upx solid rgba(238, 238, 238, 0.65);
		border-top: 2upx solid rgba(238, 238, 238, 0.65);
		border-bottom: 2upx solid rgba(238, 238, 238, 0.65);
	}

	.compline-item-right {
		width: 88upx;
		height: 199upx;
		border-radius: 10upx;
		padding: 30upx;
		box-sizing: border-box;
		color: #FFFFFF;
		font-weight: bold;
		position: relative;
	}

	.compline-item-right::after {
		content: '';
		width: 30upx;
		height: 30upx;
		position: absolute;
		top: -15upx;
		left: -15upx;
		background-color: #FFFFFF;
		border-radius: 0 0 30upx 30upx;
	}

	.compline-item-right::before {
		content: '';
		width: 30upx;
		height: 30upx;
		position: absolute;
		left: -15upx;
		bottom: -15upx;
		background-color: #FFFFFF;
		border-radius: 30upx 30upx 0 0;
	}

	.item-left-con {
		width: 30%;
		flex-direction: column;
		border-right: 2upx dashed #D0D0D2;
		padding: 0 10upx;

	}
</style>
