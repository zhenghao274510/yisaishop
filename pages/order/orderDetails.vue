<template>
	<view class="" style="padding-bottom:60px;">
		<!-- #ifdef MP-WEIXIN -->
		<view class="top-tip-con uni-flex d-between d-items-center" v-if="showofficial">
			关注公众号，每周领惊喜福利！
			<view class="tip-btn">
				关注领券
			</view>
		</view>
		<official-account style="position: fixed;top: 0;left: 0;opacity: 0;z-index: 9999;" @load="showofficial=true" @error='showofficial=false'>

		</official-account>
		<view class="top-splice-con" v-if="showofficial">
			
		</view>
	<!-- #endif -->
	<block v-if="dataobject.send_type!=4">
		<view class="order-top-tip" v-if="dataobject.status==9  ||dataobject.status==3">
			亲：预计{{newTime}}送达，请耐心等待哟〜
		</view>
		<view class="order-top-tip" v-if="dataobject.status==13">
			亲：请检查好后，再确认收货哟〜
		</view>
		<view class="order-top-tip" v-if="dataobject.status==10 ||dataobject.status==11 ">
			亲：等待骑手接单中，请耐心等待哟~~
		</view>
		<view class="order-top-tip" v-if="dataobject.status==1">
			亲：为了你更早体验美食，请尽快支付哟〜
		</view>
	</block>

	<!-- "order_type":类型（1：拼团订单2：秒杀订单3：活动订单4：积分订单5：普通订单） -->
	<!-- "send_type": 类型（1：同城配送2：团长自提3：店铺自提4：快递发货） -->
	<view class="uni-flex d-items-center d-content-center" style="padding: 30upx 0;" v-if="dataobject.status==2">
		<view class="">
			<view class="" style="font-size: 30upx;color:#000000;text-align: center;font-weight: bold;">
				还差{{dataobject.group_qty}}人成团
			</view>
			<bbs-countdown :time="dataobject.end_date" type='2'></bbs-countdown>
		</view>
	</view>
	<!-- status:"",//订单状态（1：待付款2：拼团中3：拼团成功4：拼团失败5：代理发货6：待评价7：已评价8：已取消9：店铺接单10：已配送待送达11:总商城发货12：售后13：代理送达到团长） -->
	<view class="uni-flex d-items-center d-content-center" v-if="dataobject.status==3 ||dataobject.status==13||dataobject.status==5||dataobject.status==6||dataobject.status==7||dataobject.status==9||dataobject.status==10||dataobject.status==13">
		<view class="uni-flex d-items-center d-content-center" style="flex-direction: column;">
			<view class="" style="font-size: 30upx;color: #007030;" v-if="order_type==1">
				拼团成功！待自提
			</view>
			<view class="" v-if="dataobject.send_type!=4">
				<image :src="dataobject.qr_code" class="erwima"></image>

			</view>
			<view class="" style="font-size: 30upx;color: #000000;text-align: center;" v-if="dataobject.send_type!=4">
				取货码:{{dataobject.get_code}}
			</view>
		</view>
	</view>
	<view class="address-section uni-flex d-items-center d-content-center">
		<!-- "send_type": 类型（1：同城配送2：团长自提3：店铺自提4：快递发货） -->
		<view class="tips-btn">
			{{dataobject.send_type==1?'外送':dataobject.send_type==4?'收件人信息':'自提'}}
		</view>
		<view class="order-content" v-if="dataobject.send_type==1 || dataobject.send_type==4">
			<view class="uni-flex d-items-center uni-flex-item ">
				<image src="/static/img/shouyedizhi.png" mode="" style="width: 27upx;height: 27upx;margin-right: 30upx;"></image>
				<view class="cen">
					<view class="top uni-flex">
						<view class="mobile">
							<text>{{dataobject.userName}}</text> <text style="margin-left: 15px;">{{dataobject.userPhone}}</text>
						</view>
					</view>
					<text class="cell-tit">{{dataobject.address}}</text>
				</view>
			</view>
			<view class="tips-right" v-if="dataobject.status==9">
				{{dataobject.send_type==1?'待配送':''}}
			</view>
			<view class="tips-right" v-if="dataobject.status==10">
				{{dataobject.send_type==1?'配送中':''}}
			</view>
		</view>
		<view class="order-content" v-else>
			<view class="uni-flex d-items-center uni-flex-item ">
				<image src="/static/img/shouyedizhi.png" mode="" style="width: 27upx;height: 27upx;margin-right: 30upx;"></image>
				<view class="cen">
					<view class="top uni-flex">
						<view class="mobile">
							<text>{{dataobject.merchant_address}}</text>
						</view>
					</view>
					<text class="cell-tit">{{dataobject.merchant_name}}</text>
				</view>
			</view>
			<view class="" @tap.stop="markertap">
                 <image src="/static/img/daohang.png" class="daohang_img"></image>
			</view>
		</view>

	</view>
	<view class="goods-section con-bg">
		<!-- 商品列表 -->
		<scroll-view scroll-y="true">
			<view style="max-height: 400upx;">
				<block v-for="(v,k) in dataobject.dataList" :key="k">
					<view class="g-item">
						<view class="product-img ">
							<image :src="v.image" ></image>
						</view>
						<view class="right">
							<text class="title clamp">{{v.title}}</text>
							<view style="margin: 5px 0;">
								<text class="spec uni-ellipsis">{{v.skuname}}</text>
							</view>
							<view class="price-box">
								<view class="price" v-if="dataobject.order_type!=4">￥{{  v.price || parsePrice}}</view>
								<view class="price" v-else></view>
								<view class="">
									× {{v.number}}
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
		</scroll-view>
	</view>
	<!-- 金额明细 -->
	<view class="uni-list-cell con-bg">
		<text class="cell-tip">共计{{number}}件商品</text>
		<view class="cell-tit" style="color:#000000;font-size:26upx;">￥{{dataobject.goodsmoney | parsePrice}}</view>
	</view>
	<view class="uni-list-cell con-bg" v-if="dataobject.couponMoney!=0">
		<text class="cell-tip">优惠券</text>
		<view class="" style="display: flex;align-items: center;">
			<text style="color:#FF4242;">-￥{{dataobject.couponMoney | parsePrice}}</text>
			<view class="uni-icon uni-icon-arrowright">
			</view>
		</view>
	</view>
	<view class="uni-list-cell con-bg" v-if="dataobject.reduction_money!=0">
		<text class="cell-tip">优惠金额</text>
		<view class="cell-tit" style="color:#FF4242;">
			-￥{{dataobject.reduction_money | parsePrice}}
		</view>
	</view>
	<view class="uni-list-cell con-bg" v-if="dataobject.sendMoney!=0">
		<text class="cell-tip">配送费</text>
		<view class="cell-tit" style="color:#000000;font-size:26upx;">￥{{dataobject.sendMoney | parsePrice}}</view>
	</view>
	<view class="uni-list-cell con-bg">
		<text class="cell-tip">实付</text>
		<view class="cell-tit">
			￥{{dataobject.order_money | parsePrice}}
		</view>
	</view>
	
	<view class="uni-list-cell con-bg" v-if="dataobject.status!=1">
		<text class="cell-tip">支付方式</text>
		<view class="cell-tit uni-flex d-items-center">
			<image src="/static/img/wxpay.png" style="width:47upx;height: 41upx;margin-right: 20upx;"></image>
			<view class="">
				<!-- "pay_type": 支付类型（1：微信2：余额） -->
				{{dataobject.pay_type==1?'微信支付':dataobject.pay_type==2?'余额支付':'积分兑换'}}
			</view>
		</view>
	</view>
	<view class="con-bg" style="margin-top: 20upx;">
		<view class="uni-list-cell details-title">
			订单信息
		</view>
		<view class="uni-list-cell" style="padding: 14upx 0;">
			<view class="uni-flex d-items-center">
				<text class="cell-tip">订单号</text>
				<view class="cell-tit" style="padding-left: 50upx;">
					{{dataobject.orderId}}
				</view>
			</view>

			<view class="">

			</view>
		</view>
		<view class="uni-list-cell" style="padding: 14upx 0;">
			<view class="uni-flex d-items-center">
				<text class="cell-tip">下单时间</text>
				<view class="cell-tit" style="padding-left: 50upx;">
					{{dataobject.createDate}}
				</view>
			</view>
			<view class="">

			</view>
		</view>
		<view class="uni-list-cell" style="padding: 14upx 0;" v-if="dataobject.payTime">
			<view class="uni-flex d-items-center">
				<text class="cell-tip">支付时间</text>
				<view class="cell-tit" style="padding-left: 50upx;">
					{{dataobject.payTime}}
				</view>
			</view>
			<view class="">

			</view>

		</view>

		<!-- "order_type":类型（1：拼团订单2：秒杀订单3：活动订单4：积分订单5：普通订单） -->
		<view class="uni-list-cell" style="padding: 14upx 0;" v-if="dataobject.order_type==1&&dataobject.group_time">
			<view class="uni-flex d-items-center">
				<text class="cell-tip">成团时间</text>
				<view class="cell-tit" style="padding-left: 50upx;">
					{{dataobject.group_time}}
				</view>
			</view>
			<view class="">

			</view>
		</view>
		<view class="uni-list-cell" style="padding: 14upx 0;" v-if="dataobject.reciveOrderTime">
			<view class="uni-flex d-items-center">
				<text class="cell-tip">收货时间</text>
				<view class="cell-tit" style="padding-left: 50upx;">
					{{dataobject.reciveOrderTime}}
				</view>
			</view>
			<view class="">

			</view>
		</view>


	</view>
	<!-- status:"",//订单状态（1：待付款2：拼团中3：拼团成功4：拼团失败5：代理发货6：待评价7：已评价8：已取消9：店铺接单10：已配送待送达11:总商城发货12：售后13：代理送达到团长） -->

	<!-- 底部 -->
	<!-- 订单列表 -->
	<!-- 	"group_order_id": 拼团订单id
		        "send_type": 类型（1：同城配送2：团长自提3：店铺自提4：快递发货）
		        "order_type": 类型（1：拼团订单2：秒杀订单3：活动订单4：积分订单5：普通订单） -->

	<view class="footer">
		<view class="submit y-bg" @click="cancleOrder" hover-class="btn-hover" v-if="dataobject.status==1">取消订单</view>
		<view class="submit l-bg" @click="payOrder" hover-class="btn-hover" v-if="dataobject.status==1">去支付</view>
		<view class="submit l-bg" @click="userGetOptions" hover-class="btn-hover" v-if="dataobject.status==5||dataobject.status==10||dataobject.status==13||dataobject.status==11">确认收货</view>

		<view class="submit l-bg" hover-class="btn-hover" @click="redertrPosition" v-if="dataobject.status==10">
				查看骑手位置
			</view>
		<navigator :url="`/pages/order/wuliu?expCode=${dataobject.expCode}&expNo=${dataobject.expNo}`" class="submit y-bg"
		 v-if="dataobject.status==11" hover-class="btn-hover">查看物流
		</navigator>
		<navigator :url="`/pages/order/userSubEav?id=${orderId}`" class="submit y-bg" v-if="dataobject.status==6" hover-class="btn-hover">去评价
		</navigator>
		<view class="submit y-bg" @click="deleteOrder" hover-class="btn-hover" v-if="dataobject.status==7||dataobject.status==8">删除订单</view>
		<!-- #ifdef MP-WEIXIN -->
		<button open-type="share" class="submit l-bg" hover-class="btn-hover" v-if="dataobject.status==2">邀请好友</button>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<view class="submit l-bg" @click="shareOrder" hover-class="btn-hover" v-if="dataobject.status==2">邀请好友</view>
		<!-- #endif -->
	</view>
	<!-- //   客服 -->

	<view class="details-icon" @click="phoneOptions">
		<image src="/static/img/kefuicon.png" class="kefu-icon"></image>

	</view>
	<button open-type="contact" class="details-icon-kefu"></button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showofficial:false,
				type: 1,
				number: '',
				dataobject: {
					end_time: '',
					orderId: "", // 订单号
					group_qty: "", // 拼团还差几人
					userName: "", // 收货名字
					userPhone: "", // 收货电话
					address: "", // 收货地址
					message: "", // 买家留言
					payTime: "", // 付款时间
					expCode: "", // 快递公司编码
					expNo: "", // 快递单号
					pay_type: "", // 支付类型（1：微信2：余额）
					group_product_id: "", // 拼团商品id
					tuan: "", //是否是拼团团长（1：是2：否）
					group_order_id: "", //拼团订单id
					reciveOrderTime: "", // 收货时间
					couponMoney: "", // 优惠金额
					merchant_get_time: "", // 商家接单时间
					peisong_time: "", // 配送时间
					send_name: "", //配送人
					send_phone: "", //配送电话
					send_type: "", // 类型（1：同城配送2：团长自提3：店铺自提4：快递发货）
					order_type: "", //类型（1：拼团订单2：秒杀订单3：活动订单4：积分订单5：普通订单）
					order_money: "", // 订单金额
					after_time: "", // 售后时间
					reason: "", // 售后原因
					msg: "", // 售后说明
					reduction_money: "", // 满减金额
					qty: "", // 商品数量
					qr_code: "", // 提取二维码
					get_code: "", // 取货码
					daili_songda_time: "", // 代理送达时间
					sendMoney: "", // 配送费
					goodsmoney: "", // 商品金额
					createDate: "", // 下单时间
					evaluatetime: "", // 评价时间
					group_time: "", // 成团时间
					group_fail_time: "", //成团失败时间
					dataList: []
				},
				orderId: ''
			}
		},
		computed: {
			newTime() {
				let m = new Date().getMonth() + 1;
				let d = new Date().getDate();
				m = m < 10 ? "0" + m : m;
				d = d < 10 ? "0" + d : d;
				return `${m}月${d}号`
			}
		},
		watch: {
			dataobject: {
				handler(n) {
					let num = 0;
					n.dataList.forEach(item => {
						num += item.number - 0
					})
					this.number = num;
				},
				deep: true
			}
		},
		onLoad(options) {
			this.orderId = options.id;
		},
		onShow() {
			this.loadData()
		},
		methods: {
			markertap() {
				this.$api.loading('加载中...')
				uni.openLocation({
					latitude: this.dataobject.lat - 0,
					longitude: this.dataobject.lon - 0,
					name: this.dataobject.merchant_name,
					address: this.dataobject.merchant_address,
					success() {
						uni.hideLoading();
						console.log('success');
					}
				});
			},
			phoneOptions() {
				this.$api.callPhone(this.dataobject.customerphone)
			},
			redertrPosition() {
				this.$api.navTo(`/pages/order/ridertrajectory?id=${this.orderId}`)
			},
			//   H5   分享
			shareOrder() {

			},
			userGetOptions() {
				this.$api.showTip("确认收货吗?", r => {
					if (r.confirm) {
						let e = {
							cmd: 'getOrder',
							uid: uni.getStorageSync('uid'),
							id: this.orderId
						}
						this._reqw.post(e).then(res => {
							res.result == 0 ? (this.$api.tip('收货成功!'), this.$api.back()) : this.$api.tip(res.resultNote)
						}).catch(err => {})
					}
				})
			},
			cancleOrder() {
				this.$api.showTip("确认取消吗?", r => {
					if (r.confirm) {
						let e = {
							cmd: 'cancelOrder',
							uid: uni.getStorageSync('uid'),
							orderId: this.orderId
						}
						this._reqw.post(e).then(res => {
							res.result == 0 ? (this.$api.tip('取消成功!'), this.$api.back()) : this.$api.tip(res.resultNote)
						}).catch(err => {})
					}
				})
			},
			//  删除订单
			deleteOrder() {
				this.$api.showTip("确认删除吗?", r => {
					if (r.confirm) {
						let e = {
							cmd: 'deleteOrder',
							id: this.orderId,
							uid: uni.getStorageSync('uid')
						}
						this._reqw.post(e).then(res => {
							res.result == 0 ? (this.$api.tip('删除成功!'), this.$api.back()) : this.$api.tip(res.resultNote)
						}).catch(err => {})
					}
				})
			},
			loadData() {
				this.$api.loading('加载中...')
				let parmas = {
					cmd: 'getOrderById',
					orderId: this.orderId
				};
				console.log(parmas);
				this._reqw
					.post(parmas)
					.then(res => {
						uni.hideLoading();
						res.result == 0 ? this.dataobject = res.body : this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			},
			payOrder() {
				this.$api.navTo(`/pages/order/payOrder?id=${this.orderId}&money=${this.dataobject.order_money}&type=order`)
			}
		},
		// #ifdef MP-WEIXIN
		onShareAppMessage() {
			if (this.dataobject.order_type == 1 && this.dataobject.status == 2) {
				return {
					title: '伊赛商城',
					path: `/pages/sharepage/groupInvitation?id=${this.orderId}`
				}
			}
		}
		// #endif

	};
</script>

<style lang="scss" scoped>
	.daohang_img{
		width: 48upx;
		height: 48upx;
	}
	.details-icon-kefu {
		position: fixed;
		bottom: 160upx;
		right: 30upx;
		z-index: 999;
		opacity: 0;
		width: 87upx;
		height: 87upx;
	}

	.details-icon {
		position: fixed;
		bottom: 160upx;
		right: 30upx;
		z-index: 99;
	}

	.kefu-icon {
		width: 87upx;
		height: 87upx;
	}

	.erwima {
		width: 288upx;
		height: 282upx;
	}

	.order-top-tip {
		font-size: 24upx;
		color: #666666;
		padding: 30upx 20upx;
	}

	.details-title {
		border-bottom: 1upx solid #E3E8ED;
		padding: 20upx 0;
		font-size: 32upx;
		font-weight: bold;
		color: #333333;
	}

	.tips-btn {
		position: absolute;
		top: 0;
		left: 10upx;
		text-align: center;
		background: #E4FFF0;
		border-radius: 0 15upx 0 15upx;
		font-size: 24upx;
		color: #007030;
		padding: 0 20upx;
	}

	.tips-right {
		font-size: 30upx;
		color: #F15721;
	}

	.top-tip-con {
		padding: 0 20upx;
		background: #FFFEEE;
		height:120upx;
		position: fixed;
		top: 0;
		width: 100%;
		box-sizing: border-box;
		z-index: 999;
	}
	.top-splice-con{
		width: 100%;
		height: 140upx;
	}
	.tip-btn {
		width: 156upx;
		line-height: 50upx;
		background: linear-gradient(90deg, #FFBB00, #FFA600);
		border-radius: 25upx;
		text-align: center;
		font-size: 24upx;
		color: #FFFFFF;
	}

	.con-bg {
		padding: 30upx;
		background: #FFFFFF;
	}

	.link-con {
		padding: 30upx 2.5%;
		margin-top: 10upx;
		background-color: #FFFFFF;
	}

	.link-tip {
		font-size: 30upx;
	}

	.noAddress {
		height: 150upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.input {
		height: 60upx;
	}

	.uni-icon {
		font-size: 26upx;
		color: #666666;
	}

	.cell-tit {
		color: #333333;
		font-size: 24upx;
	}

	.cell-tip {
		color: #666666;
		font-size: 26upx;
	}

	.uni-list-cell {
		margin-top: 20upx;
	}

	.mobile {
		font-weight: bold;
		color: #333333;
	}

	.icon-swiper {
		display: flex;
		align-items: center;
	}

	.address-section {
		background: #FFFFFF;
		position: relative;
		height: 190upx;

		.order-content {
			display: flex;
			align-items: center;
			padding: 30upx;
			width: 100%;
			box-sizing: border-box;
		}

		.cen {
			display: flex;
			flex-direction: column;
			flex: 1;
			font-size: 28upx;
		}

		.name {
			font-size: 34upx;
			margin-right: 24upx;
		}

		.address {
			margin-top: 16upx;
			margin-right: 20upx;
		}
	}

	.goods-section {
		margin-top: 16upx;

		.g-header {
			display: flex;
			align-items: center;
			height: 84upx;
			padding: 0 30upx;
			position: relative;
		}

		.name {
			font-size: 30upx;
			margin-left: 24upx;
		}

		.g-item {
			display: flex;
			padding: 20upx;

			.product-img {
				display: block;
				width: 160upx;
				height: 160upx;

				image {
					width: 100%;
					height: 100%;
					border-radius: 6upx;
				}
			}

			.right {
				flex: 1;
				display: flex;
				flex-direction: column;
				padding-left: 24upx;
				overflow: hidden;
			}

			.title {
				font-size: 30upx;
				word-break: break-all;
				display: -webkit-box;
				overflow: hidden;
				line-height: 1.5;
				text-overflow: ellipsis;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				font-weight: bold;
				color: #333333;
			}

			.spec {
				font-size: 24upx;
				color: #999999;
			}

			.price-box {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 32upx;
				margin-topl: 20upx;

				.price {
					font-size: 15px;
					font-weight: bold;
					color: #fe2c2c;
				}

				.number {
					font-size: 13px;
					color: #111111;
					margin-left: 20upx;
				}
			}

			.step-box {
				position: relative;
			}
		}
	}

	.footer {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 995;
		display: flex;
		align-items: center;
		width: 100%;
		height: 100upx;
		justify-content: space-around;
		font-size: 30upx;
		background-color: #fff;
		z-index: 998;
		box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
		box-sizing: border-box;

		.y-bg {
			background: #F15721;
		}

		.l-bg {
			background: #007030;
		}

		.submit {
			width: 280upx;
			line-height:70upx;
			border-radius: 39upx;
			text-align: center;
			color: #fff;
			font-size: 26upx;
		}

		.useroptions {
			width: 702upx;
			line-height: 79upx;
			border-radius: 40upx;
			text-align: center;
			color: #fff;
		}
	}
</style>
