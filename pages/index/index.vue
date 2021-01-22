<template>
	<view>
		<tabs-index v-if="show_tab_index==0"   ref='tabsIndex'></tabs-index>
		<tabs-class v-if="show_tab_index==1" :height='height'  ref='tabsClass'></tabs-class>
		<tabs-cart v-if="show_tab_index==2" ref='tabsCart'></tabs-cart>
		<tabs-mine v-if="show_tab_index==3" :height='height' ref='tabsMine'></tabs-mine>
		<view class="weui-tabbar">
			<!-- 选中的时候往weui-tabbar__item加class:weui-bar__item_on -->
			<view @click="tabChange(index)" v-for="(item, index) in list" :key="index" 
			class="weui-tabbar__item" :class="{'weui-bar__item_on':index === show_tab_index}">
				<view style="position: relative;display:inline-block;">
					<image :src="show_tab_index ==index ? item.selectedIconPath : item.iconPath" class="weui-tabbar__icon"></image>
				</view>
				<view class="weui-tabbar__label">{{ item.text }}</view>
				<view class="num-tip" v-if="index==2">
					{{num}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tabsIndex from "../tabs/index.vue"
	import tabsClass from "../tabs/class.vue"
	import tabsCart from "../tabs/cart.vue"
	import tabsMine from "../tabs/mine.vue"
	export default {
		components: {
			tabsIndex,
			tabsClass,
			tabsCart,
			tabsMine
		},
		data() {
			return {
				show_tab_index:0,
				empty: true,
				height: 0,
				list: [{
						iconPath: '/static/tabs/shouye.png',
						selectedIconPath: '/static/tabs/shouye(xuanzhong).png',
						text: '首页'
					},
					{
						iconPath: '/static/tabs/fenlei.png',
						selectedIconPath: '/static/tabs/fenlei(xuanzhong).png',
						text: '分类'
					},
					{
						iconPath: '/static/tabs/gouwuche.png',
						selectedIconPath: '/static/tabs/gouwuche(xuanzhong).png',
						text: '购物车'
					},
					{
						iconPath: '/static/tabs/wode.png',
						selectedIconPath: '/static/tabs/wode(xuanzhong).png',
						text: '我的'
					}
				]

			}
		},
		onLoad(options) {
			this.show_tab_index =getApp().globalData.tabIndex;
		},
		onShow() {
			this.getCartNum();
			this.tabPage();
		},
		watch: {
			show_tab_index(n) {
				//#ifdef MP-WEIXIN
				 n == 1 ? this.height = uni.getSystemInfoSync()[
					'statusBarHeight'] + 100 : n == 3 ? this.height = uni.getSystemInfoSync()['statusBarHeight'] + 165 : ''
				// #endif
			}
		},
		methods: {
			tabPage(){
				let n=this.show_tab_index;
				this.$nextTick(() => {
					n == 0 ? this.$refs.tabsIndex.refresh() : n == 1 ? this.$refs.tabsClass.refresh() : n == 2 ? this.$refs.tabsCart
						.refresh() : this.$refs.tabsMine.refresh()
				})
			},
			tabChange(ind) {
				if(this.show_tab_index == ind){
					return
				}
				this.show_tab_index = ind;
				// getApp().globalData.tabIndex=ind;
				this.tabPage();
				uni.pageScrollTo({
					scrollTop:0,
					duration:300
				})
			},
		}
	}
</script>

<style scoped>
	.num-tip{
		position: absolute;
		top:10upx;
		right:30upx;
		width: 30upx;
		height: 30upx;
		border-radius: 50%;
		background: #c60000;
		color: #FFFFFF;
		line-height: 30upx;
		text-align: center;
		font-size: 26upx;
	}
	.weui-tabbar {
		display: flex;
		z-index: 500;
		background-color: #ffffff;
		position: fixed;
		bottom: 0;
		width: 100%;
		left: 0;
		right: 0;
		z-index: 999;
	}

	.weui-tabbar:before {
		content: ' ';
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		height: 1px;
		border-top: 1rpx solid rgba(0, 0, 0, 0.1);
		color: rgba(0, 0, 0, 0.1);
	}

	.weui-tabbar__item {
		display: block;
		flex: 1;
		padding: 8upx 0 8upx;
		padding-bottom: calc(16upx + constant(safe-area-inset-bottom));
		padding-bottom: calc(16upx + env(safe-area-inset-bottom));
		font-size: 0;
		color: rgba(0, 0, 0, 0.5);
		text-align: center;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		position: relative;
	}

	.weui-tabbar__item:first-child {
		padding-left: constant(safe-area-inset-left);
		padding-left: env(safe-area-inset-left);
	}

	.weui-tabbar__item:last-child {
		padding-right: constant(safe-area-inset-right);
		padding-right: env(safe-area-inset-right);
	}

	.weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon,
	.weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon>i,
	.weui-tabbar__item.weui-bar__item_on .weui-tabbar__label {
		color: #000000;
	}

	.weui-tabbar__icon {
		display: inline-block;
		width: 44upx;
		height: 44upx;
		margin-bottom:4upx;
	}

	i.weui-tabbar__icon,
	.weui-tabbar__icon>i {
		font-size: 24px;
		color: rgba(0, 0, 0, 0.8);
	}

	.weui-tabbar__icon image {
		width: 100%;
		height: 100%;
	}

	.weui-tabbar__label {
		color: #a6a6a6;
		font-size:20upx;
		line-height: 1.4;
	}
</style>
