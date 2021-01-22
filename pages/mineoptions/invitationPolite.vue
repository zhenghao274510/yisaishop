<template>
	<view class="">
		<view class="invitationImg ">
			<image :src="image" class="top-image"></image>
			<view class="invit-title">
				邀请好友领优惠券
			</view>
			<view class="invit-info">
				*每邀请1位好友下单可得1张优惠券
			</view>
		</view>
		<view class="invitation-con">
			<view class="invitation-con-top uni-flex d-items-center">
				<view class="">
					<text style="font-size:100upx;color:#EDC48B;">￥</text> <text style="font-size:200upx;color:#EDC48B;">{{money}}</text>
				</view>
				<view class="" style="font-size:40upx;color:#EDC48B;">
					多邀多得 上不封顶
				</view>
			</view>
			<!-- #ifdef MP-WEIXIN -->
			<button type="default" open-type="share" class="btn-class">点击分享领红包</button>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<button type="default" class="btn-class" @click="H5Share">点击分享领红包</button>
			<!-- #endif -->
			<image src="/static/img/left.png" class="inv-icon left"></image>
			<image src="/static/img/right.png" class="inv-icon right"></image>
		</view>

		<view class="inv-options">
			<image src="/static/img/yaoqingliucheng.png" class="inv-img"></image>
			<view class="uni-flex d-items-center d-between" style="width: 100%;padding-top:50upx;">
				<view class="uni-flex-item uni-flex d-items-center" style="justify-content: center;flex-direction: column;">
					<image src="/static/img/yaoqing.png" class="icon-yao"></image>
					<view class="title">
						分享给好友
					</view>
				</view>
				<view class="uni-flex-item uni-flex d-items-center" style="justify-content: center;flex-direction: column;">
					<image src="/static/img/hongbao.png" class="icon-yao"></image>
					<view class="title">
						好友领取红包并下单
					</view>
				</view>
				<view class="uni-flex-item uni-flex d-items-center" style="justify-content: center;flex-direction: column;">
					<image src="/static/img/daozhang.png" class="icon-yao"></image>
					<view class="title">
						{{money}}元奖励到账
					</view>
				</view>
			</view>
		</view>
		<view class="bg-img">

		</view>
		<view class="end-con">
			<jyf-parser :html="content" ref="article"></jyf-parser>
		</view>
	</view>
</template>

<script>
	import jyfParser from "@/components/jyf-parser/jyf-parser";
	export default {
		components:{
			jyfParser
		},
		data() {
			return {
				content:'',
				image: '',
				money:0
			}
		},
		onLoad() {
			this.loadData();
		},
		methods: {
			H5Share(){
				uni.showModal({
					cancelText:"取消",
					confirmText:"确定",
					confirmColor:"#006F2F",
					content:"点击右上角...分享给好友!"
				})
			},
			loadData() {
				let e = {
					cmd: 'inviteInfo'
				}
				this._reqw.post(e).then(res => {
					res.result == 0 ?(this.image=res.body.image,res.body.dataList.forEach(item=>{
						item.type==1?(this.money = item.money, this.content=this.$api.formText(item.content)):""
					})): this.$api.tip(res.resultNote)
				}).catch(err => {})
			}
		},
		// #ifdef MP-WEIXIN
		onShareAppMessage() {
			return {
				title: '邀请有礼',
				path: `/pages/sharepage/invitationPoliteShare?id=${uni.getStorageSync('uid')}`
			}
		}
		// #endif
	}
</script>

<style scoped lang="scss">
	view {
		line-height: 1.2;
	}
	.top-image{
		width: 750upx;
		height: 600upx;
		position: absolute;
		top: 0;
		left: 0;
		z-index:0;
	}

	.invitationImg {
		width: 750upx;
		height: 600upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
	}

	.invit-title {
		font-size: 60upx;
		font-weight: bold;
		color: #FFFFFF;
		margin-top: 80upx;
		z-index: 9;
	}

	.invit-info {
		font-size: 26upx;
		color: #E2FFEE;
		z-index: 9;
		margin-top: 20upx;
	}

	.invitation-con {
		width: 695upx;
		height: 770upx;
		background: #FFFFFF;
		border-radius: 20upx;
		margin: -40% auto 24upx;
		padding: 48upx 58upx;
		box-sizing: border-box;
		position: relative;
	}

	.invitation-con-top {
		width: 100%;
		height: 509upx;
		background: url(../../static/img/jinebg.png);
		background-size: 100% 100%;
		flex-direction: column;
		justify-content: center;
	}

	.btn-class {
		margin-top: 50upx;
		background: #007030;
		border-radius: 44upx;
		color: #FFFFFF;
		font-size: 34upx;
	}

	.inv-icon {
		position: absolute;

	}

	.left {
		width: 112upx;
		height: 93upx;
		top: 0;
		left: -20upx;
		transform: translateY(-80%);
	}

	.right {
		width: 124upx;
		height: 118upx;
		top: 0;
		right: -20upx;
		transform: translateY(-80%);
	}

	.inv-options {
		width: 695upx;
		height: 461upx;
		background: #FFFFFF;
		border-radius: 20upx;
		margin: 0 auto;
		padding: 45upx 10upx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.inv-img {
			width: 472upx;
			height: 120upx;
		}

		.icon-yao {
			width: 82upx;
			height: 79upx;
		}

		.title {
			width:220upx;
			font-size:24upx;
			padding-top:20upx;
			text-align: center;
		}
	}

	.bg-img {
		width: 691upx;
		height: 58upx;
		margin: 30upx auto 0;
		background: url(../../static/img/huodongguize.png);
		background-size: 100% 100%;
	}

	.end-con {
		width: 691upx;
		margin: 0 auto 50upx;
		background: #FFFFFF;
		border-radius: 0 0 20upx;
		padding: 26upx;
		box-sizing: border-box;
	}
</style>
