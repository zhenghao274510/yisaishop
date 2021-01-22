<template>
	<view class="">
		<view class="vip-main">
			<view class="vip-con">
				<view class="uni-flex d-items-center">
					<view class="vip-name">
						{{dataobject.nickname}}
					</view>
					<view class="vip-type">
						{{dataobject.type==1?'普通会员':dataobject.type==2?'初级会员':'高级会员'}}
					</view>
				</view>
				<view class="uni-flex d-items-center">
					<view class="uni-flex-item" v-for="(v,k) in dataList" :key="k">
						<view class="" v-if="k==0">
							<!-- <text style="font-size:40upx;color: #FFFFFF;">0</text> -->
							<text style="font-size: 20upx;color: #DBF9EB;">还差{{v.leavePoint | fromVal}}积分升级</text>
						</view>
						<view class="uni-flex-item uni-flex d-items-center d-between" v-else>
							<view class="">

							</view>
							<view class="">
								<text style="font-size: 20upx;color: #DBF9EB;margin-left: 20upx;">还差{{v.leavePoint | fromVal}}积分升级</text>
								<!-- <text style="font-size:40upx;color: #FFFFFF;">1</text> -->
							</view>

						</view>
						<progress :percent="v.percent" active stroke-width="3" activeColor='#FFFFFF' border-radius='50' backgroundColor="#999" />
						<view class="live-type" v-if="k==0">
							普
						</view>
						<view class="uni-flex d-items-center d-between" v-else>
							<text class="live-type">银</text> <text class="live-type">金</text>

						</view>

					</view>
				</view>

			</view>
			<view class="vip-bottom">
				<view class="vip-bottom-title">
					会员基础权益
				</view>
				<view class="uni-flex d-items-center ">
					<navigator url="/pages/mineoptions/vipMemberRights?id=2" class="vip-bottom-right uni-flex d-column d-items-center d-content-center">
						<image src="/static/img/huiyuanzhuanxiangjia.png" class="add-img"></image>
						<view class="" style="font-size:24upx;">
							会员专享价
						</view>
					</navigator>
					<navigator url="/pages/mineoptions/vipMemberRights?id=3" class="vip-bottom-right uni-flex d-column d-items-center d-content-center">
						<image src="/static/img/jifenduihapli.png" class="add-img"></image>
						<view class="" style="font-size:24upx;">
							积分兑好礼
						</view>
					</navigator>
				</view>

			</view>

			<view class="vip-bottom" style="margin-top: 30upx;">
				<view class="uni-flex d-items-center d-between">
					<view class="vip-bottom-top uni-flex  ">
						<view class="uni-flex-item uni-flex d-items-center">
							<view class="vip-type" :class="[dataobject.type==1?'l-bg':'c-bg']">
								普通会员
							</view>
							<view class="vip-text">
								普通会员权益
							</view>
						</view>

					</view>
					<view class="vip-bottom-top uni-flex ">
						<view class="uni-flex-item uni-flex d-items-center">
							<view class="vip-type" :class="[dataobject.type==2?'l-bg':'c-bg']">
								银/金会员
							</view>
							<view class="vip-text">
								银/金会员权益
							</view>
						</view>

					</view>
				</view>
				<view class="uni-flex">
					<view class="vip-bottom-top uni-flex uni-flex-item d-items-center d-content-center" style="padding: 40upx 0;">

						<view class="vip-text">
							购物送积分
						</view>

					</view>
					<view class="vip-bottom-top uni-flex uni-flex-item" style="padding: 40upx 0;">
						<view class="uni-flex-item uni-flex  d-items-center d-column d-content-center">
							<view class="vip-text">
								VIP价格购买商品
							</view>
							<view class="vip-text">
								购物享更多积分
							</view>
						</view>

					</view>
				</view>


			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList: [],
				dataobject: {
					sex: "", //性别（0：女1：男）
					type: "1", //类型（1：普通会员2：初级会员3：高级会员）
					payword: "1", // 是否有支付密码（1：是2：否）
					invite_code: "", // 邀请码
					create_date: "", // 注册时间
					balance: "", // 余额
					qr_code: "", // 会员码
					sign: "", // 是否签到（1：已签到2：未签到）
					point: "10282", // 总积分
					sy_point: "", // 剩余积分
					flag: "1", // 类型（1:店铺2：普通团长3：超级团长4:主商城）
					merchant_id: "", // 商家ID
					nickname: "点击登录", //昵称
					icon: "", //头像
					phone: ''
				}
			}
		},
		onLoad() {
			this.getUserInfo();
		},
		filters:{
			fromVal(val){
				let point=0;
				val<0?point=0:point=val;
				return point
			}
		},
		watch: {
			dataobject: {
				handler(n) {
					console.log(n)
					let type = n.type;
					n.dataList.forEach((v, k) => {
						if (type == 1) {
							console.log(1)
							k == 0 ? (v.leavePoint = v.number - n.point, v.percent = parseInt((n.point / v.number) * 100)) : (v.leavePoint =
								v.number, v.percent = 0)
						}
						if (type == 2) {
							console.log(2)
							k == 0 ? (v.leavePoint = 0, v.percent = 100) : (v.leavePoint = v.number - n.point, v.percent = parseInt((n.point /
								v.number) * 100))
						}
						if (type == 3) {
							console.log(3)
							v.leavePoint = 0, v.percent = 100
						}
					})
					console.log(n.dataList)
					this.dataList = n.dataList;
				},
				deep: true
			}
		},
		methods: {
			getUserInfo() {
				if (uni.getStorageSync('uid')) {
					let e = {
						cmd: 'userInfo',
						uid: uni.getStorageSync('uid')
					};
					this._reqw.post(e).then(res => {
						res.result == 0 ? this.dataobject = res.body : this.$api.tip(
							res.resultNote)
					}).catch(err => {})
				}
			}
		}
	}
</script>
<style scoped lang="scss">
	.vip-text {
		font-size: 26upx;
		font-weight: bold;
		color: #343434;
		margin-left: 10upx;
	}

	.vip-main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.vip-con {
		width: 699upx;
		height: 238upx;
		background: url(../../static/img/huiyuanbg.png);
		background-size: 100% 100%;
		margin: 30upx auto;
		display: flex;
		flex-direction: column;
		padding: 40upx;
		box-sizing: border-box;
	}

	.vip-name {
		font-size: 32upx;
		font-weight: bold;
		color: #FFFFFF;
	}

	.l-bg {
		background: linear-gradient(90deg, #21B55F 0%, #29CF6B 100%);
	}

	.c-bg {

		background: linear-gradient(90deg, #B4C0D4 0%, #C2CAD8 100%);
	}

	.vip-type {
		padding: 6upx 10upx;
		text-align: center;
		border-radius: 4upx;
		font-size: 20upx;
		color: #FFFFFF;
		margin-left: 20upx;
	}

	.live-type {
		font-size: 24upx;
		color: #DBF9EB;
	}

	.vip-bottom-title {
		font-weight: bold;
		color: #333333;
	}

	.vip-bottom {
		width: 699upx;
		// height: 202upx;
		background: #FFFFFF;
		border-radius: 15upx;
		padding: 20upx;
		box-sizing: border-box;
	}

	.vip-bottom-btn {
		width: 143upx;
		line-height: 46upx;
		background: #FFB500;
		border-radius: 23upx;
		text-align: center;
		font-size: 24upx;
		color: #000000;
	}

	.vip-bottom-left {
		margin: 0 18upx;
	}

	.vip-bottom-right {
		width: 374upx;
		height: 187upx;
		border-radius: 15upx;

		.add-img {
			width: 58upx;
			height: 58upx;
		}
	}
</style>
