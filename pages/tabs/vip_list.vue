<template>
	<view class="">
		<s-pull-scroll ref="pullScroll" :pullDown="pullDown" :pullUp="loadData" :back-top="true">
			<view class="uni-second-list">
				<view class="uni-second" v-for="(v,k) in dataList" :key="k" @tap.stop="stockDetails(v.id)">
					<view class="image-second lazyload lazypic" :class="{loaded: v.loaded}">
						<image class="uni-second-image" :src="v.icon" mode="aspectFill" lazy-load="true" @load="imageOnLoad(v)"></image>
					</view>
					<view class="uni-second-price">
						<view class="uni-second-title">{{v.title}}
						</view>
						<view class="uni-flex d-items-center price-con">
							<text class="price">￥{{v.price |parsePrice}}</text>
							<image src="/static/img/home-huiyuan.png" class="vip-img"></image>
						</view>
						<view class="sku-name">
							<text style="text-decoration: line-through;">￥{{v.old_price | parsePrice}}</text> <text style="margin-left: 20upx;">月销{{v.sales}}</text>
						</view>
						<image src="/static/img/tianjia.png" class="img" @tap.stop="toggleSpec(v)"></image>
			
					</view>
				</view>
			</view>
		</s-pull-scroll>
		<one-sku-swiper :dataobject="skuobject" ref="oneSKuSwiper" @click="choseSku" @change="changeNum" @addcart="addCart"></one-sku-swiper>
	</view>
</template>

<script>
	import sPullScroll from "@/components/s-pull-scroll/index.vue"
	import homeList from '@/components/mycom/homeList.vue'
	import oneSkuSwiper from "@/components/mycom/index-one-sku.vue"
	export default {
		components: {
			homeList,
			sPullScroll,
			oneSkuSwiper
		},
		data() {
			return {
				skuobject:{},
				dataList: [],
				send_type:0,
				qty:1
			}
		},
		onLoad() {
			this.refresh();
			this.getUserBuyType();
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
			stockDetails(id) {
				if(uni.getStorageSync('uid')){
					this.$api.navTo(`/pages/details/goodsDetails?id=${id}&type=5`);
				}else{
					// #ifdef MP-WEIXIN
					this.$api.navTo('/pages/index/author')
					//#endif
					// #ifdef H5
					this.$api.tip('公众号授权')
					//#endif
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
			async loadData(pullScroll) {
				if (pullScroll.page == 1) {
					this.dataList = [];
				}
				let e = {
					cmd: 'getProductList',
					merchantId: uni.getStorageSync('merchantId'),
					uid: uni.getStorageSync('uid'),
					nowPage: pullScroll.page,
					top:1,
					flag: 2
				}
				const curList = [];
				const res =await this._reqw.post(e);
				if (res.result != 0) {
					this.$api.tip(res.resultNote);
					return
				}
				res.body.dataList.length == 0 ?pullScroll.empty(): res.body.dataList.forEach(item => {
						curList.push(item)
					}), this.dataList = this.dataList.concat(curList), pullScroll.page >= res.body.totalPage ? pullScroll.finish() :
					pullScroll.success()
			}
		}
	}
</script>
<style scoped lang="scss">
	.vip-img{
		width:41upx;
		height:25upx;
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
		padding:10upx 0;
	}
	
	.price {
		color: #FD3D00;
		font-weight: Bold;
	}
	
	.sku-name {
		color: $uni-color-paragraph;
		font-size: 22upx;
	}
	.second-title-goods{
		padding:40upx 20upx;
		width: 94%;
		margin: 0 auto;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 20upx 20upx 0 0;
		box-sizing: border-box;
		image {
			width:532upx;
			height:51upx;
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
		image {
			width:239upx;
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
		width:345upx;
		height:334upx;
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
		padding:20upx 10upx;
	}
</style>
