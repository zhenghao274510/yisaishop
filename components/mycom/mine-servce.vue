<template>
	<view class="order-con">
		<view class="orders">
			<view class="box">
				<view class="label"  hover-class="btn-hover" @tap="toOrderType(0)" v-if="flag==1">
					<view class="uni-flex d-items-center">
						<view class="icon">
							<image src="/static/img/shangjiazhongxin.png"></image>
						</view>
						<view class="icon-title">
							商家中心
						</view>
					</view>
					<view class="uni-flex d-items-center">
						<view class="uni-icon uni-icon-arrowright">
						</view>
					</view>
					
				</view>
			<!-- 	<view class="label"  hover-class="btn-hover" @tap="toOrderType(1)" v-if="flag==2||flag==0||flag==3">
					<view class="uni-flex d-items-center">
						<view class="icon">
							<image src="/static/img/tuanzhangzhongxin.png"></image>
						</view>
						<view class="icon-title">
							团长中心
						</view>
					</view>
					<view class="uni-flex d-items-center">
						<view class="uni-icon uni-icon-arrowright">
						</view>
					</view>
					
				</view> -->
				<view class="label" v-for="(v,k) in orderTypeList" :key="k" hover-class="btn-hover" @tap="toOrderType(k+2)">
					<view class="uni-flex d-items-center">
						<view class="icon">
							<image :src="v.img"></image>
						</view>
						<view class="icon-title">
							{{v.name}}
						</view>
					</view>
					<view class="uni-flex d-items-center">
						<view class="uni-icon uni-icon-arrowright">
						</view>
					</view>
					
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		props:{
			flag:{
				type:[Number,String],
				default:0
			}
		},
		data() {
			return {
				orderTypeList: [
					{
						img: '/static/img/wdedingdan.png',
						name: '我的订单'
					},
					{
						img: '/static/img/pingjia.png',
						name: '我的评价'
					},
					{
						img: '/static/img/shouchang.png',
						name: '我的收藏'
					},
					{
						img: '/static/img/dizhiguanli1.png',
						name: '地址管理'
					},
					{
						img: '/static/img/xiaooxi.png',
						name: '消息管理'
					},
					{
						img: '/static/img/kefu.png',
						name: '客服中心'
					},
					{
						img: '/static/img/guanyuwomen.png',
						name: '关于我们'
					}
				]
			}
		},
		methods: {
			toOrderType(ind) {
				this.$emit('click', ind)
			}
		}
	}
</script>

<style scoped lang="scss">
	.dou-num{
		font-size:30upx !important;
		color:rgba(255,205,0,1) !important;
	}
	.uni-icon-arrowright {
		color: #999999;
		font-size: 28upx;
		margin-left: 20upx;
	}

	.order-con {
		border-radius: 20upx;
		.orders {
			.box {
				width: 100%;

				.label {
					display: flex;
					align-items: center;
					justify-content: space-between;
					color: #333333;
					font-size: 24upx;
					padding: 30upx;
					border-bottom: 1px solid #F2F2F2;

					.icon {
						position: relative;
						width: 42upx;
						height: 42upx;
						margin-right: 30upx;

						image {
							width: 100%;
							height: 100%;
							z-index: 9;
						}
					}

					.icon-title {
						color:#000000;
						font-size: 26upx;
					}
				}
			}
		}

	}
</style>
