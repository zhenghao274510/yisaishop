<template>
	<view class="" style="padding-bottom:60px;">
		<view class="goods-section con-bg">
			<!-- 商品列表 -->
			<block v-for="(v,k) in dataobject.dataList" :key="k">
				<view class="g-item">
					<image :src="v.image" class="product-img"></image>
					<view class="right">
						<text class="title clamp">{{v.title}}</text>
						<view style="margin: 5px 0;">
							<text class="spec uni-ellipsis">{{v.skuname}}</text>
						</view>
						<view class="price-box">
							<view class="price">￥{{v.price}}</view>
							<view class="">
								× {{v.number}}
							</view>

						</view>
					</view>
				</view>
			</block>
		</view>
		<!-- 金额明细 -->
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
			<view class="uni-list-cell" style="padding: 14upx 0;" v-if="dataobject.payTime!=''">
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 1,
				number: '',
				dataobject: {
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
					dataList: [{
						productId: "", // 商品id
						title: "", // 商品名称
						skuname: "", // 规格名字
						image: "", // 商品图片
						number: "", // 数量
						price: "" // 价格
					}]
				},
				orderId: ''
			}
		},
		onLoad(options) {
			this.orderId = options.id;
			this.loadData()
			
		},
		methods: {
			phoneOptions() {
				this.$api.callPhone(this.dataobject.customerphone)
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
			}
			
		}

	};
</script>

<style lang="scss" scoped>
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
		padding: 0 30upx;
		height: 83upx;
		background: #FFFEEE;
		position: relative;
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
				flex-shrink: 0;
				display: block;
				width: 160upx;
				height: 160upx;
				border-radius: 6upx;
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
			line-height: 80upx;
			border-radius: 39upx;
			text-align: center;
			color: #fff;
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
