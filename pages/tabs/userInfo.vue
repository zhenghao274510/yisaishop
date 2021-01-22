<template>
	<view class="">
		<view class="" style="margin-top: 20upx;background: #FFFFFF;">
			<view class="shouyi-con d-border-bottom">
				<view class="shouyi-list">
					头像
				</view>
				<!-- <view class="uni-flex all" @click="uploads"> -->
					<view class="uni-flex all">
					<image :src="dataobject.icon" class="user-icon"></image>
					<view class="uni-icon uni-icon-arrowright" style="color: #999999;font-size:24upx;">
					</view>
				</view>
			</view>
			<view class="shouyi-con d-border-bottom">
				<view class="shouyi-list">
					用户名
				</view>
				<view class="uni-flex all">
					<view class="input">
						{{dataobject.nickname}}
					</view>
					<!-- <input type="text" value="" v-model="dataobject.nickname" class="input" /> -->
					<view class="uni-icon uni-icon-arrowright" style="color: #999999;font-size:24upx;">
					</view>
				</view>
			</view>
			<view class="shouyi-con d-border-bottom" @click="userOptions(0)">
				<view class="shouyi-list">
					设置支付密码
				</view>
				<view class="uni-icon uni-icon-arrowright" style="color: #999999;font-size:24upx;">
				</view>
			</view>

			<view class="shouyi-con d-border-bottom" @click="userOptions(1)">
				<view class="shouyi-list">
					绑定手机
					
				</view>
				<view class="">
					{{dataobject.phone}}
					<view class="uni-icon uni-icon-arrowright" style="color: #999999;font-size:24upx;">
					</view>
				</view>
				
			</view>
		</view>

		<!-- <view class="btn" hover-class="btn-hover" @tap="saveUserInfo">保存</view> -->
	</view>
</template>

<script>
	// import  from ""
	export default {
		data() {
			return {
				rTime: '获取验证码',
				btnState: false,
				interval: null,
				code: '',
				dataobject: {
					sex: "", //性别 0：女1：男 
					nickname: "", //昵称
					icon: "", //头像
					phone: ''
				}
			}
		},
		onLoad() {
			this.getUserInfo();
		},
		methods: {
			userOptions(type) {
				type == 0 ? (this.$api.navTo(`/pages/mineoptions/setpossword?id=${this.dataobject.payword}`)) : this.$api.navTo(
					'/pages/mineoptions/changePhone')
			},
			getUserInfo() {
				let e = {
					cmd: 'userInfo',
					uid:uni.getStorageSync('uid')
				};
				this._reqw.post(e).then(res => {
					0 == res.result ? (this.dataobject = res.body) : this.$api.tip(
						res.resultNote)
				}).catch(err => {})
			},
			saveUserInfo() {
				let data = this.userInfo;
				if (data.name == '') {
					this.$api.tip('请输入昵称!')
				} else if (data.mobile == '') {
					this.$api.tip('请输入手机号!')
				} else if (data.code == '') {
					this.$api.tip('请输入验证码!')
				} else if (!this.$api.regPhone(data.mobile)) {
					this.$api.tip('手机号格式不正确!')
				} else {
					let parmas = {
						cmd:'',
						uid:uni.getStorageSync('uid'),
						nickname: this.dataobject.nickname,
						icon: this.dataobject.icon
					}
					this._reqw.post(parmas, 'userInfoEdit').then(res => {
						res.result == 0 ? (this.$api.tip('修改成功!'), this.$api.back()) : this.$api.tip(res.resultNote)
					}).catch(err => {})
				}
			},
			formImg(r) {
				this._reqw.upflie(r).then(res => {
					let r = JSON.parse(res)
					r.result == 0 ? this.dataobject.icon = r.object : this.$api.tip(r.resultNote)
				}).catch(err => {})
			},
			uploads() {
				let that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera', 'album'], //
					success(res) {
						console.log(res);
						that.formImg(res.tempFiles[0]);
					}
				})
			},
		}
	}
</script>
<style scoped lang="scss">
	.input {
		text-align: right;
	}

	.user-icon {
		width: 60upx;
		height: 60upx;
		border-radius: 50%;
		margin-right: 30upx;
	}

	.btn {
		position: fixed;
		left: 50%;
		bottom: 50upx;
		transform: translateX(-50%);
		width: 629upx;
		background: #006F2F;
		border-radius: 40upx;
		font-size: 36upx;
		font-weight: bold;
		color: rgba(255, 255, 255, 1);
		text-align: center;
		line-height: 88upx;
	}

	.center-input {
		color: #999999;
		font-size: 26upx;
	}

	.y-z-m {
		font-size: 26upx;
		color: #F55555;
		width: 180upx;
		line-height: 50upx;
		background: #F6F6F6;
		border-radius: 25upx;
		text-align: center;
	}

	.chose-icon {
		width: 50upx;
		height: 50upx;
	}

	.all {
		align-items: center;
		color: #666666;
	}

	.shouyi-con {
		display: flex;
		width: 90%;
		margin: 0 auto;
		padding: 30upx 0;
		justify-content: space-between;
		align-items: center;

		.shouyi-list {
			display: flex;
			align-items: center;
			color: #656565;

			image {
				width: 20px;
				height: 22px;
				margin-right: 20upx;
			}
		}

		.right {
			width: 20upx;
			height: 24upx;
		}

	}
</style>
