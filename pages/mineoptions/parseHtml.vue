<template>
	<view class="">
		<jyf-parser :html="content"></jyf-parser>
	</view>
	
</template>

<script>
	import jyfParser from "@/components/jyf-parser/jyf-parser.vue"
	export default{
		components:{
			jyfParser
		},
		data(){
			return{
				content:''
			}
		}
	}
</script>

<style>
</style>
