<template>
	<view class="">
		<s-pull-scroll ref="pullScroll" :pullDown="pullDown" :pullUp="loadData" :back-top="true">
			<compline-item :list='dataList' type='0'></compline-item>
		</s-pull-scroll>
	</view>
</template>

<script>
	import sPullScroll from "@/components/s-pull-scroll/index.vue"
	import complineItem from '@/components/mycom/compline-item.vue'
	export default {
		components: {
			complineItem,
			sPullScroll
		},
		data() {
			return {
				dataList: []
			}
		},
		onLoad() {
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
				if (pullScroll.page == 1) {
					this.dataList = [];
				}
				let e = {
					cmd:'getCouponList',
					uid:uni.getStorageSync('uid'),
					merchant_id:uni.getStorageSync('merchantId')
				}
				const curList = [];
				this._reqw.post(e).then(res => {
					res.result == 0 ?
						(
							(res.body.dataList.length == 0 ? (pullScroll.empty()) : res.body.dataList.forEach(item => {
									curList.push(item)
								}), this.dataList = this.dataList.concat(curList),pullScroll.finish())
						) :
						this.$api.tip(res.resultNote);
				}).catch(err=>{})
			}
		}
	}
</script>
<style>
	page{
		background-color: #FFFFFF;
	}
</style>

<style>
</style>
