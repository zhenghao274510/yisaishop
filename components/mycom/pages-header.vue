<template>
	<view class="">
		<view class="pages-header fixed" :class="[type==0||type==3?'bg-header':'bg-color']" :style="{height: statusBarContent + 'px'}">
			  <view class="" :style="{paddingTop: statusBarHeight + 'px'}">
			  	
			  </view>
			  <view class="header_content">
			  	   <view class="header_left_box" @click="back" v-if="type==1">
			  	   	 <image src="/static/img/back.png" class="back-icon" ></image>
			  	   </view>
				   <view class="header_left_box" @click="back" v-if="type==3">
				   	 <image src="/static/img/whiteback.png" class="back-icon" ></image>
				   </view>
				   <view class="header_left_box" @click="back" v-if="type==2">
				   	 <image src="/static/tabs/shouye.png" class="back-home" ></image>
				   </view>
				   <view class="header_title header_title_center" :style="{color:fontColor}" v-if="title!=''">
				   	  {{title}}
				   </view>
			  </view>
		</view>
		<view class="pages-header" :style="{height: statusBarContent + 'px'}" v-if="show">
			
		</view>
	</view>
	
</template>

<script>
	export default{
		props:{
			title:{
				type:String,
				default:''
			},
			fontColor:{
				type:String,
				default:"#FFF"
			},
			type:{
				type:[String,Number],
				default:0
			},
			show:{
				type:Boolean,
				default:true
			}
		},
		data(){
			return{
				statusBarHeight:0,
				statusBarContent:0
			}
		},
		//第一次加载
		created() {
			//获取手机状态栏高度
			this.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight'];
			this.statusBarContent = uni.getSystemInfoSync()['statusBarHeight']+54;
		},
		methods:{
			back(){
			this.type==1||this.type==3?this.$api.back():this.$api.reLaunch('/pages/public/noNearShop')
			}
		}
	}
</script>

<style scoped lang="scss">
	.bg-header{
		background: #006F2F;
	}
	.bg-color{
		background-color: #FFF;
	}
	.back-home{
		width: 44upx;
		height:44upx;
		z-index: 9999;
	}
	.back-icon{
		width: 31upx;
		height: 26upx;
		z-index: 9999;
		
	}
	.fixed{
		position: fixed;
		z-index: 9999;
	}
	.pages-header{
		width:750rpx;
		height: calc(100upx + var(--status-bar-height));
	}
	.header_content {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		/* #ifdef MP */
		padding-right: 190rpx;
		box-sizing: border-box;
		/* #endif */
		width: 750rpx;
		align-items: flex-end;
		justify-content: space-between;
		flex-direction: row;
		height:88rpx;
		position: relative;
	}
	.header_left_box {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		height: 88rpx;
		flex: 1;
		margin-left:20rpx;
		
	}
	.header_title {
		height: 88rpx;
		font-size: 32rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;
		font-weight: 700;
		text-overflow: ellipsis;
		/* #ifndef APP-PLUS-NVUE */
		white-space: nowrap;
		display: flex;
		overflow: hidden;
		/* #endif */
		/* #ifdef APP-PLUS-NVUE */
		lines: 1;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		/* #ifdef MP */
		max-width: calc(100vw - 160rpx);
		/* #endif */
	}
	.header_title_center {
		position: absolute;
		bottom: 0rpx;
		left: 375rpx;
		transform: translateX(-50%);
	}
</style>
