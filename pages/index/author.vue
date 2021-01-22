<template>
	<view>
		<view class="header">
			<image src="/static/logo.jpg" />
		</view>
		<button class="bottom" type="primary" open-type="getUserInfo" lang="zh_CN" @getuserinfo="bindGetUserInfo" v-if="show">微信授权登录</button>
		<button class="bottom" type="primary" open-type="getPhoneNumber" lang="zh_CN" @getphonenumber="bindGetPhoneNumber"
		 v-else>进入</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {
					openid: "",
					nickname: "",
					icon: "",
					sex: ""
				},
				show: true
			};
		},
		methods: {
			bindGetPhoneNumber(e) {
				console.log(e)
				let self = this;
				uni.getSetting({
					success(wxoptions) {
						if (wxoptions.authSetting['scope.userInfo']) {
							uni.login({
								success: async options => {
									console.log(options)
									let parmas = {
										cmd: 'wxbindPhone',
										encryptedData: e.detail.encryptedData,
										iv: e.detail.iv,
										uid: self.uid,
										sex: self.userInfo.sex,
										nickname: self.userInfo.nickname,
										openid: self.userInfo.openid,
										icon: self.userInfo.icon,
										code: options.code,
										inviteCode: getApp().globalData.inviteCode,
										merchantId:getApp().globalData.merchantId
									};
									const res = await self._reqw.post(parmas);
									if (res.result == 0) {
										uni.setStorageSync('uid', res.body.uid);
										uni.navigateBack({
											delta: 1
										})
									} else {
										self.$api.tip(res.resultNote)
									}
								}
							})
						}
					}
				})
			},
			bindGetUserInfo(e) {
				let self = this;
				console.log(e)
				if (e.detail.errMsg == "getUserInfo:ok") {
					uni.login({
						success: function(res) {
							console.log(res)
							let parmas = {
								code: res.code,
								cmd: 'wxauthorizationUser',
								userInfo: e.detail.userInfo
							};
							console.log(parmas)
							self._reqw.post(parmas).then(res => {
								if (res.result == 0) {
									console.log(res)
									if (res.body.uid) {
										uni.setStorageSync('uid', res.body.uid);
										self.$api.back()
									} else {
										self.show = false;
										self.userInfo = res.body;
									}
								} else {
									self.$api.tip(res.resultNote)
								}
							})
						}
					})
				}
			}
		}
	};
</script>
<style>
	page {
		background: #FFFFFF;
	}
</style>
<style scoped lang="scss">
	.header {
		margin: 90px auto;
		text-align: center;
	}

	.hide {
		opacity: 0;
	}

	.header image {
		width: 388upx;
		height: 390upx;
	}

	.bottom {
		height: 80rpx;
		width: 200px;
		background: #006F2F;
		border-radius: 12rpx;
		margin: 70rpx auto;
		font-size: 30rpx;
	}
</style>
