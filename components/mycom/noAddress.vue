<template>
	<view class="xw-empty">
		<view class="xw-empty-con">
			<image src="/static/img/dizhiguanli.png" mode="widthFix"></image>
			<text :style="{color:textColor}">{{ text }}</text>
			<navigator url="/pages/mineoptions/newAddAdress"  class="btn">
				新增地址
			</navigator>
		</view>
		
	</view>
</template>

<script>
	export default {
		name: 'xw-empty',
		props: {
			text: {
				type: String,
				default: '您还没有添加地址哦~'
			},
			textColor: {
				type: String,
				default: '#999999'
			},
		},
		methods: {}
	};
</script>

<style lang="scss">
	.xw-empty {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 400rpx;
		width: 100%;
		align-items: center;
		color: #555555;
		font-size: 24rpx;
		.xw-empty-con{
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			image {
				width: 510rpx;
				height: 394rpx;
				margin-bottom: 50rpx;
			}
		}
		.btn {
			width: 200upx;
			line-height: 57upx;
			border: 2upx solid #007030;
			border-radius: 29upx;
			color: #007030;
			text-align: center;
			margin-top: 50rpx;
		}
	}
</style>
