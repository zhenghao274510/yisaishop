<template>
	<view class="">
		<view class="invitationImg ">
			<image :src="image" class="top-image"></image>
			<view class="invit-title">
				邀请好友领优惠券
			</view>
			<view class="invit-info">
				- 新人专享 -
			</view>
		</view>
		<view class="invitation-con">
			<view class="invitation-con-top uni-flex d-items-center">
				<view class="">
					<text style="font-size:100upx;color:#EDC48B;">￥</text> <text style="font-size:200upx;color:#EDC48B;">{{dataobject.money}}</text>
				</view>
				<view class="" style="font-size:40upx;color:#EDC48B;">
					多邀多得 上不封顶
				</view>
			</view>
			<button type="default" class="btn-class" @click="userOptions">{{isuser==1?'立即下单':'立即领取'}}</button>
			<image src="/static/img/left.png" class="inv-icon left"></image>
			<image src="/static/img/right.png" class="inv-icon right"></image>
		</view>
		<view class="end-btn">
			限平台首单用户领取！
		</view>
		<view class="bg-img">
		
		</view>
		<view class="end-con">
			<jyf-parser :html="content" ref="article"></jyf-parser>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				image: '',
				dataobject: {
					money: ''
				},
				content: '',
				isuser: 0
			}
		},
		onLoad(options) {
			if (options.id) {
				getApp().globalData.inviteCode =options.id
			}
			this.loadData();
		},
		onShow() {
			if (uni.getStorageSync('uid')) {
				this.isuser = 1
			}
		},
		methods: {
			async loadData() {
				const res = await this._reqw.post({
					cmd: 'inviteInfo'
				});
				if (res.result != 0) {
					this.$api.tip(res.resultNote);
					return
				}
				this.image = res.body.image;
				res.body.dataList.forEach(item => {
					item.type == 2 ? this.dataobject = item : ""
				})
				this.content = this.$api.formText(this.dataobject.content)
			},
			userOptions() {
				this.isuser == 0 ? this.$api.navTo('/pages/index/author') : this.$api.reLaunch('/pages/public/noNearShop')
			}
		},
	}
</script>

<style scoped lang="scss">
	view {
		line-height: 1.2;
	}

	.top-image {
		width: 750upx;
		height: 600upx;
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
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
	}

	.invit-info {
		font-size: 26upx;
		color: #E2FFEE;
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

	.end-btn {
		width: 691upx;
		line-height: 88upx;
		text-align: center;
		background: #DCDCDC;
		border-radius: 44upx;
		margin: 40upx auto;
		color: #666666;
		font-size: 32upx;
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
