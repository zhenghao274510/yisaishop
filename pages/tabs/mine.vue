<template>
	<s-pull-scroll class="page-body" scroll-y="true">
		<!-- #ifdef H5 -->
		<view class="indexBg" style="height:236upx;z-index: 0;">

		</view>
		<view class="meMain">
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<view class="indexBg" :style="{'height':height+'px'}">

			</view>
			<view class="meMain" :style="{'paddingTop':top+'px'}">
				<!-- #endif -->
				<!--主体-->
				<view class="mePosition">
					<view class="meMainBox">
						<!--头部-->
						<view class="meHead">
							<view class="meHeadAvatar" @click.stop="toAuthor(0)">
								<image src="/static/logo.jpg" mode="aspectFill" v-if="dataobject.icon ==''"></image>
								<image :src="dataobject.icon" mode="aspectFill" v-else></image>
							</view>
							<view class="meHeadName" @click.stop="toAuthor(0)">
								<view class="useInfo">{{ dataobject.nickname}}</view>
								<view class="uni-flex d-items-center">
									<view class="phone">{{dataobject.phone}}</view>
								</view>
							</view>
							<view class="top-btn" @click.stop="toAuthor(1)" v-if="dataobject.type!=''">
								{{dataobject.type==1?'普通会员':dataobject.type==2?'初级会员':'高级会员'}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="meOverBgOne" style="margin-bottom:20rpx;">
				<mine-order-list @click="userOptions"></mine-order-list>
			</view>
			<view class="meOverBgOne">
				<mine-servce-list @click="activeTo" :flag="dataobject.flag"></mine-servce-list>
			</view>
	</s-pull-scroll>
</template>

<script>
	import mineServceList from '@/components/mycom/mine-servce.vue';
	import mineOrderList from '@/components/mycom/mine-order-list.vue';
	import uniGird from "@/components/uni-grid/uni-grid.vue"
	import uniGirdItem from "@/components/uni-grid-item/uni-grid-item.vue"
	export default {
		components: {
			uniGird,
			uniGirdItem,
			mineServceList,
			mineOrderList
		},
		data() {
			return {
				height: uni.getSystemInfoSync()['statusBarHeight'] + 165,
				top: uni.getSystemInfoSync()['statusBarHeight'] + 54,
				sn: '',
				phone: '',
				dataobject: {
					sex: "", //性别（0：女1：男）		
					type: "", //类型（1：普通会员2：初级会员3：高级会员）
					payword: "", // 是否有支付密码（1：是2：否）
					invite_code: "", // 邀请码
					create_date: "", // 注册时间
					balance: "", // 余额
					qr_code: "", // 会员码
					sign: "", // 是否签到（1：已签到2：未签到）
					point: "", // 总积分
					sy_point: "", // 剩余积分
					flag: "", // 类型（0:普通用户,1:店铺2：普通团长3：超级团长4:主商城）
					merchant_id: "", // 商家ID
					nickname: "点击登录", //昵称
					icon: "", //头像
					phone: ''
				}
			};
		},
		onShow() {
			this.getUserInfo();
			this.getCartNum();
		},
		methods: {
			toAuthor(ind) {
				if (uni.getStorageSync('uid')) {
					ind == 0 ? this.$api.navTo('/pages/tabs/userInfo') : this.$api.navTo('/pages/tabs/vipLive')
				} else {
					// #ifdef MP-WEIXIN
					this.$api.navTo('/pages/index/author');
					// #endif
					//   #ifdef H5
					this.$api.getCode()
					// #endif
				}

			},
			getUserInfo() {
				if (uni.getStorageSync('uid')) {
					let e = {
						cmd: 'userInfo',
						uid: uni.getStorageSync('uid')
					};
					this._reqw.post(e).then(res => {
						0 == res.result ? this.dataobject = res.body : this.$api.tip(
							res.resultNote)
					}).catch(err => {})
				}

			},
			userOptions(e) {
				console.log(e)
				if (uni.getStorageSync('uid')) {
					switch (e) {
						case 0:
							this.$api.navTo(`/pages/mineoptions/vipCode`);
							break;
						case 1:
							this.$api.navTo(`/pages/mineoptions/complineCenter?type=0`);
							break;
						case 2:
							this.$api.navTo(`/pages/mineoptions/walletTopUp`);
							break;
						case 3:
							this.$api.navTo(`/pages/point/pointShop?id=${this.dataobject.sy_point}`);
							break;
						case 4:
							this.$api.navTo(`/pages/signIn/signPolite?id=${this.dataobject.sy_point}`);
							break;
						case 5:
							this.$api.navTo(`/pages/mineoptions/invitationPolite`);
							break;
						case 6:
							this.$api.navTo(`/pages/tabs/buycompline`);
							break;
					}
				} else {
					// #ifdef MP-WEIXIN
					this.$api.navTo('/pages/index/author');
					// #endif
					//   #ifdef H5
					this.$api.getCode()
					// #endif
				}

			},
			activeTo(e) {
				if (uni.getStorageSync('uid')) {
					switch (e) {
						case 0:
							this.$api.navTo(`/pages/mineoptions/shopCenter?id=${this.dataobject.merchant_id}`);
							break;
						case 1:
							this.dataobject.flag == 0 ? this.$api.navTo(`/pages/headCenter/resginHead`) : this.$api.navTo(
								`/pages/headCenter/index?id=${this.dataobject.merchant_id}&flag=${this.dataobject.flag}`);
							break;
						case 2:
							this.$api.navTo(`/pages/order/index`);
							break;
						case 3:
							this.$api.navTo(`/pages/mineoptions/myEavList`);
							break;
						case 4:
							this.$api.navTo(`/pages/mineoptions/myStore`);
							break;
						case 5:
							this.$api.navTo(`/pages/mineoptions/myAddress?source=0`);
							break;
						case 6:
							this.$api.navTo(`/pages/mineoptions/myMessage`);
							break;
						case 7:
							this.$api.navTo(`/pages/mineoptions/customerCenter`);
							break;
						case 8:
							this.$api.navTo(`/pages/mineoptions/mywebView?type=1`);
							break;
					}
				} else {
					// #ifdef MP-WEIXIN
					this.$api.navTo('/pages/index/author');
					// #endif
					//   #ifdef H5
					this.$api.getCode()
					// #endif
				}

			}
		}
	};
</script>

<style scoped lang="scss">
	.top-btn {
		width: 150upx;
		line-height: 53upx;
		background: rgba(255, 205, 0, 1);
		border-radius: 27upx;
		text-align: center;
		font-size: 26upx;
		color: rgba(51, 51, 51, 1);
		position: relative;
	}

	.open-btn {
		position: absolute;
		top: 0;
		left: 0;
		width: 150upx;
		height: 53upx;
		opacity: 0;
	}

	.shouji-phone {
		width: 21upx;
		height: 25upx;
		margin-right: 20upx;
	}

	.phone {
		color: #FFFFFF;
		font-size: 24upx;
	}

	.page-body {
		display: flex;
		flex-direction: column;
	}

	.useInfo {
		text-align: left;
		color: #FFFFFF;
	}

	.meMain {
		width: 100%;
		position: relative;
		box-sizing: border-box;
		z-index: 19;
	}

	.meMainBox {
		width: 92%;
		/* #ifdef MP-WEIXIN */
		margin: 0 auto 30upx;
		/* #endif */
		/* #ifdef H5 */
		margin: 30upx auto;
		/* #endif */

	}

	.mePosition {
		width: 100%;
	}

	.meHead {
		overflow: hidden;
		position: relative;
		display: flex;
		align-items: center;
	}

	.meHeadAvatar {
		margin-top: 10upx;
	}

	.meHeadAvatar image {
		width: 110upx;
		height: 110upx;
		display: block;
		border-radius: 50%;
	}

	.meHeadName {
		color: #ffffff;
		font-size: 28upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: flex;
		flex-direction: column;
		width: 30%;
		margin-left: 30upx;
	}

	.meOverBgOne {
		width: calc(100% - 40upx);
		margin: 0 auto;
		background-color: #ffffff;
		border-radius: 15upx;
		z-index: 99;
	}
</style>
