<template>
	<view class="">
		<s-pull-scroll ref="pullScroll" :pullDown="pullDown" :pullUp="loadData" :back-top="true">
			<view class="cart-item" v-for="(v,k) in dataobject.dataList" :key='k'>
				<view class="cart-item-left">
					<image :src="v.image" mode="aspectFill" lazy-load class="product-img"></image>
				</view>
				<view class="item-right">
					<view class="item-right-top">
						<view class="clamp title uni-ellipsis">{{v.title}}</view>
					</view>
					<view class="item-right-top">
						<view class="skuname">{{v.skuname}}</view>
						<view class="step">
							x {{v.number}}
						</view>
					</view>
					<view class="item-right-top">
						<view class="item-pople-num">
							<text class="item-pople-one">{{number}}</text><text class="item-pople-two">人团</text>
						</view>
						<view class="uni-flex d-items-center">
							<view class="uni-flex d-items-center">
								<text style="font-size: 29upx;color: #FF0000;">￥</text>
								<text style="font-size:42upx;color: #FF0000;font-weight: bold;">{{v.price | parsePrice}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="uni-flex d-items-center d-content-center" style="padding: 20upx 0;">
				<bbs-countdown :time="dataobject.end_date" type='2'></bbs-countdown>
			</view>
			
			<view class="cart-item">
				<block v-for="(v,k) in dataobject.members"
				 :key="k">
				 <view class="uni-flex d-column d-items-center d-content-center" v-if="k<=3">
				 	<image :src="v.icon" class="lead-img"></image>
				 	<view class="lead-con" >
				 		{{k==0?'团长':v.nickname}}
				 	</view>
				 </view>
				 </block>
				
			</view>
			<view class="" style="padding:44upx 0;background: #F6F6F6;">
				<view class="footer-btn" hover-class="btn-hover" @tap='useroptions'>
					一键参团
				</view>
			</view>

			<!-- <home-list type='3' :list="dataobject.dataList"></home-list> -->
		</s-pull-scroll>
	</view>
</template>

<script>
	// import homeList from "@/components/mycom/homeList.vue"
	import sPullScroll from "@/components/s-pull-scroll/index.vue"
	export default {
		components: {
			// homeList,
			sPullScroll
		},
		data() {
			return {
				orderId:'',
				number:2,
				dataobject: {
					title: '', //商品
					price: '', //价格
					group_number: '', //拼团人数
					start_time: '', //开始时间type=1,2,3
					end_time: '', //结束时间type=1,2,3
					sales: '', //销量
					old_price: '', //划线价
					dataList: []
				}
			}
		},
		onLoad(options) {
			this.orderId=options.id;
			if(!uni.getStorageSync('uid')){
				this.getPosition()
			}
				
		},
		onShow() {
			if(uni.getStorageSync('uid')){
				this.refresh();
			}
		},
		watch:{
			dataobject:{
				handler(n){
					this.number=Number(n.groupqty)+Number(n.group_qty)
				},
				deep:true
			}
		},
		methods: {
			async getPosition() {
			   const point= await this.getUserLocation();
				if(point){
					this.$api.navTo('/pages/sharepage/author')
				}else{
					this.isShow=true;
				}
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
				this.$api.loading('加载中...')
				let e = {
					cmd: 'getOrderById',
					orderId: this.orderId
				};
				console.log(e)
				this._reqw.post(e).then(res => {
					uni.hideLoading();
					console.log(res)
					res.result == 0 ? (this.dataobject = res.body,pullScroll.finish()) : this.$api.tip(
						res.resultNote)
				}).catch(err => {})
			},
			useroptions(){
				console.log(1)
				uni.setStorageSync('merchantId',this.dataobject.merchant_id)
				if(uni.getStorageSync('uid')){
					let array = [],
						item = {
							product_id: this.dataobject.group_product_id,
							skuid: this.dataobject.dataList[0].skuid,
							title: this.dataobject.dataList[0].title,
							qty:this.dataobject.dataList[0].number,
							name: this.dataobject.dataList[0].skuname,
							price: this.dataobject.dataList[0].price,
							image: this.dataobject.dataList[0].image
						};
					array.push(item);
					this.$api.navTo(
						`/pages/order/finishOrder?goods=${encodeURIComponent(JSON.stringify(array))}&type=1&id=${this.dataobject.group_id}`
					)
					// this.$api.navTo(`/pages/details/goodsDetails?id=${this.id}&merchantId=${this.merchantId}&type=${this.type}`)
				}else{
					// #ifdef MP-WEIXIN
					this.$api.navTo('/pages/index/author');
					// #endif
					//   #ifdef H5
					this.$api.getCode()
					// #endif
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.lead-con {
		width: 86upx;
		line-height: 35upx;
		text-align: center;
		background: #E9FFF2;
		border-radius: 18upx;
		font-size: 22upx;
		color: #007030;
		margin-top: 20upx;
	}

	.lead-img {
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
	}

	.item-pople-one {
		background-color: #007030;
		color: #FFFFFF;
		text-align: center;
		padding: 2upx 10upx;
		line-height: 34upx;
		font-size: 24upx;
		border-radius: 4upx 0 0 4upx;

	}

	.item-pople-two {
		padding: 0 8upx;
		text-align: center;
		line-height: 34upx;
		font-size: 24upx;
		color: #007030;
		border: 2upx solid #007030;
		box-sizing: border-box;
		border-radius: 0 4upx 4upx 0;
	}

	.cart-item {
		display: flex;
		position: relative;
		background: #ffffff;
		padding: 30upx 20upx;
		box-sizing: border-box;

	}

	.price {
		color: #FF0000;
		font-size: 30upx;
	}

	.item-right-top {
		display: flex;
		flex: 1;
		justify-content: space-between;
		align-items: center;
	}

	.skuname {
		font-size: 20upx;
		color: #999999;
	}

	.cart-item-left {
		position: relative;
		display: flex;
		align-items: center;
	}

	.product-img {
		width: 160upx;
		height: 160upx;
		border-radius: 5px;
		margin-left: 5upx;
	}

	.item-right {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding-left: 10upx;
		overflow: hidden;
		position: relative;
	}

	.title {
		font-weight: bold;
	}

	.title,
	.price {
		height: 40upx;
		line-height: 40upx;
		flex: 1;
	}

	.footer-btn {
		width: 90%;
		background: #007030;
		border-radius: 39px;
		box-shadow: 0px 1upx 4upx 0px #F2F2F2;
		border-radius: 40upx;
		margin-left: 5%;
		font-size: 34upx;
		color: #ffffff;
		font-weight: bold;
		text-align: center;
		line-height: 88upx;
	}
</style>
