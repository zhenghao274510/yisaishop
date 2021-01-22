<template>
	<!-- 规格-模态层弹窗 -->
	<view class="popup spec" v-if="pickerShow"  @click.stop="close">
		<!-- 遮罩层 -->
		<view class="mask"></view>
		<scroll-view scroll-y="true" class="attr-content layer animated"  :class="animate" @click.stop>
			<view class="sku-content">
				<view class="a-t">
					<image :src="dataobject.icon" class="img"></image>
					<view class="right">
						<text class="guge-price">
							<text style="font-size:24upx;color: #ff0000;">￥</text>
							<text style="font-size: 30upx;color: #ff0000;">{{ currentObj.price | parsePrice}}</text>
						</text>
						<text class="stock" style="color: #999999;">库存：{{ currentObj.stock }}</text>
						<view class="selected">
							已选：
							<text class="selected-text">{{ currentObj.title }}</text>
						</view>
					</view>
					<view class="uni-icon uni-icon-close" style="color: #999999;" @click.stop="close"></view>
				</view>
				<view class="attr-list">
					<view class="item-list">
						<text v-for="(v, k) in dataobject.skuList" :key="k" class="tit" :class="{selected:active==k}" @click.stop="choseSku(v,k)">
							{{ v.title }}</text>
					</view>
				</view>
				<view class="choseNum uni-flex d-items-center d-between">
					<view style="margin-bottom: 10upx;">数量</view>
					<uni-number-box class="step" :min="1" @change="numberChange" :max='[dataobject.number?dataobject.number:currentObj.stock]' :value="num"></uni-number-box>
				</view>
			</view>

		</scroll-view>
	</view>
</template>

<script>
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	export default {
		components: {
			uniNumberBox
		},
		props: {
			dataobject: {
				type: Object,
				default: {
					icon: '',
					skuList: []
				}
			}
		},
		data() {
			return {
				pickerShow: false,
				animate:'',
				active: 0,
				num: 1,
				currentObj: {
					id: "", //id
					title: '', //规格名字
					price: '', //价格
					stock: '' //库存
				}
			}
		},
		watch: {
			dataobject: {
				handler(n) {
					this.currentObj = n.skuList[0];
					this.$emit('click',this.currentObj)
				},
				deep: true
			}
		},
		methods: {
			open() {
				this.animate = 'slideInUp';
				this.pickerShow = true;
				this.$parent.flag=1;
			},
			close() {
				this.animate = 'slideOutDown';
				this.$parent.flag=0;
				setTimeout(() => {
					this.pickerShow = false;
					this.animate = '';
				}, 500)
			},
			hide(){
				this.pickerShow = false;
				this.animate = '';
			},
			choseSku(e, k) {
				this.active = k;
				this.currentObj = e;
				this.$emit('click',this.currentObj)
			},
			numberChange(e) {
				this.num = e.number;
				this.$emit('change',this.num)
			}
		}
	}
</script>

<style scoped lang="scss">
	/* 规格选择弹窗 */
	/* 规格选择弹窗 */
	.choseNum {
		padding: 20upx;
	}

	.attr-content {
		z-index: 999;
		padding: 10upx 0;
		background-color: #FFFFFF;
		width: 100%;
		box-sizing: border-box;

		.a-t {
			display: flex;
			justify-content: space-between;
			padding: 0 30upx;
			position: relative;
			// z-index: 999 !important;
			padding-top: 40upx;
			// background: #FFFFFF;

			.img {
				width: 200upx;
				height: 200upx;
				// flex-shrink: 0;
				border-radius: 8upx;

			}

			.right {
				display: flex;
				flex: 1;
				flex-direction: column;
				justify-content: space-around;
				padding-left: 30upx;

				.price {
					margin-bottom: 10upx;
				}

				.selected-text {
					margin-right: 10upx;
				}
			}
		}

		.attr-list {
			display: flex;
			flex-direction: column;
			margin-top: 50upx;
		}

		.item-list {
			padding: 0 30upx;
			display: flex;
			flex-wrap: wrap;

			text {
				display: flex;
				align-items: center;
				justify-content: center;
				box-sizing: border-box;
				margin-right: 20upx;
				margin-bottom: 20upx;
				border-radius: 50upx;
				width:210upx;
				height: 60upx;
				padding: 0 20upx;
				border: 1upx solid #cccccc;
				font-size: 24upx;
			}

			.selected {
				border: none;
				color: #007030;
				background: #E9FFF2;
				border: 1upx solid #007030;
			}
		}
	}

	/*  弹出层 */
	.popup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 100upx;
		z-index: 99;

		.mask {
			position: fixed;
			top: 0;
			width: 100%;
			height: calc(100% - 100upx);
			z-index: 1;
			background-color: rgba(0, 0, 0, 0.8);
		}

		.layer {
			position: fixed;
			z-index: 99;
			bottom: 100upx;
			min-height: 40vh;
			background-color: #fff;
			border-radius: 20upx 20upx 0px 0px;
		}
	}

	/* 底部操作菜单 */
	.page-bottom {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 95;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100upx;
		background: rgba(255, 255, 255, 0.9);
		box-shadow: 0 0 20upx 0 rgba(0, 0, 0, 0.5);

		.p-b-btn {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 96upx;
			height: 80upx;
		}

		.action-btn-group {
			display: flex;
			height: 76upx;
			border-radius: 100px;
			overflow: hidden;
			box-shadow: 0 20upx 40upx -16upx #fa436a;
			box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
			background: linear-gradient(to right, #ffac30, #fa436a, #f56c6c);
			margin-left: 20upx;
			position: relative;

			&:after {
				content: '';
				position: absolute;
				top: 50%;
				right: 50%;
				transform: translateY(-50%);
				height: 28upx;
				width: 0;
				border-right: 1px solid rgba(255, 255, 255, 0.5);
			}

			.action-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 28upx;
				width: 180upx;
				height: 100%;
				padding: 0;
				border-radius: 0;
				background: transparent;
			}
		}
	}
</style>
