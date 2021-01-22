<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="" v-if="showBind" style="width: 100%;">
			<view class="list-con">
				<view class="d-flex d-between d-items-center d-border">
					<image src="/static/img/shoujihao.png" mode="" class="reg-img"></image>
					<input type="number" class="reg-input" placeholder="请输入手机号" placeholder-style="color:#999999" v-model="phone" />
				</view>
				<view class="d-flex d-between d-items-center d-border">
					<image src="/static/img/yanzhengma.png" mode="" class="reg-img"></image>
					<input type="number" value="" class="reg-input" placeholder="短信验证码" placeholder-style="color:#999999" v-model="YZM" />
					<text class="y-z-m" @click="getYZM">
						{{ rTime }}
						<text v-if="btnState">s后重发</text>
					</text>
				</view>
				<view class="d-flex d-between d-items-center d-border">
					<image src="/static/img/yaoqingma.png" mode="" class="reg-img"></image>
					<input type="text" value="" class="reg-input" placeholder="请输入邀请码(选填)" placeholder-style="color:#999999" v-model="inverteCode" />
				</view>
			</view>
			<view class="reg-btn" hover-class="btnHover" @click="subOrder">绑 定</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				phone: '',
				rTime: '获取验证码',
				interval: null,
				btnState: false,
				YZM: '',
				userInfo: {
					uid: "", //有的话直接登录，没有的话调绑定
					openId: "",
					nickname: "",
					sex: "",
					icon: ""
				},
				showBind: true,
			};
		},
		onLoad() {
			this.code = this.getUrlCode().code;
			console.log(this.code)
			this.code != '' ? this.getUserInfo() : '';
		},
		methods: {
			getUrlCode() { // 截取url中的code方法
				var url = location.search
				this.winUrl = url
				var theRequest = new Object()
				if (url.indexOf("?") != -1) {
					var str = url.substr(1)
					var strs = str.split("&")
					for (var i = 0; i < strs.length; i++) {
						theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1])
					}
				}
				return theRequest
			},
			getUserInfo() {
				let parmas = {
					cmd: 'wgauthorizationUser',
					code: this.code
				}
				this._reqw.post(parmas).then(res => {
					res.result == 0 ? (res.body.uid != '' ? this.$api.back() : this.userInfo = res.body) : this.$api.tip(res.rsultNote)
				}).catch(err => {})
			},
			getYZM() {
				this.phone == '' ? this.$api.tip('手机号不能为空!') : !this.$api.regPhone(this.phone) ? this.$api.tip('请输入正确的手机号!') : this
					.rTime == '获取验证码' ?
					this._reqw.post({
						cmd: 'sendSms',
						phone: this.phone
					}).then(res => {
						res.result == 0 ? (this.rTime = 60, this.btnState = true, this.interval = setInterval(() => {
							--this.rTime <= 0 ? (this.rTime = '获取验证码', clearInterval(this.interval), this.btnState = false) : 0
						}, 1000), this.$api.tip(res.resultNote)) : this.$api.tip(res.resultNote)
					}).catch(err => {}) : 0
			},
			subOrder() {
				this.$api.loading('提交中...');
				let parmas = {
					cmd: 'wgbindPhone',
					phone: this.phone,
					nickname: this.userInfo.nickname,
					openid: this.userInfo.openId,
					inviteCode: getApp().globalData.inviteCode,
					sex: this.userInfo.sex,
					icon: this.userInfo.icon,
					code: this.YZM
				};
				this.phone == '' ? this.$api.tip('手机号不能为空!') : !this.$api.regPhone(this.phone) ? this.$api.tip('请输入正确的手机号!') : this
					.YZM ==
					'' ? this.$api.tip('请输入验证码') : this._reqw.post(parmas).then(res => {
						res.result == 0 ?
							(this.$api.tip(res.resultNote), this.$api.back(), getApp().globalData.uid = res.body.uid,
								uni.setStorageSync('uid', res.body.uid)) :
							this.$api.tip(res.resultNote)
					}).catch(err => {})
			}
		},
		onHide() {
			if (this.interval) {
				clearInterval(this.interval);
			}
		}
	};
</script>

<style lang="scss" scoped>
	.list-con {
		padding: 0 60rpx;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	.logo {
		height: 163rpx;
		width: 210rpx;
		margin: 100rpx auto;
	}

	.d-border {
		position: relative;
		border-bottom: 1px solid #f2f2f2;
		padding: 40upx 0;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.reg-img {
		width: 35upx;
		height: 43upx;
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
	}

	.reg-input {
		padding-left: 50upx;
	}

	.y-z-m {
		font-weight: 500;
		color: rgba(255, 144, 0, 1);
		position: relative;
	}

	.y-z-m::before {
		content: '';
		width: 2upx;
		height: 22upx;
		background-color: #e7e7e7;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: -30upx;
	}

	.reg-btn {
		width: 85%;
		height: 88upx;
		background: rgba(55, 193, 187, 1);
		box-shadow: 0px 5upx 8upx 0px rgba(55, 193, 187, 0.3);
		border-radius: 10upx;
		margin: 160upx auto 0;
		text-align: center;
		line-height: 88upx;
		color: #ffffff;
		font-size: 34upx;
		font-weight: bold;
	}
</style>
