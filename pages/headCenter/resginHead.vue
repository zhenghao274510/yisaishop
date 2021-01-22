<template>
	<view class="">
		<view class="info-con">
			<view class="header-bg">
				<image :src="image" class="header-bg"></image>
			</view>
			<view class="header-info">
				<view class="input-con uni-flex d-items-center d-between">
					<image src="/static/img/xingming.png" class="input-icon"></image> <input type="text" value="" v-model="userInfo.name"
					 placeholder="请输入您的姓名" class="input" />
				</view>
				<view class="input-con uni-flex d-items-center d-between">
					<image src="/static/img/shoujihao.png" class="input-icon"></image> <input type="text" value="" v-model="userInfo.phone"
					 placeholder="请输入您的手机号" class="input" />
				</view>
				<navigator url="/pages/mineoptions/position?type=1" class="input-con uni-flex d-items-center d-between">
					<input type="text" value="" disabled placeholder="请选择地址" v-model="userInfo.province+userInfo.city+userInfo.town"
					 class="input" />
				</navigator>
				<view class="input-con uni-flex d-items-center d-between">
					<input type="text" value="" placeholder="请输入详细地址" v-model="userInfo.address" class="input" />
				</view>
				<!-- 			<view class=" uni-flex d-items-center d-between">
					<editor placeholder="请输入备注" @input="userEnter" class="editor"></editor>
				</view> -->
				<view class="btn" hover-class="btn-hover" @click="userOptions">
					提交成为团长
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				image: '',
				userSub: false,
				userInfo: {
					name: '',
					phone: '',
					address: '',
					province: '',
					city: '',
					town: '',
					remarks: '',
					lon: '',
					lat: ''
				}
			}
		},
		onLoad() {
			this.getAdList();
		},
		methods: {
			userEnter(e) {
				this.userInfo.remarks = e.detail.text
			},
			async getAdList() {
				let e = {
					cmd: 'getAdList'
				}
				const res = await this._reqw.post(e);
				if (res.result != 0) {
					this.$api.tip(res.resultNote);
					return
				}
				res.body.adList.forEach(item => {
					item.type == 8 ? this.image = item.image : ''
				})
			},
			userOptions() {
				if (this.userInfo.name == '') {
					this.$api.tip('请输入您的姓名!')
					return
				}
				if (this.userInfo.phone == '') {
					this.$api.tip('请输入您的手机号!')
					return
				}
				if (!this.$api.regPhone(this.userInfo.phone)) {
					this.$api.tip('您请输入的手机号格式不正确!')
					return
				}
				if (this.userInfo.address == '') {
					this.$api.tip('请选择您所在位置!')
					return
				}
				if (this.userSub) {
					return
				}
				this.userSub = true;
				let parmas = {
					cmd: 'applyGroup',
					uid: uni.getStorageSync('uid'),
					name: this.userInfo.name,
					phone: this.userInfo.phone,
					province: this.userInfo.province,
					city: this.userInfo.city,
					town: this.userInfo.town,
					remarks: this.userInfo.address,
					lon: this.userInfo.lon,
					lat: this.userInfo.lat
				}
				this._reqw.post(parmas).then(res => {
					this.userSub = false;uni.hideLoading();
					res.result == 0 ? (this.$api.tip('您已提交申请，请耐心等待我们的审核!'), this.$api.back()) : this.$api
						.tip(res.resultNote)
				}).catch(err => {})

			}
		}
	}
</script>

<style scoped>
	.editor {
		height: 180upx;
		background: #EEEEEE;
		border-radius: 6upx;
		min-height: 180upx;
		font-size: 26upx;
		padding: 10upx;
		box-sizing: border-box;
	}

	.info-con {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.header-bg {
		width: 750upx;
		height: 446upx;
		z-index: 0;
	}

	.header-info {
		width: 690upx;
		margin-top: -100upx;
		background: #FFFFFF;
		box-shadow: 0px 0px 84upx 0px rgba(204, 204, 204, 0.39);
		border-radius: 30upx;
		padding: 50upx 30upx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		z-index: 99;
	}

	.input-con {
		height: 94upx;
		background: #EEEEEE;
		border-radius: 47upx;
		padding: 0 47upx;
		box-sizing: border-box;
		margin-bottom: 30upx;
	}

	.input {
		height: 94upx;
		flex: 1;
	}

	.input-icon {
		width: 34upx;
		height: 34upx;
		margin-right: 30upx;
	}

	.btn {
		line-height: 80upx;
		text-align: center;
		background: #007030;
		border-radius: 40upx;
		font-size: 32upx;
		color: #EEFFFB;
		margin-top: 40upx;
	}
</style>
