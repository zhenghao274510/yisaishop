<template>
	<view class="img_con">
		<view class="top_ad_second" :style="{'top':navBarTop+'px'}" @click.stop="userOptions(1)">
			{{rTime}}s
		</view>
		<image :src="image" class="open_image" @tap.stop='userOptions(0)'></image>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				rTime:6,
				interval:null,
				image:'',
				navBarTop:uni.getSystemInfoSync()['statusBarHeight'] + 54,
			}
		},
		onLoad() {
		 this.getadDataInfo();	
		},
		methods:{
			async getadDataInfo(){
				const res=await this._reqw.post({cmd:'getOpenCoupon'});
				console.log(res)
				this.image=res.body.openImage;
				this.getTimeOut();
				uni.setStorageSync('openCoupon',res.body);
			},
			userOptions(type){
				clearInterval(this.interval);
				if(type==1){
					this.$api.redirectTo('/pages/public/noNearShop');
				}else{
					this.$api.redirectTo('/pages/public/adCompline');
				}
				
			},
			getTimeOut(){
				this.rTime = 6;
				this.interval = setInterval(() => {
					--this.rTime <= 0 ? this.userOptions(1) : ''
				}, 1000)
			}
		}
	}
</script>
<style>
	page{
		height: 100%;
		width: 100%;
	}
</style>

<style scoped>
	.top_ad_second{
		position: fixed;
		right: 60rpx;
		width: 120rpx;
		line-height: 60rpx;
		text-align: center;
		background: rgba(0,0,0,.7);
		border-radius: 40rpx;
		color: #FFFFFF;
		font-size: 26rpx;
		z-index: 999;
	}
	.img_con{
		width: 100%;
		height: 100%;
	}
	.open_image{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>
