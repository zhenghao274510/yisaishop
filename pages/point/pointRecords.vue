<template>
	<view class="">
		<group-x-title :navArr="tabList" @navbarTap="tapNavClick" :tabCurrentIndex="tabIndex"></group-x-title>
		<s-pull-scroll ref="pullScroll" :pullDown="pullDown" :pullUp="loadData" :back-top="true" top="100">
			
			<user-point-goods :list='dataList' v-if="tabIndex==0"></user-point-goods>
			<compline-item :list='dataList' v-if="tabIndex==1" type="history"></compline-item>
		</s-pull-scroll>
	</view>
</template>

<script>
	import sPullScroll from "@/components/s-pull-scroll/index.vue"
	import userPointGoods from "@/components/mycom/user-point-goods.vue"
	import complineItem from "@/components/mycom/compline-item.vue"
	import groupXTitle from "@/components/mycom/group-x-title.vue"
	export default {
		components: {
			sPullScroll,
			groupXTitle,
			complineItem,
			userPointGoods,
		},
		data() {
			return {
				tabIndex: 0,
				tabList: [{
					name: '商品记录'
				}, {
					name: '优惠券记录'
				}],
				dataList: []
			}
		},
		onLoad() {
			this.refresh();
		},
		methods: {
			tapNavClick(e) {
				this.tabIndex = e.ind;
				this.dataList=[];
				this.refresh()
			},
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
					cmd:'getPointRecordList',
					uid:uni.getStorageSync('uid'),
					type:(this.tabIndex-0)+1,
					nowPage: pullScroll.page
				}
				const curList = [];
				this._reqw.post(e).then(res => {
					res.result == 0 ?
						(
							(res.body.dataList.length == 0 ? pullScroll.empty() : res.body.dataList.forEach(item => {
									curList.push(item)
								}), this.dataList = this.dataList.concat(curList), pullScroll.page >= res.body.totalPage ? pullScroll.finish() :
								pullScroll.success())
						) :
						this.$api.tip(res.resultNote);
				})
			}
		}
	}
</script>

<style scoped lang="scss">
</style>
