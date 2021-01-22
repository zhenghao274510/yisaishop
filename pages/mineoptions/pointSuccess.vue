<template>
	<view class="content">
		<image src="/static/img/duihuanchenggong.png" class="icon"></image>
		<view class="tips-con" v-if="type=='resgin'">
			<view class="tips-top">
				恭喜您提交成功
			</view>
			<view class="tips-bottom">
				请耐心等待管理员审核，审核通过后将展示在平台
			</view>
		</view>
		<view class="list-con" v-if="type=='pay'">
			<!-- <view class="uni-list-cell d-border-bottom">
				<text class="cell-tip">充值金豆</text>
				<text class="cell-tit">{{money}}</text>
			</view> -->
			<!-- <view class="uni-list-cell d-border-bottom">
				<text class="cell-tip">小计</text>
				<text class="cell-tit">{{money}}</text>
			</view> -->
			<view class="uni-list-cell">
				<text class="cell-tip">支付方式</text>
				<text class="cell-tit">积分兑换</text>
			</view>
		</view>
		<view class="point-con" v-if="type=='pay'">
			 <text style="font-size: 60upx;font-weight: bold;color: #FF0000;">9</text> <text style="font-size:40upx;color: #FF0000;">积分</text> 
		</view>

		<view class="pay-btn" @click="getOrderId" v-if="type=='resgin'">
			完成
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				money:0,
				type:'pay'
			};
		},
		onLoad(options) {
			// this.type=options.type;
			this.type=='pay'?(this.$api.setNav('充值成功'),this.money=getApp().globalData.money*10):this.$api.setNav('入驻成功');
		},
		methods: {
			toOrder() {
				this.$api.prePage().money = this.$api.prePage().money - this.money;
				this.$api.back();
			},
			getOrderId(){
				this.type=='pay'?(this.$api.prePage().num=this.$api.prePage().num*1+this.money*1,this.$api.back()):this.$api.swithTab('/pages/index/index');
			}
		}
	}
</script>
<style>
	page{
		background-color: #FFFFFF;
	}
</style>

<style lang="scss" scoped>
	.point-con{
		padding: 30upx 0;
	}
	.tips-con{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.tips-top{
		font-size:32upx;
		color:rgba(51,51,51,1);
	}
	.tips-bottom{
		font-size:26upx;
		color:rgba(102,102,102,1);
		margin-top:40upx;
	}
	.cell-tit {
		color: #666666;
		font-size: 24upx;
	}

	.list-con {
		width: 100%;
	}

	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		box-sizing: border-box;
	}

	.cell-tip {
		color: #333;
		font-size: 26upx;
	}
	.uni-list-cell {
		padding:30upx;
		width: 100%;
		box-sizing: border-box;
		justify-content: space-between;
	}

	.icon {
		width: 350upx;
		height: 286upx;
		margin: 100upx 0;
	}

	.pay-amount {
		width: 100%;
		margin-top: 10upx;
		font-size: 32upx;
	}

	.pay-btn {
		width:696upx;
		margin:100upx auto;
		line-height: 88upx;
		background: linear-gradient(-90deg, rgba(31, 170, 255, 1), rgba(0, 158, 254, 1));
		border-radius: 44upx;
		text-align: center;
		color: #FFFFFF;
	}
</style>
