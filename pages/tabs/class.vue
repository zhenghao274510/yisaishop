<template>
	<view class="page-body" catchtouchmove="return">

		<!-- #ifdef H5 -->
		<!-- 		<view class="indexBg" style="height:156upx;">

		</view>
		<view class="" style="height:60upx;">

		</view> -->
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<nav-bar type="0" title='分类'></nav-bar>
		<view class="indexBg" :style="{'height':height+'px'}" v-if="open==1">

		</view>
		<view class="category-list-con" :style="{'top':top+'px'}">
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<view class="indexBg" style="height:126upx;">

			</view>
			<view class="category-list-con" style="top:20upx">
				<!-- #endif -->

				<view class="public-con" v-if="open==1">
					<view class="city-con" style="margin-top: 15px;">
						<view class="uni-flex d-items-center uni-flex-item" @tap.stop="userOptionsMode">
							<image src="/static/img/shouyedizhi.png" class="img-icon-home"></image>
							<view class="">
								<view class="uni-ellipsis" style="color:#000000;">
									{{shop.name}}
								</view>
								<view class="" style="color: #999999;font-size:23upx;">
									据您{{shop.distance}}
								</view>

							</view>
						</view>
						<s-switch :defaultValue="defaultValue" type="1" v-if="showSwitch==2" @switchValue='switchValue'></s-switch>
					</view>

				</view>
				<view class="category-list" :class="[open==1?'classHeight':'mainHeight']">
					<!-- 左侧分类导航 -->
					<scroll-view scroll-y="true" class="left">
						<view class="row" v-for="(v,k) in leftDataList" :key="k" :id="'cate-'+v.id" :class="[k==showCategoryIndex?'on':'']"
						 @tap="showCategory(v.id,k)">

							<view class="text uni-ellipsis">
								{{v.name}}
							</view>
						</view>
					</scroll-view>
					<!-- 右侧子导航 -->
					<view class="right">
						<s-pull-scroll ref="pullScroll" :pullDown="pullDown" :pullUp="getRightData" :fixed="false">
							<view class="category">
								<view class="list d-border-bottom" v-for="(v,k) in rightDataList" :key="k">
									<view class="uni-flex d-items-center" @tap.stop="details(v.id)">
										<view class="class-p-img lazyload lazypic" :class="{loaded: v.loaded}">
											<image :src="v.icon" mode="aspectFill" lazy-load="true" @load="imageOnLoad(v)"></image>
										</view>

										<view class="uni-flex-item">
											<view class="text">{{v.title}}</view>
											<view class="uni-flex d-items-center d-between sku-name">
												库存{{v.stocks}}
											</view>
											<view class="uni-flex d-between">
												<view class="">
													<text style="font-size: 22rpx;color:#FF0000;">￥</text><text class="price">{{v.price | parsePrice}}</text>
													<text style="font-size: 24rpx;color:#999999;margin-left:20upx;">已售{{v.sales}}</text>
												</view>
												<image src="/static/img/tianjia.png" mode="" class="class-img"></image>
											</view>
										</view>
									</view>
								</view>
							</view>
							<!-- <uni-load-more :status="status" v-if="showLoading"></uni-load-more>
						<xw-empty v-if="showEmpty"></xw-empty> -->
						</s-pull-scroll>
					</view>
				</view>
			</view>

		</view>
</template>

<script>
	import sSwitch from "@/components/s-switch/s-switch.vue"
	import sPullScroll from "@/components/s-pull-scroll/index.vue"
	export default {
		components: {
			sPullScroll,
			sSwitch
		},
		data() {
			return {
				shop:{name:'',distance:''},
				defaultValue: 0,
				top: uni.getSystemInfoSync()['statusBarHeight'] + 54,
				height:uni.getSystemInfoSync()['statusBarHeight'] + 100,
				showLoading: true,
				showEmpty: false,
				status: 'loading',
				showCategoryIndex: 0,
				showSwitch: 1,
				leftCid: '',
				page: 1,
				totalPage: 1,
				leftDataList: [],
				rightDataList: []
			}
		},
		onLoad() {
			//  #ifndef H5
			this.$api.setNav('分类')
			// #endif
			this.getLeftData();
		},
		onShow() {
			this.leftCid = getApp().globalData.leftCid;
			this.getUserdefaultval();
			this.getCartNum();
		},
		watch: {
			leftCid(n) {
				if (n) {
					this.leftDataList.forEach((item, index) => {
						n == item.id ? this.showCategoryIndex =index : ''
					})
					this.refresh();
				}
			},
			leftDataList: {
				handler(n) {
					if (this.leftCid == '') {
						this.leftCid = n[0].id
					}else{
						n.forEach((item, index) => {
							this.leftCid == item.id ?this.showCategoryIndex =index: ''
						})
					}
				},
				deep: true
			}

		},
		computed: {
			open() {
				return uni.getStorageSync('open')
			}
		},
		methods: {
			refresh() {
				this.$nextTick(() => {
					this.$refs.pullScroll.refresh();
				});
			},
			pullDown(pullScroll) {
				setTimeout(() => {
					this.getRightData(pullScroll);
				}, 200)
			},
			switchValue(e) {
				console.log(e)
				if (uni.getStorageSync('uid')) {
					this.defaultValue = e.key + "";
					this.$api.navTo(`/pages/public/distributionMode?id=${this.defaultValue}&type=2`)
				} else {
					// #ifdef MP-WEIXIN
					this.$api.navTo('/pages/index/author');
					// #endif
					//   #ifdef H5
					this.$api.getCode()
					// #endif
				}

			},
			getUserdefaultval() {
				if (uni.getStorageSync('defaultValue')) {
					this.defaultValue = uni.getStorageSync('defaultValue')
				}
				if (uni.getStorageSync('showSwitch')) {
					this.showSwitch = uni.getStorageSync('showSwitch')
				} else {
					this.showSwitch = 2
				}
				if(uni.getStorageSync('shop')){
					this.shop=uni.getStorageSync('shop')
				}
			},
			userOptionsMode() {
				this.switchValue({
					key:this.defaultValue
				});
			},
			showCategory(id, k) {
				if (this.showCategoryIndex != k) {
					this.leftCid = id;
					this.showCategoryIndex = k;
				}
			},
			getLeftData() {
				let parmas = {
					cmd: 'getProductCategoryList'
				}
				this._reqw.post(parmas).then(res => {
					res.result == 0 ? (this.leftDataList = res.body.dataList) :
						this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			async getRightData(pullScroll) {
				if(pullScroll.page==1){
					this.rightDataList=[];
				}
				let parmas = {
					cmd: 'getProductList',
					merchantId: uni.getStorageSync('merchantId'),
					categoryId: this.leftCid,
					uid: uni.getStorageSync('uid'),
					flag: 2,
					nowPage: pullScroll.page
				}
				console.log(parmas)
				const curList = [];
				const res = await this._reqw.post(parmas);
				if (res.result != 0) {
					this.$api.tip(res.resultNote);
					return
				}
				res.body.dataList.length == 0 ? (pullScroll.empty()) : res.body.dataList.forEach(item => {
						curList.push(item)
					}), this.rightDataList = this.rightDataList.concat(curList), pullScroll.page >= res.body.totalPage ? pullScroll.finish() :
					pullScroll.success()
			},
			details(id) {
				if (!uni.getStorageSync('uid')) {
					// #ifdef MP-WEIXIN
					this.$api.navTo('/pages/index/author');
					// #endif
					//   #ifdef H5
					this.$api.getCode()
					// #endif
					return
				}
				this.$api.navTo(`/pages/details/goodsDetails?id=${id}&type=5`)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.on::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 0;
		transform: translate(-50%, -50%);
		width: 40upx;
		height: 40upx;
		background: #B2C6BA;
		border-radius: 50%;
	}

	.on::after {
		content: '';
		position: absolute;
		bottom: 10upx;
		right: 0;
		width: 16upx;
		height: 16upx;
		background: #B2C6BA;
		border-radius: 50%;
	}

	.iconColor {
		color: #6BD453;
	}

	.iconfont {
		font-size: 24upx;
		line-height: 0.7;
	}

	.top-nav-left {
		width: 200upx;
	}

	.cl-tui-img {
		width: 30upx;
		height: 30upx;
		position: absolute;
		top: 15upx;
		left: 15upx;
	}

	.price-box {
		font-weight: 500;
		color: rgba(255, 0, 0, 1);
		line-height: 35upx;
	}

	.price {
		color: rgba(255, 0, 0, 1);
		font-weight: bold;
		font-size: 33upx;
	}

	.sku-name {
		font-size: 22upx;
		color: rgba(153, 153, 153, 1);
		line-height: 35upx;
		margin: 20upx 0;
		height: 35upx;
	}

	.uni-space {
		justify-content: space-between;

	}

	.class-p-img {
		width: 160upx;
		height: 160upx;
		margin-right: 20upx;

		image {
			width: 100%;
			height: 100%;
			border-radius: 8upx;
		}
	}

	.class-img {
		width: 51upx;
		height: 51upx;
	}

	.text {
		font-weight: bold;
		line-height: 38upx;
		font-size: 30upx;
	}

	.category-list-con {
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0upx;
	}

	.mainHeight {
		height: calc(100% - 110upx);
	}

	.classHeight {
		height: calc(100% - 160upx);
	}

	.category-list {
		width: 96%;
		display: flex;
		padding: 0 2%;
		position: relative;

		.left {
			width: 27%;
			overflow: hidden;
			background-color: #fff;

			.row {
				width: 100%;
				height: 90upx;
				display: flex;
				justify-content: center;
				align-items: center;

				.text {
					width: 180rpx;
					position: relative;
					text-align: center;
					color: #666666;
				}

				&.on {
					height: 90upx;
					background-color: #F6F5F5;
					position: relative;

					.text {
						width: 180rpx;
						font-size: 30upx;
						font-weight: 600;
						color: #333333;
						text-align: center;
					}
				}

			}
		}

		.right {
			width: 73%;
			left: 27%;
			.category {
				background: #ffffff;
				margin-left: 2%;

				.list {
					margin-bottom: 10upx;
					width: 100%;
					padding: 10upx;
					box-sizing: border-box;
				}
			}
		}
	}
</style>
