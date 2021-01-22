<template>
	<view class="page-body">
		<!-- #ifdef MP-WEIXIN -->
		<nav-bar type="0" title='伊赛商城' :show="false"></nav-bar>
		<!-- #endif -->
		<s-pull-scroll ref="pullScroll" :pullDown="pullDown" :pullUp="getRecommend" :back-top="true" :headerHeight="top">
			<!-- #ifdef H5 -->
			<view class="indexBg">

			</view>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<view class="indexBg">

			</view>
			<!-- #endif -->

			<view class="public-con">
				<view class="uni-flex d-items-center" style="padding: 0 2%;width: 100%;box-sizing: border-box;">
					<uni-search-bar placeholder="精品牛肉" radius="30" type='1' style="width:100%;" bgColor="#299055"></uni-search-bar>
					<image src="/static/img/homexiaoxi.png" class="image-icon-home" @click="userSeeMessage" v-if="dataobject.read==1"></image>
					<image src="/static/img/wuxiaoxi.png" class="image-icon-home" @click="userSeeMessage" v-else></image>
				</view>
				<view class="city-con" v-if="open==1">
					<view class="uni-flex d-items-center uni-flex-item" @tap.click="userOptionsMode">
						<image src="/static/img/shouyedizhi.png" class="img-icon-home"></image>
						<view class="">
							<view class="" style="color:#000000;">
								{{dataobject.name || dataobject.merchantname}}
							</view>
							<view class="" style="color: #999999;font-size:23upx;">
								据您{{dataobject.distance}}
							</view>

						</view>
					</view>
					<s-switch :defaultValue="defaultValue" type="1" v-if="showSwitch==2&&dataobject.type!=2&&dataobject.type!=3"
					 @switchValue='switchValue'></s-switch>
				</view>
			</view>
			<home-banner :list="dataobject.bannerList" type='1'></home-banner>
			<home-navs :list="dataobject.productCategoryList" @click='navsOnClick'></home-navs>
			<!-- 小列表 -->
			<view class="list-swiper">
				<view class="list-item-con" @click.stop="unsteady(k)" v-for="(v,k) in girdList" :key="k">
					<image :src="v" class="product-img" mode="scaleToFill"></image>
				</view>
			</view>

			<!-- #ifdef MP-WEIXIN -->
<!-- 			<view class="list-swiper">
				<view class="list-title-con uni-flex-item" @click.stop="bigSee(0)">
					<view class="">
						<text class="list-title">限时秒杀</text>
					</view>
					<image :src="skillimage" class="product-one-img" mode="scaleToFill"></image>
				</view>
			</view> -->
			<!-- 限时秒杀 -->
			<view class="list-swiper">
				<view class="list-title-con" @click.stop="bigSee(0)">
					<view class="">
						<text class="list-title">限时秒杀</text>
					</view>

					<image :src="skillimage" class="product-img" mode="scaleToFill"></image>
				</view>
				<view class="list-title-con" @click.stop="bigSee(1)">
					<view class="">
						<text class="list-title">直播</text>
					</view>
					<image :src="liveimage" class="product-img" mode="scaleToFill"></image>
				</view>
			</view>
			<!-- #endif -->


			<!-- #ifdef H5 -->
			<view class="list-swiper">
				<view class="list-title-con uni-flex-item" @click.stop="bigSee(0)">
					<view class="">
						<text class="list-title">限时秒杀</text>
					</view>
					<image :src="skillimage" class="product-one-img" mode="scaleToFill"></image>
				</view>
			</view>
			<!-- #endif -->


			<!-- 会员专享 -->
			<view class="" v-if="dataobject.vipProductList.length!=0">
				<view class="second-title">
					<image src="/static/img/huiyuanzhuanxiang.png" mode=""></image>
					<navigator url="./vip_list" class="more_tips">
						查看更多 >
					</navigator>
				</view>
				<view class="uni-second-list">
					<view class="uni-second" v-for="(item,index) in dataobject.vipProductList" :key="index" @tap.stop="stockDetails(item.id)">
						<view class="image-second">
							<image class="uni-second-image" :src="item.icon" mode="aspectFill"></image>
						</view>
						<view class="uni-second-price">
							<view class="uni-second-title">{{item.title}}
							</view>
							<view class="uni-flex d-items-center price-con">
								<text class="price">￥{{item.price | parsePrice}}</text>
								<image src="/static/img/home-huiyuan.png" class="vip-img"></image>
							</view>
							<view class="sku-name">
								<text style="text-decoration: line-through;">￥{{item.old_price | parsePrice}}</text>
								<text style="margin-left: 20upx;">月销{{item.sales}}</text>
							</view>
							<image src="/static/img/tianjia.png" class="img" @tap.stop="toggleSpec(item)"></image>

						</view>
					</view>
				</view>
			</view>



			<!-- 为你优选 -->
			<view class="" v-if="dataList.length!=0">
				<view class="second-title">
					<image src="/static/img/weinituijian.png" mode=""></image>
				</view>
				<view class="uni-second-list">
					<view class="uni-second" v-for="(v,k) in dataList" :key="k" @tap.stop="stockDetails(v.id)">
						<view class="image-second lazyload lazypic" :class="{loaded:v.loaded}">
							<image class="uni-second-image" :src="v.icon" mode="aspectFill" lazy-load="true" @load="imageOnLoad(v)"></image>
						</view>
						<view class="uni-second-price">
							<view class="uni-second-title">{{v.title}}
							</view>
							<view class="uni-flex d-items-center price-con">
								<text class="price">￥{{v.price |parsePrice}}</text>
							</view>
							<view class="sku-name">
								<text style="text-decoration: line-through;">￥{{v.old_price | parsePrice}}</text>
								<text style="margin-left: 20upx;">月销{{v.sales}}</text>
							</view>
							<image src="/static/img/tianjia.png" class="img" @tap.stop="toggleSpec(v)"></image>

						</view>
					</view>
				</view>
			</view>
		</s-pull-scroll>
		<compline-pounp :list="complineList" ref="complinePounp" @click="complineOptions"></compline-pounp>
		<one-sku-swiper :dataobject="skuobject" ref="oneSKuSwiper" @click="choseSku" @change="changeNum" @addcart="addCart"></one-sku-swiper>
		<!-- 首页商品弹窗 -->
		<home-advert-modal ref='homeAdvertModal'></home-advert-modal>
	</view>
</template>

<script>
	import uniSearchBar from "@/components/uni-search-bar/uni-search-bar.vue"
	import homeBanner from "@/components/mycom/swiper.vue"
	import homeNavs from "@/components/mycom/navs.vue"
	import homeList from "@/components/mycom/homeList.vue"
	import sSwitch from "@/components/s-switch/s-switch.vue"
	import complinePounp from "@/components/mycom/compline-pounp.vue"
	import sPullScroll from "@/components/s-pull-scroll/index.vue"
	import oneSkuSwiper from "@/components/mycom/index-one-sku.vue"
	import homeAdvertModal from "@/components/mycom/home-advert-modal.vue"
	export default {
		components: {
			homeAdvertModal,
			complinePounp,
			uniSearchBar,
			homeBanner,
			sPullScroll,
			homeNavs,
			homeList,
			sSwitch,
			oneSkuSwiper
		},
		data() {
			return {
				currentobj:{},
				skuobject:{},
				qty:1, //  数量
				merchantId: '', //   店铺id
				skillimage: '', //  秒杀图
				liveimage: '', //  直播图
				defaultValue: '0',
				showSwitch: 1,
				send_type:1,
				dataList: [],
				complineList: [],
				dataobject: {
					address: '',
					merchantname: "",
					read: "", //是否有未读消息（1：有2：无）
					distance: "", //距离
					type: "", //1:店铺2：普通团长3：超级团长4:主商城
					bannerList: [],
					adList: [],
					productCategoryList: [], // 一级分类
					couponList: [], // 优惠券列表
					vipProductList: [] ////会员专享
				},
				girdList: [],
				sendList: []
			}
		},
		onLoad() {
			this.refresh();
		},
		onShow() {
			this.getUserdefaultval();
			this.getCartNum();
		},
		onHide() {
			this.$refs['oneSKuSwiper'].hide();
			this.$refs['homeAdvertModal'].close();
		},
		computed: {
			open() {
				return uni.getStorageSync('open')
			},
			top() {
				// #ifdef H5
				return uni.getSystemInfoSync()['statusBarHeight'];
				// #endif 
				//#ifdef MP-WEIXIN
				return uni.getSystemInfoSync()['statusBarHeight'] + 54;
				// #endif 
			},
		},
		methods: {
			//  选择规格   加车
			toggleSpec(e) {
				if(!uni.getStorageSync('uid')){
					//   #ifdef MP-WEIXIN
					this.$api.navTo('/pages/index/author')
					// #endif
					//   #ifdef H5
					this.$api.getCode()
					// #endif
				}else{
					this.skuobject=e;
					this.$refs['oneSKuSwiper'].open();
				}
			},
			choseSku(e) {
				this.currentobj = e;
			},
			changeNum(n) {
				this.qty = n
			},
			addCart(){
				this.$api.loading('提交中...')
				let e = {
					cmd: 'addCart',
					uid: uni.getStorageSync('uid'),
					merchantId: uni.getStorageSync('merchantId'),
					type: this.send_type,
					skuId: this.currentobj.id,
					count: this.qty
				}
				console.log(e)
				this._reqw.post(e).then(res => {
					uni.hideLoading();
					this.$api.tip(res.resultNote);
					if(res.result==0){
						this.$refs['oneSKuSwiper'].hide();
						this.getCartNum();
					}
				}).catch(err => {})
			},
			navsOnClick() {
				this.$api.switchTab('/pages/tabs/class');
			},
			switchValue(e) {
				console.log(e)
				if (uni.getStorageSync('uid')) {
					this.defaultValue = e.key + "";
					this.$api.navTo(`/pages/public/distributionMode?id=${this.defaultValue}&type=1`)
				} else {
					//   #ifdef MP-WEIXIN
					this.$api.navTo('/pages/index/author')
					// #endif
					//   #ifdef H5
					this.$api.getCode()
					// #endif
				}
			},
			userOptionsMode() {
				this.switchValue({
					key:this.defaultValue
				});
			},
			stockDetails(id) {
				if (uni.getStorageSync('uid')) {
					this.$api.navTo(`/pages/details/goodsDetails?id=${id}&type=5`);
				} else {
					// #ifdef MP-WEIXIN
					this.$api.navTo('/pages/index/author')
					//#endif
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
				if (uni.getStorageSync('open') == 2) {
					this.send_type = 3;
					return
				}
				if (uni.getStorageSync('defaultValue')) {
					uni.getStorageSync('defaultValue') == 0 ? this.send_type = 2 : this.send_type = 1
				}
				
			},
			refresh() {
				this.$nextTick(() => {
					this.$refs.pullScroll.refresh();
				});
			},
			pullDown(pullScroll) {
				setTimeout(() => {
					this.getRecommend(pullScroll);
					this.loadData();
					this.getAdList();
					this.getUserCompline();
				}, 200)
			},
			userSeeMessage() {
				if (uni.getStorageSync('uid')) {
					this.$api.navTo('/pages/mineoptions/myMessage')
				} else {
					//   #ifdef MP-WEIXIN
					this.$api.navTo('/pages/index/author')
					// #endif
					//   #ifdef H5
					this.$api.getCode()
					// #endif
				}
			},
			getAdList() {
				let e = {
					cmd: 'getAdList'
				}
				this._reqw.post(e).then(res => {
					res.result == 0 ? this.fromData(res.body.adList) :
						this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			async loadData() {
				let shop = new Object();
				let e = {
					cmd: 'index',
					uid: uni.getStorageSync('uid'),
					merchant_id: uni.getStorageSync('merchantId'),
					lon: uni.getStorageSync('point').longitude,
					lat: uni.getStorageSync('point').latitude
				}
				const res = await this._reqw.post(e);
				if (res.result != 0) {
					this.$api.tip(res.resultNote);
					return
				}
				this.dataobject = res.body;
				shop.distance = res.body.distance;
				res.body.address = res.body.address.replace(uni.getStorageSync('province'), '').replace(uni.getStorageSync('city'),
					'');
				shop.address = res.body.address;
				shop.name = res.body.merchantname;
				uni.setStorageSync('shop', shop);
				res.body.type == 2 || res.body.type == 3 ? uni.setStorageSync('showSwitch', 1) : uni.setStorageSync('showSwitch',
					2);
			},
			fromData(list) {
				console.log(list)
				// 类型(1: 首页立即下单2：首页活动模块3：首页领券中心4：首页超值拼团5：首页限时秒杀6：首页直播7：限时秒杀展示图8：申请成为团长介绍图9：邀请有礼长图)',
				list.forEach(item => {
					item.type <= 4 ? this.$set(this.girdList, item.type - 1, item.image) : item.type == 5 ? this.skillimage = item.image :
						item.type == 6 ? this.liveimage = item.image : ''
				})
				console.log(this.girdList)
			},
			bigSee(ind) {
				ind == 0 ? this.$api.navTo(`/pages/tabs/LimitedSecondsKill`) : this.$api.navTo(`/pages/tabs/live-page`)
			},
			getUserCompline() {
				let e = {
					cmd: 'getCouponList',
					uid: uni.getStorageSync('uid'),
					merchant_id: uni.getStorageSync('merchantId')
				}
				this._reqw.post(e).then(res => {
					res.result == 0 ?
						(res.body.dataList.length != 0 ? (this.complineList = res.body.dataList, this.$refs.complinePounp.open()) :
							this.$refs.complinePounp.close()) :
						this.$api.tip(res.resultNote);
				}).catch(err => {})
			},
			complineOptions(id) {
				if (uni.getStorageSync('uid')) {
					let e = {
						cmd: 'getCoupon',
						uid: uni.getStorageSync('uid'),
						id
					}
					this._reqw.post(e).then(res => {
						res.result == 0 ? (this.$api.tip('领取成功!'), this.complineList = [], this.getUserCompline()) : this.$api.tip(res.resultNote)
					}).catch(err => {})
				} else {
					//   #ifdef MP-WEIXIN
					this.$api.navTo('/pages/index/author')
					// #endif
					//   #ifdef H5
					this.$api.getCode()
					// #endif
				}
			},
			async getRecommend(pullScroll) {
				if (pullScroll.page == 1) {
					this.dataList = [];
				}
				let e = {
					cmd: 'getProductList',
					merchantId: uni.getStorageSync('merchantId'),
					uid: uni.getStorageSync('uid'),
					nowPage: pullScroll.page,
					top:2,
					flag: 2
				}
				const curList = [];
				const res = await this._reqw.post(e);
				if (res.result != 0) {
					this.$api.tip(res.resultNote);
					return
				}
				res.body.dataList.length == 0 ? (pullScroll.empty()) : res.body.dataList.forEach(item => {
						curList.push(item)
					}), this.dataList = this.dataList.concat(curList), pullScroll.page >= res.body.totalPage ? pullScroll.finish() :
					pullScroll.success()
			},
			unsteady(k) {
				console.log(k)
				if (!uni.getStorageSync('uid')) {
					// #ifdef MP-WEIXIN
					this.$api.navTo('/pages/index/author');
					// #endif
					//   #ifdef H5
					this.$api.getCode()
					// #endif
					return
				}
				switch (k) {
					case 0:
						this.$api.switchTab('/pages/tabs/class');
						break;
					case 1:
						this.$api.navTo(`/pages/tabs/unsteadyBuy`);
						break;
					case 2:
						this.$api.navTo(`/pages/tabs/compliceCenter`);
						break;
					case 3:
						this.$api.navTo(`/pages/tabs/makeGroup`);
						break;
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.more_tips{
		position: absolute;
		right:20rpx;
		top: 50%;
		transform: translateY(-50%);
		font-size: 24rpx;
		color: #999999;
	}
	.product-h5-img {
		width: 100%;
		height: 179upx;
		border-radius: 10upx;
	}

	.list-swiper {
		display: flex;
		flex-wrap: wrap;
		padding: 20upx;
		justify-content: space-around;
	}

	.list-title-con {
		// display: flex;
		// flex-direction: column;
		// justify-content: center;
		// align-items: center;
		position: relative;
		margin-bottom: 20upx;
	}

	.list-item-con {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		margin-bottom: 20upx;
	}

	.product-img {
		width: 347upx;
		height: 179upx;
		border-radius: 10upx;
	}

	.product-one-img {
		width: 100%;
		height: 179upx;
		border-radius: 10upx;
	}

	.name-con {
		position: absolute;
		left: 31upx;
	}

	.btn-title {
		width: 130upx;
		height: 36upx;
		line-height: 36upx;
		border-radius: 18upx;
		font-size: 22upx;
		color: #EFFFF8;
		text-align: center;
	}

	.bg-name {
		font-size: 32upx;
	}

	.list-title {
		font-size: 36upx;
		font-weight: bold;
		position: relative;
		z-index: 9;
	}

	.list-title::after {
		content: '';
		position: absolute;
		left: 0;
		width: 100%;
		height: 15upx;
		background: #FFF000;
		border-radius: 6upx;
		/* #ifdef H5 */
		bottom: 0;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		bottom: 15upx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		z-index: -1;
		/* #endif */
		/* #ifdef H5 */
		z-index: -1;
		/* #endif */

	}

	.vip-img {
		width: 41upx;
		height: 25upx;
		margin-left: 20upx;
	}

	.img {
		width: 60upx;
		height: 60upx;
		position: absolute;
		right: 40upx;
		bottom: 40upx;
	}

	.price-con {
		padding: 10upx 0;
	}

	.price {
		color: #FD3D00;
		font-weight: Bold;
	}

	.sku-name {
		color: $uni-color-paragraph;
		font-size: 22upx;
	}

	.second-title-goods {
		padding: 40upx 20upx;
		width: 94%;
		margin: 0 auto;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 20upx 20upx 0 0;
		box-sizing: border-box;

		image {
			width: 532upx;
			height: 51upx;
		}
	}

	.second-title {
		padding: 40upx 20upx;
		width: 94%;
		box-sizing: border-box;
		margin: 0 auto;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 20upx 20upx 0 0;
        position: relative;
		image {
			width: 239upx;
			height: 39upx;
		}
	}

	.uni-second-list {
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 20upx;
	}

	.uni-second {
		display: flex;
		flex-direction: column;
		margin: 0 0 20upx 20upx;
		width: 46%;
		box-sizing: border-box;
		background-color: #FFFFFF;
		border-radius: 6upx;
	}

	.image-second {
		width: 345upx;
		height: 334upx;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}

	.uni-second-image {
		width: 100%;
		height: 100%;
		border-radius: 6upx;
	}

	.uni-second-title {
		word-break: break-all;
		display: -webkit-box;
		overflow: hidden;
		color: $uni-color-title;
		line-height: 1.5;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.uni-second-price {
		flex: 1;
		font-size: 28upx;
		line-height: 1.5;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 20upx 10upx;
	}
</style>
