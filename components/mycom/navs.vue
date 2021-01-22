<template>
	<div class="all">
		<div class="contains">
			<block v-for="(item,index) in list" :key="index">
			<div class="nav-item"  @tap="classify(item,index)" v-if="index<8">
				<image :src="item.icon" />
				<span>{{item.title || item.name}}</span>
			</div>
			</block>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array
			},
		},
		methods: {
			classify(v, k) {
				if(uni.getStorageSync('uid')){
					getApp().globalData.leftCid=v.id;
					this.$emit('click')
				}else{
					// #ifdef MP-WEIXIN
					this.$api.navTo('/pages/index/author');
					// #endif
					// #ifdef H5
					this.$api.getCode()
					// #endif
				}
			}
		}
	};
</script>

<style scoped lang="scss">
	.all {
		width: 100%;
		position: relative;
		// background: #FFFFFF;
		padding-top: 20upx;

		.contains {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			position: relative;

			.nav-item {
				width: 25%;
				margin-top: 20upx;
				margin-bottom: 20upx;
				display: flex;
				align-items: center;
				flex-direction: column;
				justify-content: center;

				image {
					width: 90upx;
					height: 90upx;
					border-radius: 50%;
				}

				span {
					font-size: 22upx;
					color: #333333;
					margin-top: 14upx;
					width: 100%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					text-align: center;
				}
			}
		}
	}
</style>
