<template>
	<view class="">
		<view class="vip-main">
			<view class="vip-con">
				<view class="vip-title">
					门店结账时出示此二维码
				</view>
				<view class="uni-flex d-content-center d-items-center" style="flex-direction: column;">
					
					<canvas canvas-id="qrcode" class="qrcode-img"></canvas>
					<view class="">
						{{dataobject.virtualcardnumber}}
					</view>
				</view>
			<!-- 	<view class="vip-con-btn" hover-class="btn-hover" @tap.stop="openwx">
					<image src="/static/img/vipweixin.png" class="weixin"></image>
					<view style="font-size:30upx;color:#FFFFFF;">
						微信支付
					</view>
				</view> -->
			</view>
			<view class="vip-bottom uni-flex   d-items-center">
				<view class="vip-bottom-left">
					<view class="" style="font-size: 30upx;font-weight: bold;color: #006F2F;">
						签到可赚取积分
					</view>
					<view class="" style="font-size:24upx;color: #656565;">
						积分可兑换优惠券、商品
					</view>
					<view class="vip-bottom-btn" hover-class="btn-hover" @tap.stop="userOptions">
						去签到
					</view>
				</view>
				<view class="vip-bottom-right">
					<image :src="dataobject.image" class="add-img"></image>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import uQRCode from '@/common/js/uqrcode.js'
	export default {
		data() {
			return {
				size: 288,
				loadMake: false,
				dataobject: {
					cardnumber: "", // 卡面号
					virtualcardnumber: "", //虚拟卡面号
					image: "" //图片
				}
			}
		},
		onShow() {
			this.loadData();
			console.log('uid', uni.getStorageSync('uid'));
		},
		methods: {
			async make() {
				// 回调方式
				uQRCode.make({
					canvasId: 'qrcode',
					componentInstance: this,
					text:this.dataobject.cardnumber,
					size: 144,
					margin: 10,
					backgroundColor: '#ffffff',
					foregroundColor: '#000000',
					fileType: 'jpg',
					errorCorrectLevel: uQRCode.errorCorrectLevel.H,
					success: res => {
						console.log(res)
					}
				})
			},
			async loadData() {
				const e = {
					cmd: 'getVipInfo',
					uid: uni.getStorageSync('uid')
				}
				const res = await this._reqw.post(e);
				if (res.result != 0) {
					this.$api.tip(res.resultNote);
					return
				}
				this.dataobject = res.body;
				this.make();

			},
			userOptions() {
				this.$api.navTo('/pages/signIn/signPolite')
			},
			openwx() {
				console.log(111)
				// wx.openOfflinePayView()
			}
		}
	}
</script>
<style>
	page {
		background: #007030;
	}
</style>

<style scoped lang="scss">
	.vip-main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.vip-con {
		width: 699upx;
		height: 677upx;
		background: #FFFFFF;
		border-radius: 15upx;
		margin: 30upx auto;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.vip-title {
		width: 100%;
		line-height: 119upx;
		background: #F5F5F5;
		border-radius: 15upx 15upx 0px 0px;
		text-align: center;
		font-size: 30upx;
		font-weight: bold;
		color: #000000;
	}

	.qrcode-img {
		width: 144px;
		height: 144px;
		margin:30upx 0 0;
	}

	.vip-con-btn {
		width: 338upx;
		height: 77upx;
		line-height: 77upx;
		background: #006F2F;
		border-radius: 38upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.weixin {
		width: 40upx;
		height: 40upx;
		margin-right: 20upx;
	}

	.vip-bottom {
		width: 699upx;
		height: 202upx;
		background: #FFFFFF;
		border-radius: 15upx;
		padding: 10upx;
		box-sizing: border-box;
	}

	.vip-bottom-btn {
		width: 143upx;
		line-height: 46upx;
		background: #FFB500;
		border-radius: 23upx;
		text-align: center;
		font-size: 24upx;
		color: #000000;
	}

	.vip-bottom-left {
		margin: 0 18upx;
	}

	.vip-bottom-right {
		width: 374upx;
		height: 187upx;
		border-radius: 15upx;

		.add-img {
			width: 374upx;
			height: 187upx;
		}
	}
</style>
