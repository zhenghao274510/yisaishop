<template>
	<view class="">
		<s-pull-scroll ref="pullScroll" :pullDown="pullDown" :pullUp="loadData" :back-top="true">
			<compline-item :list='dataList' type='1' @click="userOptions"></compline-item>
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
				dataList: [],
				id: '',
				money: 0
			}
		},
		onLoad(options) {
			this.type = options.type;
			options.id ? this.id = options.id : '';
			this.money = options.money;
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
					cmd: 'getMemberCouponList',
					uid: uni.getStorageSync('uid'),
					merchant_id: uni.getStorageSync('merchantId'),
				}
				if (this.type != 'cart') {
					e.product_id = this.id
				}
				const curList = [];
				this._reqw.post(e).then(res => {
					res.result == 0 ?
						(
							(res.body.dataList.length == 0 ? (pullScroll.empty()) : res.body.dataList.forEach(item => {
								curList.push(item)
							}), this.dataList = this.dataList.concat(curList), pullScroll.finish())
						) :
						this.$api.tip(res.resultNote);
				}).catch(err => {})
			},
			setCompline(e){
				this.$api.prePage().compline = e;
					this.$api.back();
			},
			userOptions(e) {
				console.log(e)
				  // "use_type":"",// 使用类型（1：满减2：无门槛）
				if (e.use_type == 1) {
					Number(this.money) >= Number(e.price) ? this.setCompline(e) : this.$api.tip('该劵不可用!');
				} else {
					Number(this.money) > Number(e.money) ? this.setCompline(e) : this.$api.tip(
						'该劵不可用!');
				}
			}
		}
	}
</script>
<style>
	page {
		background-color: #FFFFFF;
	}
</style>

<style>
</style>
