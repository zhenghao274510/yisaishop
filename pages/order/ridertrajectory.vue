<template>
	<view class="">
		<web-view src="url"></web-view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				orderid:'',
				url:''
			}
		},
		onLoad(options) {
			this.orderid=options.id;
			this.loadData()
		},
		methods:{
			async loadData(){
				// this.orderid='2020112615070006'
				let parmas={
					cmd:'getRiderviewv2',
					order_id:this.orderid
				}
				const res=await this._reqw.post(parmas);
				if(res.result!=0){
					this.$api.tip(res.resultNote);
					return
				}
				this.url=res.body.url
			}
		}
	}
</script>

<style>
</style>
