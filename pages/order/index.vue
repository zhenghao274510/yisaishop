<template>
	<view class="content">
		<view class="" style="position: fixed;width: 100%;z-index: 99;">
			<view class="uni-flex uni-flex-item d-items-center d-content-center" style="background: #FFFFFF;">
				<view class="" style="padding: 20upx 0;">
					<s-switch :defaultValue="tabIndex" type="1" :switchList="switchList" @switchValue="changeSwitch"></s-switch>
				</view>
			</view>
			<view class="navbar">
				<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{current: tabCurrentIndex == index}"
				 @click="tabClick(index)">
					{{item.text}}
				</view>
			</view>
		</view>
		<s-pull-scroll ref="pullScroll" :pullDown="pullDown" :pullUp="loadData" :back-top="true"top='200'>
			<view class="list-scroll-content">
				<uni-swipe-action>
					<!-- 订单列表 -->
					<!-- 	"group_order_id": 拼团订单id
				            "send_type": 类型（1：同城配送2：团长自提3：店铺自提4：快递发货）
				            "order_type": 类型（1：拼团订单2：秒杀订单3：活动订单4：积分订单5：普通订单） -->
					<uni-swipe-action-item :right-options="options" :disabled="item.status!=8" @click="deleteOrder" 
					@change="change($event, item.orderId)" v-for="(item,index) in dataList" :key="index">
						<view class="order-item" @click.stop="gotoDetails(item)">
							<view class="uni-flex pad d-border-bottom">
								<view class="uni-flex-item  uni-flex">
									<view class="order-tips">
										{{item.send_type==1?"外送":(item.send_type==2||item.send_type==3)?"自提":item.send_type==4?"快递":""}}
									</view>
									<view class="order-ordernum">
										订单号:{{item.orderId}}
									</view>
								</view>
								<!-- （1：待付款2：拼团中3：拼团成功4：拼团失败5：代理发货6：待评价7：已评价8：已取消9：店铺接单10：已配送待送达11:总商城发货12：售后13：代理送达到团长） -->
								<view class="order-status-right uni-flex d-items-center">
									<view class="order-status-right-one">
										{{item.status==1?"待付款":item.status==2?"拼团中":item.status==3?
										(item.send_type==1?"待配送":(item.send_type==2||item.send_type==3)?"待自提":item.send_type==4?"待发货":""):
										item.status==4?"拼团失败"
						 			:item.status==5?"已发货":item.status==6?"待评价":item.status==7?"已完成":item.status==8?"已取消"
						 			:item.status==9?(item.send_type==1?"待配送":(item.send_type==2||item.send_type==3)?"待自提":item.send_type==4?"待发货":""):
									item.status==10?"配送中":item.status==11?"已发货":item.status==13?"待自提":""}}
									</view>
								</view>
							</view>
							<block v-for="(v,k) in item.dataList" :key="k">
								<view class="uni-flex pad d-border-bottom">
									<view class="order-img-con lazyload lazypic" :class="{loaded: v.loaded}">
										<image class="goods-img" :src="v.image" mode="aspectFill" lazy-load="true" @load="imageOnLoad(v)"></image>
									</view>
									<view class="uni-flex-item">
										<view class="uni-flex d-items-center d-between">
											<view class="uni-flex d-between title uni-ellipsis" style="width:80%;">
												{{v.title}}
											</view>
											<view class="" style="font-size:26upx;color: #656565;">
												× {{v.number}}
											</view>
										</view>

										<view class="skuname">
											{{v.skuname}}
										</view>
									</view>

								</view>
							</block>
							<view class="uni-flex-item">
								<view class="uni-flex-item uni-flex d-between d-items-center" style="padding: 10upx 0;">
									<view style="font-size: 24upx;color: #999999;">
										{{item.createDate}}
									</view>
									<view class="uni-flex  d-items-center">
										<view class="" style="color:#656565;font-size: 26upx;margin-right: 50upx;">
											共计{{item.qty}}件商品
										</view>
										<view class="price-box">
											￥<text class="order-status-right-price">{{item.amount | parsePrice}}</text>
										</view>
									</view>
								</view>

								<!-- （1：待付款2：拼团中3：拼团成功4：拼团失败5：代理发货6：待评价7：已评价8：已取消9：店铺接单10：已配送待送达11:总商城发货12：售后13：代理送达到团长） -->
								<view class="uni-flex d-between d-items-center">
									<view class="order-time">
									</view>
									<view class=" uni-flex d-between d-items-center" style="padding-top:10upx;">
										<view class="uni-badge-btn l_bg" @click.stop="payOrder(item)" v-if="item.status==1">去支付</view>
										<view class="uni-badge-btn y-bg" v-if="item.status==11" @click.stop="logistics(item)">查看物流</view>
										<view class="uni-badge-btn y-bg" v-if="item.status==6" @click.stop="evaOrder(item.orderId)">去评价</view>
										<view class="uni-badge-btn l_bg" @click.stop="cancalOrder(item.orderId,index)" v-if="item.status==1">取消订单</view>
										<view class="uni-badge-btn y-bg" v-if="item.status==2" @click.stop="shareFired(item.orderId)">邀请好友</view>
										<view class="uni-badge-btn" v-if="item.status==5||item.status==11||item.status==13" @click.stop="finishedOrder(item.orderId,index)">确认收货</view>
										<!-- <view v-if="item.status==7||item.status==8" class="uni-badge-btn" @click.stop="deleteOrder(item.orderId,index)">删除订单</view> -->
									</view>
								</view>
							</view>

						</view>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</view>
		</s-pull-scroll>

	</view>
</template>

<script>
	import sSwitch from "@/components/s-switch/s-switch.vue"
	import sPullScroll from "@/components/s-pull-scroll/index.vue"
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
	export default {
		components: {
			sSwitch,
			sPullScroll,
			uniSwipeAction,
			uniSwipeActionItem
		},
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				itemId: '',
				top: 0,
				tabIndex: 0,
				tabCurrentIndex: 0,
				load: false,
				switchList: [{
						key: 0,
						value: '同城订单'
					},
					{
						key: 1,
						value: '总商城订单'
					}
				],
				dataList: [],
				navList: [{
						text: '全部',
						type: 0
					},
					{
						text: '待支付',
						type: 1
					},
					{
						text: '进行中',
						type: 2
					},
					{
						text: '待评价',
						type: 6
					},
					{
						text: '已完成',
						type: 7
					}
				],
			};
		},
		onLoad(options) {
			if(options.id){
				options.id==3?this.tabIndex=1:this.tabIndex=0;
			}
		},
		onShow() {
			this.refresh()
		},
		// 1待付款 2待收货 3待评价 4退款售后
		methods: {
			changeSwitch(e) {
				console.log(e)
				this.tabIndex = e.key;
				this.tabCurrentIndex = 0;
				this.refresh();
			},
			change(e, id) {
				this.itemId = id
				console.log(e)
			},
			refresh() {
				this.$nextTick(() => {
					this.$refs.pullScroll.refresh();
				});
			},
			pullDown(pullScroll) {
				setTimeout(() => {
					this.loadData(pullScroll);
				}, 200)
			},
			loadData(pullScroll) {
				if (this.load) {
					return
				}
				this.load = true;
				let n = this.tabCurrentIndex;
				if (pullScroll.page == 1) {
					this.dataList = [];
				}
				let e = {
					cmd: 'orderList',
					uid: uni.getStorageSync('uid'),
					flag: (this.tabIndex - 0) + 1,
					state: this.navList[n].type,
					merchant_id: uni.getStorageSync('merchantId'),
					nowPage: pullScroll.page
				}
				const curList = [];
				this._reqw.post(e).then(res => {
					res.result == 0 ?
						(this.load = false,
							(res.body.dataList.length == 0 ? (pullScroll.empty()) : res.body.dataList.forEach(item => {
									curList.push(item)
								}), this.dataList = this.dataList.concat(curList), pullScroll.page >= res.body.totalPage ? pullScroll.finish() :
								pullScroll.success())
						) :
						(this.$api.tip(res.resultNote), pullScroll.empty());
				})
			},
			//顶部tab点击
			tabClick(k) {
				this.tabCurrentIndex = k;
				this.refresh();
			},
			//   邀请好友
			shareFired() {

			},
			//   评价
			evaOrder(id) {
				this.$api.navTo(`/pages/order/addEva?id=${id}`)
			},
			//  看物流
			logistics(v) {
				this.$api.navTo(`/pages/order/wuliu?expCode=${v.expCode}&expNo=${v.expNo}`)
			},
			//  确认收货
			finishedOrder(id, k) {
				this.$api.showTip("确认收货吗?", r => {
					if (r.confirm) {
						let e = {
							cmd: 'getOrder',
							uid: uni.getStorageSync('uid'),
							id
						}
						this._reqw.post(e).then(res => {
							res.result == 0 ? (this.$api.tip('收货成功!'), this.refresh()) : this.$api.tip(res.resultNote)
						}).catch(err => {})
					}
				})
			},
			gotoDetails(e) {
				this.$api.navTo(`/pages/order/orderDetails?id=${e.orderId}`)
			},
			//   取消订单
			cancalOrder(id, k) {
				this.$api.showTip("确认取消吗?", r => {
					if (r.confirm) {
						let e = {
							cmd: 'cancelOrder',
							uid: uni.getStorageSync('uid'),
							orderId: id
						}
						this._reqw.post(e).then(res => {
							res.result == 0 ? (this.$api.tip('取消成功!'), this.refresh()) : this.$api.tip(res.resultNote)
						}).catch(err => {})
					}
				})

			},
			payOrder(v) {
				this.$api.navTo(`/pages/order/payOrder?id=${v.orderId}&money=${v.amount}&type=order`)
			},
			//  删除订单
			deleteOrder() {
				this.$api.showTip("确认删除吗?", r => {
					if (r.confirm) {
						let e = {
							cmd: 'deleteOrder',
							id: this.itemId,
							uid: uni.getStorageSync('uid')
						}
						this._reqw.post(e).then(res => {
							res.result == 0 ? (this.$api.tip('删除成功!'), this.refresh()) : this.$api.tip(res.resultNote)
						}).catch(err => {})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.order-tips {
		background: #006F2F;
		border-radius: 8upx;
		color: #FFFFFF;
		font-size: 22upx;
		padding: 0 10upx;
		margin-right: 20upx;
	}

	.pad {
		padding: 20upx 0;
	}

	.order-ordernum {
		font-size: 24upx;
		color: rgba(51, 51, 51, 1);
	}

	.l_bg {
		background: #006F2F;
	}

	.y_bg {
		background: #F15721;
	}

	.uni-badge-btn {
		width: 150upx;
		line-height: 53upx;
		border-radius: 26upx;
		text-align: center;
		font-size: 26upx;
		margin: 0 10upx;
		color: #FFFFFF;
	}

	.del-icon {
		justify-content: center;
	}

	.icon-delete {
		font-size: 32upx;
		color: #999999;
	}

	.skuname {
		font-size: 24upx;
		font-size: #656565;
	}

	// page,
	// .content {
	// 	height: 100%;
	// }

	.price-box {
		color: #656565;
		font-size: 20upx;
	}

	.order-status-right-price {
		color: #000000;
		font-size: 31upx;
		font-weight: bold;
	}

	.order-status-right {
		display: flex;
		align-items: center;
		justify-content: flex-end;

		.order-status-right-one {
			font-size: 24upx;
			color: #666666;
			width: 100%;
			display: flex;
			align-items: center;
		}
	}


	.swiper-box {
		height: calc(100% - 40px);
	}

	.list-scroll-content {
		height: 100%;
		padding: 0 20upx;
	}

	.order-time {
		font-size: 22upx;
		color: rgba(153, 153, 153, 1);
	}

	// 订单列表部分
	.order-item {
		padding: 20upx;
		margin-bottom: 20upx;
		box-sizing: border-box;
		background-color: #FFFFFF;
		border-radius: 20upx;
		transition: all 0.3s ease-in-out 0s;

		.title {
			font-size: 30upx;
			font-weight: bold;
			color: rgba(51, 51, 51, 1);
		}
	}

	.order-img-con {
		padding: 0 20upx;
	}

	.goods-img {
		width: 114upx;
		height: 114upx;
		border-radius: 6upx;
	}

	//头部导航部分

	.navbar {
		display: flex;
		height: 80upx;
		padding: 0 10upx;
		background: #fff;
		position: relative;
		z-index: 10;

		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 28upx;
			color: #666666;
			position: relative;

			&.current {
				color: #006F2F;

				&:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 90upx;
					height: 0;
					border-bottom: 2upx solid #006F2F;
				}
			}
		}
	}
</style>
