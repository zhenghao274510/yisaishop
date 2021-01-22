<template>
	<view class="">
		<view class="wallet-con d-content-center d-items-center">
			<view class="">
				<text class="money">{{dataobject.balance}}</text><text class="price-symbol">元</text>
			</view>
			<navigator url="/pages/mineoptions/walletTopUpDetails" class="wallet-driction">
				交易明细 >>
			</navigator>
		</view>
		<view class="uni-flex d-items-center list-con">
			<view class="uni-flex d-items-center d-content-center list-item-con" v-for="(v,k) in dataobject.dataList" :key="k">
				<view class="list-item uni-flex d-items-center d-content-center" :class="{'y-bg':active==k}" @click.stop="getCurrent(v,k)">
					<view class="" :style="{'color':active==k?'#ffffff':'#000000'}">
						<text :style="{'color':active==k?'#ffffff':'#000000'}" class="pay-price">{{v.price}}</text>元
					</view>
					<view :style="{'color':active==k?'#ffffff':'#666666'}" class="send-price">
						送{{v.money}}元
					</view>
				</view>
			</view>
			<view class="uni-flex d-items-center d-content-center list-item-con">
				<view class="list-item uni-flex d-items-center d-content-center">
					<input type="text" value="" v-model="money" placeholder="其他金额" class="input" @focus="focus" />
				</view>
			</view>
		</view>
		<view class="pay-btn" hover-class="btn-hover" @click="getOrderId">
			充值
		</view>
		<view class="title-info-con">
			<view class="title-info">
				充值说明
			</view>
			<view class="" style="padding-top:20upx;">
				<jyf-parser :html="content" ref="article"></jyf-parser>
			</view>
		</view>
	</view>
</template>

<script>
	import jyfParser from "@/components/jyf-parser/jyf-parser.vue"
	export default {
		components: {
			jyfParser
		},
		data() {
			return {
				active: 'no',
				money: '',
				dataobject: {
					balance: "",
					content: "",
					dataList: []
				},
				currentobj: {
					id: '',
					price: 0,
					money: 0
				},
				content: ''
			}
		},
		onLoad() {
			this.loadData();
		},
		methods: {
			focus() {
				this.active = 'no';
			},
			loadData() {
				let parmas = {
					cmd: 'getRechargeList',
					uid: uni.getStorageSync('uid')
				}
				this._reqw.post(parmas).then(res => {
					res.result == 0 ? (this.content = this.$api.formText(res.body.content), this.dataobject = res.body) : this.$api.tip(
						res.resultNote)
				}).catch(err => {})
			},
			getCurrent(e, k) {
				this.money = '';
				this.active=k;
				this.currentobj = e;
				this.throttle(()=>{
					this.getOrderId();
				})
			},
			async getOrderId() {
				let parmas = {
					cmd: 'rechargeOrder',
					uid: uni.getStorageSync('uid')
				};
				if (this.active=='no') {
					if (this.money == '') {
						this.$api.tip('请输入充值金额!');
						return
					}
					parmas.type = 2;
					parmas.amount = this.money;
				} else {
					parmas.type = 1;
					parmas.amount = this.currentobj.price;
					parmas.id = this.currentobj.id;
				}
				this.$api.loading('提交中...')
				//  #ifdef MP-WEIXIN
				parmas.pay_type = 2
				//  #endif
				//  #ifdef H5
				parmas.pay_type = 1
				//  #endif
				const res = await this._reqw.post(parmas);
				uni.hideLoading();
				if (res.result != 0) {
					this.$api.tip(res.resultNote);
					return
				}
				if(res.body.body){
					this.pay(res.body.body);
				}
			},
			pay(res) {
				console.log(JSON.parse(res))
				// #ifdef MP-WEIXIN
				this.$api.PayBywx(JSON.parse(res).sign_package, r => {
					this.$api.tip('充值成功!');
					this.$api.back()
				})
				// #endif
				// #ifdef H5
				this.$api.onBridgeReady(res, r => {
					this.$api.tip('充值成功!');
					this.$api.back()
				})
				// #endif
			}
		}
	}
</script>

<style scoped>
	.pay-price {
		color: #000000;
		font-size: 43upx;
	}

	.send-price {
		color: #666666;
		font-size: 29upx;
	}

	.pay-btn {
		width: 594upx;
		line-height: 88upx;
		text-align: center;
		background: #007030;
		border-radius: 44upx;
		font-size: 34upx;
		color: #F9FFFC;
		margin: 0 auto;
	}

	.y-bg {
		background: #007030 !important;
	}

	.title-info-con {
		padding: 30upx;
		text-indent: 30upx;
	}

	.title-info {
		font-size: 30upx;
		color: #000000;
		position: relative;
	}

	.title-info::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		width: 5upx;
		height: 23upx;
		background: #007030;
		border-radius: 3upx;
	}

	.input {
		text-align: center;
	}

	.wallet-con {
		width: 750upx;
		height: 328upx;
		background: url(../../static/img/qianbaochongzhi.png);
		background-size: 100% 100%;
		display: flex;
		flex-direction: column;
	}

	.money {
		font-size: 90upx;
		font-weight: bold;
		color: #FFFFFF;
	}

	.price-symbol {
		font-size: 40upx;
		color: #FFFFFF;
	}

	.wallet-driction {
		font-size: 24upx;
		color: #FFFFFF;
	}

	.list-con {
		padding: 60upx 0;
		flex-wrap: wrap;
	}

	.list-item-con {
		width: 33.3333%;
	}

	.list-item {
		width: 211upx;
		height: 131upx;
		border: 2upx solid #CCCCCC;
		border-radius: 6upx;
		flex-direction: column;
		margin-bottom: 30upx;
	}
</style>
