<template>
	<view class="">
		<s-pull-scroll ref="pullScroll" :pullDown="pullDown" :pullUp="loadData" :back-top="true">
			<view class="wu-con">
				<view class="wu-item">
					<view class="wu-info cell-tit">
						 物流单号:{{expNo}}
					</view>
					<view class="wu-info cell-tit">
						物流公司:{{companyName}}
					</view>
				</view>
				<view class="wu-item" v-for="(v,k) in dataList" :key="k">
					<view class="wu-time cell-tip">
						{{v.AcceptStation}}
					</view>
					<view class="wu-info cell-tit">
						{{v.AcceptTime}}
					</view>
				</view>
			</view>
		</s-pull-scroll>
	</view>
</template>

<script>
	import sPullScroll from "@/components/s-pull-scroll/index.vue"
	export default {
		components: {
			sPullScroll
		},
		data() {
			return {
				expCode: '',
				expNo: '',
				companyName:'',
				dataList: []
			}
		},
		onLoad(options) {
			this.expCode = options.expCode;
			this.expNo = options.expNo;
			this.refresh();
		},
		methods: {
			refresh() {
				this.$nextTick(() => {
					this.$refs.pullScroll.refresh();
				});
			},
			pullDown(pullScroll) {
				setTimeout(() => {
					this.loadData(pullScroll);
				}, 200)
			},
			loadData(pullScroll) {
				this.$api.loading('加载中...');
				let parmas = {
					cmd: 'getLogisticsInfo',
					expCode: this.expCode,
					expNo: this.expNo
				}
				this._reqw
					.post(parmas)
					.then(res => {
						uni.hideLoading();
						res.result == 0 ?(this.companyName=res.body.companyName,this.dataList =JSON.parse(res.body.content).Traces.reverse(),pullScroll.finish())  :
						 this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			}
		}
	}
</script>
<style>
	page{
		background: #FFFFFF;
	}
</style>

<style lang="scss" scoped>
	.wu-item {
		padding:20upx 0;
		border-bottom: 1upx solid #F2F2F2;
	}

	.cell-tit {
		color: #333333;
		font-size: 24upx;

	}

	.cell-tip {
		color: #333;
		font-size: 24upx;
	}

	.wu-con {
		padding:20upx;
		box-sizing: border-box;
	}
</style>
