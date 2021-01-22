<template>
	<view class="" @click.stop>
		<view class="compline-item uni-flex" v-for="(v,k) in list" :key="k" @click.stop="userCanUse(v)">
			<view class="compline-item-bg" v-if="tabIndex==2">
				<view class="" style="width:60%;">

				</view>
				<image src="/static/img/yiguoqi.png" class="has-see-icon"></image>
			</view>
			<view class="item-tips y-bg" v-if="type==0">
				{{v.use_type==1?'满减券':'无门槛'}}
			</view>
			<view class="item-tips" :class="[tabIndex==0?'y-bg':'c-bg']" v-else>
				{{v.use_type==1?'满减券':'无门槛'}}
			</view>
			<view class="compline-item-left uni-flex uni-flex-item">
				<view class="item-left-con uni-flex d-items-center d-between">
					<!-- <view class="" v-if="v.amount">
						<text style="font-size:20upx;">￥</text> <text style="font-size:60upx;color:#EC103C;">{{v.amount}}</text>
					</view> -->
					<view class="" >
						<text style="font-size:20upx;">￥</text> <text style="font-size:60upx;color:#EC103C;">{{v.money || v.amount}}</text>
					</view>
					<view class="" style="font-size:22upx;color: #666666;" v-if="v.use_type==1">
						满￥{{v.price}}可用
					</view>

				</view>
				<view class="uni-flex-item uni-flex d-column" style="padding-left:20upx;">
					<view class="uni-flex d-items-center d-between">
						<view class="" style="font-size:26upx;color: #EC103C;">
							{{v.line_type==1?'线上通用':'线上/线下通用'}}
						</view>
						<view class="uni-flex d-items-center" v-if="type==1" @click.stop>
							<view class="user-btn l-btn-bg" v-if="tabIndex==0" @click.stop.prevent="userGiveFirend(v.id)">
								转增好友
							</view>
							<view class="user-btn" :class="[tabIndex==0?'l-btn-bg':'c-btn-bg']" @click.stop="userCanUse(v)" >
								{{tabIndex==0?'立即使用':tabIndex==1?'已使用':'已过期'}}
							</view>
						</view>
					</view>
					<!-- type":"",// 类型（1：全场通用2：单品类3:单商品） -->
					<view class="" style="font-size:30upx;font-weight:bold;padding: 20upx 0;" v-if="v.type==1">
						全场通用
					</view>
					<view class="" style="font-size:30upx;font-weight:bold;padding: 20upx 0;" v-else>
						{{v.type==2? v.categoryName:v.productTitle }}专用
					</view>
					<view class="" style="font-size:24upx;color:666666;">
						{{v.startDate}} 至 {{v.endDate}}
					</view>
				</view>
			</view>
			<view class="compline-item-right l-btn-bg" hover-class="btn-hover" v-if="type==0" @click.stop="userOPtions(v.id)">
				立即领取
			</view>
			<view class="compline-item-right" hover-class="btn-hover" @click.stop="userOPtions(v.id)" :class="[tabIndex==0?'l-btn-bg':'c-btn-bg']" v-if="type==4">
				立即领取
			</view>
		</view>

		<home-poup type="3" ref='homePoup' @click.stop='userconfirm'></home-poup>
	</view>
</template>

<script>
	import homePoup from "@/components/mycom/homePoup.vue"
	export default {
		components: {
			homePoup
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
				id: ''
			}
		},
		filters:{
			formtime(unixtime){
				return unixtime.split(' ')[0];
			}
		},
		methods: {
			userOPtions(id) {
				this.type == 0 ? this.getCompline(id) : this.tabIndex == 0 ? this.getCompline(id) : console.log(this.type, this.tabIndex)
			},
			userCanUse(v){
				this.type==1?this.$emit('click',v):''
			},
			getCompline(id) {
				if(!uni.getStorageSync('uid')){
					this.$api.navTo('/pages/index/author');
					return
				}
				let e = {
					cmd: 'getCoupon',
					uid:uni.getStorageSync('uid'),
					id
				}
				this._reqw.post(e).then(res => {
					res.result == 0 ? (this.$api.tip('领取成功!'), this.$parent.refresh()) : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			userGiveFirend(id) {
				this.id = id;
				this.$refs.homePoup.open();
			},
			userconfirm(phone) {
				let e = {
					cmd: 'translateCoupon',
					uid:uni.getStorageSync('uid'),
					id: this.id,
					phone
				}
				this._reqw.post(e).then(res => {
					res.result == 0 ? (this.$api.tip('转增成功!'), this.$parent.refresh()) : this.$api.tip(res.resultNote)
				}).catch(err => {})
			}
		}
	}
</script>

<style scoped>
	
	view {
		line-height: 1.2;
	}
	.y-bg {
			background: #FFB500;
		}
	
		.c-bg {
			background: #BFBFBF;
		}
	
		.user-btn {
			padding: 8upx 16upx;
			font-size: 22upx;
			border-radius: 20upx;
			margin-right: 10upx;
		}
	
		.l-btn-bg {
			background: #007030;
			color: #FFFFFF;
		}
	
		.c-btn-bg {
			background: #BFBFBF;
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
			border: 2upx solid rgba(238, 238, 238, 0.65);
		}
		.item-left-con {
			width: 25%;
			flex-direction: column;
			border-right: 1upx dashed #D0D0D2;
			padding: 0 10upx;
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

	
</style>
