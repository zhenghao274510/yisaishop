<template>
	<view class="">
		<view class="" style="width: 100%;background-color: #FFFFFF;margin-top: 20upx;">
			<view class="list-con">
				<view class="uni-flex d-between d-items-center d-border">
					<image src="/static/img/zhifushouji.png" mode="" class="reg-img"></image>
					<input type="number" class="reg-input" placeholder="请输入手机号" placeholder-style="color:#999999" v-model="phone" />
				</view>
				<view class="uni-flex d-between d-items-center d-border">
					<image src="/static/img/yanzhengma.png" mode="" class="reg-img"></image>
					<input type="number" value="" class="reg-input" placeholder="短信验证码" placeholder-style="color:#999999" v-model="YZM" />
					<text class="y-z-m" @click="getYZM">
						{{ rTime }}
						<text v-if="btnState">s后重发</text>
					</text>
				</view>
				<view class="uni-flex d-between d-items-center d-border">
					<image src="/static/img/yaoqingma.png" mode="" class="reg-img"></image>
					<input type="password" value="" class="reg-input" maxlength="6" placeholder="请输入支付密码" placeholder-style="color:#999999"
					 v-model="password" />
				</view>
			</view>
		</view>
		<view class="reg-btn" hover-class="btnHover" @click="subOrder">绑 定</view>
	</view>
</template>
<script>
	import md5 from "js-md5";
	export default {
		data() {
			return {
				phone: '',
				rTime: '获取验证码',
				interval: null,
				btnState: false,
				YZM: '',
				code: '',
				password:'',
				title: ''
			};
		},
		onLoad(options) {
			options.id==1?this.title="修改支付密码":this.title="设置支付密码";
			this.$api.setNav(this.title)
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
				uni.showLoading({
					title: '提交中...'
				});
				// let Y = this.YZM.trim();
				if (this.phone == '') {
					this.$api.tip('手机号不能为空!');
				} else if (!this.$api.regPhone(this.phone)) {
					this.$api.tip('请输入正确的手机号!');
				} else if (this.YZM == '') {
					this.$api.tip('请输入验证码');
				} else {
					let parmas = {
						cmd: 'editPayword',
						uid:uni.getStorageSync('uid'),
						code: this.YZM,
						payword:md5(this.password)
					};
					console.log(parmas)
					this._reqw
						.post(parmas)
						.then(res => {
							res.result == 0 ?
								(uni.hideLoading(),
									this.$api.tip(res.resultNote),
									this.$api.back()) :
								this.$api.tip(res.resultNote);
						})
						.catch(err => {});
				}
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
		padding: 0 20upx;
	}
	.d-border {
		position: relative;
		border-bottom: 1upx solid #f2f2f2;
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
		color:#006F2F;
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
		background:#006F2F;
		box-shadow: 0px 5upx 8upx 0px #006F2F;
		border-radius: 40upx;
		margin: 160upx auto 0;
		text-align: center;
		line-height: 88upx;
		color: #ffffff;
		font-size: 34upx;
		font-weight: bold;
	}
</style>
