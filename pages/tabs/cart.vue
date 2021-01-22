<template>
	<view style="height: 100%;z-index: 29;" @click.stop>
		<!-- #ifdef MP-WEIXIN -->
		<nav-bar type="0" title="购物车"></nav-bar>
		<!-- #endif -->


		<s-pull-scroll ref="pullScroll" :pullDown="pullDown" :pullUp="loadData" :back-top="true" :headerHeight="top"
		 @click.stop v-if="!nouser">
			<view class="uni-second-list" v-if="dataList.length!=0" @click.stop>
				<view class="uni-flex d-items-center d-between" style="padding: 20upx 30upx;">
					<label class="radio">
						<radio value="" checked disabled style="transform: scale(.8);" color="#CBCBCB" /><text>
							{{type==1?'同城配送':type==2?'自提商品':'邮寄商品'}}</text>
					</label>
					<view class="del-con uni-flex d-items-center d-content-center" @click.stop="deleteCartItem">
						<image src="/static/img/delele.png" class="del-img"></image>
					</view>
				</view>
				<checkbox-group>
					<view class="uni-second" v-for="(v,k) in dataList" :key="k">
						<radio :value="v.id" :checked="v.checked" style="transform: scale(.8);" color="#007030" @click.stop="useroptions(0,v)" />
						<view class="uni-flex d-items-center uni-flex-item" @click.stop>
							<view class="uni-second-image">
								<image class="uni-second-image" :src="v.image" mode="aspectFill" lazy-load="true"></image>
							</view>

							<view class="uni-second-price uni-flex-item" @click.stop>
								<view class="uni-second-title uni-ellipsis">{{v.title}}
								</view>
								<view class="uni-flex d-items-center d-between">
									<view class="sku-name">
										{{v.name}}<text v-if="v.number" style="margin-left: 20upx;font-size: 22upx;">(限购:{{v.number}}份)</text>
									</view>
									<view class="" v-if="v.endTime">
										<bbs-countdown :time="v.endTime" type='3'></bbs-countdown>
									</view>

								</view>
								<view class="uni-flex d-between d-items-center" @click.stop>
									<view class="uni-flex d-items-center uni-flex-item">
										<view class="">
											<text class="price-symbol " style="color:#F22519;">￥</text><text class="price">{{v.price | parsePrice}}</text>
										</view>
										<view class="old-price">
											￥{{v.old_price | parsePrice}}
										</view>
									</view>
									<view class="" @click.stop>
										<uni-number-box class="step" :min="1" :max="[v.number?v.number:v.stock]" :value="v.qty" :isMin="v.qty===1"
										 :index="k" @change="numberChange">
										</uni-number-box>
									</view>
								</view>
							</view>
						</view>

					</view>
				</checkbox-group>
			</view>
		</s-pull-scroll>

		<view class="cart-footer uni-flex d-between d-items-center" @click.stop v-if="dataList.length!=0">
			<view class="uni-flex d-items-center">
				<radio :checked="allChecked" style="transform: scale(.8);" color="#007030" @click.stop="useroptions(1)" />
				<view class="" style="font-weight: bold;" v-if="totalprice.price!=0">
					合计：￥{{totalprice.price }}
				</view>
				<view class="" style="margin-left:20upx;text-decoration: line-through;font-size: 22upx;color: #999999;" v-if="totalprice.old_price!=0">
					￥{{totalprice.old_price }}
				</view>
			</view>
			<view class="cart-btn" @click.stop="userBuy">
				去结算
			</view>
		</view>
		<empty v-if="nouser" @click="userLook"></empty>

	</view>
</template>

<script>
	import sPullScroll from "@/components/s-pull-scroll/index.vue"
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	import empty from "@/components/mycom/cartEmpty.vue";
	export default {
		components: {
			sPullScroll,
			uniNumberBox,
			empty
		},
		data() {
			return {
				totalprice: {
					price: 0,
					old_price: 0
				},
				type: 0,
				allChecked: false,
				dataList: [],
				checkedList: [],
				nouser: false
			}
		},
		computed: {
			top() {
				// #ifdef H5
				return uni.getSystemInfoSync()['statusBarHeight'];
				// #endif 
				//#ifdef MP-WEIXIN
				return uni.getSystemInfoSync()['statusBarHeight'] + 54;
				// #endif 
			}
		},
		onShow() {
			this.refresh();
			this.getCartNum();
		},
		methods: {
			refresh() {
				if (uni.getStorageSync('uid')) {
					if (uni.getStorageSync('open') == 2) {
						this.type = 3
					} else {
						if (uni.getStorageSync('defaultValue')) {
							uni.getStorageSync('defaultValue') == 0 ? this.type = 2 : this.type = 1
						}
					}
					this.$nextTick(() => {
						this.$refs.pullScroll.refresh();
					});
				} else {
					this.nouser = true
				}
			},
			numberChange(e) {
				console.log(e)
				let n = e.index,
					item = this.dataList[n];
				let parmas = {
					cmd: 'editCartCount',
					cartId: item.id,
					count: e.number,
					uid: uni.getStorageSync('uid')
				}
				this._reqw.post(parmas).then(res => {
					res.result == 0 ? (item.qty = e.number, this.userActive()) : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			userLook() {
				this.$api.switchTab('/pages/tabs/index');
			},
			userBuy() {
				let url='';
				if(this.checkedList.length==0){
					this.$api.tip('请选择商品!');
					return
				}
				if(this.checkedList.length==1){
					url=`/pages/order/creatOrder?type=cart&goods=${JSON.stringify(this.checkedList)}`
				}else{
					url=`/pages/order/finishOrder?type=cart&goods=${JSON.stringify(this.checkedList)}`
				}
				setTimeout(() => {
					this.$api.navTo(url);
				}, 200)
			},
			useroptions(type, v) {
				if (type == 0) {
					v.checked = !v.checked;
					this.checkedList = this.dataList.filter(item => {
						return item.checked
					});
					this.checkedList.length == this.dataList.length ? this.allChecked = true : this.allChecked = false;
				} else {
					const checked = !this.allChecked
					this.dataList.forEach(item => {
						item.checked = checked;
					})
					checked ? this.checkedList = this.dataList : this.checkedList = [];
					this.allChecked = checked;
				}
				this.userActive();
			},
			pullDown(pullScroll) {
				setTimeout(() => {
					this.loadData(pullScroll);
				}, 200)
			},
			userActive() {
				let price = 0,
					old_price = 0;
				this.dataList.forEach(item => {
					item.checked ? (price += item.qty * item.price * 100, old_price += item.qty * item.old_price * 100) : ''
				})
				this.totalprice = {
					price: this.$api.parsePrice(price / 100),
					old_price: this.$api.parsePrice(old_price / 100)
				}
			},
			//删除
			deleteCartItem() {
				let array = []
				this.dataList.forEach(item => {
					if (item.checked) {
						array.push(item.id)
					}
				})
				if (array.length == 0) {
					this.$api.tip('请选择要删除的商品！');
					return
				}
				let _this = this;
				uni.showModal({
					content: `确定删除这${array.length}个宝贝吗?`,
					cancelText: "再想想",
					confirmText: "删除",
					confirmColor: "#006F2F",
					cancelColor: '#999999',
					success(res) {
						if (res.confirm) {
							let parmas = {
								cmd: 'delCart',
								uid: uni.getStorageSync('uid'),
								cartIds: array
							}
							_this._reqw.post(parmas, 'shopcar/delShopcar').then(res => {
								res.result == 0 ? (_this.$api.tip('删除成功!'), _this.refresh(), _this.getCartNum()) : _this.$api.tip(
									res.resultNote)
							})
						} else if (res.cancel) {
							console.log("取消")
						}
					}
				})

			},
			loadData(pullScroll) {
				if (!uni.getStorageSync('uid')) {
					return
				}
				this.dataList = [];
				this.checkedList = [];
				this.allChecked = false;
				this.totalprice.price = this.totalprice.old_price = 0;
				let e = {
					cmd: 'cartList',
					merchant_id: uni.getStorageSync('merchantId'),
					uid: uni.getStorageSync('uid'),
					type: this.type
				}
				const curList = [];
				this._reqw.post(e).then(res => {
					res.result == 0 ?
						(
							(res.body.cartList.length == 0 ? (pullScroll.empty()) : (res.body.cartList.forEach(item => {
								item.checked = false, item.disabled = false,
									curList.push(item)
							}), this.dataList = curList, pullScroll.finish()))
						) :
						this.$api.tip(res.resultNote);
				})
			}
		},

	}
</script>
<style scoped lang="scss">
	.cart-footer {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 20upx;
		box-sizing: border-box;
		background: #FFFFFF;
		z-index: 99;
	}

	.cart-btn {
		width: 260upx;
		line-height: 66upx;
		background: #006F2F;
		border-radius: 33upx;
		color: #F4F9F7;
		text-align: center;
	}

	.del-con {
		width: 50upx;
	}

	.del-img {
		width: 34upx;
		height: 37upx;
	}

	.old-price {
		font-size: 24upx;
		text-decoration: line-through;
		color: #999999;
	}

	.price {
		color: #FF0000;
		font-size: 34upx;
		font-weight: bold;
		margin-right: 30upx;
	}

	.price-symbol {
		font-size: 20upx;
	}

	.sku-name {
		color: #666666;
		font-size: 22upx;
		width: 50%;
	}

	.uni-second-list {
		width: 96%;
		margin: 20upx auto;
		background: #FFFFFF;
		border-radius: 15upx;
		z-index: 99;
	}

	.uni-second {
		display: flex;
		padding: 20upx;
		align-items: center;
		border-radius: 4upx;
		width: 100%;
		box-sizing: border-box;
		z-index: 99;
	}

	.uni-second-image {
		width: 155upx;
		height: 155upx;

		image {
			width: 100%;
			height: 100%;
			border-radius: 10upx;
		}
	}

	.uni-second-title {
		font-size: 30upx;
		font-weight: bold;
		width: 90%;
	}

	.uni-second-price {
		padding-left: 15upx;
	}

	.store-num {
		font-size: 22upx;
		color: rgba(102, 102, 102, 1);
	}
</style>
