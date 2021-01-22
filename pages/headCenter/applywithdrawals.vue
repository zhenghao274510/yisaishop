<template>
	<view class="">
		<view class="apply-con">
			<view class="apply-title">
				提现金额
			</view>
			<view class="uni-flex d-items-center d-border-bottom">
				<view class="" style="font-size:60upx;font-weight: 800;color: #666666;">
					￥
				</view> <input type="digit" value="" class="input" v-model="money" />
			</view>
			<view class="apply-btn" hover-class="btn-hover" :class="[money==''?'noInput':'userInput']" @click="userOptions">提现</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				money: ''
			}
		},
		methods: {
			userOptions() {
				let type;
				// #ifdef MP-WEIXIN
				type = 1;
				// #endif
				// #ifdef H5
				type = 2;
				// #endif
				let e = {
					cmd: 'saveBill',
					uid:uni.getStorageSync('uid'),
					type: type,
					amount: this.money
				}
				this.money == ''?this.$api.tip('请输入提现金额!'):this.money ==0 ? this.$api.tip('提现金额应大于0元!') :this._reqw.post(e).then(res=>{
					res.rsult==0?(this.$api.tip('提交成功!'),this.$api.back()):this.$api.tip(res.resultNote)
				}).catch(err=>{})
			}
		}
	}
</script>

<style scoped>
	.apply-con {
		width: 706upx;
		height: 549upx;
		background: #FFFFFF;
		margin: 10upx auto;
		padding: 60upx 40upx;
		box-sizing: border-box;
	}

	.apply-title {
		font-size: 26upx;
		font-weight: bold;
		color: #000000;
	}

	.input {
		flex: 1;
		padding-left: 40upx;
		font-size: 32upx;
		font-weight: bold;
	}

	.noInput {
		color: #666666;
		background: #F6F6F6;
	}

	.userInput {
		color: #FFF;
		background: #007030;
	}

	.apply-btn {
		width: 613upx;
		line-height: 88upx;
		text-align: center;
		border-radius: 44upx;
		font-size: 32upx;
		margin-top: 100upx;
	}
</style>
