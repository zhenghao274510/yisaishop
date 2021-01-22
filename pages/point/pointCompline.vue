<template>
	<view class="">
		<s-pull-scroll ref="pullScroll" :pullDown="pullDown" :pullUp="loadData" :back-top="true">
			<point-compline-item :list='dataList'></point-compline-item>
		</s-pull-scroll>
	</view>
</template>

<script>
	import sPullScroll from "@/components/s-pull-scroll/index.vue"
	import pointComplineItem from "@/components/mycom/point-compline-item.vue"
	export default {
		components: {
			pointComplineItem,
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
					cmd:'getPointCouponList',
					uid:uni.getStorageSync('uid'),
					merchant_id:uni.getStorageSync('merchantId'),
					nowPage: pullScroll.page
				}
				const curList = [];
				this._reqw.post(e).then(res => {
					res.result == 0 ?
						(
							(res.body.dataList.length == 0 ? (pullScroll.empty()) : res.body.dataList.forEach(item => {
									curList.push(item)
								}), this.dataList = this.dataList.concat(curList), pullScroll.page>=res.body.totalPage ? pullScroll.finish() :
								pullScroll.success())
						) :
						this.$api.tip(res.resultNote);
				})
			}
		}
	}
</script>


<style>
	page{
		background: #FFFFFF;
	}
</style>
