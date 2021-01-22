<template>
	<view class="carousel">
		<swiper circular="true" duration="400" autoplay="true" interval="3000" @change="changSwiper">
			<swiper-item class="swiper-item" v-for="(v, k) in dataList" :key="k">
				<view class="image-wrapper">
					<image :src="v" class="loaded" mode="aspectFill"></image>
				</view>
			</swiper-item>
		</swiper>
		<view class="swiper-num">
			{{swiperActive}}/{{imageLength}}
		</view>
		<view class="img-con" v-if="type==0">
			<image src="/static/img/share.png" class="share-img"></image>
			<button type="default" open-type="share" class="btn-con"></button>
		</view>
		
	</view>
</template>

<script>
	export default{
		props:{
			dataList:{
				type:Array,
				default(){
					return []
				}
			},
			type:{
				type:[Number,String]
			}
		},
		data(){
			return{
				swiperActive:1
			}
		},
		computed:{
			imageLength(){
				if(this.dataList.length!=0){
					return this.dataList.length
				}else{
					return 1
				}
			}
		},
		methods:{
			changSwiper(e){
				this.swiperActive=e.detail.current+1;
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.img-con{
		position: absolute;
		top:40upx;
		right: 40upx;
		width: 50upx;
		height: 50upx;
		display: flex;
		justify-content: center;
		align-items: center;
		
	}
	.btn-con{
		position: absolute;
		top:0;
		right: 0;
		width: 50upx;
		height: 50upx;
		opacity: 0;
		z-index: 9999;
	}
	.share-img{
		width: 42upx;
		height: 42upx;
		z-index: 999;
	}
	.carousel {
		height: 722upx;
		position: relative;
	
		swiper {
			height: 100%;
		}
	
		.image-wrapper {
			width: 100%;
			height: 100%;
		}
	
		.swiper-item {
			display: flex;
			justify-content: center;
			align-content: center;
			height: 750upx;
			overflow: hidden;
	
			.loaded{
				width: 100%;
				height: 100%;
			}
		}
		.swiper-num {
			position: absolute;
			right: 30upx;
			bottom: 30upx;
			background: #999999;
			border-radius: 23upx;
			color: #FFFFFF;
			padding: 0 14upx;
		}
		
	}
</style>
