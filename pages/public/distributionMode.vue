<template>
	<view class="" catchtouchmove="return">
		<view class="uni-flex-item uni-flex d-items-center d-content-center" style="padding: 30upx 0 20upx;">
			<s-switch :defaultValue="tabIndex" type="1" :switchList="switchList" @switchValue="changeSwitch"></s-switch>
		</view>
		<view class="search-con-all" v-if="tabIndex==0">
			<view class="search-con">
				<navigator url='./city-list'class=""><text>{{city}}</text> <view class="uni-icon uni-icon-arrowdown"></view></navigator>
				<view class="uni-flex-item search uni-flex d-items-center ">
					<view class="uni-icon uni-icon-search" style="font-size:32upx;margin-left:10upx">

					</view>
					<input v-model='name' confirm-type="search" placeholder='请输入地址寻找周边门店' placeholder-style="font-size:26upx" @confirm='useconfirm'></input>
				</view>
			</view>
		</view>
		<s-pull-scroll ref="pullScroll" :pullDown="pullDown" :pullUp="loadData" :open="open" :back-top="true" :top="[tabIndex==0?200:100]"
		 :upFinishText='upFinishText'>
			<block v-if="tabIndex==0&&open==1">
				<view class="">
					<view class="item-title">
						当前地址
					</view>
					<view class="bill-item-con">
						<view class="bill-item-top uni-flex d-items-center d-between">
							<view class="bill-item-top-title">
								{{dataobject.name}}
								<text style="margin-left: 20upx;font-size: 24upx;">{{dataobject.type==2||dataobject.type==3?"(次日自提)":""}}</text>
							</view>
							<view class="bill-item-bottom">
								{{dataobject.distance}}
							</view>
						</view>
						<view class="bill-item-top uni-flex d-items-center d-between">
							<view class=" uni-flex d-items-center">
								<image src="/static/img/shouyedizhi.png" class="icon-img"></image>
								<view class="" style="font-size: 24upx;color: #666666;">
									{{dataobject.address}}
								</view>
							</view>
							<view class="bill-item-bottom">
							</view>
						</view>
						<view class="bill-item-top uni-flex d-items-center d-between">
							<view class=" uni-flex d-items-center">
							</view>
							<view style="font-size: 22upx;color:#007030;" @tap.stop="useToMap(dataobject)">
								查看详情
							</view>
						</view>
					</view>
				</view>
				<view class="">
					<view class="item-title">
						附近地址
					</view>
					<view class="bill-item-con" v-for="(v,k) in dataList" :key="k" @click.stop='useroptions(v)'>
						<view class="bill-item-top uni-flex d-items-center d-between">
							<!-- "type"://类型（1:店铺2：普通团长3：超级团长4:主商城） -->
							<view class="bill-item-top-title">
								{{v.name}} <text style="margin-left: 20upx;font-size: 24upx;">{{v.type==2||v.type==3?"(次日自提)":""}}</text>
							</view>
							<view class="bill-item-bottom">
								{{v.distance}}
							</view>
						</view>
						<view class="bill-item-top uni-flex d-items-center d-between">
							<view class=" uni-flex d-items-center">
								<image src="/static/img/shouyedizhi.png" class="icon-img"></image>
								<view class="" style="font-size: 24upx;color: #666666;">
									{{v.address}}
								</view>
							</view>
							<view class="bill-item-bottom">
							</view>
						</view>
						<view class="bill-item-top uni-flex d-items-center d-between">
							<view class=" uni-flex d-items-center">
							</view>
							<view style="font-size: 22upx;color:#007030;" @tap.stop="useToMap(v)">
								查看详情
							</view>
						</view>
					</view>
				</view>
			</block>
			<block v-if="tabIndex==1">
				<view class="list b-b" @click.stop="checkAddress(v)" v-for="(v,k) in dataList" :key="k">
					<view class="wrapper">
						<view class="u-box-first">
							<text class="name">{{v.name}}{{v.sex==1?"先生":"女士"}}</text>
							<text class="mobile">{{v.phone}} </text>
						</view>
						<view class="address-box uni-flex">
							<text class="default" v-if="k==0">【默认】</text>
							<text class="address">{{v.province_city_town}}{{v.address}}</text>
						</view>
					</view>
					<view class="u-box line">
						<view class="row ">
						</view>
						<view class="u-bottom">
							<text class="yticon edmit" @click.stop="addAddress('edit',v)">编辑</text>
							<text class="yticon del" @click.stop="delAddress(v.id)">删除</text>
						</view>
					</view>
				</view>

			</block>
			<no-shop :isShow="open"></no-shop>
		</s-pull-scroll>
		<view class="add-btn" @click="addAddress('add')" hover-class="btn-hover" v-if="tabIndex==1">新增地址</view>
	</view>
</template>

<script>
	import sSwitch from "@/components/s-switch/s-switch.vue"
	import sPullScroll from "@/components/s-pull-scroll/index.vue"
	import uniSearchBar from "@/components/uni-search-bar/uni-search-bar.vue"
	import noShop from "@/components/noshop/no-shop.vue"
	export default {
		components: {
			sSwitch,
			sPullScroll,
			uniSearchBar,
			noShop
		},
		data() {
			return {
				upFinishText: '已经到底了~',
				type: 0,
				dataobject: {
					id: "", //店铺id
					name: "", //店铺名字
					address: "", //地址
					distance: "" //距离
				},
				name: '',
				open: 1,
				tabIndex: 0,
				load: false,
				city: uni.getStorageSync('city'),
				dataList: [],
				switchList: [{
						key: 0,
						value: '门店自提'
					},
					{
						key: 1,
						value: '送货上门'
					}
				]
			}
		},
		onLoad(options) {
			if (options.id) {
				this.tabIndex = options.id;
			}
			if (options.type) {
				this.type = options.type;
			}
		},
		onShow() {
			this.refresh();
		},
		computed: {
			shop() {
				return uni.getStorageSync('shop')
			}
		},
		methods: {
			useconfirm(e) {
				this.open = 1;
				this.refresh();
			},
			useToMap(v) {
				this.$api.navTo(`./shopMap?id=${encodeURIComponent(JSON.stringify(v))}`)
			},
			useroptions(v) {
				uni.setStorageSync('defaultValue', '0');
				v.type == 2 || v.type == 3 ? uni.setStorageSync('showSwitch', '1') :
					uni.setStorageSync('showSwitch', '2');
				uni.setStorageSync('shop', v);
				uni.setStorageSync('merchantId', v.id);
				this.type == 1 ? this.$api.reLaunch('/pages/tabs/index') : this.type == 2 ? this.$api.reLaunch('/pages/tabs/class') :
					this.$api.back();
			},
			changeSwitch(e) {
				this.tabIndex = e.key;
				this.open = 1;
				this.refresh();
			},
			async checkAddress(v) {
				let e = {
					cmd: 'getMerchantByAddress',
					id:v.id
				}
				const res =await this._reqw.post(e);
				if(res.result!=0){
					this.$api.tip(res.resultNote);
					return
				}
				if (res.body) {
					uni.setStorageSync('defaultValue', '1');
					uni.setStorageSync('shop',res.body)
					uni.setStorageSync('point',{latitude:v.lat,longitude:v.lon})
					uni.setStorageSync('merchantId',res.body.id)
					this.type == 1 ? this.$api.reLaunch('/pages/tabs/index') : this.type == 2 ? this.$api.reLaunch('/pages/tabs/class') :
						this.$api.back();		
				}else{
					uni.showModal({
						confirmText: '确定',
						content: '该地区配送功能暂未开通',
						showCancel:false,
						success(options){
							if (options.confirm) {
								
							}
						}
					});
				}
				
			},
			addAddress(type, e) {
				let initList, url;
				if (type == 'edit') {
					url = `/pages/mineoptions/addressManage?id=${JSON.stringify(e)}`
				} else {
					url = `/pages/mineoptions/newAddAdress`
				}
				this.$api.navTo(url);
			},
			delAddress(id) {
				let _this = this;
				uni.showModal({
					confirmText: '确定',
					cancelText: '取消',
					confirmColor: "#006F2F",
					content: '确定删除吗？',
					success: async options => {
						if (options.confirm) {
							let parmas = {
								cmd: 'deleteAddress',
								id: id
							}
							const res = await _this._reqw.post(parmas);
							res.result == 0 ? (_this.$api.tip('删除成功'), _this.refresh()) : _this.$api.tip(
								res.resultNote);
						}
					}
				});
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
			async loadData(pullScroll) {
				let e;
				if (pullScroll.page == 1) {
					this.dataList = [];
					this.open=1;
				}
				if (this.tabIndex == 0) {
					e = {
						cmd: 'getMerchantList',
						city: this.city,
						lon: uni.getStorageSync('point').longitude,
						lat: uni.getStorageSync('point').latitude,
						nowPage: pullScroll.page,
						name: this.name
					}
				} else {
					e = {
						cmd: 'getAddressList',
						uid: uni.getStorageSync('uid')
					}
				}
				const curList = [];
				const res = await this._reqw.post(e);
				if (res.result != 0) {
					this.$api.tip(res.resultNote);
					return
				}
				if (res.body.dataList.length != 0) {
					this.upFinishText = '已经到底了~';
					res.body.dataList.forEach(item => {
						curList.push(item)
					})
					this.dataList = this.dataList.concat(curList);
					if (this.tabIndex == 0) {
						this.dataobject = this.dataList[0]
					}
					if (this.tabIndex == 0) {
						pullScroll.page >= res.body.totalPage ? pullScroll.finish() : pullScroll.success();
					} else {
						pullScroll.finish();
					}

				} else {
					this.upFinishText = '';
					pullScroll.finish();
					if (this.tabIndex == 0) {
						this.open = 2;
					}

				}
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "@/common/css/address.css";

	.uni-icon-search {}

	.item-title {
		padding: 20upx 0 0 3%;
	}

	.search-con {
		width: 100%;
		height: 88upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 40upx 0px rgba(204, 204, 204, 0.3);
		border-radius: 8upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-left: 30upx;
		box-sizing: border-box;
	}

	.search-con-all {
		padding: 0 20upx;
		position: relative;
	}

	.search {
		position: relative;
		margin-left:10upx;
	}

	.search::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		width: 2upx;
		height: 21upx;
		background-color: #e7e7e7;
	}

	.icon-img {
		width: 22upx;
		height: 25upx;
		margin-right: 20upx;
	}

	.price-symbol {
		font-size: 28upx;
		color: rgba(255, 65, 28, 1);
	}

	.price {
		font-size: 50upx;
		color: rgba(255, 65, 28, 1);
		font-weight: bold;
	}

	.bill-item-con {
		width: 94%;
		height: 186upx;
		background: #FFFFFF;
		border-radius: 15upx;
		margin: 20upx auto 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		content-visibility: auto;
	}

	.bill-item-top {
		padding: 0 20upx;
		width: 100%;
		box-sizing: border-box;
	}

	.bill-item-bottom {
		font-size: 26upx;
		color: rgba(204, 204, 204, 1)
	}

	.bill-item-top-title {
		font-size: 32upx;
		color: rgba(51, 51, 51, 1);
	}
</style>
