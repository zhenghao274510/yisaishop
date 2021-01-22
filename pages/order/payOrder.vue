<template>
	<view class="content">
		<view class="bill-item-con">
			<view class="bill-item-title" style="text-align: center;">
				支付金额
			</view>
			<view class="bill-item-input-con uni-flex d-items-center d-content-center">
				<view class="splce-price">
					￥{{money}}
				</view>
			</view>

		</view>
		<view class="bill-item-con">
			<radio-group @change="payChange">
				<label class="uni-flex d-items-center d-between bill-item" v-for="item in payArray" :key="item.value">
					<view class="uni-flex d-items-center ">
						<image :src="item.image" class="icon-weixin"></image>
						<view class="customize-form-item__radio__text">{{item.name}}</view>
					</view>
					<radio :value="item.value" :checked="item.value === payType" color="#007030" style="transform:scale(0.7)" />
				</label>
			</radio-group>
		</view>
		<view class="bill-btn" hover-class="btn-hover" @click='payMoney'>
			确认支付
		</view>
		<home-poup ref="homePoup" type='0' @pay="onPay"></home-poup>
	</view>
</template>

<script>
	import homePoup from "@/components/mycom/homePoup.vue";
	import md5 from "js-md5";
	export default {
		components: {
			homePoup
		},
		data() {
			return {
				payArray: [{
						name: '微信支付',
						image: '/static/img/wxpay.png',
						value: '0'
					},
					{
						name: '余额支付',
						image: '/static/img/yue.png',
						value: '1'
					}
				],
				payType: '0',
				money:'',
				id: '',
				type: '',
				payword: 0,
				balance: 0
			}
		},
		onLoad(options) {
			this.money = this.$api.parsePrice(options.money);
			this.id = options.id;
			this.type = options.type;
		},
		onShow() {
			this.getUserInfo();
		},
		methods: {
			payChange(e) {
				this.payType = e.detail.value;
			},
			async getUserInfo() {
				if (uni.getStorageSync('uid')) {
					let e = {
						cmd: 'userInfo',
						uid: uni.getStorageSync('uid')
					};
					const res = await this._reqw.post(e);
					this.payword = res.body.payword;
					this.balance = res.body.balance;
				}
			},
			payPingTai() {
				if (this.payType == 1) {
					if (this.payword == 1) {
						this.$refs.homePoup.open()
					} else {
						this.$api.showTip("你还没有设置支付密码,是否前往设置?", r => {
							if (r.confirm) {
								this.$api.navTo('/pages/mineoptions/setpossword?id=2')
							}
						})
					}
				} else {
					this.payOrder()
				}
			},
			payMoney() {
				this.throttle(() => {
					// #ifdef MP-WEIXIN
					uni.requestSubscribeMessage({
						tmplIds: ['5uglIwp5OjeQagJu7Zcdsyo9DRZZHM79QQkJ6KkpSYY'],
						complete: () => {
							this.payPingTai();
						}
					})
					// #endif
					// #ifdef H5
					this.payPingTai();
					// #endif
				})
			},
			async payOrder() {
				this.$api.loading('提交中...');
				let parmas = {
					cmd: 'payOrder',
					uid: uni.getStorageSync('uid'),
					id: this.id,
					orderMoney: this.money
				}
				//#ifdef MP-WEIXIN
				parmas.pay_type = 2;
				// #endif
				//#ifdef H5
				parmas.pay_type = 1;

				// #endif
				const res = await this._reqw.post(parmas);

				uni.hideLoading();
				if (res.result != 0) {
					this.$api.tip(res.resultNote);
					return
				}
				this.payTypeOrder(res.body.body);
			},
			async paymimaOrder(e) {
				this.$api.loading('提交中...');
				let parmas = {
					cmd: 'payByBalance',
					uid: uni.getStorageSync('uid'),
					orderId: this.id,
					orderMoney: this.money,
					payword: md5(e)
				}
				//#ifdef MP-WEIXIN
				parmas.pay_type = 2
				// #endif

				//#ifdef H5
				parmas.pay_type = 1
				// #endif
				const res = await this._reqw.post(parmas);

				uni.hideLoading();
				if (res.result != 0) {
					this.$api.tip(res.resultNote);
					return
				}
				this.$api.tip("支付成功!");
				this.navigar();
			},
			payTypeOrder(res) {
				//#ifdef MP-WEIXIN
				this.$api.PayBywx(JSON.parse(res).sign_package, r => {
					this.$api.tip('支付成功！');
					this.navigar();
				})
				// #endif

				//#ifdef H5
				this.$api.onBridgeReady(res, r => {
					this.$api.tip('支付成功！');
					this.navigar();
				})
				// #endif
			},
			onPay(e) {
				this.paymimaOrder(e)
			},
			navigar() {
				this.$api.redirectTo(`/pages/order/paySuccess?type=${this.type}`);
			}

		}
	}
</script>

<style lang="scss" scoped>
	.icon-weixin {
		width: 46upx;
		height: 40upx;
		margin-right: 30upx;
	}

	.bill-item {
		padding: 30upx;
	}

	.bill-item-con {
		// height: 231upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 20upx;
		margin-top: 20upx;
	}

	.bill-item-title {
		height: 106upx;
		line-height: 106upx;
		padding: 0 30upx;
		font-size: 26upx;
		color: rgba(102, 102, 102, 1);
		border-bottom: 2upx solid rgba(242, 242, 242, 1);
	}

	.bill-item-input-con {
		height: 123upx;
		padding: 0 30upx;
	}

	.splce-price {
		font-size: 56upx;
		font-weight: 800;
		color: rgba(51, 51, 51, 1);
		color: #ff0000;
	}

	.placeholder {
		font-size: 26upx;
		color: rgba(204, 204, 204, 1);
	}

	.bill-btn {
		width: 707upx;
		line-height: 88upx;
		background: #007030;
		border-radius: 44upx;
		text-align: center;
		margin: 100upx auto 0;
		color: #FFFFFF;
		font-size: 32upx;
	}
</style>
