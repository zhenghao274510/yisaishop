<template>
	<view class="mask" v-if="pickerShow" @click.stop="close">
		<view class="mask">

		</view>
		<view class="" @click.stop>
			<view class="ref-con animated" :class="animate">
				<view class="ref-info uni-flex d-items-center">
					<view class=" list-item" @click="tipsOneClick(0)">
						<image src="/static/img/shegnchenghaibao.png" class="share-img"></image>
						<view class="title">
							生成海报
						</view>
					</view>
					<!-- #ifdef H5 -->
					<view class="list-item" @click="tipsOneClick(0)">
						<image src="/static/img/weixinhaoyou.png" class="share-img"></image>
						<view class="title">
							微信好友
						</view>
					</view>
					<!-- #endif -->
					<!-- #ifdef MP-WEIXIN -->
					<view class="list-item">
						<image src="/static/img/weixinhaoyou.png" class="share-img"></image>
						<view class="title">
							微信好友
						</view>
						<button open-type="share" class="share-btn"></button>
					</view>
					<!-- #endif -->
					
				</view>
			</view>
			<view class="ref-btn animated" :class="animate" @click.stop="close">
				取消
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pickerShow: false,
				animate: ''
			}
		},
		methods: {
			open() {
				this.animate = 'slideInUp';
				this.pickerShow = true;
			},
			close() {
				this.animate = 'slideOutDown';
				setTimeout(() => {
					this.pickerShow = false;
					this.animate = '';
				}, 500)
			},
			hide(){
				this.pickerShow = false;
				this.animate = '';
			},
			shareClose() {
				this.pickerShow = false;
			},
			tipsOneClick(ind) {
				this.close();
				this.$emit('click', ind);
			}
		}
	}
</script>

<style scoped lang="scss">
	.ref-info {}

	.list-item {
		width: 50%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.share-btn {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}

	.share-img-bg {
		width: 110upx;
		height: 120upx;
	}

	.share-img {
		width: 100upx;
		height: 100upx;
	}

	.cart-del-con {
		padding: 20upx 0;
	}

	.title {
		// font-size: 32upx;
		// font-weight: bold;
		color: rgba(51, 51, 51, 1);
		text-align: center;
		padding-top: 30upx;
	}

	.mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 999999;
		background: rgba(0, 0, 0, .3);
	}

	.ref-btn {
		position: fixed;
		left: 5%;
		bottom:40upx;
		width: 90%;
		line-height: 88upx;
		background: #FFFFFF;
		font-size: 32upx;
		color: #007030;
		border-radius: 15upx;
		text-align: center;
		z-index: 9999999;
	}

	.ref-con {
		position: fixed;
		left: 5%;
		bottom:170upx;
		width: 90%;
		height: 317upx;
		background: #FFFFFF;
		border-radius: 15upx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 40upx 0;
		box-sizing: border-box;
		z-index: 9999999;
	}

	.bill-item {
		padding: 20upx 30upx;
	}
</style>
