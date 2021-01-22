<template>
	<view>
		<view class="list-con">
			<view class="list-item uni-flex uni-space d-items-center d-border-bottom">
				<image src="/static/img/zhifushouji.png" mode="" class="reg-img"></image>
				<input type="number" class="reg-input" placeholder="请输入手机号" placeholder-style="color:#999999" v-model="phone" />
			</view>
			<view class="list-item uni-flex uni-space d-items-center">
				<image src="/static/img/yanzhengma.png" mode="" class="reg-img"></image>
				<input type="number" value="" class="reg-input" placeholder="短信验证码" placeholder-style="color:#999999" v-model="YZM" />
				<text class="y-z-m" @click="getYZM">
					{{ rTime }}
					<text v-if="btnState">s后重发</text>
				</text>
			</view>
		</view>
		<view class="reg-btn" hover-class="btn-hover" @click="subOrder">确 定</view>
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
				code: ''
			};
		},
		methods: {
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
				let Y = this.YZM.trim();
				let parmas = {
					cmd: 'editPhone',
					phone: this.phone,
					uid: uni.getStorageSync('uid'),
					code: this.YZM
				};
				this.phone == '' ? this.$api.tip('手机号不能为空!') : !this.$api.regPhone(this.phone) ? this.$api.tip('请输入正确的手机号!') : Y ==
					'' ? this.$api.tip('请输入验证码') : this._reqw.post(parmas).then(res => {
						res.result == 0 ?
							(this.$api.tip(res.resultNote),this.$api.prePage.dataobject.phone=this.phone,this.$api.back()) :
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
	.file-xie {
		color: #FE5063;
	}
	.list-con {
		padding: 30upx;
		box-sizing: border-box;
		margin-top: 20upx;
		background-color: #FFFFFF;
	}

	.list-item {
		padding:10upx 0;
		position: relative;
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
		height: 80upx;
		flex: 1;
	}

	.y-z-m {
		font-weight: 500;
		color: #FF4967;
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
		background: #006F2F;
		box-shadow: 0px 5upx 8upx 0px #006F2F;
		border-radius:40upx;
		margin: 160upx auto 0;
		text-align: center;
		line-height: 88upx;
		color: #ffffff;
		font-size: 34upx;
		font-weight: bold;
	}
</style>
