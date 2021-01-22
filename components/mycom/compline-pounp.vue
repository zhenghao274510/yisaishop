<template>
	<view class="mask" v-show="pickerShow" @click.stop="hidden">
		<view class="mask">

		</view>
		<view class="yaoqing-content animated" :class="animation" @click.stop>
			<view class="uni-flex d-items-center d-content-center uni-flex-item">
				<image src="/static/img/homeyouhui.png" class="title-icon"></image>
			</view>
			<scroll-view class="compline-con" scroll-y="true">
				<view class="compline-item uni-flex" v-for="(v,k) in list" :key="k">
					<view class="compline-item-bg" v-if="tabIndex==2">
						<view class="" style="width:60%;">

						</view>
						<image src="/static/img/yiguoqi.png" class="has-see-icon"></image>
					</view>
					<view class="item-tips y-bg">
						{{v.use_type==1?'满减券':'无门槛'}}
					</view>
					<view class="compline-item-left uni-flex uni-flex-item">
						<view class="item-left-con uni-flex d-items-center d-between">
							<view class="" v-if="v.amount">
								<text style="font-size:20upx;">￥</text> <text style="font-size:60upx;color:#EC103C;">{{v.amount}}</text>
							</view>
							<view class="" v-if="v.money">
								<text style="font-size:20upx;">￥</text> <text style="font-size:60upx;color:#EC103C;">{{v.money}}</text>
							</view>
							<view class="" style="font-size:22upx;color: #666666;" v-if="v.use_type==1">
								满￥{{v.price}}可用
							</view>

						</view>
						<view class="uni-flex-item uni-flex d-column" style="padding-left:40upx;">
							<view class="uni-flex d-items-center d-between">
								<view class="" style="font-size:26upx;color: #EC103C;">
									{{v.line_type==1?'线上通用':'线上/线下通用'}}
								</view>
							</view>

							<view class="" style="font-size:30upx;font-weight:bold;padding: 20upx 0;" v-if="v.type==1">
								全场通用
							</view>
							<view class="" style="font-size:30upx;font-weight:bold;padding: 20upx 0;" v-else>
								{{v.type==2? v.categoryName:v.productTitle }}专用
							</view>
							<view class="" style="font-size:24upx;color:666666;">
								{{v.startDate | formtime}} 至 {{v.endDate | formtime}}
							</view>
						</view>
					</view>
					<view class="compline-item-right l-btn-bg" hover-class="btn-hover" @click="getCompline(v.id)">
						立即领取
					</view>
				</view>
			</scroll-view>
			<uni-load-more :status="status"></uni-load-more>

		</view>
		<view class="close-con uni-flex d-items-center d-content-center animated" :class="animation" @click.stop="hidden">
			<image src="/static/img/cuowu.png" class="close-icon"></image>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import complineItem from "./compline-item.vue"
	export default {
		components: {
			complineItem,
			uniLoadMore
		},
		props: {
			tabIndex: {
				type: [String, Number],
				default: 0
			},
			list: {
				type: Array,
				default () {
					return []
				}
			},
			type: {
				type: [String, Number],
				default: 0
			}
		},
		data() {
			return {
				pickerShow: false,
				status: 'loading',
				animation: ''
			}
		},
		wtach:{
			list:{
				handler(n){
					if(n.length==0){
						this.hidden()
					}
				},
				deep:true
			}
		},
		filters:{
			formtime(unixtime){
				return unixtime.split(' ')[0];
			}
		},
		methods: {
			open() {
				this.animation = 'fadeIn';
				this.pickerShow = true;
				this.status = 'noMore'
			},
			hidden() {
				this.animation = 'fadeOut';
				setTimeout(() => {
					this.pickerShow = false;
				}, 500)
			},
			getCompline(id) {
				this.hidden();
				this.$api.navTo('/pages/tabs/compliceCenter')
			},
		}
	}
</script>

<style scoped>
	.close-con {
		position: fixed;
		bottom: 20%;
		width: 100%;
		z-index: 99999;
	}

	.close-icon {
		width: 80upx;
		height: 80upx;

	}

	.title-icon {
		width: 256upx;
		height: 36upx;
	}

	.compline-con {
		max-height: 500upx;
	}

	.mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 99;
		background: rgba(0, 0, 0, .3);
		z-index: 9999;
	}

	.yaoqing-content {
		position: fixed;
		top: 45%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #FFFFFF;
		width: 96%;
		background: rgba(255, 255, 255, 1);
		border-radius: 20upx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 40upx 0 0;
		/* box-sizing: border-box; */
		z-index: 99999;
	}

	view {
		line-height: 1.2;
	}

	.y-bg {
		background: #FFB500;
	}

	.c-bg {
		background: #BFBFBF;
	}

	.l-btn-bg {
		background: #007030;
		border-left: 2upx dashed rgba(238, 238, 238, 0.65);
	}

	.c-btn-bg {
		background: #BFBFBF;
		border-left: 2px dashed rgba(238, 238, 238, 0.65);
	}

	.has-see-icon {
		width: 159upx;
		height: 128upx;
	}

	.compline-item-bg {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #000000;
		opacity: 0.5;
		border-radius: 15upx;
		z-index: 99;
		display: flex;
		align-items: center;
	}

	.compline-item {
		width: 94%;
		height: 199upx;
		background: #FFFFFF;
		border-radius: 10upx;
		margin: 20upx auto 0;
		content-visibility: auto;
		position: relative;

	}

	.item-tips {
		position: absolute;
		top: 0;
		left: 0;
		width: 146upx;
		line-height: 43upx;
		text-align: center;
		border-radius: 10upx 4upx 4upx 0px;
		font-size: 26upx;
	}

	.compline-item-left {
		display: flex;
		align-items: center;
		padding: 20upx 0;
		box-sizing: border-box;
		border-left: 2upx solid rgba(238, 238, 238, 0.65);
		border-top: 2upx solid rgba(238, 238, 238, 0.65);
		border-bottom: 2upx solid rgba(238, 238, 238, 0.65);
	}

	.compline-item-right {
		width: 88upx;
		height: 199upx;
		border-radius: 10upx;
		padding: 30upx;
		box-sizing: border-box;
		color: #FFFFFF;
		font-weight: bold;
		position: relative;
	}

	.compline-item-right::after {
		content: '';
		width: 30upx;
		height: 30upx;
		position: absolute;
		top: -15upx;
		left: -15upx;
		background-color: #FFFFFF;
		border-radius: 0 0 30upx 30upx;
	}

	.compline-item-right::before {
		content: '';
		width: 30upx;
		height: 30upx;
		position: absolute;
		left: -15upx;
		bottom: -15upx;
		background-color: #FFFFFF;
		border-radius: 30upx 30upx 0 0;
	}

	.item-left-con {
		width: 30%;
		flex-direction: column;
		border-right: 2upx dashed #D0D0D2;
		padding: 0 10upx;

	}
</style>
