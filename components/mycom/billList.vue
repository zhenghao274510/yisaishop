<template>
	<view class="content">
		<view class="bill-item-con" v-for="(v,k) in list" :key="k">
			<view class="bill-item-top uni-flex d-items-center d-between">
				<view class="" v-if="v.szType==0">
					<text class="price-symbol" >+￥</text> <text class="price">{{v.money}}</text>
				</view>
				<view class="" v-else>
					<text class="price-symbol" >-￥</text> <text class="price">{{v.money}}</text>
				</view>
				<view class="bill-item-top-title">
					{{v.title}}
				</view>
				<view class="bill-item-btn" v-if="v.szType==0">
					收入
				</view>
				<view class="bill-item-btn" v-else>
					支出
				</view>
			</view>
			<view class="bill-item-bottom">
				{{v.adtime}}
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		props: {
			list: {
				type: Array,
				default(){
					return []
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.price-symbol{
		font-size:28upx;
		color:rgba(255,65,28,1);
	}
	.price{
		font-size:50upx;
		color:rgba(255,65,28,1);
		font-weight: bold;
	}
	.bill-item-con{
		width:698upx;
		height:213upx;
		background: url('@~static/img/whiteBg.png');
		background-size: 100% 100%;
		border-radius:15upx;
		margin: 10upx auto;
		content-visibility:auto;
	}
	.bill-item-top{
		height: 150upx;
		padding: 0 40upx;
	}
	.bill-item-btn{
		width:128upx;
		line-height:46upx;
		background:rgba(255,65,28,1);
		border-radius:23upx;
		text-align: center;
		color: #FFFFFF;
	}
	.bill-item-bottom{
		line-height:62upx;
		padding: 0 40upx;
		font-size:26upx;
		color:rgba(204,204,204,1)
	}
	.bill-item-top-title{
		font-size:32upx;
		color:rgba(51,51,51,1);
	}
</style>
