<template>
	<view class="mask" v-show="pickerShow" @click.stop="hidden">
		<view class="mask">

		</view>
		<view class="yaoqing-content animated" :class="animation" @click.stop>
			<view class="d-items-center j-center cart-del-con ">
				<view class="title">
					可参与的拼单
				</view>
				<view class="uni-icon uni-icon-close" @click.stop="hidden">

				</view>
			</view>
			<scroll-view scroll-y="true" @scrolltolower="loadMore">
				<view class="scollView">
					<view class="uni-flex d-items-center d-between" style="padding: 20upx 30upx;" v-for="(v,k) in list" :key="k">
						<view class="uni-flex d-items-center">
							<image :src="v.icon" class="lead-img"></image>
							<view class="" style="font-size:32upx;color: #333333;">
								{{v.nickname}}
							</view>
						</view>
						<view class="search-btn-con" @click.stop="confirm(v)">
							{{v.group==1?"已参团":"去参团"}}
						</view>
					</view>
				</view>

			</scroll-view>

		</view>

	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: [Array],
				default () {
					return []
				}
			}
		},
		data() {
			return {
				pickerShow: false,
				animation: ''
			}
		},
		methods: {
			open() {
				this.animation = 'zoomIn';
				this.pickerShow = true;
			},
			hidden() {
				this.animation = 'zoomOut';
				setTimeout(() => {
					this.pickerShow = false;
				}, 500)
			},
			confirm(v) {
				this.$emit('onConfirm', v);
			},
			loadMore() {
				this.$emit('changeData')
			}
		}
	}
</script>

<style scoped lang="scss">
	.scollView {
		max-height: 360upx;
	}

	.uni-icon-close {
		position: absolute;
		top: 0;
		right: 30upx;
	}

	.padding-con {
		padding: 30upx 0;
	}

	.cart-del-con {
		position: relative;
	}

	.title {
		font-size: 36upx;
		font-weight: bold;
		color: #000000;
		text-align: center;
	}

	.mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 9999;
		background: rgba(0, 0, 0, .3);
	}

	.yaoqing-content {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #FFFFFF;
		width: 90%;
		background: rgba(255, 255, 255, 1);
		border-radius: 20upx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 40upx 0;
		box-sizing: border-box;
		z-index: 99999;

	}

	.search-btn-con {
		width: 210upx;
		line-height: 70upx;
		background: #007030;
		border-radius: 40upx;
		color: #FFFFFF;
		font-size: 30upx;
		text-align: center;
	}

	.lead-img {
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
		margin-right: 30upx;
	}
</style>
