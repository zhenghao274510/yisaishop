<template>
	<view class="order-con">
		<view class="orders">
			<view class="box">
				<view class="label" v-for="(v,k) in orderTypeList" :key="k" hover-class="hover" @tap="toOrderType(k)">
					<view class="icon">
						<image :src="v.img"></image>
					</view>
					<view class="icon-title">
						{{v.name}}
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				orderTypeList: [{
						img: '/static/img/huiyuanma.png',
						name: '会员码'
					},
					{
						img: '/static/img/xiaoyouhui.png',
						name: '优惠券'
					},
					{
						img: '/static/img/qianbao.png',
						name: '钱包充值'
					},
					{
						img: '/static/img/jifenshangcheng.png',
						name: '积分商城'
					},
					{
						img: '/static/img/qiandao.png',
						name: '签到有礼'
					},
					{
						img: '/static/img/yaoqingyouli.png',
						name: '邀请有礼'
					},
					{
						img: '/static/img/goujuan.png',
						name: '特惠购劵'
					}
				]
			}
		},
		methods: {
            toOrderType(ind){
				this.$emit('click',ind)
			}
		}
	}
</script>

<style scoped lang="scss">
	.order-con {
		margin-top: 20px;

		.orders-title {
			line-height: 40px;
			padding: 0 20px;
			z-index: 999;
			border-bottom: 1px solid #F7F9FA;
			position: relative;
			overflow: hidden;
		}

		.order-more {
			float: right;
			color: #666666;
			font-size: 24upx;
		}

		.bg-title {
			position: absolute;
			top: 50%;
			left: 45upx;
			width: 108upx;
			height: 15upx;
			transform: translateY(-50%);
			background-color: #D1FFC6;
			z-index: -1;
		}

		.orders {
			display: flex;
			align-items: flex-start;

			.box {
				width: 100%;
				display: flex;
				align-items: center;
				flex-wrap: wrap;

				.label {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					width:25%;
					color: #333333;
					font-size: 24upx;
					margin: 30upx 0 10upx 0;
					position: relative;
					.point{
						position: absolute;
						top: 0;
						right:20upx;
						width: 26upx;
						height: 26upx;
						background-color: red;
						color: #FFFFFF;
						font-size: 22upx;
						text-align: center;
						line-height: 26upx;
						border-radius: 50%;
					}

					.icon {
						position: relative;
						margin-bottom: 10upx;
						width: 70upx;
						height: 70upx;

						image {
							width: 100%;
							height: 100%;
							z-index: 9;
						}
					}

					.icon-title {
						color:#666666;
						font-size: 24upx;
						font-weight: 600;
					}
				}
			}
		}

	}
</style>
