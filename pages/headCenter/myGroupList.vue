<template>
	<view class=""catchtouchmove="return">
		<view class="uni-flex-item uni-flex d-items-center d-content-center" style="padding: 20upx 0;">
			<s-switch :defaultValue="tabIndex" type="1" :switchList="switchList" @switchValue="changeSwitch"></s-switch>
		</view>
		<s-pull-scroll ref="pullScroll" :pullDown="pullDown" :pullUp="loadData" :back-top="true" top="100">
			
			<view class="uni-second-list" v-for="(item,index) in dataList" :key="index">
				<view class="uni-flex d-items-center d-between" style="padding: 20upx;">
					<view class="uni-flex d-items-center">
						<view class="tips-btn">
							自提
						</view>
						<view class="" style="font-size: 26upx;">
							订单编号：{{item.orderId}}
						</view>
					</view>
<!-- 					"status":"",订单状态（1：待付款2：拼团中3：拼团成功4：拼团失败5：代理发货6：待评价7：已评价8：已取消9：店铺接单10：已配送待送达11:总商城发货12：售后13：代理送达到团长） -->
					<view class="" style="font-size: 26upx;color: #666666;">
						{{item.status==1?'待付款':item.status==2?'拼团中':item.status==6?'待评价':item.status==7?'已评价':item.status==8?'已取消':''}}
					</view>
				</view>
				<checkbox-group>
					<view class="" >
						<view class="uni-second" v-for="(v,k) in item.dataList" :key='k'>
							<radio :value="v.productId" style="transform: scale(.7);" color="#007030" @tap.stop='check(v)' />
							<view class="uni-flex d-items-center uni-flex-item" @tap.stop="gotoDetails(v)">
								<view class="image-second">
									<image class="uni-second-image" :src="v.image"></image>
								</view>
								<view class="uni-second-price">
									<view class="uni-second-title uni-ellipsis">{{v.title}}
									</view>
									<view class="uni-flex d-items-center d-between">
										<view class="sku-name uni-ellipsis">
											{{v.skuname}}
										</view>
									</view>
									<view class="uni-flex d-between d-items-center" style="width: 90%;">
										<view class="uni-flex d-items-center">
											<text class="price-symbol">￥</text><text class="old-price">{{v.price}}</text>
										</view>
										<view class="uni-flex d-items-center">
											<text class="price-symbol">￥</text><text class="old-price">{{v.goodsmoney}}</text>
										</view>
										<view class="store-num">
												预计收益:{{v.money}}
											</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</checkbox-group>
			</view>
		
		</s-pull-scroll>
		<view class="uni-flex d-items-center d-around group-bottom">
			<view class="group-btn one-btn" hover-class="btn-hover" @click="userOptions(0)">
				自提码核销
			</view>
			<view class="group-btn two-btn" hover-class="btn-hover" @click="userOptions(1)">
				扫码核销
			</view>
		</view>
		<home-poup type="2" ref="homePoup" @click='userToCode'></home-poup>

	</view>
</template>

<script>
	import sPullScroll from "@/components/s-pull-scroll/index.vue"
	import sSwitch from "@/components/s-switch/s-switch.vue"
	import homePoup from "@/components/mycom/homePoup.vue"
	export default {
		components: {
			sSwitch,
			homePoup,
			sPullScroll
		},
		data() {
			return {
				tabIndex: 0,
				merchant_id:'',
				switchList: [{
						key: 0,
						value: '进行中'
					},
					{
						key: 1,
						value: '已完成'
					}
				],
				dataList: []
			}
		},
		onLoad(options) {
			this.merchant_id=options.id;
			this.refresh();
		},
		methods: {
			changeSwitch(e) {
				console.log(e);
				this.tabIndex = e.key;
				this.refresh();
			},
			gotoDetails(v) {
              
			},
			userOptions(ind){
				ind==0?this.$refs.homePoup.open():this.getScode()
			},
			userToCode(e){
				let parmas={
					cmd:'checkOrder',
					code:e.result
				}
				this._reqw.post(parmas).then(res=>{
					res.rsult==0?(this.$api.tip('核销成功!')):this.$api.tip(res.resultNote)
				}).catch(err=>{})
			},
			getScode(){
				
				// #ifdef MP-WEIXIN
				let that=this;
				uni.scanCode({
					success(res) {
						console.log(res)
						that.userToCode(res)
					}
				})
				// #endif
				// #ifdef H5
				that.$wechat.scanQRCode(res => {
					console.log(res)
					that.userToCode(res)
				})
				// #endif
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
				this.$api.loading('加载中...');
				if (pullScroll.page == 1) {
					this.dataList = [];
				}
				let state;
				this.tabIndex==0?state=1:state=7;
				let e = {
					cmd:'merchantorderList',
					merchant_id:this.merchant_id,
					nowPage: pullScroll.page,
					state
				}
				const curList = [];
				this._reqw.post(e).then(res => {
					uni.hideLoading();
					res.result == 0 ?
						(
							(res.body.dataList.length == 0 ? (pullScroll.empty()) : res.body.dataList.forEach(item => {
									curList.push(item)
								}), this.dataList = this.dataList.concat(curList), pullScroll.page >= res.body.totalPage ? pullScroll.finish() :
								pullScroll.success())
						) :
						this.$api.tip(res.resultNote);
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.tips-btn {
		width: 76upx;
		line-height: 31upx;
		text-align: center;
		background: #006F2F;
		border-radius: 4upx;
		font-size: 24upx;
		color: #EDFFFA;
		margin-right: 20upx;
	}
	.group-bottom{
		position: fixed;
		bottom:60upx;
		z-index: 999;
		width: 100%;
	}

	.one-btn {
		background: #007030;
	}

	.two-btn {
		background: #FFB600;
	}

	.group-btn {
		width: 302upx;
		line-height: 70upx;
		text-align: center;
		border-radius: 35upx;
		font-size: 30upx;
		color: #FFFFFF;
	}

	.old-price {
		font-size: 31upx;
		font-weight: bold;
	}

	.price-symbol {
		font-size: 24upx;
	}

	.sku-name {
		color: #666666;
		font-size: 22upx;
		width: 70%;
	}

	.uni-second-list {
		margin-bottom: 20upx;
		background: #FFFFFF;
		border-radius: 15upx;
	}

	.uni-second {
		display: flex;
		padding: 20upx 0;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		border-radius: 4upx;
	}

	.image-second {
		width: 155upx;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}

	.uni-second-image {
		width: 155upx;
		height: 155upx;
		border-radius: 10upx;
	}

	.uni-second-title {
		font-size: 32upx;
		font-weight: bold;
		width: 90%;
	}

	.uni-second-price {
		width: 75%;
		font-size: 28upx;
		padding-left: 15upx;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: relative;
		box-sizing: border-box;
	}

	.store-num {
		font-size: 22upx;
		color: rgba(102, 102, 102, 1);
	}
</style>
