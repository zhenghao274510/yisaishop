<template>
	<view class="swiper-content">
		<view class="search-wrapper">
			<view class="swiper-wrapper">
				<swiper class="swiper" circular="true" autoplay="true" indicator-dots="true" duration="500" indicator-active-color="#FFBF01"
				 indicator-color="#FFEAAD">
					<swiper-item class="swiper-item" v-for="(item,index) of list" :key="index" @tap="gotoDetails(item)">
						<img :src="item.image" />
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default () {
					return []
				}
			},
			type: {
				type: [Number, String],
				default: 0
			}
		},
		data() {
			return {}
		},
		methods: {
			gotoDetails(v) {
				console.log(this.type)
				if (this.type == 6) {
					if (v.type ==2) {
						v.cun1 == 1 ? this.$api.navTo(`/pages/details/goodsDetails?id=${v.point_product_id}&type=4`) : this.$api.tip(
							'该商品已下架！')
					} else {
						v.cun2 == 1 ? this.$emit('click', v.coupon_id) : this.$api.tip('该优惠券不存在！')
					}
				} else {
					if (v.type == 1) {
						this.$api.navTo(`/pages/details/goodsDetails?id=${v.merchant_product_id}&type=5`)
					} else {
						this.$api.navTo(`/pages/mineoptions/mywebView?content=${encodeURIComponent(v.content)}`)

					}
				}

			},
			userGetCompline() {

			}
		}
	}
</script>

<style scoped>
	.swiper-content {
		position: relative;
	}

	.uni-icon-location-filled {
		color: #FFFFFF;
		font-size: 28upx;
	}

	.img {
		width: 50upx;
		height: 50upx;
	}

	.swiper {
		width: 100%;
		height: 300upx;
	}

	.swiper-item {
		width: 100%;
		display: block;
	}

	.swiper-item img {
		width: 96%;
		margin: 0 auto;
		display: block;
		height: 300upx;
	}
</style>
