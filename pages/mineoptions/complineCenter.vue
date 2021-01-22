<template>
	<view class="">
		<group-x-title :navArr="tabList" @navbarTap="tapNavClick" :tabCurrentIndex="tabIndex"></group-x-title>
		<s-pull-scroll ref="pullScroll" :pullDown="pullDown" :pullUp="loadData" :back-top="true" top="80">
			<compline-item :list='dataList' :tabIndex="tabIndex" type='1' @click="userOptions"></compline-item>
		</s-pull-scroll>
		
		<compline-qrcode :complineId="complineId" ref='complineQrcode'></compline-qrcode>
	</view>
</template>

<script>
	import sPullScroll from "@/components/s-pull-scroll/index.vue"
	import complineItem from "@/components/mycom/compline-item.vue"
	import groupXTitle from "@/components/mycom/group-x-title.vue"
	import complineQrcode from "@/components/mycom/compline-qrcode.vue"
	export default {
		components: {
			complineItem,
			sPullScroll,
			groupXTitle,
			complineQrcode
		},
		data() {
			return {
				tabIndex: 0,
				tabList: [{
						name: '未使用(0)'
					}, {
						name: '已使用(0)'
					},
					{
						name: '已过期(0)'
					}
				],
				dataList: [],
				type: 0,
				complineId:''
			}
		},
		onLoad() {
			this.refresh();
		},
		methods: {
			userOptions(e){
				console.log(e)
				if(this.tabIndex!=0){
					return
				}
				if(e.line_type==1){
					this.$api.switchTab('/pages/tabs/index')
				}else{
					let _this=this;
					uni.showActionSheet({
						itemList:['线上使用','扫码核销'],
						success(options) {
							console.log(options)
							if(options.tapIndex==0){
								_this.$api.switchTab('/pages/tabs/index')
							}else{
								_this.complineId=e.id;
								setTimeout(()=>{
									_this.$refs['complineQrcode'].open()
								},300)
								
							}
						}
					})
				}
			},
			tapNavClick(e) {
				this.tabIndex = e.ind;
				this.refresh();
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
					cmd: 'getMyCouponList',
					uid: uni.getStorageSync('uid'),
					state: this.tabIndex,
					nowPage: pullScroll.page
				}
				const curList = [];
				this._reqw.post(e).then(res => {
					res.result == 0 ?
						(this.tabIndex == 0 && pullScroll.page == 1 ? this.fromData(res.body) : '',
							(res.body.dataList.length == 0 ? pullScroll.empty() : res.body.dataList.forEach(item => {
								curList.push(item)
							}), this.dataList = this.dataList.concat(curList), pullScroll.finish())
						) :
						this.$api.tip(res.resultNote);
				})
			},
			fromData(res) {
				this.tabList[0].name = `未使用(${res.number1})`, this.tabList[1].name = `已使用(${res.number2})`, this.tabList[2].name =
					`已过期(${res.number3})`;
			},
			
		}
	}
</script>
<style>
	page {
		background-color: #FFFFFF;
	}
</style>

<style scoped lang="scss">
</style>
