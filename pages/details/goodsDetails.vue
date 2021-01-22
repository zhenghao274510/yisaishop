<template>
	<view class="details_page">
		<goods-swiper :dataList="dataobject.images"></goods-swiper>
		<!-- 普通商品 -->
		<!-- （1：拼团2：秒杀3：活动4：积分5：普通） -->
		<view class="uni-flex skill-bottom" v-if="type==1||type==2">
			<view class="time-left" v-if="type==1" style="flex-direction: column;align-items: flex-start;padding-left:40upx;">
				<view class="item-pople-num">
					<text class="item-pople-one">{{dataobject.group_number}}</text><text class="item-pople-two">人团</text>
				</view>
				<view class="uni-flex d-items-center">
					<view class="uni-flex d-items-center" style="margin-right: 30upx;">
						<text style="font-size: 29upx;color: #FFFFFF;">￥</text>
						<text style="font-size:42upx;color: #FFFFFF;font-weight: bold;">{{dataobject.price | parsePrice}}</text>
					</view>
					<view class="uni-flex d-items-center" style="text-decoration: line-through;color: #FFFFFF;">
						<text>￥</text> <text>{{dataobject.old_price | parsePrice}}</text>
					</view>
				</view>
			</view>
			<view class="time-left" v-if="type==2">
				秒杀中
			</view>
			<view class="time-right uni-flex-item">
				<view class="" style="font-size: 24upx;">
					距结束仅剩
				</view>
				<view class="">
					<bbs-countdown :time="dataobject.end_time"></bbs-countdown>
				</view>
			</view>
		</view>
		<view class="goods_info_con uni-flex d-between d-items-center">
			<view class="uni-flex-item">
				<view class="goods_title">
					{{dataobject.title}}
				</view>
				<view class="uni-flex d-items-center d-between" v-if="type!=1">
					<view class="uni-flex d-items-center">
						<!-- 类型（1：拼团2：秒杀3：活动4：积分5：普通） -->
						<view class="good_newPrice" v-if="type==5||type==3||type==2">
							￥<text class="new_price">{{dataobject.price | parsePrice}}</text>
						</view>
						<view class="good_newPrice" v-if="type==4">
							<text class="new_price">{{dataobject.point}}积分</text>
						</view>
						<view class="good_oldPrice">
							￥<text class="old_price">{{dataobject.old_price | parsePrice}}</text>
						</view>
						<view class="old_price" style="margin-left: 30upx;font-size: 26upx;color: #666666;" v-if="type==4">
							已兑换{{dataobject.sales}}件
						</view>
						<view class="old_price" style="margin-left: 30upx;font-size: 26upx;color: #666666;" v-else>
							已售:{{dataobject.sales}}
						</view>
						<view class="old_price" style="margin-left: 30upx;font-size: 26upx;color: #666666;" v-if="type==2||type==3">
							限购:{{dataobject.number}}
						</view>
					</view>
				</view>
				<!-- <view class="" style="color: #999999;">
					{{dataobject.introduction}}
				</view> -->
			</view>
			<view class="addbtn-cart" @click="userStoreItem" v-if="type==5">
				<image src="/static/img/shoucang.png" class="store-icon" v-if="dataobject.collcet==2"></image>
				<image src="/static/img/isstore.png" class="store-icon" v-else></image>
				<view style="font-size: 18upx;color: #666666;">{{dataobject.collcet==2?"收藏":"已收藏"}} </view>
			</view>

		</view>
		<view class="c-list" v-if="type==5 && storeActivity.length!=0">
			<view class="">
				<view class="">
					优惠
				</view>
			</view>
			<view class="uni-flex d-items-center" style="flex-wrap: wrap;">
				<!-- "type"://类型（1：满*钱包邮2：满*钱减*钱3：第*件*几折4：满*钱增商品5：每满*钱减*钱） -->
				<view class="" v-for="(v,k) in storeActivity" :key='k'>
					<view class="hui-tip" v-if="v.type==1">
						满{{v.by_price}}包邮
					</view>
					<view class="hui-tip" v-if="v.type==2">
						满{{v.mj_price}}减{{v.mj_amount}}
					</view>
					<view class="hui-tip" v-if="v.type==3">
						第{{v.dz_number}}件{{v.jz_amount}}折
					</view>
					<view class="hui-tip" v-if="v.type==4">
						满{{v.mz_price}}赠{{v.zp_title}}
					</view>
					<view class="hui-tip" v-if="v.type==5">
						每满{{v.mm_price}}减{{v.mm_amount}}
					</view>
				</view>
			</view>


		</view>
		<!-- <view class="uni-flex d-items-center d-between num-con" v-if="type==1">
			<view class="">
				选择数量
			</view>
			<uni-number-box class="step" :min="1"  :isMin="qty===1"  @change="numberChange"></uni-number-box>
		</view> -->
		<view class="uni-flex d-items-center d-between c-list" @click="toggleSpec(1)">
			<view class="uni-flex-tit" v-if="currentobj.title==''">请选择商品规格</view>
			<view class="uni-flex-tit" v-else>已选择商品规格</view>
			<view class="" style="display: flex;align-items: center;">
				<view class="uni-ellipsis showName" v-if="currentobj.title!=''" style="color: #666666;margin-right: 20rpx;">
					{{currentobj.title}}
				</view>
				<view class="uni-flex-item" v-else>
				</view>
				<view class="uni-icon uni-icon-arrowright" style="font-size:28upx;color:#999999;"></view>
			</view>
		</view>
		<view class="goods_info_use" style="margin-bottom:14upx;" v-if="type==1 && dataobject.getGroupOrderList.length!=0">
			<view class="uni-flex d-items-center d-between">
				<view class="goods_title" style="font-size: 30upx;">
					小伙伴们在开团，可直接参与
				</view>
				<view class="uni-flex d-items-center" @click='lookMoreGroup'>
					<view style="font-size:24upx ;color:#999999;">查看更多</view>
					<view class="uni-icon uni-icon-arrowright" style="font-size:28upx;color:#999999;">

					</view>
				</view>
			</view>

			<view class="" style="padding-top:10px;">
				<view class="uni-flex d-items-center d-between" style="padding: 20upx 0;" v-for="(v,k) in dataobject.getGroupOrderList"
				 :key="k">
					<view class="uni-flex d-items-center" v-if="k<2">
						<image :src="v.icon" class="lead-img"></image>
						<view class="">
							{{v.nickname}}
						</view>
					</view>
					<view class="uni-flex d-items-center" v-if="k<2">
						<view class="" style="margin-right: 50upx;">
							<view class="" style="font-size:26upx;color:#666666;">
								差<text style="font-size:26upx;color:#007030;">{{v.number}}人</text>成团
							</view>
							<view class="uni-flex d-items-center">
								<bbs-countdown :time="v.time" type='1'></bbs-countdown>
							</view>
						</view>
						<view class="search-btn-con" @click.stop="userAddpurch(v)">
							{{v.group==1?'已参团':'去参团'}}
						</view>
					</view>

				</view>
			</view>
		</view>
		<view class="goods_info_use" style="margin-bottom:14upx;background: #FFFFFF;">
			<view class="uni-flex d-items-center d-between">
				<view class="goods_title bor_title" style="font-size: 30upx;">
					用户评价({{dataobject.commentNumber}})
				</view>
				<navigator :url="`../mineoptions/productEavList?id=${dataobject.merchantProductId}`" class="uni-flex d-items-center">
					<view style="font-size:24upx ;color:#999999;">查看更多</view>
					<view class="uni-icon uni-icon-arrowright" style="font-size:30upx;color:#999999;">

					</view>
				</navigator>
			</view>

			<view class="" style="padding-top:20upx;">
				<eva-product-list :list='dataobject.commentList'></eva-product-list>
			</view>
		</view>
		<view class="goods_info_use" style="background: #FFFFFF;">
			<view class="goods_title bor_title">
				商品详情
			</view>
			<view class="" style="padding-top:20upx;">
				<jyf-parser :html="content" ref="article"></jyf-parser>
			</view>
		</view>
		<!-- （1：拼团2：秒杀3：活动4：积分5：普通） -->

		<view class="details-icon" @click="phoneOptions">
			<image src="/static/img/kefuicon.png" class="kefu-icon"></image>
		</view>
		<view class="updataCon" v-if="type==4">
			<view class="updataGoods" @click="downOrUpGoods" :class="[dataobject.sypoint>=dataobject.point?'y-bg':'c-bg']">
				{{(dataobject.sypoint-0)>=(dataobject.point-0)?"立即兑换":"积分不足"}}
			</view>
		</view>
		<group-item-info ref="groupItemInfo" v-if="type==1" :list="dataobject.getGroupOrderList" @changeData="loadGroup"
		 @onConfirm="userAddpurch"></group-item-info>
		<goods-nav v-if="type==5" @buttonClick='buttonClick' @click="itemClick"></goods-nav>
		<group-goods-nav v-if="type==1" @buttonClick='buttonClick' @click="itemClick" :dataobject="dataobject"></group-goods-nav>
		<more-group-nav v-if="type==6" @buttonClick='morebuttonClick' @click="itemClick" :dataobject="dataobject"></more-group-nav>
		<uni-goods-nav v-if="type==2||type==3" @buttonClick='buttonClick' @click="itemClick"></uni-goods-nav>
		<!-- #ifdef MP-WEIXIN -->
		<share-pounp @click='shareClick' ref='sharePounp'></share-pounp>
		<!-- #endif -->
         <more-group-sku :dataobject="dataobject" ref="moreGroupSku" @click="choseGroupNumber" v-if="type==6"></more-group-sku>
		<one-sku-swiper :dataobject="dataobject" ref="oneSKuSwiper" @click="choseSku" @change="changeNum"></one-sku-swiper>
		<view class="" style="margin-top: 20upx;">
			<home-list type='3' :list="dataobject.dataList" @click="userLike"></home-list>
		</view>

		<goods-pounp type='4' ref='goodsPounp' :images="dataobject.icon" :title="dataobject.title" :point="dataobject.point"
		 :list="dataobject.getGroupOrderList" @click='buyGoodsItem(type)' v-if="type==4"></goods-pounp>
		<!-- 底部操作 -->
		<hch-poster ref='hchPoster' :dataobject="dataobject" :type="type"></hch-poster>

	</view>
</template>

<script>
	import goodsSwiper from '@/components/mycom/goods-swiper.vue'
	import jyfParser from "@/components/jyf-parser/jyf-parser";
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	import evaProductList from '@/components/mycom/eva-product-List.vue'
	import groupItemInfo from "@/components/mycom/group-item-info.vue"
	import groupGoodsNav from "@/components/uni-goods-nav/group-goods-nav.vue"
	import goodsNav from "@/components/uni-goods-nav/goods-nav.vue"
	import sharePounp from "@/components/mycom/sharePounp.vue"
	import uniGoodsNav from "@/components/uni-goods-nav/uni-goods-nav.vue"
	import oneSkuSwiper from "@/components/mycom/one-sku-swiper.vue"
	import goodsPounp from "@/components/mycom/homePoup.vue"
	import homeList from "@/components/mycom/homeList.vue"
	import hchPoster from "@/components/hch-poster/hch-poster.vue"
	import moreGroupNav from "@/components/uni-goods-nav/more-group-nav.vue"
	import moreGroupSku from "@/components/mycom/more-number-swiper.vue"
	export default {
		components: {
			hchPoster,
			goodsSwiper,
			goodsNav,
			goodsPounp,
			jyfParser,
			uniNumberBox,
			evaProductList,
			groupItemInfo,
			groupGoodsNav,
			sharePounp,
			uniGoodsNav,
			oneSkuSwiper,
			homeList,
			moreGroupNav,
			moreGroupSku
		},
		data() {
			return {
				flag: 0,
				text: '',
				id: '', //   商品id
				type: 0, //（1：拼团2：秒杀3：活动4：积分5：普通）
				content: "", //详情
				showLoading: true,
				qty: 1,
				send_type: 0,
				creatGroup:0,
				currentGroup: {},
				currentobj: {
					title: "", //规格名字
					price: "", //价格
					old_price: "", //划线价
					stock: "" //库存
				},
				groupId: '', //   加入 团的ID
				storeActivity: [],
				dataobject: {
					type: 4, //类型（1：活动2：拼团3：限时抢购4：积分商品5：普通商品）
					title: "", //商品
					merchantphone: "", //店铺电话
					merchanttype: "", //类型（1:店铺2：普通团长3：超级团长4:主商城）
					customerphone: "", //客服电话
					collcet: 1, //是否收藏（1：是2：否）
					price: "", //价格
					vipprice: "", //会员价type=5
					point: "", //积分//type=4
					sypoint: "", //剩余积分//type=4
					icon: "", //头像
					virtual: "", //虚拟成团（1：是2：否）
					group_number: "", //拼团人数
					primary: "", //普通团长抽佣
					start_time: "", //开始时间type=1,2,3
					end_time: "", //结束时间type=1,2,3
					sales: '', //销量
					content: "", //详情
					old_price: '', //划线价
					stocks:'', //库存
					commentNumber: 0, //评论数量
					categoryName: "", //分类名字
					images: [], //[]图片
					skuList: []
				},
				dataList: []
			}
		},
		onLoad(options) {
			this.type = options.type;
			this.id = options.id;
			if (this.type == 5) {
				this.getStoreActivity();
			}
			this.getUserBuyType();
		},
		onShow() {
			this.getGoodsDetails();
		},
		methods: {
			getUserBuyType() {
				// 1：自提2：外卖3：邮寄
				if (uni.getStorageSync('open') == 2) {
					this.send_type = 3;
					return
				}
				if (uni.getStorageSync('defaultValue')) {
					uni.getStorageSync('defaultValue') == 0 ? this.send_type = 2 : this.send_type = 1
				}
			},
			phoneOptions() {
				this.$api.callPhone(this.dataobject.customerphone)
			},
			toggleSpec() {
				if(this.type==4){
					return
				}
				if(this.type!=6){
					this.flag = 1;
					this.$refs['oneSKuSwiper'].open();
				}else{
					this.$refs['moreGroupSku'].open();
				}
			},
			choseSku(e) {
				this.currentobj = e;
				this.flag = 1;
			},
			choseGroupNumber(e){
				this.currentGroup = e;
				this.creatGroup = 1;
			},
			changeNum(n) {
				this.qty = n
			},
			//   获取店铺活动
			getStoreActivity() {
				let e = {
					cmd: 'getMerchantReductionList',
					id: this.id,
					type: this.type,
					merchantId: uni.getStorageSync('merchantId')
				}
				this._reqw.post(e).then(res => {
					res.result == 0 ? this.storeActivity = res.body.merchantReductionList : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			userLike(e) {
				this.id = e.id;
				this.type = e.type;
				this.getGoodsDetails();
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 30
				})
			},
			getGoodsDetails() {
				this.$api.loading('加载中...')
				let e = {
					cmd: 'getProductById',
					merchantId: uni.getStorageSync('merchantId'),
					uid: uni.getStorageSync('uid'),
					type: this.type,
					id: this.id
				}
				this._reqw.post(e).then(res => {
					uni.hideLoading();
					res.result == 0 ? (this.dataobject = res.body, this.content = this.$api.formText(res.body.content)) : this.$api.tip(
						res.resultNote)
				}).catch(err => {})
			},
			lookMoreGroup() {
				this.$refs['groupItemInfo'].open();
			},
			//   参团
			userAddpurch(v) {
				if (uni.getStorageSync('uid')) {
					v.group == 1 ? this.$api.tip('已经参加该团!') : (this.groupId = v.id, this.buyGoodsItem(this.type))
				} else {
					// #ifdef MP-WEIXIN
					this.$api.navTo('/pages/index/author');
					// #endif
				}
			},
			morebuttonClick(e){
				if (!uni.getStorageSync('uid')) {
					// #ifdef MP-WEIXIN
					this.$api.navTo('/pages/index/author')
					// #endif
					// #ifdef H5
					this.$api.getCode()
					// #endif
					return
				}
				if(e.index==0){
					this.buyGoodsItem(6)
				}else{
					this.creatGroup == 0?this.$refs['moreGroupSku'].open():this.buyGoodsItem(7)
				}
			},
			itemClick(e) {
				console.log(e)
				// if (this.type == 1 && e.index == 1) {
				// 	return
				// }
				// #ifdef MP-WEIXIN
				e.index == 0 ? this.$api.switchTab('/pages/tabs/cart') : this.$refs.sharePounp.open()
				// #endif
				//  #ifdef H5
				e.index == 0 ?this.$api.switchTab('/pages/tabs/cart') : this.$refs['hchPoster'].open()
				// #endif

			},
			shareClick(ind) {
				console.log(ind)
				ind == 0 ? this.$refs['hchPoster'].open() : '';
			},
			buttonClick(e) {

				console.log(this.type, e)
				if (!uni.getStorageSync('uid')) {
					// #ifdef MP-WEIXIN
					this.$api.navTo('/pages/index/author')
					// #endif
					// #ifdef H5
					this.$api.getCode()
					// #endif
					return
				}
				this.flag == 0 ? this.$refs['oneSKuSwiper'].open() : this.type == 5 ||this.type==2 || this.type==3? (e.index == 0 ? this.addCartItem() : this.buyGoodsItem(
						this.type)) :
					this.type == 1 ? (e.index == 0 ? this.buyGoodsItem(6) : this.buyGoodsItem(this.type)) : this.buyGoodsItem(this.type);
			},
			//  加入购物车
			addCartItem() {
				this.$api.loading('提交中...')
				let e = {
					cmd: 'addCart',
					uid: uni.getStorageSync('uid'),
					merchantId: uni.getStorageSync('merchantId'),
					type: this.send_type,
					skuId: this.currentobj.id,
					count: this.qty
				}
				this._reqw.post(e).then(res => {
					uni.hideLoading();
					this.$api.tip(res.resultNote);
				}).catch(err => {})
			},
			//   收藏
			userStoreItem() {
				if (!uni.getStorageSync('uid')) {
					// #ifdef MP-WEIXIN
					this.$api.navTo('/pages/index/author')
					// #endif
					// #ifdef H5
					this.$api.getCode()
					// #endif
					return
				}
				this.$api.loading('提交中...')
				let text = '',
					type = 0;
				this.dataobject.collcet == 1 ? (text = '取消', type = 2) : (text = '收藏', type = 1);
				let e = {
					cmd: 'collectProduct',
					uid: uni.getStorageSync('uid'),
					id: this.id
				}
				this._reqw.post(e).then(res => {
					uni.hideLoading();
					res.result == 0 ? (this.$api.tip(`${text}成功!`), this.dataobject.collcet = type) : this.$api.tip(
						res.resultNote)
				}).catch(err => {})
			},
			buyGoodsItem(type) {
				if (!uni.getStorageSync('uid')) {
					// #ifdef MP-WEIXIN
					this.$api.navTo('/pages/index/author')
					// #endif
					// #ifdef H5
					this.$api.getCode()
					// #endif
					return
				}
				console.log(this.currentobj)
				let array = [],
					item = {
						product_id: this.id,
						skuid: this.currentobj.id,
						title: this.dataobject.title,
						qty: this.qty,
						stock: this.currentobj.stock,
						name: this.currentobj.title,
						price: type == 6 ||type==4 ? this.dataobject.old_price :type==7?this.currentGroup.price:this.currentobj.price,
						image: this.dataobject.icon,
						setId:this.currentGroup.id||''
					};
				array.push(item);
				if (this.type == 1) {
					this.$api.navTo(
						`/pages/order/creatOrder?goods=${encodeURIComponent(JSON.stringify(array))}&type=${type}&id=${this.groupId}`
					)
				} else {
					this.$api.navTo(`/pages/order/creatOrder?goods=${encodeURIComponent(JSON.stringify(array))}&type=${type}`)
				}
			},
			//  兑换
			downOrUpGoods() {
				if (!uni.getStorageSync('uid')) {
					// #ifdef MP-WEIXIN
					this.$api.navTo('/pages/index/author')
					// #endif
					// #ifdef H5
					this.$api.getCode()
					// #endif
					return
				}
				this.dataobject.sypoint >= this.dataobject.point ? this.$refs.goodsPounp.open() : this.$api.tip('积分不足')
			},
		},
		//#ifdef MP-WEIXIN
		onShareAppMessage() {
			//   拼团商品
			this.$refs.oneSKuSwiper.hide();
			this.$refs.sharePounp.hide();
			return {
				title: this.dataobject.title,
				path: `/pages/sharepage/shareDetails?id=${this.id}&type=${this.type}`
			}
		}
		//#endif
	}
</script>
<style scoped lang="scss">
	.hui-tip {
		font-size: 20upx;
		color: #E54432;
		padding: 0 16upx;
		border: 1upx solid #DEAFAB;
		border-radius: 4upx;
		margin: 0 14upx 14upx 0;
	}

	.item-pople-one {
		background-color: #FFFFFF;
		color: #333333;
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
		color: #FFFFFF;
		border: 2upx solid #FFFFFF;
		box-sizing: border-box;
		border-radius: 0 4upx 4upx 0;
	}

	.uni-flex-tit {
		font-size: 30upx;
		font-weight: 600;
		color: rgba(51, 51, 51, 1);
		margin-right: 20upx;
		width: 230upx;
	}

	.c-list {
		// border-bottom: 2px solid #F6F6F6;
		padding: 20upx;
		align-items: center;
		background-color: #FFFFFF;
		margin-bottom: 16upx;
	}

	.lead-img {
		width: 90upx;
		height: 90upx;
		border-radius: 50%;
		margin-right: 20upx;
	}

	.search-btn-con {
		width: 143upx;
		// line-height: 66upx;
		text-align: center;
		color: #FFFFFF;
		background: linear-gradient(90deg, #FFBB00, #FFA600);
		border-radius: 33upx;
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

	.time-left {
		width: 353upx;
		height: 127upx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: linear-gradient(130deg, #FE753F, #FF2B68);
		color: #FFFFFF;
		font-size: 50upx;
	}

	.time-right {
		height: 127upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: #FEF0E5;
	}

	.store-icon {
		width: 42upx;
		height: 42upx;
	}

	.num-con {
		padding: 40upx 30upx;
		background: #FFFFFF;
		margin-bottom: 16upx;
	}

	.addbtn-cart {
		width: 80upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.updataCon {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 30upx 0;
	}

	.y-bg {
		background: rgba(255, 191, 0, 1);
		box-shadow: 0px 5upx 16upx 0px rgba(255, 191, 0, 0.3);
		color: rgba(255, 255, 255, 1);
	}

	.c-bg {
		background: #c7c7c7;
		color: #333333;
	}

	.updataGoods {
		width: 88%;
		line-height: 88upx;
		border-radius: 44upx;
		text-align: center;
		font-size: 32upx;
		
	}

	.number-con {
		padding: 30upx;
		margin-bottom: 10upx;
		background-color: #FFFFFF;
	}

	.details_page {
		padding-bottom: 120upx;
	}

	.details_con {
		padding: 30upx 20upx;
		background-color: #FFFFFF;

		.details_title {
			font-size: 30upx;
			padding-left: 30upx;
			color: rgba(51, 51, 51, 1);
			position: relative;

			&::before {
				content: '';
				position: absolute;
				width: 6upx;
				height: 24upx;
				background: rgba(254, 197, 28, 1);
				border-radius: 3upx;
				top: 50%;
				left: 0;
				transform: translateY(-50%);
			}
		}
	}

	//   普通商品信息
	.goods_info_con {
		margin-bottom:14upx;
		padding: 20upx;
		background-color: #FFFFFF;

		.goods_title {
			font-size: 32upx;
			font-weight: bold;
			color: rgba(51, 51, 51, 1);
		}

		.goods_salce {
			font-size: 22upx;
			color: rgba(153, 153, 153, 1);
		}

		.good_newPrice {
			color: rgba(252, 69, 58, 1);

			.new_price {
				font-size: 40upx;
				font-weight: bold;
				color: rgba(252, 69, 58, 1);
			}
		}

		.good_oldPrice {
			color: #999999;
			text-decoration: line-through;
			margin-left: 30upx;

			.new_price {
				font-size: 40upx;
				font-weight: bold;
				color: #999999;
			}
		}

		.sku_btn {
			width: 104upx;
			height: 46upx;
			line-height: 46upx;
			text-align: center;
			background: linear-gradient(147deg, rgba(255, 191, 0, 1), rgba(251, 216, 111, 1));
			border-radius: 23upx;
			font-size: 24upx;
		}
	}

	.goods_info_use {
		padding: 20upx;

		.goods_title {
			font-size: 36upx;
			font-weight: bold;
			color: rgba(51, 51, 51, 1);
			position: relative;
			padding-bottom: 5upx;
		}

		.bor_title {
			text-indent: 30upx;
		}

		.bor_title::before {
			content: '';
			position: absolute;
			top: 50%;
			left: 0;
			transform: translateY(-50%);
			width: 8upx;
			height: 32upx;
			background: url(../../static/img/1.png);
			background-size: 100% 100%;
		}

		.user_outMine {
			font-size: 26upx;
			color: rgba(153, 153, 153, 1);
			padding: 10upx 0;
		}
	}

	.details-splace {
		height: 50upx;
		background-color: #000000;
		opacity: .3;
	}
</style>
