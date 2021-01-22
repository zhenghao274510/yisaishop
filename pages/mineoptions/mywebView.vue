<template>
	<view class="">
		<view class="content">
			<jyf-parser :html="content"></jyf-parser>
		</view>
	</view>

</template>

<script>
	import jyfParser from "@/components/jyf-parser/jyf-parser.vue"
	export default {
		components: {
			jyfParser
		},
		data() {
			return {
				type: '',
				content: '',
				title: ''
			}
		},
		onLoad(options) {
			options.type?(this.type = options.type,this.loadData()):(options.content?this.content=this.$api.formText(decodeURIComponent(options.content)):'');
			// 1：关于我们2：会员专享价3：积分兑好礼4：充值说明5：签到活动规则6：积分商城规则
			options.type == 1 ? this.title = "关于我们" : options.type == 2 ? this.title = "会员专享" : options.type == 3 ? this.title =
				"积分兑好礼" : options.type == 4 ? this.title = "充值说明" : options.type == 5 ? this.title = "签到活动规则" :options.type == 6? this.title =
				"积分商城规则":this.title =
				"伊赛商城";
			this.$api.setNav(this.title)
		},
		methods: {
			loadData() {
				let n = this.type;
				let e = {
					cmd: 'getAgreementList'
				}
				this._reqw.post(e).then(res => {
					res.result == 0 ? (res.body.dataList.forEach(item => {
						item.type == n ? this.content = this.$api.formText(item.content) : 0
					})) : this.$api.tip(res.resultNote)
				}).catch(err => {})
			}
		}
	}
</script>

<style scoped>
	.content {
		padding: 20upx;
		background: #FFFFFF;
	}
</style>
