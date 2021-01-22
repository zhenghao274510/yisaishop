<template>
	<view class="cart-content">



		<!-- #ifdef MP-WEIXIN -->
		<!-- <nav-bar type="0" title='伊赛商城'></nav-bar> -->
		<view class="indexBg" :style="{'height':height+'px'}">

		</view>
		<view class="public-con" :style="{'paddingTop':top+'px'}">
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<view class="indexBg" style="z-index: 0;">

			</view>
			<view class="public-con">
				<!-- #endif -->
				<view class="uni-flex d-items-center" style="padding: 0 20rpx;width: 100%;box-sizing: border-box;">
					<uni-search-bar placeholder="精品牛肉" radius="30" type='4' style="width:94%;" bgColor="#299055"></uni-search-bar>
					<image src="/static/img/wuxiaoxi.png" class="image-icon-home"></image>
				</view>
				<view class="city-con">
					<view class="uni-flex d-items-center">
						<image src="/static/img/shouyedizhi.png" class="img-icon-home"></image>
						<view class="">
							<view class="" style="color:#666666;">
								{{open==1?"定位中....":"未开通"}}
							</view>
						</view>

					</view>
					<s-switch :defaultValue="0" type="0"></s-switch>
				</view>
			</view>
			<no-shop :isShow="open"></no-shop>
		</view>
</template>

<script>
	import sSwitch from "@/components/s-switch/s-switch.vue"
	import noShop from "@/components/noshop/no-shop.vue"
	export default {
		components: {
			sSwitch,
			noShop
		},
		data() {
			return {
				height: 0,
				point: {},
				open: '1',
				top: uni.getSystemInfoSync()['statusBarHeight'] + 54,
				height: uni.getSystemInfoSync()['statusBarHeight'] + 130
			}
		},
		onLoad(options) {
			if (options.scene) {
				getApp().globalData.merchantId = decodeURIComponent(options.scene)
			}
			this.getPosition();
			uni.setStorageSync('defaultValue', '0');
			// uni.setStorageSync('uid', '9e40f33cdf3a49089cd7d1e12bef79ed');
		},
		methods: {
			async getPosition() {
                this.point= await this.getUserLocation();
				if(this.point){
					this.loadData();
				}else{
					this.open ='2';
				}
			},
			loadData() {
				let parmas = {
					cmd: 'getOpenStatus',
					city: this.city,
					lon: this.point.longitude,
					lat: this.point.latitude
				}
				this._reqw.post(parmas).then(res => {
					console.log(res)
					res.result == 0 ? (this.open = res.body.open, uni.setStorageSync('open', res.body.open),
							uni.setStorageSync('merchantId', res.body.merchantId), res.body.open ==
							1 ? this.$api.reLaunch('/pages/tabs/index'):'') :
						this.$api.tip(res.resultNote)
				}).catch(err => {})
			}
		}

	}
</script>

<style lang="scss" scoped>
	.cart-icon {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.cart-content {
		display: flex;
		flex-direction: column;
	}
</style>
