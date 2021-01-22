<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<!-- <nav-bar title='团长中心' type='3' fontColor='#FFF'></nav-bar> -->
		<!-- #endif -->
		<s-pull-scroll ref="pullScroll" :pullDown="pullDown" :pullUp="loadData" :back-top="true">
			<!-- <view class="indexBg"></view> -->
			<view class="group-con">
				<view class="group-top">
					<view class="uni-flex d-between d-items-center" style="padding: 30upx 0 0 30upx;">
						<view class="uni-flex d-items-center">
							<image :src="dataobject.icon" class="user-icon"></image>
							<view class="">
								<view class="">
									{{dataobject.nickname}}
								</view>
								<view class="" style="font-size: 26upx;">
									昵称: {{dataobject.name}}
								</view>
							</view>
						</view>
						<!-- <navigator url="./withdrawal" class="bill-btn uni-flex d-items-center d-content-center">
							提现记录 <view class="uni-icon uni-icon-arrowright" style="font-size:26upx;color: #FFFFFF;">
							</view>
						</navigator> -->
					</view>
					<view class="uni-flex d-items-center" style="padding: 50upx 30upx;">
						<view class="">
							<view class="" style="font-size:42upx;font-weight: bold;color: #000000;">
								{{dataobject.balance}}
							</view>
							<view class="" style="font-size:22upx;color:#999999;">
								账户余额
							</view>
						</view>
						<!-- <view class="uni-flex-item uni-flex d-items-center d-content-center">
							<navigator url="./applywithdrawals" class="apply-withdrawals">
								申请提现
							</navigator>
						</view> -->
					</view>
				</view>


				<view class="group-middle">
					<navigator url="./withDetails" class="uni-flex d-between d-items-center">
						<view class="" style="font-size:30upx;color: #333333;">
							收入明细
						</view>
						<view class="uni-icon uni-icon-arrowright" style="font-size:26upx;color:#999999;"></view>
					</navigator>
					<view class="uni-flex uni-flex-item d-items-center">
						<view class="uni-flex uni-flex-item d-content-center d-items-center" style="flex-direction: column;">
							<view class="group-money">
								{{dataobject.number1}}
							</view>
							<view class="group-sec">
								累计预支收入
							</view>
						</view>
						<view class="uni-flex uni-flex-item d-content-center d-items-center" style="flex-direction: column;">
							<view class="group-money">
								{{dataobject.number2}}
							</view>
							<view class="group-sec">
								本月预支收入
							</view>
						</view>
						<view class="uni-flex uni-flex-item d-content-center d-items-center" style="flex-direction: column;">
							<view class="group-money">
								{{dataobject.number3}}
							</view>
							<view class="group-sec">
								今日预支收入
							</view>
						</view>

					</view>

				</view>
				<view class="group-bottom">
					<navigator :url="`./myGroupList?id=${merchant_id}`" class="uni-flex d-between d-items-center d-border-bottom" style="padding: 30upx 0;">
						<view class="" style="font-size:30upx;color: #333333;">
							我的团单
						</view>
						<view class="uni-icon uni-icon-arrowright" style="font-size:26upx;color:#999999;"></view>
					</navigator>
					<navigator :url="`./mySubordinates?id=${merchant_id}&type=${flag}`" class="uni-flex d-between d-items-center" style="padding: 30upx 0;">
						<view class="" style="font-size:26upx;color: #333333;">
							我的下级
						</view>
						<view class="uni-icon uni-icon-arrowright" style="font-size:26upx;color:#999999;"></view>
					</navigator>
				</view>
				<view class="uni-flex d-items-center d-around" style="margin:100upx 0;">
					<view class="group-btn one-btn" hover-class="btn-hover" @click="userOptions(0)">
						自提码核销
					</view>
					<view class="group-btn two-btn" hover-class="btn-hover" @click="userOptions(1)">
						扫码核销
					</view>
				</view>
			</view>
		</s-pull-scroll>
		<home-poup type="2" ref='homePoup' @click="userToCode"></home-poup>
	</view>
</template>

<script>
	import sPullScroll from "@/components/s-pull-scroll/index.vue"
	import mineServceList from '@/components/mycom/mine-servce.vue';
	import mineOrderList from '@/components/mycom/mine-order-list.vue';
	import uniGird from "@/components/uni-grid/uni-grid.vue"
	import uniGirdItem from "@/components/uni-grid-item/uni-grid-item.vue"
	import homePoup from "@/components/mycom/homePoup.vue"
	export default {
		components: {
			homePoup,
			uniGird,
			uniGirdItem,
			mineServceList,
			mineOrderList,
			sPullScroll
		},
		data() {
			return {
				phone: '',
				merchant_id: '',
				flag:0,
				dataobject: {
					balance: "", // 余额
					number1: "", // 累计
					number2: "", // 本月预计
					number3: "", // 今日预计
					name: "", //昵称
					nickname:"",
					icon: "" //头像
				}
			};
		},
		onLoad(options) {
			this.merchant_id = options.id;
			// 2：普通团长3：超级团长
			this.flag=options.flag;
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
			userOptions(ind) {
				ind == 0 ? this.$refs.homePoup.open() : this.getScode()
			},
			userToCode(e) {
				let parmas = {
					cmd: 'checkOrder',
					code: e.result
				}
				this._reqw.post(parmas).then(res => {
					res.rsult == 0 ? (this.$api.tip('核销成功!')) : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			loadData(pullScroll) {
				let parmas = {
					cmd: 'merchantInfo',
					merchant_id: this.merchant_id
				}
				this._reqw.post(parmas).then(res => {
					res.result == 0 ? (this.dataobject = res.body,pullScroll.finish()): this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			getScode() {
				// #ifdef MP-WEIXIN
				let that=this;
				uni.scanCode({
					success(res) {
						console.log(res)
						that.userToCode(res)
					}
				})
				// #endif
				// #ifdef H5
				that.$wechat.scanQRCode(res => {
					console.log(res)
					this.userToCode(res)
				})
				// #endif
			},
		}

	};
</script>

<style scoped lang="scss">
	.group-con {
		padding: 30upx;
		position: absolute;
		width: 100%;
		box-sizing: border-box;
	}

	.group-top {
		width: 100%;
		height: 341upx;
		background: #FFFFFF;
		box-shadow: 0px 3upx 8upx 0px rgba(232, 232, 232, 0.16);
		border-radius: 15upx;
	}

	.user-icon {
		width: 100upx;
		height: 100upx;
		border-radius: 50%;
		margin-right: 30upx;
	}

	.bill-btn {
		width: 148upx;
		height: 46upx;
		background: #057535;
		border-radius: 23upx 0px 0px 23upx;
		font-size: 22upx;
		color: #FDFFFE;
	}

	.apply-withdrawals {
		width: 166upx;
		line-height: 60upx;
		text-align: center;
		background: #FFB600;
		border-radius: 30upx;
		font-size: 24upx;
		color: #FFFFFF;
	}

	.group-middle {
		width: 100%;
		background: #FFFFFF;
		border-radius: 20upx;
		padding: 50upx 30upx;
		box-sizing: border-box;
		margin-top: 30upx;
	}

	.group-bottom {
		width: 100%;
		background: #FFFFFF;
		border-radius: 20upx;
		padding: 0 30upx;
		box-sizing: border-box;
		margin-top: 30upx;
	}

	.group-money {
		font-size: 42upx;
		font-weight: bold;
		color: #000000;
	}

	.group-sec {
		width: 179upx;
		line-height: 42upx;
		background: #F6F6F6;
		border-radius: 21upx;
		text-align: center;
		font-size: 24upx;
		color: #666666;
	}

	.one-btn {
		background: #007030;
	}

	.two-btn {
		background: #FFB600;
	}

	.group-btn {
		width: 302upx;
		line-height: 70upx;
		text-align: center;
		border-radius: 35upx;
		font-size: 30upx;
		color: #FFFFFF;
	}
</style>
