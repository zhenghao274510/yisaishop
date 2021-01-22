<template>
	<view class="uni-goods-nav">
		<!-- 底部占位 -->
		<view class="uni-tab__seat" />
		<view class="uni-tab__cart-box flex">
			<view class="flex uni-tab__cart-sub-box">
				<view v-for="(item,index) in options" :key="index" class="flex uni-tab__cart-button-left" @click="onClick(index,item)">
					<view class="uni-tab__icon">
						<image class="image" :src="item.icon" mode="widthFix" />
					</view>
					<text class="uni-tab__text">{{ item.text }}</text>
				</view>
			</view>
			<view  class="uni-flex d-items-center d-between" style="padding: 20upx;">
				   <view class="uni-nav-one" v-for="(v,k) in buttonGroup" :key="k" :class="[k==0?'one':'two']" @click="buttonClick(k,v)">
				   	  {{v.text}}
				   </view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'UniGoodsNav',
		data(){
			return{
				options:[{
							icon: '/static/img/gouwuche.png',
							text: '购物车'
						},
						{
							icon: '/static/img/fenxiang.png',
							text: '分享'
						}
					],
					buttonGroup:[{
							text: '加入购物车',
							color: '#fff'
						},
						{
							text: '立即购买',
							color: '#fff'
						}
					]
					
			}
		},
		props: {
			collect: {
				type: [String, Number],
				default: 0
			},
			fill: {
				type: Boolean,
				default: false
			}
		},
		watch: {
			collect(n) {
               n==1?this.options[1].icon='/static/img/yishoucang.png':this.options[1].icon='/static/img/shoucang.png';
			}
		},
		methods: {
			onClick(index, item) {
				console.log(this.collect)
				this.$emit('click', {
					index,
					content: item
				})
			},
			buttonClick(index, item) {
				if (uni.report) {
					uni.report(item.text, item.text)
				}
				this.$emit('buttonClick', {
					index,
					content: item
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.uni-flex {
		flex: 1;
	}

	.one {
		background: #FB9C1C;
	}

	.two {
		background: #F55555;
	}

	.flex {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	.uni-goods-nav {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex: 1;
		flex-direction: row;
		position: fixed;
		bottom: 0;
		width: 100%;
		box-shadow: 0 0 20upx 0 rgba(0, 0, 0, 0.5);
		z-index: 99;
	}

	.uni-tab__cart-box {
		flex: 1;
		height: 100rpx;
		background-color: #fff;
		z-index: 900;
	}

	.uni-tab__cart-sub-box {
		width:30%;
	}

	.uni-tab__right {
		overflow: hidden;
	}

	.uni-tab__cart-button-left {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex: 1;
		position: relative;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		position: relative;
	}

	.uni-tab__icon {
		width: 36upx;
		height: 36upx;
	}

	.image {
		width: 36upx;
		height: 36upx;
	}

	.uni-tab__text {
		margin-top: 3px;
		font-size: $uni-font-size-sm;
		color: #666;
	}

	.uni-tab__cart-button-right {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		flex: 1;
		justify-content: center;
		align-items: center;
	}

	.uni-tab__cart-button-right-text {
		font-size: $uni-font-size-base;
		color: #fff;
		width: 221upx;
		line-height: 100upx;
		border-radius: 38upx;
	}

	.uni-tab__cart-button-right:active {
		opacity: 0.7;
	}

	.uni-tab__dot-box {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		position: absolute;
		right: 12px;
		top: 4px;
		justify-content: center;
		align-items: center;
	}

	.uni-tab__dot {
		padding: 0 4px;
		line-height: 15px;
		color: #ffffff;
		text-align: center;
		font-size: 12px;
		background-color: #ff0000;
		border-radius: 15px;
	}
	.uni-tab__dots {
		padding: 0 4px;
		border-radius: 15px;
	}
	.uni-nav-one{
		width:220upx;
		line-height:68upx;
		text-align: center;
		border-radius: 38upx;
		color: #FFFFFF;
	}
</style>
