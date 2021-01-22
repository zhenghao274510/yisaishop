<template>
	<view class="">
		<view class="uni-flex d-column d-items-center point-top-con">
			<view class="point-top">
				<view class="uni-flex d-column d-items-center d-content-center" v-if="dataobject.use_type==1">
					<view class="" >
						<text style="font-size: 100upx;color: #FFFFFF;">￥ </text> <text style="font-size:200upx;color: #FFFFFF;">{{dataobject.amount}}</text>
					</view>
					<view class="" style="font-size:60upx;color: #FFFFFF;">
						满{{dataobject.price}}元可用
					</view>
				</view>
				<view class="uni-flex d-column d-items-center d-content-center" v-else>
					<view class="" >
						<text style="font-size: 100upx;color: #FFFFFF;">￥ </text> <text style="font-size:200upx;color: #FFFFFF;">{{dataobject.money}}</text>
					</view>
					<view class="" style="font-size:60upx;color: #FFFFFF;">
						
					</view>
				</view>
			</view>
			<view class="uni-flex-item point-info-con">
				<view class="point-title" v-if="dataobject.use_type==1">
					满{{dataobject.price}}元减{{dataobject.amount}}元券
				</view>
				<view class="point-title" v-else>
					优惠金额{{dataobject.money}}
				</view>
				<view class="">
					<text style="font-size: 34upx;font-weight: bold;color: #FF0000;">{{dataobject.point}}积分</text>
					<text style="font-size:24upx;color:#666666;margin-left: 30upx;">已抢{{dataobject.sales}}件</text>
				</view>
			</view>

		</view>
		<view class="uni-flex d-column d-items-center point-top-con">
			<view class="uni-flex-item point-info-con">
				<view class="point-title" style="font-size: 30upx;">
					兑换说明
				</view>
				<jyf-parser :html="content"></jyf-parser>
				<!-- <view class="" style="font-size:24upx;color:#666666;">
					１.兑换成功后，在伊赛小程序『优惠券』可查询一兑换的优惠券
				</view> -->
			</view>
			<!-- <view class="uni-flex-item point-info-con">
				<view class="point-title" style="font-size: 30upx;">
					温馨提示
				</view>
				<view class="" style="font-size:24upx;color:#666666;">
					１、本券使用日期：自兑换之日起，30天内使用有效，预期作废
				</view>
				<view class="" style="font-size:24upx;color:#666666;">
					２、本券消费需满79元可用，每单限使用１张，不可与其他优惠
					券、折扣券等叠加使用
				</view>
				<view class="" style="font-size:24upx;color:#666666;">
					３、本券不参与特价商品活动
				</view>
				<view class="" style="font-size:24upx;color:#666666;">
					4 、如有疑问，可联系客服热线：400-000-0000
				</view>
			</view> -->
		</view>

		<view class="bill-btn" hover-class="btn-hover" @click='payPoint' :class="[dataobject.zu==1?'a-bg':'c-bg']">
			{{dataobject.zu==1?'立即兑换':'积分不足'}}
		</view>

	</view>
</template>

<script>
	import jyfParser from "@/components/jyf-parser/jyf-parser.vue"
	export default {
		components:{
			jyfParser
		},
		data() {
			return {
				content:'',
				dataobject: {
					content: "", // 详情
					sales: "", // 销量
					zu: "", // 积分是否充足（1：是2：否）
					point: "", // 积分
					cun: "", // 是否存在（1：是2：否）
					startDate: "", // 开始时间
					endDate: "", // 到期时间
					type: "", // 类型（1：全场通用2：单品类3:单商品）
					use_type: "", // 使用类型（1：满减2：无门槛）
					news: "", // 是否是新用户（1：是2：否）
					line_type: "", // 使用范围（1：线上2：线上线下）
					price: "", // 满多少use_type=1
					amount: "", // 减多少use_type=1
					money: "" // 优惠金额use_type=2
				},
				title: '',
				id: ''
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.title = options.title;
			this.$api.setNav(options.title)
			this.loadData();
		},
		methods: {
			payPoint() {
				this.dataobject.zu==1 ? this.userGet() : this.$api.tip('积分不足!')
			},
			loadData() {
				let e = {
					cmd: 'getPointCoupon',
					id:this.id,
					uid:uni.getStorageSync('uid'),
					merchantId:uni.getStorageSync('merchantId')
				}
				this._reqw.post(e).then(res => {
					res.result == 0 ?(this.dataobject = res.body,this.content=this.$api.formText(res.body.content)) :
						this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			userGet() {
                let e = {
                	cmd: 'savePointCouponOrder',
					id:this.id,
                	uid:uni.getStorageSync('uid'),
                	merchantId:uni.getStorageSync('merchantId')
                }
                this._reqw.post(e).then(res => {
                	res.result == 0 ?(this.$api.tip('兑换成功!'),this.$api.back()) :
                		this.$api.tip(res.resultNote)
                }).catch(err => {})
			}
		}
	}
</script>

<style scoped>
	.point-top-con {
		background: #FFFFFF;
		border-radius: 0px 0px 20upx 20upx;
		margin-top: 30upx;
	}

	.point-top {
		width: 695upx;
		height: 619upx;
		background: linear-gradient(0deg, #199041, #29B05D);
		border-radius: 10upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.point-info-con {
		padding: 30upx;
		width: 100%;
		box-sizing: border-box;
	}

	.c-bg {
		background: #BFBFBF;
	}

	.a-bg {
		background: #007030;
	}

	.bill-btn {
		width: 707upx;
		line-height: 88upx;
		border-radius: 44upx;
		text-align: center;
		margin: 100upx auto;
		color: #FFFFFF;
		font-size: 32upx;
	}

	.point-title {
		font-size: 36upx;
		font-weight: bold;
	}
</style>
