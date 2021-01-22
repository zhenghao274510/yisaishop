<template>
	<view class="">
		<group-x-title :navArr="tabList" @navbarTap="tapNavClick" :tabCurrentIndex="tabIndex"></group-x-title>
		<s-pull-scroll ref="pullScroll" :pullDown="pullDown" :pullUp="loadData" :back-top="true" headerHeight="50">
			<group-list :list='dataList' :tabIndex="tabIndex"></group-list>
		</s-pull-scroll>
	</view>
</template>

<script>
	import groupList from "@/components/mycom/groupList.vue"
	import sPullScroll from "@/components/s-pull-scroll/index.vue"
	import groupXTitle from "@/components/mycom/group-x-title.vue"
	export default {
		components: {
			groupList,
			sPullScroll,
			groupXTitle
		},
		data() {
			return {
				tabIndex:0,
				tabList:[{name:'普通'},{name:'阶梯'}],
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
			tapNavClick(e) {
				this.tabIndex = e.ind;
				this.refresh();
			},
			loadData(pullScroll) {
				if (pullScroll.page == 1) {
					this.dataList = [];
				}
				let e = {
					uid:uni.getStorageSync('uid'),
					merchantId:uni.getStorageSync('merchantId'),
					nowPage: pullScroll.page
				}
				this.tabIndex==0?e.cmd='getGroupProductList':e.cmd='getGradeGroupProductList';
				const curList = [];
				this._reqw.post(e).then(res => {
					res.result == 0 ?
						(
							(res.body.dataList.length == 0 ? (pullScroll.empty()) : res.body.dataList.forEach(item => {
									curList.push(item)
								}), this.dataList = this.dataList.concat(curList), pullScroll.page >= res.body.totalPage ? pullScroll.finish() :
								pullScroll.success())
						) :
						this.$api.tip(res.resultNote);
				}).catch(err => {})
			}
		}
	}
</script>

<style scoped lang="scss">
	.skill-top {
		position: relative;
		width: 100%;

		image {
			width: 100%;
		}
	}

	.skill-bottom {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
	}

	.time-left {
		width: 353upx;
		height: 127upx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: linear-gradient(130deg, #FE753F, #FF2B68);
		color: #FFFFFF;
	}

	.time-right {
		height: 127upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: #FEF0E5;
	}
</style>
